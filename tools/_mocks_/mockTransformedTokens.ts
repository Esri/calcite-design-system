export const tokens = {
  core: {
    1: {
      type: "sizing",
      value: "10"
    },
    color: {
      neutral: {
        "blk-240": {
          value: "#333",
          type: "color"
        }
      }
    },
    font: {
      "font-family": {
        primary: {
          type: "typography",
          value: "Robato"
        }
      },
      "font-weight": {
        light: {
          type: "typography",
          value: 300
        }
      },
      "line-height": {
        fixed: {
          "0": {
            type: "typography",
            value: "1rem"
          }
        }
      },
      "font-size": {
        "0": {
          type: "typography",
          value: "14px"
        }
      },
      "letter-spacing": {
        normal: {
          type: "typography",
          value: "1rem"
        }
      },
      "paragraph-spacing": {
        normal: {
          type: "typography",
          value: "1rem"
        }
      },
      "text-decoration": {
        none: {
          type: "typography",
          value: "none"
        }
      },
      "text-case": {
        none: {
          type: "typography",
          value: "none"
        }
      }
    },
    opacity: {
      "4": {
        value: "40%",
        type: "opacity"
      },
      "8": {
        value: "80%",
        type: "opacity"
      }
    }
  },
  compound: {
    "font-family": {
      value: "{type.1.font-family}",
      type: "typography"
    },
    "font-weight": {
      value: "{type.1.font-weight}",
      type: "typography"
    },
    "line-height": {
      value: "{type.1.line-height}",
      type: "typography"
    },
    "font-size": {
      value: "{type.1.font-size}",
      type: "typography"
    },
    "letter-spacing": {
      value: "{type.1.letter-spacing}",
      type: "typography"
    },
    "paragraph-spacing": {
      value: "{type.1.paragraph-spacing}",
      type: "typography"
    },
    "text-decoration": {
      value: "{type.1.text-decoration}",
      type: "typography"
    },
    "text-case": {
      value: "{type.1.text-case}",
      type: "typography"
    }
  },
  boxShadow: {
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
    ],
    type: "boxShadow"
  },
  type: {
    1: {
      "font-family": {
        value: "{core.font.font-family.primary}",
        type: "typography"
      },
      "font-weight": {
        value: "{core.font.font-weight.light}",
        type: "typography"
      },
      "line-height": {
        value: "{core.font.line-height.fixed.0}",
        type: "typography"
      },
      "font-size": {
        value: "{core.font.font-size.0}",
        type: "typography"
      },
      "letter-spacing": {
        value: "{core.font.letter-spacing.normal}",
        type: "typography"
      },
      "paragraph-spacing": {
        value: "{core.font.paragraph-spacing.normal}",
        type: "typography"
      },
      "text-decoration": {
        value: "{core.font.text-decoration.none}",
        type: "typography"
      },
      "text-case": {
        value: "{core.font.text-case.none}",
        type: "typography"
      }
    }
  }
};
