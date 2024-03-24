export function truncateString(str: string, size: number) {
  if (str.length <= size) {
    return str;
  } else {
    return str.substring(0, size) + "...";
  }
}

export function formatMinutesToHourMinute(minutes: number) {
  if (typeof minutes !== "number" || isNaN(minutes) || minutes < 0) {
    return "Invalid input";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedHours =
    hours !== 0 ? (hours < 10 ? `0${hours}` : hours) : null;
  const formattedMinutes =
    remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;

  return formattedHours
    ? `${formattedHours}hour ${formattedMinutes}min`
    : `${formattedMinutes}min`;
}
