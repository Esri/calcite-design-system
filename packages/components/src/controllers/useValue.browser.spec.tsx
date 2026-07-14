import { describe, it, expect, beforeEach, vi } from "vitest";
import { createEvent, EventEmitter, LitElement, method, property } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { useValue } from "./useValue";

describe("useValue", () => {
  const testCurrentValue = "test current value";

  class TestValueComponent extends LitElement {
    testValueChange = createEvent();
    testValueInput: EventEmitter<string> = createEvent();
    @property() value: string = "";
    valueController = useValue(this);

    @method() async simulateInputValue(value: string | null): Promise<void> {
      this.valueController.inputValue({
        inputEventEmitter: this.testValueInput,
        value,
      });
    }

    @method() async simulateCommitValue(value: string | null): Promise<void> {
      this.valueController.commitValue({
        changeEventEmitter: this.testValueChange,
        value,
      });
    }

    @method() async simulateCommitCurrentValue(): Promise<void> {
      this.value = testCurrentValue;
      this.valueController.commitCurrentValue({ changeEventEmitter: this.testValueChange });
    }
  }

  class TestCustomValueComponent extends LitElement {
    testValueChange = createEvent();
    testValueInput: EventEmitter<string> = createEvent();
    @property() customValue: boolean = false;
    valueController = useValue(this);
    valueProperty = "customValue";

    @method() async simulateInputValue(value: string | null): Promise<void> {
      this.valueController.inputValue({
        inputEventEmitter: this.testValueInput,
        value,
      });
    }

    @method() async simulateCommitValue(value: string | null): Promise<void> {
      this.valueController.commitValue({
        changeEventEmitter: this.testValueChange,
        value,
      });
    }

    @method() async simulateCommitCurrentValue(): Promise<void> {
      this.customValue = true;
      this.valueController.commitCurrentValue({ changeEventEmitter: this.testValueChange });
    }
  }

  let component;
  let controller;
  let element;

  describe("basic", () => {
    beforeEach(async (): Promise<void> => {
      const renderResult = await mount(TestValueComponent);
      component = renderResult.component;
      element = renderResult.el;
      controller = component.valueController;
    });

    describe("initialization", () => {
      it("initializes lastCommittedValue to the initial value", () => {
        expect(controller.lastCommittedValue).toBe(component.value);
      });

      it("initializes previousValue to the initial value", () => {
        expect(controller.previousValue).toBe(component.value);
      });
    });

    describe("public methods", () => {
      it("inputValue sets the component's value and emits the component's input event", async () => {
        const firstInput = "1";
        const secondInput = "2";
        const thirdInput = "3";

        const componentChangeEventSpy = vi.fn();
        const componentInputEventSpy = vi.fn();

        element.addEventListener("testValueChange", componentChangeEventSpy);
        element.addEventListener("testValueInput", componentInputEventSpy);

        expect(element.value).toBe("");

        await element.simulateInputValue(firstInput);

        expect(element.value).toBe(firstInput);
        expect(componentChangeEventSpy).not.toHaveBeenCalled();
        expect(componentInputEventSpy).toHaveBeenCalledTimes(1);

        await element.simulateInputValue(secondInput);

        expect(element.value).toBe(secondInput);
        expect(componentChangeEventSpy).not.toHaveBeenCalled();
        expect(componentInputEventSpy).toHaveBeenCalledTimes(2);

        await element.simulateInputValue(thirdInput);

        expect(element.value).toBe(thirdInput);
        expect(componentChangeEventSpy).not.toHaveBeenCalled();
        expect(componentInputEventSpy).toHaveBeenCalledTimes(3);
      });

      it("commitValue sets the component's value and emits the component's change event", async () => {
        const firstCommit = "one";
        const secondCommit = "two";
        const thirdCommit = "three";

        const componentChangeEventSpy = vi.fn();
        const componentInputEventSpy = vi.fn();

        element.addEventListener("testValueChange", componentChangeEventSpy);
        element.addEventListener("testValueInput", componentInputEventSpy);

        expect(element.value).toBe("");

        await element.simulateCommitValue(firstCommit);

        expect(element.value).toBe(firstCommit);
        expect(componentChangeEventSpy).toHaveBeenCalledTimes(1);
        expect(componentInputEventSpy).not.toHaveBeenCalled();

        await element.simulateCommitValue(secondCommit);

        expect(element.value).toBe(secondCommit);
        expect(componentChangeEventSpy).toHaveBeenCalledTimes(2);
        expect(componentInputEventSpy).not.toHaveBeenCalled();

        await element.simulateCommitValue(thirdCommit);

        expect(element.value).toBe(thirdCommit);
        expect(componentChangeEventSpy).toHaveBeenCalledTimes(3);
        expect(componentInputEventSpy).not.toHaveBeenCalled();
      });

      it("commitCurrentValue emits the component's change event with the currently set value", async () => {
        const componentChangeEventSpy = vi.fn();
        const componentInputEventSpy = vi.fn();

        element.addEventListener("testValueChange", componentChangeEventSpy);
        element.addEventListener("testValueInput", componentInputEventSpy);

        expect(element.value).toBe("");

        await element.simulateCommitCurrentValue();

        expect(element.value).toBe(testCurrentValue);
        expect(componentChangeEventSpy).toHaveBeenCalledTimes(1);
        expect(componentInputEventSpy).not.toHaveBeenCalled();
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
  });

  describe("using custom value property", () => {
    const valueProperty = "customValue";

    beforeEach(async (): Promise<void> => {
      const renderResult = await mount(TestCustomValueComponent);
      component = renderResult.component;
      element = renderResult.el;
      controller = component.valueController;
    });

    describe("initialization", () => {
      it("initializes lastCommittedValue to the initial value", () => {
        expect(controller.lastCommittedValue).toBe(component[valueProperty]);
      });

      it("initializes previousValue to the initial value", () => {
        expect(controller.previousValue).toBe(component[valueProperty]);
      });
    });

    describe("public methods", () => {
      it("inputValue sets the component's value and emits the component's input event", async () => {
        const firstInput = "1";
        const secondInput = "2";
        const thirdInput = "3";

        const componentChangeEventSpy = vi.fn();
        const componentInputEventSpy = vi.fn();

        element.addEventListener("testValueChange", componentChangeEventSpy);
        element.addEventListener("testValueInput", componentInputEventSpy);

        expect(element[valueProperty]).toBe("");

        await element.simulateInputValue(firstInput);

        expect(element[valueProperty]).toBe(firstInput);
        expect(componentChangeEventSpy).not.toHaveBeenCalled();
        expect(componentInputEventSpy).toHaveBeenCalledTimes(1);

        await element.simulateInputValue(secondInput);

        expect(element[valueProperty]).toBe(secondInput);
        expect(componentChangeEventSpy).not.toHaveBeenCalled();
        expect(componentInputEventSpy).toHaveBeenCalledTimes(2);

        await element.simulateInputValue(thirdInput);

        expect(element[valueProperty]).toBe(thirdInput);
        expect(componentChangeEventSpy).not.toHaveBeenCalled();
        expect(componentInputEventSpy).toHaveBeenCalledTimes(3);
      });

      it("commitValue sets the component's value and emits the component's change event", async () => {
        const firstCommit = "one";
        const secondCommit = "two";
        const thirdCommit = "three";

        const componentChangeEventSpy = vi.fn();
        const componentInputEventSpy = vi.fn();

        element.addEventListener("testValueChange", componentChangeEventSpy);
        element.addEventListener("testValueInput", componentInputEventSpy);

        expect(element[valueProperty]).toBe("");

        await element.simulateCommitValue(firstCommit);

        expect(element[valueProperty]).toBe(firstCommit);
        expect(componentChangeEventSpy).toHaveBeenCalledTimes(1);
        expect(componentInputEventSpy).not.toHaveBeenCalled();

        await element.simulateCommitValue(secondCommit);

        expect(element[valueProperty]).toBe(secondCommit);
        expect(componentChangeEventSpy).toHaveBeenCalledTimes(2);
        expect(componentInputEventSpy).not.toHaveBeenCalled();

        await element.simulateCommitValue(thirdCommit);

        expect(element[valueProperty]).toBe(thirdCommit);
        expect(componentChangeEventSpy).toHaveBeenCalledTimes(3);
        expect(componentInputEventSpy).not.toHaveBeenCalled();
      });

      it("commitCurrentValue emits the component's change event with the currently set value", async () => {
        const componentChangeEventSpy = vi.fn();
        const componentInputEventSpy = vi.fn();

        element.addEventListener("testValueChange", componentChangeEventSpy);
        element.addEventListener("testValueInput", componentInputEventSpy);

        expect(element[valueProperty]).toBe("");

        await element.simulateCommitCurrentValue();

        expect(element[valueProperty]).toBe(true);
        expect(componentChangeEventSpy).toHaveBeenCalledTimes(1);
        expect(componentInputEventSpy).not.toHaveBeenCalled();
      });

      it("setValue sets the component's value, previousValue and lastCommittedValue without triggering any events", async () => {
        // TODO: finish test
      });
    });
  });
});
