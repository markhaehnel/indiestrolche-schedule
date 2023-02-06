import { isSameDay } from "~/lib/isSameDay";

describe("isSameDay", () => {
  test.each([
    // true
    {
      dateA: new Date("2022-07-02T03:21:30Z"),
      dateB: new Date("2022-07-02T16:43:38Z"),
      expected: true,
    },
    {
      dateA: new Date("2023-01-01T00:00:00Z"),
      dateB: new Date("2023-01-01T00:00:00Z"),
      expected: true,
    },
    {
      dateA: new Date("2023-01-01T00:00:00Z"),
      dateB: new Date("2023-01-01T23:59:59Z"),
      expected: true,
    },
    {
      dateA: new Date("2023-01-01T23:59:59Z"),
      dateB: new Date("2023-01-01T23:59:59Z"),
      expected: true,
    },
    // false
    {
      dateA: new Date("2022-01-05T18:38:46Z"),
      dateB: new Date("2023-01-02T15:23:16Z"),
      expected: false,
    },
    {
      dateA: new Date("2023-01-01T23:59:59Z"),
      dateB: new Date("2023-01-02T00:00:00Z"),
      expected: false,
    },
  ])("should return $expected for $dateA and $dateB", ({ dateA, dateB, expected }) => {
    expect(isSameDay(dateA, dateB)).toBe(expected);
  });
});
