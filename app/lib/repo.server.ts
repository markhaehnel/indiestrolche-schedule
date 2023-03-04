import type { WeekSchedule } from "~/lib/resolvers/scheduleResolver.server";
import { scheduleResolver } from "~/lib/resolvers/scheduleResolver.server";
import Redis from "ioredis";
import superjson from "superjson";

const redis = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379", {
  family: Number.parseInt(process.env.REDIS_PROTOCOL_FAMILY || "4"),
});

const CACHE_KEY = "schedule-cache";

const updateCache = async (): Promise<WeekSchedule> => {
  const userNames = ["marcusbmr", "utzstauder", "internetshawna"];
  const schedule = await scheduleResolver(userNames);

  await redis.set(CACHE_KEY, superjson.stringify(schedule), "EX", 1800);

  return schedule;
};

setInterval(async () => {
  await getCachedData();
}, 60_000);

const getCachedData = async (): Promise<WeekSchedule> => {
  const data = await redis.get(CACHE_KEY);

  return data ? superjson.parse(data) : await updateCache();
};

export { getCachedData };
