import { h } from "@arcgis/lumina";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { userEvent } from "vitest/browser";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  renders,
  accessible,
} from "../../tests/commonTests/browser";
import type { Link } from "./link";

describe("accessible", () => {
  describe("default", () => {
    accessible(() => mount(<calcite-link>link</calcite-link>));
  });

  describe("with href", () => {
    accessible(() => mount(<calcite-link href="/">link</calcite-link>));
  });

  describe("with icons", () => {
    accessible(() =>
      mount(
        <calcite-link href="/" icon-end="plus" icon-start="plus">
          Go
        </calcite-link>,
      ),
    );
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-link"),
    [
      {
        propertyName: "download",
        defaultValue: false,
      },
    ],
  );
});

describe("focusable", () => {
  describe("default", () => {
    focusable(() => mount(<calcite-link>link</calcite-link>));
  });

  describe("with href", () => {
    focusable(() => mount(<calcite-link href="/">link</calcite-link>));
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-link"));
});

describe("renders", () => {
  renders(() => mount(<calcite-link href="/">link</calcite-link>), { display: "inline" });
});

describe("renders without href", () => {
  renders(() => mount(<calcite-link>link</calcite-link>), { display: "inline" });
});

describe("disabled", () => {
  disabled(() => mount(<calcite-link href="/">link</calcite-link>));
});

describe("link interactivity", () => {
  let navigateHandler: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    navigateHandler = vi.fn().mockImplementation((event) => {
      // prevent redirect and losing connection to iframe
      event.preventDefault();
    });
    // @ts-expect-error -- using new navigation API -- https://developer.mozilla.org/en-US/docs/Web/API/Navigation/navigate_event
    window.navigation.addEventListener("navigate", navigateHandler);
  });

  afterEach(() => {
    // @ts-expect-error -- using new navigation API -- https://developer.mozilla.org/en-US/docs/Web/API/Navigation/navigate_event
    window.navigation.removeEventListener("navigate", navigateHandler);
  });

  const targetPage = "#test";
  let link: Link["el"];
  let targetUrl: string;

  beforeEach(async () => {
    ({ el: link } = await mount<Link>(<calcite-link href={`/${targetPage}`}>link</calcite-link>));
    targetUrl = `${window.location.origin}/${targetPage}`;
  });

  describe("keyboard", () => {
    it("redirects on activation", async () => {
      await userEvent.keyboard("{Tab}{Enter}");
      expect(navigateHandler).toHaveBeenCalledTimes(1);
      expect(navigateHandler.mock.lastCall![0].destination.url).toBe(targetUrl);
    });

    it("does not redirect without href", async () => {
      const clickHandler = vi.fn();
      link.addEventListener("click", clickHandler);
      link.href = undefined;

      await userEvent.keyboard("{Tab}{Enter}");
      expect(navigateHandler).not.toHaveBeenCalled();
      expect(clickHandler).toHaveBeenCalledTimes(1);

      link.href = "";
      await userEvent.keyboard("{Enter}");
      expect(navigateHandler).not.toHaveBeenCalled();
      expect(clickHandler).toHaveBeenCalledTimes(2);
    });
  });

  describe("mouse", () => {
    it("redirects on activation", async () => {
      await userEvent.click(link);
      expect(navigateHandler).toHaveBeenCalledTimes(1);
      expect(navigateHandler.mock.lastCall![0].destination.url).toBe(targetUrl);
    });

    it("does not redirect without href", async () => {
      const clickHandler = vi.fn();
      link.addEventListener("click", clickHandler);
      link.href = undefined;

      await userEvent.click(link);
      expect(navigateHandler).not.toHaveBeenCalled();
      expect(clickHandler).toHaveBeenCalledTimes(1);

      link.href = "";
      await userEvent.click(link);
      expect(navigateHandler).not.toHaveBeenCalled();
      expect(clickHandler).toHaveBeenCalledTimes(2);
    });

    it("redirects on link.click()", async () => {
      const clickEvent = vi.fn();
      link.addEventListener("click", clickEvent);
      link.click();
      expect(navigateHandler).toHaveBeenCalledTimes(1);
      expect(navigateHandler.mock.lastCall![0].destination.url).toBe(targetUrl);
      expect(clickEvent).toHaveBeenCalledTimes(1);
    });
  });
});
