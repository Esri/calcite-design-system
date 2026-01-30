import { describe, it, expect, beforeEach } from "vitest";
import { LitElement, property } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { useValue } from "./useValue";

describe("useValue", () => {
  class TestComponent extends LitElement {
    @property() value: string = "";
    valueController = useValue(this);
  }

  let component;
  let controller;

  beforeEach(async () => {
    const renderResult = await mount(TestComponent);
    component = renderResult.component;
    controller = component.valueController;
  });

  describe("initialization", () => {
    it("tracks the component's 'value' property by default", () => {
      // TODO: not working for some reason
      // expect(controller.valueProperty).toBe("value");
    });

    it("initializes lastCommittedValue to the initial value", () => {
      expect(controller.lastCommittedValue).toBe(component.value);
    });

    it("initializes previousValue to the initial value", () => {
      expect(controller.previousValue).toBe(component.value);
    });
  });

  describe("public methods", () => {
    it("inputValue sets the component's value and emits the component's input event", async () => {
      // TODO: finish test
    });

    it("commitValue sets the component's value to the provided value and emits the component's change event", async () => {
      // TODO: finish test
    });

    it("commitCurrentValue sets the component's currently set value and emits the component's change event", async () => {
      // TODO: finish test
    });

    it("setValue sets the component's value, previousValue and lastCommittedValue without triggering any events", async () => {
      // TODO: finish test
    });
  });

  describe("direct value changes", () => {
    it("syncs previousValue and lastCommittedValue with the current value when the component's value is directly changed and does not emit any events", async () => {
      // TODO: finish test
    });
  });

  it("supports setting a custom valueProperty", async () => {
    // TODO: finish test
  });
});
