// @ts-strict-ignore
import { PropertyValues } from "lit";
import {
  createEvent,
  h,
  JsxNode,
  LitElement,
  method,
  property,
  stringOrBoolean,
} from "@arcgis/lumina";
import { connectLabel, disconnectLabel, LabelableComponent } from "../../utils/label";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { Scale, Status } from "../interfaces";
import { OverlayPositioning } from "../../utils/floating-ui";
import { componentFocusable } from "../../utils/component";
import {
  afterConnectDefaultValueSet,
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  MutableValidityState,
} from "../../utils/form";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { Combobox } from "../combobox/combobox";
import type { Label } from "../label/label";
import { CSS } from "./resources";
import {
  createTimeZoneItems,
  findTimeZoneItemByProp,
  getNormalizer,
  getSelectedRegionTimeZoneLabel,
  getUserTimeZoneName,
  getUserTimeZoneOffset,
} from "./utils";
import T9nStrings from "./assets/t9n/messages.en.json";
import { OffsetStyle, TimeZone, TimeZoneItem, TimeZoneItemGroup, TimeZoneMode } from "./interfaces";
import { styles } from "./input-time-zone.scss";

declare global {
  interface DeclareElements {
    "calcite-input-time-zone": InputTimeZone;
  }
}

export class InputTimeZone
  extends LitElement
  implements FormComponent, InteractiveComponent, LabelableComponent
{
  //#region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private comboboxEl: Combobox["el"];

  defaultValue: InputTimeZone["value"];

  formEl: HTMLFormElement;

  labelEl: Label["el"];

  private normalizer: (timeZone: TimeZone) => TimeZone;

  private selectedTimeZoneItem: TimeZoneItem;

  private timeZoneItems: TimeZoneItem[] | TimeZoneItemGroup[];

  private _value: string;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>({ blocking: true });

  //#endregion

  //#region Public Properties

  /**
   * When `true`, an empty value (`null`) will be allowed as a `value`.
   *
   * When `false`, an offset or name value is enforced, and clearing the input or blurring will restore the last valid `value`.
   */
  @property({ reflect: true }) clearable = false;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @property({ reflect: true }) form: string;

  /** Specifies the component's maximum number of options to display before displaying a scrollbar. */
  @property({ reflect: true }) maxItems = 0;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * This specifies the type of `value` and the associated options presented to the user:
   *
   * Using `"offset"` will provide options that show timezone offsets.
   *
   * Using `"name"` will provide options that show the IANA time zone names.
   *
   * @default "offset"
   */
  @property({ reflect: true }) mode: TimeZoneMode = "offset";

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   */
  @property({ reflect: true }) name: string;

  /**
   * Specifies how the offset will be displayed, where
   *
   * `"user"` uses `UTC` or `GMT` depending on the user's locale,
   * `"gmt"` always uses `GMT`, and
   * `"utc"` always uses `UTC`.
   *
   * This only applies to the `offset` mode.
   *
   * @default "user"
   */
  @property({ reflect: true }) offsetStyle: OffsetStyle = "user";

  /** When `true`, displays and positions the component. */
  @property({ reflect: true }) open = false;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** When `true`, the component's value can be read, but controls are not accessible and the value cannot be modified. */
  @property({ reflect: true }) readOnly = false;

  /**
   * This `date` will be used as a reference to Daylight Savings Time when creating time zone item groups.
   *
   * It can be either a Date instance or a string in ISO format (`"YYYY-MM-DD"`, `"YYYY-MM-DDTHH:MM:SS.SSSZ"`).
   *
   * @see [Date.prototype.toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).
   */
  @property() referenceDate: Date | string;

  /**
   * When `true` and the component resides in a form,
   * the component must have a value in order for the form to submit.
   *
   * @private
   */
  @property({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @property({ reflect: true }) status: Status = "idle";

  /** Specifies the validation icon to display under the component. */
  @property({ reflect: true, converter: stringOrBoolean }) validationIcon:
    | IconNameOrString
    | boolean;

  /** Specifies the validation message to display under the component. */
  @property() validationMessage: string;

  /**
   * The current validation state of the component.
   *
   * @readonly
   * @mdn [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
   */
  @property() validity: MutableValidityState = {
    valid: false,
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valueMissing: false,
  };

  /**
   * The component's value, where the value is the time zone offset or the difference, in minutes, between the selected time zone and UTC.
   *
   * If no value is provided, the user's time zone offset will be selected by default.
   *
   * @see [Identifying time zones and zone offsets](https://www.w3.org/International/core/2005/09/timezone.html#:~:text=What%20is%20a%20%22zone%20offset,or%20%22%2D%22%20from%20UTC).
   */
  @property()
  get value(): string {
    return this._value;
  }
  set value(value: string) {
    this._value = value;
  }

  //#endregion

  //#region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    await this.comboboxEl.setFocus();
  }

  //#endregion

  //#region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteInputTimeZoneBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteInputTimeZoneBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component's `value` changes. */
  calciteInputTimeZoneChange = createEvent({ cancelable: false });

  /** Fires after the component is closed and animation is complete. */
  calciteInputTimeZoneClose = createEvent({ cancelable: false });

  /** Fires after the component is opened and animation is complete. */
  calciteInputTimeZoneOpen = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    connectForm(this);
    connectLabel(this);
  }

  async load(): Promise<void> {
    this.normalizer = await getNormalizer(this.mode);
    await this.updateTimeZoneItems();
    const initialValue = this.value;
    const normalized = this.normalizeValue(initialValue);
    this.value = normalized || (initialValue === "" ? normalized : undefined);
    this.updateTimeZoneSelection();

    const selectedValue = this.selectedTimeZoneItem ? `${this.selectedTimeZoneItem.value}` : "";
    afterConnectDefaultValueSet(this, selectedValue);
    this.value = selectedValue;
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("value") && this.hasUpdated) {
      this.handleValueChange(this.value, changes.get("value"));
    }

    if (
      changes.has("messages") ||
      (changes.has("mode") && (this.hasUpdated || this.mode !== "offset")) ||
      changes.has("referenceDate")
    ) {
      this.handleTimeZoneItemPropsChange();
    }

    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      this.openChanged();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    this.overrideSelectedLabelForRegion(this.open);
    this.openChanged();
  }

  override disconnectedCallback(): void {
    disconnectForm(this);
    disconnectLabel(this);
  }

  //#endregion

  //#region Private Methods

  private async handleTimeZoneItemPropsChange(): Promise<void> {
    if (!this.timeZoneItems || !this.hasUpdated) {
      return;
    }

    await this.updateTimeZoneItems();
    this.updateTimeZoneSelection();
  }

  private openChanged(): void {
    // we set the property instead of the attribute to ensure open/close events are emitted properly
    if (this.comboboxEl) {
      this.comboboxEl.open = this.open;
    }
  }

  private async handleValueChange(value: string, oldValue: string): Promise<void> {
    const normalized = this.normalizeValue(value);

    if (!normalized) {
      if (this.clearable) {
        this._value = normalized;
        this.selectedTimeZoneItem = null;
        return;
      }

      this._value = oldValue;
      this.selectedTimeZoneItem = this.findTimeZoneItem(oldValue);
      return;
    }

    const timeZoneItem = this.findTimeZoneItem(normalized);

    if (!timeZoneItem) {
      this._value = oldValue;
      return;
    }

    this._value = normalized;
    this.selectedTimeZoneItem = timeZoneItem;

    if (normalized !== value) {
      await this.updateComplete;
      this.overrideSelectedLabelForRegion(this.open);
    }
  }

  onLabelClick(): void {
    this.setFocus();
  }

  private setComboboxRef(el: Combobox["el"]): void {
    this.comboboxEl = el;
  }

  /**
   * Helps override the selected item's label for region mode outside of item rendering logic to avoid flickering text change
   *
   * @param open
   * @private
   */
  private overrideSelectedLabelForRegion(open: boolean): void {
    if (this.mode !== "region" || !this.selectedTimeZoneItem) {
      return;
    }

    const { label, metadata } = this.selectedTimeZoneItem;

    this.comboboxEl.selectedItems[0].textLabel =
      !metadata.country || open
        ? label
        : getSelectedRegionTimeZoneLabel(label, metadata.country, this.messages);
  }

  private onComboboxBeforeClose(event: CustomEvent): void {
    event.stopPropagation();
    this.overrideSelectedLabelForRegion(false);
    this.calciteInputTimeZoneBeforeClose.emit();
  }

  private onComboboxBeforeOpen(event: CustomEvent): void {
    event.stopPropagation();
    this.overrideSelectedLabelForRegion(true);
    this.calciteInputTimeZoneBeforeOpen.emit();
  }

  private onComboboxChange(event: CustomEvent): void {
    event.stopPropagation();
    const combobox = event.target as Combobox["el"];
    const selectedItem = combobox.selectedItems[0];

    if (!selectedItem) {
      this._value = "";
      this.selectedTimeZoneItem = null;
      this.calciteInputTimeZoneChange.emit();
      return;
    }

    const selected = this.findTimeZoneItemByLabel(selectedItem.getAttribute("data-label"));
    const selectedValue = `${selected.value}`;

    if (this.value === selectedValue && selected.label === this.selectedTimeZoneItem.label) {
      return;
    }

    this._value = selectedValue;
    this.selectedTimeZoneItem = selected;
    this.calciteInputTimeZoneChange.emit();
  }

  private onComboboxClose(event: CustomEvent): void {
    event.stopPropagation();
    this.open = false;
    this.calciteInputTimeZoneClose.emit();
  }

  private onComboboxOpen(event: CustomEvent): void {
    this.open = true;
    event.stopPropagation();
    this.calciteInputTimeZoneOpen.emit();
  }

  private findTimeZoneItem(value: number | string | null): TimeZoneItem | null {
    return findTimeZoneItemByProp(this.timeZoneItems, "value", value);
  }

  private findTimeZoneItemByLabel(label: string | null): TimeZoneItem | null {
    return findTimeZoneItemByProp(this.timeZoneItems, "label", label);
  }

  private async updateTimeZoneItems(): Promise<void> {
    this.timeZoneItems = await this.createTimeZoneItems();
  }

  private updateTimeZoneSelection(): void {
    if (this.value === "" && this.clearable) {
      this.selectedTimeZoneItem = null;
      return;
    }

    const fallbackValue = this.mode === "offset" ? getUserTimeZoneOffset() : getUserTimeZoneName();
    const valueToMatch = this.value === "" || !this.value ? fallbackValue : this.value;

    this.selectedTimeZoneItem =
      this.findTimeZoneItem(valueToMatch) || this.findTimeZoneItem(fallbackValue);
  }

  private async createTimeZoneItems(): Promise<TimeZoneItem[] | TimeZoneItemGroup[]> {
    if (!this.messages._lang || !this.messages) {
      return [];
    }

    return createTimeZoneItems(
      this.messages._lang,
      this.messages,
      this.mode,
      this.referenceDate instanceof Date
        ? this.referenceDate
        : new Date(this.referenceDate ?? Date.now()),
      this.offsetStyle,
    );
  }

  private normalizeValue(value: string | null): string {
    value = value === undefined ? "" : value;

    return value ? this.normalizer(value) : value;
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
      <InteractiveContainer disabled={this.disabled}>
        <calcite-combobox
          clearDisabled={!this.clearable}
          disabled={this.disabled}
          label={this.messages.chooseTimeZone}
          lang={this.messages._lang}
          maxItems={this.maxItems}
          oncalciteComboboxBeforeClose={this.onComboboxBeforeClose}
          oncalciteComboboxBeforeOpen={this.onComboboxBeforeOpen}
          oncalciteComboboxChange={this.onComboboxChange}
          oncalciteComboboxClose={this.onComboboxClose}
          oncalciteComboboxOpen={this.onComboboxOpen}
          overlayPositioning={this.overlayPositioning}
          placeholder={
            this.mode === "name"
              ? this.messages.namePlaceholder
              : this.mode === "offset"
                ? this.messages.offsetPlaceholder
                : this.messages.regionPlaceholder
          }
          placeholderIcon="search"
          readOnly={this.readOnly}
          ref={this.setComboboxRef}
          scale={this.scale}
          selectionMode={this.clearable ? "single" : "single-persist"}
          status={this.status}
          validationIcon={this.validationIcon}
          validationMessage={this.validationMessage}
        >
          {this.renderItems()}
        </calcite-combobox>
        <HiddenFormInputSlot component={this} />
      </InteractiveContainer>
    );
  }

  private renderItems(): JsxNode {
    if (this.mode === "region") {
      return this.renderRegionItems();
    }

    return this.timeZoneItems.map((group) => {
      const selected = this.selectedTimeZoneItem === group;
      const { label, metadata, value } = group;

      return (
        <calcite-combobox-item
          data-label={label}
          key={label}
          metadata={metadata}
          selected={selected}
          textLabel={label}
          value={value}
        />
      );
    });
  }

  private renderRegionItems(): JsxNode {
    return (this.timeZoneItems as TimeZoneItemGroup[]).flatMap(({ label, items }) => (
      <calcite-combobox-item-group key={label} label={label}>
        {items.map((item) => {
          const selected = this.selectedTimeZoneItem === item;
          const { label, metadata, value } = item;
          const textLabel =
            !this.open && metadata.country && selected
              ? getSelectedRegionTimeZoneLabel(label, metadata.country, this.messages)
              : label;
          return (
            <calcite-combobox-item
              data-label={label}
              description={metadata.country}
              key={label}
              metadata={metadata}
              selected={selected}
              textLabel={textLabel}
              value={value}
            >
              <span class={CSS.offset} slot="content-end">
                {metadata.offset}
              </span>
            </calcite-combobox-item>
          );
        })}
      </calcite-combobox-item-group>
    ));
  }

  //#endregion
}
