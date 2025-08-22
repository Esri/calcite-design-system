// @ts-strict-ignore
import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import { createRef } from "lit-html/directives/ref.js";
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
import { isActivationKey } from "../../utils/key";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import { Scale } from "../interfaces";
import type { Label } from "../label/label";
import { useSetFocus } from "../../controllers/useSetFocus";
import { CSS } from "./resources";
import { styles } from "./switch.scss";

declare global {
  interface DeclareElements {
    "calcite-switch": Switch;
  }
}

export class Switch
  extends LitElement
  implements LabelableComponent, CheckableFormComponent, InteractiveComponent
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  defaultChecked: boolean;

  defaultValue: Switch["checked"];

  formEl: HTMLFormElement;

  labelEl: Label["el"];

  private switchRef = createRef<HTMLDivElement>();

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region Public Properties

  /** When `true`, the component is checked. */
  @property({ reflect: true }) checked = false;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @property({ reflect: true }) form: string;

  /** Accessible name for the component. */
  @property() label: string;

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   */
  @property({ reflect: true }) name: string;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** The component's value. */
  @property() value: any;

  // #endregion

  // #region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.switchRef.value, options);
  }

  // #endregion

  // #region Events

  /** Fires when the `checked` value has changed. */
  calciteSwitchChange = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("click", this.clickHandler);
    this.listen("keydown", this.keyDownHandler);
  }

  override connectedCallback(): void {
    connectLabel(this);
    connectForm(this);
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  override disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
  }

  // #endregion

  // #region Private Methods

  syncHiddenFormInput(input: HTMLInputElement): void {
    input.type = "checkbox";
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (!this.disabled && isActivationKey(event.key)) {
      this.toggle();
      event.preventDefault();
    }
  }

  onLabelClick(): void {
    if (!this.disabled) {
      this.toggle();
      this.setFocus();
    }
  }

  private toggle(): void {
    this.checked = !this.checked;
    this.calciteSwitchChange.emit();
  }

  private clickHandler(): void {
    if (this.disabled) {
      return;
    }

    this.toggle();
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <InteractiveContainer disabled={this.disabled}>
        <div
          ariaChecked={this.checked}
          ariaLabel={getLabelText(this)}
          class={CSS.container}
          ref={this.switchRef}
          role="switch"
          tabIndex={0}
        >
          <div class={CSS.track}>
            <div class={CSS.handle} />
          </div>
          <HiddenFormInputSlot component={this} />
        </div>
      </InteractiveContainer>
    );
  }

  // #endregion
}
