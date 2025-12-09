import { describe, it, expect, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h, JsxNode, LitElement, property } from "@arcgis/lumina";
import { page, userEvent } from "vitest/browser";
import { useInteractive } from "./useInteractive";

describe("useInteractive", () => {
  class Test extends LitElement {
    interactiveContainer = useInteractive(this);

    @property() disabled = false;

    render(): JsxNode {
      return (
        <this.interactiveContainer disabled={this.disabled}>
          <button>hi</button>
        </this.interactiveContainer>
      );
    }
  }

  it("prevents both keyboard and pointer interaction", async () => {
    const { el, reRender } = await mount(Test);
    const clickSpy = vi.fn();
    const button = page.getByRole("button");
    button.element().addEventListener("click", clickSpy);

    await userEvent.click(button, { force: true });
    await userEvent.keyboard("{Enter}");

    expect(el.getAttribute("aria-disabled")).toBeNull();
    expect(clickSpy).toHaveBeenCalledTimes(2);

    el.disabled = true;
    await reRender();

    await userEvent.click(button, { force: true });
    await userEvent.keyboard("{Enter}");

    expect(el.getAttribute("aria-disabled")).toBe("true");
    expect(clickSpy).toHaveBeenCalledTimes(2);
  });
});
