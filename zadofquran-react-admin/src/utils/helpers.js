import { toast } from "react-hot-toast";

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

export const convertToGMT3 = (time, timezone) => {
  if (!time || !timezone) return "";

  const [hours, minutes] = time.split(":").map(Number);

  // Extract sign (+/-) and offset in hours and minutes
  const match = timezone.match(/GMT(?:([+-]?\d+):?(\d+)?)?/);
  if (!match) return toast.error("Invalid timezone format");

  // Default to GMT+0 if no offset is provided
  const offsetHours = match[1] ? parseInt(match[1], 10) : 0;
  const offsetMinutes = match[2] ? parseInt(match[2], 10) : 0;

  // Convert input time to total minutes in UTC
  let totalMinutesUTC = (hours - offsetHours) * 60 + (minutes - offsetMinutes);

  // Convert to GMT+3
  totalMinutesUTC += 3 * 60;

  // Ensure hours are within the 24-hour range
  let finalHours = Math.floor((totalMinutesUTC / 60) % 24);
  const finalMinutes = totalMinutesUTC % 60;
  const period = finalHours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  finalHours = finalHours % 12 || 12;

  // Format result as HH:mm AM/PM
  return `${String(finalHours)}:${String(finalMinutes).padStart(2, "0")} ${period}`;
};