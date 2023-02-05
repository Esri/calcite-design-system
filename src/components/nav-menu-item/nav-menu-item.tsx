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
import { filterDirectChildren, getElementDir, getSlotted } from "../../utils/dom";

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

  @Prop({ reflect: true, mutable: true }) iconStart?: string;

  @Prop({ reflect: true, mutable: true }) iconEnd?: string;

  @Prop({ mutable: true }) iconFlipRtl?: FlipContext;

  @Prop({ mutable: true }) textEnabled?: boolean;

  @Prop({ reflect: true, mutable: true }) text?: string;

  @Prop({ reflect: true, mutable: true }) subText?: string;

  // remove reflect and move style to class
  @Prop({ mutable: true, reflect: true }) layout?: "horizontal" | "vertical" = "horizontal";

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  @Listen("click", { target: "window" })
  handleClickOut(event: Event): void {
    if (
      this.nestedParentType !== "vertical" &&
      this.hasSlottedDropdownMenuItems &&
      this.slottedDropdownMenuItemsOpen &&
      !this.el.contains(event.target as Element)
    ) {
      this.slottedDropdownMenuItemsOpen = false;
    }
  }

  // todo events
  @Event() calciteMenuItemSelected: EventEmitter<any>;

  @Prop({ mutable: true }) editingActive = false;

  @State() hasSlottedDropdownMenuItems: boolean;

  @State() slottedDropdownMenuItemsOpen: boolean;

  // for multiple levels of nesting
  @State() isNestedDropdown: boolean;

  // need to track the parent type of layout to determine if the nested dropdown position absolutely (horizontal parent),
  // or position downward and expand relative (vertical parent)
  @State() nestedParentType: "vertical" | "horizontal";

  @State() dropdownMenuItems?: HTMLCalciteNavMenuItemElement[];

  connectedCallback() {
    this.active = this.active || this.editable;
    // todo - make this reactive to slot change, remove use of getSlotted
    // todo just get any nav items in the default slot?
    this.hasSlottedDropdownMenuItems = !!getSlotted(this.el, "menu-item-dropdown");
    this.dropdownMenuItems = getSlotted(this.el, "menu-item-dropdown", {
      all: true,
      matches: "calcite-nav-menu-item"
    }) as HTMLCalciteNavMenuItemElement[];
    // for now to detect nesting only working two level for demo.. need to just check if it has any parent originating at top lvel
    this.isNestedDropdown =
      this.el.parentElement?.slot === "" || this.el.parentElement?.slot === "menu-item-dropdown";

    this.nestedParentType = this.el.closest("calcite-nav-menu")?.layout;

    // todo determine indentation level to support fly out
    // ensure any items slotted as dropdown menu children are vertical mode
    this.dropdownMenuItems.map((el: HTMLCalciteNavMenuItemElement) => {
      el.layout = "vertical";
    });
  }

  renderIconElStart(): VNode {
    return (
      <calcite-icon
        class="icon icon-start"
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale="s"
      />
    );
  }

  renderIconElEnd(): VNode {
    return (
      <calcite-icon
        class="icon icon-end"
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale="s"
      />
    );
  }

  renderEditIcon(): VNode {
    return (
      <calcite-icon
        class="icon icon-end"
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={"pencil"}
        scale="s"
      />
    );
  }

  renderEditSaveButton(): VNode {
    return (
      <calcite-button
        appearance="outline-fill"
        style={{ ["--calcite-ui-icon-color"]: "var(--calcite-ui-brand)" }}
        icon-start="save"
        onClick={() => (this.editingActive = false)}
      />
    );
  }

  renderEditCancelButton(): VNode {
    return (
      <calcite-button
        appearance="transparent"
        icon-start="trash"
        style={{ ["--calcite-ui-icon-color"]: "var(--calcite-ui-border-input)" }}
        onClick={() => (this.editingActive = false)}
      />
    );
  }

  renderDropdownMenuItems(): VNode {
    const dir = getElementDir(this.el);
    return (
      <div
        class={`dropdown-menu-items ${this.slottedDropdownMenuItemsOpen ? "open" : ""} ${
          this.isNestedDropdown ? "nested" : ""
        }${dir === "rtl" ? " is-rtl" : ""}${
          this.nestedParentType === "vertical" ? " is-vertical-dropdown-type" : ""
        }`}
      >
        <slot name="menu-item-dropdown" />
      </div>
    );
  }

  renderBreadcrumbChevron(): VNode {
    const dir = getElementDir(this.el);
    const dirChevron = dir === "rtl" ? "chevron-left" : "chevron-right";
    return <calcite-icon class="icon icon-breadcrumb" icon={dirChevron} scale="s" />;
  }

  renderDirChevron(): VNode {
    const dir = getElementDir(this.el);
    const dirChevron = dir === "rtl" ? "chevron-left" : "chevron-right";
    return (
      <calcite-icon
        class="icon icon-dropdown"
        icon={
          this.slottedDropdownMenuItemsOpen &&
          (!this.isNestedDropdown || this.nestedParentType === "vertical")
            ? "chevron-up"
            : !this.isNestedDropdown || this.nestedParentType === "vertical"
            ? "chevron-down"
            : // and not vertical
            this.isNestedDropdown
            ? dirChevron
            : dirChevron
        }
        scale="s"
      />
    );
  }

  renderDirDropdownAction(): VNode {
    const dir = getElementDir(this.el);
    const dirChevron = dir === "rtl" ? "chevron-left" : "chevron-right";
    return (
      <calcite-action
        icon={
          this.slottedDropdownMenuItemsOpen &&
          (!this.isNestedDropdown || this.nestedParentType === "vertical")
            ? "chevron-up"
            : !this.isNestedDropdown || this.nestedParentType === "vertical"
            ? "chevron-down"
            : // and not vertical
            this.isNestedDropdown
            ? dirChevron
            : dirChevron
        }
        text="open-dropdown"
        class="dropdown-with-href-toggle"
        onClick={() => {
          if (this.hasSlottedDropdownMenuItems) {
            this.slottedDropdownMenuItemsOpen = !this.slottedDropdownMenuItemsOpen;
          }
        }}
      />
    );
  }

  // todo inline event handling for menu, etc., very temp below:
  // todo support multiple levels of slotting like tree - menu dropdown moves out from item on right - post mvp but should be simple to accomplish
  render() {
    const itemContent = (
      <Fragment>
        {this.iconStart && this.renderIconElStart()}
        <div class="text-container">
          <span contenteditable={this.editingActive ? true : undefined}>
            {this.text && this.textEnabled && this.text ? this.text : null}
          </span>
          {this.href && this.isNestedDropdown && this.hasSlottedDropdownMenuItems ? (
            <calcite-icon class="icon icon-link-when-dropdown" icon={"chevrons-right"} scale="s" />
          ) : null}
        </div>
        {this.editingActive ? (
          <div class="editable-content">
            {this.renderEditCancelButton()}
            {this.renderEditSaveButton()}
          </div>
        ) : null}
        {/* handle subtext display */}
        {this.iconEnd && !this.editingActive && this.renderIconElEnd()}
        {this.editable && !this.editingActive && this.renderEditIcon()}
        {!this.href && this.hasSlottedDropdownMenuItems ? this.renderDirChevron() : null}
        {this.breadcrumb ? this.renderBreadcrumbChevron() : null}
      </Fragment>
    );

    return (
      <Host tabindex={0}>
        <div
          class={`container ${
            this.nestedParentType === "vertical" ? "nav-item-vertical-parent" : ""
          }`}
        >
          <div class="item-content">
            <Fragment>
              <a
                tabindex={-1}
                href={this.href ? this.href : null}
                onClick={(ev) => {
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
            </Fragment>

            {this.href && this.hasSlottedDropdownMenuItems ? this.renderDirDropdownAction() : null}
          </div>
          {this.hasSlottedDropdownMenuItems ? this.renderDropdownMenuItems() : null}
        </div>
      </Host>
    );
  }
}
