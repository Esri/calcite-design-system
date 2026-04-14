import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { GlobalTestProps } from "../../tests/utils/interfaces";
import { accessible, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS } from "./resources";

type ButtonStyles = {
  backgroundColor: string;
  color: string;
};

async function movePointerToActionButton(
  page: Awaited<ReturnType<typeof newE2EPage>>,
  actionId: string,
  className = CSS.button,
): Promise<void> {
  const buttonCenter = await page.evaluate(
    (id: string, buttonClass: string) => {
      const action = document.querySelector(`calcite-action#${id}`) as HTMLElement;
      const button = action?.shadowRoot?.querySelector(`.${buttonClass}`) as HTMLButtonElement;
      const { left, top, width, height } = button.getBoundingClientRect();

      return {
        x: left + width / 2,
        y: top + height / 2,
      };
    },
    actionId,
    className,
  );

  await page.mouse.move(buttonCenter.x, buttonCenter.y);
  await page.waitForChanges();
}

async function getActionButtonStyles(
  page: Awaited<ReturnType<typeof newE2EPage>>,
  actionId: string,
  className = CSS.button,
): Promise<ButtonStyles> {
  return page.evaluate(
    (id: string, buttonClass: string): ButtonStyles => {
      const action = document.querySelector(`calcite-action#${id}`) as HTMLElement;
      const button = action?.shadowRoot?.querySelector(`.${buttonClass}`) as HTMLButtonElement;
      const styles = getComputedStyle(button);

      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
      };
    },
    actionId,
    className,
  );
}

async function expectOpenButtonStylesDoNotChangeOnHoverOrPress(
  page: Awaited<ReturnType<typeof newE2EPage>>,
  actionId: string,
  className = CSS.button,
): Promise<void> {
  await page.mouse.move(0, 0);
  await page.waitForChanges();

  const baseStyles = await getActionButtonStyles(page, actionId, className);

  await movePointerToActionButton(page, actionId, className);
  const hoverStyles = await getActionButtonStyles(page, actionId, className);

  await page.mouse.down();
  await page.waitForChanges();
  const pressStyles = await getActionButtonStyles(page, actionId, className);

  await page.mouse.up();
  await page.waitForChanges();

  expect(hoverStyles.backgroundColor).toBe(baseStyles.backgroundColor);
  expect(hoverStyles.color).toBe(baseStyles.color);
  expect(pressStyles.backgroundColor).toBe(baseStyles.backgroundColor);
  expect(pressStyles.color).toBe(baseStyles.color);
}

describe("aria property", () => {
  it("should set aria properties on internal button element", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-action></calcite-action>`);

    const buttonSelector = `calcite-action >>> .${CSS.button}`;
    const action = await page.find("calcite-action");
    const button = await page.find(buttonSelector);

    expect(await button.getProperty("ariaExpanded")).toBe(null);
    expect(await button.getProperty("ariaHasPopup")).toBe(null);
    expect(await button.getProperty("ariaPressed")).toBe(null);

    action.setProperty("aria", {
      expanded: true,
      hasPopup: true,
      pressed: true,
      controlsElements: [document.createElement("div")],
      describedByElements: [document.createElement("div")],
      labelledByElements: [document.createElement("div")],
      ownsElements: [document.createElement("div")],
    });
    await page.waitForChanges();

    expect(await button.getProperty("ariaExpanded")).toBe("true");
    expect(await button.getProperty("ariaHasPopup")).toBe("true");
    expect(await button.getProperty("ariaPressed")).toBe("true");
  });
});

describe("form integration", () => {
  async function assertOnFormButtonType(type: HTMLButtonElement["type"]): Promise<void> {
    const page = await newE2EPage();
    await page.setContent(html`
      <form>
        <calcite-action type="${type}"></calcite-action>
      </form>
    `);

    type TestWindow = GlobalTestProps<{
      called: boolean;
    }>;

    await page.$eval(
      "form",
      (form: HTMLFormElement, type: string) => {
        form.addEventListener(type, (event) => {
          event.preventDefault();
          (window as TestWindow).called = true;
        });
      },
      type,
    );

    const action = await page.find("calcite-action");
    await action.click();
    const called = await page.evaluate(() => (window as TestWindow).called);

    expect(called).toBe(true);
  }

  it("submits", async () => assertOnFormButtonType("submit"));
  it("resets", async () => assertOnFormButtonType("reset"));

  async function assertInternalButtonFormBehavior({
    content,
    eventType,
    selector,
  }: {
    content: string;
    eventType: "submit" | "reset";
    selector: string;
  }): Promise<boolean> {
    const page = await newE2EPage();
    await page.setContent(content);

    type TestWindow = GlobalTestProps<{
      called: boolean;
    }>;

    await page.$eval(
      "form",
      (form: HTMLFormElement, type: string) => {
        form.addEventListener(type, (event) => {
          event.preventDefault();
          (window as TestWindow).called = true;
        });
      },
      eventType,
    );

    const button = await page.find(selector);
    await button.click();
    await page.waitForChanges();

    return page.evaluate(() => !!(window as TestWindow).called);
  }

  it("does not submit from a menu trigger button", async () => {
    const called = await assertInternalButtonFormBehavior({
      content: html`
        <form>
          <calcite-action id="form-action" button-type="menu" text="hello world" text-enabled type="submit">
            <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
          </calcite-action>
        </form>
      `,
      eventType: "submit",
      selector: `calcite-action#form-action >>> .${CSS.button}`,
    });

    expect(called).toBe(false);
  });

  it("does not reset from a menu trigger button", async () => {
    const called = await assertInternalButtonFormBehavior({
      content: html`
        <form>
          <calcite-action id="form-action" button-type="menu" text="hello world" text-enabled type="reset">
            <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
          </calcite-action>
        </form>
      `,
      eventType: "reset",
      selector: `calcite-action#form-action >>> .${CSS.button}`,
    });

    expect(called).toBe(false);
  });

  it("does not submit from an overflow trigger button", async () => {
    const called = await assertInternalButtonFormBehavior({
      content: html`
        <form>
          <calcite-action id="form-action" button-type="overflow" text="hello world" text-enabled type="submit">
            <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
          </calcite-action>
        </form>
      `,
      eventType: "submit",
      selector: `calcite-action#form-action >>> .${CSS.button}`,
    });

    expect(called).toBe(false);
  });

  it("does not reset from an overflow trigger button", async () => {
    const called = await assertInternalButtonFormBehavior({
      content: html`
        <form>
          <calcite-action id="form-action" button-type="overflow" text="hello world" text-enabled type="reset">
            <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
          </calcite-action>
        </form>
      `,
      eventType: "reset",
      selector: `calcite-action#form-action >>> .${CSS.button}`,
    });

    expect(called).toBe(false);
  });

  it("submits from the split primary button", async () => {
    const called = await assertInternalButtonFormBehavior({
      content: html`
        <form>
          <calcite-action id="form-action" button-type="split" text="hello world" text-enabled type="submit">
            <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
          </calcite-action>
        </form>
      `,
      eventType: "submit",
      selector: `calcite-action#form-action >>> .${CSS.buttonSplitPrimary}`,
    });

    expect(called).toBe(true);
  });

  it("resets from the split primary button", async () => {
    const called = await assertInternalButtonFormBehavior({
      content: html`
        <form>
          <calcite-action id="form-action" button-type="split" text="hello world" text-enabled type="reset">
            <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
          </calcite-action>
        </form>
      `,
      eventType: "reset",
      selector: `calcite-action#form-action >>> .${CSS.buttonSplitPrimary}`,
    });

    expect(called).toBe(true);
  });

  it("does not submit from the split secondary trigger button", async () => {
    const called = await assertInternalButtonFormBehavior({
      content: html`
        <form>
          <calcite-action id="form-action" button-type="split" text="hello world" text-enabled type="submit">
            <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
          </calcite-action>
        </form>
      `,
      eventType: "submit",
      selector: `calcite-action#form-action >>> .${CSS.buttonSplitSecondary}`,
    });

    expect(called).toBe(false);
  });

  it("does not reset from the split secondary trigger button", async () => {
    const called = await assertInternalButtonFormBehavior({
      content: html`
        <form>
          <calcite-action id="form-action" button-type="split" text="hello world" text-enabled type="reset">
            <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
          </calcite-action>
        </form>
      `,
      eventType: "reset",
      selector: `calcite-action#form-action >>> .${CSS.buttonSplitSecondary}`,
    });

    expect(called).toBe(false);
  });
});

it("should have visible text when text is enabled", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action text="hello world" text-enabled></calcite-action>`);

  const textContainer = await page.find(`calcite-action >>> .${CSS.textContainer}`);
  const isVisible = await textContainer.isVisible();

  expect(isVisible).toBe(true);
});

it("should not have visible text when text is not enabled", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action text="hello world"></calcite-action>`);

  const textContainer = await page.find(`calcite-action >>> .${CSS.textContainer}`);
  const isVisible = await textContainer.isVisible();

  expect(isVisible).toBe(false);
});

it("should have icon container with icon prop", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action icon="hamburger"></calcite-action>`);

  const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
  expect(iconContainer).not.toBeNull();
});

it("should have icon container with calcite-icon", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action><calcite-icon icon="hamburger" scale="s"></calcite-icon></calcite-action>`);

  const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
  expect(iconContainer).not.toBeNull();
});

it("should have icon container with calcite-icon: after delay", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action></calcite-action>`);

  const action = await page.find("calcite-action");

  await page.waitForTimeout(1);

  action.innerHTML = `<calcite-icon icon="hamburger" scale="s"></calcite-icon>`;

  await page.waitForChanges();

  const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
  expect(iconContainer).not.toBeNull();
});

it("should have icon container with svg", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action><svg></svg></calcite-action>`);

  const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
  expect(iconContainer).not.toBeNull();
});

it("should not have icon container if no icon present", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action></calcite-action>`);

  const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
  expect(iconContainer).toBeNull();
});

it("should have icon container if loading", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action loading></calcite-action>`);

  const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
  expect(iconContainer).not.toBeNull();
});

it("should not visually render text for overflow buttonType", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action button-type="overflow" text="hello world" text-enabled></calcite-action>`);

  const textContainer = await page.find(`calcite-action >>> .${CSS.textContainer}`);
  const isVisible = await textContainer.isVisible();

  expect(isVisible).toBe(false);
});

it("should render chevron for menu buttonType when text is not enabled", async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <calcite-action button-type="menu" icon="banana" text="hello world">
      <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
    </calcite-action>
  `);

  const menuChevron = await page.find(`calcite-action >>> .${CSS.menuChevron}`);

  expect(menuChevron).not.toBeNull();
});

it("should render two hit targets for split buttonType", async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <calcite-action button-type="split" text="hello world" text-enabled>
      <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
    </calcite-action>
  `);

  const splitPrimary = await page.find(`calcite-action >>> .${CSS.buttonSplitPrimary}`);
  const splitSecondary = await page.find(`calcite-action >>> .${CSS.buttonSplitSecondary}`);

  expect(splitPrimary).not.toBeNull();
  expect(splitSecondary).not.toBeNull();
});

it("split secondary trigger should have aria-controls pointing at the menu when menu is slotted", async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <calcite-action button-type="split" text="hello world" text-enabled>
      <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
    </calcite-action>
  `);
  await page.waitForChanges();

  const splitSecondary = await page.find(`calcite-action >>> .${CSS.buttonSplitSecondary}`);
  const menu = await page.find(`calcite-action >>> .${CSS.menu}`);

  expect(splitSecondary.getAttribute("aria-controls")).toBe(menu.getAttribute("id"));
});

it("should not apply active styles to split secondary button", async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <calcite-action id="inactive" button-type="split" text="hello world" text-enabled>
      <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
    </calcite-action>
    <calcite-action id="active" active button-type="split" text="hello world" text-enabled>
      <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
    </calcite-action>
  `);

  const styles = await page.evaluate(
    (secondaryClass: string, primaryClass: string) => {
      const inactiveAction = document.querySelector("calcite-action#inactive") as HTMLElement;
      const activeAction = document.querySelector("calcite-action#active") as HTMLElement;

      const inactiveSecondary = inactiveAction.shadowRoot.querySelector(`.${secondaryClass}`) as HTMLButtonElement;
      const activeSecondary = activeAction.shadowRoot.querySelector(`.${secondaryClass}`) as HTMLButtonElement;
      const inactivePrimary = inactiveAction.shadowRoot.querySelector(`.${primaryClass}`) as HTMLButtonElement;
      const activePrimary = activeAction.shadowRoot.querySelector(`.${primaryClass}`) as HTMLButtonElement;

      return {
        inactiveSecondaryBackgroundColor: getComputedStyle(inactiveSecondary).backgroundColor,
        inactiveSecondaryColor: getComputedStyle(inactiveSecondary).color,
        activeSecondaryBackgroundColor: getComputedStyle(activeSecondary).backgroundColor,
        activeSecondaryColor: getComputedStyle(activeSecondary).color,
        inactivePrimaryBackgroundColor: getComputedStyle(inactivePrimary).backgroundColor,
        activePrimaryBackgroundColor: getComputedStyle(activePrimary).backgroundColor,
      };
    },
    CSS.buttonSplitSecondary,
    CSS.buttonSplitPrimary,
  );

  expect(styles.activeSecondaryBackgroundColor).toBe(styles.inactiveSecondaryBackgroundColor);
  expect(styles.activeSecondaryColor).toBe(styles.inactiveSecondaryColor);
  expect(styles.activePrimaryBackgroundColor).not.toBe(styles.inactivePrimaryBackgroundColor);
});

it("should apply open styles to overflow trigger button", async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <calcite-action id="action" appearance="solid" button-type="overflow" text="hello world" text-enabled>
      <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
    </calcite-action>
  `);

  const triggerButton = await page.find(`calcite-action#action >>> .${CSS.button}`);
  const closedOpenStateClass = await page.find(`calcite-action#action >>> .${CSS.buttonOverflowOpen}`);

  await triggerButton.click();
  await page.waitForChanges();

  const openOpenStateClass = await page.find(`calcite-action#action >>> .${CSS.buttonOverflowOpen}`);

  expect(closedOpenStateClass).toBeNull();
  expect(openOpenStateClass).not.toBeNull();
  await expectOpenButtonStylesDoNotChangeOnHoverOrPress(page, "action");
});

it("should apply open styles to menu trigger button", async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <calcite-action id="action" appearance="solid" button-type="menu" text="hello world" text-enabled>
      <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
    </calcite-action>
  `);

  const triggerButton = await page.find(`calcite-action#action >>> .${CSS.button}`);
  const closedOpenStateClass = await page.find(`calcite-action#action >>> .${CSS.buttonMenuOpen}`);

  await triggerButton.click();
  await page.waitForChanges();

  const openOpenStateClass = await page.find(`calcite-action#action >>> .${CSS.buttonMenuOpen}`);

  expect(closedOpenStateClass).toBeNull();
  expect(openOpenStateClass).not.toBeNull();
  await expectOpenButtonStylesDoNotChangeOnHoverOrPress(page, "action");
});

it("should not change split secondary open styles on hover or press", async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <calcite-action id="action" appearance="solid" button-type="split" text="hello world" text-enabled>
      <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
    </calcite-action>
  `);

  const splitSecondaryButton = await page.find(`calcite-action#action >>> .${CSS.buttonSplitSecondary}`);
  const closedOpenStateClass = await page.find(`calcite-action#action >>> .${CSS.buttonSplitSecondaryActive}`);

  await splitSecondaryButton.click();
  await page.waitForChanges();

  const openOpenStateClass = await page.find(`calcite-action#action >>> .${CSS.buttonSplitSecondaryActive}`);

  expect(closedOpenStateClass).toBeNull();
  expect(openOpenStateClass).not.toBeNull();
  await expectOpenButtonStylesDoNotChangeOnHoverOrPress(page, "action", CSS.buttonSplitSecondary);
});

it("should not render menu content when buttonType is undefined", async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <calcite-action text="hello world" text-enabled>
      <calcite-action slot="menu-actions" text="item" text-enabled></calcite-action>
    </calcite-action>
  `);

  const popover = await page.find("calcite-action >>> calcite-popover");

  expect(popover).toBeNull();
});

it("should not render menu content when buttonType is set but no menu content is slotted", async () => {
  for (const buttonType of ["menu", "overflow", "split"]) {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-action button-type="${buttonType}" text="hello world" text-enabled></calcite-action>`,
    );

    const popover = await page.find("calcite-action >>> calcite-popover");

    expect(popover).toBeNull();
  }
});

it("should use text prop for a11y attributes when text is not enabled", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action text="hello world"></calcite-action>`);

  const button = await page.find(`calcite-action >>> .${CSS.button}`);
  expect(button.getAttribute("aria-label")).toBe("hello world");
});

it("should set aria-label with indicator", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action indicator text="hello world"></calcite-action>`);

  const button = await page.find(`calcite-action >>> .${CSS.button}`);
  expect(button.getAttribute("aria-label")).toBe(`hello world (Indicator present)`);
});

it("should have label", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action text="hello world" label="hi"></calcite-action>`);

  const button = await page.find(`calcite-action >>> .${CSS.button}`);
  expect(button.getAttribute("aria-label")).toBe("hi");
});

describe("accessible", () => {
  accessible(html` <calcite-action text="hello world"></calcite-action>`);

  describe("disabled and text-enabled", () => {
    accessible(html` <calcite-action text="hello world" disabled text-enabled></calcite-action>`);
  });

  describe("indicator", () => {
    accessible(html` <calcite-action indicator text="hello world"></calcite-action>`);
  });
});

it("should have a indicator live region", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action></calcite-action>`);
  await page.waitForChanges();

  const action = await page.find("calcite-action");
  const liveRegion = await page.find(`calcite-action >>> .${CSS.indicatorText}`);

  expect(liveRegion.getAttribute("aria-live")).toBe("polite");
  expect(liveRegion.getAttribute("role")).toBe("region");
  expect(liveRegion.textContent).toBe("");

  action.setProperty("indicator", true);
  await page.waitForChanges();

  expect(liveRegion.getAttribute("aria-live")).toBe("polite");
  expect(liveRegion.getAttribute("role")).toBe("region");
  expect(liveRegion.textContent).toBe("Indicator present");
});

describe("themed", () => {
  describe("background color", () => {
    themed(html`<calcite-action></calcite-action>`, {
      "--calcite-action-background-color": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "backgroundColor",
      },
      "--calcite-action-background-color-hover": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "backgroundColor",
        state: "hover",
      },
      "--calcite-action-background-color-press": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "backgroundColor",
        state: { press: { attribute: "class", value: CSS.button } },
      },
    });
  });
  describe("text color", () => {
    themed(
      html`<calcite-action
        scale="s"
        text="click-me"
        label="hello world"
        text-enabled
        icon="configure-popup"
      ></calcite-action>`,
      {
        "--calcite-action-text-color": {
          shadowSelector: `.${CSS.button}`,
          targetProp: "color",
        },
        "--calcite-action-text-color-press": {
          shadowSelector: `.${CSS.button}`,
          targetProp: "color",
          state: "hover",
        },
      },
    );
  });
  describe("active", () => {
    themed(
      html`<calcite-action
        scale="s"
        active
        text="click-me"
        label="hello world"
        text-enabled
        icon="configure-popup"
      ></calcite-action>`,
      {
        "--calcite-action-text-color-press": {
          shadowSelector: `.${CSS.button}`,
          targetProp: "color",
        },
      },
    );
  });
  describe("indicator", () => {
    themed(
      html`<calcite-action class="one" indicator text="hello world"></calcite-action
        ><calcite-action class="two" indicator icon="hamburger"></calcite-action>`,
      {
        "--calcite-action-indicator-color": [
          {
            selector: ".one",
            shadowSelector: `.${CSS.indicatorWithoutIcon}::after`,
            targetProp: "backgroundColor",
          },
          {
            selector: ".two",
            shadowSelector: `.${CSS.indicatorWithIcon}::after`,
            targetProp: "backgroundColor",
          },
        ],
      },
    );
  });
  describe("corner radius", () => {
    themed(html`calcite-action`, {
      "--calcite-action-corner-radius": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
    });
  });
  describe("deprecated", () => {
    themed(html`<calcite-action appearance="transparent"></calcite-action>`, {
      "--calcite-action-background-color-pressed": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "backgroundColor",
        state: { press: { attribute: "class", value: CSS.button } },
      },
      "--calcite-action-corner-radius-end-end": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
      "--calcite-action-corner-radius-end-start": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
      "--calcite-action-corner-radius-start-end": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
      "--calcite-action-corner-radius-start-start": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
      "--calcite-action-text-color-pressed": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "color",
        state: "hover",
      },
    });
    themed(html`<calcite-action appearance="solid"></calcite-action>`, {
      "--calcite-action-background-color": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "backgroundColor",
      },
      "--calcite-action-background-color-hover": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "backgroundColor",
        state: "hover",
      },
      "--calcite-action-background-color-press": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "backgroundColor",
        state: { press: { attribute: "class", value: CSS.button } },
      },
      "--calcite-action-background-color-pressed": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "backgroundColor",
        state: { press: { attribute: "class", value: CSS.button } },
      },
      "--calcite-action-corner-radius-end-end": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
      "--calcite-action-corner-radius-end-start": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
      "--calcite-action-corner-radius-start-end": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
      "--calcite-action-corner-radius-start-start": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
      "--calcite-action-text-color-pressed": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "color",
        state: "hover",
      },
    });
  });
});
