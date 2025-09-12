const resources = {
  labels: {
    bug: {
      regression: "regression",
    },
    handoff: {
      figmaChanges: "figma changes",
    },
    issueType: {
      bug: "bug",
      chore: "chore",
      docs: "docs",
      enhancement: "enhancement",
      perf: "perf",
      refactor: "refactor",
      test: "testing",
      tooling: "tooling",
      a11y: "a11y",
      newComponent: "new component",
      design: "design",
    },
    issueWorkflow: {
      new: "0 - new",
      assigned: "1 - assigned",
      needsTriage: "needs triage",
      needsMilestone: "needs milestone",
      readyForDev: "ready for dev",
      inDevelopment: "2 - in development",
      installed: "3 - installed",
      verified: "4 - verified",
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
    icons: "calcite-ui-icons",
  },
};

module.exports = resources;
