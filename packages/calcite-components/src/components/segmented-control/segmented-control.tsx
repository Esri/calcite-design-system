// @ts-strict-ignore
import { PropertyValues, isServer } from "lit";
import {
  LitElement,
  property,
  createEvent,
  Fragment,
  h,
  method,
  JsxNode,
  stringOrBoolean,
} from "@arcgis/lumina";
import { getElementDir, slotChangeGetAssignedElements } from "../../utils/dom";
import {
  afterConnectDefaultValueSet,
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  MutableValidityState,
} from "../../utils/form";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { connectLabel, disconnectLabel, LabelableComponent } from "../../utils/label";
import { componentFocusable } from "../../utils/component";
import { Appearance, Layout, Scale, Status, Width } from "../interfaces";
import { Validation } from "../functional/Validation";
import { IconNameOrString } from "../icon/interfaces";
import type { SegmentedControlItem } from "../segmented-control-item/segmented-control-item";
import type { Label } from "../label/label";
import { CSS, IDS } from "./resources";
import { styles } from "./segmented-control.scss";

declare global {
  interface DeclareElements {
    "calcite-segmented-control": SegmentedControl;
  }
}

/** @slot - A slot for adding `calcite-segmented-control-item`s. */
export class SegmentedControl
  extends LitElement
  implements LabelableComponent, FormComponent, InteractiveComponent
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  defaultValue: SegmentedControl["value"];

  formEl: HTMLFormElement;

  private items: SegmentedControlItem["el"][] = [];

  labelEl: Label["el"];

  // #endregion

  // #region Public Properties

  /** Specifies the appearance style of the component. */
  @property({ reflect: true }) appearance: Extract<
    "outline" | "outline-fill" | "solid",
    Appearance
  > = "solid";

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @property({ reflect: true }) form: string;

  /** Defines the layout of the component. */
  @property({ reflect: true }) layout: Extract<"horizontal" | "vertical", Layout> = "horizontal";

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   */
  @property({ reflect: true }) name: string;

  /**
   * When `true` and the component resides in a form,
   * the component must have a value in order for the form to submit.
   */
  @property({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * The component's selected item `HTMLElement`.
   *
   * @readonly
   */
  @property() selectedItem: SegmentedControlItem["el"];

  /** Specifies the status of the validation message. */
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

  /** The component's `selectedItem` value. */
  @property() value: string = null;

  /** Specifies the width of the component. [Deprecated] The `"half"` value is deprecated, use `"full"` instead. */
  @property({ reflect: true }) width: Extract<"auto" | "full", Width> = "auto";

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    (this.selectedItem || this.items[0])?.focus();
  }

  // #endregion

  // #region Events

  /** Fires when the `calcite-segmented-control-item` selection changes. */
  calciteSegmentedControlChange = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalSegmentedControlItemChange", this.handleSelected);
    this.listen("keydown", this.handleKeyDown);
    this.listen("click", this.handleClick);
  }

  override connectedCallback(): void {
    connectLabel(this);
    connectForm(this);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("appearance") && (this.hasUpdated || this.appearance !== "solid")) ||
      (changes.has("layout") && (this.hasUpdated || this.layout !== "horizontal")) ||
      (changes.has("scale") && (this.hasUpdated || this.scale !== "m"))
    ) {
      this.handleItemPropChange();
    }

    if (changes.has("value") && (this.hasUpdated || this.value !== null)) {
      this.valueHandler(this.value);
    }

    if (changes.has("selectedItem")) {
      this.handleSelectedItemChange(this.selectedItem, changes.get("selectedItem"));
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    afterConnectDefaultValueSet(this, this.value);
  }

  override disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
  }

  // #endregion

  // #region Private Methods
  private valueHandler(value: string): void {
    const { items } = this;
    items.forEach((item) => (item.checked = item.value === value));
  }

  private handleSelectedItemChange<T extends SegmentedControlItem["el"]>(
    newItem: T,
    oldItem?: T,
  ): void {
    this.value = newItem?.value;
    if (newItem === oldItem) {
      return;
    }
    const { items } = this;
    const match = items.filter((item) => item === newItem).pop();

    if (match) {
      this.selectItem(match);
    } else if (items[0]) {
      items[0].tabIndex = 0;
    }
  }

  private handleClick(event: MouseEvent): void {
    if (this.disabled) {
      return;
    }

    if ((event.target as HTMLElement).localName === "calcite-segmented-control-item") {
      this.selectItem(event.target as SegmentedControlItem["el"], true);
    }
  }

  private handleSelected(event: CustomEvent<void>): void {
    event.preventDefault();
    const el = event.target as SegmentedControlItem["el"];
    if (el.checked) {
      this.selectItem(el);
    }
    event.stopPropagation();
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    const keys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "];
    const { key } = event;
    const { el, selectedItem } = this;

    if (keys.indexOf(key) === -1) {
      return;
    }

    let adjustedKey = key;

    if (getElementDir(el) === "rtl") {
      if (key === "ArrowRight") {
        adjustedKey = "ArrowLeft";
      }
      if (key === "ArrowLeft") {
        adjustedKey = "ArrowRight";
      }
    }

    const { items } = this;
    let selectedIndex = -1;

    items.forEach((item, index) => {
      if (item === selectedItem) {
        selectedIndex = index;
      }
    });

    switch (adjustedKey) {
      case "ArrowLeft":
      case "ArrowUp": {
        event.preventDefault();
        const previous = selectedIndex < 1 ? items[items.length - 1] : items[selectedIndex - 1];
        this.selectItem(previous, true);
        return;
      }
      case "ArrowRight":
      case "ArrowDown": {
        event.preventDefault();
        const next = selectedIndex === -1 ? items[1] : items[selectedIndex + 1] || items[0];
        this.selectItem(next, true);
        return;
      }
      case " ":
        event.preventDefault();
        this.selectItem(event.target as SegmentedControlItem["el"], true);
        return;
      default:
        return;
    }
  }

  private handleItemPropChange(): void {
    const { items } = this;

    items.forEach((item) => {
      item.appearance = this.appearance;
      item.layout = this.layout;
      item.scale = this.scale;
    });
  }

  private handleSelectedItem(): void {
    const { items } = this;

    const lastChecked = items.filter((item) => item.checked).pop();

    if (lastChecked) {
      this.selectItem(lastChecked);
    } else if (items[0]) {
      items[0].tabIndex = 0;
    }
  }

  private async handleDefaultSlotChange(event: Event): Promise<void> {
    const items = slotChangeGetAssignedElements(event).filter(
      (el): el is SegmentedControlItem["el"] => el.matches("calcite-segmented-control-item"),
    );

    await Promise.all(items.map((item) => item.componentOnReady()));
    this.items = items;
    this.handleSelectedItem();
    this.handleItemPropChange();
  }

  onLabelClick(): void {
    this.setFocus();
  }

  private async selectItem(selected: SegmentedControlItem["el"], emit = false): Promise<void> {
    if (selected === this.selectedItem) {
      return;
    }

    const { items } = this;
    let match: SegmentedControlItem["el"] = null;

    items.forEach((item) => {
      const matches = item === selected;

      if ((matches && !item.checked) || (!matches && item.checked)) {
        item.checked = matches;
      }

      item.tabIndex = matches ? 0 : -1;

      if (matches) {
        match = item;
      }
    });

    this.selectedItem = match;

    if (match && emit) {
      await this.updateComplete;
      this.calciteSegmentedControlChange.emit();
    }

    if (!isServer && match) {
      match.focus();
    }
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "radiogroup";
    return (
      <>
        <div
          aria-errormessage={IDS.validationMessage}
          ariaInvalid={this.status === "invalid"}
          class={CSS.itemWrapper}
        >
          <InteractiveContainer disabled={this.disabled}>
            <slot onSlotChange={this.handleDefaultSlotChange} />
            <HiddenFormInputSlot component={this} />
          </InteractiveContainer>
        </div>
        {this.validationMessage && this.status === "invalid" ? (
          <Validation
            icon={this.validationIcon}
            id={IDS.validationMessage}
            message={this.validationMessage}
            scale={this.scale}
            status={this.status}
          />
        ) : null}
      </>
    );
  }

  // #endregion
}
