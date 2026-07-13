import { describe, expect, it } from "vitest";
import { getLabelText } from "./label";
import { h, JsxNode, LitElement, property } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { html } from "lit";
import type { Label } from "../components/label/label";
import { useLabel } from "../controllers/useLabel";

class LabelableComponent extends LitElement {
  static tagName = "labelable-component";

  @property({ type: Boolean }) disabled = false;

  @property() label?: string;

  labelEl?: Label["el"];

  labelController = useLabel()(this);

  onLabelClick(): void {}

  override render(): JsxNode {
    return <input />;
  }
}

type WithManager<T extends LitElement> = T["el"] & { manager: { component: T } };

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
