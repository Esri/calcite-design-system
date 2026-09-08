import { createRef } from "lit/directives/ref.js";
import { LitElement, property, h, method, JsxNode } from "@arcgis/lumina";
import { Appearance, Kind, Scale } from "../types";
import { IconName } from "../icon/types";
import type { Button } from "../button/button";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useInteractive } from "../../controllers/useInteractive";
import { CSS, ICONS } from "./resources";
import { styles } from "./fab.scss";

declare global {
  interface DeclareElements {
    "calcite-fab": Fab;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the component's background color.
     */
    "--calcite-fab-background-color": "*";
    /**
     * Specifies the component's border color.
     */
    "--calcite-fab-border-color": "*";
    /**
     * Specifies the component's corner radius.
     */
    "--calcite-fab-corner-radius": "*";
    /**
     * Specifies the component's text color.
     */
    "--calcite-fab-text-color": "*";
    /**
     * Specifies the component's loader color.
     */
    "--calcite-fab-loader-color": "*";
    /**
     * Specifies the component's shadow.
     */
    "--calcite-fab-shadow": "*";
  }
}

export class Fab extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private buttonRef = createRef<Button["el"]>();

  private focusSetter = useSetFocus<this>()(this);

  private interactiveContainer = useInteractive(this);

  //#endregion

  //#region Public Properties

  /** Specifies the component's appearance style. */
  @property({ reflect: true }) appearance: Extract<"solid" | "outline-fill", Appearance> = "solid";

  /** When `true`, prevents interaction and decreases the component's opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * Specifies an icon to display.
   */
  @property({ reflect: true }) icon: IconName = ICONS.plus;

  /** When `true` and the element direction is right-to-left (`"rtl"`), flips the component`s `icon`. */
  @property({ reflect: true }) iconFlipRtl = false;

  /** Specifies the component's kind, which determines border and background styling. */
  @property({ reflect: true }) kind: Extract<"brand" | "danger" | "inverse" | "neutral", Kind> =
    "brand";

  /** @copyDoc */
  @property() label?: string;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies text to accompany the component's icon. */
  @property() text?: string;

  /** When `true`, displays the `text` value in the component. */
  @property({ reflect: true }) textEnabled = false;

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.buttonRef.value, options);
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const {
      appearance,
      kind,
      disabled,
      loading,
      scale,
      textEnabled,
      icon,
      label,
      text,
      iconFlipRtl,
    } = this;

    const title = !textEnabled ? label || text || undefined : undefined;

    return (
      <this.interactiveContainer disabled={disabled}>
        <calcite-button
          appearance={appearance === "solid" ? "solid" : "outline-fill"}
          class={CSS.button}
          disabled={disabled}
          iconFlipRtl={iconFlipRtl ? "start" : undefined}
          iconStart={icon}
          kind={kind}
          label={label}
          loading={loading}
          ref={this.buttonRef}
          round={true}
          scale={scale}
          title={title}
          type="button"
          width="auto"
        >
          {this.textEnabled ? this.text : null}
        </calcite-button>
      </this.interactiveContainer>
    );
  }

  //#endregion
}
