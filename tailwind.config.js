const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    // Themeable
    borderRadius: {
      none: '0',
      1: "var(--calcite-border-radius)",
      half: '50%',
      full: '100%',
    },
    boxShadow: {
      '1-sm': 'var(--calcite-shadow-1-press)',
      '1': 'var(--calcite-shadow-1)',
      '1-lg': 'var(--calcite-shadow-1-hover)',
      '2-sm': 'var(--calcite-shadow-2-press)',
      '2': 'var(--calcite-shadow-2)',
      '2-lg': 'var(--calcite-shadow-2-hover)',
      'border-bottom': 'var(--calcite-shadow-border-bottom)',
      'border-active': 'var(--calcite-shadow-border-active)', 
      'none': 'none',
    },
    // CalciteColors
    colors: {
      blue: "var(--calcite-ui-blue-3)",
      green: "var(--calcite-ui-green-3)",
      yellow: "var(--calcite-ui-yellow-3)",
      red: "var(--calcite-ui-red-3)",
      background: "var(--calcite-ui-background)",
      foreground: {
        1: "var(--calcite-ui-foreground-1)",
        2: "var(--calcite-ui-foreground-2)",
        3: "var(--calcite-ui-foreground-3)",
      },
      text: {
        1: "var(--calcite-ui-text-1)",
        2: "var(--calcite-ui-text-2)",
        3: "var(--calcite-ui-text-3)",
      },
      border: {
        1: "var(--calcite-ui-border-1)",
        2: "var(--calcite-ui-border-2)",
        3: "var(--calcite-ui-border-3)",
        4: "var(--calcite-ui-border-4)",
        5: "var(--calcite-ui-border-5)",
      },
      transparent: "transparent"
    },
    // assets/styles/_type
    fontFamily: {
      sans: "var(--calcite-sans-family)",
      mono: "var(--calcite-code-family)",
      inherit: "inherit"
    },
    // assets/styles/_type
    fontSize: {
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
    },
    // assets/styles/_type
    fontWeight: {
      light: "var(--calcite-font-weight-light)",
      normal: "var(--calcite-font-weight-normal)",
      medium: "var(--calcite-font-weight-medium)",
      bold: "var(--calcite-font-weight-bold)"
    },
    opacity: {
      disabled: "var(--calcite-ui-opacity-disabled)"
    },
    // Non-themeable
    screens: {
      's': '480px',
      'm': '864px',
      'l': '1024px',
      'xl': '1440px'
    },
    textColor: theme => ({
      "color-1": theme("colors.text.1"),
      "color-2": theme("colors.text.2"),
      "color-3": theme("colors.text.3"),
      blue: {
        1: theme("colors.blue.1"),
        2: theme("colors.blue.2"),
        3: theme("colors.blue.3"),
      },
      white: theme("colors.background")
    }),
    backgroundColor: theme => theme("colors"),
    animation: {
      "in": "in 300ms ease-in-out",
      "in-down": "in-down 300ms ease-in-out",
      "in-up": "in-up 300ms ease-in-out",
      "in-scale": "in-scale 300ms linear"
    },
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
    extend: {
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
    plugin(function({ addUtilities }){
      const newUtilities = {
        ".word-break": {
          "word-wrap": "break-word",
          "word-break": "break-word"
        },
        ".focus-style-base": {
          "outline-offset": 0,
          "outline-color": "transparent",
          "transition": "outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out"
        },
        ".focus-style-outset": {
          "outline": "2px solid var(--calcite-ui-blue-1)",
          "outline-offset": "2px"
        },
        ".focus-style-inset": {
          "outline": "2px solid var(--calcite-ui-blue-1)",
          "outline-offset": "-2px"
        }
        // TODO: focus-box-shadow
      }
      addUtilities(newUtilities);
    })
  ],
  future: {
    removeDeprecatedGapUtilities: true,
  },
  variants: {
    boxShadow: ['responsive', 'hover', 'focus', 'active']
  }
}
