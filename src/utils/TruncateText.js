export const TruncateText = (text, limit = 320) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};
