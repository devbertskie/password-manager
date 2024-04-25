export const createQueryString = (
  urlPath: string,
  name: string,
  value: string,
) => {
  const params = new URLSearchParams();
  params.set(name, value);
  return `${urlPath}?${params.toString()}`;
};
