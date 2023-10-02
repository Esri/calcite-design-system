export function makeSCSSVar(name: string): string {
  return `$${name
    .split(".")
    .map((str, idx) => {
      return idx === 0 ? str : `${str[0].toUpperCase()}${str.slice(1)}`;
    })
    .join("")}`;
}
