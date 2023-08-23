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
import { getElementProp, toAriaBoolean } from "../../utils/dom";
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
  }

  render(): VNode {
    const scale = getElementProp(this.el, "scale", this.scale);
    const { href, selectionMode, label, iconFlipRtl } = this;
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
      <Host aria-checked={itemAria} aria-label={!href ? label : ""} role={itemRole} tabindex="0">
        <div
          class={{
            container: true,
            [CSS.containerLink]: !!href,
            [CSS.containerSmall]: scale === "s",
            [CSS.containerMedium]: scale === "m",
            [CSS.containerLarge]: scale === "l",
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

  /** what selection mode is the parent dropdown group in */
  private selectionMode: Extract<"none" | "single" | "multiple", SelectionMode>;

  /** if href is requested, track the rendered child link*/
  private childLink: HTMLAnchorElement;

  /** Specifies the scale of dropdown-item controlled by the parent, defaults to m */
  scale: Scale = "m";

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private initialize(): void {
    this.selectionMode = getElementProp(this.el, "selection-mode", "single");
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
