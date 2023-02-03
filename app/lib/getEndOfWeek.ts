import { getStartOfWeek } from "~/lib/getStartOfWeek";

const getEndOfWeek = () => {
  const date = getStartOfWeek();
  date.setDate(date.getDate() + 6);

  date.setUTCHours(23);
  date.setUTCMinutes(59);
  date.setUTCSeconds(59);
  date.setUTCMilliseconds(999);

  return date;
};

export { getEndOfWeek };
