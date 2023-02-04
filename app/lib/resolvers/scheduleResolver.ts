import pipe from "froebel/pipe";
import { TwitchAPI } from "~/lib/twitch/TwitchAPI.server";
import type { UserResponse } from "~/lib/twitch/models/UserResponse";

const twitchApi = new TwitchAPI(
  process.env.TWITCH_CLIENT_ID!,
  process.env.TWITCH_CLIENT_SECRET!
);

const getUsers = async (userNames: string[]) => twitchApi.getUsers(userNames);

const getSchedulesAndMergeUsers = async (users: UserResponse["data"]) => {
  const schedules = await Promise.all(
    users.map((x) => twitchApi.getSchedule(x.id))
  );

  return users.map((user, index) => ({
    ...user,
    segments: schedules[index].segments,
  }));
};

const scheduleResolver = pipe(getUsers, getSchedulesAndMergeUsers);

export { scheduleResolver };
