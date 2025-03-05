export const getQueryString = (query: Record<string, unknown>): string => {
  const queryString = Object.entries(query)
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${key}=${encodeURIComponent(String(v))}`);
      }
      return [`${key}=${encodeURIComponent(String(value))}`];
    })
    .join("&");
  return queryString;
};
