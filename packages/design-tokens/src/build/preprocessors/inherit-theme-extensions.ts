import StyleDictionary from "style-dictionary";

type TokenGroup = Record<string, unknown>;

function isTokenGroup(value: unknown): value is TokenGroup {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function inheritThemeExtensions(group: TokenGroup, inheritedThemeable = false): void {
  const extensions = (group.$extensions ?? group.extensions) as Record<string, unknown> | undefined;
  const themeable =
    typeof extensions?.["calcite.theme"] === "boolean" ? extensions["calcite.theme"] : inheritedThemeable;

  if ("$value" in group || "value" in group) {
    if (themeable) {
      group.$extensions = { ...(group.$extensions as TokenGroup | undefined), "calcite.theme": true };
    }

    return;
  }

  Object.entries(group).forEach(([key, value]) => {
    if (!key.startsWith("$") && key !== "attributes" && key !== "extensions" && isTokenGroup(value)) {
      inheritThemeExtensions(value, themeable);
    }
  });
}

export function registerPreprocessorInheritThemeExtensions(): void {
  StyleDictionary.registerPreprocessor({
    name: PreprocessorInheritThemeExtensions,
    preprocessor: (dictionary) => {
      inheritThemeExtensions(dictionary);

      return dictionary;
    },
  });
}

export const PreprocessorInheritThemeExtensions = "calcite/preprocessor/inherit-theme-extensions";
