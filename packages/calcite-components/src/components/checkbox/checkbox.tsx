// @ts-strict-ignore
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import { getElementDir } from "../../utils/dom";
import {
  CheckableFormComponent,
  connectForm,
  disconnectForm,
  HiddenFormInputSlot,
  MutableValidityState,
} from "../../utils/form";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { isActivationKey } from "../../utils/key";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import { Scale, Status } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import type { Label } from "../label/label";
import { InternalLabel } from "../functional/InternalLabel";
import { useT9n } from "../../controllers/useT9n";
import { useSetFocus } from "../../controllers/useSetFocus";
import { CSS } from "./resources";
import { styles } from "./checkbox.scss";
import T9nStrings from "./assets/t9n/messages.en.json";

declare global {
  interface DeclareElements {
    "calcite-checkbox": Checkbox;
  }
}

export class Checkbox
  extends LitElement
  implements LabelableComponent, CheckableFormComponent, InteractiveComponent
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private readonly checkedPath = "M5.5 12L2 8.689l.637-.636L5.5 10.727l8.022-7.87.637.637z";

  defaultChecked: boolean;

  defaultValue: Checkbox["checked"];

  formEl: HTMLFormElement;

  private readonly indeterminatePath = "M13 8v1H3V8z";

  labelEl: Label["el"];

  onLabelClick = (): void => {
    this.toggle();
  };

  private toggleEl = createRef<HTMLDivElement>();

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

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

  /**
   * The hovered state of the checkbox.
   *
   * @private
   */
  @property({ reflect: true }) hovered = false;

  /**
   * When `true`, the component is initially indeterminate, which is independent from its `checked` value.
   *
   * The state is visual only, and can look different across browsers.
   *
   * @mdn [indeterminate](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes)
   */
  @property({ reflect: true }) indeterminate = false;

  /** Accessible name for the component. */
  @property() label: string;

  /** When provided, displays label text on the component. */
  @property() labelText: string;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

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

  /** Specifies the status of the input field, which determines message and icons. */
  @property({ reflect: true }) status: Status = "idle";

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
    return this.focusSetter(() => {
      return this.toggleEl.value;
    }, options);
  }

  // #endregion

  // #region Events

  /** Fires when the component's `checked` status changes. */
  calciteCheckboxChange = createEvent({ cancelable: false });

  /**
   * Fires when the component is blurred.
   *
   * @private
   */
  calciteInternalCheckboxBlur = createEvent<boolean>({ cancelable: false });

  /**
   * Fires when the component is focused.
   *
   * @private
   */
  calciteInternalCheckboxFocus = createEvent<boolean>({ cancelable: false });

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

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const rtl = getElementDir(this.el) === "rtl";

    return (
      <InteractiveContainer disabled={this.disabled}>
        <div
          ariaChecked={this.checked}
          ariaLabel={this.labelText || getLabelText(this)}
          ariaRequired={this.required}
          class={{
            [CSS.toggle]: true,
            [CSS_UTILITY.rtl]: rtl,
          }}
          onBlur={this.onToggleBlur}
          onFocus={this.onToggleFocus}
          ref={this.toggleEl}
          role="checkbox"
          tabIndex={this.disabled ? undefined : 0}
        >
          <svg ariaHidden="true" class={CSS.check} viewBox="0 0 16 16">
            <path d={this.getPath()} />
          </svg>
          <slot />
        </div>
        {this.labelText && (
          <div>
            <InternalLabel
              labelText={this.labelText}
              required={this.required}
              spaceInlineStart
              tooltipText={this.messages.required}
            />
          </div>
        )}
        <HiddenFormInputSlot component={this} />
      </InteractiveContainer>
    );
  }

  // #endregion
}
