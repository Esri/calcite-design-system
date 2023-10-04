export const scssBase = [
  "$calcite-core-sizing-1: 10px;",
  "$calcite-core-color-neutral-blk-240: #333;",
  "$calcite-core-font-family-primary: Robato;",
  "$calcite-core-font-weight-light: 300;",
  "$calcite-core-line-height-fixed-0: 1rem;",
  "$calcite-core-font-size-0: 14px;",
  "$calcite-core-letter-spacing-normal: 1rem;",
  "$calcite-core-paragraph-spacing-normal: 1rem;",
  "$calcite-core-text-decoration-none: none;",
  "$calcite-core-text-case-none: none;",
  "$calcite-core-opacity-4: 40%;",
  "$calcite-core-opacity-8: 80%;",
  "$calcite-core-boxShadow-1: 0 2 8 0 rgba($color-neutral-blk-240, $opacity-4);",
  "$calcite-core-boxShadow-2: 0 4 16 0 rgba($color-neutral-blk-240, $opacity-8);",
  "$calcite-core-boxShadow: $boxShadow-1, $boxShadow-2;",
  "$calcite-core-compound-font-family: $type-1-font-family;",
  "$calcite-core-compound-font-weight: $type-1-font-weight;",
  "$calcite-core-compound-line-height: $type-1-line-height;",
  "$calcite-core-compound-font-size: $type-1-font-size;",
  "$calcite-core-compound-letter-spacing: $type-1-letter-spacing;",
  "$calcite-core-compound-paragraph-spacing: $type-1-paragraph-spacing;",
  "$calcite-core-compound-text-decoration: $type-1-text-decoration;",
  "$calcite-core-compound-text-case: $type-1-text-case;",
  "$calcite-core-box-shadow: 0 2 8 0 rgba(#333, 0.4), 0 4 16 0 rgba(#333, 0.8)",
  "$calcite-core-type-1-font-family: $font-family-primary;",
  "$calcite-core-type-1-font-weight: $font-weight-light;",
  "$calcite-core-type-1-line-height: $line-height-fixed-0;",
  "$calcite-core-type-1-font-size: $font-size-0;",
  "$calcite-core-type-1-letter-spacing: $letter-spacing-normal;",
  "$calcite-core-type-1-paragraph-spacing: $paragraph-spacing-normal;",
  "$calcite-core-type-1-text-decoration: $text-decoration-none;",
  "$calcite-core-type-1-text-case: $text-case-none;",
];

export const scssMixins = ["@mixin boxShadow { box-shadow: var(--box-shadow); }"];

export const scssCSSRoot = (name: string): string[] => [
  `@mixin ${name}() {`,
  "--sizing-1: 10px;",
  "--color-neutral-blk-240: $color-neutral-blk-240;",
  "--font-family-primary: $font-family-primary;",
  "--font-weight-light: $font-weight-light;",
  "--line-height-fixed-0: $line-height-fixed-0;",
  "--font-size-0: $font-size-0;",
  "--letter-spacing-normal: $letter-spacing-normal;",
  "--paragraph-spacing-normal: $paragraph-spacing-normal;",
  "--text-decoration-none: $text-decoration-none;",
  "--text-case-none: $text-case-none;",
  "--opacity-4: $opacity-4;",
  "--opacity-8: $opacity-8;",
  "--boxShadow: $boxShadow;",
  "--type-1-font-family: var(--font-family-primary);",
  "--type-1-font-weight: var(--font-weight-light);",
  "--type-1-line-height: var(--line-height-fixed-0);",
  "--type-1-font-size: var(--font-size-0);",
  "--type-1-letter-spacing: var(--letter-spacing-normal);",
  "--type-1-paragraph-spacing: var(--paragraph-spacing-normal);",
  "--type-1-text-decoration: var(--text-decoration-none);",
  "--type-1-text-case: var(--text-case-none);",
  "--compound-font-family: var(--type-1-font-family);",
  "--compound-font-weight: var(--type-1-font-weight);",
  "--compound-line-height: var(--type-1-line-height);",
  "--compound-font-size: var(--type-1-font-size);",
  "--compound-letter-spacing: var(--type-1-letter-spacing);",
  "--compound-paragraph-spacing: var(--type-1-paragraph-spacing);",
  "--compound-text-decoration: var(--type-1-text-decoration);",
  "--compound-text-case: var(--type-1-text-case);",
  "}",
];

export const cssRoot = [
  ":root {",
  "--sizing-1: 10px;",
  "--color-neutral-blk-240: #333;",
  "--font-family-primary: Robato;",
  "--font-weight-light: 300;",
  "--line-height-fixed-0: 1rem;",
  "--font-size-0: 14px;",
  "--letter-spacing-normal: 1rem;",
  "--paragraph-spacing-normal: 1rem;",
  "--text-decoration-none: none;",
  "--text-case-none: none;",
  "--opacity-4: 40%;",
  "--opacity-8: 80%;",
  "--boxShadow-1: 0 2 8 0 rgba(var(--color-neutral-blk-240), var(--opacity-4));",
  "--boxShadow-2: 0 4 16 0 rgba(var(--color-neutral-blk-240), var(--opacity-4));",
  "--boxShadow: 0 2 8 0 rgba(var(--color-neutral-blk-240), var(--opacity-4)), 0 4 16 0 rgba(var(--color-neutral-blk-240), var(--opacity-4));",
  "--type-1-font-family: var(--font-family-primary);",
  "--type-1-font-weight: var(--font-weight-light);",
  "--type-1-line-height: var(--line-height-fixed-0);",
  "--type-1-font-size: var(--font-size-0);",
  "--type-1-letter-spacing: var(--letter-spacing-normal);",
  "--type-1-paragraph-spacing: var(--paragraph-spacing-normal);",
  "--type-1-text-decoration: var(--text-decoration-none);",
  "--type-1-text-case: var(--text-case-none);",
  "--compound-font-family: var(--type-1-font-family);",
  "--compound-font-weight: var(--type-1-font-weight);",
  "--compound-line-height: var(--type-1-line-height);",
  "--compound-font-size: var(--type-1-font-size);",
  "--compound-letter-spacing: var(--type-1-letter-spacing);",
  "--compound-paragraph-spacing: var(--type-1-paragraph-spacing);",
  "--compound-text-decoration: var(--type-1-text-decoration);",
  "--compound-text-case: var(--type-1-text-case);",
  "--box-shadow: 0 2 8 0 rgba(#333, 0.4), 0 4 16 0 rgba(#333, 0.8)",
  "}",
];

export const cssClasses = [".boxShadow { box-shadow: var(--boxShadow); }"];

export const js = {
  core: {
    sizing: {
      1: 10,
    },
    color: {
      neutral: {
        "blk-240": "#333",
      },
    },
    font: {
      "font-family": {
        primary: "Robato",
      },
      "font-weight": {
        light: 300,
      },
      "line-height": {
        fixed: {
          0: "1rem",
        },
      },
      "font-size": {
        0: "14px",
      },
      "letter-spacing": {
        normal: "1rem",
      },
      "paragraph-spacing": {
        normal: "1rem",
      },
      "text-decoration": {
        none: "none",
      },
      "text-case": {
        none: "none",
      },
    },
    opacity: {
      4: "40%",
      8: "80%",
    },
  },
  boxShadow: [
    {
      x: "0",
      y: "2",
      blur: "8",
      spread: "0",
      color: "rgba(#333, 40%)",
      type: "dropShadow",
    },
    {
      x: "0",
      y: "4",
      blur: "16",
      spread: "0",
      color: "rgba(#333, 80%)",
      type: "dropShadow",
    },
  ],
  type: {
    "1": {
      get "font-family"(): string | number {
        return this.core.font["font-family"].primary;
      },
      get "font-size"(): string | number {
        return this.core.font["font-size"]["0"];
      },
      get "font-weight"(): string | number {
        return this.core.font["font-weight"].light;
      },
      get "letter-spacing"(): string | number {
        return this.core.font["letter-spacing"].normal;
      },
      get "line-height"(): string | number {
        return this.core.font["line-height"].fixed["0"];
      },
      get "paragraph-spacing"(): string | number {
        return this.core.font["paragraph-spacing"].normal;
      },
      get "text-case"(): string | number {
        return this.core.font["text-case"].none;
      },
      get "text-decoration"(): string | number {
        return this.core.font["text-decoration"].none;
      },
    },
  },
};

export const json = {
  core: {
    sizing: { 1: 10 },
    color: {
      neutral: {
        "blk-240": "#333",
      },
    },
    font: {
      "font-family": {
        primary: "Robato",
      },
      "font-weight": {
        light: 300,
      },
      "line-height": {
        fixed: {
          0: "1rem",
        },
      },
      "font-size": {
        0: "14px",
      },
      "letter-spacing": {
        normal: "1rem",
      },
      "paragraph-spacing": {
        normal: "1rem",
      },
      "text-decoration": {
        none: "none",
      },
      "text-case": {
        none: "none",
      },
    },
    opacity: {
      4: "40%",
      8: "80%",
    },
  },
  boxShadow: [
    {
      x: "0",
      y: "2",
      blur: "8",
      spread: "0",
      color: `rgba(#333333, 0.4)`,
      type: "dropShadow",
    },
    {
      x: "0",
      y: "4",
      blur: "16",
      spread: "0",
      color: `rgba(#333333, 0.8)`,
      type: "dropShadow",
    },
  ],
  type: {
    "1": {
      "font-family": "Robato",
      "font-size": "14px",
      "font-weight": 300,
      "letter-spacing": "1rem",
      "line-height": "1rem",
      "paragraph-spacing": "1rem",
      "text-case": "none",
      "text-decoration": "none",
    },
  },
};
