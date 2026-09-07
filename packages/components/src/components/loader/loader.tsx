import { PropertyValues } from "lit";
import { Fragment, h, JsxNode, LitElement, property, setAttribute } from "@arcgis/lumina";
import { guid } from "../../utils/guid";
import { Scale } from "../types";
import { useT9n } from "../../controllers/useT9n";
import { CSS } from "./resources";
import { styles } from "./loader.scss";

declare global {
  interface DeclareElements {
    "calcite-loader": Loader;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * When `type` is not `"indeterminate"` or `inline`, specifies the font size of the loading percentage.
     */
    "--calcite-loader-font-size": "*";
    /**
     * Specifies the component's width and height.
     */
    "--calcite-loader-size": "*";
    /**
     * Specifies the width and height of the component when set to inline.
     *
     * @deprecated in v3.0.0, removal target v6.0.0 - Use `--calcite-loader-size` instead.
     */
    "--calcite-loader-size-inline": "*";
    /**
     * Specifies the the component's padding.
     */
    "--calcite-loader-spacing": "*";
    /**
     * When `inline`, specifies the component's progress ring color.
     */
    "--calcite-loader-progress-color-inline": "*";
    /**
     * When not `inline`, specifies the component's `text` margin.
     */
    "--calcite-loader-text-spacing": "*";
    /**
     * When not `inline` and `text` is provided, specifies the component's `text` font weight.
     */
    "--calcite-loader-text-weight": "*";
    /**
     * When not `inline` and `text` is provided, specifies the component's `text` color.
     */
    "--calcite-loader-text-color": "*";
    /**
     * When not `inline`, specifies the component's progress ring color.
     */
    "--calcite-loader-progress-color": "*";
    /**
     * Specifies the component's track color.
     */
    "--calcite-loader-track-color": "*";
  }
}

export class Loader extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private formatter?: Intl.NumberFormat;

  messages = useT9n<Record<string, never>>({ name: null });

  // #endregion

  // #region Public Properties

  /**
   * Indicates whether the component is in a loading state.
   *
   * @private
   */
  @property({ reflect: true }) complete = false;

  /** When `true`, the component displays smaller. */
  @property({ reflect: true }) inline = false;

  /**
   * @copyDoc
   * @required
   */
  @property() label!: string;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** When not `inline`, displays text under the component's indicator. */
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

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("value") && (this.hasUpdated || this.value !== 0)) {
      this.valueChangeHandler();
    }

    if (
      (changes.has("type") && (this.hasUpdated || this.type !== "indeterminate")) ||
      changes.has("messages")
    ) {
      this.updateFormatter();
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

    return this.formatter!.format(this.value / 100);
  }

  /**
   * Return the proper sizes based on the scale property
   */
  private getSize(scale: Scale) {
    return {
      s: 32,
      m: 64,
      l: 96,
    }[scale];
  }

  private getInlineSize(scale: Scale) {
    return {
      s: 12,
      m: 16,
      l: 24,
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
    const { el, inline, label, text, type, value } = this;

    const id = el.id || guid();
    const isDeterminate = type !== "indeterminate";

    const valueNow = Math.floor(value);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaLabel = label;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaValueMax = isDeterminate ? "100" : null;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaValueMin = isDeterminate ? "0" : null;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaValueNow = isDeterminate ? valueNow.toString() : null;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "id", id);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "progressbar";

    return (
      <>
        <div class={CSS.rings}>
          {this.renderRing("track")}
          {this.renderRing("progress")}
          {!inline && isDeterminate && <div class={CSS.percentage}>{this.formatValue()}</div>}
        </div>
        {!inline && text && <div class={CSS.text}>{text}</div>}
      </>
    );
  }

  private renderRing(type: "track" | "progress"): JsxNode {
    const { inline, scale, value } = this;

    const size = inline ? this.getInlineSize(scale) : this.getSize(scale);
    const radiusRatio = 0.45;
    const radius = size * radiusRatio;

    let style: { "stroke-dasharray": string } | undefined;

    if (type === "progress") {
      const circumference = 2 * radius * Math.PI;
      const progress = ((this.type.startsWith("determinate") ? value : 24) / 100) * circumference;
      const remaining = circumference - progress;
      style = { "stroke-dasharray": `${progress} ${remaining}` };
    }

    return (
      <svg
        ariaHidden="true"
        class={{
          [CSS.ring]: true,
          [CSS.trackRing]: type === "track",
          [CSS.progressRing]: type === "progress",
        }}
        style={style}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle cx={size / 2} cy={size / 2} r={radius} />
      </svg>
    );
  }

  // #endregion
}
