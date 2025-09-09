export const generateShortUrl = (keyword) => {
  if (keyword) return `https://short.ly/${keyword}`;
  const random = Math.random().toString(36).substring(2, 8);
  return `https://short.ly/${random}`;
};

export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};
