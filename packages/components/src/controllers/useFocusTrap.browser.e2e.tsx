import { JsxNode, LitElement, property } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { PropertyValues } from "lit";
import { html } from "../../support/formatting";
import { waitForNextTick } from "../tests/utils/timing";
import { useFocusTrap } from "./useFocusTrap";

describe("useFocusTrap", () => {
  class Test extends LitElement {
    @property() open? = false;

    focusTrap = useFocusTrap<this>({
      triggerProp: "open",
    })(this);

    private onClick() {
      this.open = false;
    }

    override updated(changes: PropertyValues<this>): void {
      if (changes.has("open")) {
        if (this.open) {
          this.focusTrap.activate();
        } else {
          this.focusTrap.deactivate();
        }
      }
    }

    override render(): JsxNode {
      return <div>{this.open ? <button onClick={this.onClick}>close me!</button> : null}</div>;
    }
  }

  it("does not try to restore focus to the document when there was no previously focused element", async () => {
    document.body.innerHTML = html`<a href="/">should not focus here</a>`;

    const { el, component } = await mount(Test);
    el.open = true;
    await component.updateComplete;
    await waitForNextTick(); // allow focus to shift

    expect(document.activeElement?.tagName).toBe(el.tagName);

    el.open = false;
    await component.updateComplete;
    await waitForNextTick(); // allow focus to shift
    expect(document.activeElement?.tagName).toBe("BODY");
  });
});
