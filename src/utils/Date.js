import dayjs from "dayjs";

export const formatDateLong = (date) => {
  // change the date format (2025-05-07T23:16:38.000Z) to "DD/MM/YYYY HH:mm:ss" from MExico
  return dayjs(date).format("DD/MM/YYYY HH:mm:ss");
};
