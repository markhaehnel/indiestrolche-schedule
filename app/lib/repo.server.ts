import type { WeekSchedule } from "~/lib/resolvers/scheduleResolver.server";
import { scheduleResolver } from "~/lib/resolvers/scheduleResolver.server";
import { streamsResolver } from "~/lib/resolvers/streamsResolver.server";
import type { StreamsResponse } from "~/lib/twitch/models/StreamsResponseSchema";

type CachedData = { schedule: WeekSchedule; streams: StreamsResponse["data"] };

let cache: {
  schedule: Awaited<ReturnType<typeof scheduleResolver>> | undefined;
  streams: Awaited<ReturnType<typeof streamsResolver>> | undefined;
  expiresAt: number;
} = {
  schedule: undefined,
  streams: undefined,
  expiresAt: 0,
};

const updateCache = async (): Promise<CachedData> => {
  const userNames = ["marcusbmr", "utzstauder", "internetshawna"];
  const [schedule, streams] = await Promise.all([scheduleResolver(userNames), streamsResolver(userNames)]);

  cache = {
    schedule,
    streams,
    expiresAt: Date.now() + (process.env.NODE_ENV === "production" ? 900_000 : 60_000),
  };

  return { schedule, streams };
};

setInterval(async () => {
  await getCachedData();
}, 60_000);

const getCachedData = async (): Promise<CachedData> => {
  const { schedule, streams, expiresAt } = cache;
  return schedule && streams && Date.now() < expiresAt ? { schedule, streams } : updateCache();
};

export { getCachedData };
