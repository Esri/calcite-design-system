/*
 * This is a fake version of the knobs API that is used in Storybook stories.
 *
 * `@storybook/addon-knobs` does not support Storybook v8+, so this is a placeholder to upgrade to v8 while we discuss the future of knobs.
 */

export function select(_name: string, _options: string[], defaultValue: string, _groupName?: string): string {
  return defaultValue;
}

export function text(_name: string, defaultValue: string, _groupName?: string): string {
  return defaultValue;
}

export function color(_name: string, defaultValue: string, _groupName?: string): string {
  return defaultValue;
}

export function boolean(
  name: string,
  defaultValue: boolean,
  _groupName?: string,
  mode: "prop" | "attr" = "attr",
): string | boolean {
  if (mode === "prop") {
    // this mode is for backwards-compatibility with the createComponentHTML util
    return defaultValue;
  }

  return defaultValue ? name : "";
}

export function array(_name: string, defaultValue: string[], _groupName?: string): string[] {
  return defaultValue;
}

export function number(_name: string, defaultValue: number, _groupName?: string): number {
  return defaultValue;
}
