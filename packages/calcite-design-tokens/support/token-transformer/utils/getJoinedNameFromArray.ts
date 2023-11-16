export function getJoinedNameFromArray(path: string[], prefix?: string): string {
  return `${[]
    .concat(prefix, path)
    .filter((p) => p)
    .join(".")}`;
}
