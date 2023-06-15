export const tokens = {
  core: {
    sizing: {
      1: {
        type: "sizing",
        value: "10"
      }
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
          type: "typography/font-family",
          value: "Robato"
        }
      },
      "font-weight": {
        light: {
          type: "typography/font-weights",
          value: 300
        }
      },
      "line-height": {
        fixed: {
          "0": {
            type: "typography/line-heights",
            value: "1rem"
          }
        }
      },
      "font-size": {
        "0": {
          type: "typography/font-size",
          value: "14px"
        }
      },
      "letter-spacing": {
        normal: {
          type: "typography/letter-spacing",
          value: "1rem"
        }
      },
      "paragraph-spacing": {
        normal: {
          type: "typography/paragraph-spacing",
          value: "1rem"
        }
      },
      "text-decoration": {
        none: {
          type: "typography/font-style",
          value: "none"
        }
      },
      "text-case": {
        none: {
          type: "typography/text-case",
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
  "box-shadow": {
    default: {
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
      ],
      type: "boxShadow"
    },
    "0": {
      type: "boxShadow",
      value: {
        x: "0",
        y: "2",
        blur: "8",
        spread: "0",
        color: "rgba({core.color.neutral.blk-240}, {core.opacity.4})"
      }
    },
    "1": {
      type: "boxShadow",
      value: {
        x: "0",
        y: "4",
        blur: "16",
        spread: "0",
        color: "rgba({core.color.neutral.blk-240}, {core.opacity.8})"
      }
    }
  },
  type: {
    1: {
      "font-family": {
        value: "{core.font.font-family.primary}",
        type: "typography/font-family"
      },
      "font-weight": {
        value: "{core.font.font-weight.light}",
        type: "typography/font-weights"
      },
      "line-height": {
        value: "{core.font.line-height.fixed.0}",
        type: "typography/line-heights"
      },
      "font-size": {
        value: "{core.font.font-size.0}",
        type: "typography/font-size"
      },
      "letter-spacing": {
        value: "{core.font.letter-spacing.normal}",
        type: "typography/letter-spacing"
      },
      "paragraph-spacing": {
        value: "{core.font.paragraph-spacing.normal}",
        type: "typography/paragraph-spacing"
      },
      "text-decoration": {
        value: "{core.font.text-decoration.none}",
        type: "typography/text-decoration"
      },
      "text-case": {
        value: "{core.font.text-case.none}",
        type: "typography/text-case"
      }
    }
  }
};
