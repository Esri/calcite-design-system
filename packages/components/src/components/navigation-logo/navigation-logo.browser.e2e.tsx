import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  accessible,
  defaults,
  reflects,
  hidden,
  renders,
  focusable,
    themed
} from "../../tests/commonTests/browser";
import { CSS } from "./resources";
import { mockConsole } from "../../tests/utils/logging";

mockConsole("error");

describe("accessible", () => {
  accessible(() => mount("calcite-navigation-logo"));
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-navigation-logo"),
    [
      {
        propertyName: "active",
        defaultValue: undefined,
      },
      {
        propertyName: "href",
        defaultValue: undefined,
      },
      {
        propertyName: "rel",
        defaultValue: undefined,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "target",
        defaultValue: undefined,
      },
      {
        propertyName: "headingLevel",
        defaultValue: undefined,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-navigation-logo"),
    [
      {
        propertyName: "active",
        value: "true",
      },
      {
        propertyName: "href",
        value: "#logo",
      },
      {
        propertyName: "rel",
        value: "external",
      },
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "target",
        value: "_self",
      },
      {
        propertyName: "headingLevel",
        value: 1,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-navigation-logo"));
});

describe("renders", () => {
  renders(() => mount(<calcite-navigation-logo heading="test" />), { display: "inline-flex" });
});

describe("is focusable", () => {
  focusable(() => mount(<calcite-navigation-logo heading="esri" href=" " />));
});

describe("heading", () => {
  it("renders standalone heading when description is not provided", async () => {
    await mount(<calcite-navigation-logo heading="John Doe" />);

    const heading = page.getBySelector(`calcite-navigation-logo .${CSS.heading}`);
    const standaloneHeading = page.getBySelector(
      `calcite-navigation-logo .${CSS.heading}.${CSS.standalone}`,
    );
    const description = page.getBySelector(`calcite-navigation-logo .${CSS.description}`);

    await expect.element(heading).toBeInTheDocument();
    await expect.element(standaloneHeading).toBeInTheDocument();
    await expect.element(description).not.toBeInTheDocument();
  });
});

describe("theme", () => {
  const navigationLogo = (props: Partial<{ active: boolean; link: boolean }> = {}) => {
    const { active = false, link = false } = props;

    return (
      <calcite-navigation-logo
        active={active}
        description="Eastern Potato Chip Company"
        heading="Walt's Chips"
        href={link ? "https://github.com/Esri/calcite-design-system" : undefined}
        icon="layers"
      />
    );
  };

  describe("default", () => {
    themed(() => mount(navigationLogo()), {
      "--calcite-navigation-background-color": [
        {
          shadowSelector: `.${CSS.container}`,
          targetProp: "backgroundColor",
        },
      ],
      "--calcite-navigation-logo-text-color": [
        {
          shadowSelector: `.${CSS.description}`,
          targetProp: "color",
        },
        {
          shadowSelector: `calcite-icon`,
          targetProp: "color",
        },
      ],
      "--calcite-navigation-logo-heading-text-color": {
        shadowSelector: `.${CSS.heading}`,
        targetProp: "color",
      },
    });
  });

  describe("default + active", () => {
    themed(
      () =>
        mount(
          navigationLogo({
            active: true,
          }),
        ),
      {
        "--calcite-navigation-accent-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderBlockEndColor",
        },
        "--calcite-navigation-logo-text-color": {
          shadowSelector: `calcite-icon`,
          targetProp: "color",
        },
      },
    );
  });

  describe("with link", () => {
    themed(() => mount(navigationLogo({ link: true })), {
      "--calcite-navigation-background-color": [
        {
          shadowSelector: `.${CSS.container}`,
          targetProp: "backgroundColor",
        },
        {
          shadowSelector: `.${CSS.container}`,
          targetProp: "backgroundColor",
          state: "hover",
        },
        {
          shadowSelector: `.${CSS.container}`,
          targetProp: "backgroundColor",
          state: { press: { attribute: "class", value: CSS.container } },
        },
      ],
      "--calcite-navigation-logo-text-color": [
        {
          shadowSelector: `.${CSS.description}`,
          targetProp: "color",
        },
        {
          shadowSelector: `calcite-icon`,
          targetProp: "color",
        },
        {
          shadowSelector: `calcite-icon`,
          targetProp: "color",
          state: { press: `calcite-navigation-logo >>> .${CSS.container}` },
        },
      ],
      "--calcite-navigation-logo-heading-text-color": {
        shadowSelector: `.${CSS.heading}`,
        targetProp: "color",
      },
    });
  });

  describe("deprecated", () => {
    themed(() => mount(navigationLogo()), {
      "--calcite-ui-icon-color": {
        shadowSelector: `calcite-icon`,
        targetProp: "color",
      },
    });
  });

  describe("with link + active", () => {
    themed(
      () =>
        mount(
          navigationLogo({
            active: true,
            link: true,
          }),
        ),
      {
        "--calcite-navigation-accent-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderBlockEndColor",
        },
        "--calcite-navigation-logo-text-color": {
          shadowSelector: `calcite-icon`,
          targetProp: "color",
        },
      },
    );
  });
});
