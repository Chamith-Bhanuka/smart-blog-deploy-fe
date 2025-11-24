// src/utils/image.ts
export const resolveImageURL = (url: string) => {
  if (!url) return '';
  return url.startsWith('http') ? url : `http://localhost:5000${url}`;
};
