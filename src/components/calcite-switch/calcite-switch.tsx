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
import { focusElement, getElementDir, hasLabel } from "../../utils/dom";
import { hiddenInputStyle } from "../../utils/form";
import { guid } from "../../utils/guid";
import { getKey } from "../../utils/key";
import { CSS_UTILITY } from "../../utils/resources";
import { Scale } from "../interfaces";

@Component({
  tag: "calcite-switch",
  styleUrl: "calcite-switch.scss",
  shadow: true
})
export class CalciteSwitch {
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
  @Prop({ reflect: true }) disabled?: boolean = false;

  @Watch("disabled")
  disabledWatcher(newDisabled: boolean): void {
    this.inputEl.disabled = newDisabled;
    this.tabindex = newDisabled ? -1 : 0;
  }

  /** The name of the switch input */
  @Prop({ reflect: true }) name?: string;

  @Watch("name")
  nameChanged(newName: string): void {
    this.inputEl.name = newName;
  }

  /** The scale of the switch */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** True if the switch is initially on */
  @Prop({ reflect: true, mutable: true }) switched = false;

  @Watch("switched")
  switchedWatcher(newSwitched: boolean): void {
    this.inputEl.checked = newSwitched;
  }

  /** The value of the switch input */
  @Prop({ reflect: true }) value?: any;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  private inputEl: HTMLInputElement = document.createElement("input");

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

  @Method()
  async setFocus(): Promise<void> {
    focusElement(this.inputEl);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private setupInput(): void {
    this.switched && this.inputEl.setAttribute("checked", "");
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
    this.switched = !this.switched;
    this.calciteSwitchChange.emit({
      switched: this.switched
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the switched value has changed.
   */
  @Event() calciteSwitchChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteLabelFocus", { target: "window" })
  handleLabelFocus(e: CustomEvent): void {
    if (
      !this.disabled &&
      !this.el.contains(e.detail.interactedEl) &&
      hasLabel(e.detail.labelEl, this.el)
    ) {
      this.el.focus();
    } else {
      return;
    }
  }

  @Listen("click")
  onClick(e: MouseEvent): void {
    // prevent duplicate click events that occur
    // when the component is wrapped in a label and checkbox is clicked
    if (
      (!this.disabled && this.el.closest("label") && e.target === this.inputEl) ||
      (!this.el.closest("label") && e.target === this.el)
    ) {
      this.toggle();
    }
  }

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

  componentWillLoad(): void {
    this.guid = this.el.id || `calcite-switch-${guid()}`;
    this.tabindex = this.el.getAttribute("tabindex") || this.disabled ? -1 : 0;
    this.setupInput();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const dir = getElementDir(this.el);
    return (
      <Host tabindex={this.tabindex}>
        <div
          aria-checked={this.switched.toString()}
          class={{ container: true, [CSS_UTILITY.rtl]: dir === "rtl" }}
        >
          <div class="track">
            <div class="handle" />
          </div>
        </div>
      </Host>
    );
  }
}
