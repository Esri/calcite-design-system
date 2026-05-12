import { afterEach, beforeEach, describe, it, expect } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { LitElement, method, property } from "@arcgis/lumina";
import { useForm } from "./useForm";

describe("useForm", () => {
  class TestComponent extends LitElement {
    static formAssociated = true;

    @property()
    disabled = false;

    @property()
    value = "";

    @property()
    name?: string;

    @property()
    form?: string;

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
});
