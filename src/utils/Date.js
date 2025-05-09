import dayjs from "dayjs";

export const formatDateLong = (date, withTime = true) => {
  // change the date format (2025-05-07T23:16:38.000Z) to "DD/MM/YYYY HH:mm:ss" from MExico utc-6
  const format = withTime ? "DD/MM/YYYY HH:mm:ss" : "DD/MM/YYYY";
  return dayjs(date).format(format);
};
