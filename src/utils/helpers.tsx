import { atob } from "react-native-quick-base64";
export function truncateString(str: string | undefined, size: number) {
  if (!str) return str;
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
export function formatSecondToHour(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = secs.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function formatMinuteToTimestring(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${remainingMinutes}min`;
  }
}

// export function base64ToBlob(base64 : string, contentType = '', sliceSize = 512) {
//   const Buffer = require("buffer").Buffer;
//   const buffer = Buffer.from(base64, "base64");
//   const blob = new File([buffer], "jisun", { type: contentType })
//   return blob;
// }

export function base64ToBlob(
  base64: string,
  contentType = "",
  sliceSize = 512
) {
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

export function getQueryParameters(url: string) {
  let queryParams: any = {};
  let urlObj = new URL(url);
  let queryString = urlObj.search;

  // Remove the '?' at the start of the query string
  if (queryString) {
    queryString = queryString.substring(1);

    let pairs = queryString.split("&");
    pairs.forEach((pair) => {
      let [key, value] = pair.split("=");
      queryParams[decodeURIComponent(key)] = decodeURIComponent(value || "");
    });
  }

  return queryParams;
}

export function isValidYouTubeVideo(url: string) {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|live\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(.*)?$/;

  try {
    // Create a URL object for parsing and validation
    const parsedUrl = new URL(url);

    // Ensure it's a YouTube URL
    if (
      !parsedUrl.hostname.includes("youtube.com") &&
      !parsedUrl.hostname.includes("youtu.be")
    ) {
      return false;
    }

    // Match the regular expression for YouTube video, embed, or live links
    return youtubeRegex.test(url);
  } catch (e) {
    // If URL constructor throws an error, it's not a valid URL
    return false;
  }
}

export const convertToEmbedUrl = (url : string) => {
  const videoId = url.split('v=')[1]?.split('&')[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};
export const getYoutubeVideoId = (url : string) => {
  const videoId = url.split('v=')[1]?.split('&')[0];
  return videoId;
};

export function convertToTimeAgo(inputTime : string) {
  const now = new Date();
  const time = new Date(inputTime);
  const diff = Math.floor((now.getTime() - time.getTime()) / 1000); // Difference in seconds

  if (diff < 60) {
      return `${diff} second${diff !== 1 ? 's' : ''} ago`;
  } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (diff < 604800) {
      const days = Math.floor(diff / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (diff < 2592000) {
      const weeks = Math.floor(diff / 604800);
      return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  } else if (diff < 31536000) {
      const months = Math.floor(diff / 2592000);
      return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
      const years = Math.floor(diff / 31536000);
      return `${years} year${years !== 1 ? 's' : ''} ago`;
  }
}

