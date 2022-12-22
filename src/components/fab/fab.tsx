import { Component, Element, Method, Prop, h, VNode } from "@stencil/core";
import { Appearance, Kind, Scale } from "../interfaces";
import { CSS, ICONS } from "./resources";
import { focusElement } from "../../utils/dom";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { componentLoaded } from "../../utils/loadable";

@Component({
  tag: "calcite-fab",
  styleUrl: "fab.scss",
  shadow: true
})
export class Fab implements InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Specifies the appearance style of the component.
   */
  @Prop({ reflect: true }) appearance: Extract<"solid" | "outline-fill", Appearance> = "solid";

  /**
   * Specifies the kind of the component (will apply to border and background).
   */
  @Prop({ reflect: true }) kind: Extract<"brand" | "danger" | "inverse" | "neutral", Kind> =
    "brand";

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Specifies an icon to display.
   *
   * @default "plus"
   */
  @Prop({ reflect: true }) icon: string = ICONS.plus;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /**
   * Accessible name for the component.
   */
  @Prop() label: string;

  /**
   * When `true`, a busy indicator is displayed.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * Specifies the size of the component.
   */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies text to accompany the component's icon.
   */
  @Prop() text: string;

  /**
   * When `true`, displays the `text` value in the component.
   */
  @Prop({ reflect: true }) textEnabled = false;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteFabElement;

  private buttonEl: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this.el);
    await focusElement(this.buttonEl);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
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
      iconFlipRtl
    } = this;

    const title = !textEnabled ? label || text || null : null;

    return (
      <calcite-button
        appearance={appearance === "solid" ? "solid" : "outline-fill"}
        class={CSS.button}
        disabled={disabled}
        iconFlipRtl={iconFlipRtl ? "start" : null}
        iconStart={icon}
        kind={kind}
        label={label}
        loading={loading}
        ref={(buttonEl): void => {
          this.buttonEl = buttonEl;
        }}
        round={true}
        scale={scale}
        title={title}
        type="button"
        width="auto"
      >
        {this.textEnabled ? this.text : null}
      </calcite-button>
    );
  }
}
