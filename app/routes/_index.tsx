import { superjson, useSuperLoaderData } from "~/lib/superjson";
import { getWeekdayName } from "~/lib/getWeekdayName";
import { getStreamerRingColor } from "~/lib/getStreamerRingColor";
import { isSameDay } from "~/lib/isSameDay";
import { useEffect, useRef } from "react";
import { getCachedWeekSchedule } from "~/lib/repo.server";

export const loader = async () => {
  return superjson(await getCachedWeekSchedule());
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
            {schedule.segments.map((segment) => (
              <div key={segment.id} className={"w-screen p-4 md:w-auto"}>
                <div
                  key={segment.id}
                  className="card card-side card-compact h-32 w-full truncate rounded-md bg-base-100 shadow transition-all hover:z-10 hover:scale-110 hover:cursor-pointer hover:shadow md:w-96"
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
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
