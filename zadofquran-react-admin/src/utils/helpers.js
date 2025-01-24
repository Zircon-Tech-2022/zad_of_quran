export const calculateTimezone = (local, gmt) => {
  const [localHours, localMinutes] = local.split(":").map(Number);
  const [gmtHours, gmtMinutes] = gmt.split(":").map(Number);

  const localTotalMinutes = localHours * 60 + localMinutes;
  const gmtTotalMinutes = gmtHours * 60 + gmtMinutes;

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
