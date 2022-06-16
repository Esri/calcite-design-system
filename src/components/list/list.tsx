import { Component, Element, h, VNode, Prop, Method } from "@stencil/core";
import { CSS } from "./resources";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { createObserver } from "../../utils/observers";

/**
 * A general purpose list that enables users to construct list items that conform to Calcite styling.
 *
 * @slot - A slot for adding `calcite-list-item` elements.
 */
@Component({
  tag: "calcite-list",
  styleUrl: "list.scss",
  shadow: true
})
export class List implements InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When true, prevents user interaction.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * todo: label
   */
  @Prop() label = "";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.updateListItems();
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteListElement;

  listItems: HTMLCalciteListItemElement[] = [];

  mutationObserver = createObserver("mutation", () => this.updateListItems());

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    this.el.querySelector("calcite-list-item")?.setFocus();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <table aria-label={this.label} onKeyDown={this.handleListKeydown} role="treegrid">
        <tbody class={CSS.container}>
          <slot />
        </tbody>
      </table>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  setActiveListItem = (): void => {
    const { listItems } = this;

    if (!listItems.some((item) => item.active)) {
      if (listItems[0]) {
        listItems[0].active = true;
      }
    }
  };

  updateListItems = (): void => {
    this.listItems = this.queryListItems();
    this.setActiveListItem();
  };

  queryListItems = (): HTMLCalciteListItemElement[] => {
    return Array.from(this.el.querySelectorAll("calcite-list-item")).filter(
      (item) => !item.disabled
    );
  };

  focusRow = (focusEl: HTMLCalciteListItemElement): void => {
    const { listItems } = this;

    if (!focusEl) {
      return;
    }

    listItems.forEach((listItem) => (listItem.active = listItem === focusEl));

    focusEl.setFocus();
  };

  handleListKeydown = (event: KeyboardEvent): void => {
    const { key } = event;
    const { listItems } = this;

    const activeIndex = listItems.findIndex((listItem) => listItem.active);

    if (key === "ArrowDown") {
      this.focusRow(listItems[activeIndex + 1]);
      event.preventDefault();
    } else if (key === "ArrowUp") {
      this.focusRow(listItems[activeIndex - 1]);
      event.preventDefault();
    } else if (key === "Home") {
      this.focusRow(listItems[0]);
      event.preventDefault();
    } else if (key === "End") {
      this.focusRow(listItems[listItems.length - 1]);
      event.preventDefault();
    }
  };
}
