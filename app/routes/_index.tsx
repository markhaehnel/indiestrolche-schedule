import { superjson, useSuperLoaderData } from "~/lib/superjson";
import { getWeekdayName } from "~/lib/getWeekdayName";
import { getStreamerRingColor } from "~/lib/getStreamerRingColor";
import { isSameDay } from "~/lib/isSameDay";
import { useEffect, useRef } from "react";
import { getCachedData } from "~/lib/repo.server";
import { isBetween } from "~/lib/isBetween";

export const loader = async () => {
  return superjson(await getCachedData());
};

export default function IndexPage() {
  const weeklySchedule = useSuperLoaderData<typeof loader>();
  const todayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    todayRef.current?.scrollIntoView({ inline: "center" });
  }, [todayRef]);

  return (
    <div className="flex h-full w-screen max-w-full snap-x snap-x snap-mandatory flex-row overflow-y-auto overflow-x-scroll scroll-smooth md:snap-none">
      {weeklySchedule.map((schedule) => {
        const isToday = isSameDay(new Date(), schedule.date);
        return (
          <div
            key={schedule.date.getTime()}
            className={`flex snap-center flex-col ${isToday ? "bg-black bg-opacity-5 shadow-lg" : ""}`}
            ref={isToday ? todayRef : undefined}
          >
            <h2 className={"flex place-items-center justify-center bg-white py-2 text-center text-2xl shadow"}>
              {getWeekdayName(schedule.date)}
            </h2>
            {schedule.segments.map((segment) => {
              const isLive = isBetween(Date.now(), segment.startDate.getTime(), segment.endDate.getTime());
              return (
                <div key={segment.id} className={"w-screen p-4 md:w-auto"}>
                  <a
                    href={isLive ? `https://twitch.tv/${segment.streamer}` : undefined}
                    target={"_blank"}
                    key={segment.id}
                    className={`card card-side card-compact h-32 w-full truncate rounded-md bg-base-100 shadow transition-all ${
                      isLive ? "hover:z-10 hover:scale-110 hover:cursor-pointer hover:shadow" : ""
                    } md:w-96`}
                    rel="noreferrer"
                  >
                    <div className="avatar items-center pl-4">
                      <div
                        className={`h-16 w-16 rounded-full  ring ring-offset-2 md:h-16 md:w-16 ${getStreamerRingColor(
                          segment.streamer
                        )}`}
                      >
                        <img src={segment.streamerImageUrl} alt={segment.streamer} />
                      </div>
                    </div>
                    <div className="card-body truncate">
                      <div className={"flex flex-row place-content-between"}>
                        <b>
                          {segment.startDate.toLocaleTimeString("de", {
                            timeZone: "Europe/Berlin",
                            timeStyle: "short",
                          })}{" "}
                          -{" "}
                          {segment.endDate.toLocaleTimeString("de", {
                            timeZone: "Europe/Berlin",
                            timeStyle: "short",
                          })}
                        </b>
                        {isLive && <span className="badge border-0 bg-red-500">LIVE</span>}
                      </div>

                      <span className={"truncate text-lg"} title={segment.title}>
                        {segment.title}
                      </span>
                      {segment.category && (
                        <div className="card-actions">
                          <i className={"truncate"} title={segment.category}>
                            {segment.category}
                          </i>
                        </div>
                      )}
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
