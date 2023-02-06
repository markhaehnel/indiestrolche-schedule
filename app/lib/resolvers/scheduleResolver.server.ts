import pipe from "froebel/pipe";
import type { UserResponse } from "~/lib/twitch/models/UserResponse";
import { getTwitchAPIClient } from "~/lib/twitch/getTwitchAPIClient.server";
import { filterUniqueDates } from "~/lib/filterUniqueDates";
import { getStartOfWeek } from "~/lib/getStartOfWeek";
import { getEndOfWeek } from "~/lib/getEndOfWeek";
import { isSameDay } from "~/lib/isSameDay";

type ScheduleSegment = {
  id: string;
  streamer: string;
  streamerImageUrl: string;
  title: string;
  category?: string;
  startDate: Date;
  endDate: Date;
};

type WeekSchedule = {
  date: Date;
  segments: ScheduleSegment[];
}[];

const getUsers = async (userNames: string[]) => getTwitchAPIClient().getUsers(userNames);

const getSchedulesAndMergeUsers = async (users: UserResponse["data"]) => {
  const schedules = await Promise.all(users.map((x) => getTwitchAPIClient().getSchedule(x.id)));

  return users.map((user, index) => ({
    ...user,
    segments: schedules[index].segments,
  }));
};

const transformMergedUsersSchedules = (
  schedules: Awaited<ReturnType<typeof getSchedulesAndMergeUsers>>
): ScheduleSegment[] =>
  schedules.flatMap((item) =>
    item.segments.map(({ id, start_time, end_time, title, category }): ScheduleSegment => {
      return {
        id,
        streamer: item.display_name,
        streamerImageUrl: item.profile_image_url,
        title,
        category: category?.name,
        startDate: start_time,
        endDate: end_time,
      };
    })
  );

const filterSegments = (segments: ScheduleSegment[]): ScheduleSegment[] => {
  const startOfWeek = getStartOfWeek();
  const endOfWeek = getEndOfWeek();

  return segments.filter(({ startDate }) => startDate >= startOfWeek && startDate <= endOfWeek);
};

const transformScheduleSegments = (segments: ScheduleSegment[]): WeekSchedule => {
  const availableDays = filterUniqueDates(
    segments.map((x) => {
      const date = new Date(x.startDate);
      date.setUTCHours(0);
      date.setUTCMinutes(0);
      date.setUTCSeconds(0);
      date.setUTCMilliseconds(0);
      return date;
    })
  ).sort((a, b) => a.getTime() - b.getTime());

  return availableDays.map((date) => ({
    date,
    segments: segments
      .filter((segment) => isSameDay(date, segment.startDate))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime()),
  }));
};

const scheduleResolver = pipe(
  getUsers,
  getSchedulesAndMergeUsers,
  transformMergedUsersSchedules,
  filterSegments,
  transformScheduleSegments
);

export { scheduleResolver };
