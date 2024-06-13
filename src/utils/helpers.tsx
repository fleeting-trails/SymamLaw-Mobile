import { atob } from "react-native-quick-base64";
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
// export function base64ToBlob(base64 : string, contentType = '', sliceSize = 512) {
//   const Buffer = require("buffer").Buffer;
//   const buffer = Buffer.from(base64, "base64");
//   const blob = new File([buffer], "jisun", { type: contentType })
//   return blob;
// }

export function base64ToBlob(base64 : string, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
  }

  return new File(byteArrays, "avatar.jpeg", { type: contentType });
}