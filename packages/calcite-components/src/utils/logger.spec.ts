import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { SetOptional } from "type-fest";
import { GlobalTestProps } from "../tests/utils/puppeteer";
import { mockConsole } from "../tests/utils/logging";
import { LogLevel } from "./logger";
import { CalciteConfig } from "./config";

describe("logger", () => {
  mockConsole(["debug", "error", "info", "trace", "warn"]);

  type LoggerModule = typeof import("./logger");

  let loggerModule: LoggerModule;
  let logger: LoggerModule["logger"];

  beforeEach(async () => {
    vi.resetModules();
    loggerModule = await import("./logger");
    logger = loggerModule.logger;
    loggerModule.loggedDeprecations.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("deprecated", () => {
    it("helps log planned deprecations", () => {
      const params = {
        name: "foo",
        removalVersion: 3,
      };

      // @ts-expect-error -- using fake component names
      logger.deprecated("component", params);

      expect(console.warn).toHaveBeenCalled();
      expect((console.warn as Mock).mock.calls[0][2]).toMatch(
        `[${params.name}] component is deprecated and will be removed in v${params.removalVersion}.`,
      );
    });

    it("helps log future deprecations", () => {
      const options = {
        name: "foo",
        removalVersion: "future",
      };

      // @ts-expect-error -- using fake component names
      logger.deprecated("component", options);

      expect(console.warn).toHaveBeenCalled();
      expect((console.warn as Mock).mock.calls[0][2]).toMatch(
        `[${options.name}] component is deprecated and will be removed in a future version.`,
      );
    });

    it("shows deprecation suggestions (single)", () => {
      const params = {
        name: "foo",
        removalVersion: 3,
        suggested: "bar",
      };

      // @ts-expect-error -- using fake component names
      logger.deprecated("component", params);

      expect(console.warn).toHaveBeenCalled();
      expect((console.warn as Mock).mock.calls[0][2]).toMatch(
        `[${params.name}] component is deprecated and will be removed in v${params.removalVersion}. Use "${params.suggested}" instead.`,
      );
    });

    it("shows deprecation suggestions (multiple)", () => {
      const params = {
        name: "foo",
        removalVersion: 3,
        suggested: ["bar", "baz"],
      };

      // @ts-expect-error -- using fake component names
      logger.deprecated("component", params);

      expect(console.warn).toHaveBeenCalled();
      expect((console.warn as Mock).mock.calls[0][2]).toMatch(
        `[${params.name}] component is deprecated and will be removed in v${params.removalVersion}. Use "${params.suggested.join(`" or "`)}" instead.`,
      );
    });

    it("logs once per component", () => {
      const params = {
        name: "foo",
        removalVersion: 3,
      };

      // @ts-expect-error -- using fake component names
      logger.deprecated("component", params);
      // @ts-expect-error -- using fake component names
      logger.deprecated("component", params);

      expect(console.warn).toHaveBeenCalledTimes(1);
    });
  });

  describe("logLevel", () => {
    type TestGlobal = GlobalTestProps<{ calciteConfig: Pick<CalciteConfig, "logLevel"> }>;

    function messageAllLevels(): void {
      const levels = ["debug", "info", "warn", "error", "trace"] as const;

      levels.forEach((level) => logger[level]("message"));
    }

    async function setLogLevel(level: LogLevel): Promise<void> {
      vi.resetModules();

      (globalThis as TestGlobal).calciteConfig = {
        logLevel: level,
      };

      loggerModule = await import("./logger");
      logger = loggerModule.logger;
    }

    afterEach(() => {
      delete (globalThis as SetOptional<TestGlobal, "calciteConfig">).calciteConfig;
    });

    it("logs all messages when set to lowest level", async () => {
      await setLogLevel("trace");

      messageAllLevels();

      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.info).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.debug).toHaveBeenCalledTimes(1);
      expect(console.trace).toHaveBeenCalledTimes(1);
    });

    it("logs only error messages when set to highest level", async () => {
      await setLogLevel("error");

      messageAllLevels();

      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.info).toHaveBeenCalledTimes(0);
      expect(console.warn).toHaveBeenCalledTimes(0);
      expect(console.debug).toHaveBeenCalledTimes(0);
      expect(console.trace).toHaveBeenCalledTimes(0);
    });

    it("logs info messages and above when set to default level", async () => {
      await setLogLevel("info");

      messageAllLevels();

      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.info).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.debug).toHaveBeenCalledTimes(0);
      expect(console.trace).toHaveBeenCalledTimes(0);
    });

    it("logs no messages when set to `off`", async () => {
      await setLogLevel("off");

      messageAllLevels();

      expect(console.debug).toHaveBeenCalledTimes(0);
      expect(console.error).toHaveBeenCalledTimes(0);
      expect(console.info).toHaveBeenCalledTimes(0);
      expect(console.trace).toHaveBeenCalledTimes(0);
      expect(console.warn).toHaveBeenCalledTimes(0);
    });
  });
});
