import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Host,
  Listen,
  Prop,
  State,
  VNode
} from "@stencil/core";
import { FlipContext } from "../interfaces";
import { filterDirectChildren, getSlotted } from "../../utils/dom";

@Component({
  tag: "calcite-nav-menu-item",
  styleUrl: "nav-menu-item.scss",
  shadow: true
})
export class CalciteNavMenuItem {
  @Element() el!: HTMLCalciteNavMenuItemElement;

  @Prop({ reflect: true }) href?;

  @Prop({ reflect: true, mutable: true }) breadcrumb?: boolean = false;

  @Prop({ reflect: true, mutable: true }) active: boolean;

  @Prop({ reflect: true, mutable: true }) editable: boolean;

  @Prop({ reflect: true, mutable: true }) isTitle: boolean;

  @Prop({ reflect: true, mutable: true }) iconStart?: string;

  @Prop({ reflect: true, mutable: true }) iconEnd?: string;

  @Prop({ mutable: true }) iconFlipRtl?: FlipContext;

  @Prop({ mutable: true }) textEnabled?: boolean;

  @Prop({ reflect: true, mutable: true }) text?: string;

  @Prop({ reflect: true, mutable: true }) subText?: string;

  @Prop({ reflect: true, mutable: true }) layout?: "horizontal" | "vertical" = "horizontal";

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  @Listen("click", { target: "window" })
  handleClickOut(event: Event): void {
    if (
      this.hasSlottedDropdownMenuItems &&
      this.slottedDropdownMenuItemsOpen &&
      !this.el.contains(event.target as Element)
    ) {
      this.slottedDropdownMenuItemsOpen = false;
    }
  }

  // todo events
  @Event() calciteMenuItemSelected: EventEmitter<any>;

  @Prop() editingActive = false;

  @State() hasSlottedDropdownMenuItems: boolean;

  @State() slottedDropdownMenuItemsOpen: boolean;

  // for multiple levels of nesting
  @State() isNestedDropdown: boolean;

  @State() dropdownMenuItems?: HTMLCalciteNavMenuItemElement[];

  connectedCallback() {
    // todo - make this reactive to slot change, remove use of getSlotted
    // todo just get any nav items in the default slot?
    this.hasSlottedDropdownMenuItems = !!getSlotted(this.el, "menu-item-dropdown");
    this.dropdownMenuItems = getSlotted(this.el, "menu-item-dropdown", {
      all: true,
      matches: "calcite-nav-menu-item"
    }) as HTMLCalciteNavMenuItemElement[];
    // for now to detect nesting only working two level for demo.. need to just check if it has any parent originating at top lvel
    this.isNestedDropdown = this.el.parentElement.slot === "";

    // todo determine indentation level to support fly out
    // ensure any items slotted as dropdown menu children are vertical mode
    this.dropdownMenuItems.map((el: HTMLCalciteNavMenuItemElement) => {
      el.layout = "vertical";
    });
  }

  renderIconElStart(): VNode {
    return (
      <calcite-icon
        class="icon-start"
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale="s"
      />
    );
  }

  renderIconElEnd(): VNode {
    return (
      <calcite-icon
        class="icon-end"
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale="s"
      />
    );
  }

  renderEditIcon(): VNode {
    return (
      <calcite-icon
        class="icon-end"
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={"pencil"}
        scale="s"
      />
    );
  }

  renderEditSaveButton(): VNode {
    return (
      <calcite-button
        color="neutral"
        icon-start="save"
        onClick={() => (this.editingActive = !this.editingActive)}
        slot="action"
      />
    );
  }

  renderEditCancelButton(): VNode {
    return (
      <calcite-button
        appearance="transparent"
        color="neutral"
        icon-start="trash"
        onClick={() => (this.editingActive = !this.editingActive)}
        slot="action"
        style={{ "--calcite-ui-icon-color": "var(--calcite-ui-text-3)" }}
      />
    );
  }

  renderDropdownMenuItems(): VNode {
    return (
      <div
        class={`dropdown-menu-items ${this.slottedDropdownMenuItemsOpen ? "open" : ""} ${
          this.isNestedDropdown ? "nested" : ""
        }`}
      >
        <slot name="menu-item-dropdown" />
      </div>
    );
  }

  // todo inline event handling for menu, etc., very temp below:
  // todo support multiple levels of slotting like tree - menu dropdown moves out from item on right - post mvp but should be simple to accomplish
  render() {
    const itemContent = (
      <Fragment>
        {this.iconStart && this.renderIconElStart()}
        {!this.editingActive && this.text && this.textEnabled && this.text && this.isTitle
          ? this.text
          : this.text && this.textEnabled && this.text
          ? this.text
          : null}
        {/* handle subtext display */}
        {this.iconEnd && !this.editingActive && this.renderIconElEnd()}
        {this.editable && !this.editingActive && this.renderEditIcon()}
        {!this.href && this.hasSlottedDropdownMenuItems ? (
          <calcite-icon
            class="icon icon-dropdown"
            icon={
              this.slottedDropdownMenuItemsOpen && !this.isNestedDropdown
                ? "chevron-up"
                : !this.isNestedDropdown
                ? "chevron-down"
                : // and not vertical
                this.isNestedDropdown
                ? "chevron-right"
                : "chevron-right"
            }
            scale="s"
          />
        ) : null}
        {this.breadcrumb ? (
          <calcite-icon class="icon icon-breadcrumb" icon="chevron-right" scale="s" />
        ) : null}
      </Fragment>
    );

    return (
      <Host tabindex={0}>
        {this.text && this.editable && this.editingActive ? (
          <div class="editable-content">
            <calcite-input clearable placeholder={this.text} scale="l" value={this.text}>
              {this.renderEditCancelButton()}
              {this.renderEditSaveButton()}
            </calcite-input>
          </div>
        ) : (
          <Fragment>
            <a
              tabindex={-1}
              href={this.href ? this.href : null}
              onClick={() => {
                if (!this.editable && !this.hasSlottedDropdownMenuItems) {
                  return;
                } else if (this.editable && !this.hasSlottedDropdownMenuItems) {
                  this.editingActive = true;
                } else if (!this.href && this.hasSlottedDropdownMenuItems) {
                  this.slottedDropdownMenuItemsOpen = !this.slottedDropdownMenuItemsOpen;
                }
              }}
              onKeyDown={(event) => {
                if (
                  (event.key === " " || event.key === "enter") &&
                  !this.href &&
                  this.hasSlottedDropdownMenuItems
                )
                  this.slottedDropdownMenuItemsOpen = !this.slottedDropdownMenuItemsOpen;
              }}
            >
              {itemContent}
            </a>
            {this.href && this.hasSlottedDropdownMenuItems ? (
              <calcite-action
                icon={
                  this.slottedDropdownMenuItemsOpen && !this.isNestedDropdown
                    ? "chevron-up"
                    : !this.isNestedDropdown
                    ? "chevron-down"
                    : // and not vertical
                    this.isNestedDropdown
                    ? "chevron-right"
                    : "chevron-right"
                }
                text="open-dropdown"
                class="dropdown-with-href-toggle"
                onClick={() => {
                  if (this.hasSlottedDropdownMenuItems) {
                    this.slottedDropdownMenuItemsOpen = !this.slottedDropdownMenuItemsOpen;
                  }
                }}
              />
            ) : null}
          </Fragment>
        )}
        {this.hasSlottedDropdownMenuItems ? this.renderDropdownMenuItems() : null}
      </Host>
    );
  }
}
