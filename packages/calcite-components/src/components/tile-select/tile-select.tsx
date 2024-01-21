import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { guid } from "../../utils/guid";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { Alignment, Width } from "../interfaces";
import { TileSelectType } from "./interfaces";
import { CSS } from "./resources";

/**
 * @slot - A slot for adding custom content.
 */
@Component({
  tag: "calcite-tile-select",
  styleUrl: "tile-select.scss",
  shadow: true,
})
export class TileSelect implements InteractiveComponent, LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, the component is checked. */
  @Prop({ reflect: true, mutable: true }) checked = false;

  @Watch("checked")
  checkedChanged(newChecked: boolean): void {
    this.input.checked = newChecked;
  }

  /** A description for the component, which displays below the heading. */
  @Prop({ reflect: true }) description: string;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /** The component header text, which displays between the icon and description. */
  @Prop({ reflect: true }) heading: string;

  /** Specifies an icon to display. */
  @Prop({ reflect: true }) icon: string;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /** Specifies the name of the component on form submission. */
  @Prop({ reflect: true }) name;

  @Watch("name")
  nameChanged(newName: string): void {
    this.input.name = newName;
  }

  /** When `true`, displays an interactive input based on the `type` property. */
  @Prop({ reflect: true }) inputEnabled = false;

  /** When `inputEnabled` is `true`, specifies the placement of the interactive input on the component. */
  @Prop({ reflect: true }) inputAlignment: Extract<"end" | "start", Alignment> = "start";

  /**
   * Specifies the selection mode of the component, where:
   *
   * `"radio"` is for single selection, and
   *
   * `"checkbox"` is for multiple selections.
   */
  @Prop({ reflect: true }) type: TileSelectType = "radio";

  /** The component's value. */
  @Prop() value: any;

  /** Specifies the width of the component. */
  @Prop({ reflect: true }) width: Extract<"auto" | "full", Width> = "auto";

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTileSelectElement;

  private input: HTMLCalciteCheckboxElement | HTMLCalciteRadioButtonElement;

  guid = `calcite-tile-select-${guid()}`;

  //--------------------------------------------------------------------------
  //
  //  State
  //
  //--------------------------------------------------------------------------

  /** The focused state of the tile-select. */
  @State() focused = false;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emits a custom change event.
   *
   * For checkboxes it emits when checked or unchecked.
   *
   * For radios it only emits when checked.
   */
  @Event({ cancelable: false }) calciteTileSelectChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    return this.input?.setFocus();
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteCheckboxChange")
  checkboxChangeHandler(event: CustomEvent): void {
    const checkbox = event.target as HTMLCalciteCheckboxElement;
    if (checkbox === this.input) {
      this.checked = checkbox.checked;
    }
    event.stopPropagation();
    this.calciteTileSelectChange.emit();
  }

  @Listen("calciteInternalCheckboxFocus")
  @Listen("calciteInternalCheckboxBlur")
  checkboxFocusBlurHandler(event: CustomEvent): void {
    const checkbox = event.target as HTMLCalciteCheckboxElement;
    if (checkbox === this.input) {
      this.focused = event.detail;
    }
    event.stopPropagation();
  }

  @Listen("calciteRadioButtonChange")
  radioButtonChangeHandler(event: CustomEvent): void {
    const radioButton = event.target as HTMLCalciteRadioButtonElement;
    if (radioButton === this.input) {
      this.checked = radioButton.checked;
    }
    event.stopPropagation();
    this.calciteTileSelectChange.emit();
  }

  @Listen("calciteInternalRadioButtonCheckedChange")
  radioButtonCheckedChangeHandler(event: CustomEvent): void {
    const radioButton = event.target as HTMLCalciteRadioButtonElement;
    if (radioButton === this.input) {
      this.checked = radioButton.checked;
    }
    event.stopPropagation();
  }

  @Listen("calciteInternalRadioButtonFocus")
  @Listen("calciteInternalRadioButtonBlur")
  radioButtonFocusBlurHandler(event: CustomEvent): void {
    const radioButton = event.target as HTMLCalciteRadioButtonElement;
    if (radioButton === this.input) {
      this.focused = radioButton.focused;
    }
    event.stopPropagation();
  }

  @Listen("click")
  clickHandler(event: MouseEvent): void {
    if (this.disabled) {
      return;
    }

    const target = event.target as HTMLElement;
    const targets = ["calcite-tile", "calcite-tile-select"];
    if (targets.includes(target.localName)) {
      this.input.click();
    }
  }

  @Listen("pointerenter")
  pointerEnterHandler(): void {
    if (this.disabled) {
      return;
    }

    const { localName } = this.input;

    if (localName === "calcite-radio-button" || localName === "calcite-checkbox") {
      (this.input as HTMLCalciteRadioButtonElement | HTMLCalciteCheckboxElement).hovered = true;
    }
  }

  @Listen("pointerleave")
  pointerLeaveHandler(): void {
    if (this.disabled) {
      return;
    }

    const { localName } = this.input;

    if (localName === "calcite-radio-button" || localName === "calcite-checkbox") {
      (this.input as HTMLCalciteRadioButtonElement | HTMLCalciteCheckboxElement).hovered = false;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.renderInput();
    connectInteractive(this);
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    this.input.parentNode.removeChild(this.input);
    disconnectInteractive(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  private renderInput(): void {
    this.input = document.createElement(
      this.type === "radio" ? "calcite-radio-button" : "calcite-checkbox",
    );
    this.input.checked = this.checked;
    this.input.disabled = this.disabled;
    this.input.hidden = this.el.hidden;
    this.input.id = this.guid;
    this.input.label = this.heading || this.name || "";

    if (this.name) {
      this.input.name = this.name;
    }

    if (this.value) {
      this.input.value = this.value != null ? this.value.toString() : "";
    }

    this.el.insertAdjacentElement("beforeend", this.input);
  }

  render(): VNode {
    const {
      checked,
      description,
      disabled,
      focused,
      heading,
      icon,
      inputAlignment,
      inputEnabled,
      width,
      iconFlipRtl,
    } = this;
    const isLargeVisual = heading && icon && !description;
    const renderIcon = Boolean(icon);
    return (
      <InteractiveContainer disabled={disabled}>
        <div
          class={{
            checked,
            container: true,
            [CSS.description]: Boolean(description),
            [CSS.descriptionOnly]: Boolean(!heading && !icon && description),
            disabled,
            focused,
            [CSS.heading]: Boolean(heading),
            [CSS.headingOnly]: heading && !icon && !description,
            [CSS.icon]: renderIcon,
            [CSS.iconOnly]: !heading && icon && !description,
            [CSS.inputAlignmentEnd]: inputAlignment === "end",
            [CSS.inputAlignmentStart]: inputAlignment === "start",
            [CSS.inputEnabled]: inputEnabled,
            [CSS.largeVisual]: isLargeVisual,
            [CSS.widthAuto]: width === "auto",
            [CSS.widthFull]: width === "full",
          }}
        >
          <div class={{ [CSS.tile]: true, [CSS.tileLargeVisual]: isLargeVisual }}>
            {icon && (
              <div class={{ [CSS.icon]: renderIcon }}>
                <calcite-icon flipRtl={iconFlipRtl} icon={icon} scale="l" />
              </div>
            )}
            <div class={CSS.tileContentContainer}>
              <div class={CSS.tileContent}>
                {heading && <div class={CSS.tileHeading}>{heading}</div>}
                {description && <div class={CSS.tileDescription}>{description}</div>}
              </div>
            </div>
          </div>
          <slot />
        </div>
      </InteractiveContainer>
    );
  }
}
