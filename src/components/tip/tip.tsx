import { Component, Element, Event, EventEmitter, Prop, h, VNode, Fragment } from "@stencil/core";
import { CSS, ICONS, SLOTS, TEXT } from "./resources";
import { getSlotted } from "../../utils/dom";
import { HeadingLevel, Heading, constrainHeadingLevel } from "../functional/Heading";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";

/**
 * @slot - A slot for adding text and a hyperlink.
 * @slot thumbnail - A slot for adding an HTML image element.
 */
@Component({
  tag: "calcite-tip",
  styleUrl: "tip.scss",
  shadow: true
})
export class Tip implements ConditionalSlotComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------
  /**
   * When `true`, the component does not display.
   */
  @Prop({ reflect: true, mutable: true }) dismissed = false;

  /**
   * When `true`, the close button is not present on the component.
   */
  @Prop({ reflect: true }) closeDisabled = false;

  /**
   * The component header text.
   */
  @Prop() heading: string;

  /**
   * Specifies the number at which section headings should start.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /**
   * When `true`, the component is selected if it has a parent `calcite-tip-manager`.
   *
   * Only one tip can be selected within the `calcite-tip-manager` parent.
   */
  @Prop({ reflect: true }) selected = false;

  /**
   * Accessible name for the component's close button.
   */
  @Prop() intlClose: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteTipElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emits when the component has been dismissed.
   */
  @Event({ cancelable: false }) calciteTipDismiss: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  hideTip = (): void => {
    this.dismissed = true;

    this.calciteTipDismiss.emit();
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderHeader(): VNode {
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

  renderDismissButton(): VNode {
    const { closeDisabled, hideTip, intlClose } = this;

    const text = intlClose || TEXT.close;

    return !closeDisabled ? (
      <calcite-action
        class={CSS.close}
        icon={ICONS.close}
        onClick={hideTip}
        scale="l"
        text={text}
      />
    ) : null;
  }

  renderImageFrame(): VNode {
    const { el } = this;

    return getSlotted(el, SLOTS.thumbnail) ? (
      <div class={CSS.imageFrame} key="thumbnail">
        <slot name={SLOTS.thumbnail} />
      </div>
    ) : null;
  }

  renderInfoNode(): VNode {
    return (
      <div class={CSS.info}>
        <slot />
      </div>
    );
  }

  renderContent(): VNode {
    return (
      <div class={CSS.content}>
        {this.renderImageFrame()}
        {this.renderInfoNode()}
      </div>
    );
  }

  render(): VNode {
    return (
      <Fragment>
        <article class={CSS.container}>
          {this.renderHeader()}
          {this.renderContent()}
        </article>
        {this.renderDismissButton()}
      </Fragment>
    );
  }
}
