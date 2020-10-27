module.exports = {
  theme: {
    borderRadius: {
      none: '0',
      1: "var(--calcite-border-radius)",
      full: '100%',
    },
    boxShadow: {
      '1-sm': 'var(--calcite-shadow-1-press)',
      '1': 'var(--calcite-shadow-1)',
      '1-lg': 'var(--calcite-shadow-1-hover)',
      '2-sm': 'var(--calcite-shadow-2-press)',
      '2': 'var(--calcite-shadow-2)',
      '2-lg': 'var(--calcite-shadow-2-hover)',
      'none': 'none',
    },
    colors: {
      blue: {
        1: "var(--calcite-ui-blue-1)",
        2: "var(--calcite-ui-blue-2)",
        3: "var(--calcite-ui-blue-3)",
      },
      green: {
        1: "var(--calcite-ui-green-1)",
        2: "var(--calcite-ui-green-2)",
        3: "var(--calcite-ui-green-3)",
      },
      yellow: {
        1: "var(--calcite-ui-yellow-1)",
        2: "var(--calcite-ui-yellow-2)",
        3: "var(--calcite-ui-yellow-3)",
      },
      red: {
        1: "var(--calcite-ui-red-1)",
        2: "var(--calcite-ui-red-2)",
        3: "var(--calcite-ui-red-3)",
      },
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
      }
    },
    fontFamily: {
      sans: ["Avenir Next", "Avenir", "Helvetica Neue", "sans-serif"],
      mono: ["Consolas", "Andale Mono", "Lucida Console", "Monaco", "monospace"],
    },
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
    fontWeight: {
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
    spacing: {
      0: "0px",
      "px": "1px",
      "05": "0.125rem",
      /* Increase by 0.25rem */
      1: "0.25rem",     // 4px
      2: "0.5rem",      // 8px
      3: "0.75rem",     // 12px
      4: "1rem",        // 16px
      5: "1.25rem",     // 20px
      6: "1.5rem",      // 24px
      7: "1.75rem",     // 28px
      8: "2rem",        // 32px
      9: "2.25rem",     // 36px
      10: "2.5rem",     // 40px
      /* Increase by 0.5rem */
      12: "3rem",       // 48px
      /* Increase by 1rem */
      16: "4rem",       // 64px
      20: "5rem",       // 80px
      24: "6rem",       // 96px
      /* Increase by 2rem */
      32: "8rem",       // 128px
      40: "10rem",      // 160px
      48: "12rem",      // 192px
      56: "14rem",      // 224px
      64: "16rem"       // 256px
    },
    textColor: theme => ({
      1: theme("colors.text.1"),
      2: theme("colors.text.2"),
      3: theme("colors.text.3"),
      blue: {
        1: theme("colors.blue.1"),
        2: theme("colors.blue.2"),
        3: theme("colors.blue.3"),
      },
      white: theme("colors.background")
    }),
    transitionDuration: {
      75: "75ms",
      150: "150ms",
      300: "300ms",
      500: "500ms"
    },
    transitionTimingFunction: "cubic-bezier(0.215, 0.440, 0.420, 0.880)"
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
  variants: {
    boxShadow: ['responsive', 'hover', 'focus', 'active']
  }
}
