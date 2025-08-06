import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, JsxNode } from "@arcgis/lumina";
import { Appearance, Position, IconType, Scale, SelectionMode } from "../interfaces";
import { createObserver } from "../../utils/observers";
import { RequestedItem } from "./interfaces";
import { CSS } from "./resources";
import { styles } from "./accordion.scss";

declare global {
  interface DeclareElements {
    "calcite-accordion": Accordion;
  }
}
/** @slot - A slot for adding `calcite-accordion-item`s. `calcite-accordion` cannot be nested, however `calcite-accordion-item`s can. */
export class Accordion extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private mutationObserver = createObserver("mutation", () => this.updateAccordionItems());

  // #endregion

  // #region Public Properties

  /** Specifies the appearance of the component. */
  @property({ reflect: true }) appearance: Extract<"solid" | "transparent", Appearance> = "solid";

  /** Specifies the placement of the icon in the header. */
  @property({ reflect: true }) iconPosition: Extract<"start" | "end", Position> = "end";

  /** Specifies the type of the icon in the header. */
  @property({ reflect: true }) iconType: Extract<"chevron" | "caret" | "plus-minus", IconType> =
    "chevron";

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the selection mode of the component, where:
   *
   * `"multiple"` allows any number of selections,
   *
   * `"single"` allows only one selection, and
   *
   * `"single-persist"` allows one selection and prevents de-selection.
   */
  @property({ reflect: true }) selectionMode: Extract<
    "single" | "single-persist" | "multiple",
    SelectionMode
  > = "multiple";

  // #endregion

  // #region Events

  /** @private */
  private calciteInternalAccordionChange = createEvent<RequestedItem>({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalAccordionItemSelect", this.updateActiveItemOnChange);
  }

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true });
    this.updateAccordionItems();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("appearance") && (this.hasUpdated || this.appearance !== "solid")) ||
      (changes.has("iconPosition") && (this.hasUpdated || this.iconPosition !== "end")) ||
      (changes.has("iconType") && (this.hasUpdated || this.iconType !== "chevron")) ||
      (changes.has("scale") && (this.hasUpdated || this.scale !== "m")) ||
      (changes.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "multiple"))
    ) {
      this.updateAccordionItems();
    }
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  // #endregion

  // #region Private Methods
  private updateActiveItemOnChange(event: CustomEvent): void {
    this.calciteInternalAccordionChange.emit({
      requestedAccordionItem: event.detail.requestedAccordionItem,
    });
    event.stopPropagation();
  }

  private updateAccordionItems(): void {
    this.el.querySelectorAll("calcite-accordion-item").forEach((item) => {
      item.appearance = this.appearance;
      item.iconPosition = this.iconPosition;
      item.iconType = this.iconType;
      item.scale = this.scale;
    });

    // sync props on items across shadow DOM
    document.dispatchEvent(new CustomEvent("calciteInternalAccordionItemsSync"));
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const transparent = this.appearance === "transparent";
    return (
      <div
        class={{
          [CSS.transparent]: transparent,
          [CSS.accordion]: !transparent,
        }}
      >
        <slot />
      </div>
    );
  }

  // #endregion
}
