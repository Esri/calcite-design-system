import { describe, expect, it, vi } from "vitest";
import { connectLabel, disconnectLabel, getLabelText } from "./label";
import { h, JsxNode, LitElement, property } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { mount } from "@arcgis/lumina-compiler/testing";
import { html } from "lit";
import type { Label } from "../components/label/label";
import { page, userEvent } from "vitest/browser";

class LabelableComponent extends LitElement {
  static tagName = "labelable-component";

  @property({ type: Boolean }) disabled = false;

  @property() label?: string;

  inputRef = createRef<HTMLInputElement>();

  labelEl?: Label["el"];

  onLabelClick(): void {
    this.inputRef.value!.focus();
  }

  override connectedCallback(): void {
    connectLabel(this);
  }

  override disconnectedCallback(): void {
    disconnectLabel(this);
  }

  override render(): JsxNode {
    return <input ref={this.inputRef} />;
  }
}

type WithManager<T extends LitElement> = T["el"] & { manager: { component: T } };

describe("connectLabel/disconnectLabel", () => {
  describe("wires up the associated label", () => {
    it("ignores labelable with no associated label", async () => {
      const { component, el } = await mount(
        html`<labelable-component id="unlabeled"></labelable-component>`,
        {
          dynamicComponents: [LabelableComponent],
        },
      );

      expect(component.labelEl).toBeUndefined();

      el.remove();

      expect(component.labelEl).toBeUndefined();
    });

    it("prevents selecting disabled labeled element", async () => {
      const { el } = await mount(
        html`
          <calcite-label for="for">label</calcite-label>
          <labelable-component disabled id="for"></labelable-component>
        `,
        {
          dynamicComponents: [LabelableComponent],
        },
      );
      const labelable =
        document.querySelector<WithManager<LabelableComponent>>("labelable-component")!;
      vi.spyOn(labelable.manager.component, "onLabelClick");

      expect(labelable.manager.component.labelEl).toBe(el);

      el.click();

      expect(labelable.manager.component.onLabelClick).toHaveBeenCalledTimes(0);
      await expect.element(labelable).not.toHaveFocus();

      labelable.remove();

      expect(labelable.manager.component.labelEl).toBeUndefined();
    });

    it("supports cancellation", async () => {
      const { el } = await mount(
        html`
          <calcite-label>
            <div data-testid="interceptor">label</div>
            <labelable-component data-testid="labelable"></labelable-component>
          </calcite-label>
        `,
        { dynamicComponents: [LabelableComponent] },
      );
      const labelable =
        document.querySelector<WithManager<LabelableComponent>>("labelable-component")!;
      vi.spyOn(labelable.manager.component, "onLabelClick");
      const interceptor = page.getByTestId("interceptor");
      const clickHandler = vi.fn((event: Event) => event.preventDefault());
      interceptor.element().addEventListener("click", clickHandler, { once: true });

      expect(labelable.manager.component.labelEl).toBe(el);

      await userEvent.click(interceptor);

      expect(labelable.manager.component.onLabelClick).toHaveBeenCalledTimes(0);
      await expect.element(labelable).not.toHaveFocus();
      expect(clickHandler).toHaveBeenCalledTimes(1);
      expect(clickHandler.mock.lastCall![0]).toHaveProperty("defaultPrevented", true);

      labelable.remove();

      expect(labelable.manager.component.labelEl).toBeUndefined();
    });

    it("supports for attribute", async () => {
      const { el } = await mount(
        html`
          <calcite-label for="for">label</calcite-label>
          <labelable-component id="for"></labelable-component>
        `,
        {
          dynamicComponents: [LabelableComponent],
        },
      );
      const labelable =
        document.querySelector<WithManager<LabelableComponent>>("labelable-component")!;
      vi.spyOn(labelable.manager.component, "onLabelClick");

      expect(labelable.manager.component.labelEl).toBe(el);

      el.click();

      expect(labelable.manager.component.onLabelClick).toHaveBeenCalledTimes(1);
      await expect.element(labelable).toHaveFocus();

      labelable.remove();

      expect(labelable.manager.component.labelEl).toBeUndefined();

      el.click();

      expect(labelable.manager.component.onLabelClick).toHaveBeenCalledTimes(1);
    });

    it("supports wrapped labelable", async () => {
      const { el } = await mount(
        html`
          <calcite-label>
            label
            <labelable-component></labelable-component>
          </calcite-label>
        `,
        {
          dynamicComponents: [LabelableComponent],
        },
      );
      const labelable =
        document.querySelector<WithManager<LabelableComponent>>("labelable-component")!;
      vi.spyOn(labelable.manager.component, "onLabelClick");

      expect(labelable.manager.component.labelEl).toBe(el);

      el.click();

      expect(labelable.manager.component.onLabelClick).toHaveBeenCalledTimes(1);
      await expect.element(labelable).toHaveFocus();

      labelable.remove();

      expect(labelable.manager.component.labelEl).toBeUndefined();

      el.click();

      expect(labelable.manager.component.onLabelClick).toHaveBeenCalledTimes(1);
      await expect.element(labelable).not.toHaveFocus();
    });

    it("supports being rendered after labelable", async () => {
      const { container } = await mount(
        html` <labelable-component id="renderedFirst"></labelable-component> `,
        {
          dynamicComponents: [LabelableComponent],
        },
      );
      const label = document.createElement("calcite-label");
      label.setAttribute("for", "renderedFirst");
      container.append(label);
      const labelable =
        document.querySelector<WithManager<LabelableComponent>>("labelable-component")!;
      vi.spyOn(labelable.manager.component, "onLabelClick");

      expect(labelable.manager.component.labelEl).toBe(label);

      label.click();

      expect(labelable.manager.component.onLabelClick).toHaveBeenCalledTimes(1);

      labelable.remove();

      expect(labelable.manager.component.labelEl).toBeUndefined();

      label.click();

      expect(labelable.manager.component.onLabelClick).toHaveBeenCalledTimes(1);
    });

    it("works if reattached to labelable", async () => {
      const { container, el } = await mount(
        html`
          <calcite-label for="for"></calcite-label>
          <labelable-component id="for"></labelable-component>
        `,
        {
          dynamicComponents: [LabelableComponent],
        },
      );
      const labelable =
        document.querySelector<WithManager<LabelableComponent>>("labelable-component")!;
      vi.spyOn(labelable.manager.component, "onLabelClick");

      el.remove();
      container.append(el);

      expect(labelable.manager.component.labelEl).toBe(el);

      el.click();

      expect(labelable.manager.component.onLabelClick).toHaveBeenCalledTimes(1);

      labelable.remove();

      expect(labelable.manager.component.labelEl).toBeUndefined();

      el.click();

      expect(labelable.manager.component.onLabelClick).toHaveBeenCalledTimes(1);
    });

    it("does not support nested labelables", async () => {
      const { el } = await mount(
        html`
          <calcite-label>
            label
            <labelable-component id="outer">
              <labelable-component id="inner"></labelable-component>
            </labelable-component>
          </calcite-label>
        `,
        {
          dynamicComponents: [LabelableComponent],
        },
      );
      const innerLabelable = document.querySelector<WithManager<LabelableComponent>>("#inner")!;
      const outerLabelable = document.querySelector<WithManager<LabelableComponent>>("#outer")!;
      vi.spyOn(innerLabelable.manager.component, "onLabelClick");
      vi.spyOn(outerLabelable.manager.component, "onLabelClick");

      expect(innerLabelable.manager.component.labelEl).toBeUndefined();
      expect(outerLabelable.manager.component.labelEl).toBe(el);

      el.click();

      expect(outerLabelable.manager.component.onLabelClick).toHaveBeenCalledTimes(1);

      outerLabelable.remove();

      el.click();

      expect(outerLabelable.manager.component.onLabelClick).toHaveBeenCalledTimes(1);
    });

    it("handles the first labelable child only", async () => {
      const { el } = await mount(
        html`
          <calcite-label>
            label
            <labelable-component id="first"></labelable-component>
            <labelable-component id="second"></labelable-component>
            <labelable-component id="third"></labelable-component>
          </calcite-label>
        `,
        {
          dynamicComponents: [LabelableComponent],
        },
      );
      const labelable1 = document.querySelector<WithManager<LabelableComponent>>("#first")!;
      const labelable2 = document.querySelector<WithManager<LabelableComponent>>("#second")!;
      const labelable3 = document.querySelector<WithManager<LabelableComponent>>("#third")!;
      vi.spyOn(labelable1.manager.component, "onLabelClick");
      vi.spyOn(labelable2.manager.component, "onLabelClick");
      vi.spyOn(labelable3.manager.component, "onLabelClick");

      expect(labelable1.manager.component.labelEl).toBe(el);
      expect(labelable2.manager.component.labelEl).toBe(el);
      expect(labelable3.manager.component.labelEl).toBe(el);

      el.click();

      expect(labelable1.manager.component.onLabelClick).toHaveBeenCalledTimes(1); // should be 1
      expect(labelable2.manager.component.onLabelClick).toHaveBeenCalledTimes(0);
      expect(labelable3.manager.component.onLabelClick).toHaveBeenCalledTimes(0);

      labelable1.remove();
      el.click();

      expect(labelable1.manager.component.onLabelClick).toHaveBeenCalledTimes(1);
      expect(labelable2.manager.component.onLabelClick).toHaveBeenCalledTimes(1);
      expect(labelable3.manager.component.onLabelClick).toHaveBeenCalledTimes(0);

      labelable2.remove();
      el.click();

      expect(labelable1.manager.component.onLabelClick).toHaveBeenCalledTimes(1);
      expect(labelable2.manager.component.onLabelClick).toHaveBeenCalledTimes(1);
      expect(labelable3.manager.component.onLabelClick).toHaveBeenCalledTimes(1);

      labelable3.remove();
      el.click();

      expect(labelable1.manager.component.onLabelClick).toHaveBeenCalledTimes(1);
      expect(labelable2.manager.component.onLabelClick).toHaveBeenCalledTimes(1);
      expect(labelable3.manager.component.onLabelClick).toHaveBeenCalledTimes(1);
    });
  });
});

describe(getLabelText, () => {
  async function expectLabelText({ label, template }: { label: string; template: any }) {
    await mount(template, {
      dynamicComponents: [LabelableComponent],
    });
    const labelable =
      document.querySelector<WithManager<LabelableComponent>>("labelable-component")!;
    expect(getLabelText(labelable.manager.component)).toBe(label);
  }

  it("gets label text from labelable", async () => {
    await expectLabelText({
      label: "labelable",
      template: html`<labelable-component label="labelable"></labelable-component>`,
    });
  });

  it("gets label text from content", async () => {
    await expectLabelText({
      label: "text-content",
      template: html`
        <calcite-label>
          text-content
          <labelable-component></labelable-component>
        </calcite-label>
      `,
    });
  });

  it("prefers labelable text over label content", async () => {
    await expectLabelText({
      label: "labelable",
      template: html`
        <calcite-label>
          label
          <labelable-component label="labelable"></labelable-component>
        </calcite-label>
      `,
    });
  });
});
