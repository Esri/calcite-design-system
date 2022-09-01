export function overRideLocalizedStrings(component: HTMLElement): any {
  const stringOverrides = {};
  console.log("util executed");
  for (const key in component) {
    if (key.startsWith("intl") && !!component[key]) {
      let trimmed = key.replace("intl", "");
      trimmed = `${trimmed[0].toLowerCase()}${trimmed.slice(1)}`;
      stringOverrides[trimmed] = component[key];
    }
  }
  return stringOverrides;
}
