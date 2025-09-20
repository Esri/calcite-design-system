// @ts-strict-ignore
import { LitElement, property, h, JsxNode } from "@arcgis/lumina";
import { getElementDir } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
import { styles } from "./progress.scss";
import { CSS } from "./resources";

declare global {
  interface DeclareElements {
    "calcite-progress": Progress;
  }
}

export class Progress extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Public Properties

  /** Accessible name for the component. */
  @property() label: string;

  /** When present and `type` is `"indeterminate"`, reverses the animation direction. */
  @property({ reflect: true }) reversed = false;

  /** Text that displays under the component's indicator. */
  @property() text: string;

  /**
   * Specifies the component type.
   *
   * Use `"indeterminate"` if finding actual progress value is impossible.
   */
  @property({ reflect: true }) type: "indeterminate" | "determinate" = "determinate";

  /** When `type` is `"determinate"`, specifies the component's value with a range of 0 to 100. */
  @property() value = 0;

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const isDeterminate = this.type === "determinate";
    const barStyles = isDeterminate ? { width: `${this.value}%` } : {};
    const dir = getElementDir(this.el);
    return (
      <div
        ariaLabel={this.label || this.text}
        ariaValueMax={isDeterminate ? "100" : undefined}
        ariaValueMin={isDeterminate ? "0" : undefined}
        ariaValueNow={isDeterminate ? this.value : undefined}
        role="progressbar"
      >
        <div class={CSS.track}>
          <div
            class={{
              [CSS.bar]: true,
              indeterminate: this.type === "indeterminate",
              [CSS_UTILITY.rtl]: dir === "rtl",
              reversed: this.reversed,
            }}
            style={barStyles}
          />
        </div>
        {this.text ? <div class={CSS.text}>{this.text}</div> : null}
      </div>
    );
  }

  // #endregion
}
