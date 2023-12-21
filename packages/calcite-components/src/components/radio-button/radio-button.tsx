import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
  Host,
  Listen,
  Method,
  Prop,
  VNode,
  Watch,
} from "@stencil/core";
import { getRoundRobinIndex } from "../../utils/array";
import { focusElement, getElementDir, toAriaBoolean } from "../../utils/dom";
import {
  CheckableFormComponent,
  connectForm,
  disconnectForm,
  HiddenFormInputSlot,
} from "../../utils/form";
import { guid } from "../../utils/guid";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { Scale } from "../interfaces";
import { CSS } from "./resources";

@Component({
  tag: "calcite-radio-button",
  styleUrl: "radio-button.scss",
  shadow: true,
})
export class RadioButton
  implements LabelableComponent, CheckableFormComponent, InteractiveComponent, LoadableComponent
{
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, the component is checked. */
  @Prop({ mutable: true, reflect: true }) checked = false;

  @Watch("checked")
  checkedChanged(newChecked: boolean): void {
    if (newChecked) {
      this.uncheckOtherRadioButtonsInGroup();
    }

    this.calciteInternalRadioButtonCheckedChange.emit();
  }

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  disabledChanged(): void {
    this.updateTabIndexOfOtherRadioButtonsInGroup();
  }

  /**
   * The focused state of the component.
   *
   * @internal
   */
  @Prop({ mutable: true, reflect: true }) focused = false;

  /**
   * The ID of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @Prop({ reflect: true })
  form: string;

  /** The `id` of the component. When omitted, a globally unique identifier is used. */
  @Prop({ reflect: true, mutable: true }) guid: string;

  /** When `true`, the component is not displayed and is not focusable or checkable. */
  @Prop({ reflect: true }) hidden = false;

  @Watch("hidden")
  hiddenChanged(): void {
    this.updateTabIndexOfOtherRadioButtonsInGroup();
  }

  /**
   * The hovered state of the component.
   *
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) hovered = false;

  /**
   * Accessible name for the component.
   *
   * @internal
   */
  @Prop() label?: string;

  /**
   * Specifies the name of the component. Can be inherited from `calcite-radio-button-group`.
   *
   * Required to pass the component's `value` on form submission.
   */
  @Prop({ reflect: true }) name: string;

  @Watch("name")
  nameChanged(): void {
    this.checkLastRadioButton();
  }

  /** When `true`, the component must have a value selected from the `calcite-radio-button-group` in order for the form to submit. */
  @Prop({ reflect: true }) required = false;

  /** Specifies the size of the component inherited from the `calcite-radio-button-group`. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** The component's value. */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by form module
  @Prop({ mutable: true }) value!: any;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteRadioButtonElement;

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultChecked: boolean;

  defaultValue: RadioButton["value"];

  rootNode: HTMLElement;

  containerEl: HTMLDivElement;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    if (!this.disabled) {
      focusElement(this.containerEl);
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  syncHiddenFormInput(input: HTMLInputElement): void {
    input.type = "radio";
  }

  selectItem = (items: HTMLCalciteRadioButtonElement[], selectedIndex: number): void => {
    items[selectedIndex].click();
  };

  queryButtons = (): HTMLCalciteRadioButtonElement[] => {
    return Array.from(this.rootNode.querySelectorAll("calcite-radio-button:not([hidden])")).filter(
      (radioButton: HTMLCalciteRadioButtonElement) => radioButton.name === this.name
    ) as HTMLCalciteRadioButtonElement[];
  };

  isFocusable = (): boolean => {
    const radioButtons = this.queryButtons();
    const firstFocusable = radioButtons.find((radioButton) => !radioButton.disabled);
    const checked = radioButtons.find((radioButton) => radioButton.checked);
    return firstFocusable === this.el && !checked;
  };

  check = (): void => {
    if (this.disabled) {
      return;
    }

    this.focused = true;
    this.setFocus();

    if (this.checked) {
      return;
    }

    this.uncheckAllRadioButtonsInGroup();
    this.checked = true;
    this.calciteRadioButtonChange.emit();
  };

  private clickHandler = (): void => {
    if (this.disabled) {
      return;
    }

    this.check();
  };

  onLabelClick(event: CustomEvent): void {
    if (this.disabled || this.hidden) {
      return;
    }

    const label = event.currentTarget as HTMLCalciteLabelElement;

    const radioButton = label.for
      ? this.rootNode.querySelector<HTMLCalciteRadioButtonElement>(
          `calcite-radio-button[id="${label.for}"]`
        )
      : label.querySelector<HTMLCalciteRadioButtonElement>(
          `calcite-radio-button[name="${this.name}"]`
        );

    if (!radioButton) {
      return;
    }

    radioButton.focused = true;
    this.setFocus();

    if (radioButton.checked) {
      return;
    }

    this.uncheckOtherRadioButtonsInGroup();
    radioButton.checked = true;
    this.calciteRadioButtonChange.emit();
  }

  private checkLastRadioButton(): void {
    const radioButtons = this.queryButtons();
    const checkedRadioButtons = radioButtons.filter((radioButton) => radioButton.checked);

    if (checkedRadioButtons?.length > 1) {
      const lastCheckedRadioButton = checkedRadioButtons[checkedRadioButtons.length - 1];
      checkedRadioButtons
        .filter((checkedRadioButton) => checkedRadioButton !== lastCheckedRadioButton)
        .forEach((checkedRadioButton: HTMLCalciteRadioButtonElement) => {
          checkedRadioButton.checked = false;
          checkedRadioButton.emitCheckedChange();
        });
    }
  }

  /** @internal */
  @Method()
  async emitCheckedChange(): Promise<void> {
    this.calciteInternalRadioButtonCheckedChange.emit();
  }

  private setContainerEl = (el: HTMLDivElement): void => {
    this.containerEl = el;
  };

  private uncheckAllRadioButtonsInGroup(): void {
    const radioButtons = this.queryButtons();
    radioButtons.forEach((radioButton) => {
      if (radioButton.checked) {
        radioButton.checked = false;
        radioButton.focused = false;
      }
    });
  }

  private uncheckOtherRadioButtonsInGroup(): void {
    const radioButtons = this.queryButtons();
    const otherRadioButtons = radioButtons.filter((radioButton) => radioButton.guid !== this.guid);
    otherRadioButtons.forEach((otherRadioButton) => {
      if (otherRadioButton.checked) {
        otherRadioButton.checked = false;
        otherRadioButton.focused = false;
      }
    });
  }

  private updateTabIndexOfOtherRadioButtonsInGroup(): void {
    const radioButtons = this.queryButtons();
    const otherFocusableRadioButtons = radioButtons.filter(
      (radioButton) => radioButton.guid !== this.guid && !radioButton.disabled
    );
    otherFocusableRadioButtons.forEach((radioButton) => {
      forceUpdate(radioButton);
    });
  }

  private getTabIndex(): number | undefined {
    if (this.disabled) {
      return undefined;
    }
    return this.checked || this.isFocusable() ? 0 : -1;
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the radio button is blurred.
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalRadioButtonBlur: EventEmitter<void>;

  /**
   * Fires only when the radio button is checked.  This behavior is identical to the native HTML input element.
   * Since this event does not fire when the radio button is unchecked, it's not recommended to attach a listener for this event
   * directly on the element, but instead either attach it to a node that contains all of the radio buttons in the group
   * or use the `calciteRadioButtonGroupChange` event if using this with `calcite-radio-button-group`.
   */
  @Event({ cancelable: false }) calciteRadioButtonChange: EventEmitter<void>;

  /**
   * Fires when the checked property changes.  This is an internal event used for styling purposes only.
   * Use calciteRadioButtonChange or calciteRadioButtonGroupChange for responding to changes in the checked value for forms.
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalRadioButtonCheckedChange: EventEmitter<void>;

  /**
   * Fires when the radio button is focused.
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalRadioButtonFocus: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("pointerenter")
  pointerEnterHandler(): void {
    if (this.disabled) {
      return;
    }

    this.hovered = true;
  }

  @Listen("pointerleave")
  pointerLeaveHandler(): void {
    if (this.disabled) {
      return;
    }

    this.hovered = false;
  }

  handleKeyDown = (event: KeyboardEvent): void => {
    const keys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "];
    const { key } = event;
    const { el } = this;

    if (keys.indexOf(key) === -1) {
      return;
    }

    if (key === " ") {
      this.check();
      event.preventDefault();
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

    const radioButtons = Array.from(
      this.rootNode.querySelectorAll("calcite-radio-button:not([hidden]")
    ).filter(
      (radioButton: HTMLCalciteRadioButtonElement) => radioButton.name === this.name
    ) as HTMLCalciteRadioButtonElement[];
    let currentIndex = 0;

    const radioButtonsLength = radioButtons.length;

    radioButtons.some((item, index) => {
      if (item.checked) {
        currentIndex = index;
        return true;
      }
    });

    switch (adjustedKey) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        this.selectItem(
          radioButtons,
          getRoundRobinIndex(Math.max(currentIndex - 1, -1), radioButtonsLength)
        );
        return;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        this.selectItem(radioButtons, getRoundRobinIndex(currentIndex + 1, radioButtonsLength));
        return;
      default:
        return;
    }
  };

  private onContainerBlur = (): void => {
    this.focused = false;
    this.calciteInternalRadioButtonBlur.emit();
  };

  private onContainerFocus = (): void => {
    if (!this.disabled) {
      this.focused = true;
      this.calciteInternalRadioButtonFocus.emit();
    }
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.rootNode = this.el.getRootNode() as HTMLElement;
    this.guid = this.el.id || `calcite-radio-button-${guid()}`;
    if (this.name) {
      this.checkLastRadioButton();
    }
    connectInteractive(this);
    connectLabel(this);
    connectForm(this);
    this.updateTabIndexOfOtherRadioButtonsInGroup();
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);

    if (this.focused && !this.disabled) {
      this.setFocus();
    }
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
    disconnectLabel(this);
    disconnectForm(this);
    this.updateTabIndexOfOtherRadioButtonsInGroup();
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const tabIndex = this.getTabIndex();
    return (
      <Host onClick={this.clickHandler} onKeyDown={this.handleKeyDown}>
        <InteractiveContainer disabled={this.disabled}>
          <div
            aria-checked={toAriaBoolean(this.checked)}
            aria-label={getLabelText(this)}
            class={CSS.container}
            onBlur={this.onContainerBlur}
            onFocus={this.onContainerFocus}
            role="radio"
            tabIndex={tabIndex}
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={this.setContainerEl}
          >
            <div class="radio" />
          </div>
          <HiddenFormInputSlot component={this} />
        </InteractiveContainer>
      </Host>
    );
  }
}
