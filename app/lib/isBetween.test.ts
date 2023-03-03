import { isBetween } from "~/lib/isBetween";

describe("isBetween", () => {
  test("should return true if value is between start and end", () => {
    expect(isBetween(50, 0, 100)).toBe(true);
    expect(isBetween(0, 0, 100)).toBe(true);
  });

  test("should return false if value is not between start and end", () => {
    expect(isBetween(50, 70, 100)).toBe(false);
    expect(isBetween(50, 0, 50)).toBe(false);
  });
});
