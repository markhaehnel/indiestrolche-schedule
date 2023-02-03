const getWeekdayName = (date: Date): string => {
  return date.toLocaleDateString("de-DE", { weekday: "long" });
};

export { getWeekdayName };
