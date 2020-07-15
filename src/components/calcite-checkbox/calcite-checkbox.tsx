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
  Build,
} from "@stencil/core";
import { getKey } from "../../utils/key";

@Component({
  tag: "calcite-checkbox",
  styleUrl: "calcite-checkbox.scss",
  shadow: true,
})
export class CalciteCheckbox {
  @Element() el: HTMLElement;

  /** The checked state of the checkbox. */
  @Prop({ reflect: true, mutable: true }) checked?: boolean = false;
  @Watch("checked") checkedWatcher(newChecked: boolean) {
    this.input.checked = newChecked;
    this.calciteCheckboxChange.emit();
  }

  /** The hovered state of the checkbox. */
  @Prop({ reflect: true, mutable: true }) hovered: boolean = false;

  /** The focused state of the checkbox. */
  @Prop({ mutable: true, reflect: true }) focused: boolean = false;
  @Watch("focused") focusedChanged(focused: boolean) {
    if (focused && !this.el.hasAttribute("hidden")) {
      this.input.focus();
    } else {
      this.input.blur();
    }
    this.calciteCheckboxFocusedChange.emit();
  }

  /**
   * True if the checkbox is initially indeterminate,
   * which is independent from its checked state
   * https://css-tricks.com/indeterminate-checkboxes/
   * */
  @Prop({ reflect: true, mutable: true }) indeterminate?: boolean = false;

  /** The name of the checkbox input */
  @Prop({ reflect: true, mutable: true }) name?: string = "";

  /** The value of the checkbox input */
  @Prop({ reflect: true, mutable: true }) value?: string;

  /** specify the scale of the checkbox, defaults to m */
  @Prop({ reflect: true, mutable: true }) scale: "s" | "m" | "l" = "m";

  /** True if the checkbox is disabled */
  @Prop({ reflect: true }) disabled?: boolean = false;

  /** Determines what theme to use */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** Emitted when the checkbox checked status changes */
  @Event() calciteCheckboxChange: EventEmitter;

  /** Emitted when the checkbox focused state changes */
  @Event() calciteCheckboxFocusedChange: EventEmitter;

  private observer: MutationObserver;

  private toggle = () => {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.focused = true;
      this.indeterminate = false;
    }
  };

  @Listen("click") onClick({ currentTarget, target }: MouseEvent) {
    // prevent duplicate click events that occur
    // when the component is wrapped in a label and checkbox is clicked
    if (
      (this.el.closest("label") && target === this.input) ||
      (!this.el.closest("label") && currentTarget === this.el)
    ) {
      this.toggle();
    }
  }

  @Listen("keydown") keyDownHandler(e: KeyboardEvent) {
    const key = getKey(e.key);
    if (key === " " || key === "Enter") {
      e.preventDefault();
      this.toggle();
    }
  }

  @Listen("mouseenter")
  mouseenter() {
    this.hovered = true;
  }

  @Listen("mouseleave")
  mouseleave() {
    this.hovered = false;
  }

  private input: HTMLInputElement;

  connectedCallback() {
    this.setupProxyInput();
    let scale = ["s", "m", "l"];
    if (!scale.includes(this.scale)) this.scale = "m";
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  componentWillRender() {
    this.syncProxyInputToThis();
  }

  private readonly indeterminatePath = "M4 7h8v2H4z";
  private readonly checkedPath =
    "M12.753 3l-7.319 7.497L3.252 8.31 2 9.373l3.434 3.434L14 4.24z";

  private getPath = (): string =>
    this.indeterminate
      ? this.indeterminatePath
      : this.checked
      ? this.checkedPath
      : "";

  private setupProxyInput() {
    // check for a proxy input
    this.input = this.el.querySelector("input");

    // if the user didn't pass a proxy input create one for them
    if (!this.input) {
      this.input = document.createElement("input");
      this.input.disabled = this.disabled;
      this.input.onblur = () => (this.focused = false);
      this.input.onfocus = () => (this.focused = true);
      this.input.type = "checkbox";
      this.syncProxyInputToThis();
      this.el.appendChild(this.input);
    }

    this.syncThisToProxyInput();
    if (Build.isBrowser) {
      this.observer = new MutationObserver(this.syncThisToProxyInput);
      this.observer.observe(this.input, { attributes: true });
    }
  }

  private syncThisToProxyInput = () => {
    this.checked = this.input.hasAttribute("checked");
    this.name = this.input.name;
    this.value = this.input.value;
  };

  private syncProxyInputToThis = () => {
    this.checked
      ? this.input.setAttribute("checked", "")
      : this.input.removeAttribute("checked");
    this.input.name = this.name;
    if (this.value) {
      this.input.value = this.value;
    }
  };

  render() {
    return (
      <Host role="checkbox" aria-checked={this.checked.toString()}>
        <svg class="check-svg" viewBox="0 0 16 16">
          <path d={this.getPath()} />
        </svg>
        <slot />
      </Host>
    );
  }
}
