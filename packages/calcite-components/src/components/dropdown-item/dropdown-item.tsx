// @ts-strict-ignore
import { createRef } from "lit-html/directives/ref.js";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  JsxNode,
  setAttribute,
} from "@arcgis/lumina";
import { toAriaBoolean } from "../../utils/dom";
import { ItemKeyboardEvent } from "../dropdown/interfaces";
import { RequestedItem } from "../dropdown-group/interfaces";
import { FlipContext, Scale, SelectionMode } from "../interfaces";
import { getIconScale } from "../../utils/component";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { IconNameOrString } from "../icon/interfaces";
import type { DropdownGroup } from "../dropdown-group/dropdown-group";
import { useSetFocus } from "../../controllers/useSetFocus";
import { CSS } from "./resources";
import { styles } from "./dropdown-item.scss";

declare global {
  interface DeclareElements {
    "calcite-dropdown-item": DropdownItem;
  }
}

/** @slot - A slot for adding text. */
export class DropdownItem extends LitElement implements InteractiveComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  /** if href is requested, track the rendered child link */
  private childLink = createRef<HTMLAnchorElement>();

  /** id of containing group */
  private parentDropdownGroupEl: DropdownGroup["el"];

  /** requested group */
  private requestedDropdownGroup: DropdownGroup["el"];

  /** requested item */
  private requestedDropdownItem: DropdownItem["el"];

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * Specifies the URL of the linked resource, which can be set as an absolute or relative path.
   *
   * Determines if the component will render as an anchor.
   */
  @property({ reflect: true }) href: string;

  /** Specifies an icon to display at the end of the component. */
  @property({ reflect: true }) iconEnd: IconNameOrString;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @property({ reflect: true }) iconStart: IconNameOrString;

  /** Accessible name for the component. */
  @property() label: string;

  /** Specifies the relationship to the linked document defined in `href`. */
  @property({ reflect: true }) rel: string;

  /**
   * Specifies the size of the component inherited from `calcite-dropdown`, defaults to `m`.
   *
   * @private
   */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `true`, the component is selected. */
  @property({ reflect: true }) selected = false;

  /**
   * Specifies the selection mode inherited from `calcite-dropdown-group`, defaults to `single`:
   * - `multiple` allows any number of selected items,
   * - `single` allows only one selection (default),
   * - `none` doesn't allow for any selection.
   *
   * @private
   */
  @property() selectionMode: Extract<"none" | "single" | "multiple", SelectionMode> = "single";

  /** Specifies the frame or window to open the linked document. */
  @property({ reflect: true }) target: string;

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    return this.focusSetter(() => {
      return this.el;
    });
  }

  // #endregion

  // #region Events

  /** Fires when the component is selected. */
  calciteDropdownItemSelect = createEvent({ cancelable: false });

  /** @private */
  calciteInternalDropdownCloseRequest = createEvent({ cancelable: false });

  /** @private */
  calciteInternalDropdownItemKeyEvent = createEvent<ItemKeyboardEvent>({ cancelable: false });

  /** @private */
  calciteInternalDropdownItemSelect = createEvent<RequestedItem>({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("click", this.onClick);
    this.listen("keydown", this.keyDownHandler);
    this.listenOn<CustomEvent>(
      document.body,
      "calciteInternalDropdownItemChange",
      this.updateActiveItemOnChange,
    );
  }

  override connectedCallback(): void {
    this.initialize();
  }

  load(): void {
    this.initialize();
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  // #endregion

  // #region Private Methods

  private onClick(): void {
    this.emitRequestedItem();
  }

  private keyDownHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case " ":
      case "Enter":
        this.emitRequestedItem();
        if (this.href) {
          this.childLink.value.click();
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

  private updateActiveItemOnChange(event: CustomEvent): void {
    const parentEmittedChange = event.composedPath().includes(this.parentDropdownGroupEl);

    if (parentEmittedChange) {
      this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
      this.requestedDropdownItem = event.detail.requestedDropdownItem;
      this.determineActiveItem();
    }
    event.stopPropagation();
  }

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

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { href, selectionMode, label, iconFlipRtl } = this;

    const iconStartEl = (
      <calcite-icon
        class={CSS.iconStart}
        flipRtl={iconFlipRtl === "start" || iconFlipRtl === "both"}
        icon={this.iconStart}
        scale={getIconScale(this.scale)}
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
        scale={getIconScale(this.scale)}
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
        ariaLabel={label}
        class={CSS.link}
        href={href}
        ref={this.childLink}
        rel={this.rel}
        tabIndex={-1}
        target={this.target}
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
    const { disabled } = this;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaChecked = itemAria;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaLabel = !href ? label : "";
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = itemRole;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "tabIndex", disabled ? -1 : 0);

    return (
      <InteractiveContainer disabled={disabled}>
        <div
          class={{
            [CSS.container]: true,
            [CSS.containerNone]: selectionMode === "none",
          }}
        >
          {selectionMode !== "none" ? (
            <calcite-icon
              class={CSS.icon}
              icon={selectionMode === "multiple" ? "check" : "bullet-point"}
              scale={getIconScale(this.scale)}
            />
          ) : null}
          {contentEl}
        </div>
      </InteractiveContainer>
    );
  }

  // #endregion
}
