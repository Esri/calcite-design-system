import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  VNode,
} from "@stencil/core";
import { getElementDir, toAriaBoolean } from "../../utils/dom";
import {
  CheckableFormComponent,
  connectForm,
  disconnectForm,
  HiddenFormInputSlot,
  MutableValidityState,
} from "../../utils/form";
import { guid } from "../../utils/guid";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { isActivationKey } from "../../utils/key";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { Scale, Status } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import { CSS } from "./resources";

@Component({
  tag: "calcite-checkbox",
  styleUrl: "checkbox.scss",
  shadow: true,
})
export class Checkbox
  implements LabelableComponent, CheckableFormComponent, InteractiveComponent, LoadableComponent
{
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, the component is checked. */
  @Prop({ reflect: true, mutable: true }) checked = false;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @Prop({ reflect: true }) form: string;

  /**
   * The `id` attribute of the component. When omitted, a globally unique identifier is used.
   *
   * @deprecated No longer necessary.
   */
  @Prop({ reflect: true, mutable: true }) guid: string;

  /**
   * The hovered state of the checkbox.
   *
   * @internal
   */
  @Prop({ reflect: true }) hovered = false;

  /**
   * When `true`, the component is initially indeterminate, which is independent from its `checked` value.
   *
   * The state is visual only, and can look different across browsers.
   *
   * @mdn [indeterminate](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes)
   */
  @Prop({ reflect: true, mutable: true }) indeterminate = false;

  /** Accessible name for the component. */
  @Prop() label: string;

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   */
  @Prop({ reflect: true }) name: string;

  /** When `true`, the component must have a value in order for the form to submit. */
  @Prop({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @Prop({ reflect: true }) status: Status = "idle";

  /**
   * The current validation state of the component.
   *
   * @readonly
   * @mdn [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated in form util when syncing hidden input
  @Prop({ mutable: true }) validity: MutableValidityState = {
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
  @Prop() value: any;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteCheckboxElement;

  readonly checkedPath = "M5.5 12L2 8.689l.637-.636L5.5 10.727l8.022-7.87.637.637z";

  readonly indeterminatePath = "M13 8v1H3V8z";

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultChecked: boolean;

  defaultValue: Checkbox["checked"];

  toggleEl: HTMLDivElement;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    this.toggleEl?.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  syncHiddenFormInput(input: HTMLInputElement): void {
    input.type = "checkbox";
  }

  getPath = (): string =>
    this.indeterminate ? this.indeterminatePath : this.checked ? this.checkedPath : "";

  toggle = (): void => {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.setFocus();
      this.indeterminate = false;
      this.calciteCheckboxChange.emit();
    }
  };

  keyDownHandler = (event: KeyboardEvent): void => {
    if (isActivationKey(event.key)) {
      this.toggle();
      event.preventDefault();
    }
  };

  clickHandler = (): void => {
    this.toggle();
  };

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the component is blurred.
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalCheckboxBlur: EventEmitter<boolean>;

  /** Fires when the component's `checked` status changes. */
  @Event({ cancelable: false }) calciteCheckboxChange: EventEmitter<void>;

  /**
   * Fires when the component is focused.
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalCheckboxFocus: EventEmitter<boolean>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  onToggleBlur = (): void => {
    this.calciteInternalCheckboxBlur.emit(false);
  };

  onToggleFocus = (): void => {
    this.calciteInternalCheckboxFocus.emit(true);
  };

  onLabelClick = (): void => {
    this.toggle();
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.guid = this.el.id || `calcite-checkbox-${guid()}`;
    connectLabel(this);
    connectForm(this);
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
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
    const rtl = getElementDir(this.el) === "rtl";

    return (
      <Host onClick={this.clickHandler} onKeyDown={this.keyDownHandler}>
        <InteractiveContainer disabled={this.disabled}>
          <div
            aria-checked={toAriaBoolean(this.checked)}
            aria-label={getLabelText(this)}
            class={{
              [CSS.toggle]: true,
              [CSS_UTILITY.rtl]: rtl,
            }}
            onBlur={this.onToggleBlur}
            onFocus={this.onToggleFocus}
            ref={(toggleEl) => (this.toggleEl = toggleEl)}
            role="checkbox"
            tabIndex={this.disabled ? undefined : 0}
          >
            <svg aria-hidden="true" class={CSS.check} viewBox="0 0 16 16">
              <path d={this.getPath()} />
            </svg>
            <slot />
          </div>
          <HiddenFormInputSlot component={this} />
        </InteractiveContainer>
      </Host>
    );
  }
}
