import {
  Component,
  h,
  Prop,
  Event,
  Element,
  Host,
  EventEmitter,
  Listen,
  Watch,
  VNode,
  Method
} from "@stencil/core";
import { focusElement, getElementDir, hasLabel } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { getKey } from "../../utils/key";
import { Scale, Theme } from "../interfaces";

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
  }

  /** The id attribute of the switch.  When omitted, a globally unique identifier is used. */
  @Prop({ reflect: true, mutable: true }) guid: string;

  /** The name of the switch input */
  @Prop({ reflect: true }) name?: string = "";

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

  /** The component's theme. */
  @Prop({ reflect: true }) theme: Theme;

  /** The value of the checkbox input */
  @Prop({ reflect: true }) value?: string;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  private inputEl: HTMLInputElement;

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

  private updateSwitch(): void {
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
      this.updateSwitch();
    }
  }

  @Listen("keydown")
  keyDownHandler(e: KeyboardEvent): void {
    const key = getKey(e.key);
    if (!this.disabled && (key === " " || key === "Enter")) {
      this.updateSwitch();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.guid = this.el.id || `calcite-switch-${guid()}`;
    this.renderInput();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  private renderInput(): void {
    this.inputEl = document.createElement("input");
    this.switched && this.inputEl.setAttribute("checked", "");
    this.inputEl.disabled = this.disabled;
    this.inputEl.id = `${this.guid}-input`;
    this.inputEl.name = this.name;
    this.inputEl.style.setProperty("bottom", "0", "important");
    this.inputEl.style.setProperty("left", "0", "important");
    this.inputEl.style.setProperty("margin", "0", "important");
    this.inputEl.style.setProperty("opacity", "0", "important");
    this.inputEl.style.setProperty("outline", "none", "important");
    this.inputEl.style.setProperty("padding", "0", "important");
    this.inputEl.style.setProperty("position", "absolute", "important");
    this.inputEl.style.setProperty("right", "0", "important");
    this.inputEl.style.setProperty("top", "0", "important");
    this.inputEl.style.setProperty("transform", "none", "important");
    this.inputEl.style.setProperty("-webkit-appearance", "none", "important");
    this.inputEl.style.setProperty("z-index", "-1", "important");
    this.inputEl.type = "checkbox";
    if (this.value) {
      this.inputEl.value = this.value;
    }
    this.el.appendChild(this.inputEl);
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    return (
      <Host aria-checked={this.switched.toString()} dir={dir} tabindex={this.disabled ? -1 : 0}>
        <div class="track">
          <div class="handle" />
        </div>
      </Host>
    );
  }
}
