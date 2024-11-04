import { PropertyValues } from "lit";
import { LitElement, property, Fragment, h, JsxNode, setAttribute } from "@arcgis/lumina";
import { guid } from "../../utils/guid";
import { Scale } from "../interfaces";
import { useT9n } from "../../controllers/useT9n";
import { CSS } from "./resources";
import { styles } from "./loader.scss";

declare global {
  interface DeclareElements {
    "calcite-loader": Loader;
  }
}

export class Loader extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private formatter: Intl.NumberFormat;

  /** TODO: [MIGRATION] This component has been updated to use the useT9n() controller. Documentation: https://qawebgis.esri.com/arcgis-components/?path=/docs/references-t9n-for-components--docs */
  messages = useT9n<Record<string, never>>({ name: null });

  // #endregion

  // #region Public Properties

  /**
   * Indicates whether the component is in a loading state.
   *
   * @private
   */
  @property({ reflect: true }) complete = false;

  /** When `true`, displays smaller and appears to the left of the text. */
  @property({ reflect: true }) inline = false;

  /**
   * Accessible name for the component.
   * TODO: [MIGRATION] This property was marked as required in your Stencil component. If you didn't mean it to be required, feel free to remove `@required` tag.
   * Otherwise, read the documentation about required properties: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-properties--docs#string-properties
   *
   * @required
   */
  @property() label: string;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Text that displays under the component's indicator. */
  @property() text = "";

  /**
   * Specifies the component type.
   *
   * Use `"indeterminate"` if finding actual progress value is impossible. Otherwise, use `"determinate"` to have the value indicate the progress or `"determinate-value"` to have the value label displayed along the progress.
   */
  @property({ reflect: true }) type: "indeterminate" | "determinate" | "determinate-value" =
    "indeterminate";

  /** The component's value. Valid only for `"determinate"` indicators. Percent complete of 100. */
  @property() value = 0;

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    this.updateFormatter();
  }

  load(): void {
    requestAnimationFrame(() => this.valueChangeHandler());
  }

  /**
   * TODO: [MIGRATION] Consider inlining some of the watch functions called inside of this method to reduce boilerplate code
   *
   * @param changes
   */
  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("value") && (this.hasUpdated || this.value !== 0)) {
      this.valueChangeHandler();
    }

    if (
      (changes.has("type") && (this.hasUpdated || this.type !== "indeterminate")) ||
      changes.has("messages")
    ) {
      this.formatterPropsChange();
    }
  }

  // #endregion

  // #region Private Methods

  private valueChangeHandler(): void {
    this.complete = this.type.startsWith("determinate") && this.value === 100;
  }

  private formatValue(): string {
    if (this.type !== "determinate-value") {
      return `${this.value}`;
    }

    return this.formatter.format(this.value / 100);
  }

  private formatterPropsChange(): void {
    this.updateFormatter();
  }

  /**
   * Return the proper sizes based on the scale property
   *
   * @param scale
   */
  private getSize(scale: string) {
    return {
      s: 32,
      m: 56,
      l: 80,
    }[scale];
  }

  private getInlineSize(scale: string) {
    return {
      s: 12,
      m: 16,
      l: 20,
    }[scale];
  }

  private updateFormatter(): void {
    if (
      this.type !== "determinate-value" ||
      this.formatter?.resolvedOptions().locale === this.messages._lang
    ) {
      return;
    }

    this.formatter = new Intl.NumberFormat(this.messages._lang, {
      style: "percent",
    });
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { el, inline, label, scale, text, type, value } = this;

    const id = el.id || guid();
    const radiusRatio = 0.45;
    const size = inline ? this.getInlineSize(scale) : this.getSize(scale);
    const radius = size * radiusRatio;
    const viewbox = `0 0 ${size} ${size}`;
    const isDeterminate = type.startsWith("determinate");
    const circumference = 2 * radius * Math.PI;
    const progress = (value / 100) * circumference;
    const remaining = circumference - progress;
    const valueNow = Math.floor(value);
    const determinateStyle = { "stroke-dasharray": `${progress} ${remaining}` };
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaLabel = label;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaValueMax = isDeterminate ? "100" : undefined;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaValueMin = isDeterminate ? "0" : undefined;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaValueNow = isDeterminate ? valueNow.toString() : undefined;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "id", id);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "progressbar";

    return (
      <>
        <div class={CSS.loaderParts}>
          {[1, 2, 3].map((index) => (
            <svg
              ariaHidden="true"
              class={{
                [CSS.loaderPart]: true,
                [CSS.loaderPartId(index)]: true,
              }}
              style={isDeterminate && index === 3 ? determinateStyle : undefined}
              viewBox={viewbox}
            >
              <circle cx={size / 2} cy={size / 2} r={radius} />
            </svg>
          ))}
          {isDeterminate && <div class={CSS.loaderPercentage}>{this.formatValue()}</div>}
        </div>
        {text && <div class={CSS.loaderText}>{text}</div>}
      </>
    );
  }

  // #endregion
}
