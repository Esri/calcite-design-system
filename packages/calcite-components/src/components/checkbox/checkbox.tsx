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
import { toAriaBoolean } from "../../utils/dom";
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
import { isActivationKey } from "../../utils/key";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { Scale } from "../interfaces";

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
   * The ID of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @Prop({ reflect: true })
  form: string;

  /** The `id` attribute of the component. When omitted, a globally unique identifier is used. */
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

  /** Specifies the name of the component on form submission. */
  @Prop({ reflect: true }) name: string;

  /**
   * When `true`, the component must have a value in order for the form to submit.
   *
   * @internal
   */
  @Prop({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

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
    if (this.disabled) {
      return;
    }

    this.toggle();
  };

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emits when the component is blurred.
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalCheckboxBlur: EventEmitter<boolean>;

  /** Emits when the component's `checked` status changes. */
  @Event({ cancelable: false }) calciteCheckboxChange: EventEmitter<void>;

  /**
   * Emits when the component is focused.
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
    connectInteractive(this);
    connectLabel(this);
    connectForm(this);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
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
    return (
      <Host onClick={this.clickHandler} onKeyDown={this.keyDownHandler}>
        <InteractiveContainer disabled={this.disabled}>
          <div
            aria-checked={toAriaBoolean(this.checked)}
            aria-label={getLabelText(this)}
            class="toggle"
            onBlur={this.onToggleBlur}
            onFocus={this.onToggleFocus}
            role="checkbox"
            tabIndex={this.disabled ? undefined : 0}
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={(toggleEl) => (this.toggleEl = toggleEl)}
          >
            <svg aria-hidden="true" class="check-svg" viewBox="0 0 16 16">
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
