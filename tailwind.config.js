const plugin = require('tailwindcss/plugin');
var flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;

module.exports = {
  theme: {
    borderColor: theme => ({
      color: {
        1: "var(--calcite-ui-border-1)",
        2: "var(--calcite-ui-border-2)",
        3: "var(--calcite-ui-border-3)",
        input: "var(--calcite-ui-border-input)",
        transparent: theme("colors.transparent")
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
      "brand": "var(--calcite-ui-brand)",
      "brand-hover": "var(--calcite-ui-brand-hover)",
      "brand-press": "var(--calcite-ui-brand-press)",
      "info": "var(--calcite-ui-info)",
      "success": "var(--calcite-ui-success)",
      "warning": "var(--calcite-ui-warning)",
      "danger": "var(--calcite-ui-danger)",
      "danger-hover": "var(--calcite-ui-danger-hover)",
      "danger-press": "var(--calcite-ui-danger-press)",
      background: {
        background: "var(--calcite-ui-background)",
        foreground: {
          1: "var(--calcite-ui-foreground-1)",
          2: "var(--calcite-ui-foreground-2)",
          3: "var(--calcite-ui-foreground-3)"
        },
      },
      text: {
        1: "var(--calcite-ui-text-1)",
        2: "var(--calcite-ui-text-2)",
        3: "var(--calcite-ui-text-3)",
        inverse: "var(--calcite-ui-text-inverse)",
        link: "var(--calcite-ui-text-link)"
      },
      transparent: "transparent"
    },
    fontFamily: {
      // assets/styles/_type
      sans: "var(--calcite-sans-family)",
      mono: "var(--calcite-code-family)",
      inherit: "inherit"
    },
    fontSize: {
      // assets/styles/_type
      "-3": "var(--calcite-font-size--3)",  // 10px
      "-2": "var(--calcite-font-size--2)",  // 12px
      "-1": "var(--calcite-font-size--1)",  // 14px
      0: "var(--calcite-font-size-0)",      // 16px
      1: "var(--calcite-font-size-1)",      // 18px
      2: "var(--calcite-font-size-2)",      // 20px
      3: "var(--calcite-font-size-3)",      // 26px
      4: "var(--calcite-font-size-4)",      // 32px
      5: "var(--calcite-font-size-5)",      // 40px
      6: "var(--calcite-font-size-6)",      // 48px
      7: "var(--calcite-font-size-7)",      // 56px
      8: "var(--calcite-font-size-8)",      // 64px
      // TODO: temp selectors to be renamed before closing https://github.com/Esri/calcite-components/issues/1500.
      // at this point all existing instances of text-N should be replaced with either text-Nh or text-N-wrap and we
      // should be able to safely drop the "h" suffix.
      "-3h": [ "var(--calcite-font-size--3)", { lineHeight: '0.75rem' } ], // 10px (0.625rem)
      "-2h": [ "var(--calcite-font-size--2)", { lineHeight: '1rem' } ],    // 12px (0.75rem)
      "-1h": [ "var(--calcite-font-size--1)", { lineHeight: '1rem' } ],    // 14px (0.875rem)
      "0h": [ "var(--calcite-font-size-0)", { lineHeight: '1.25rem' } ],   // 16px (1rem)
      "1h": [ "var(--calcite-font-size-1)", { lineHeight: '1.5rem' } ],    // 18px (1.125rem)
      "2h": [ "var(--calcite-font-size-2)", { lineHeight: '1.5rem' } ],    // 20px (1.25rem)
      "3h": [ "var(--calcite-font-size-3)", { lineHeight: '2rem' } ],      // 26px (1.625rem)
      "4h": [ "var(--calcite-font-size-4)", { lineHeight: '2.5rem' } ],    // 32px (2rem)
      "5h": [ "var(--calcite-font-size-5)", { lineHeight: '3rem' } ],      // 40px (2.5rem)
      "6h": [ "var(--calcite-font-size-6)", { lineHeight: '4rem' } ],      // 48px (3rem)
      "7h": [ "var(--calcite-font-size-7)", { lineHeight: '4rem' } ],      // 56px (3.5rem)
      "8h": [ "var(--calcite-font-size-8)", { lineHeight: '5rem' } ],      // 64px (4rem)
      "-3-wrap": [ "var(--calcite-font-size--3)", { lineHeight: '1.375' } ],
      "-2-wrap": [ "var(--calcite-font-size--2)", { lineHeight: '1.375' } ],
      "-1-wrap": [ "var(--calcite-font-size--1)", { lineHeight: '1.375' } ],
      "0-wrap": [ "var(--calcite-font-size-0)", { lineHeight: '1.375' } ],
      "1-wrap": [ "var(--calcite-font-size-1)", { lineHeight: '1.375' } ],
      "2-wrap": [ "var(--calcite-font-size-2)", { lineHeight: '1.375' } ],
      "3-wrap": [ "var(--calcite-font-size-3)", { lineHeight: '1.25' } ],
      "4-wrap": [ "var(--calcite-font-size-4)", { lineHeight: '1.25' } ],
      "5-wrap": [ "var(--calcite-font-size-5)", { lineHeight: '1.25' } ],
      "6-wrap": [ "var(--calcite-font-size-6)", { lineHeight: '1.25' } ],
      "7-wrap": [ "var(--calcite-font-size-7)", { lineHeight: '1.25' } ],
      "8-wrap": [ "var(--calcite-font-size-8)", { lineHeight: '1.25' } ],
    },
    fontWeight: {
      // assets/styles/_type
      light: "var(--calcite-font-weight-light)",
      normal: "var(--calcite-font-weight-normal)",
      medium: "var(--calcite-font-weight-medium)",
      bold: "var(--calcite-font-weight-bold)"
    },
    screens: {
      's': '480px',
      'm': '864px',
      'l': '1024px',
      'xl': '1440px'
    },
    textColor: theme => ({
      color: theme("colors.text")
    }),
    backgroundColor: theme => ({
      ...theme("colors.background"),
      transparent: theme("colors.transparent"),
      brand: theme("colors.brand"),
      "brand-hover": theme("colors.brand-hover"),
      "brand-press": theme("colors.brand-press"),
      "brand": theme("colors.brand"),
      "info": theme("colors.info"),
      "success": theme("colors.success"),
      "warning": theme("colors.warning"),
      "danger": theme("colors.danger"),
      "danger-hover": theme("colors.danger-hover"),
      "danger-press": theme("colors.danger-press"),
    }),
    extend: {
      animation: {
        "in": "in 300ms ease-in-out",
        "in-down": "in-down 300ms ease-in-out",
        "in-up": "in-up 300ms ease-in-out",
        "in-scale": "in-scale 300ms linear"
      },
      borderRadius: {
        half: "50%"
      },
      borderWidth: {
        px: "1px"
      },
      boxShadow: {
        0: "0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)",
        1: "0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)",
        "1-lg": "0 4px 16px 0 rgba(0, 0, 0, 0.08), 0 2px 8px 0 rgba(0, 0, 0, 0.04)",
        "1-sm": "0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08)",
        2: "0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08)",
        "2-lg": "0 12px 32px -2px rgba(0, 0, 0, 0.1), 0 4px 20px 0 rgba(0, 0, 0, 0.08)",
        "2-sm": "0 2px 12px -4px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.16)",
        'border-bottom': '0 1px 0 var(--calcite-ui-border-3)',
        'outline-active': '0 0 0 1px var(--calcite-ui-brand)',
        'none': 'none',
      },
      fill: theme => ({
        color: theme("colors.text")
      }),
      keyframes: {
        "in": {
          "0%": {
            opacity: 0
          },
          "100%": {
            opacity: 1
          }
        },
        "in-down": {
          "0%": {
            opacity: 0,
            transform: "translate3D(0, -5px, 0)"
          },
          "100%": {
            opacity: 1,
            transform: "translate3D(0, 0, 0)"
          }
        },
        "in-up": {
          "0%": {
            opacity: 0,
            transform: "translate3D(0, 5px, 0)"
          },
          "100%": {
            opacity: 1,
            transform: "translate3D(0, 0, 0)"
          }
        },
        "in-scale": {
          "0%": {
            opacity: 0,
            transform: "scale3D(0.95, 0.95, 1)"
          },
          "100%": {
            opacity: 1,
            transform: "scale3D(1, 1, 1)"
          }
        }
      },
      opacity: {
        disabled: "0.5"
      },
      spacing: {
        "0.5": "0.125rem",
        "2.5": "0.625rem",
        "3.5": "0.875rem",
        "11": "2.75rem"
      },
      transitionProperty: {
        margin: "margin",
        color: "color"
      },
      transitionTimingFunction: {
        cubic: "cubic-bezier(0.215, 0.440, 0.420, 0.880)"
      }
    }
  },
  plugins: [
    ({ addUtilities }) => {
      const newUtilities = {
        ".word-break": {
          "word-wrap": "break-word",
          "word-break": "break-word"
        },
        ".focus-base": {
          "outline-offset": 0,
          "outline-color": "transparent",
          "transition": "outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out"
        },
        ".focus-outset": {
          "outline": "2px solid var(--calcite-ui-brand)",
          "outline-offset": "2px"
        },
        ".focus-inset": {
          "outline": "2px solid var(--calcite-ui-brand)",
          "outline-offset": "-2px"
        },
        ".transition-default": {
          "transition-property": "all",
          "transition-duration": "150ms",
          "transition-timing-function": "ease-in-out",
          "transition-delay": "0s"
        }
      }
      addUtilities(newUtilities);
    },
    ({ addUtilities, e, theme, variants }) => {
      const colors = flattenColorPalette(theme('borderColor'));
      delete colors['default'];

      const colorMap = Object.keys(colors)
        .map(color => ({
          [`.border-t-${color}`]: {borderTopColor: colors[color]},
          [`.border-r-${color}`]: {borderRightColor: colors[color]},
          [`.border-b-${color}`]: {borderBottomColor: colors[color]},
          [`.border-l-${color}`]: {borderLeftColor: colors[color]},
        }));
      const utilities = Object.assign({}, ...colorMap);

      addUtilities(utilities, variants('borderColor'));
    },
  ],
  future: {
    removeDeprecatedGapUtilities: true,
  },
  variants: {
    boxShadow: ['responsive', 'hover', 'focus', 'active']
  }
}
