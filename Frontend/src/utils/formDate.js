// src/utils/formatDate.js
import dayjs from "dayjs";

export const formatDate = (date, format = "DD MMM YYYY") =>
  dayjs(date).format(format);

export const formatDateTime = (date, format = "DD MMM YYYY, hh:mm A") =>
  dayjs(date).format(format);
