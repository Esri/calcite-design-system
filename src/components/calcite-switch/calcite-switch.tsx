import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch
} from "@stencil/core";
import { focusElement, getElementDir } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { getKey } from "../../utils/key";
import { CSS_UTILITY } from "../../utils/resources";
import { Scale } from "../interfaces";
import { LabelableComponent, connectLabel, disconnectLabel, getLabelText } from "../../utils/label";
import { hiddenInputStyle, connectForm, disconnectForm, FormAssociated } from "../../utils/form";

@Component({
  tag: "calcite-switch",
  styleUrl: "calcite-switch.scss",
  shadow: true
})
export class CalciteSwitch implements LabelableComponent, FormAssociated {
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
    this.inputEl.disabled = newDisabled;
    this.tabindex = newDisabled ? -1 : 0;
  }

  /** Applies to the aria-label attribute on the switch */
  @Prop() label?: string;

  /** The name of the switch input */
  @Prop({ reflect: true }) name: string;

  @Watch("name")
  nameChanged(newName: string): void {
    this.inputEl.name = newName;
  }

  /** The scale of the switch */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** True if the switch is initially on
   * @deprecated use 'checked' instead.
   */
  @Prop() switched = false;

  switchedWatcher(switched: boolean): void {
    this.checked = switched;
  }

  /** True if the switch is initially on */
  @Prop({ reflect: true, mutable: true }) checked = false;

  @Watch("checked")
  checkedWatcher(checked: boolean): void {
    this.inputEl.checked = checked;
  }

  /** The value of the switch input */
  @Prop({ reflect: true }) value: any;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  labelEl: HTMLCalciteLabelElement;

  private inputEl: HTMLInputElement = document.createElement("input");

  switchEl: HTMLDivElement;

  formEl: HTMLFormElement;

  defaultValue: CalciteSwitch["checked"];

  //--------------------------------------------------------------------------
  //
  //  State
  //
  //--------------------------------------------------------------------------

  @State() guid: string;

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

  onFormReset(): void {
    this.checked = this.defaultValue;
  }

  onLabelClick = (): void => {
    if (!this.disabled) {
      this.toggle();
      this.setFocus();
    }
  };

  private setupInput(): void {
    this.checked && this.inputEl.setAttribute("checked", "");
    this.inputEl.disabled = this.disabled;
    this.inputEl.id = `${this.guid}-input`;
    this.inputEl.name = this.name;
    this.inputEl.style.cssText = hiddenInputStyle;
    this.inputEl.type = "checkbox";
    if (this.value) {
      this.inputEl.value = this.value != null ? this.value.toString() : "";
    }
    this.el.appendChild(this.inputEl);
  }

  private toggle(): void {
    this.checked = !this.checked;
    this.calciteSwitchChange.emit({
      switched: this.checked
    });
  }

  private clickHandler = (): void => {
    if (this.labelEl) {
      return;
    }

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
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("keydown")
  keyDownHandler(e: KeyboardEvent): void {
    const key = getKey(e.key);
    if (!this.disabled && (key === " " || key === "Enter")) {
      this.toggle();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLabel(this);
    connectForm(this);
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
  }

  componentWillLoad(): void {
    this.guid = this.el.id || `calcite-switch-${guid()}`;
    this.tabindex = this.el.getAttribute("tabindex") || this.disabled ? -1 : 0;
    this.setupInput();
  }

  componentDidLoad(): void {
    this.inputEl.setAttribute("aria-label", getLabelText(this));
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const dir = getElementDir(this.el);
    return (
      <Host>
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
        </div>
      </Host>
    );
  }
}
