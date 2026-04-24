import { h } from "@arcgis/lumina";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { JsxNode, LitElement, method, property } from "@arcgis/lumina";
import { userEvent } from "vitest/browser";
import { html } from "lit";
import { FormTriggerComponent, useFormTrigger } from "./useFormTrigger";

let form: HTMLFormElement;
let submitHandler: ReturnType<typeof vi.fn<(event: SubmitEvent) => void>>;
let resetHandler: ReturnType<typeof vi.fn<(event: Event) => void>>;

beforeEach(() => {
  form = document.createElement("form");
  document.body.append(form);

  submitHandler = vi.fn((event) => event.preventDefault());
  resetHandler = vi.fn((event) => event.preventDefault());

  form.addEventListener("submit", submitHandler);
  form.addEventListener("reset", resetHandler);
});

afterEach(() => {
  form.remove();
});

class TestComponent extends LitElement {
  static tagName = "form-trigger";

  static formAssociated = true;

  @property()
  disabled = false;

  @property()
  type!: FormTriggerComponent["type"];

  @method()
  async setFocus(): Promise<void> {}

  formTrigger = useFormTrigger()(this);

  override render(): JsxNode {
    return <div>🎯</div>;
  }
}

it("submits", async () => {
  const { el } = await mount<TestComponent>(html`<form-trigger type="submit"></form-trigger>`, {
    parent: form,
    dynamicComponents: [TestComponent],
  });
  await userEvent.click(el);
  expect(submitHandler).toHaveBeenCalledOnce();
});

it("resets", async () => {
  const { el } = await mount<TestComponent>(html`<form-trigger type="reset"></form-trigger>`, {
    parent: form,
    dynamicComponents: [TestComponent],
  });
  await userEvent.click(el);
  expect(resetHandler).toHaveBeenCalledOnce();
});

describe("disabled", () => {
  it("does not submit", async () => {
    const { el } = await mount<TestComponent>(
      html`<form-trigger disabled type="submit"></form-trigger>`,
      {
        parent: form,
        dynamicComponents: [TestComponent],
      },
    );
    await userEvent.click(el);
    expect(submitHandler).not.toHaveBeenCalled();
  });

  it("does not reset", async () => {
    const { el } = await mount<TestComponent>(
      html`<form-trigger disabled type="reset"></form-trigger>`,
      {
        parent: form,
        dynamicComponents: [TestComponent],
      },
    );
    await userEvent.click(el);
    expect(resetHandler).not.toHaveBeenCalled();
  });
});

describe("conditional disabling", () => {
  let disabled: boolean;

  beforeEach(() => {
    disabled = true;
  });

  class ConditionalDisablingTestComponent extends LitElement {
    static tagName = "conditional-disabling";

    static formAssociated = true;

    @property()
    disabled = false;

    @property()
    type!: FormTriggerComponent["type"];

    @method()
    async setFocus(): Promise<void> {}

    formTrigger = useFormTrigger({
      disabled: () => disabled,
    })(this);

    override render(): JsxNode {
      return <div>🎯</div>;
    }
  }

  it("submits when enabled", async () => {
    const { el } = await mount<ConditionalDisablingTestComponent>(
      html`<conditional-disabling type="submit"></conditional-disabling>`,
      {
        parent: form,
        dynamicComponents: [ConditionalDisablingTestComponent],
      },
    );

    await userEvent.click(el);
    expect(submitHandler).not.toHaveBeenCalled();

    disabled = false;
    await userEvent.click(el);
    expect(submitHandler).toHaveBeenCalled();
  });

  it("resets when enabled", async () => {
    const { el } = await mount<ConditionalDisablingTestComponent>(
      html`<conditional-disabling type="reset"></conditional-disabling>`,
      {
        parent: form,
        dynamicComponents: [ConditionalDisablingTestComponent],
      },
    );

    await userEvent.click(el);
    expect(resetHandler).not.toHaveBeenCalled();

    disabled = false;
    await userEvent.click(el);
    expect(resetHandler).toHaveBeenCalled();
  });
});
