const resources = {
  labels: {
    bug: {
      regression: "regression",
    },
    handoff: {
      figmaChanges: "figma changes",
    },
    issueType: {
      a11y: "a11y",
      bug: "bug",
      chore: "chore",
      design: "design",
      designTokens: "design-tokens",
      docs: "docs",
      enhancement: "enhancement",
      newComponent: "new component",
      perf: "perf",
      refactor: "refactor",
      research: "research",
      test: "testing",
      tooling: "tooling",
    },
    issueWorkflow: {
      needsTriage: "needs triage",
      needsMilestone: "needs milestone",
      inDesign: "1 - in design",
      readyForDev: "2 - ready for dev",
      inDevelopment: "3 - in development",
      installed: "4 - installed",
      verified: "5 - verified",
    },
    planning: {
      needsInfo: "needs more info",
      spike: "spike",
      spikeComplete: "spike complete",
      noChangelogEntry: "no changelog entry",
      blocked: "blocked",
      monday: "monday.com sync",
    },
    priority: {
      low: "p - low",
      medium: "p - medium",
      high: "p - high",
      critical: "p - critical",
    },
    risk: {
      low: "low risk",
    },
    snapshots: {
      skip: "skip visual snapshots",
      run: "pr ready for visual snapshots",
    },
    devEstimate: {
      one: "estimate - 1",
      two: "estimate - 2",
      three: "estimate - 3",
      five: "estimate - 5",
      eight: "estimate - 8",
      thirteen: "estimate - 13",
      twentyOne: "estimate - 21",
      thirtyFour: "estimate - 34",
    },
    designEstimate: {
      small: "estimate - design - sm",
      medium: "estimate - design - md",
      large: "estimate - design - lg",
    },
    productColor: "006B75",
  },
  milestone: {
    backlog: "Dev Backlog",
    stalled: "Stalled",
    freezer: "Freezer",
  },
  teams: {
    admins: "calcite-design-system-admins",
    iconDesigners: "calcite-icon-designers",
    translationReviewers: "calcite-translation-reviewers",
  },
  packages: {
    tokens: "calcite-design-tokens",
    icons: "calcite-ui-icons",
  },
};

module.exports = resources;
