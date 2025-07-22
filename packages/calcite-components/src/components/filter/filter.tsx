// @ts-strict-ignore
import { debounce } from "lodash-es";
import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import { filter } from "../../utils/filter";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { Scale } from "../interfaces";
import { DEBOUNCE } from "../../utils/resources";
import { useCancelable } from "../../controllers/useCancelable";
import { useT9n } from "../../controllers/useT9n";
import type { Input } from "../input/input";
import { useSetFocus } from "../../controllers/useSetFocus";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS } from "./resources";
import { styles } from "./filter.scss";

declare global {
  interface DeclareElements {
    "calcite-filter": Filter;
  }
}

export class Filter extends LitElement implements InteractiveComponent {
  //#region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private cancelable = useCancelable<this>()(this);

  private filterDebounced = debounce(
    (value: string, emit = false, onFilter?: () => void): void =>
      this.updateFiltered(filter(this.items ?? [], value, this.filterProps), emit, onFilter),
    DEBOUNCE.filter,
  );

  private textInput = createRef<Input["el"]>();

  private _value = "";

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** Specifies the properties to match against when filtering. This will only apply when `value` is an object. If not set, all properties will be matched. */
  @property() filterProps: string[];

  /**
   * The component's resulting items after filtering.
   *
   * @readonly
   */
  @property() filteredItems: object[] = [];

  /**
   * Defines the items to filter. The component uses the values as the starting point, and returns items
   *
   * that contain the string entered in the input, using a partial match and recursive search.
   *
   * This property is needed to conduct filtering.
   */
  @property() items: object[] = [];

  /**
   * Specifies an accessible name for the component.
   */
  @property() label: string;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** Specifies placeholder text for the input element. */
  @property() placeholder: string;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** The component's value. */
  @property()
  get value(): string {
    return this._value;
  }
  set value(value: string) {
    const oldValue = this._value;
    if (value !== oldValue) {
      this._value = value;
      this.valueHandler(value);
    }
  }

  //#endregion

  //#region Public Methods

  /**
   * Performs a filter on the component.
   *
   * This method can be useful because filtering is delayed and asynchronous.
   *
   * @param {string} value - The filter text value.
   * @returns {Promise<void>}
   */
  @method()
  async filter(value: string = this.value): Promise<void> {
    return new Promise((resolve) => {
      this.value = value;
      /** TODO: [MIGRATION] we bypass the debounced function to work around an issue with debounce using the last args passed when invoking the debounced fn, causing the promise to not resolve */
      this.updateFiltered(filter(this.items ?? [], value, this.filterProps), false, resolve);
    });
  }

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    return this.focusSetter(() => {
      return this.textInput.value;
    });
  }

  //#endregion

  //#region Events

  /** Fires when the filter text changes. */
  calciteFilterChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.cancelable.add(this.filterDebounced);
  }

  async load(): Promise<void> {
    this.updateFiltered(filter(this.items ?? [], this.value, this.filterProps));
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("items") && (this.hasUpdated || this.items?.length > 0)) ||
      changes.has("filterProps")
    ) {
      this.filterDebounced(this.value);
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  //#endregion

  //#region Private Methods

  private valueHandler(value: string): void {
    this.filterDebounced(value);
  }

  private inputHandler(event: CustomEvent): void {
    const target = event.target as Input["el"];
    this.value = target.value;
    this.filterDebounced(target.value, true);
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (event.defaultPrevented) {
      return;
    }

    if (event.key === "Escape") {
      this.clear();
      event.preventDefault();
    }

    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  private clear(): void {
    this.value = "";
    this.filterDebounced("", true);
    this.setFocus();
  }

  private updateFiltered(filtered: object[], emit = false, callback?: () => void): void {
    this.filteredItems = filtered;
    if (emit) {
      this.calciteFilterChange.emit();
    }
    callback?.();
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const { disabled, scale } = this;

    return (
      <InteractiveContainer disabled={disabled}>
        <div class={CSS.container}>
          <label>
            <calcite-input
              clearable={true}
              disabled={disabled}
              icon={ICONS.search}
              label={this.label ?? this.messages.label}
              messageOverrides={{ clear: this.messages.clear }}
              onKeyDown={this.keyDownHandler}
              oncalciteInputInput={this.inputHandler}
              placeholder={this.placeholder}
              ref={this.textInput}
              scale={scale}
              type="text"
              value={this.value}
            />
          </label>
        </div>
      </InteractiveContainer>
    );
  }

  //#endregion
}
