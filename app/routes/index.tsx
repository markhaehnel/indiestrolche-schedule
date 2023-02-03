import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import { superjson, useSuperLoaderData } from "~/lib/superjson";
import { scheduleResolver } from "~/lib/resolvers/scheduleResolver";
import { getStartOfWeek } from "~/lib/getStartOfWeek";
import { getWeekdayName } from "~/lib/getWeekdayName";
import { getEndOfWeek } from "~/lib/getEndOfWeek";
import { datesAreOnSameDay } from "~/lib/datesAreOnSameDay";

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

export const loader = async () => {
  return superjson(
    await scheduleResolver(["marcusbmr", "UtzStauder", "InternetShawna"])
  );
};

export default function IndexPage() {
  const userSchedules = useSuperLoaderData<typeof loader>();
  console.dir(userSchedules);

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
    <div className={"mt-2 overflow-hidden"}>
      <ScrollSync>
        <>
          <div>
            <ScrollSyncPane>
              <div
                className={
                  "scrollbar-hide space-x-4 overflow-x-scroll whitespace-nowrap"
                }
              >
                {availableDays.map((weekday) => (
                  <div
                    key={Number(weekday.date)}
                    className={"inline-block w-96 text-center text-2xl"}
                  >
                    {weekday.weekday}
                  </div>
                ))}
              </div>
            </ScrollSyncPane>
          </div>

          {userSchedules.map((streamer, index, array) => (
            <div key={streamer.id}>
              <div
                className={
                  "absolute mt-2 w-full rounded-r border-t border-b px-4 py-2 text-center"
                }
              >
                <span>{streamer.display_name}</span>
              </div>
              <ScrollSyncPane>
                <div
                  className={`space-x-4 overflow-x-scroll whitespace-nowrap pt-14 ${
                    index === array.length - 1 ? "" : "scrollbar-hide"
                  }`}
                >
                  {availableDays.map((weekday) => (
                    <div
                      key={Number(weekday.date)}
                      className={
                        "max-w-96 inline-block w-96 space-x-4 space-y-6"
                      }
                    >
                      <div className="flex flex-col space-y-4 p-2">
                        {streamer.segments
                          .filter((segment) =>
                            datesAreOnSameDay(segment.start_time, weekday.date)
                          )
                          .map((segment) => (
                            <div
                              key={segment.id}
                              className="card card-compact h-32 w-96 truncate bg-base-100 shadow"
                            >
                              <div
                                className={"h-2 overflow-hidden bg-orange-400"}
                              ></div>
                              <div className="card-body">
                                <b>
                                  {segment.start_time.toLocaleTimeString("de", {
                                    timeStyle: "short",
                                  })}{" "}
                                  -{" "}
                                  {segment.end_time.toLocaleTimeString("de", {
                                    timeStyle: "short",
                                  })}
                                </b>
                                <span
                                  className={"truncate"}
                                  title={segment.title}
                                >
                                  {segment.title}
                                </span>
                                {segment.category && (
                                  <div className="card-actions">
                                    <i
                                      className={"truncate"}
                                      title={segment.category.name}
                                    >
                                      {segment.category.name}
                                    </i>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollSyncPane>
            </div>
          ))}
        </>
      </ScrollSync>
    </div>
  );
}
