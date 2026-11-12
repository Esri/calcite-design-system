import { createRef } from "lit/directives/ref.js";
import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import { useDirection } from "@arcgis/lumina/controllers";
import { isActivationKey } from "../../utils/key";
import { getLabelText } from "../../utils/label";
import { Scale, Status } from "../types";
import { CSS_UTILITY } from "../../utils/resources";
import type { Label } from "../label/label";
import { InternalLabel } from "../functional/InternalLabel";
import { useT9n } from "../../controllers/useT9n";
import { useFocusable } from "../../controllers/useFocusable";
import { useInteractive } from "../../controllers/useInteractive";
import { useForm } from "../../controllers/useForm";
import { type LabelableComponent, useLabel } from "../../controllers/useLabel";
import { CSS } from "./resources";
import { styles } from "./checkbox.scss";
import T9nStrings from "./assets/t9n/messages.en.json";

declare global {
  interface DeclareElements {
    "calcite-checkbox": Checkbox;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the component's height and width.
     *
     * @public
     */
    "--calcite-checkbox-size": "*";
    /**
     * Specifies the component's color.
     *
     * @public
     */
    "--calcite-checkbox-border-color": "*";
    /**
     * Specifies the component's color when hovered.
     *
     * @public
     */
    "--calcite-checkbox-border-color-hover": "*";
    /**
     * Specifies the component's color when pressed.
     *
     * @public
     */
    "--calcite-checkbox-border-color-press": "*";
    /**
     * Specifies the component's icon color.
     *
     * @public
     */
    "--calcite-checkbox-icon-color": "*";
  }
}

/** @public */
export class Checkbox extends LitElement implements LabelableComponent {
  //#region Static Members

  static formAssociated = true;

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private readonly checkedPath = "M5.5 12L2 8.689l.637-.636L5.5 10.727l8.022-7.87.637.637z";

  defaultChecked?: boolean;

  defaultValue?: Checkbox["checked"];

  private direction = useDirection();

  formSupport = useForm<this>({ inputType: "checkbox" })(this);

  private readonly indeterminatePath = "M13 8v1H3V8z";

  labelEl?: Label["el"];

  onLabelClick = (): void => {
    this.toggle();
  };

  private toggleRef = createRef<HTMLDivElement>();

  /**
   * Made into a prop for testing purposes only
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useFocusable<this>()(this);

  private interactiveContainer = useInteractive(this);

  //#endregion

  //#region Public Properties

  /**
   * @public
   * @copyDoc
   */
  @property({ reflect: true }) checked = false;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   *
   * @public
   */
  @property({ reflect: true }) disabled = false;

  /**
   * @public
   * @copyDoc
   */
  @property({ reflect: true }) form?: string;

  /**
   * The hovered state of the checkbox.
   * @internal
   */
  @property({ reflect: true }) hovered = false;

  /**
   * When `true`, the component is initially indeterminate, which is independent from its `checked` value.
   *
   * The state is visual only, and can look different across browsers.
   *
   * @public
   * @see [MDN - indeterminate](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes)
   */
  @property({ reflect: true }) indeterminate = false;

  /**
   * @public
   * @copyDoc
   */
  @property() label?: string;

  /**
   * @public
   * @copyDoc
   */
  @property() labelText?: string;

  /**
   * @public
   * @copyDoc
   */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * @public
   * @copyDoc
   */
  @property({ reflect: true }) name?: string;

  /**
   * When `true` and the component resides in a form,
   * the component must have a value in order for the form to submit.
   *
   * @public
   */
  @property({ reflect: true }) required = false;

  /**
   * Specifies the size of the component.
   *
   * @public
   */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the status of the input field, which determines message and icons.
   *
   * @public
   */
  @property({ reflect: true }) status: Status = "idle";

  /**
   * @public
   * @copyDoc
   * @see [MDN - ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
   */
  @property({ readOnly: true }) validity!: ValidityState;

  /**
   * The component's value.
   *
   * @public
   */
  @property() value: any;

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component.
   *
   * @public
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.toggleRef.value, options);
  }

  //#endregion

  //#region Events

  /**
   * Fires when the component's `checked` status changes.
   *
   * @public
   */
  calciteCheckboxChange = createEvent({ cancelable: false });

  /**
   * Fires when the component is blurred.
   * @internal
   */
  calciteInternalCheckboxBlur = createEvent<boolean>({ cancelable: false });

  /**
   * Fires when the component is focused.
   * @internal
   */
  calciteInternalCheckboxFocus = createEvent<boolean>({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    useLabel(this);
    this.listen("click", this.clickHandler);
    this.listen("keydown", this.keyDownHandler);
  }

  //#endregion

  //#region Private Methods

  private getPath(): string {
    return this.indeterminate ? this.indeterminatePath : this.checked ? this.checkedPath : "";
  }

  private toggle(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.setFocus();
      this.indeterminate = false;
      this.calciteCheckboxChange.emit();
    }
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (isActivationKey(event.key)) {
      this.toggle();
      event.preventDefault();
    }
  }

  private clickHandler(): void {
    this.toggle();
  }

  private onToggleBlur(): void {
    this.calciteInternalCheckboxBlur.emit(false);
  }

  private onToggleFocus(): void {
    this.calciteInternalCheckboxFocus.emit(true);
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const rtl = this.direction === "rtl";

    return (
      <this.interactiveContainer disabled={this.disabled}>
        <div
          ariaChecked={this.checked}
          ariaLabel={getLabelText(this)}
          ariaRequired={this.required}
          class={{
            [CSS.toggle]: true,
            [CSS_UTILITY.rtl]: rtl,
          }}
          onBlur={this.onToggleBlur}
          onFocus={this.onToggleFocus}
          ref={this.toggleRef}
          role="checkbox"
          tabIndex={this.disabled ? undefined : 0}
        >
          <svg ariaHidden="true" class={CSS.check} viewBox="0 0 16 16">
            <path d={this.getPath()} />
          </svg>
          <slot />
        </div>
        {this.labelText && (
          <InternalLabel
            bottomSpacingDisabled={true}
            labelText={this.labelText}
            required={this.required}
            spacingInlineStart={true}
            tooltipText={this.messages.required}
          />
        )}
      </this.interactiveContainer>
    );
  }

  //#endregion
}
