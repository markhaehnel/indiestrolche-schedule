import { superjson, useSuperLoaderData } from "~/lib/superjson";
import { scheduleResolver } from "~/lib/resolvers/scheduleResolver.server";
import { getWeekdayName } from "~/lib/getWeekdayName";
import { getStreamerRingColor } from "~/lib/getStreamerRingColor";

export const loader = async () => {
  return superjson(await scheduleResolver(["marcusbmr", "utzstauder", "internetshawna"]));
};

export default function IndexPage() {
  const weeklySchedule = useSuperLoaderData<typeof loader>();

  return (
    <div className="carousel-center space-x carousel h-full p-4">
      {weeklySchedule.map((schedule) => (
        <div key={schedule.date.getTime()} className={"carousel-item"}>
          <div>
            <h2 className={"text-center text-2xl"}>{getWeekdayName(schedule.date)}</h2>
            {schedule.segments.map((segment) => (
              <div key={segment.id} className={"w-screen p-4 md:w-auto"}>
                <div
                  key={segment.id}
                  className="card card-side card-compact h-32 w-full truncate rounded-md bg-base-100 shadow transition-all hover:scale-105 hover:cursor-pointer hover:shadow md:w-96"
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
                        timeStyle: "short",
                      })}{" "}
                      -{" "}
                      {segment.endDate.toLocaleTimeString("de", {
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
        </div>
      ))}
    </div>
  );
}
