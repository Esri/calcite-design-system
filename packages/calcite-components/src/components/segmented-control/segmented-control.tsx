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
  Watch,
} from "@stencil/core";

import { getElementDir } from "../../utils/dom";
import {
  afterConnectDefaultValueSet,
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
} from "../../utils/form";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { connectLabel, disconnectLabel, LabelableComponent } from "../../utils/label";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { Appearance, Layout, Scale, Status, Width } from "../interfaces";
import { createObserver } from "../../utils/observers";
import { Validation } from "../functional/Validation";
import { CSS } from "./resources";

/**
 * @slot - A slot for adding `calcite-segmented-control-item`s.
 */
@Component({
  tag: "calcite-segmented-control",
  styleUrl: "segmented-control.scss",
  shadow: true,
})
export class SegmentedControl
  implements LabelableComponent, FormComponent, InteractiveComponent, LoadableComponent
{
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the appearance style of the component. */
  @Prop({ reflect: true }) appearance: Extract<"outline" | "outline-fill" | "solid", Appearance> =
    "solid";

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @Prop({ reflect: true }) form: string;

  /** When `true`, the component must have a value in order for the form to submit. */
  @Prop({ reflect: true }) required = false;

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   */
  @Prop({ reflect: true }) name: string;

  /** Defines the layout of the component. */
  @Prop({ reflect: true }) layout: Extract<"horizontal" | "vertical", Layout> = "horizontal";

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  @Watch("appearance")
  @Watch("layout")
  @Watch("scale")
  handlePropsChange(): void {
    this.handleItemPropChange();
  }

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
  @Prop({ mutable: true }) selectedItem: HTMLCalciteSegmentedControlItemElement;

  @Watch("selectedItem")
  protected handleSelectedItemChange<T extends HTMLCalciteSegmentedControlItemElement>(
    newItem: T,
    oldItem: T,
  ): void {
    this.value = newItem?.value;
    if (newItem === oldItem) {
      return;
    }
    const items = this.getItems();
    const match = items.filter((item) => item === newItem).pop();

    if (match) {
      this.selectItem(match);
    } else if (items[0]) {
      items[0].tabIndex = 0;
    }
  }

  /** Specifies the status of the validation message. */
  @Prop({ reflect: true }) status: Status = "idle";

  /** Specifies the validation message to display under the component. */
  @Prop() validationMessage: string;

  /** Specifies the validation icon to display under the component. */
  @Prop({ reflect: true }) validationIcon: string | boolean;

  /** Specifies the width of the component. */
  @Prop({ reflect: true }) width: Extract<"auto" | "full", Width> = "auto";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    setUpLoadableComponent(this);
    this.setUpItems();
  }

  componentDidLoad(): void {
    afterConnectDefaultValueSet(this, this.value);
    setComponentLoaded(this);
  }

  connectedCallback(): void {
    connectLabel(this);
    connectForm(this);
    this.mutationObserver?.observe(this.el, { childList: true });

    this.handleItemPropChange();
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
    this.mutationObserver?.unobserve(this.el);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  render(): VNode {
    return (
      <Host onClick={this.handleClick} role="radiogroup">
        <div class={CSS.itemWrapper}>
          <InteractiveContainer disabled={this.disabled}>
            <slot />
            <HiddenFormInputSlot component={this} />
          </InteractiveContainer>
        </div>
        {this.validationMessage ? (
          <Validation
            icon={this.validationIcon}
            message={this.validationMessage}
            scale={this.scale}
            status={this.status}
          />
        ) : null}
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  protected handleClick = (event: MouseEvent): void => {
    if (this.disabled) {
      return;
    }

    if ((event.target as HTMLElement).localName === "calcite-segmented-control-item") {
      this.selectItem(event.target as HTMLCalciteSegmentedControlItemElement, true);
    }
  };

  @Listen("calciteInternalSegmentedControlItemChange")
  protected handleSelected(event: Event): void {
    event.preventDefault();
    this.selectItem(event.target as HTMLCalciteSegmentedControlItemElement);
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
        const previous = selectedIndex < 1 ? items[items.length - 1] : items[selectedIndex - 1];
        this.selectItem(previous, true);
        return;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        const next = selectedIndex === -1 ? items[1] : items[selectedIndex + 1] || items[0];
        this.selectItem(next, true);
        return;
      case " ":
        event.preventDefault();
        this.selectItem(event.target as HTMLCalciteSegmentedControlItemElement, true);
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

  /** Fires when the `calcite-segmented-control-item` selection changes. */
  @Event({ cancelable: false }) calciteSegmentedControlChange: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    (this.selectedItem || this.getItems()[0])?.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteSegmentedControlElement;

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: SegmentedControl["value"];

  private mutationObserver = createObserver("mutation", () => this.setUpItems());

  private handleItemPropChange(): void {
    const items = this.getItems();

    items.forEach((item) => {
      item.appearance = this.appearance;
      item.layout = this.layout;
      item.scale = this.scale;
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  onLabelClick(): void {
    this.setFocus();
  }

  private getItems(): HTMLCalciteSegmentedControlItemElement[] {
    return Array.from(this.el.querySelectorAll("calcite-segmented-control-item"));
  }

  private selectItem(selected: HTMLCalciteSegmentedControlItemElement, emit = false): void {
    if (selected === this.selectedItem) {
      return;
    }

    const items = this.getItems();
    let match: HTMLCalciteSegmentedControlItemElement = null;

    items.forEach((item) => {
      const matches = item === selected;

      if ((matches && !item.checked) || (!matches && item.checked)) {
        item.checked = matches;
      }

      item.tabIndex = matches ? 0 : -1;

      if (matches) {
        match = item;

        if (emit) {
          this.calciteSegmentedControlChange.emit();
        }
      }
    });

    this.selectedItem = match;
    if (Build.isBrowser && match) {
      match.focus();
    }
  }

  private setUpItems(): void {
    const items = this.getItems();
    const lastChecked = items.filter((item) => item.checked).pop();

    if (lastChecked) {
      this.selectItem(lastChecked);
    } else if (items[0]) {
      items[0].tabIndex = 0;
    }
  }
}
