// @ts-strict-ignore
import { PropertyValues } from "lit";
import { Fragment, h, JsxNode, LitElement, property, setAttribute } from "@arcgis/lumina";
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

  messages = useT9n<Record<string, never>>({ name: null });

  // #endregion

  // #region Public Properties

  /**
   * Indicates whether the component is in a loading state.
   *
   * @private
   */
  @property({ reflect: true }) complete = false;

  /** When present, the component displays smaller. */
  @property({ reflect: true }) inline = false;

  /**
   * Accessible name for the component.
   *
   * @required
   */
  @property() label: string;

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
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
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

    return this.formatter.format(this.value / 100);
  }

  /**
   * Return the proper sizes based on the scale property
   *
   * @param scale
   */
  private getSize(scale: string) {
    return {
      s: 32,
      m: 64,
      l: 96,
    }[scale];
  }

  private getInlineSize(scale: string) {
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
