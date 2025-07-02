import { EventEmitter } from "@arcgis/lumina";
import { GenericController, toFunction } from "@arcgis/lumina/controllers";
import type { PropertyValues } from "lit";

interface UseValue {
  /**
   * The component's previously emitted value.
   */
  previousEmittedValue: string;
}

interface UseValueComponent {
  /**
   * The component's public value property.
   */
  value: string;
}

interface CommitValueOptions {
  /**
   * The component's custom change event.
   */
  changeEvent: EventEmitter;
  /**
   * The new value to set on the component.
   */
  value: string;
}

interface InputValueOptions {
  /**
   * The component's custom input event.
   */
  inputEvent: EventEmitter;
  /**
   * The new value to set on the component.
   */
  value: string;
}

/**
 * A controller for managing form component values
 */
class ValueController extends GenericController<UseValue, UseValueComponent> {
  //#region Properties

  previousEmittedValue: string = "";

  previousValue: string = "";

  //#endregion

  //#region Component Lifecycle

  hostConnected(): void {
    this.previousEmittedValue = this.component.value;
    this.previousValue = this.component.value;
  }

  hostUpdate(changes: PropertyValues): void {
    if (changes.has("value")) {
      console.log(
        "hostUpdate",
        `changes.get("value"):`,
        changes.get("value"),
        "this.component.value:",
        this.component.value,
        "previousEmittedValue:",
        this.previousEmittedValue,
        "previousValue:",
        this.previousValue,
      );
    }
  }

  //#endregion

  //#region Methods

  /**
   * Commits the component's current value from user input.
   * Emits the component's custom change event if the component's current value differs from the previously emitted value.
   *
   * @param changeEvent.changeEvent
   * @param changeEvent
   * @param value
   * @param changeEvent.value
   */
  commitValue({ changeEvent, value }: CommitValueOptions): void {
    this.previousValue = this.component.value;
    this.component.value = value;
    if (value !== this.previousEmittedValue) {
      changeEvent.emit();
      this.previousEmittedValue = value;
      // TODO: handle default event prevention
    }
  }

  /**
   * Sets the component's value from user input and emits the component's custom input event.
   *
   * @param inputEvent.inputEvent
   * @param inputEvent
   * @param value
   * @param inputEvent.value
   */
  inputValue({ inputEvent, value }: InputValueOptions): void {
    this.previousValue = this.component.value;
    this.component.value = value;
    inputEvent.emit();
    // TODO: handle default event prevention
  }

  setValue(value: string): void {
    this.previousValue = value;
    this.previousEmittedValue = value;
    this.component.value = value;
  }

  //#endregion
}

export const useValue = toFunction(ValueController);
