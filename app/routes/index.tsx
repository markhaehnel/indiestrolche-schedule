import { superjson, useSuperLoaderData } from "~/lib/superjson";
import { scheduleResolver } from "~/lib/resolvers/scheduleResolver.server";
import { getStartOfWeek } from "~/lib/getStartOfWeek";
import { getWeekdayName } from "~/lib/getWeekdayName";
import { getEndOfWeek } from "~/lib/getEndOfWeek";
import { isSameDay } from "~/lib/isSameDay";

const filterUniqueDates = (data: Date[]) => {
  const lookup = new Set();

  return data.filter((date) => {
    const serialised = date.getTime();
    if (lookup.has(serialised)) {
      return false;
    } else {
      lookup.add(serialised);
      return true;
    }
  });
};

const getStreamerRingColor = (streamerName: string): string => {
  switch (streamerName) {
    case "marcusbmr": {
      return "ring-green-600";
    }
    case "utzstauder": {
      return "ring-amber-500";
    }
    case "internetshawna": {
      return "ring-red-700";
    }
    default: {
      return "ring-base-100";
    }
  }
};

export const loader = async () => {
  return superjson(await scheduleResolver(["marcusbmr", "utzstauder", "internetshawna"]));
};

export default function IndexPage() {
  const userSchedules = useSuperLoaderData<typeof loader>();

  const availableDays = filterUniqueDates(
    userSchedules.flatMap((item) =>
      item.segments.map((segment) => {
        const date = new Date(segment.start_time);
        date.setUTCHours(0);
        date.setUTCMinutes(0);
        date.setUTCSeconds(0);
        date.setUTCMilliseconds(0);
        return date;
      })
    )
  )
    .filter((item) => item >= getStartOfWeek() && item <= getEndOfWeek())
    .sort((a, b) => a.getTime() - b.getTime())
    .map((item) => ({ date: item, weekday: getWeekdayName(item) }));

  return (
    <div className="carousel-center carousel h-full space-x-4 p-4">
      {availableDays.map((weekday) => (
        <div key={weekday.date.getTime()} className={"carousel-item"}>
          <div>
            <h2 className={"text-center text-xl"}>{weekday.weekday}</h2>
            {userSchedules.map((user) =>
              user.segments
                .filter((segment) => isSameDay(weekday.date, segment.start_time))
                .map((segment) => (
                  <div key={segment.id} className={"w-screen p-4 md:w-auto"}>
                    <div
                      key={segment.id}
                      className="card card-side card-compact mt-4 h-32 w-full truncate rounded-md bg-base-200 bg-base-100 shadow-md md:w-96"
                    >
                      <div className="avatar items-center pl-4">
                        <div
                          className={`h-16 w-16 rounded-full ring ring-offset-2 md:h-16 md:w-16 ${getStreamerRingColor(
                            user.login
                          )}`}
                        >
                          <img src={user.profile_image_url} alt={user.display_name} />
                        </div>
                      </div>
                      <div className="card-body truncate">
                        <b>
                          {segment.start_time.toLocaleTimeString("de", {
                            timeStyle: "short",
                          })}{" "}
                          -{" "}
                          {segment.end_time.toLocaleTimeString("de", {
                            timeStyle: "short",
                          })}
                        </b>
                        <span className={"truncate"} title={segment.title}>
                          {segment.title}
                        </span>
                        {segment.category && (
                          <div className="card-actions">
                            <i className={"truncate"} title={segment.category.name}>
                              {segment.category.name}
                            </i>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
