import { LitElement, property, createEvent, h, JsxNode } from "@arcgis/lumina";
import { FlipContext, Scale } from "../interfaces";
import {
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { getIconScale } from "../../utils/component";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { IconNameOrString } from "../icon/interfaces";
import { guid } from "../../utils/guid";
import { CSS, SLOTS } from "./resources";
import { styles } from "./autocomplete-item.scss";

declare global {
  interface DeclareElements {
    "calcite-autocomplete-item": AutocompleteItem;
  }
}

/**
 * @slot content-end - A slot for adding non-actionable elements after content of the component.
 * @slot content-start - A slot for adding non-actionable elements before content of the component.
 */
export class AutocompleteItem
  extends LitElement
  implements InteractiveComponent, LoadableComponent
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Public Properties

  /**
   * True when the item is highlighted from keyboard interaction.
   *
   * @private
   */
  @property() active = false;

  /** A description for the component. Displays below the label text. */
  @property() description: string;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * The `id` attribute of the component
   *
   * @private
   */
  @property() guid = `autocomplete-item-${guid()}`;

  /** Specifies heading text for the component. */
  @property() heading: string;

  /** Specifies an icon to display at the end of the component. */
  @property({ reflect: true }) iconEnd: IconNameOrString;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @property({ reflect: true }) iconStart: IconNameOrString;

  /** Accessible name for the component. */
  @property() label: string;

  /**
   * Specifies the size of the component inherited from `calcite-dropdown`, defaults to `m`.
   *
   * @private
   */
  @property() scale: Scale = "m";

  /** The component's value. */
  @property() value: string;

  // #endregion

  // #region Events

  /**
   * Fires when the item has been selected.
   *
   * @private
   */
  calciteInternalAutocompleteItemSelect = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  load(): void {
    setUpLoadableComponent(this);
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    setComponentLoaded(this);
  }

  // #endregion

  // #region Private Methods

  private handleClick(): void {
    this.calciteInternalAutocompleteItemSelect.emit();
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { description, heading, disabled } = this;

    return (
      <InteractiveContainer disabled={disabled}>
        <div
          class={{
            [CSS.container]: true,
            [CSS.containerActive]: this.active,
            [CSS.scale(this.scale)]: true,
          }}
          onClick={this.handleClick}
        >
          {this.renderIconStart()}
          <slot name={SLOTS.contentStart} />
          <div class={CSS.contentCenter}>
            <div class={CSS.heading}>{heading}</div>
            <div class={CSS.description}>{description}</div>
          </div>
          <slot name={SLOTS.contentEnd} />
          {this.renderIconEnd()}
        </div>
      </InteractiveContainer>
    );
  }

  private renderIconStart(): JsxNode {
    const { iconStart, iconFlipRtl } = this;

    return iconStart ? (
      <calcite-icon
        class={CSS.iconStart}
        flipRtl={iconFlipRtl === "start" || iconFlipRtl === "both"}
        icon={iconStart}
        scale={getIconScale(this.scale)}
      />
    ) : null;
  }

  private renderIconEnd(): JsxNode {
    const { iconEnd, iconFlipRtl } = this;

    return iconEnd ? (
      <calcite-icon
        class={CSS.iconEnd}
        flipRtl={iconFlipRtl === "end" || iconFlipRtl === "both"}
        icon={iconEnd}
        scale={getIconScale(this.scale)}
      />
    ) : null;
  }

  // #endregion
}
