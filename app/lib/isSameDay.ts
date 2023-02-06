const isSameDay = (dateA: Date, dateB: Date): boolean =>
  dateA.getUTCFullYear() === dateB.getUTCFullYear() &&
  dateA.getUTCMonth() === dateB.getUTCMonth() &&
  dateA.getUTCDate() === dateB.getUTCDate();

export { isSameDay };
