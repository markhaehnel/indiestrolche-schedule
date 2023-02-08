import type { WeekSchedule } from "~/lib/resolvers/scheduleResolver.server";
import { scheduleResolver } from "~/lib/resolvers/scheduleResolver.server";

let cache: { data: WeekSchedule | undefined; expiresAt: number } = {
  data: undefined,
  expiresAt: 0,
};

const updateCache = async (): Promise<WeekSchedule> => {
  const data = await scheduleResolver(["marcusbmr", "utzstauder", "internetshawna"]);
  cache = {
    data,
    expiresAt: Date.now() + (process.env.NODE_ENV === "production" ? 1_800_000 : 60_000),
  };
  return data;
};

setInterval(async () => {
  await getCachedWeekSchedule();
}, 60_000);

const getCachedWeekSchedule = async (): Promise<WeekSchedule> => {
  return cache.data && Date.now() < cache.expiresAt ? cache.data : updateCache();
};

export { getCachedWeekSchedule };
