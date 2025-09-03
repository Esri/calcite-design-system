// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import { getRoundRobinIndex } from "../../utils/array";
import { getElementDir } from "../../utils/dom";
import {
  CheckableFormComponent,
  connectForm,
  disconnectForm,
  HiddenFormInputSlot,
} from "../../utils/form";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import { InternalLabel } from "../functional/InternalLabel";
import { Scale } from "../interfaces";
import type { Label } from "../label/label";
import { useSetFocus } from "../../controllers/useSetFocus";
import { CSS } from "./resources";
import { styles } from "./radio-button.scss";

declare global {
  interface DeclareElements {
    "calcite-radio-button": RadioButton;
  }
}

export class RadioButton
  extends LitElement
  implements LabelableComponent, CheckableFormComponent, InteractiveComponent
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private containerEl: HTMLDivElement;

  defaultChecked: boolean;

  defaultValue: RadioButton["value"];

  formEl: HTMLFormElement;

  labelEl: Label["el"];

  private rootNode: HTMLElement;

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region Public Properties

  /** When present, the component is checked. */
  @property({ reflect: true }) checked = false;

  /** When present, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * The focused state of the component.
   *
   * @private
   */
  @property({ reflect: true }) focused = false;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @property({ reflect: true }) form: string;

  /**
   * The hovered state of the component.
   *
   * @private
   */
  @property({ reflect: true }) hovered = false;

  /**
   * Accessible name for the component.
   *
   * @private
   */
  @property() label?: string;

  /** When provided, displays label text on the component. */
  @property() labelText: string;

  /**
   * Specifies the name of the component. Can be inherited from `calcite-radio-button-group`.
   *
   * Required to pass the component's `value` on form submission.
   */
  @property({ reflect: true }) name: string;

  /**
   * When present and the component resides in a form,
   * the component must have a value selected from the `calcite-radio-button-group` in order for the form to submit.
   */
  @property({ reflect: true }) required = false;

  /** Specifies the size of the component inherited from the `calcite-radio-button-group`. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * The component's value.
   *
   * @required
   */
  @property() value: any;

  // #endregion

  // #region Public Methods

  /** @private */
  @method()
  async emitCheckedChange(): Promise<void> {
    this.calciteInternalRadioButtonCheckedChange.emit();
  }

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.containerEl;
    }, options);
  }

  // #endregion

  // #region Events

  /**
   * Fires when the radio button is blurred.
   *
   * @private
   */
  calciteInternalRadioButtonBlur = createEvent({ cancelable: false });

  /**
   * Fires when the checked property changes.  This is an internal event used for styling purposes only.
   * Use calciteRadioButtonChange or calciteRadioButtonGroupChange for responding to changes in the checked value for forms.
   *
   * @private
   */
  calciteInternalRadioButtonCheckedChange = createEvent({ cancelable: false });

  /**
   * Fires when the radio button is focused.
   *
   * @private
   */
  calciteInternalRadioButtonFocus = createEvent({ cancelable: false });

  /**
   * Fires only when the radio button is checked.  This behavior is identical to the native HTML input element.
   * Since this event does not fire when the radio button is unchecked, it's not recommended to attach a listener for this event
   * directly on the element, but instead either attach it to a node that contains all of the radio buttons in the group
   * or use the `calciteRadioButtonGroupChange` event if using this with `calcite-radio-button-group`.
   */
  calciteRadioButtonChange = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("pointerenter", this.pointerEnterHandler);
    this.listen("pointerleave", this.pointerLeaveHandler);
    this.listen("click", this.clickHandler);
    this.listen("keydown", this.handleKeyDown);
  }

  override connectedCallback(): void {
    this.rootNode = this.el.getRootNode() as HTMLElement;
    if (this.name) {
      this.checkLastRadioButton();
    }
    connectLabel(this);
    connectForm(this);
    this.updateTabIndexOfOtherRadioButtonsInGroup();
    super.connectedCallback();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (this.hasUpdated && changes.has("checked")) {
      this.checkedChanged(this.checked);
    }

    if (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) {
      this.updateTabIndexOfOtherRadioButtonsInGroup();
    }

    if (changes.has("name")) {
      this.checkLastRadioButton();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    if (this.focused && !this.disabled) {
      this.setFocus();
    }
  }

  override disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
    this.updateTabIndexOfOtherRadioButtonsInGroup();
  }

  // #endregion

  // #region Private Methods

  private checkedChanged(newChecked: boolean): void {
    if (newChecked) {
      this.uncheckOtherRadioButtonsInGroup();
    }

    this.calciteInternalRadioButtonCheckedChange.emit();
  }

  syncHiddenFormInput(input: HTMLInputElement): void {
    input.type = "radio";
  }

  private selectItem(items: RadioButton["el"][], selectedIndex: number): void {
    items[selectedIndex].click();
  }

  private queryButtons(): RadioButton["el"][] {
    return Array.from(
      this.rootNode.querySelectorAll<RadioButton["el"]>("calcite-radio-button:not([hidden])"),
    ).filter((radioButton) => radioButton.name === this.name);
  }

  private isFocusable(): boolean {
    const radioButtons = this.queryButtons();
    const firstFocusable = radioButtons.find((radioButton) => !radioButton.disabled);
    const checked = radioButtons.find((radioButton) => radioButton.checked);
    return firstFocusable === this.el && !checked;
  }

  private check(): void {
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
  }

  private clickHandler(): void {
    if (this.disabled) {
      return;
    }

    this.check();
  }

  onLabelClick(event: CustomEvent): void {
    if (this.disabled || this.el.hidden) {
      return;
    }

    const label = event.currentTarget as Label["el"];

    const radioButton = label.for
      ? this.rootNode.querySelector<RadioButton["el"]>(`calcite-radio-button[id="${label.for}"]`)
      : label.querySelector<RadioButton["el"]>(`calcite-radio-button[name="${this.name}"]`);

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
        .forEach((checkedRadioButton: RadioButton["el"]) => {
          checkedRadioButton.checked = false;
          checkedRadioButton.emitCheckedChange();
        });
    }
  }

  private setContainerEl(el: HTMLDivElement): void {
    this.containerEl = el;
  }

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
    const otherRadioButtons = radioButtons.filter((radioButton) => radioButton !== this.el);
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
      (radioButton) => radioButton !== this.el && !radioButton.disabled,
    );
    otherFocusableRadioButtons.forEach((radioButton) => {
      radioButton.manager?.component.requestUpdate();
    });
  }

  private getTabIndex(): number | undefined {
    if (this.disabled) {
      return undefined;
    }
    return this.checked || this.isFocusable() ? 0 : -1;
  }

  private pointerEnterHandler(): void {
    if (this.disabled) {
      return;
    }

    this.hovered = true;
  }

  private pointerLeaveHandler(): void {
    if (this.disabled) {
      return;
    }

    this.hovered = false;
  }

  private handleKeyDown(event: KeyboardEvent): void {
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
      this.rootNode.querySelectorAll<RadioButton["el"]>("calcite-radio-button:not([hidden])"),
    ).filter((radioButton) => radioButton.name === this.name);
    let currentIndex = 0;

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
          this.getNextNonDisabledIndex(radioButtons, currentIndex, "left"),
        );
        return;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        this.selectItem(
          radioButtons,
          this.getNextNonDisabledIndex(radioButtons, currentIndex, "right"),
        );
        return;
      default:
        return;
    }
  }

  private getNextNonDisabledIndex(
    radioButtons: RadioButton["el"][],
    startIndex: number,
    dir: "left" | "right",
  ): number {
    const totalButtons = radioButtons.length;
    const offset = dir === "left" ? -1 : 1;
    let selectIndex = getRoundRobinIndex(startIndex + offset, totalButtons);
    while (radioButtons[selectIndex].disabled) {
      selectIndex = getRoundRobinIndex(selectIndex + offset, totalButtons);
    }

    return selectIndex;
  }

  private onContainerBlur(): void {
    this.focused = false;
    this.calciteInternalRadioButtonBlur.emit();
  }

  private onContainerFocus(): void {
    if (!this.disabled) {
      this.focused = true;
      this.calciteInternalRadioButtonFocus.emit();
    }
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const tabIndex = this.getTabIndex();
    return (
      <InteractiveContainer disabled={this.disabled}>
        <div
          ariaChecked={this.checked}
          ariaLabel={getLabelText(this)}
          class={CSS.container}
          onBlur={this.onContainerBlur}
          onFocus={this.onContainerFocus}
          ref={this.setContainerEl}
          role="radio"
          tabIndex={tabIndex}
        >
          <div class={CSS.radio} />
          {this.labelText && <InternalLabel labelText={this.labelText} spacingInlineStart={true} />}
        </div>
        <HiddenFormInputSlot component={this} />
      </InteractiveContainer>
    );
  }

  // #endregion
}
