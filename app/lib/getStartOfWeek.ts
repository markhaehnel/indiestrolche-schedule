const getStartOfWeek = (): Date => {
  const now = new Date();
  const today = now.getDay();
  const diff = now.getDate() - today + (today == 0 ? -6 : 1); // adjust when day is sunday
  const date = new Date(now.setUTCDate(diff));

  date.setUTCHours(0);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);
  date.setUTCMilliseconds(0);

  return date;
};

export { getStartOfWeek };
