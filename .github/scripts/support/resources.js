const resources = {
  labels: {
    bug: {
      regression: "regression",
    },
    handoff: {
      readyForDev: "ready for dev",
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
    },
    issueWorkflow: {
      new: "0 - new",
      assigned: "1 - assigned",
      inDevelopment: "2 - in development",
      installed: "3 - installed",
      verified: "4 - verified",
    },
    planning: {
      needsTriage: "needs triage",
      needsMilestone: "needs milestone",
      spike: "spike",
      spikeComplete: "spike complete",
      noChangelogEntry: "no changelog entry",
    },
    priority: {
      low: "p - low",
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
  },
  teams: {
    admins: "calcite-design-system-admins",
    iconDesigners: "calcite-icon-designers",
  },
  packages: {
    icons: "calcite-ui-icons",
  },
};

module.exports = resources;
