import { afterEach, beforeEach, describe, it, expect } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h, JsxNode, LitElement, method, property } from "@arcgis/lumina";
import { useForm } from "./useForm";
import { defaultValidity } from "../tests/commonTests/browser/defaults";
import { html, PropertyValues } from "lit";
import { createRef } from "lit/directives/ref.js";
import { page, userEvent } from "vitest/browser";

describe("useForm", () => {
  class TestComponent extends LitElement {
    static formAssociated = true;

    @property({ type: Boolean })
    disabled = false;

    @property()
    value = "";

    @property()
    name?: string;

    @property()
    form?: string;

    @property({ type: Boolean })
    required: boolean = false;

    @property()
    validity!: ValidityState;

    defaultValue?: TestComponent["value"];

    @method()
    async setFocus(): Promise<void> {}

    formSupport = useForm<this>({ inputType: "text" })(this);
  }

  let form: HTMLFormElement;

  beforeEach(() => {
    form = document.createElement("form");
    document.body.append(form);
  });

  afterEach(() => {
    form.remove();
  });

  describe("reset behavior", () => {
    it("restores value to defaultValue on form reset", async () => {
      const { el, reRender } = await mount(TestComponent, {
        parent: form,
      });

      el.value = "foo";
      await reRender();

      form.reset();
      await reRender();

      expect(el).toHaveProperty("value", "");
    });
  });

  describe("disabled", () => {
    it("doesn't validate disabled components", async () => {
      const { el } = await mount(html`<test-component disabled required></test-component>`, {
        dynamicComponents: [TestComponent],
        parent: form,
      });

      expect(el.validity).toMatchObject(defaultValidity);
    });
  });

  it("allows mapping value when the component's value is different than the form submit value", async () => {
    class MappedValueFormComponent extends LitElement {
      static formAssociated = true;

      @property({ type: Boolean })
      disabled = false;

      @property()
      value = "";

      @property()
      name?: string;

      @property()
      form?: string;

      @property({ type: Boolean })
      required: boolean = false;

      @property()
      validity!: ValidityState;

      defaultValue?: TestComponent["value"];

      @method()
      async setFocus(): Promise<void> {}

      formSupport = useForm<this>({
        inputType: "text",
        getValue: () => `mapped-${this.value}`,
      })(this);
    }

    await mount(
      html`<mapped-value-form-component
        name="mapped-value"
        value="test"
      ></mapped-value-form-component>`,
      {
        dynamicComponents: [MappedValueFormComponent],
        parent: form,
      },
    );

    const formData = new FormData(form);
    expect(formData.get("mapped-value")).toBe("mapped-test");
  });

  describe("input types", () => {
    class FileTypeFormComponent extends LitElement {
      static formAssociated = true;

      inputRef = createRef<HTMLInputElement>();

      @property({ type: Boolean })
      disabled = false;

      @property()
      value = "";

      @property()
      name?: string;

      @property()
      form?: string;

      @property({ type: Boolean })
      required: boolean = false;

      @property()
      type!: HTMLInputElement["type"];

      @property()
      validity!: ValidityState;

      defaultValue?: TestComponent["value"];

      formSupport = useForm<this>({
        inputType: "text",
        getValue: () =>
          this.type === "file" ? this.inputRef.value?.files || this.value : this.value,
      })(this);

      @method()
      async setFocus(): Promise<void> {}

      private handleChange(event: Event): void {
        this.value = (event.target as HTMLInputElement).value;
      }

      protected willUpdate(changes: PropertyValues) {
        if (changes.has("type")) {
          this.formSupport.overrideInputType(this.type);
        }
      }

      protected render(): JsxNode {
        return (
          <input
            data-testid="internal-input"
            onChange={this.handleChange}
            ref={this.inputRef}
            type={this.type}
          />
        );
      }
    }

    it("supports file type", async () => {
      const { el, reRender } = await mount(
        html`<file-type-form-component name="file-type" type="file"></file-type-form-component>`,
        {
          dynamicComponents: [FileTypeFormComponent],
          parent: form,
        },
      );

      expect(el.validity.valid).toBe(true);

      el.required = true;
      await reRender();

      expect(el.validity.valid).toBe(false);

      const input = page.getByTestId("internal-input");
      const file = new File(["file"], "fake-file.png", { type: "image/png" });
      await userEvent.upload(input, file);
      await reRender();

      expect(el.validity.valid).toBe(true);

      const formData = new FormData(form);

      const submittedFile = formData.get("file-type");

      expect(submittedFile).toBeInstanceOf(File);
      expect((submittedFile as File).name).toBe(file.name);
    });
  });
});
