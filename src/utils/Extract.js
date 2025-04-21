export function getFileNameFromMediaUrl(url) {
  const mediaIndex = url.indexOf("media/");
  if (mediaIndex !== -1) {
    return url.substring(mediaIndex + "media/".length);
  }
  return null;
}
