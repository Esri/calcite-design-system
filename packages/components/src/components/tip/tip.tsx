// @ts-strict-ignore
import { LitElement, property, createEvent, Fragment, h, state, JsxNode } from "@arcgis/lumina";
import { constrainHeadingLevel, Heading, HeadingLevel } from "../functional/Heading";
import { logger } from "../../utils/logger";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { useT9n } from "../../controllers/useT9n";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS, SLOTS } from "./resources";
import { styles } from "./tip.scss";

declare global {
  interface DeclareElements {
    "calcite-tip": Tip;
  }
}

/**
 * @deprecated Use the `calcite-card`, `calcite-notice`, `calcite-panel`, or `calcite-tile` component instead.
 * @slot - A slot for adding text and a hyperlink.
 * @slot thumbnail - A slot for adding an HTML image element.
 */
export class Tip extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  //#endregion

  //#region State Properties

  @state() hasThumbnail = false;

  //#endregion

  //#region Public Properties

  /** When `true`, the close button is not present on the component. */
  @property({ reflect: true }) closeDisabled = false;

  /** When `true`, the component does not display. */
  @property({ reflect: true }) closed = false;

  /** The component header text. */
  @property() heading: string;

  /** Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling. */
  @property({ type: Number, reflect: true }) headingLevel: HeadingLevel;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * When `true`, the component is selected if it has a parent `calcite-tip-manager`.
   *
   * Only one tip can be selected within the `calcite-tip-manager` parent.
   */
  @property({ reflect: true }) selected = false;

  //#endregion

  //#region Events

  /** Emits when the component has been closed. */
  calciteTipDismiss = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  async load(): Promise<void> {
    logger.deprecated("component", {
      name: "tip",
      removalVersion: 4,
      suggested: ["card", "notice", "panel", "tile"],
    });
  }

  //#endregion

  //#region Private Methods

  private hideTip(): void {
    this.closed = true;

    this.calciteTipDismiss.emit();
  }

  private handleThumbnailSlotChange(event: Event): void {
    this.hasThumbnail = slotChangeHasAssignedElement(event);
  }

  //#endregion

  //#region Rendering

  private renderHeader(): JsxNode {
    const { heading, headingLevel, el } = this;
    const parentLevel = el.closest("calcite-tip-manager")?.headingLevel;
    const relativeLevel = parentLevel ? constrainHeadingLevel(parentLevel + 1) : null;
    const level = headingLevel || relativeLevel;

    return heading ? (
      <header class={CSS.header}>
        <Heading class={CSS.heading} level={level}>
          {heading}
        </Heading>
      </header>
    ) : null;
  }

  private renderDismissButton(): JsxNode {
    const { closeDisabled, hideTip } = this;
    return !closeDisabled ? (
      <calcite-action
        class={CSS.close}
        icon={ICONS.close}
        onClick={hideTip}
        scale="l"
        text={this.messages.close}
      />
    ) : null;
  }

  private renderImageFrame(): JsxNode {
    return (
      <div class={CSS.imageFrame} hidden={!this.hasThumbnail} key="thumbnail">
        <slot name={SLOTS.thumbnail} onSlotChange={this.handleThumbnailSlotChange} />
      </div>
    );
  }

  private renderInfoNode(): JsxNode {
    return (
      <div class={{ [CSS.info]: true, [CSS.infoNoThumbnail]: !this.hasThumbnail }}>
        <slot />
      </div>
    );
  }

  private renderContent(): JsxNode {
    return (
      <div class={CSS.content}>
        {this.renderImageFrame()}
        {this.renderInfoNode()}
      </div>
    );
  }

  override render(): JsxNode {
    return (
      <>
        <article class={CSS.container}>
          {this.renderHeader()}
          {this.renderContent()}
        </article>
        {this.renderDismissButton()}
      </>
    );
  }

  //#endregion
}
