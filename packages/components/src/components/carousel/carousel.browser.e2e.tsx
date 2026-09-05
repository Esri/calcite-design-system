import { Fragment, h, type JsxNode } from "@arcgis/lumina";
import { css } from "../../../support/formatting";
import { beforeEach, afterEach, beforeAll, afterAll, describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { Locator, page, userEvent } from "vitest/browser";
import { hidden, focusable, renders, t9n, accessible, themed } from "../../tests/common";
import { breakpoints } from "../../utils/responsive";
import type { Carousel } from "./carousel";
import { centerItemsByBreakpoint, CSS, DURATION } from "./resources";
import { waitForEvent } from "../../tests/common/utils";

const customDuration = 1000;

describe("accessible", () => {
  describe("default", () => {
    accessible(() =>
      mount(
        <calcite-carousel label="Carousel example">
          <calcite-carousel-item label="Carousel Item 1">
            <p>carousel item content</p>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2">
            <p>carousel item content</p>
          </calcite-carousel-item>
        </calcite-carousel>,
      ),
    );
  });

  describe("with autoplay paused", () => {
    accessible(() =>
      mount(() => (
        <calcite-carousel
          autoplay="paused"
          autoplayDuration={customDuration}
          label="Carousel example"
        >
          <calcite-carousel-item label="Carousel Item 1">
            <p>carousel item content</p>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2">
            <p>carousel item content</p>
          </calcite-carousel-item>
        </calcite-carousel>
      )),
    );
  });

  describe("with autoplay when autoplay", () => {
    accessible(() =>
      mount(() => (
        <calcite-carousel autoplay autoplayDuration={customDuration} label="Carousel example">
          <calcite-carousel-item label="Carousel Item 1">
            <p>carousel item content</p>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2">
            <p>carousel item content</p>
          </calcite-carousel-item>
        </calcite-carousel>
      )),
    );
  });

  describe("with pagination disabled", () => {
    accessible(() =>
      mount(() => (
        <calcite-carousel label="Carousel example" paginationDisabled>
          <calcite-carousel-item label="Carousel Item 1">
            <p>carousel item content</p>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2">
            <p>carousel item content</p>
          </calcite-carousel-item>
        </calcite-carousel>
      )),
    );
  });
});

describe("honors hidden attribute", () => {
  hidden(() =>
    mount(
      <calcite-carousel hidden label="Carousel example">
        <calcite-carousel-item label="Carousel Item 1">
          <p>carousel item content</p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Carousel Item 2">
          <p>carousel item content</p>
        </calcite-carousel-item>
      </calcite-carousel>,
    ),
  );
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-carousel label="Carousel example">
          <calcite-carousel-item label="Carousel Item 1">
            <p>carousel item content</p>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2">
            <p>carousel item content</p>
          </calcite-carousel-item>
        </calcite-carousel>,
      ),
    {
      display: "flex",
    },
  );
});

describe("focusable", () => {
  focusable(() =>
    mount(
      <calcite-carousel label="Carousel example">
        <calcite-carousel-item label="Carousel Item 1">
          <p>carousel item content</p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Carousel Item 2">
          <p>carousel item content</p>
        </calcite-carousel-item>
      </calcite-carousel>,
    ),
  );
});

describe("translation support", () => {
  t9n(() => mount("calcite-carousel"));
});

describe("themed", () => {
  describe("default", () => {
    themed(
      () =>
        mount(
          <calcite-carousel autoplay>
            <calcite-carousel-item label="Carousel Item 1">
              <calcite-card>
                <span slot="heading">Some kind of carousel item content</span>
                <span slot="description">In this case), in a card</span>
                <calcite-icon icon="number-circle-1" scale="s" slot="footer-start" />
              </calcite-card>
            </calcite-carousel-item>
            <calcite-carousel-item label="Carousel Item 2">
              <calcite-card>
                <span slot="heading">Some kind of carousel item content</span>
                <span slot="description">In this case, in a card</span>
                <calcite-icon icon="number-circle-2" scale="s" slot="footer-start" />
              </calcite-card>
            </calcite-carousel-item>
            <calcite-carousel-item label="Carousel Item 3">
              <calcite-card>
                <span slot="heading">Some kind of carousel item content</span>
                <span slot="description">In this case, in a card</span>
                <calcite-icon icon="number-circle-3" scale="s" slot="footer-start" />
              </calcite-card>
            </calcite-carousel-item>
            <calcite-carousel-item label="Carousel Item 4">
              <calcite-card>
                <span slot="heading">Some kind of carousel item content</span>
                <span slot="description">In this case, in a card</span>
                <calcite-icon icon="number-circle-4" scale="s" slot="footer-start" />
              </calcite-card>
            </calcite-carousel-item>
            <calcite-carousel-item label="Carousel Item 5">
              <calcite-card>
                <span slot="heading">Some kind of carousel item content</span>
                <span slot="description">In this case, in a card</span>
                <calcite-icon icon="number-circle-5" scale="s" slot="footer-start" />
              </calcite-card>
            </calcite-carousel-item>
          </calcite-carousel>,
        ),
      {
        "--calcite-carousel-pagination-background-color": [
          {
            shadowSelector: `.${CSS.paginationItem}`,
            targetProp: "backgroundColor",
          },
          {
            shadowSelector: `.${CSS.pageNext}`,
            targetProp: "backgroundColor",
          },
          {
            shadowSelector: `.${CSS.pagePrevious}`,
            targetProp: "backgroundColor",
          },
        ],
        "--calcite-carousel-pagination-background-color-hover": [
          {
            shadowSelector: `.${CSS.paginationItem}`,
            targetProp: "backgroundColor",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.pageNext}`,
            targetProp: "backgroundColor",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.pagePrevious}`,
            targetProp: "backgroundColor",
            state: "hover",
          },
        ],
        "--calcite-carousel-pagination-background-color-press": [
          {
            shadowSelector: `.${CSS.paginationItem}`,
            targetProp: "backgroundColor",
            state: "focus",
          },
          {
            shadowSelector: `.${CSS.autoplayControl}`,
            targetProp: "backgroundColor",
            state: "focus",
          },
          {
            shadowSelector: `.${CSS.pageNext}`,
            targetProp: "backgroundColor",
            state: "focus",
          },
          {
            shadowSelector: `.${CSS.pagePrevious}`,
            targetProp: "backgroundColor",
            state: "focus",
          },
        ],
        "--calcite-carousel-pagination-background-color-selected": {
          shadowSelector: `.${CSS.paginationItemSelected}`,
          targetProp: "backgroundColor",
        },
        "--calcite-carousel-pagination-icon-color": {
          shadowSelector: `.${CSS.paginationItem}`,
          targetProp: "color",
        },
        "--calcite-carousel-pagination-icon-color-hover": {
          shadowSelector: `.${CSS.paginationItem}`,
          targetProp: "color",
          state: "hover",
        },
        "--calcite-carousel-pagination-icon-color-selected": {
          shadowSelector: `.${CSS.paginationItemSelected}`,
          targetProp: "color",
          state: "hover",
        },
        "--calcite-carousel-control-icon-color": [
          {
            shadowSelector: `.${CSS.autoplayControl}`,
            targetProp: "color",
          },
          {
            shadowSelector: `.${CSS.pageNext}`,
            targetProp: "color",
          },
          {
            shadowSelector: `.${CSS.pagePrevious}`,
            targetProp: "color",
          },
        ],
        "--calcite-carousel-control-icon-color-hover": [
          {
            shadowSelector: `.${CSS.autoplayControl}`,
            targetProp: "color",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.pageNext}`,
            targetProp: "color",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.pagePrevious}`,
            targetProp: "color",
            state: "hover",
          },
        ],
        "--calcite-carousel-autoplay-progress-background-color": {
          shadowSelector: `.${CSS.autoplayProgress}`,
          targetProp: "--calcite-progress-background-color",
        },
        "--calcite-carousel-autoplay-progress-fill-color": {
          shadowSelector: `.${CSS.autoplayProgress}`,
          targetProp: "--calcite-progress-fill-color",
        },
      },
    );
  });
});

function carouselItems(selected = "two"): JsxNode[] {
  return ["one", "two", "three"].map((id, index) => (
    <calcite-carousel-item
      id={id}
      key={id}
      label={`Carousel Item ${index + 1}`}
      selected={id === selected}
    >
      <p>item {index + 1}</p>
    </calcite-carousel-item>
  ));
}

function selectedItem(): Locator {
  return page.getBySelector("calcite-carousel-item[selected]");
}

describe("first render", () => {
  it("does not render arrows when arrowType is none", async () => {
    await mount<Carousel>(
      <calcite-carousel arrowType="none" label="Carousel example">
        {carouselItems()}
      </calcite-carousel>,
    );

    await expect
      .element(page.getBySelector(`calcite-carousel .${CSS.pageNext}`))
      .not.toBeInTheDocument();
    await expect
      .element(page.getBySelector(`calcite-carousel .${CSS.pagePrevious}`))
      .not.toBeInTheDocument();
  });

  it("focuses top pagination controls before item content", async () => {
    const { el } = await mount<Carousel>(
      <>
        <button>before</button>
        <calcite-carousel
          arrowType="none"
          id="carousel"
          label="Carousel example"
          paginationPosition="top"
        >
          <calcite-carousel-item label="Carousel Item 1">
            <button>item button</button>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2">
            <button>item button 2</button>
          </calcite-carousel-item>
        </calcite-carousel>
      </>,
    );

    await userEvent.tab();
    await expect.element(page.getByRole("button", { name: "before" })).toHaveFocus();
    await userEvent.tab();
    await expect.element(el).toHaveFocus();
    await userEvent.tab();
    await expect.element(el).toHaveFocus();
    await expect
      .element(page.getByRole("tab", { selected: true }))
      .toBe(el.shadowRoot.activeElement);
  });
});

describe("navigation and events", () => {
  it("selects items and emits change events from arrow controls", async () => {
    const changeSpy = vi.fn();
    await mount<Carousel>(
      <calcite-carousel label="Carousel example" oncalciteCarouselChange={changeSpy}>
        {carouselItems()}
      </calcite-carousel>,
    );
    const next = page.getBySelector(`calcite-carousel .${CSS.pageNext}`);
    const previous = page.getBySelector(`calcite-carousel .${CSS.pagePrevious}`);

    await expect.element(selectedItem()).toHaveProperty("id", "two");
    await userEvent.click(next);
    await expect.element(selectedItem()).toHaveProperty("id", "three");
    expect(changeSpy).toHaveBeenCalledTimes(1);
    await userEvent.click(next);
    await expect.element(selectedItem()).toHaveProperty("id", "one");
    expect(changeSpy).toHaveBeenCalledTimes(2);
    await userEvent.click(previous);
    await expect.element(selectedItem()).toHaveProperty("id", "three");
    expect(changeSpy).toHaveBeenCalledTimes(3);
  });

  it("selects items and emits change events from the keyboard", async () => {
    const changeSpy = vi.fn();
    const { el } = await mount<Carousel>(
      <calcite-carousel label="Carousel example" oncalciteCarouselChange={changeSpy}>
        {carouselItems()}
      </calcite-carousel>,
    );

    await userEvent.tab();
    expect(document.activeElement).toBe(el);
    for (const [index, [key, id]] of [
      ["{ArrowRight}", "three"],
      ["{ArrowRight}", "one"],
      ["{ArrowLeft}", "three"],
      ["{Home}", "one"],
      ["{End}", "three"],
      ["{ArrowRight}", "one"],
    ].entries()) {
      await userEvent.keyboard(key);
      await expect.element(selectedItem()).toHaveProperty("id", id);
      expect(changeSpy).toHaveBeenCalledTimes(index + 1);
    }
  });

  it("only emits when direct pagination changes the selected item", async () => {
    const changeSpy = vi.fn();
    await mount<Carousel>(
      <calcite-carousel
        arrowType="none"
        label="Carousel example"
        oncalciteCarouselChange={changeSpy}
      >
        {carouselItems()}
      </calcite-carousel>,
    );
    const [one, two, three] = page
      .getBySelector(`calcite-carousel .${CSS.paginationItemIndividual}`)
      .all();

    await userEvent.click(one);
    await expect.element(selectedItem()).toHaveProperty("id", "one");
    expect(changeSpy).toHaveBeenCalledTimes(1);
    await userEvent.click(one);
    expect(changeSpy).toHaveBeenCalledTimes(1);
    await userEvent.click(three);
    await expect.element(selectedItem()).toHaveProperty("id", "three");
    expect(changeSpy).toHaveBeenCalledTimes(2);
    await userEvent.click(two);
    await expect.element(selectedItem()).toHaveProperty("id", "two");
    expect(changeSpy).toHaveBeenCalledTimes(3);
    await userEvent.click(two);
    expect(changeSpy).toHaveBeenCalledTimes(3);
  });
});

describe("autoplay", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("toggles autoplay without emitting a carousel change", async () => {
    const changeSpy = vi.fn();
    const playSpy = vi.fn();
    const stopSpy = vi.fn();
    const { el } = await mount<Carousel>(
      <calcite-carousel
        autoplay
        autoplayDuration={customDuration}
        label="Carousel example"
        oncalciteCarouselChange={changeSpy}
        oncalciteCarouselPlay={playSpy}
        oncalciteCarouselStop={stopSpy}
      >
        {carouselItems()}
      </calcite-carousel>,
    );
    const control = page.getBySelector(`calcite-carousel .${CSS.autoplayControl}`);

    await userEvent.click(control);
    expect(el.paused).toBe(true);
    await userEvent.click(control);
    expect(el.paused).toBe(false);
    await userEvent.click(control);
    expect(el.paused).toBe(true);
    expect(changeSpy).not.toHaveBeenCalled();
    expect(playSpy).toHaveBeenCalledTimes(1);
    expect(stopSpy).toHaveBeenCalledTimes(2);
  });

  it("stops and resumes timed rotation from the autoplay control", async () => {
    const { el } = await mount<Carousel>(
      <calcite-carousel autoplay autoplayDuration={customDuration} label="Carousel example">
        {carouselItems()}
      </calcite-carousel>,
    );
    const control = page.getBySelector(`calcite-carousel .${CSS.autoplayControl}`);

    vi.advanceTimersByTime(customDuration);
    await expect.element(selectedItem()).toHaveProperty("id", "three");

    await userEvent.click(control);
    expect(el.paused).toBe(true);
    vi.advanceTimersByTime(customDuration);
    await expect.element(selectedItem()).toHaveProperty("id", "three");

    await userEvent.click(control);
    expect(el.paused).toBe(false);
    vi.advanceTimersByTime(customDuration);
    await expect.element(selectedItem()).toHaveProperty("id", "one");
  });

  it("stops autoplay when pagination or arrows are clicked", async () => {
    const changeSpy = vi.fn();
    const playSpy = vi.fn();
    const stopSpy = vi.fn();
    const { el } = await mount<Carousel>(
      <calcite-carousel
        autoplay
        autoplayDuration={customDuration}
        label="Carousel example"
        oncalciteCarouselChange={changeSpy}
        oncalciteCarouselPlay={playSpy}
        oncalciteCarouselStop={stopSpy}
      >
        {carouselItems()}
      </calcite-carousel>,
    );
    const control = page.getBySelector(`calcite-carousel .${CSS.autoplayControl}`);
    const pagination = page.getBySelector(`calcite-carousel .${CSS.paginationItemIndividual}`);
    const nextPage = page.getBySelector(`calcite-carousel .${CSS.pageNext}`);
    const prevPage = page.getBySelector(`calcite-carousel .${CSS.pagePrevious}`);

    await userEvent.click(pagination.nth(0));
    expect(el.paused).toBe(true);
    await expect.element(selectedItem()).toHaveProperty("id", "one");
    await userEvent.click(pagination.nth(2));
    await expect.element(selectedItem()).toHaveProperty("id", "three");
    await userEvent.click(nextPage);
    await expect.element(selectedItem()).toHaveProperty("id", "one");
    await userEvent.click(prevPage);
    await expect.element(selectedItem()).toHaveProperty("id", "three");
    expect(stopSpy).toHaveBeenCalledTimes(1);

    await userEvent.click(control);
    await userEvent.click(nextPage);
    expect(el.paused).toBe(true);
    await expect.element(selectedItem()).toHaveProperty("id", "one");
    await userEvent.click(control);
    await userEvent.click(prevPage);
    expect(el.paused).toBe(true);
    await expect.element(selectedItem()).toHaveProperty("id", "three");
    expect(changeSpy).toHaveBeenCalledTimes(6);
    expect(playSpy).toHaveBeenCalledTimes(2);
    expect(stopSpy).toHaveBeenCalledTimes(3);
  });

  it("rotates to a new carousel item after duration elapses", async () => {
    const playSpy = vi.fn();
    const stopSpy = vi.fn();
    await mount<Carousel>(
      <calcite-carousel
        autoplay
        autoplayDuration={customDuration}
        label="Carousel example"
        oncalciteCarouselPlay={playSpy}
        oncalciteCarouselStop={stopSpy}
      >
        {carouselItems()}
      </calcite-carousel>,
    );

    vi.advanceTimersByTime(customDuration + 20);
    await expect.element(selectedItem()).toHaveProperty("id", "three");
    vi.advanceTimersByTime(customDuration + 20);
    await expect.element(selectedItem()).toHaveProperty("id", "one");
    vi.advanceTimersByTime(customDuration + 20);
    await expect.element(selectedItem()).toHaveProperty("id", "two");
    expect(playSpy).not.toHaveBeenCalled();
    expect(stopSpy).not.toHaveBeenCalled();
  });

  it("rotates to a new carousel item after default duration elapses", async () => {
    const playSpy = vi.fn();
    const stopSpy = vi.fn();
    const { el } = await mount<Carousel>(
      <calcite-carousel
        autoplay
        label="Carousel example"
        oncalciteCarouselPlay={playSpy}
        oncalciteCarouselStop={stopSpy}
      >
        {carouselItems()}
      </calcite-carousel>,
    );
    expect(el.autoplayDuration).toBe(DURATION);
    const defaultSlideDuration = el.autoplayDuration;

    vi.advanceTimersByTime(defaultSlideDuration);
    await expect.element(selectedItem()).toHaveProperty("id", "three");

    vi.advanceTimersByTime(defaultSlideDuration);
    await expect.element(selectedItem()).toHaveProperty("id", "one");

    vi.advanceTimersByTime(defaultSlideDuration);
    await expect.element(selectedItem()).toHaveProperty("id", "two");
    expect(playSpy).not.toHaveBeenCalled();
    expect(stopSpy).not.toHaveBeenCalled();
  });

  it("stops and starts autoplay after keyboard play and pause", async () => {
    const playSpy = vi.fn();
    const stopSpy = vi.fn();
    const pauseSpy = vi.fn();
    const resumeSpy = vi.fn();
    const { el } = await mount<Carousel>(
      <calcite-carousel
        autoplay="paused"
        autoplayDuration={customDuration}
        label="Carousel example"
        oncalciteCarouselPause={pauseSpy}
        oncalciteCarouselPlay={playSpy}
        oncalciteCarouselResume={resumeSpy}
        oncalciteCarouselStop={stopSpy}
      >
        {carouselItems()}
      </calcite-carousel>,
    );

    await userEvent.tab();
    await expect.element(selectedItem()).toHaveProperty("id", "two");
    vi.advanceTimersByTime(customDuration);
    await expect.element(selectedItem()).toHaveProperty("id", "two");

    await userEvent.keyboard("{Enter}");
    expect(el.paused).toBe(false);
    await expect.element(selectedItem()).toHaveProperty("id", "two");

    vi.advanceTimersByTime(customDuration);
    await expect.element(selectedItem()).toHaveProperty("id", "three");

    await userEvent.keyboard("{Space}");
    expect(el.paused).toBe(true);
    await expect.element(selectedItem()).toHaveProperty("id", "three");

    vi.advanceTimersByTime(customDuration);
    await expect.element(selectedItem()).toHaveProperty("id", "three");

    await userEvent.keyboard("{Space}");
    expect(el.paused).toBe(false);
    expect(playSpy).toHaveBeenCalledTimes(2);
    expect(stopSpy).toHaveBeenCalledTimes(1);
    expect(pauseSpy).not.toHaveBeenCalled();
    expect(resumeSpy).not.toHaveBeenCalled();
  });

  it("does not begin autoplay after keyboard interaction if not enabled via property", async () => {
    const playSpy = vi.fn();
    const stopSpy = vi.fn();
    const pauseSpy = vi.fn();
    const resumeSpy = vi.fn();
    const { el } = await mount<Carousel>(
      <calcite-carousel
        label="Carousel example"
        oncalciteCarouselPause={pauseSpy}
        oncalciteCarouselPlay={playSpy}
        oncalciteCarouselResume={resumeSpy}
        oncalciteCarouselStop={stopSpy}
      >
        {carouselItems()}
      </calcite-carousel>,
    );
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    vi.advanceTimersByTime(customDuration);
    await expect.element(selectedItem()).toHaveProperty("id", "two");
    await userEvent.keyboard("{Space}");
    vi.advanceTimersByTime(customDuration);
    await expect.element(selectedItem()).toHaveProperty("id", "two");
    await userEvent.keyboard("{Space}");
    vi.advanceTimersByTime(customDuration);
    await expect.element(selectedItem()).toHaveProperty("id", "two");
    expect(el.paused).toBeUndefined();
    expect(playSpy).not.toHaveBeenCalled();
    expect(stopSpy).not.toHaveBeenCalled();
    expect(pauseSpy).not.toHaveBeenCalled();
    expect(resumeSpy).not.toHaveBeenCalled();
  });
});

describe("pagination", () => {
  it("selects the first item by default and pages in either direction", async () => {
    await mount<Carousel>(
      <calcite-carousel label="Carousel example">
        <calcite-carousel-item id="one" label="one" />
        <calcite-carousel-item id="two" label="two" />
      </calcite-carousel>,
    );

    await expect.element(selectedItem()).toHaveProperty("id", "one");
    await userEvent.click(page.getBySelector(`calcite-carousel .${CSS.pageNext}`));
    await expect.element(selectedItem()).toHaveProperty("id", "two");
    await userEvent.click(page.getBySelector(`calcite-carousel .${CSS.pagePrevious}`));
    await expect.element(selectedItem()).toHaveProperty("id", "one");
  });

  it("pagination should show when there is a single item", async () => {
    await mount<Carousel>(
      <calcite-carousel label="Carousel example">
        <calcite-carousel-item label="one" />
      </calcite-carousel>,
    );

    expect(page.getBySelector(`calcite-carousel .${CSS.pagination}`)).toBeInTheDocument();
  });

  it("renders pagination for one item and aria-live information when pagination is disabled", async () => {
    await mount<Carousel>(
      <calcite-carousel label="Carousel example" paginationDisabled>
        <calcite-carousel-item label="one" />
        <calcite-carousel-item label="two" />
      </calcite-carousel>,
    );
    await expect
      .element(page.getBySelector(`calcite-carousel .${CSS.paginationItems}`))
      .not.toBeInTheDocument();
    await expect
      .element(page.getBySelector(`calcite-carousel .${CSS.paginationAriaLive}`))
      .toHaveTextContent("Item 1 of 2");
  });
});

describe("DOM updates", () => {
  it("updates when items are added", async () => {
    const { el } = await mount<Carousel>(
      <calcite-carousel label="Carousel example">
        <calcite-carousel-item id="one" label="one" />
      </calcite-carousel>,
    );
    const added = document.createElement("calcite-carousel-item");
    added.id = "two";
    added.label = "two";
    el.append(added);

    await userEvent.click(page.getBySelector(`calcite-carousel .${CSS.pageNext}`));
    await expect.element(selectedItem()).toHaveProperty("id", "two");
  });

  it("updates the selected item when the current item is removed", async () => {
    await mount<Carousel>(
      <calcite-carousel label="Carousel example">
        <calcite-carousel-item id="one" label="one" />
        <calcite-carousel-item id="two" label="two" />
      </calcite-carousel>,
    );

    page.getBySelector("calcite-carousel-item").first().element().remove();

    await expect.element(selectedItem()).toHaveProperty("id", "two");
  });
});

describe("public methods", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("plays and stops autoplay idempotently", async () => {
    const playSpy = vi.fn();
    const stopSpy = vi.fn();
    const { el } = await mount<Carousel>(
      <calcite-carousel
        autoplay="paused"
        autoplayDuration={customDuration}
        label="Carousel example"
        oncalciteCarouselPlay={playSpy}
        oncalciteCarouselStop={stopSpy}
      >
        {carouselItems()}
      </calcite-carousel>,
    );

    await el.play();
    await el.play();
    expect(el.paused).toBe(false);
    expect(playSpy).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(customDuration);
    await expect.element(selectedItem()).toHaveProperty("id", "three");

    await el.stop();
    await el.stop();
    expect(el.paused).toBe(true);
    expect(stopSpy).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(customDuration);
    await expect.element(selectedItem()).toHaveProperty("id", "three");

    await el.play();
    await el.stop();
    expect(playSpy).toHaveBeenCalledTimes(2);
    expect(stopSpy).toHaveBeenCalledTimes(2);
  });

  it("does not restart autoplay when already playing", async () => {
    const playSpy = vi.fn();
    const stopSpy = vi.fn();
    const { el } = await mount<Carousel>(
      <calcite-carousel
        autoplay
        autoplayDuration={customDuration}
        label="Carousel example"
        oncalciteCarouselPlay={playSpy}
        oncalciteCarouselStop={stopSpy}
      >
        {carouselItems()}
      </calcite-carousel>,
    );

    await el.play();
    await el.play();
    expect(el.paused).toBe(false);
    expect(playSpy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(customDuration);
    await expect.element(selectedItem()).toHaveProperty("id", "three");

    await el.stop();
    vi.advanceTimersByTime(customDuration);
    await expect.element(selectedItem()).toHaveProperty("id", "three");
    expect(stopSpy).toHaveBeenCalledTimes(1);
  });

  it("does not play or stop without autoplay", async () => {
    const playSpy = vi.fn();
    const stopSpy = vi.fn();
    const { el } = await mount<Carousel>(
      <calcite-carousel
        label="Carousel example"
        oncalciteCarouselPlay={playSpy}
        oncalciteCarouselStop={stopSpy}
      >
        {carouselItems()}
      </calcite-carousel>,
    );

    await el.play();
    await el.play();
    await el.stop();
    await el.stop();
    vi.advanceTimersByTime(customDuration);
    expect(el.paused).toBeUndefined();
    await expect.element(selectedItem()).toHaveProperty("id", "two");
    expect(playSpy).not.toHaveBeenCalled();
    expect(stopSpy).not.toHaveBeenCalled();
  });
});

describe("animations", () => {
  let testStyleOverride: HTMLStyleElement;

  beforeAll(() => {
    testStyleOverride = document.createElement("style");
    testStyleOverride.innerHTML = css`
      :root {
        --calcite-duration-factor: 0.01;
      }
    `;
    document.head.append(testStyleOverride);
  });

  afterAll(() => {
    testStyleOverride.remove();
  });

  async function expectAnimation(container: HTMLElement, target: Locator): Promise<void> {
    const started = waitForEvent(container, "animationstart");
    const ended = waitForEvent(container, "animationend");
    await target.click();
    await started;
    await ended;
  }

  it("finishes animations between arrow and direct pagination selections", async () => {
    const { el } = await mount<Carousel>(
      <calcite-carousel label="Carousel example">{carouselItems("one")}</calcite-carousel>,
    );
    const container = page
      .elementLocator(el)
      .getBySelector(`.${CSS.container}`)
      .first()
      .element() as HTMLElement;
    const startSpy = vi.fn();
    const endSpy = vi.fn();
    container.addEventListener("animationstart", startSpy);
    container.addEventListener("animationend", endSpy);

    await expectAnimation(container, page.getBySelector(`calcite-carousel .${CSS.pageNext}`));
    await expectAnimation(container, page.getBySelector(`calcite-carousel .${CSS.pagePrevious}`));
    const paginationItems = page.getBySelector(`calcite-carousel .${CSS.paginationItemIndividual}`);
    await expectAnimation(container, paginationItems.nth(1));
    await expectAnimation(container, paginationItems.nth(2));
    expect(startSpy).toHaveBeenCalledTimes(4);
    expect(endSpy).toHaveBeenCalledTimes(4);
  });

  it("finishes selection animations with autoplay enabled", async () => {
    const { el } = await mount<Carousel>(
      <calcite-carousel autoplay autoplayDuration={customDuration} label="Carousel example">
        {carouselItems("one")}
      </calcite-carousel>,
    );
    const container = page
      .elementLocator(el)
      .getBySelector(`.${CSS.container}`)
      .first()
      .element() as HTMLElement;
    const startSpy = vi.fn();
    const endSpy = vi.fn();
    container.addEventListener("animationstart", startSpy);
    container.addEventListener("animationend", endSpy);

    await expectAnimation(container, page.getBySelector(`calcite-carousel .${CSS.pageNext}`));
    const paginationItems = page.getBySelector(`calcite-carousel .${CSS.paginationItemIndividual}`);
    await expectAnimation(container, paginationItems.nth(2));
    expect(startSpy).toHaveBeenCalledTimes(2);
    expect(endSpy).toHaveBeenCalledTimes(2);
  });

  it("does not animate arrow keys when only one item is present", async () => {
    const startSpy = vi.fn();
    const endSpy = vi.fn();
    const { el } = await mount<Carousel>(
      <calcite-carousel label="Carousel example">
        <calcite-carousel-item label="one" />
      </calcite-carousel>,
    );
    const container = page.getBySelector(`calcite-carousel .${CSS.container}`).first().element();
    container.addEventListener("animationstart", startSpy);
    container.addEventListener("animationend", endSpy);
    await el.setFocus();
    await userEvent.keyboard("{ArrowRight}{ArrowLeft}");
    expect(startSpy).not.toHaveBeenCalled();
    expect(endSpy).not.toHaveBeenCalled();
  });
});

describe("overflowing pagination", () => {
  const cases = [
    [200, "xxsmall", centerItemsByBreakpoint.xxsmall + 2, "one"],
    [breakpoints.width.xxsmall, "xsmall", centerItemsByBreakpoint.xsmall + 2, "one"],
    [breakpoints.width.xsmall, "small", centerItemsByBreakpoint.small + 2, "four"],
    [breakpoints.width.small, "medium", centerItemsByBreakpoint.medium + 2, "ten"],
  ] as const;

  it.each(cases)(
    "shows the expected items at %s px (%s)",
    async (width, _breakpoint, count, selected) => {
      const ids = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
      await mount<Carousel>(
        <calcite-carousel label="Carousel example" style={{ width: `${width}px` }}>
          {ids.map((id) => (
            <calcite-carousel-item id={id} key={id} label={id} selected={id === selected} />
          ))}
        </calcite-carousel>,
      );

      await expect
        .poll(() => page.getBySelector(`.${CSS.paginationItemVisible}`))
        .toHaveLength(count);
    },
  );

  it("does not render autoplay or navigation controls for one item", async () => {
    await mount<Carousel>(
      <calcite-carousel autoplay label="Carousel example">
        <calcite-carousel-item label="one" />
      </calcite-carousel>,
    );
    await expect
      .element(page.getBySelector(`calcite-carousel .${CSS.autoplayControl}`))
      .not.toBeInTheDocument();
    await expect
      .element(page.getBySelector(`calcite-carousel .${CSS.pageNext}`))
      .not.toBeInTheDocument();
    await expect
      .element(page.getBySelector(`calcite-carousel .${CSS.pagePrevious}`))
      .not.toBeInTheDocument();
  });
});
