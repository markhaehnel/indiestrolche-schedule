import { scheduleResolver } from "~/lib/resolvers/scheduleResolver.server";
import { streamsResolver } from "~/lib/resolvers/streamsResolver.server";
import Redis from "ioredis";
import superjson from "superjson";

const redis = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379");

const CACHE_KEY = "indiestrolche-schedule-cache";

const updateCache = async () => {
  const userNames = ["marcusbmr", "utzstauder", "internetshawna"];
  const [schedule, streams] = await Promise.all([scheduleResolver(userNames), streamsResolver(userNames)]);

  const data = { schedule, streams };

  await redis.set(CACHE_KEY, superjson.stringify(data), "EX", process.env.NODE_ENV === "production" ? 600 : 60);

  return data;
};

setInterval(async () => {
  await getCachedData();
}, 60_000);

const getCachedData = async () => {
  const data = await redis.get(CACHE_KEY);

  return data ? superjson.parse(data) : await updateCache();
};

export { getCachedData };
