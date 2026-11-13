import type { PropertyValues } from "lit";
import { LitElement, h, JsxNode, property } from "@arcgis/lumina";
import type { Affix, UseAffixWidth } from "../../controllers/useAffixWidth";
import { slotChangeGetAssignedElements } from "../../utils/dom";
import { CSS } from "./resources";
import { styles } from "./field-group.scss";

type Layout = "columns" | "horizontal" | "vertical";
type Columns = 1 | 2 | 3 | 4 | 5 | 6;

type AffixInput = LitElement & { affixWidth?: UseAffixWidth };

declare global {
  interface DeclareElements {
    "calcite-field-group": FieldGroup;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * When `layout` is `"columns"`, specifies the component's number of columns.
     */
    "--calcite-field-group-columns": "*";
    /**
     * When `layout` is `"columns"`, specifies the component's column gap.
     */
    "--calcite-field-group-column-gap": "*";
    /**
     * Specifies the gap between the component's slotted elements.
     */
    "--calcite-field-group-gap": "*";
  }
}

/**
 * @slot - A slot for adding controls, `calcite-field-group`, and `calcite-field-set` components.
 */
export class FieldGroup extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private affixWidthRequestId = 0;

  private affixInputs: AffixInput[] = [];

  //#endregion

  //#region Public Properties

  /** When `layout` is `"columns"`, specifies the number of columns in the component. */
  @property({ type: Number, reflect: true }) columns?: Columns;

  /** Defines the component's layout. */
  @property({ reflect: true }) layout: Layout = "vertical";

  /** When `true`, slotted `calcite-input` prefixes share the same width. */
  @property({ reflect: true }) prefixAutoWidth = false;

  /** When `true`, slotted `calcite-input` suffixes share the same width. */
  @property({ reflect: true }) suffixAutoWidth = false;

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalAffixChange", this.handleAffixChange);
  }

  override updated(changes: PropertyValues<this>): void {
    if (changes.has("prefixAutoWidth") || changes.has("suffixAutoWidth")) {
      void this.syncInputsAffixWidths();
    }
  }

  //#endregion

  //#region Private Methods

  private collectOwnedAffixInputs(element: HTMLElement): AffixInput[] {
    if ("affixWidth" in element) {
      return [element as AffixInput];
    }

    if (element.matches("calcite-field-group")) {
      return [];
    }

    return Array.from(element.children).flatMap((child) =>
      this.collectOwnedAffixInputs(child as HTMLElement),
    );
  }

  private handleSlotChange(event: Event): void {
    const slottedElements = slotChangeGetAssignedElements<HTMLElement>(event);

    this.affixInputs = slottedElements.flatMap((element) => this.collectOwnedAffixInputs(element));

    void this.syncInputsAffixWidths();
  }

  private handleAffixChange(event: Event): void {
    event.stopPropagation();
    void this.syncInputsAffixWidths();
  }

  private async syncInputsAffixWidths(): Promise<void> {
    const requestId = ++this.affixWidthRequestId;
    const inputs = this.affixInputs;
    const affixes: Affix[] = ["prefix", "suffix"];

    await Promise.all(
      inputs.map(async (input) => {
        await input.componentOnReady();
        await input.updateComplete;
      }),
    );

    if (requestId !== this.affixWidthRequestId) {
      return;
    }

    for (const affix of affixes) {
      inputs.forEach((input) => input.affixWidth?.setAffixWidth(affix, undefined));
    }

    const measurements = affixes
      .filter((affix) => (affix === "prefix" ? this.prefixAutoWidth : this.suffixAutoWidth))
      .map((affix) => {
        const widths = inputs.map((input) => {
          const provider = input.affixWidth;
          const trailingWidth = provider?.getTrailingWidth(affix) ?? 0;

          return {
            provider,
            trailingWidth,
            width: (provider?.getAffixWidth(affix) ?? 0) + trailingWidth,
          };
        });

        return { affix, widths, nextWidth: Math.max(0, ...widths.map(({ width }) => width)) };
      });

    for (const { affix, widths, nextWidth } of measurements) {
      if (nextWidth) {
        widths.forEach(({ provider, trailingWidth }) => {
          provider?.setAffixWidth(affix, nextWidth - trailingWidth);
        });
      }
    }
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
      <div
        class={{
          [CSS.container]: true,
          [CSS.containerColumns]: this.layout === "columns",
          [CSS.containerHorizontal]: this.layout === "horizontal",
          [CSS.containerVertical]: this.layout === "vertical",
        }}
        style={{ "--calcite-internal-field-group-columns": this.columns }}
      >
        <slot onSlotChange={this.handleSlotChange} />
      </div>
    );
  }

  //#endregion
}
