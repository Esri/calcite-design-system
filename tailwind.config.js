module.exports = {
  theme: {
    extend: {
      spacing: {
        '2px': '0.125rem',
        '10px': '0.625rem',
        '14px': '0.875rem'
      }
    },
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
      "-3": "0.625rem", // 10px
      "-2": "0.75rem",  // 12px
      "-1": "0.875rem", // 14px
      0: "1rem",        // 16px
      1: "1.125rem",    // 18px
      2: "1.25rem",     // 20px
      3: "1.625rem",    // 26px
      4: "2rem",        // 32px
      5: "2.5rem",      // 40px
      6: "3rem",        // 48px
      7: "3.5rem",      // 56px
      8: "4rem",        // 64px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700
    },
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
