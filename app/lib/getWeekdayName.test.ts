import { getWeekdayName } from "~/lib/getWeekdayName";

describe("getWeekdayName", () => {
  it("should return weekday name for given date", () => {
    expect(getWeekdayName(new Date("2023-02-04T08:31:00Z"))).toBe("Samstag");
  });
});
