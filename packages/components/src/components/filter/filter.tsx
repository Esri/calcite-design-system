import { debounce } from "es-toolkit";
import { PropertyValues } from "lit";
import { createRef } from "lit/directives/ref.js";
import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import { getFilteredIndexes } from "../../utils/filter";
import {
  DEFAULT_FILTER_WORKER_MIN_ITEMS,
  filterInWorker,
  shouldFilterInWorker,
} from "../../utils/filter-worker";
import { Scale } from "../interfaces";
import { DEBOUNCE } from "../../utils/resources";
import { useCancelable } from "../../controllers/useCancelable";
import { useT9n } from "../../controllers/useT9n";
import type { Input } from "../input/input";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useInteractive } from "../../controllers/useInteractive";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS } from "./resources";
import { styles } from "./filter.scss";

declare global {
  interface DeclareElements {
    "calcite-filter": Filter;
  }
}

export class Filter extends LitElement {
  //#region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private cancelable = useCancelable<this>()(this);

  private filterRequestId = 0;

  private _filtering = false;

  private filterDebounced = debounce((value: string, emit = false, onFilter?: () => void): void => {
    this.filterItems(value, emit, onFilter);
  }, DEBOUNCE.filter);

  private textInputRef = createRef<Input["el"]>();

  private _value = "";

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  private interactiveContainer = useInteractive(this);

  //#endregion

  //#region Public Properties

  /** When `true`, prevents interaction and decreases the component's opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `value` is an object, specifies the properties to match against when filtering. If not set, all properties will be matched. */
  @property() filterProps?: string[];

  /**
   * The component's resulting items after filtering.
   *
   * @readonly
   */
  @property() filteredItems: object[] = [];

  /**
   * Specifies the items to filter. The component uses the values as the starting point, and returns items
   *
   * that contain the string entered in the input, using a partial match and recursive search.
   *
   * This property is needed to conduct filtering.
   */
  @property() items: object[] = [];

  /** Whether filtering is currently in progress. */
  @property({ attribute: false })
  get filtering(): boolean {
    return this._filtering;
  }

  /** @copyDoc */
  @property() label?: string;

  /** @copyDoc */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** Specifies the component's input placeholder text. */
  @property() placeholder?: string;

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
   * @param value - The filter text value.
   */
  @method()
  async filter(value: string = this.value): Promise<void> {
    return new Promise((resolve) => {
      const oldValue = this._value;

      if (value !== oldValue) {
        this.cancelable.cancelResource(this.filterDebounced);
        this._value = value;
        this.requestUpdate("value", oldValue);
      }

      /** We intentionally avoid the value setter to prevent scheduling an extra debounced filter pass. */
      this.filterItems(value, false, resolve);
    });
  }

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.textInputRef.value, options);
  }

  //#endregion

  //#region Events

  /** Fires when the filter text changes. */
  calciteFilterChange = createEvent({ cancelable: false });

  /**
   * Fires when filtering starts and completes.
   *
   * Use the `filtering` property to determine the current filtering state.
   */
  calciteFilterStatusChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.cancelable.add(this.filterDebounced);
  }

  async load(): Promise<void> {
    this.filterItems(this.value);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("items") && (this.hasUpdated || this.items?.length > 0)) ||
      changes.has("filterProps")
    ) {
      this.filterDebounced(this.value);
    }
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
      if (this.value.length > 0) {
        this.clear();
        event.preventDefault();
      }
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

  private setFiltering(filtering: boolean): void {
    if (this._filtering === filtering) {
      return;
    }

    const oldFiltering = this._filtering;
    this._filtering = filtering;
    this.requestUpdate("filtering", oldFiltering);

    if (this.el.isConnected) {
      this.calciteFilterStatusChange.emit();
    }
  }

  private filterItems(value: string, emit = false, callback?: () => void): void {
    const items = this.items ?? [];
    const requestId = ++this.filterRequestId;

    if (value === "") {
      this.setFiltering(false);
      this.updateFiltered(items, emit, callback);
      return;
    }

    if (!shouldFilterInWorker(items, DEFAULT_FILTER_WORKER_MIN_ITEMS)) {
      this.setFiltering(false);
      const resultIndexes = getFilteredIndexes(items, value, this.filterProps);
      const filtered = resultIndexes.map((index) => items[index]).filter((item) => item != null);

      this.updateFiltered(filtered, emit, callback);
      return;
    }

    void this.updateFilteredFromWorker(requestId, items, value, emit, callback);
  }

  private async updateFilteredFromWorker(
    requestId: number,
    items: object[],
    value: string,
    emit = false,
    callback?: () => void,
  ): Promise<void> {
    const filteredIndexesPromise = filterInWorker(items, value, this.filterProps);
    let settledBeforeAwait = false;

    void filteredIndexesPromise.then(() => {
      settledBeforeAwait = true;
    });

    await Promise.resolve();

    if (!settledBeforeAwait) {
      this.setFiltering(true);
    }

    const filteredIndexes = await filteredIndexesPromise;

    if (requestId !== this.filterRequestId) {
      callback?.();
      return;
    }

    const resultIndexes = filteredIndexes ?? getFilteredIndexes(items, value, this.filterProps);

    const filtered = resultIndexes.map((index) => items[index]).filter((item) => item != null);

    this.setFiltering(false);
    this.updateFiltered(filtered, emit, callback);
  }

  private updateFiltered(filtered: object[], emit = false, callback?: () => void): void {
    this.filteredItems = filtered;
    if (emit && this.el.isConnected) {
      this.calciteFilterChange.emit();
    }
    callback?.();
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const { disabled, scale } = this;

    return (
      <this.interactiveContainer disabled={disabled}>
        <div class={CSS.container}>
          <label>
            <calcite-input
              clearable={true}
              disabled={disabled}
              icon={ICONS.search}
              label={this.label ?? this.messages.label}
              messageOverrides={{ clear: this.messages.clear }}
              oncalciteInputInput={this.inputHandler}
              onKeyDown={this.keyDownHandler}
              placeholder={this.placeholder}
              ref={this.textInputRef}
              scale={scale}
              type="text"
              value={this.value}
            />
          </label>
        </div>
      </this.interactiveContainer>
    );
  }

  //#endregion
}
