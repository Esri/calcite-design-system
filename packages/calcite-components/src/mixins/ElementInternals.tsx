import { LitElement } from "@arcgis/lumina";

type Constructor<T = object> = new (...args: any[]) => T;

export const ElementInternalsMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<LitElement> => {
  class CalciteElementInternalsClass extends superClass {
    #internals: ElementInternals;
    #attachInternalsCalled = false;

    constructor(...args: any[]) {
      super(...args);
      this.#internals = super.attachInternals();
    }

    override attachInternals() {
      return this.#attachInternalsCalled
        ? super.attachInternals()
        : ((this.#attachInternalsCalled = true), this.#internals);
    }
  }
  return CalciteElementInternalsClass as T;
};

export const CalciteElementInternals = ElementInternalsMixin(LitElement);
