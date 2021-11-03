import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  VNode,
  Watch
} from "@stencil/core";
import { focusElement, getElementDir } from "../../utils/dom";
import { getKey } from "../../utils/key";
import { CSS_UTILITY } from "../../utils/resources";
import { Scale } from "../interfaces";
import { LabelableComponent, connectLabel, disconnectLabel, getLabelText } from "../../utils/label";
import {
  connectForm,
  disconnectForm,
  CheckableFormCompoment,
  HiddenFormInputSlot
} from "../../utils/form";

@Component({
  tag: "calcite-switch",
  styleUrl: "calcite-switch.scss",
  shadow: true
})
export class CalciteSwitch implements LabelableComponent, CheckableFormCompoment {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteSwitchElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** True if the switch is disabled */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  disabledWatcher(newDisabled: boolean): void {
    this.tabindex = newDisabled ? -1 : 0;
  }

  /** Applies to the aria-label attribute on the switch */
  @Prop() label?: string;

  /** The name of the switch input */
  @Prop({ reflect: true }) name: string;

  /** The scale of the switch */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** True if the switch is initially on
   * @deprecated use 'checked' instead.
   */
  @Prop({ mutable: true }) switched = false;

  @Watch("switched")
  switchedWatcher(switched: boolean): void {
    this.checked = switched;
  }

  /** True if the switch is initially on */
  @Prop({ reflect: true, mutable: true }) checked = false;

  /** The value of the switch input */
  @Prop({ reflect: true }) value: any;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  labelEl: HTMLCalciteLabelElement;

  switchEl: HTMLDivElement;

  formEl: HTMLFormElement;

  defaultValue: CalciteSwitch["checked"];

  defaultChecked: boolean;

  //--------------------------------------------------------------------------
  //
  //  State
  //
  //--------------------------------------------------------------------------

  @State() tabindex: number;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    focusElement(this.switchEl);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  keyDownHandler = (e: KeyboardEvent): void => {
    const key = getKey(e.key);
    if (!this.disabled && (key === " " || key === "Enter")) {
      this.toggle();
    }
  };

  onLabelClick(): void {
    if (!this.disabled) {
      this.toggle();
      this.setFocus();
    }
  }

  private toggle(): void {
    this.checked = !this.checked;
    this.calciteSwitchChange.emit({
      // todo: We should remove emmitting redudant props in event payload.
      // https://github.com/Esri/calcite-components/issues/3163
      switched: this.checked
    });
  }

  private clickHandler = (): void => {
    this.toggle();
  };

  private setSwitchEl = (el: HTMLDivElement): void => {
    this.switchEl = el;
  };

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the checked value has changed.
   */
  @Event() calciteSwitchChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    const initiallyChecked = this.checked || this.switched;

    if (initiallyChecked) {
      // if either prop is set, we ensure both are synced initially
      this.switched = this.checked = initiallyChecked;
    }

    connectLabel(this);
    connectForm(this);
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
  }

  componentWillLoad(): void {
    this.tabindex = this.el.getAttribute("tabindex") || this.disabled ? -1 : 0;
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const dir = getElementDir(this.el);

    return (
      <Host onKeyDown={this.keyDownHandler}>
        <div
          aria-checked={this.checked.toString()}
          aria-label={getLabelText(this)}
          class={{ container: true, [CSS_UTILITY.rtl]: dir === "rtl" }}
          onClick={this.clickHandler}
          ref={this.setSwitchEl}
          role="switch"
          tabindex={this.tabindex}
        >
          <div class="track">
            <div class="handle" />
          </div>
          <HiddenFormInputSlot component={this} />
        </div>
      </Host>
    );
  }
}
