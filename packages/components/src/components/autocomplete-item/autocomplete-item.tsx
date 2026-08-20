import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, JsxNode, method } from "@arcgis/lumina";
import { FlipContext, Scale } from "../types";
import { getIconScale } from "../../utils/component";
import { IconName } from "../icon/types";
import { guid } from "../../utils/guid";
import { highlightText } from "../../utils/text";
import { useInteractive } from "../../controllers/useInteractive";
import { CSS, SLOTS, IDS } from "./resources";
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
export class AutocompleteItem extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private interactiveContainer = useInteractive(this);

  //#endregion

  //#region Public Properties

  /**
   * True when the item is highlighted from keyboard interaction.
   *
   * @private
   */
  @property() active = false;

  /** @copyDoc */
  @property() description?: string;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * The `id` attribute of the component
   *
   * @private
   */
  @property() guid = IDS.host(guid());

  /**
   * @copyDoc
   * @required
   */
  @property() heading!: string;

  /** @copyDoc */
  @property({ reflect: true }) iconEnd?: IconName;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl?: FlipContext;

  /** @copyDoc */
  @property({ reflect: true }) iconStart?: IconName;

  /**
   * Pattern for highlighting text matches.
   *
   * @private
   */
  @property({ reflect: true }) inputValueMatchPattern?: RegExp;

  /** @copyDoc */
  @property() label?: string;

  /**
   * Specifies the size of the component inherited from `calcite-dropdown`, defaults to `m`.
   *
   * @private
   */
  @property() scale: Scale = "m";

  /** When `true`, the component is selected. The parent `calcite-autocomplete` synchronizes this property with its non-empty `value`; when no value is provided, declarative selection is preserved. */
  @property({ reflect: true }) selected = false;

  /** Specifies the component's value. */
  @property() value!: string;

  //#endregion

  //#region Public Methods

  /**
   * Requests selection by emitting the `calciteAutocompleteItemSelect` event. Selection state is managed by the parent `calcite-autocomplete`.
   *
   * @private
   */
  @method()
  requestSelection(): void {
    this.calciteAutocompleteItemSelect.emit();
  }

  //#endregion

  //#region Events

  /**
   * Fires when selection is requested.
   */
  calciteAutocompleteItemSelect = createEvent({ cancelable: false });

  /**
   * Fires whenever a property the parent autocomplete needs to know about is changed.
   *
   * @private
   */
  calciteInternalAutocompleteItemChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override willUpdate(changes: PropertyValues<this>): void {
    if (
      this.hasUpdated &&
      (changes.has("description") ||
        changes.has("disabled") ||
        changes.has("heading") ||
        changes.has("label") ||
        changes.has("selected") ||
        changes.has("value"))
    ) {
      this.calciteInternalAutocompleteItemChange.emit();
    }
  }

  //#endregion

  //#region Private Methods

  private handleClick(event: MouseEvent): void {
    event.preventDefault();

    if (this.disabled) {
      return;
    }

    this.requestSelection();
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const { active, description, heading, disabled, inputValueMatchPattern } = this;

    return (
      <this.interactiveContainer disabled={disabled}>
        <div
          class={{
            [CSS.container]: true,
            [CSS.containerActive]: active && !disabled,
            [CSS.scale(this.scale)]: true,
          }}
          onClick={this.handleClick}
        >
          {this.renderIcon("start")}
          <slot name={SLOTS.contentStart} />
          <div class={CSS.contentCenter}>
            <div class={CSS.heading}>
              {highlightText({
                text: heading,
                pattern: inputValueMatchPattern,
              })}
            </div>
            <div class={CSS.description}>
              {highlightText({
                text: description,
                pattern: inputValueMatchPattern,
              })}
            </div>
          </div>
          <slot name={SLOTS.contentEnd} />
          {this.renderIcon("end")}
        </div>
      </this.interactiveContainer>
    );
  }

  private renderIcon(position: "start" | "end"): JsxNode {
    const { iconFlipRtl } = this;

    const icon = position === "start" ? this.iconStart : this.iconEnd;

    return icon ? (
      <calcite-icon
        class={position === "start" ? CSS.iconStart : CSS.iconEnd}
        flipRtl={iconFlipRtl === position || iconFlipRtl === "both"}
        icon={icon}
        scale={getIconScale(this.scale)}
      />
    ) : null;
  }

  //#endregion
}
