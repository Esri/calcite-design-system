import { loggedDeprecations, logger } from "./logger";

describe("logger", () => {
  describe("deprecated", () => {
    let spy: jest.SpyInstance;

    beforeEach(() => {
      spy = jest.spyOn(console, "warn").mockImplementation(() => {});
      loggedDeprecations.clear();
    });

    afterEach(() => {
      spy.mockRestore();
    });

    it("helps log planned deprecations", () => {
      const options = {
        name: "calcite-foo",
        removalVersion: 3,
      };

      logger.deprecated("component", options);

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][2]).toMatch(
        `[${options.name}] component is deprecated and will be removed in v${options.removalVersion}.`,
      );
    });

    it("helps log future deprecations", () => {
      const options = {
        name: "calcite-foo",
        removalVersion: "future" as const,
      };

      logger.deprecated("component", options);

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][2]).toMatch(
        `[${options.name}] component is deprecated and will be removed in a future version.`,
      );
    });

    it("shows deprecation suggestions (single)", () => {
      const options = {
        name: "calcite-foo",
        removalVersion: 3,
        suggested: "calcite-bar",
      };

      logger.deprecated("component", options);

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][2]).toMatch(
        `[${options.name}] component is deprecated and will be removed in v${options.removalVersion}. Use "${options.suggested}" instead.`,
      );
    });

    it("shows deprecation suggestions (multiple)", () => {
      const options = {
        name: "calcite-foo",
        removalVersion: 3,
        suggested: ["calcite-bar", "calcite-baz"],
      };

      logger.deprecated("component", options);

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][2]).toMatch(
        `[${options.name}] component is deprecated and will be removed in v${options.removalVersion}. Use "${options.suggested.join(`" or "`)}" instead.`,
      );
    });

    it("logs once per component", () => {
      const options = {
        name: "calcite-foo",
        removalVersion: 3,
      };

      logger.deprecated("component", options);
      logger.deprecated("component", options);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
