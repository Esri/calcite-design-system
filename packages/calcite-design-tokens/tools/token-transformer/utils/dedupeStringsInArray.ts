export const dedupeStringsInArray = (arr: string[]): string[] => {
  return arr.filter((str, idx) => {
    return (typeof arr[idx + 1] === "string" && !new RegExp(`${str}`).test(arr[idx + 1])) || idx === arr.length - 1;
  });
};
