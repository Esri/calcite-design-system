// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { guid } from "../../utils/guid";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { Alignment, Width } from "../interfaces";
import { IconNameOrString } from "../icon/interfaces";
import { logger } from "../../utils/logger";
import type { RadioButton } from "../radio-button/radio-button";
import type { Checkbox } from "../checkbox/checkbox";
import { useSetFocus } from "../../controllers/useSetFocus";
import { TileSelectType } from "./interfaces";
import { CSS } from "./resources";
import { styles } from "./tile-select.scss";

declare global {
  interface DeclareElements {
    "calcite-tile-select": TileSelect;
  }
}

/**
 * @deprecated Use the `calcite-tile` component instead.
 * @slot - A slot for adding custom content.
 */
export class TileSelect extends LitElement implements InteractiveComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private guid = `calcite-tile-select-${guid()}`;

  private input: Checkbox["el"] | RadioButton["el"];

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region State Properties

  /** The focused state of the tile-select. */
  @state() focused = false;

  // #endregion

  // #region Public Properties

  /** When `true`, the component is checked. */
  @property({ reflect: true }) checked = false;

  /** A description for the component, which displays below the heading. */
  @property({ reflect: true }) description: string;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** The component header text, which displays between the icon and description. */
  @property({ reflect: true }) heading: string;

  /** Specifies an icon to display. */
  @property({ reflect: true }) icon: IconNameOrString;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** When `inputEnabled` is `true`, specifies the placement of the interactive input on the component. */
  @property({ reflect: true }) inputAlignment: Extract<"end" | "start", Alignment> = "start";

  /** When `true`, displays an interactive input based on the `type` property. */
  @property({ reflect: true }) inputEnabled = false;

  /** Specifies the name of the component on form submission. */
  @property({ reflect: true }) name;

  /**
   * Specifies the selection mode of the component, where:
   *
   * `"radio"` is for single selection, and
   *
   * `"checkbox"` is for multiple selections.
   */
  @property({ reflect: true }) type: TileSelectType = "radio";

  /** The component's value. */
  @property() value: any;

  /** Specifies the width of the component. */
  @property({ reflect: true }) width: Extract<"auto" | "full", Width> = "auto";

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    return this.focusSetter(() => {
      return this.input;
    });
  }

  // #endregion

  // #region Events

  /**
   * Emits a custom change event.
   *
   * For checkboxes it emits when checked or unchecked.
   *
   * For radios it only emits when checked.
   */
  calciteTileSelectChange = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteCheckboxChange", this.checkboxChangeHandler);
    this.listen("calciteInternalCheckboxFocus", this.checkboxFocusBlurHandler);
    this.listen("calciteInternalCheckboxBlur", this.checkboxFocusBlurHandler);
    this.listen("calciteRadioButtonChange", this.radioButtonChangeHandler);
    this.listen("calciteInternalRadioButtonCheckedChange", this.radioButtonCheckedChangeHandler);
    this.listen("calciteInternalRadioButtonFocus", this.radioButtonFocusBlurHandler);
    this.listen("calciteInternalRadioButtonBlur", this.radioButtonFocusBlurHandler);
    this.listen("click", this.clickHandler);
    this.listen("pointerenter", this.pointerEnterHandler);
    this.listen("pointerleave", this.pointerLeaveHandler);
  }

  override connectedCallback(): void {
    this.renderInput();
  }

  load(): void {
    logger.deprecated("component", {
      name: "tile-select",
      removalVersion: 4,
      suggested: ["tile", "tile-group"],
    });
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("checked") && (this.hasUpdated || this.checked !== false)) {
      this.input.checked = this.checked;
    }

    if (changes.has("name")) {
      this.input.name = this.name;
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  override disconnectedCallback(): void {
    this.input?.remove();
  }

  // #endregion

  // #region Private Methods

  private checkboxChangeHandler(event: CustomEvent): void {
    const checkbox = event.target as Checkbox["el"];
    if (checkbox === this.input) {
      this.checked = checkbox.checked;
    }
    event.stopPropagation();
    this.calciteTileSelectChange.emit();
  }

  private checkboxFocusBlurHandler(event: CustomEvent): void {
    const checkbox = event.target as Checkbox["el"];
    if (checkbox === this.input) {
      this.focused = event.detail;
    }
    event.stopPropagation();
  }

  private radioButtonChangeHandler(event: CustomEvent): void {
    const radioButton = event.target as RadioButton["el"];
    if (radioButton === this.input) {
      this.checked = radioButton.checked;
    }
    event.stopPropagation();
    this.calciteTileSelectChange.emit();
  }

  private radioButtonCheckedChangeHandler(event: CustomEvent): void {
    const radioButton = event.target as RadioButton["el"];
    if (radioButton === this.input) {
      this.checked = radioButton.checked;
    }
    event.stopPropagation();
  }

  private radioButtonFocusBlurHandler(event: CustomEvent): void {
    const radioButton = event.target as RadioButton["el"];
    if (radioButton === this.input) {
      this.focused = radioButton.focused;
    }
    event.stopPropagation();
  }

  private clickHandler(event: MouseEvent): void {
    if (this.disabled) {
      return;
    }

    const target = event.target as HTMLElement;
    const targets = ["calcite-tile", "calcite-tile-select"];
    if (targets.includes(target.localName)) {
      this.input.click();
    }
  }

  private pointerEnterHandler(): void {
    if (this.disabled) {
      return;
    }

    const { localName } = this.input;

    if (localName === "calcite-radio-button" || localName === "calcite-checkbox") {
      this.input.hovered = true;
    }
  }

  private pointerLeaveHandler(): void {
    if (this.disabled) {
      return;
    }

    const { localName } = this.input;

    if (localName === "calcite-radio-button" || localName === "calcite-checkbox") {
      this.input.hovered = false;
    }
  }

  // #endregion

  // #region Rendering

  private renderInput(): void {
    this.input =
      this.type === "radio"
        ? /* we need to call createElement(x) separately to ensure supporting components are properly bundled */
          document.createElement(
            // TODO: [MIGRATION] If this is dynamically creating a web component, please read the docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-jsx--docs#rendering-jsx-outside-the-component
            "calcite-radio-button",
          )
        : document.createElement(
            // TODO: [MIGRATION] If this is dynamically creating a web component, please read the docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-jsx--docs#rendering-jsx-outside-the-component
            "calcite-checkbox",
          );
    this.input.checked = this.checked;
    this.input.disabled = this.disabled;
    this.input.hidden = this.el.hidden;
    this.input.id = this.guid;
    this.input.label = this.heading || this.name || "";

    if (this.name) {
      this.input.name = this.name;
    }

    if (this.value) {
      this.input.value = this.value != null ? this.value.toString() : "";
    }

    this.el.insertAdjacentElement("beforeend", this.input);
  }

  override render(): JsxNode {
    const {
      checked,
      description,
      disabled,
      focused,
      heading,
      icon,
      inputAlignment,
      inputEnabled,
      width,
      iconFlipRtl,
    } = this;
    const isLargeVisual = heading && icon && !description;
    const renderIcon = Boolean(icon);
    return (
      <InteractiveContainer disabled={disabled}>
        <div
          class={{
            checked,
            container: true,
            [CSS.description]: Boolean(description),
            [CSS.descriptionOnly]: Boolean(!heading && !icon && description),
            disabled,
            focused,
            [CSS.heading]: Boolean(heading),
            [CSS.headingOnly]: heading && !icon && !description,
            [CSS.icon]: renderIcon,
            [CSS.iconOnly]: !heading && icon && !description,
            [CSS.inputAlignmentEnd]: inputAlignment === "end",
            [CSS.inputAlignmentStart]: inputAlignment === "start",
            [CSS.inputEnabled]: inputEnabled,
            [CSS.largeVisual]: isLargeVisual,
            [CSS.widthAuto]: width === "auto",
            [CSS.widthFull]: width === "full",
          }}
        >
          <div class={{ [CSS.tile]: true, [CSS.tileLargeVisual]: isLargeVisual }}>
            {icon && (
              <div class={{ [CSS.icon]: renderIcon }}>
                <calcite-icon flipRtl={iconFlipRtl} icon={icon} scale="l" />
              </div>
            )}
            <div class={CSS.tileContentContainer}>
              <div class={CSS.tileContent}>
                {heading && <div class={CSS.tileHeading}>{heading}</div>}
                {description && <div class={CSS.tileDescription}>{description}</div>}
              </div>
            </div>
          </div>
          <slot />
        </div>
      </InteractiveContainer>
    );
  }

  // #endregion
}
