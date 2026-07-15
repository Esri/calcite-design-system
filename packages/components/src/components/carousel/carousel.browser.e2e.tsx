import { h, type JsxNode } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { userEvent } from "vitest/browser";
import {
  hidden,
  focusable,
  renders,
  t9n,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { breakpoints } from "../../utils/responsive";
import type { Carousel } from "./carousel";
import { centerItemsByBreakpoint, CSS } from "./resources";

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
    <calcite-carousel-item id={id} key={id} label={`Carousel Item ${index + 1}`} selected={id === selected}>
      <p>item {index + 1}</p>
    </calcite-carousel-item>
  ));
}

function selectedItem(carousel: Carousel["el"]): Element | null {
  return carousel.querySelector("calcite-carousel-item[selected]");
}

function shadowElement<T extends Element>(carousel: Carousel["el"], selector: string): T {
  return carousel.shadowRoot!.querySelector<T>(selector)!;
}

describe("first render", () => {
  it("does not render arrows when arrowType is none", async () => {
    const { el } = await mount<Carousel>(
      <calcite-carousel arrowType="none" label="Carousel example">
        {carouselItems()}
      </calcite-carousel>,
    );

    expect(shadowElement(el, `.${CSS.pageNext}`)).toBeNull();
    expect(shadowElement(el, `.${CSS.pagePrevious}`)).toBeNull();
  });

  it("focuses top pagination controls before item content", async () => {
    const { el } = await mount<Carousel>(
      <>
        <button id="before">before</button>
        <calcite-carousel arrowType="none" id="carousel" label="Carousel example" paginationPosition="top">
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
    expect(document.activeElement?.id).toBe("before");
    await userEvent.tab();
    expect(document.activeElement).toBe(el);
    await userEvent.tab();
    expect(document.activeElement).toBe(el);
    expect(el.shadowRoot?.activeElement?.classList.contains(CSS.paginationItemIndividual)).toBe(true);
  });
});

describe("navigation and events", () => {
  it("selects items and emits change events from arrow controls", async () => {
    const changeSpy = vi.fn();
    const { el } = await mount<Carousel>(
      <calcite-carousel label="Carousel example" oncalciteCarouselChange={changeSpy}>
        {carouselItems()}
      </calcite-carousel>,
    );
    const next = shadowElement<HTMLButtonElement>(el, `.${CSS.pageNext}`);
    const previous = shadowElement<HTMLButtonElement>(el, `.${CSS.pagePrevious}`);

    expect(selectedItem(el)?.id).toBe("two");
    await userEvent.click(next);
    expect(selectedItem(el)?.id).toBe("three");
    await userEvent.click(next);
    expect(selectedItem(el)?.id).toBe("one");
    await userEvent.click(previous);
    expect(selectedItem(el)?.id).toBe("three");
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
    for (const [key, id] of [
      ["{ArrowRight}", "three"],
      ["{ArrowRight}", "one"],
      ["{ArrowLeft}", "three"],
      ["{Home}", "one"],
      ["{End}", "three"],
      ["{ArrowRight}", "one"],
    ]) {
      await userEvent.keyboard(key);
      expect(selectedItem(el)?.id).toBe(id);
    }
    expect(changeSpy).toHaveBeenCalledTimes(6);
  });

  it("only emits when direct pagination changes the selected item", async () => {
    const changeSpy = vi.fn();
    const { el } = await mount<Carousel>(
      <calcite-carousel arrowType="none" label="Carousel example" oncalciteCarouselChange={changeSpy}>
        {carouselItems()}
      </calcite-carousel>,
    );
    const [one, two, three] = Array.from(
      el.shadowRoot!.querySelectorAll<HTMLButtonElement>(`.${CSS.paginationItemIndividual}`),
    );

    await userEvent.click(one);
    await userEvent.click(one);
    await userEvent.click(three);
    await userEvent.click(two);
    await userEvent.click(two);
    expect(selectedItem(el)?.id).toBe("two");
    expect(changeSpy).toHaveBeenCalledTimes(3);
  });
});

describe("autoplay", () => {
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
    const control = shadowElement<HTMLButtonElement>(el, `.${CSS.autoplayControl}`);

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
    const control = shadowElement<HTMLButtonElement>(el, `.${CSS.autoplayControl}`);
    const pagination = Array.from(
      el.shadowRoot!.querySelectorAll<HTMLButtonElement>(`.${CSS.paginationItemIndividual}`),
    );

    await userEvent.click(pagination[0]);
    expect(el.paused).toBe(true);
    expect(selectedItem(el)?.id).toBe("one");
    await userEvent.click(pagination[2]);
    expect(selectedItem(el)?.id).toBe("three");
    await userEvent.click(shadowElement<HTMLButtonElement>(el, `.${CSS.pageNext}`));
    expect(selectedItem(el)?.id).toBe("one");
    await userEvent.click(shadowElement<HTMLButtonElement>(el, `.${CSS.pagePrevious}`));
    expect(selectedItem(el)?.id).toBe("three");
    expect(stopSpy).toHaveBeenCalledTimes(1);

    await userEvent.click(control);
    await userEvent.click(shadowElement<HTMLButtonElement>(el, `.${CSS.pageNext}`));
    expect(el.paused).toBe(true);
    expect(selectedItem(el)?.id).toBe("one");
    await userEvent.click(control);
    await userEvent.click(shadowElement<HTMLButtonElement>(el, `.${CSS.pagePrevious}`));
    expect(el.paused).toBe(true);
    expect(selectedItem(el)?.id).toBe("three");
    expect(changeSpy).toHaveBeenCalledTimes(6);
    expect(playSpy).toHaveBeenCalledTimes(2);
    expect(stopSpy).toHaveBeenCalledTimes(3);
  });

  it("rotates after custom and default durations and pauses and resumes from the control", async () => {
    vi.useFakeTimers();
    try {
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
      const control = shadowElement<HTMLButtonElement>(el, `.${CSS.autoplayControl}`);

      vi.advanceTimersByTime(customDuration + 20);
      await Promise.resolve();
      expect(selectedItem(el)?.id).toBe("three");
      vi.advanceTimersByTime(customDuration + 20);
      await Promise.resolve();
      expect(selectedItem(el)?.id).toBe("one");
      await userEvent.click(control);
      vi.advanceTimersByTime(customDuration + 20);
      await Promise.resolve();
      expect(selectedItem(el)?.id).toBe("one");
      await userEvent.click(control);
      vi.advanceTimersByTime(customDuration + 20);
      await Promise.resolve();
      expect(selectedItem(el)?.id).toBe("two");
      expect(playSpy).toHaveBeenCalledTimes(1);
      expect(stopSpy).toHaveBeenCalledTimes(1);

      el.remove();
      const { el: defaultDurationCarousel } = await mount<Carousel>(
        <calcite-carousel autoplay label="Carousel example">
          {carouselItems()}
        </calcite-carousel>,
      );
      vi.advanceTimersByTime(defaultDurationCarousel.autoplayDuration + 20);
      await Promise.resolve();
      expect(selectedItem(defaultDurationCarousel)?.id).toBe("three");
      vi.advanceTimersByTime(defaultDurationCarousel.autoplayDuration + 20);
      await Promise.resolve();
      expect(selectedItem(defaultDurationCarousel)?.id).toBe("one");
    } finally {
      vi.useRealTimers();
    }
  });

  it("supports keyboard play and stop only when autoplay is enabled", async () => {
    const playSpy = vi.fn();
    const stopSpy = vi.fn();
    const pauseSpy = vi.fn();
    const resumeSpy = vi.fn();
    const { el } = await mount<Carousel>(
      <calcite-carousel
        autoplay="paused"
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
    expect(el.paused).toBe(false);
    await userEvent.keyboard(" ");
    expect(el.paused).toBe(true);
    el.focus();
    await userEvent.keyboard(" ");
    expect(el.paused).toBe(false);
    expect(playSpy).toHaveBeenCalledTimes(2);
    expect(stopSpy).toHaveBeenCalledTimes(1);
    expect(pauseSpy).not.toHaveBeenCalled();
    expect(resumeSpy).not.toHaveBeenCalled();

    const noAutoplayPlaySpy = vi.fn();
    const noAutoplayStopSpy = vi.fn();
    const { el: noAutoplay } = await mount<Carousel>(
      <calcite-carousel
        label="Carousel example"
        oncalciteCarouselPlay={noAutoplayPlaySpy}
        oncalciteCarouselStop={noAutoplayStopSpy}
      >
        {carouselItems()}
      </calcite-carousel>,
    );
    noAutoplay.focus();
    await userEvent.keyboard("{Enter} ");
    expect(noAutoplay.paused).toBeUndefined();
    expect(noAutoplayPlaySpy).not.toHaveBeenCalled();
    expect(noAutoplayStopSpy).not.toHaveBeenCalled();
  });
});

describe("pagination", () => {
  it("selects the first item by default and pages in either direction", async () => {
    const { el } = await mount<Carousel>(
      <calcite-carousel label="Carousel example">
        <calcite-carousel-item id="one" label="one" />
        <calcite-carousel-item id="two" label="two" />
      </calcite-carousel>,
    );

    expect(selectedItem(el)?.id).toBe("one");
    await userEvent.click(shadowElement(el, `.${CSS.pageNext}`));
    expect(selectedItem(el)?.id).toBe("two");
    await userEvent.click(shadowElement(el, `.${CSS.pagePrevious}`));
    expect(selectedItem(el)?.id).toBe("one");
  });

  it("renders pagination for one item and aria-live information when pagination is disabled", async () => {
    const { el: single } = await mount<Carousel>(
      <calcite-carousel label="Carousel example">
        <calcite-carousel-item label="one" />
      </calcite-carousel>,
    );
    expect(shadowElement(single, `.${CSS.pagination}`)).not.toBeNull();

    const { el } = await mount<Carousel>(
      <calcite-carousel label="Carousel example" paginationDisabled>
        <calcite-carousel-item label="one" />
        <calcite-carousel-item label="two" />
      </calcite-carousel>,
    );
    expect(shadowElement(el, `.${CSS.paginationItems}`)).toBeNull();
    expect(shadowElement(el, `.${CSS.paginationAriaLive}`).textContent).toBe("Item 1 of 2");
  });
});

describe("DOM updates", () => {
  it("updates when items are added and when the selected item is removed", async () => {
    const { el } = await mount<Carousel>(
      <calcite-carousel label="Carousel example">
        <calcite-carousel-item id="one" label="one" />
      </calcite-carousel>,
    );
    const added = document.createElement("calcite-carousel-item");
    added.id = "two";
    added.label = "two";
    el.append(added);
    await expect.poll(() => el.querySelectorAll("calcite-carousel-item").length).toBe(2);
    await userEvent.click(shadowElement(el, `.${CSS.pageNext}`));
    expect(selectedItem(el)?.id).toBe("two");

    added.remove();
    await expect.poll(() => selectedItem(el)?.id).toBe("one");
  });
});

describe("public methods", () => {
  it("plays and stops autoplay idempotently", async () => {
    const playSpy = vi.fn();
    const stopSpy = vi.fn();
    const { el } = await mount<Carousel>(
      <calcite-carousel
        autoplay="paused"
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
    await el.stop();
    await el.stop();
    expect(el.paused).toBe(true);
    expect(stopSpy).toHaveBeenCalledTimes(1);
    await el.play();
    await el.stop();
    expect(playSpy).toHaveBeenCalledTimes(2);
    expect(stopSpy).toHaveBeenCalledTimes(2);
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
    await el.stop();
    expect(el.paused).toBeUndefined();
    expect(selectedItem(el)?.id).toBe("two");
    expect(playSpy).not.toHaveBeenCalled();
    expect(stopSpy).not.toHaveBeenCalled();
  });
});

describe("animations", () => {
  async function expectAnimation(carousel: Carousel["el"], target: Element): Promise<void> {
    const container = shadowElement(carousel, `.${CSS.container}`);
    const started = new Promise((resolve) => container.addEventListener("animationstart", resolve, { once: true }));
    const ended = new Promise((resolve) => container.addEventListener("animationend", resolve, { once: true }));
    await userEvent.click(target);
    await started;
    await ended;
  }

  it("finishes animations between arrow and direct pagination selections", async () => {
    document.documentElement.style.setProperty("--calcite-duration-factor", "0.1");
    try {
      const { el } = await mount<Carousel>(
        <calcite-carousel label="Carousel example">
          {carouselItems("one")}
        </calcite-carousel>,
      );
      await expectAnimation(el, shadowElement(el, `.${CSS.pageNext}`));
      await expectAnimation(el, shadowElement(el, `.${CSS.pagePrevious}`));
      const [, second, third] = Array.from(
        el.shadowRoot!.querySelectorAll(`.${CSS.paginationItemIndividual}`),
      );
      await expectAnimation(el, second);
      await expectAnimation(el, third);
    } finally {
      document.documentElement.style.removeProperty("--calcite-duration-factor");
    }
  });

  it("finishes selection animations with autoplay enabled", async () => {
    document.documentElement.style.setProperty("--calcite-duration-factor", "0.1");
    try {
      const { el } = await mount<Carousel>(
        <calcite-carousel autoplay autoplayDuration={10000} label="Carousel example">
          {carouselItems("one")}
        </calcite-carousel>,
      );
      await expectAnimation(el, shadowElement(el, `.${CSS.pageNext}`));
      const [, , third] = Array.from(el.shadowRoot!.querySelectorAll(`.${CSS.paginationItemIndividual}`));
      await expectAnimation(el, third);
    } finally {
      document.documentElement.style.removeProperty("--calcite-duration-factor");
    }
  });

  it("does not animate arrow keys when only one item is present", async () => {
    const startSpy = vi.fn();
    const endSpy = vi.fn();
    const { el } = await mount<Carousel>(
      <calcite-carousel label="Carousel example">
        <calcite-carousel-item label="one" />
      </calcite-carousel>,
    );
    const container = shadowElement(el, `.${CSS.container}`);
    container.addEventListener("animationstart", startSpy);
    container.addEventListener("animationend", endSpy);
    el.focus();
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

  it.each(cases)("shows the expected items at %s px (%s)", async (width, _breakpoint, count, selected) => {
    const ids = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    const { el } = await mount<Carousel>(
      <calcite-carousel label="Carousel example" style={{ width: `${width}px` }}>
        {ids.map((id) => (
          <calcite-carousel-item id={id} key={id} label={id} selected={id === selected} />
        ))}
      </calcite-carousel>,
    );

    await expect.poll(() => el.shadowRoot!.querySelectorAll(`.${CSS.paginationItemVisible}`).length).toBe(count);
  });

  it("does not render autoplay or navigation controls for one item", async () => {
    const { el } = await mount<Carousel>(
      <calcite-carousel autoplay label="Carousel example">
        <calcite-carousel-item label="one" />
      </calcite-carousel>,
    );
    expect(shadowElement(el, `.${CSS.autoplayControl}`)).toBeNull();
    expect(shadowElement(el, `.${CSS.pageNext}`)).toBeNull();
    expect(shadowElement(el, `.${CSS.pagePrevious}`)).toBeNull();
  });
});
