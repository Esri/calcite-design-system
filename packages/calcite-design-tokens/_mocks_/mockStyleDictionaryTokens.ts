import { Dictionary } from "style-dictionary";

export const MockTransformedToken = {
  name: "mock-token",
  value: "example",
  path: ["core", "token"],
  original: {
    value: "example"
  },
  filePath: "core.json",
  isSource: false
};

export const mockGetReference = jest.fn().mockReturnValue(MockTransformedToken);

export const transformedTokens = {
  core: {
    sizing: {
      1: {
        name: "sizing-1",
        value: "10",
        attribute: {
          type: "sizing"
        },
        path: ["core", "sizing", "1"],
        original: {
          value: "10"
        },
        filePath: "core.json",
        isSource: true
      }
    },
    color: {
      neutral: {
        "blk-240": {
          name: "color-neutral-blk-240",
          value: "#333",
          attribute: {
            type: "color"
          },
          path: ["core", "color", "neutral", "blk", "240"],
          original: {
            value: "#333"
          },
          filePath: "core.json",
          isSource: true
        }
      }
    },
    font: {
      "font-family": {
        primary: {
          name: "font-family-primary",
          value: "Robato",
          attribute: {
            type: "typography/font-family"
          },
          path: ["core", "font", "font-family", "primary"],
          original: {
            value: "Robato"
          },
          filePath: "core.json",
          isSource: true
        }
      },
      "font-weight": {
        light: {
          name: "font-weight-light",
          value: 300,
          attribute: {
            type: "typography/font-weights"
          },
          path: ["core", "font", "font-weight", "light"],
          original: {
            value: 300
          },
          filePath: "core.json",
          isSource: true
        }
      },
      "line-height": {
        fixed: {
          "0": {
            name: "line-height-fixed-0",
            value: "1rem",
            attribute: {
              type: "typography/line-heights"
            },
            path: ["core", "font", "line-height", "fixed", "0"],
            original: {
              value: "1rem"
            },
            filePath: "core.json",
            isSource: true
          }
        }
      },
      "font-size": {
        "0": {
          name: "font-size-0",
          value: "1rem",
          attribute: {
            type: "typography/font-size"
          },
          path: ["core", "font", "font-size", "0"],
          original: {
            value: "1rem"
          },
          filePath: "core.json",
          isSource: true
        }
      },
      "letter-spacing": {
        normal: {
          name: "letter-spacing-normal",
          value: "1rem",
          attribute: {
            type: "typography/letter-spacing"
          },
          path: ["core", "font", "letter-spacing", "normal"],
          original: {
            value: "1rem"
          },
          filePath: "core.json",
          isSource: true
        }
      },
      "paragraph-spacing": {
        normal: {
          name: "paragraph-spacing-normal",
          value: "1rem",
          attribute: {
            type: "typography/paragraph-spacing"
          },
          path: ["core", "font", "paragraph-spacing", "normal"],
          original: {
            value: "1rem"
          },
          filePath: "core.json",
          isSource: true
        }
      },
      "text-decoration": {
        none: {
          name: "text-decoration-none",
          value: "none",
          attribute: {
            type: "typography/font-style"
          },
          path: ["core", "font", "text-decoration", "none"],
          original: {
            value: "none"
          },
          filePath: "core.json",
          isSource: true
        }
      },
      "text-case": {
        none: {
          name: "text-case-none",
          value: "none",
          attribute: {
            type: "typography/text-case"
          },
          path: ["core", "font", "text-case", "none"],
          original: {
            value: "none"
          },
          filePath: "core.json",
          isSource: true
        }
      }
    },
    opacity: {
      "4": {
        name: "opacity-4",
        value: "40%",
        attribute: {
          type: "opacity"
        },
        path: ["core", "opacity", "4"],
        original: {
          value: "40%"
        },
        filePath: "core.json",
        isSource: true
      },
      "8": {
        name: "opacity-4",
        value: "80%",
        attribute: {
          type: "opacity"
        },
        path: ["core", "opacity", "8"],
        original: {
          value: "80%"
        },
        filePath: "core.json",
        isSource: true
      }
    }
  },
  compound: {
    "font-family": {
      name: "compound-font-family",
      value: "{type.1.font-family}",
      attribute: {
        type: "typography"
      },
      path: ["core", "compound", "font-family"],
      original: {
        value: "{type.1.font-family}"
      },
      filePath: "core.json",
      isSource: true
    },
    "font-weight": {
      name: "compound-font-weight",
      value: "{type.1.font-weight}",
      attribute: {
        type: "typography"
      },
      path: ["core", "compound", "font-weight"],
      original: {
        value: "{type.1.font-weight}"
      },
      filePath: "core.json",
      isSource: true
    },
    "line-height": {
      name: "compound-line-height",
      value: "{type.1.line-height}",
      attribute: {
        type: "typography"
      },
      path: ["core", "compound", "line-height"],
      original: {
        value: "{type.1.line-height}"
      },
      filePath: "core.json",
      isSource: true
    },
    "font-size": {
      name: "compound-font-size",
      value: "{type.1.font-size}",
      attribute: {
        type: "typography"
      },
      path: ["core", "compound", "font-size"],
      original: {
        value: "{type.1.font-size}"
      },
      filePath: "core.json",
      isSource: true
    },
    "letter-spacing": {
      name: "compound-letter-spacing",
      value: "{type.1.letter-spacing}",
      attribute: {
        type: "typography"
      },
      path: ["core", "compound", "letter-spacing"],
      original: {
        value: "{type.1.letter-spacing}"
      },
      filePath: "core.json",
      isSource: true
    },
    "paragraph-spacing": {
      name: "compound-paragraph-spacing",
      value: "{type.1.paragraph-spacing}",
      attribute: {
        type: "typography"
      },
      path: ["core", "compound", "paragraph-spacing"],
      original: {
        value: "{type.1.paragraph-spacing}"
      },
      filePath: "core.json",
      isSource: true
    },
    "text-decoration": {
      name: "compound-text-decoration",
      value: "{type.1.text-decoration}",
      attribute: {
        type: "typography"
      },
      path: ["core", "compound", "text-decoration"],
      original: {
        value: "{type.1.text-decoration}"
      },
      filePath: "core.json",
      isSource: true
    },
    "text-case": {
      name: "compound-text-case",
      value: "{type.1.text-case}",
      attribute: {
        type: "typography"
      },
      path: ["core", "compound", "text-case"],
      original: {
        value: "{type.1.text-case}"
      },
      filePath: "core.json",
      isSource: true
    }
  },
  "box-shadow": {
    default: {
      name: "box-shadow",
      value:
        "0 2 8 0 rgba({core.color.neutral.blk-240}, {core.opacity.4}), 0 4 16 0 rgba({core.color.neutral.blk-240}, {core.opacity.8})",
      attribute: {
        type: "boxShadow"
      },
      path: ["box-shadow", "default"],
      original: {
        value: [
          {
            x: "0",
            y: "2",
            blur: "8",
            spread: "0",
            color: "rgba({core.color.neutral.blk-240}, {core.opacity.4})"
          },
          {
            x: "0",
            y: "4",
            blur: "16",
            spread: "0",
            color: "rgba({core.color.neutral.blk-240}, {core.opacity.8})"
          }
        ]
      },
      filePath: "core.json",
      isSource: true
    },
    "0": {
      name: "box-shadow-0",
      value: "0 2 8 0 rgba({core.color.neutral.blk-240}, {core.opacity.4})",
      attribute: {
        type: "boxShadow"
      },
      path: ["box-shadow", "0"],
      original: {
        value: {
          x: "0",
          y: "2",
          blur: "8",
          spread: "0",
          color: "rgba({core.color.neutral.blk-240}, {core.opacity.4})"
        }
      },
      filePath: "core.json",
      isSource: true
    },
    "1": {
      name: "box-shadow-1",
      value: "0 4 16 0 rgba({core.color.neutral.blk-240}, {core.opacity.8})",
      attribute: {
        type: "boxShadow"
      },
      path: ["box-shadow", "1"],
      original: {
        value: {
          x: "0",
          y: "4",
          blur: "16",
          spread: "0",
          color: "rgba({core.color.neutral.blk-240}, {core.opacity.8})"
        }
      },
      filePath: "core.json",
      isSource: true
    }
  },
  type: {
    1: {
      "font-family": {
        name: "type-1-font-family",
        value: "{core.font.font-family.primary}",
        attribute: {
          type: "typography/font-family"
        },
        path: ["core", "type", "1", "font-family"],
        original: {
          value: "{core.font.font-family.primary}"
        },
        filePath: "core.json",
        isSource: true
      },
      "font-weight": {
        name: "type-1-font-weight",
        value: "{core.font.font-family.primary}",
        attribute: {
          type: "typography/font-weights"
        },
        path: ["core", "type", "1", "font-weight"],
        original: {
          value: "{core.font.font-family.primary}"
        },
        filePath: "core.json",
        isSource: true
      },
      "line-height": {
        name: "type-1-line-height",
        value: "{core.font.line-height.fixed.0}",
        attribute: {
          type: "typography/line-heights"
        },
        path: ["core", "type", "1", "line-height"],
        original: {
          value: "{core.font.line-height.fixed.0}"
        },
        filePath: "core.json",
        isSource: true
      },
      "font-size": {
        name: "type-1-font-size",
        value: "{core.font.font-size.0}",
        attribute: {
          type: "typography/font-size"
        },
        path: ["core", "type", "1", "font-size"],
        original: {
          value: "{core.font.font-size.0}"
        },
        filePath: "core.json",
        isSource: true
      },
      "letter-spacing": {
        name: "type-1-letter-spacing",
        value: "{core.font.letter-spacing.normal}",
        attribute: {
          type: "typography/letter-spacing"
        },
        path: ["core", "type", "1", "letter-spacing"],
        original: {
          value: "{core.font.letter-spacing.normal}"
        },
        filePath: "core.json",
        isSource: true
      },
      "paragraph-spacing": {
        name: "type-1-paragraph-spacing",
        value: "{core.font.paragraph-spacing.normal}",
        attribute: {
          type: "typography/paragraph-spacing"
        },
        path: ["core", "type", "1", "paragraph-spacing"],
        original: {
          value: "{core.font.paragraph-spacing.normal}"
        },
        filePath: "core.json",
        isSource: true
      },
      "text-decoration": {
        name: "type-1-text-decoration",
        value: "{core.font.text-decoration.none}",
        attribute: {
          type: "typography/text-decoration"
        },
        path: ["core", "type", "1", "text-decoration"],
        original: {
          value: "{core.font.text-decoration.none}"
        },
        filePath: "core.json",
        isSource: true
      },
      "text-case": {
        name: "type-1-text-case",
        value: "{core.font.text-case.none}",
        attribute: {
          type: "typography/text-case"
        },
        path: ["core", "type", "1", "text-case"],
        original: {
          value: "{core.font.text-case.none}"
        },
        filePath: "core.json",
        isSource: true
      }
    }
  }
};

export const transformedTokenArray = [
  {
    name: "sizing-1",
    value: "10",
    attribute: {
      type: "sizing"
    },
    path: ["core", "sizing", "1"],
    original: {
      value: "10"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "color-neutral-blk-240",
    value: "#333",
    attribute: {
      type: "color"
    },
    path: ["core", "color", "neutral", "blk", "240"],
    original: {
      value: "#333"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "font-family-primary",
    value: "Robato",
    attribute: {
      type: "typography/font-family"
    },
    path: ["core", "font", "font-family", "primary"],
    original: {
      value: "Robato"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "font-weight-light",
    value: 300,
    attribute: {
      type: "typography/font-weights"
    },
    path: ["core", "font", "font-weight", "light"],
    original: {
      value: 300
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "line-height-fixed-0",
    value: "1rem",
    attribute: {
      type: "typography/line-heights"
    },
    path: ["core", "font", "line-height", "fixed", "0"],
    original: {
      value: "1rem"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "font-size-0",
    value: "1rem",
    attribute: {
      type: "typography/font-size"
    },
    path: ["core", "font", "font-size", "0"],
    original: {
      value: "1rem"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "letter-spacing-normal",
    value: "1rem",
    attribute: {
      type: "typography/letter-spacing"
    },
    path: ["core", "font", "letter-spacing", "normal"],
    original: {
      value: "1rem"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "paragraph-spacing-normal",
    value: "1rem",
    attribute: {
      type: "typography/paragraph-spacing"
    },
    path: ["core", "font", "paragraph-spacing", "normal"],
    original: {
      value: "1rem"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "text-decoration-none",
    value: "none",
    attribute: {
      type: "typography/font-style"
    },
    path: ["core", "font", "text-decoration", "none"],
    original: {
      value: "none"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "text-case-none",
    value: "none",
    attribute: {
      type: "typography/text-case"
    },
    path: ["core", "font", "text-case", "none"],
    original: {
      value: "none"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "opacity-4",
    value: "40%",
    attribute: {
      type: "opacity"
    },
    path: ["core", "opacity", "4"],
    original: {
      value: "40%"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "opacity-4",
    value: "80%",
    attribute: {
      type: "opacity"
    },
    path: ["core", "opacity", "8"],
    original: {
      value: "80%"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "compound-font-family",
    value: "{type.1.font-family}",
    attribute: {
      type: "typography"
    },
    path: ["core", "compound", "font-family"],
    original: {
      value: "{type.1.font-family}"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "compound-font-weight",
    value: "{type.1.font-weight}",
    attribute: {
      type: "typography"
    },
    path: ["core", "compound", "font-weight"],
    original: {
      value: "{type.1.font-weight}"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "compound-line-height",
    value: "{type.1.line-height}",
    attribute: {
      type: "typography"
    },
    path: ["core", "compound", "line-height"],
    original: {
      value: "{type.1.line-height}"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "compound-font-size",
    value: "{type.1.font-size}",
    attribute: {
      type: "typography"
    },
    path: ["core", "compound", "font-size"],
    original: {
      value: "{type.1.font-size}"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "compound-letter-spacing",
    value: "{type.1.letter-spacing}",
    attribute: {
      type: "typography"
    },
    path: ["core", "compound", "letter-spacing"],
    original: {
      value: "{type.1.letter-spacing}"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "compound-paragraph-spacing",
    value: "{type.1.paragraph-spacing}",
    attribute: {
      type: "typography"
    },
    path: ["core", "compound", "paragraph-spacing"],
    original: {
      value: "{type.1.paragraph-spacing}"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "compound-text-decoration",
    value: "{type.1.text-decoration}",
    attribute: {
      type: "typography"
    },
    path: ["core", "compound", "text-decoration"],
    original: {
      value: "{type.1.text-decoration}"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "compound-text-case",
    value: "{type.1.text-case}",
    attribute: {
      type: "typography"
    },
    path: ["core", "compound", "text-case"],
    original: {
      value: "{type.1.text-case}"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "box-shadow",
    value:
      "0 2 8 0 rgba({core.color.neutral.blk-240}, {core.opacity.4}), 0 4 16 0 rgba({core.color.neutral.blk-240}, {core.opacity.8})",
    attribute: {
      type: "boxShadow"
    },
    path: ["box-shadow", "default"],
    original: {
      value: [
        {
          x: "0",
          y: "2",
          blur: "8",
          spread: "0",
          color: "rgba({core.color.neutral.blk-240}, {core.opacity.4})",
          type: "shadow"
        },
        {
          x: "0",
          y: "4",
          blur: "16",
          spread: "0",
          color: "rgba({core.color.neutral.blk-240}, {core.opacity.8})",
          type: "shadow"
        }
      ]
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "box-shadow-0",
    value: "0 2 8 0 rgba({core.color.neutral.blk-240}, {core.opacity.4})",
    attribute: {
      type: "boxShadow"
    },
    path: ["box-shadow", "0"],
    original: {
      value: {
        x: "0",
        y: "2",
        blur: "8",
        spread: "0",
        color: "rgba({core.color.neutral.blk-240}, {core.opacity.4})",
        type: "shadow"
      }
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "box-shadow-1",
    value: "0 4 16 0 rgba({core.color.neutral.blk-240}, {core.opacity.8})",
    attribute: {
      type: "boxShadow"
    },
    path: ["box-shadow", "1"],
    original: {
      value: {
        x: "0",
        y: "4",
        blur: "16",
        spread: "0",
        color: "rgba({core.color.neutral.blk-240}, {core.opacity.8})",
        type: "shadow"
      }
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "type-1-font-family",
    value: "{core.font.font-family.primary}",
    attribute: {
      type: "typography/font-family"
    },
    path: ["core", "type", "1", "font-family"],
    original: {
      value: "{core.font.font-family.primary}"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "type-1-font-weight",
    value: "{core.font.font-family.primary}",
    attribute: {
      type: "typography/font-weights"
    },
    path: ["core", "type", "1", "font-weight"],
    original: {
      value: "{core.font.font-family.primary}"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "type-1-line-height",
    value: "{core.font.line-height.fixed.0}",
    attribute: {
      type: "typography/line-heights"
    },
    path: ["core", "type", "1", "line-height"],
    original: {
      value: "{core.font.line-height.fixed.0}"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "type-1-font-size",
    value: "{core.font.font-size.0}",
    attribute: {
      type: "typography/font-size"
    },
    path: ["core", "type", "1", "font-size"],
    original: {
      value: "{core.font.font-size.0}"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "type-1-letter-spacing",
    value: "{core.font.letter-spacing.normal}",
    attribute: {
      type: "typography/letter-spacing"
    },
    path: ["core", "type", "1", "letter-spacing"],
    original: {
      value: "{core.font.letter-spacing.normal}"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "type-1-paragraph-spacing",
    value: "{core.font.paragraph-spacing.normal}",
    attribute: {
      type: "typography/paragraph-spacing"
    },
    path: ["core", "type", "1", "paragraph-spacing"],
    original: {
      value: "{core.font.paragraph-spacing.normal}"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "type-1-text-decoration",
    value: "{core.font.text-decoration.none}",
    attribute: {
      type: "typography/text-decoration"
    },
    path: ["core", "type", "1", "text-decoration"],
    original: {
      value: "{core.font.text-decoration.none}"
    },
    filePath: "core.json",
    isSource: true
  },
  {
    name: "type-1-text-case",
    value: "{core.font.text-case.none}",
    attribute: {
      type: "typography/text-case"
    },
    path: ["core", "type", "1", "text-case"],
    original: {
      value: "{core.font.text-case.none}"
    },
    filePath: "core.json",
    isSource: true
  }
];

export const tokens: Dictionary = {
  allTokens: transformedTokenArray,
  tokens: transformedTokens,
  allProperties: transformedTokenArray,
  properties: transformedTokens,
  usesReference: () => true,
  getReferences: mockGetReference
};
