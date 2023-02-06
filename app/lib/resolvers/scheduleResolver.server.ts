import pipe from "froebel/pipe";
import type { UserResponse } from "~/lib/twitch/models/UserResponse";
import { getTwitchAPIClient } from "~/lib/twitch/getTwitchAPIClient.server";

const getUsers = async (userNames: string[]) => getTwitchAPIClient().getUsers(userNames);

const getSchedulesAndMergeUsers = async (users: UserResponse["data"]) => {
  const schedules = await Promise.all(users.map((x) => getTwitchAPIClient().getSchedule(x.id)));

  return users.map((user, index) => ({
    ...user,
    segments: schedules[index].segments,
  }));
};

const scheduleResolver = pipe(getUsers, getSchedulesAndMergeUsers);

export { scheduleResolver };
