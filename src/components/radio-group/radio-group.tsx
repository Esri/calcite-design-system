import {
  Build,
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  VNode,
  Watch
} from "@stencil/core";

import { getElementDir } from "../../utils/dom";
import { Layout, Scale, Width } from "../interfaces";
import { connectLabel, disconnectLabel, LabelableComponent } from "../../utils/label";
import {
  afterConnectDefaultValueSet,
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot
} from "../../utils/form";
import { RadioAppearance } from "./interfaces";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import {
  setUpLoadableComponent,
  setComponentLoaded,
  LoadableComponent,
  componentLoaded
} from "../../utils/loadable";

/**
 * @slot - A slot for adding `calcite-radio-group-item`s.
 */
@Component({
  tag: "calcite-radio-group",
  styleUrl: "radio-group.scss",
  shadow: true
})
export class RadioGroup
  implements LabelableComponent, FormComponent, InteractiveComponent, LoadableComponent
{
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteRadioGroupElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the appearance style of the component. */
  @Prop({ reflect: true }) appearance: RadioAppearance = "solid";

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When `true`, the component must have a value in order for the form to submit.
   *
   * @internal
   */
  @Prop({ reflect: true }) required = false;

  /** Defines the layout of the component. */
  @Prop({ reflect: true }) layout: Layout = "horizontal";

  /**
   * Specifies the name of the component on form submission.
   */
  @Prop({ reflect: true }) name: string;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** The component's `selectedItem` value. */
  @Prop({ mutable: true }) value: string = null;

  @Watch("value")
  valueHandler(value: string): void {
    const items = this.getItems();
    items.forEach((item) => (item.checked = item.value === value));
  }

  /**
   * The component's selected item `HTMLElement`.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedItem: HTMLCalciteRadioGroupItemElement;

  @Watch("selectedItem")
  protected handleSelectedItemChange<T extends HTMLCalciteRadioGroupItemElement>(
    newItem: T,
    oldItem: T
  ): void {
    this.value = newItem?.value;
    if (newItem === oldItem) {
      return;
    }
    const items = this.getItems();
    const match = Array.from(items)
      .filter((item) => item === newItem)
      .pop();

    if (match) {
      this.selectItem(match);
    } else if (items[0]) {
      items[0].tabIndex = 0;
    }
  }

  /** Specifies the width of the component. */
  @Prop({ reflect: true }) width: Extract<"auto" | "full", Width> = "auto";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    setUpLoadableComponent(this);

    const items = this.getItems();
    const lastChecked = Array.from(items)
      .filter((item) => item.checked)
      .pop();

    if (lastChecked) {
      this.selectItem(lastChecked);
    } else if (items[0]) {
      items[0].tabIndex = 0;
    }
  }

  componentDidLoad(): void {
    afterConnectDefaultValueSet(this, this.value);
    setComponentLoaded(this);
  }

  connectedCallback(): void {
    connectLabel(this);
    connectForm(this);
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  render(): VNode {
    return (
      <Host onClick={this.handleClick} role="radiogroup">
        <slot />
        <HiddenFormInputSlot component={this} />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  protected handleClick = (event: MouseEvent): void => {
    if ((event.target as HTMLElement).localName === "calcite-radio-group-item") {
      this.selectItem(event.target as HTMLCalciteRadioGroupItemElement, true);
    }
  };

  @Listen("calciteInternalRadioGroupItemChange")
  protected handleSelected(event: Event): void {
    event.preventDefault();
    this.selectItem(event.target as HTMLCalciteRadioGroupItemElement);
    event.stopPropagation();
  }

  @Listen("keydown")
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

    const items = this.getItems();
    let selectedIndex = -1;

    items.forEach((item, index) => {
      if (item === selectedItem) {
        selectedIndex = index;
      }
    });

    switch (adjustedKey) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        const previous =
          selectedIndex < 1 ? items.item(items.length - 1) : items.item(selectedIndex - 1);
        this.selectItem(previous, true);
        return;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        const next =
          selectedIndex === -1 ? items.item(1) : items.item(selectedIndex + 1) || items.item(0);
        this.selectItem(next, true);
        return;
      case " ":
        event.preventDefault();
        this.selectItem(event.target as HTMLCalciteRadioGroupItemElement, true);
        return;
      default:
        return;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fires when the selected option changes, where the event detail is the new value. */
  @Event({ cancelable: false }) calciteRadioGroupChange: EventEmitter<string>;

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);

    (this.selectedItem || this.getItems()[0])?.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: RadioGroup["value"];

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  onLabelClick(): void {
    this.setFocus();
  }

  private getItems(): NodeListOf<HTMLCalciteRadioGroupItemElement> {
    return this.el.querySelectorAll("calcite-radio-group-item");
  }

  private selectItem(selected: HTMLCalciteRadioGroupItemElement, emit = false): void {
    if (selected === this.selectedItem) {
      return;
    }

    const items = this.getItems();
    let match: HTMLCalciteRadioGroupItemElement = null;

    items.forEach((item) => {
      const matches = item.value === selected.value;

      if ((matches && !item.checked) || (!matches && item.checked)) {
        item.checked = matches;
      }

      item.tabIndex = matches ? 0 : -1;

      if (matches) {
        match = item;

        if (emit) {
          this.calciteRadioGroupChange.emit(match.value);
        }
      }
    });

    this.selectedItem = match;
    if (Build.isBrowser && match) {
      match.focus();
    }
  }
}
