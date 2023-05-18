export const scss = `
  $core-1: 10;
  $core-color-neutral-blk-240: #333;
  $core-font-family-primary: Robato;
  $core-font-weight-light: 300;
  $core-line-height-fixed-0: 1rem;
  $core-font-size-0: 14px;
  $core-letter-spacing-normal: 1rem;
  $core-paragraph-spacing-normal: 1rem;
  $core-text-decoration-none: none;
  $core-text-case-none: none;
  $core-opacity-4: 40%;
  $core-opacity-8: 80%;
  $boxShadow-1: 0 2 8 0 rgba($core-color-neutral-blk-240, $core-opacity-4);
  $boxShadow-2: 0 4 16 0 rgba($core-color-neutral-blk-240, $core-opacity-8);
  $boxShadow: $boxShadow-1, $boxShadow-2;
  $type-1-font-family: $core-font-family-primary;
  $type-1-font-weight: $core-font-weight-light;
  $type-1-line-height: $core-line-height-fixed-0;
  $type-1-font-size: $core-font-size-0;
  $type-1-letter-spacing: $core-letter-spacing-normal;
  $type-1-paragraph-spacing: $core-paragraph-spacing-normal;
  $type-1-text-decoration: $core-text-decoration-none;
  $type-1-text-case: $core-text-case-none;
  $compound-font-family: $type-1-font-family;
  $compound-font-weight: $type-1-font-weight;
  $compound-line-height: $type-1-line-height;
  $compound-font-size: $type-1-font-size;
  $compound-letter-spacing: $type-1-letter-spacing;
  $compound-paragraph-spacing: $type-1-paragraph-spacing;
  $compound-text-decoration: $type-1-text-decoration;
  $compound-text-case: $type-1-text-case;

  @mixin boxShadow {
    box-shadow: $boxShadow;
  }
`;

export const css = `
  --core-1: 10;
  --core-color-neutral-blk-240: #333;
  --core-font-family-primary: Robato;
  --core-font-weight-light: 300;
  --core-line-height-fixed-0: 1rem;
  --core-font-size-0: 14px;
  --core-letter-spacing-normal: 1rem;
  --core-paragraph-spacing-normal: 1rem;
  --core-text-decoration-none: none;
  --core-text-case-none: none;
  --core-opacity-4: 40%;
  --core-opacity-8: 80%;
  --boxShadow-1: 0 2 8 0 rgba(var(--core-color-neutral-blk-240), var(--core-opacity-4));
  --boxShadow-2: 0 4 16 0 rgba(var(--core-color-neutral-blk-240), var(--core-opacity-4));
  --boxShadow: 0 2 8 0 rgba(var(--core-color-neutral-blk-240), var(--core-opacity-4)), 0 4 16 0 rgba(var(--core-color-neutral-blk-240), var(--core-opacity-4));
  --type-1-font-family: var(--core-font-family-primary);
  --type-1-font-weight: var(--core-font-weight-light);
  --type-1-line-height: var(--core-line-height-fixed-0);
  --type-1-font-size: var(--core-font-size-0);
  --type-1-letter-spacing: var(--core-letter-spacing-normal);
  --type-1-paragraph-spacing: var(--core-paragraph-spacing-normal);
  --type-1-text-decoration: var(--core-text-decoration-none);
  --type-1-text-case: var(--core-text-case-none);
  --compound-font-family: var(--type-1-font-family);
  --compound-font-weight: var(--type-1-font-weight);
  --compound-line-height: var(--type-1-line-height);
  --compound-font-size: var(--type-1-font-size);
  --compound-letter-spacing: var(--type-1-letter-spacing);
  --compound-paragraph-spacing: var(--type-1-paragraph-spacing);
  --compound-text-decoration: var(--type-1-text-decoration);
  --compound-text-case: var(--type-1-text-case);

  .boxShadow {
    box-shadow: var(--boxShadow);
  }
`;

export const js = {
  core: {
    1: 10,
    color: {
      neutral: {
        "blk-240": "#333"
      }
    },
    font: {
      "font-family": {
        primary: "Robato"
      },
      "font-weight": {
        light: 300
      },
      "line-height": {
        fixed: {
          0: "1rem"
        }
      },
      "font-size": {
        0: "14px"
      },
      "letter-spacing": {
        normal: "1rem"
      },
      "paragraph-spacing": {
        normal: "1rem"
      },
      "text-decoration": {
        none: "none"
      },
      "text-case": {
        none: "none"
      }
    },
    opacity: {
      4: "40%",
      8: "80%"
    }
  },
  boxShadow: [
    {
      x: "0",
      y: "2",
      blur: "8",
      spread: "0",
      // @ts-expect-error - allow "this" here
      color: `rgba(${this.core.color.neutral["blk-240"]}, ${this.core.opacity["4"]})`,
      type: "dropShadow"
    },
    {
      x: "0",
      y: "4",
      blur: "16",
      spread: "0",
      // @ts-expect-error - allow "this" here
      color: `rgba(${this.core.color.neutral["blk-240"]}, ${this.core.opacity["8"]})`,
      type: "dropShadow"
    }
  ],
  type: {
    "1": {
      // @ts-expect-error - allow "this" here
      "font-family": `${this.core.font["font-family"].primary}`,
      // @ts-expect-error - allow "this" here
      "font-size": `${this.core.font["font-size"]["0"]}`,
      // @ts-expect-error - allow "this" here
      "font-weight": `${this.core.font["font-weight"].light}`,
      // @ts-expect-error - allow "this" here
      "letter-spacing": `${this.core.font["letter-spacing"].normal}`,
      // @ts-expect-error - allow "this" here
      "line-height": `${this.core.font["line-height"].fixed["0"]}`,
      // @ts-expect-error - allow "this" here
      "paragraph-spacing": `${this.core.font["paragraph-spacing"].normal}`,
      // @ts-expect-error - allow "this" here
      "text-case": `${this.core.font["text-case"].none}`,
      // @ts-expect-error - allow "this" here
      "text-decoration": `${this.core.font["text-decoration"].none}`
    }
  }
};

export const json = {
  core: {
    1: 10,
    color: {
      neutral: {
        "blk-240": "#333"
      }
    },
    font: {
      "font-family": {
        primary: "Robato"
      },
      "font-weight": {
        light: 300
      },
      "line-height": {
        fixed: {
          0: "1rem"
        }
      },
      "font-size": {
        0: "14px"
      },
      "letter-spacing": {
        normal: "1rem"
      },
      "paragraph-spacing": {
        normal: "1rem"
      },
      "text-decoration": {
        none: "none"
      },
      "text-case": {
        none: "none"
      }
    },
    opacity: {
      4: "40%",
      8: "80%"
    }
  },
  boxShadow: [
    {
      x: "0",
      y: "2",
      blur: "8",
      spread: "0",
      color: `rgba(#333333, 0.4)`,
      type: "dropShadow"
    },
    {
      x: "0",
      y: "4",
      blur: "16",
      spread: "0",
      color: `rgba(#333333, 0.8)`,
      type: "dropShadow"
    }
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
      "text-decoration": "none"
    }
  }
};
