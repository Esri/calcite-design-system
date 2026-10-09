import type { PropertyValues } from "lit";
import { LitElement, h, JsxNode, property } from "@arcgis/lumina";
import type { Affix, UseAffixWidth } from "../../controllers/useAffixWidth";
import { nextFrame, slotChangeGetAssignedElements } from "../../utils/dom";
import { CSS } from "./resources";
import { styles } from "./field-group.scss";

type Layout = "columns" | "horizontal" | "vertical";
type Columns = 1 | 2 | 3 | 4 | 5 | 6;

type AffixInput = HTMLElement & { affixElementProvider?: UseAffixWidth };

declare global {
  interface DeclareElements {
    "calcite-field-group": FieldGroup;
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

  private affixWidthRequestIds = {
    prefix: 0,
    suffix: 0,
  };

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
    this.listen("calciteInternalInputAffixChange", this.handleAffixChange);
  }

  override updated(changes: PropertyValues<this>): void {
    if (changes.has("prefixAutoWidth") || changes.has("suffixAutoWidth")) {
      void this.syncInputsAffixWidths();
    }
  }

  //#endregion

  //#region Private Methods

  private collectOwnedAffixInputs(element: HTMLElement): AffixInput[] {
    if ("affixElementProvider" in element) {
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

  private async getInputAffixWidth(input: AffixInput, affix: Affix): Promise<number> {
    const readyInput = input as AffixInput & {
      componentOnReady?: () => Promise<void>;
      updateComplete?: Promise<unknown>;
    };

    await readyInput.componentOnReady?.();
    await readyInput.updateComplete;

    return input.affixElementProvider?.getAffixWidth(affix) ?? 0;
  }

  private getInputAffixTrailingWidth(input: AffixInput, affix: Affix): number {
    return input.affixElementProvider?.getTrailingWidth(affix) ?? 0;
  }

  private handleAffixChange(): void {
    void this.syncInputsAffixWidths();
  }

  private async syncInputAffixWidth(affix: Affix, shouldSync: boolean): Promise<void> {
    const requestId = ++this.affixWidthRequestIds[affix];
    const inputs = this.affixInputs;

    inputs.forEach((input) => {
      input.affixElementProvider?.setAffixWidth(affix, undefined);
    });

    if (!shouldSync) {
      return;
    }

    await nextFrame();

    if (requestId !== this.affixWidthRequestIds[affix]) {
      return;
    }

    const nextWidth = Math.max(
      0,
      ...(await Promise.all(
        inputs.map(
          async (input) =>
            (await this.getInputAffixWidth(input, affix)) +
            this.getInputAffixTrailingWidth(input, affix),
        ),
      )),
    );

    if (requestId !== this.affixWidthRequestIds[affix]) {
      return;
    }

    inputs.forEach((input) => {
      if (nextWidth) {
        input.affixElementProvider?.setAffixWidth(
          affix,
          nextWidth - this.getInputAffixTrailingWidth(input, affix),
        );
      }
    });
  }

  private async syncInputsAffixWidths(): Promise<void> {
    await nextFrame();
    await this.syncInputAffixWidth("prefix", this.prefixAutoWidth);
    await this.syncInputAffixWidth("suffix", this.suffixAutoWidth);
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
