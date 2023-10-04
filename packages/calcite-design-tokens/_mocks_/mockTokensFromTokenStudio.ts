export const tokens = {
  "[placeholder-component]": {
    type: "other",
    value: "#333",
  },
  placeholder: {
    type: "other",
    value: "[placeholder-value]",
  },
  core: {
    sizing: {
      1: {
        type: "sizing",
        value: "10",
      },
    },
    color: {
      neutral: {
        "blk-240": {
          value: "#333",
          type: "color",
        },
      },
    },
    font: {
      "font-family": {
        primary: {
          type: "typography",
          value: "Robato",
        },
      },
      "font-weight": {
        light: {
          type: "typography",
          value: 300,
        },
      },
      "line-height": {
        fixed: {
          "0": {
            type: "typography",
            value: "1rem",
          },
        },
      },
      "font-size": {
        "0": {
          type: "typography",
          value: "14px",
        },
      },
      "letter-spacing": {
        normal: {
          type: "typography",
          value: "1rem",
        },
      },
      "paragraph-spacing": {
        normal: {
          type: "typography",
          value: "1rem",
        },
      },
      "text-decoration": {
        none: {
          type: "typography",
          value: "none",
        },
      },
      "text-case": {
        none: {
          type: "typography",
          value: "none",
        },
      },
    },
    opacity: {
      "4": {
        value: "40%",
        type: "opacity",
      },
    },
  },
  compound: {
    value: "$type.1",
    type: "typography",
  },
  boxShadow: {
    value: [
      {
        x: "0",
        y: "2",
        blur: "8",
        spread: "0",
        color: "rgba($core.color.neutral.blk-240, $core.opacity.4)",
        type: "dropShadow",
      },
      {
        x: "0",
        y: "4",
        blur: "16",
        spread: "0",
        color: "rgba($core.color.neutral.blk-240, $core.opacity.8)",
        type: "dropShadow",
      },
    ],
    type: "boxShadow",
  },
  type: {
    "1": {
      value: {
        fontFamily: "$core.font.font-family.primary",
        fontWeight: "$core.font.font-weight.light",
        lineHeight: "$core.font.line-height.fixed.0",
        fontSize: "$core.font.font-size.0",
        letterSpacing: "$core.font.letter-spacing.normal",
        paragraphSpacing: "$core.font.paragraph-spacing.normal",
        textDecoration: "$core.font.text-decoration.none",
        textCase: "$core.font.text-case.none",
      },
      type: "typography",
    },
  },
  component: {
    shadow: {
      value: "$boxShadow",
      type: "shadow",
    },
  },
};
