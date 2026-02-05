import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const calculateTimezone = (local, gmt) => {
  const [localHours, localMinutes] = local.split(":").map(Number);
  const [gmtHours, gmtMinutes] = gmt.split(":").map(Number);

  let localTotalMinutes = localHours * 60 + localMinutes;
  const gmtTotalMinutes = gmtHours * 60 + gmtMinutes;

  // Adjust for day wrap-around when local is "next day"
  if (localTotalMinutes < gmtTotalMinutes) {
    localTotalMinutes += 24 * 60; // Add 24 hours to local time
  }

  const differenceInMinutes = localTotalMinutes - gmtTotalMinutes;

  const hours = Math.floor(Math.abs(differenceInMinutes) / 60);
  const minutes = Math.abs(differenceInMinutes) % 60;

  let sign = differenceInMinutes >= 0 ? "+" : "-";

  let formattedOffset = `GMT${sign}${hours}`;

  if (minutes) {
    formattedOffset += `:${minutes.toString().padStart(2, "0")}`;
  }

  return formattedOffset;
};

export const convertToSA = (time, timezone) => {
  if (!time || !timezone) return null;

  const dateTime = dayjs
    .tz(`2026-02-01 ${time}`, timezone);

  return dateTime.tz('Asia/Riyadh').format('HH:mm');
};