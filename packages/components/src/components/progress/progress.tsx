import { LitElement, property, h, JsxNode } from "@arcgis/lumina";
import { useDirection } from "@arcgis/lumina/controllers";
import { CSS_UTILITY } from "../../utils/resources";
import { styles } from "./progress.scss";
import { CSS } from "./resources";

declare global {
  interface DeclareElements {
    "calcite-progress": Progress;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the component's background color.
     *
     * @public
     */
    "--calcite-progress-background-color": "*";
    /**
     * Specifies the component's fill color.
     *
     * @public
     */
    "--calcite-progress-fill-color": "*";
    /**
     * Specifies the component's text color.
     *
     * @public
     */
    "--calcite-progress-text-color": "*";
  }
}

/** @public */
export class Progress extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private direction = useDirection();

  //#endregion

  //#region Public Properties

  /**
   * @public
   * @copyDoc
   */
  @property() label?: string;

  /**
   * When `true` and type is `"indeterminate"`, reverses the animation direction.
   *
   * @public
   */
  @property({ reflect: true }) reversed = false;

  /**
   * Text that displays under the component's indicator.
   *
   * @public
   */
  @property() text?: string;

  /**
   * Specifies the component type.
   *
   * Use `"indeterminate"` if finding actual progress value is impossible.
   *
   * @public
   */
  @property({ reflect: true }) type: "indeterminate" | "determinate" = "determinate";

  /**
   * When `type` is `"determinate"`, specifies the component's value with a range of 0 to 100.
   *
   * @public
   */
  @property() value = 0;

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const isDeterminate = this.type === "determinate";
    const barStyles = isDeterminate ? { width: `${this.value}%` } : {};
    const dir = this.direction;
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

  //#endregion
}
