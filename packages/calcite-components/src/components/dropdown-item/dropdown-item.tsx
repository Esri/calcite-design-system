import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  VNode,
} from "@stencil/core";
import { toAriaBoolean } from "../../utils/dom";
import { ItemKeyboardEvent } from "../dropdown/interfaces";
import { RequestedItem } from "../dropdown-group/interfaces";
import { FlipContext, Scale, SelectionMode } from "../interfaces";
import { CSS } from "./resources";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { guid } from "../../utils/guid";

/**
 * @slot - A slot for adding text.
 */
@Component({
  tag: "calcite-dropdown-item",
  styleUrl: "dropdown-item.scss",
  shadow: true,
})
export class DropdownItem implements LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, the component is selected. */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart: string;

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true }) iconEnd: string;

  /**
   *  Specifies the URL of the linked resource, which can be set as an absolute or relative path.
   *
   * Determines if the component will render as an anchor.
   */
  @Prop({ reflect: true }) href: string;

  /** Accessible name for the component. */
  @Prop() label: string;

  /** Specifies the relationship to the linked document defined in `href`. */
  @Prop({ reflect: true }) rel: string;

  /** Specifies the frame or window to open the linked document. */
  @Prop({ reflect: true }) target: string;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fires when the component is selected. */
  @Event({ cancelable: false }) calciteDropdownItemSelect: EventEmitter<void>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalDropdownItemSelect: EventEmitter<RequestedItem>;

  /** @internal */
  @Event({ cancelable: false })
  calciteInternalDropdownItemKeyEvent: EventEmitter<ItemKeyboardEvent>;

  /** @internal */
  @Event({ cancelable: false }) calciteInternalDropdownCloseRequest: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    this.el?.focus();
  }

  /**
   * Specifies the selection mode inherited from `calcite-dropdown-group`, defaults to `single`:
   * - `multiple` allows any number of selected items,
   * - `single` allows only one selection (default),
   * - `none` doesn't allow for any selection.
   *
   * @internal
   */
  @Prop() selectionMode: Extract<"none" | "single" | "multiple", SelectionMode> = "single";

  /**
   * Specifies the size of the component inherited from `calcite-dropdown`, defaults to `m`.
   *
   * @internal
   */
  @Prop() scale: Scale = "m";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    setUpLoadableComponent(this);
    this.initialize();
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  connectedCallback(): void {
    this.initialize();
    this.el.setAttribute("id", this.el.getAttribute("id") || `dropdown-item-${guid()}`);
  }

  render(): VNode {
    const { href, selectionMode, label, iconFlipRtl, scale } = this;

    const iconStartEl = (
      <calcite-icon
        class={CSS.iconStart}
        flipRtl={iconFlipRtl === "start" || iconFlipRtl === "both"}
        icon={this.iconStart}
        scale={scale === "l" ? "m" : "s"}
      />
    );
    const contentNode = (
      <span class={CSS.itemContent}>
        <slot />
      </span>
    );
    const iconEndEl = (
      <calcite-icon
        class={CSS.iconEnd}
        flipRtl={iconFlipRtl === "end" || iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale={scale === "l" ? "m" : "s"}
      />
    );

    const slottedContent =
      this.iconStart && this.iconEnd
        ? [iconStartEl, contentNode, iconEndEl]
        : this.iconStart
        ? [iconStartEl, contentNode]
        : this.iconEnd
        ? [contentNode, iconEndEl]
        : contentNode;

    const contentEl = !href ? (
      slottedContent
    ) : (
      <a
        aria-label={label}
        class={CSS.link}
        href={href}
        rel={this.rel}
        tabIndex={-1}
        target={this.target}
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={(el) => (this.childLink = el)}
      >
        {slottedContent}
      </a>
    );

    const itemRole = href
      ? null
      : selectionMode === "single"
      ? "menuitemradio"
      : selectionMode === "multiple"
      ? "menuitemcheckbox"
      : "menuitem";

    const itemAria = selectionMode !== "none" ? toAriaBoolean(this.selected) : null;

    return (
      <Host aria-checked={itemAria} aria-label={!href ? label : ""} role={itemRole} tabindex="-1">
        <div
          class={{
            [CSS.container]: true,
            [CSS.containerLink]: !!href,
            [`${CSS.container}--${scale}`]: true,
            [CSS.containerMulti]: selectionMode === "multiple",
            [CSS.containerSingle]: selectionMode === "single",
            [CSS.containerNone]: selectionMode === "none",
          }}
        >
          {selectionMode !== "none" ? (
            <calcite-icon
              class={CSS.icon}
              icon={selectionMode === "multiple" ? "check" : "bullet-point"}
              scale={scale === "l" ? "m" : "s"}
            />
          ) : null}
          {contentEl}
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click") onClick(): void {
    this.emitRequestedItem();
  }

  @Listen("keydown")
  keyDownHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case " ":
      case "Enter":
        this.emitRequestedItem();
        if (this.href) {
          this.childLink.click();
        }
        event.preventDefault();
        break;
      case "Escape":
        this.calciteInternalDropdownCloseRequest.emit();
        event.preventDefault();
        break;
      case "Tab":
        this.calciteInternalDropdownItemKeyEvent.emit({ keyboardEvent: event });
        break;
      case "ArrowUp":
      case "ArrowDown":
      case "Home":
      case "End":
        event.preventDefault();
        this.calciteInternalDropdownItemKeyEvent.emit({ keyboardEvent: event });
        break;
    }
  }

  @Listen("calciteInternalDropdownItemChange", { target: "body" })
  updateActiveItemOnChange(event: CustomEvent): void {
    const parentEmittedChange = event.composedPath().includes(this.parentDropdownGroupEl);

    if (parentEmittedChange) {
      this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
      this.requestedDropdownItem = event.detail.requestedDropdownItem;
      this.determineActiveItem();
    }
    event.stopPropagation();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteDropdownItemElement;

  /** id of containing group */
  private parentDropdownGroupEl: HTMLCalciteDropdownGroupElement;

  /** requested group */
  private requestedDropdownGroup: HTMLCalciteDropdownGroupElement;

  /** requested item */
  private requestedDropdownItem: HTMLCalciteDropdownItemElement;

  /** if href is requested, track the rendered child link*/
  private childLink: HTMLAnchorElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private initialize(): void {
    this.parentDropdownGroupEl = this.el.closest("calcite-dropdown-group");
    if (this.selectionMode === "none") {
      this.selected = false;
    }
  }

  private determineActiveItem(): void {
    switch (this.selectionMode) {
      case "multiple":
        if (this.el === this.requestedDropdownItem) {
          this.selected = !this.selected;
        }
        break;

      case "single":
        if (this.el === this.requestedDropdownItem) {
          this.selected = true;
        } else if (this.requestedDropdownGroup === this.parentDropdownGroupEl) {
          this.selected = false;
        }
        break;

      case "none":
        this.selected = false;
        break;
    }
  }

  private emitRequestedItem(): void {
    this.calciteDropdownItemSelect.emit();
    this.calciteInternalDropdownItemSelect.emit({
      requestedDropdownItem: this.el,
      requestedDropdownGroup: this.parentDropdownGroupEl,
    });
  }
}
