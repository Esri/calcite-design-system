// @ts-strict-ignore
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, h, method, JsxNode } from "@arcgis/lumina";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { Appearance, Kind, Scale } from "../interfaces";
import { IconNameOrString } from "../icon/interfaces";
import type { Button } from "../button/button";
import { useSetFocus } from "../../controllers/useSetFocus";
import { CSS, ICONS } from "./resources";
import { styles } from "./fab.scss";

declare global {
  interface DeclareElements {
    "calcite-fab": Fab;
  }
}

export class Fab extends LitElement implements InteractiveComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private buttonEl = createRef<Button["el"]>();

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region Public Properties

  /** Specifies the appearance style of the component. */
  @property({ reflect: true }) appearance: Extract<"solid" | "outline-fill", Appearance> = "solid";

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * Specifies an icon to display.
   *
   * @default "plus"
   */
  @property({ reflect: true }) icon: IconNameOrString = ICONS.plus;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** Specifies the kind of the component, which will apply to border and background. */
  @property({ reflect: true }) kind: Extract<"brand" | "danger" | "inverse" | "neutral", Kind> =
    "brand";

  /** Accessible name for the component. */
  @property() label: string;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies text to accompany the component's icon. */
  @property() text: string;

  /** When `true`, displays the `text` value in the component. */
  @property({ reflect: true }) textEnabled = false;

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    return this.focusSetter(() => {
      return this.buttonEl.value;
    });
  }

  // #endregion

  // #region Lifecycle

  override updated(): void {
    updateHostInteraction(this);
  }

  // #endregion

  // #region Rendering

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

    const title = !textEnabled ? label || text || null : null;

    return (
      <InteractiveContainer disabled={disabled}>
        <calcite-button
          appearance={appearance === "solid" ? "solid" : "outline-fill"}
          class={CSS.button}
          disabled={disabled}
          iconFlipRtl={iconFlipRtl ? "start" : null}
          iconStart={icon}
          kind={kind}
          label={label}
          loading={loading}
          ref={this.buttonEl}
          round={true}
          scale={scale}
          title={title}
          type="button"
          width="auto"
        >
          {this.textEnabled ? this.text : null}
        </calcite-button>
      </InteractiveContainer>
    );
  }

  // #endregion
}
