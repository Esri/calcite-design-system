import { EventEmitter } from "@arcgis/lumina";
import { GenericController, toFunction } from "@arcgis/lumina/controllers";
import type { PropertyValues } from "lit";

interface UseValue {
  /**
   * The component's last committed value.
   */
  lastCommittedValue: string;
  /**
   * The component's previously set value.
   */
  previousValue: string;
  /**
   * The name of the component's value property useValue will manage.  Defaults to "value".
   */
  valueProperty: string;
  /**
   * Whether the incoming value change is as a result of an external direct property assignment and not from any public useValue methods.
   */
  valueSetDirectly: boolean;
}

interface UseValueComponent {
  /**
   * The name of the component's public value property.
   *
   */
  valueProperty?: string;
}

interface CommitValueOptions {
  /**
   * The component's change event emitter.
   */
  changeEventEmitter: EventEmitter;
  /**
   * The new value to set on the component.  If omitted, the controller will commit the component's currently set value.
   */
  value: any;
}

interface InputValueOptions {
  /**
   * The component's input event emitter.
   */
  inputEventEmitter: EventEmitter<string>;
  /**
   * The new value to set on the component.
   */
  value: any;
}

/**
 * A controller for managing form component values
 */
class ValueController extends GenericController<UseValue, UseValueComponent> {
  //#region Properties

  lastCommittedValue = "";

  previousValue = "";

  valueSetDirectly = true;

  //#endregion

  //#region Component Lifecycle

  hostConnected(): void {
    const valueProperty = this.getComponentValueProperty();
    this.lastCommittedValue = this.component[valueProperty];
    this.previousValue = this.component[valueProperty];
  }

  hostLoaded(): void {
    const valueProperty = this.getComponentValueProperty();
    this.lastCommittedValue = this.component[valueProperty];
    this.previousValue = this.component[valueProperty];
  }

  hostUpdate(changes: PropertyValues): void {
    const valueProperty = this.getComponentValueProperty();
    if (changes.has(valueProperty) && this.valueSetDirectly) {
      this.handleDirectValueChange(this.component[valueProperty]);
    }
    this.valueSetDirectly = true;
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
    this.commitValue({ changeEventEmitter, value: this.component[this.getComponentValueProperty()] });
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
    const valueProperty = this.getComponentValueProperty();
    if (this.component[valueProperty] === value && this.component[valueProperty] === this.lastCommittedValue) {
      return;
    }

    this.previousValue = this.component[valueProperty];
    this.valueSetDirectly = false;
    this.component[valueProperty] = value;

    const changeEvent = changeEventEmitter.emit();
    if (changeEvent.defaultPrevented) {
      this.valueSetDirectly = true;
      this.component[valueProperty] = this.lastCommittedValue;
    } else {
      this.lastCommittedValue = this.component[valueProperty];
    }
  }

  private getComponentValueProperty(): string {
    return this.component.valueProperty ?? "value";
  }

  /**
   * Sets internal properties as a result of an external direct value assignment.
   * Sets the component's value to empty string when the incoming value is falsy.
   * @internal
   */
  private handleDirectValueChange(value: string): void {
    if (!value) {
      this.component[this.getComponentValueProperty()] = "";
      this.previousValue = "";
      this.lastCommittedValue = "";
    } else {
      this.previousValue = value;
      this.lastCommittedValue = value;
    }
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
    const valueProperty = this.getComponentValueProperty();
    if (value !== this.component[valueProperty]) {
      this.previousValue = this.component[valueProperty];
      this.valueSetDirectly = false;
      this.component[valueProperty] = value;
    }

    const inputEvent = inputEventEmitter.emit(value);
    if (inputEvent.defaultPrevented) {
      this.valueSetDirectly = true;
      // This check allows direct changes to the value to persist after calling inputEvent.preventDefault()
      if (value === this.component[valueProperty]) {
        this.component[valueProperty] = this.previousValue;
      }
    }
  }

  /**
   * Sets the component's value directly without triggering an input or change event.
   * This should be used when the component's value needs to be updated directly as a result of user input when the commit or input value operation has already been performed.
   *
   * @param value
   */
  setValue(value): void {
    const valueProperty = this.getComponentValueProperty();
    if (value !== this.component[valueProperty]) {
      this.previousValue = this.component[valueProperty];
      this.valueSetDirectly = false;
      this.component[valueProperty] = value;
      this.lastCommittedValue = this.component[valueProperty];
    }
  }

  //#endregion
}

export const useValue = toFunction(ValueController);
