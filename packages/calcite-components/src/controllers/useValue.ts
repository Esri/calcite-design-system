import { EventEmitter } from "@arcgis/lumina";
import { GenericController, toFunction } from "@arcgis/lumina/controllers";
import type { PropertyValues } from "lit";

interface UseValue {
  /**
   * The component's last emitted value.
   */
  lastEmittedValue: string;
  /**
   * The component's previously set value.
   */
  previousValue: string;
  /**
   * Whether the last value change was performed by a KeyboardEvent or MouseEvent.
   */
  userChangedValue: boolean;
}

interface UseValueComponent {
  /**
   * The component's public value property.
   */
  value: string;
}

interface CommitValueOptions {
  /**
   * The component's change event emitter.
   */
  changeEventEmitter: EventEmitter;
  /**
   * The new value to set on the component.  If omitted, the controller will commit the component's currently set value.
   */
  value: string;
}

interface InputValueOptions {
  /**
   * The component's input event emitter.
   */
  inputEventEmitter: EventEmitter;
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

  lastEmittedValue = "";

  previousValue = "";

  userChangedValue = false;

  //#endregion

  //#region Component Lifecycle

  hostConnected(): void {
    this.lastEmittedValue = this.component.value;
    this.previousValue = this.component.value;
  }

  hostUpdate(changes: PropertyValues): void {
    if (changes.has("value")) {
      if (!this.userChangedValue) {
        this.handleDirectValueChange(this.component.value);
      }
      this.userChangedValue = false;
    }
  }

  //#endregion

  //#region Methods

  /**
   * Commits the component's current value.
   *
   * @param changeEventEmitter.changeEventEmitter
   * @param changeEventEmitter
   */
  commitCurrentValue({ changeEventEmitter }: Pick<CommitValueOptions, "changeEventEmitter">): void {
    this.commitValue({ changeEventEmitter, value: this.component.value });
  }

  /**
   * Commits the passed in value in response to user input.
   * Emits the component's custom change event if the value differs from the previously emitted value.
   *
   * @param changeEvent
   * @param changeEvent.changeEventEmitter
   * @param value
   * @param changeEvent.value
   */
  commitValue({ changeEventEmitter, value }: CommitValueOptions): void {
    this.userChangedValue = true;
    this.previousValue = this.component.value;
    this.component.value = value;
    if (this.component.value !== this.lastEmittedValue) {
      const changeEvent = changeEventEmitter.emit();
      if (changeEvent.defaultPrevented) {
        this.userChangedValue = false;
        this.component.value = this.lastEmittedValue;
      } else {
        this.lastEmittedValue = this.component.value;
      }
    }
  }

  /**
   * Sets internal properties as a result of a direct value assignment instead of a user keyboard or mouse event.  Sets the component's value to empty string when the incoming value is falsy.
   * @internal
   */
  private handleDirectValueChange(value: string): void {
    if (!value) {
      this.component.value = "";
    }
    this.previousValue = value;
    this.lastEmittedValue = value;
  }

  /**
   * Sets the component's value in response to user input and emits the component's input event.
   *
   * @param inputEventEmitter.inputEventEmitter
   * @param inputEventEmitter
   * @param value
   * @param inputEventEmitter.value
   */
  inputValue({ inputEventEmitter, value }: InputValueOptions): void {
    this.previousValue = this.component.value;
    this.userChangedValue = true;
    this.component.value = value;
    const inputEvent = inputEventEmitter.emit();
    // TODO: get default prevention to work here (currently not working)
    if (inputEvent.defaultPrevented) {
      this.userChangedValue = false;
      this.component.value = this.previousValue;
    }
  }

  //#endregion
}

export const useValue = toFunction(ValueController);
