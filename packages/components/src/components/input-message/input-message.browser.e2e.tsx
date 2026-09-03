import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import { accessible, defaults, hidden, renders, themed } from "../../tests/commonTests/browser";
import { CSS } from "./resources";
import { StatusIconDefaults } from "./resources";
import type { InputMessage } from "./input-message";

describe("defaults", () => {
  defaults(() => mount("calcite-input-message"), [{ propertyName: "scale", defaultValue: "m" }]);
});

describe("accessible", () => {
  accessible(() => mount(<calcite-input-message>Text</calcite-input-message>));
});

describe("accessible with icon", () => {
  accessible(() => mount(<calcite-input-message icon>Text</calcite-input-message>));
});

describe("honors hidden attribute", () => {
  hidden(() => mount(<calcite-input-message>Text</calcite-input-message>));
});

describe("renders", () => {
  renders(() => mount(<calcite-input-message>content</calcite-input-message>), {
    display: "flex",
  });
});

describe("theme", () => {
  describe("status", () => {
    describe("invalid", () => {
      themed(
        () =>
          mount(
            <calcite-input-message icon status="invalid">
              Message
            </calcite-input-message>,
          ),
        {
          "--calcite-input-message-icon-color": {
            shadowSelector: `.${CSS.inputMessageIcon}`,
            targetProp: "color",
          },
        },
      );
    });
    describe("valid", () => {
      themed(
        () =>
          mount(
            <calcite-input-message icon status="valid">
              Message
            </calcite-input-message>,
          ),
        {
          "--calcite-input-message-icon-color": {
            shadowSelector: `.${CSS.inputMessageIcon}`,
            targetProp: "color",
          },
        },
      );
    });
    describe("idle", () => {
      themed(
        () =>
          mount(
            <calcite-input-message icon status="idle">
              Message
            </calcite-input-message>,
          ),
        {
          "--calcite-input-message-icon-color": {
            shadowSelector: `.${CSS.inputMessageIcon}`,
            targetProp: "color",
          },
        },
      );
    });
  });

  describe("deprecated", () => {
    themed(
      () =>
        mount(
          <calcite-input-message icon status="invalid">
            Message
          </calcite-input-message>,
        ),
      {
        "--calcite-input-message-spacing-value": {
          targetProp: "marginBlockStart",
        },
        "--calcite-ui-icon-color": {
          shadowSelector: `.${CSS.inputMessageIcon}`,
          targetProp: "color",
        },
      },
    );
  });
});

describe("when icon prop is provided", () => {
  describe("when it's a boolean type", () => {
    describe("when value is true", () => {
      it("should render the default status icon", async () => {
        await mount(<calcite-input-message icon>Text</calcite-input-message>);
        const icon = page.getBySelector(`calcite-input-message .${CSS.inputMessageIcon}`);
        await expect.element(icon).toBeInTheDocument();
        await expect.element(icon).toHaveAttribute("icon", StatusIconDefaults.idle);
      });

      describe("when element status is changed", () => {
        it("should render icon based on new status", async () => {
          const { el, reRender } = await mount<InputMessage>(
            <calcite-input-message icon status="invalid">
              Example
            </calcite-input-message>,
          );
          const icon = page.getBySelector(`calcite-input-message .${CSS.inputMessageIcon}`);
          await expect.element(icon).toBeInTheDocument();
          await expect.element(icon).toHaveAttribute("icon", StatusIconDefaults.invalid);

          el.status = "valid";
          await reRender();

          await expect.element(icon).toBeInTheDocument();
          await expect.element(icon).toHaveAttribute("icon", StatusIconDefaults.valid);
        });
      });
    });

    describe("when value is false", () => {
      it("should render no icon", async () => {
        await mount(<calcite-input-message>Text</calcite-input-message>);
        const icon = page.getBySelector(`calcite-input-message .${CSS.inputMessageIcon}`);
        await expect.element(icon).not.toBeInTheDocument();
      });
    });
  });

  describe("when it's a string type", () => {
    it("should render the requested custom icon", async () => {
      await mount(<calcite-input-message icon="banana">Nah</calcite-input-message>);
      const icon = page.getBySelector(`calcite-input-message .${CSS.inputMessageIcon}`);
      await expect.element(icon).toBeInTheDocument();
      await expect.element(icon).toHaveAttribute("icon", "banana");
    });

    describe("when the icon is changed", () => {
      it("should render the new icon", async () => {
        const { el, reRender } = await mount<InputMessage>(
          <calcite-input-message icon="information">More info</calcite-input-message>,
        );
        const icon = page.getBySelector(`calcite-input-message .${CSS.inputMessageIcon}`);
        await expect.element(icon).toBeInTheDocument();
        await expect.element(icon).toHaveAttribute("icon", StatusIconDefaults.idle);

        el.icon = "banana";
        await reRender();

        await expect.element(icon).toBeInTheDocument();
        await expect.element(icon).toHaveAttribute("icon", "banana");

        el.icon = "view-hide";
        await reRender();

        await expect.element(icon).toBeInTheDocument();
        await expect.element(icon).toHaveAttribute("icon", "view-hide");
      });
    });
  });
});
