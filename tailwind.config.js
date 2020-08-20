module.exports = {
  theme: {
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
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700
    },
    opacity: {
      0: '0',
      20: '0.2',
      30: '0.3',
      40: '0.4',
      80: '0.8',
      100: '1'
    },
    backgroundOpacity: {
      0: '0',
      20: '0.2',
      30: '0.3',
      40: '0.4',
      80: '0.8',
      100: '1'
    },
    borderColor: theme => ({
      1: theme("colors.border.1"),
      2: theme("colors.border.2"),
      3: theme("colors.border.3"),
      4: theme("colors.border.4"),
      5: theme("colors.border.5"),
    }),
    borderWidth: {
      0: "0",
      1: "1px",
      3: "3px"
    },
    borderRadius: {
      none: '0',
      1: "var(--calcite-border-radius)",
      2: "30px",
      3: "50px",
      half: '50%',
      full: '100%',
    },
    boxShadow: {
      1: {
        default: "0 0 8px 0 rgba(0, 0, 0, 0.08)",
        hover: "0 0 16px 0 rgba(0, 0, 0, 0.08)",
        press: "0 0 8px 0 rgba(0, 0, 0, 0.16)"
      },
      2: {
        default: "0 0 16px 0 rgba(0, 0, 0, 0.16)",
        hover: "0 0 32px 0 rgba(0, 0, 0, 0.16)",
        press: "0 0 16px 0 rgba(0, 0, 0, 0.32)",
      }
    },
    screens: {
      's': '480px',
      'm': '860px',
      'l': '1024px',
      'xl': '1440px'
    },
    spacing: {
      0: "0",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      8: "2rem",
      10: "2.5rem",
      12: "3rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      32: "8rem",
      40: "10rem",
      48: "12rem",
      56: "14rem",
      64: "16rem",
      px: "1px",
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
      white: theme("colors.backgroun")
    }),
    transitionDuration: {
      1: "150ms",
      2: "300ms",
      3: "500ms"
    },
    transitionTimingFunction: "cubic-bezier(0.215, 0.440, 0.420, 0.880)"
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
}
