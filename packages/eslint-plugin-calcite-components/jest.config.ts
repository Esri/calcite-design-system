const config = {
  collectCoverage: false,
  collectCoverageFrom: ["src/rules/*.ts", "!src/rules/index.ts", "!tests/*"],
  coverageReporters: ["lcov", "text"],
  coverageDirectory: "./report/coverage/jest",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

export default config;
