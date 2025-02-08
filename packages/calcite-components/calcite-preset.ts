import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import plugin from "tailwindcss/plugin";

/**
 * This helper inverts a value based on a boolean CSS prop flag
 *
 * When the flag is 0, it will not be inverted. When 1, it will invert it (multiplied by -1)
 *
 * @param {string} value - the CSS value to invert
 * @param {string} flagPropName - the boolean CSS prop (value must be 0 or 1)
 */
function invert(value: string, flagPropName: string): string {
  return `calc(
            ${value} *
            calc(
              1 -
              2 * clamp(
                0,
                var(${flagPropName}),
                1
              )
            )
          )`;
}

export default {
  theme: {
    borderColor: ({ theme }): object => ({
      color: {
        1: "var(--calcite-color-border-1)",
        2: "var(--calcite-color-border-2)",
        3: "var(--calcite-color-border-3)",
        input: "var(--calcite-color-border-input)",
        transparent: theme("colors.transparent"),
      },
      "color-brand": theme("colors.brand"),
      "color-brand-hover": theme("colors.brand-hover"),
      "color-brand-press": theme("colors.brand-press"),
      "color-info": theme("colors.info"),
      "color-success": theme("colors.success"),
      "color-warning": theme("colors.warning"),
      "color-danger": theme("colors.danger"),
      "color-danger-hover": theme("colors.danger-hover"),
      "color-danger-press": theme("colors.danger-press"),
    }),
    colors: {
      current: "currentColor",
      brand: "var(--calcite-color-brand)",
      "brand-hover": "var(--calcite-color-brand-hover)",
      "brand-press": "var(--calcite-color-brand-press)",
      info: "var(--calcite-color-status-info)",
      success: "var(--calcite-color-status-success)",
      warning: "var(--calcite-color-status-warning)",
      danger: "var(--calcite-color-status-danger)",
      "danger-hover": "var(--calcite-color-status-danger-hover)",
      "danger-press": "var(--calcite-color-status-danger-press)",
      background: {
        background: "var(--calcite-color-background)",
        foreground: {
          1: "var(--calcite-color-foreground-1)",
          2: "var(--calcite-color-foreground-2)",
          3: "var(--calcite-color-foreground-3)",
        },
      },
      color: {
        1: "var(--calcite-color-text-1)",
        2: "var(--calcite-color-text-2)",
        3: "var(--calcite-color-text-3)",
        inverse: "var(--calcite-color-text-inverse)",
        link: "var(--calcite-color-text-link)",
        icon: "var(--calcite-icon-color, var(--calcite-ui-icon-color, currentColor))",
      },
      transparent: "transparent",
    },
    fontFamily: {
      // assets/styles/_type
      sans: "var(--calcite-font-family)",
      mono: "var(--calcite-font-family-code)",
      inherit: "inherit",
    },
    fontSize: {
      // assets/styles/_type
      n3: "var(--calcite-font-size--3)", // 10px
      n2: "var(--calcite-font-size--2)", // 12px
      n1: "var(--calcite-font-size--1)", // 14px
      0: "var(--calcite-font-size-0)", // 16px
      1: "var(--calcite-font-size-1)", // 18px
      2: "var(--calcite-font-size-2)", // 20px
      3: "var(--calcite-font-size-3)", // 26px
      4: "var(--calcite-font-size-4)", // 32px
      5: "var(--calcite-font-size-5)", // 40px
      6: "var(--calcite-font-size-6)", // 48px
      7: "var(--calcite-font-size-7)", // 56px
      8: "var(--calcite-font-size-8)", // 64px
      // TODO: temp selectors to be renamed before closing https://github.com/Esri/calcite-design-system/issues/1500.
      // at this point all existing instances of text-N should be replaced with either text-Nh or text-N-wrap and we
      // should be able to safely drop the "h" suffix.
      n3h: ["var(--calcite-font-size--3)", { lineHeight: "0.75rem" }], // 10px (0.625rem)
      n2h: ["var(--calcite-font-size--2)", { lineHeight: "1rem" }], // 12px (0.75rem)
      n1h: ["var(--calcite-font-size--1)", { lineHeight: "1rem" }], // 14px (0.875rem)
      "0h": ["var(--calcite-font-size-0)", { lineHeight: "1.25rem" }], // 16px (1rem)
      "1h": ["var(--calcite-font-size-1)", { lineHeight: "1.5rem" }], // 18px (1.125rem)
      "2h": ["var(--calcite-font-size-2)", { lineHeight: "1.5rem" }], // 20px (1.25rem)
      "3h": ["var(--calcite-font-size-3)", { lineHeight: "2rem" }], // 26px (1.625rem)
      "4h": ["var(--calcite-font-size-4)", { lineHeight: "2.5rem" }], // 32px (2rem)
      "5h": ["var(--calcite-font-size-5)", { lineHeight: "3rem" }], // 40px (2.5rem)
      "6h": ["var(--calcite-font-size-6)", { lineHeight: "4rem" }], // 48px (3rem)
      "7h": ["var(--calcite-font-size-7)", { lineHeight: "4rem" }], // 56px (3.5rem)
      "8h": ["var(--calcite-font-size-8)", { lineHeight: "5rem" }], // 64px (4rem)
      "n3-wrap": ["var(--calcite-font-size--3)", { lineHeight: "1.375" }],
      "n2-wrap": ["var(--calcite-font-size--2)", { lineHeight: "1.375" }],
      "n1-wrap": ["var(--calcite-font-size--1)", { lineHeight: "1.375" }],
      "0-wrap": ["var(--calcite-font-size-0)", { lineHeight: "1.375" }],
      "1-wrap": ["var(--calcite-font-size-1)", { lineHeight: "1.375" }],
      "2-wrap": ["var(--calcite-font-size-2)", { lineHeight: "1.375" }],
      "3-wrap": ["var(--calcite-font-size-3)", { lineHeight: "1.25" }],
      "4-wrap": ["var(--calcite-font-size-4)", { lineHeight: "1.25" }],
      "5-wrap": ["var(--calcite-font-size-5)", { lineHeight: "1.25" }],
      "6-wrap": ["var(--calcite-font-size-6)", { lineHeight: "1.25" }],
      "7-wrap": ["var(--calcite-font-size-7)", { lineHeight: "1.25" }],
      "8-wrap": ["var(--calcite-font-size-8)", { lineHeight: "1.25" }],
    },
    fontWeight: {
      // assets/styles/_type
      light: "var(--calcite-font-weight-light)",
      normal: "var(--calcite-font-weight-normal)",
      medium: "var(--calcite-font-weight-medium)",
      bold: "var(--calcite-font-weight-bold)",
    },
    screens: {
      s: "480px",
      m: "864px",
      l: "1024px",
      xl: "1440px",
    },
    backgroundColor: ({ theme }): object => ({
      ...theme("colors.background"),
      transparent: theme("colors.transparent"),
      brand: theme("colors.brand"),
      "brand-hover": theme("colors.brand-hover"),
      "brand-press": theme("colors.brand-press"),
      info: theme("colors.info"),
      success: theme("colors.success"),
      warning: theme("colors.warning"),
      danger: theme("colors.danger"),
      "danger-hover": theme("colors.danger-hover"),
      "danger-press": theme("colors.danger-press"),
    }),
    extend: {
      animation: {
        in: "in var(--calcite-internal-animation-timing-slow) ease-in-out",
        "in-down": "in-down var(--calcite-internal-animation-timing-slow) ease-in-out",
        "in-up": "in-up var(--calcite-internal-animation-timing-slow) ease-in-out",
        "in-scale": "in-scale var(--calcite-internal-animation-timing-slow) linear",
      },
      borderRadius: {
        half: "50%",
      },
      boxShadow: {
        0: "0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)",
        1: "0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)",
        "1-lg": "var(--calcite-shadow-sm)",
        "1-sm": "0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08)",
        2: "0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08)",
        "2-lg": "var(--calcite-shadow-md)",
        "2-sm": "0 2px 12px -4px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.16)",
        "border-bottom": "0 1px 0 var(--calcite-color-border-3)",
        "border-top": "0 -1px 0 var(--calcite-color-border-3)",
        "outline-active": "0 0 0 1px var(--calcite-color-brand)",
        none: "none",
        xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
        outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
      },
      keyframes: {
        in: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        "in-down": {
          "0%": {
            opacity: 0,
            transform: "translate3D(0, -5px, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3D(0, 0, 0)",
          },
        },
        "in-up": {
          "0%": {
            opacity: 0,
            transform: "translate3D(0, 5px, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3D(0, 0, 0)",
          },
        },
        "in-scale": {
          "0%": {
            opacity: 0,
            transform: "scale3D(0.95, 0.95, 1)",
          },
          "100%": {
            opacity: 1,
            transform: "scale3D(1, 1, 1)",
          },
        },
      },
      opacity: {
        disabled: "var(--calcite-opacity-disabled)",
      },
      spacing: {
        0.5: "0.125rem",
        2.5: "0.625rem",
        3.5: "0.875rem",
        4.5: "1.125rem",
        9: "2.25rem",
        11: "2.75rem",
        13: "3.25rem",
      },
      transitionProperty: {
        margin: "margin",
        color: "color",
      },
      transitionTimingFunction: {
        cubic: "cubic-bezier(0.215, 0.440, 0.420, 0.880)",
      },
      maxHeight: {
        menu: "45vh",
      },
      zIndex: {
        deep: "var(--calcite-z-index-deep)",
        default: "var(--calcite-z-index)",
        sticky: "var(--calcite-z-index-sticky)",
        header: "var(--calcite-z-index-header)",
        toast: "var(--calcite-z-index-toast)",
        dropdown: "var(--calcite-z-index-dropdown)",
        overlay: "var(--calcite-z-index-overlay)",
        modal: "var(--calcite-z-index-modal)",
        popover: "var(--calcite-z-index-popup)",
        tooltip: "var(--calcite-z-index-tooltip)",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        ".word-break": {
          "word-wrap": "break-word",
          "word-break": "break-word",
        },
        ".focus-base": {
          "outline-color": "transparent",
        },
        ".focus-normal": {
          outline: "2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)))",
        },
        ".focus-outset": {
          outline: "2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)))",
          "outline-offset": invert("2px", "--calcite-offset-invert-focus"),
        },
        ".focus-inset": {
          outline: "2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)))",
          "outline-offset": invert("-2px", "--calcite-offset-invert-focus"),
        },
        ".focus-outset-danger": {
          outline: "2px solid var(--calcite-color-status-danger)",
          "outline-offset": invert("2px", "--calcite-offset-invert-focus"),
        },
        ".focus-inset-danger": {
          outline: "2px solid var(--calcite-color-status-danger)",
          "outline-offset": invert("-2px", "--calcite-offset-invert-focus"),
        },
        ".transition-default": {
          transition:
            // we explicitly list these properties to avoid animating properties that are not intended to be animated and that might affect performance
            "background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s",
        },
      };
      addUtilities(newUtilities);
    }),
    plugin(({ addUtilities, theme }) => {
      const colors = flattenColorPalette(theme("borderColor"));
      delete colors["default"];

      const colorMap = Object.keys(colors).map((color) => ({
        [`.border-t-${color}`]: { borderTopColor: colors[color] },
        [`.border-r-${color}`]: { borderRightColor: colors[color] },
        [`.border-b-${color}`]: { borderBottomColor: colors[color] },
        [`.border-l-${color}`]: { borderLeftColor: colors[color] },
      }));
      const utilities = Object.assign({}, ...colorMap);

      addUtilities(utilities);
    }),
  ],
};
