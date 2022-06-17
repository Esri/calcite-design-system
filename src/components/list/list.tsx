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
   * todo: document label
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
        <tbody class={CSS.container} onFocusin={this.handleFocusIn}>
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

  handleFocusIn = (event: FocusEvent): void => {
    const composedPath = event.composedPath();
    const { listItems } = this;
    const reversedItems = [...listItems].reverse();

    const firstActiveItem = reversedItems.find((listItem) => composedPath.includes(listItem));

    listItems.forEach((listItem) => (listItem.active = listItem === firstActiveItem));
  };

  handleListKeydown = (event: KeyboardEvent): void => {
    const { key } = event;
    const { listItems } = this;

    const currentIndex = listItems.findIndex((listItem) => listItem.active);

    if (key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = currentIndex + 1;

      if (listItems[nextIndex]) {
        this.focusRow(listItems[nextIndex]);
      }
    } else if (key === "ArrowUp") {
      event.preventDefault();
      const prevIndex = currentIndex - 1;

      if (listItems[prevIndex]) {
        this.focusRow(listItems[prevIndex]);
      }
    } else if (key === "Home") {
      event.preventDefault();
      const homeItem = listItems[0];

      if (homeItem) {
        this.focusRow(homeItem);
      }
    } else if (key === "End") {
      event.preventDefault();
      const endItem = listItems[listItems.length - 1];

      if (endItem) {
        this.focusRow(endItem);
      }
    }
  };
}
