import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { LitElement } from "@arcgis/lumina";
import { SetOptional } from "type-fest";
import { GlobalTestProps } from "../tests/utils/interfaces";
import { mockConsole } from "../tests/utils/logging";
import { type LogLevel, loggedDeprecations, logger } from "./logger";
import { type CalciteConfig, clearConfig } from "./config";

class Test extends LitElement {
  static tagName = "calcite-foo";
}

mockConsole(["debug", "error", "info", "trace", "warn"]);

beforeEach(async () => {
  globalThis.calciteConfig = {
    // non-test default log level
    logLevel: "info",
  };
  clearConfig();
  loggedDeprecations.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe(logger.deprecated, () => {
  it("helps log planned deprecations", async () => {
    const { component } = await mount(Test);
    const params = {
      component: component,
      name: "foo",
      removalVersion: 3,
    };

    // @ts-expect-error -- using fake component names
    logger.deprecated("component", params);

    expect(logger.warn).toHaveBeenCalled();
    expect((logger.warn as Mock).mock.calls[0][2]).toMatch(
      `[${params.name}] - This component is deprecated and will be removed in v${params.removalVersion}.`,
    );
  });

  it("helps log future deprecations", async () => {
    const { component } = await mount(Test);
    const params = {
      component: component,
      name: "foo",
      removalVersion: "future",
    };

    // @ts-expect-error -- using fake component names
    logger.deprecated("component", params);

    expect(logger.warn).toHaveBeenCalled();
    expect((logger.warn as Mock).mock.calls[0][2]).toMatch(
      `[${params.name}] - This component is deprecated and will be removed in a future version.`,
    );
  });

  it("shows deprecation suggestions (single)", async () => {
    const { component } = await mount(Test);
    const params = {
      component: component,
      name: "foo",
      removalVersion: 3,
      suggested: "bar",
    };

    // @ts-expect-error -- using fake component names
    logger.deprecated("component", params);

    expect(logger.warn).toHaveBeenCalled();
    expect((logger.warn as Mock).mock.calls[0][2]).toMatch(
      `[${params.name}] - This component is deprecated and will be removed in v${params.removalVersion}. Use "${params.suggested}" instead.`,
    );
  });

  it("shows deprecation suggestions (multiple)", async () => {
    const { component } = await mount(Test);
    const params = {
      component: component,
      name: "foo",
      removalVersion: 3,
      suggested: ["bar", "baz"],
    };

    // @ts-expect-error -- using fake component names
    logger.deprecated("component", params);

    expect(logger.warn).toHaveBeenCalled();
    expect((logger.warn as Mock).mock.calls[0][2]).toMatch(
      `[${params.name}] - This component is deprecated and will be removed in v${params.removalVersion}. Use "${params.suggested.join(`" or "`)}" instead.`,
    );
  });

  it("logs once per component", async () => {
    const { component } = await mount(Test);
    const params = {
      component: component,
      name: "foo",
      removalVersion: 3,
    };

    // @ts-expect-error -- using fake component names
    logger.deprecated("component", params);
    // @ts-expect-error -- using fake component names
    logger.deprecated("component", params);

    expect(logger.warn).toHaveBeenCalledTimes(1);
  });
});

describe("logLevel", () => {
  type TestGlobal = GlobalTestProps<{ calciteConfig: Pick<CalciteConfig, "logLevel"> }>;

  function messageAllLevels(): void {
    const levels = ["debug", "info", "warn", "error", "trace"] as const;

    levels.forEach((level) => logger[level]("message"));
  }

  async function setLogLevel(level: LogLevel): Promise<void> {
    (globalThis as TestGlobal).calciteConfig = {
      logLevel: level,
    };
  }

  afterEach(() => {
    delete (globalThis as SetOptional<TestGlobal, "calciteConfig">).calciteConfig;
  });

  it("logs all messages when set to lowest level", async () => {
    await setLogLevel("trace");

    messageAllLevels();

    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(logger.debug).toHaveBeenCalledTimes(1);
    expect(logger.trace).toHaveBeenCalledTimes(1);
  });

  it("logs only error messages when set to highest level", async () => {
    await setLogLevel("error");

    messageAllLevels();

    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledTimes(0);
    expect(logger.warn).toHaveBeenCalledTimes(0);
    expect(logger.debug).toHaveBeenCalledTimes(0);
    expect(logger.trace).toHaveBeenCalledTimes(0);
  });

  it("logs info messages and above when set to default level", async () => {
    await setLogLevel("info");

    messageAllLevels();

    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(logger.debug).toHaveBeenCalledTimes(0);
    expect(logger.trace).toHaveBeenCalledTimes(0);
  });

  it("logs no messages when set to `off`", async () => {
    await setLogLevel("off");

    messageAllLevels();

    expect(logger.debug).toHaveBeenCalledTimes(0);
    expect(logger.error).toHaveBeenCalledTimes(0);
    expect(logger.info).toHaveBeenCalledTimes(0);
    expect(logger.trace).toHaveBeenCalledTimes(0);
    expect(logger.warn).toHaveBeenCalledTimes(0);
  });
});
