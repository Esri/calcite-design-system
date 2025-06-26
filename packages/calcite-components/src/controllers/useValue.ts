import { createEvent } from "@arcgis/lumina";
import { GenericController, toFunction } from "@arcgis/lumina/controllers";
import type { PropertyValues } from "lit";

interface UseValue {
  /**
   * Change event that fires when the value is committed on Enter keypress or blur
   */
  calciteValueChange: CustomEvent<string>;
  /**
   * Whether the user committed the most recent value change.
   */
  userChangedValue: boolean;
}

interface UseValueComponent {
  /**
   * The component's public value property.
   */
  value: string;
}

/**
 * A controller for managing form component values
 */
class ValueController extends GenericController<UseValue, UseValueComponent> {
  //#region Private Properties

  previousEmittedValue: string = this.component.value;

  value: string = this.component.value;

  //#endregion

  //#region Events

  calciteValueChange = createEvent<string>();

  //#endregion

  //#region Component Lifecycle

  hostUpdate(changes: PropertyValues): void {
    if (changes.has("value")) {
      console.log("value changed!", this.component.value, changes.get("value"));
    }
  }

  //#endregion
}

export const useValue = toFunction(ValueController);
