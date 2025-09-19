// @ts-strict-ignore
import { PropertyValues, isServer } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  state,
  JsxNode,
  setAttribute,
} from "@arcgis/lumina";
import { getElementDir, toAriaBoolean, nodeListToArray } from "../../utils/dom";
import { guid } from "../../utils/guid";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { createObserver, updateRefObserver } from "../../utils/observers";
import { FlipContext, Scale } from "../interfaces";
import { TabChangeEventDetail, TabCloseEventDetail } from "../tab/interfaces";
import { TabID, TabLayout, TabPosition } from "../tabs/interfaces";
import { getIconScale } from "../../utils/component";
import { IconNameOrString } from "../icon/interfaces";
import { XButton } from "../functional/XButton";
import { useT9n } from "../../controllers/useT9n";
import type { Tabs } from "../tabs/tabs";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, IDS } from "./resources";
import { styles } from "./tab-title.scss";

declare global {
  interface DeclareElements {
    "calcite-tab-title": TabTitle;
  }
}

/**
 * Tab-titles are optionally individually closable.
 *
 * @slot - A slot for adding text.
 */
export class TabTitle extends LitElement implements InteractiveComponent {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private closeButtonRef = createRef<HTMLButtonElement>();

  private containerEl: HTMLDivElement;

  private guid = IDS.host(guid());

  /** watches for changing text content */
  private mutationObserver: MutationObserver = createObserver("mutation", () =>
    this.updateHasText(),
  );

  private parentTabsEl: Tabs["el"];

  private resizeObserver = createObserver("resize", () => {
    this.calciteInternalTabIconChanged.emit();
  });

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  //#endregion

  //#region State Properties

  @state() controls: string;

  /** determine if there is slotted text for styling purposes */
  @state() hasText = false;

  //#endregion

  //#region Public Properties

  /** @private */
  @property({ reflect: true }) bordered = false;

  /** When present, a close button is added to the component. */
  @property({ reflect: true }) closable = false;

  /** When present, does not display or position the component. */
  @property({ reflect: true }) closed = false;

  /** When present, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** Specifies an icon to display at the end of the component. */
  @property({ reflect: true }) iconEnd: IconNameOrString;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @property({ reflect: true }) iconStart: IconNameOrString;

  /** @private */
  @property({ reflect: true }) layout: TabLayout;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Specifies the position of `calcite-tab-nav` and `calcite-tab-title` components in relation to, and is inherited from the parent `calcite-tabs`, defaults to `top`.
   *
   *  `@internal`
   */
  @property() position: TabPosition = "top";

  /**
   * Specifies the size of the component inherited from the parent `calcite-tabs`, defaults to `m`.
   *
   * @private
   */
  @property() scale: Scale = "m";

  /**
   * When present, the component and its respective `calcite-tab` contents are selected.
   *
   * Only one tab can be selected within the `calcite-tabs` parent.
   */
  @property({ reflect: true }) selected = false;

  /**
   * Specifies a unique name for the component.
   *
   * When specified, use the same value on the `calcite-tab`.
   */
  @property({ reflect: true }) tab: string;

  //#endregion

  //#region Public Methods

  /**
   * This activates a tab in order for it and its associated tab-title be selected.
   *
   * @param userTriggered - when `true`, user-interaction events will be emitted in addition to internal events
   * @private
   */
  @method()
  async activateTab(userTriggered = true): Promise<void> {
    if (this.disabled || this.closed) {
      return;
    }
    const payload = { tab: this.tab, userTriggered: userTriggered };
    this.calciteInternalTabsActivate.emit(payload);

    if (userTriggered) {
      // emit in the next frame to let internal events sync up
      requestAnimationFrame(() => this.calciteTabsActivate.emit());
    }
  }

  /** @private */
  @method()
  async getTabIdentifier(): Promise<TabID> {
    return this.tab ? this.tab : this.getTabIndex();
  }

  /** Returns the index of the title within the `calcite-tab-nav`. */
  @method()
  async getTabIndex(): Promise<number> {
    return Array.prototype.indexOf.call(
      nodeListToArray(this.el.parentElement.children).filter((el) =>
        el.matches("calcite-tab-title"),
      ),
      this.el,
    );
  }

  /**
   * @param tabIds
   * @param titleIds
   * @private
   */
  @method()
  _updateAriaInfo(tabIds: string[] = [], titleIds: string[] = []): void {
    this.controls = tabIds[titleIds.indexOf(this.el.id)] || null;
  }

  //#endregion

  //#region Events

  /** @private */
  calciteInternalTabIconChanged = createEvent({ cancelable: false });

  /** @private */
  calciteInternalTabTitleRegister = createEvent<TabID>({ cancelable: false });

  /**
   * Fires when a `calcite-tab` is selected (`event.details`).
   *
   * @see [TabChangeEventDetail](https://github.com/Esri/calcite-design-system/blob/dev/packages/calcite-components/src/components/tab/interfaces.ts#L1).
   * @private
   */
  calciteInternalTabsActivate = createEvent<TabChangeEventDetail>({ cancelable: false });

  /**
   * Fires when `calcite-tab` is closed (`event.details`).
   *
   * @see [TabChangeEventDetail](https://github.com/Esri/calcite-design-system/blob/dev/packages/calcite-components/src/components/tab/interfaces.ts).
   * @private
   */
  calciteInternalTabsClose = createEvent<TabCloseEventDetail>({ cancelable: false });

  /** @private */
  calciteInternalTabsFocusFirst = createEvent({ cancelable: false });

  /** @private */
  calciteInternalTabsFocusLast = createEvent({ cancelable: false });

  /** @private */
  calciteInternalTabsFocusNext = createEvent({ cancelable: false });

  /** @private */
  calciteInternalTabsFocusPrevious = createEvent({ cancelable: false });

  /** Fires when a `calcite-tab` is selected. */
  calciteTabsActivate = createEvent({ cancelable: false });

  /** Fires when a `calcite-tab` is closed. */
  calciteTabsClose = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listenOn<CustomEvent<TabChangeEventDetail>>(
      document.body,
      "calciteInternalTabChange",
      this.internalTabChangeHandler,
    );
    this.listen("click", this.onClick);
    this.listen("keydown", this.keyDownHandler);
  }

  override connectedCallback(): void {
    this.setupTextContentObserver();
    this.parentTabsEl = this.el.closest("calcite-tabs");
  }

  async load(): Promise<void> {
    if (!isServer) {
      this.updateHasText();
    }
    if (this.tab && this.selected) {
      this.activateTab(false);
    }
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("selected") && (this.hasUpdated || this.selected !== false)) {
      this.selectedHandler();
    }

    if (this.parentTabsEl) {
      this.layout = this.parentTabsEl.layout;
      this.bordered = this.parentTabsEl.bordered;
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  /** This lifecycle method is not expected to return a promise. The returned promise will be ignored by Lit rather than awaited. */
  async loaded(): Promise<void> {
    this.calciteInternalTabTitleRegister.emit(await this.getTabIdentifier());
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    // Dispatching to body in order to be listened by other elements that are still connected to the DOM.
    document.body?.dispatchEvent(
      new CustomEvent("calciteTabTitleUnregister", {
        detail: this.el,
      }),
    );
    this.resizeObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private selectedHandler(): void {
    if (this.selected) {
      this.activateTab(false);
    }
  }

  private internalTabChangeHandler(event: CustomEvent<TabChangeEventDetail>): void {
    const targetTabsEl = event
      .composedPath()
      .find((el: HTMLElement) => el.tagName === "CALCITE-TABS");

    if (targetTabsEl !== this.parentTabsEl) {
      return;
    }

    if (this.tab) {
      this.selected = this.tab === event.detail.tab;
    } else {
      this.getTabIndex().then((index) => {
        this.selected = index === event.detail.tab;
      });
    }

    event.stopPropagation();
  }

  private onClick(): void {
    this.activateTab();
  }

  private keyDownHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case " ":
      case "Enter":
        if (!event.composedPath().includes(this.closeButtonRef.value)) {
          this.activateTab();
          event.preventDefault();
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (getElementDir(this.el) === "ltr") {
          this.calciteInternalTabsFocusNext.emit();
        } else {
          this.calciteInternalTabsFocusPrevious.emit();
        }
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (getElementDir(this.el) === "ltr") {
          this.calciteInternalTabsFocusPrevious.emit();
        } else {
          this.calciteInternalTabsFocusNext.emit();
        }
        break;
      case "Home":
        event.preventDefault();
        this.calciteInternalTabsFocusFirst.emit();
        break;
      case "End":
        event.preventDefault();
        this.calciteInternalTabsFocusLast.emit();
        break;
    }
  }

  private closeClickHandler(): void {
    this.closeTabTitleAndNotify();
  }

  private updateHasText(): void {
    this.hasText = this.el.textContent.trim().length > 0;
  }

  private setContainerRef(el: HTMLDivElement): void {
    updateRefObserver(this.resizeObserver, this.containerEl, el);
    this.containerEl = el;
  }

  private setupTextContentObserver(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  private closeTabTitleAndNotify(): void {
    this.closed = true;
    this.calciteInternalTabsClose.emit({ tab: this.tab });
    this.calciteTabsClose.emit();
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const { el, closed } = this;
    const id = el.id || this.guid;

    const iconStartEl = (
      <calcite-icon
        class={{ [CSS.titleIcon]: true, [CSS.iconStart]: true }}
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale={getIconScale(this.scale)}
      />
    );

    const iconEndEl = (
      <calcite-icon
        class={{ [CSS.titleIcon]: true, [CSS.iconEnd]: true }}
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale={getIconScale(this.scale)}
      />
    );
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "aria-controls", this.controls);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaSelected = toAriaBoolean(this.selected);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "id", id);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "tab";
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "tabIndex", this.selected && !this.disabled ? 0 : -1);

    return (
      <InteractiveContainer disabled={this.disabled}>
        <div
          class={{
            [CSS.container]: true,
            [CSS.containerBottom]: this.position === "bottom",
            [CSS.iconPresent]: !!this.iconStart || !!this.iconEnd,
            [CSS.scale(this.scale)]: true,
          }}
          hidden={closed}
          ref={this.setContainerRef}
        >
          <div class={{ [CSS.content]: true, [CSS.contentHasText]: this.hasText }}>
            {this.iconStart ? iconStartEl : null}
            <slot />
            {this.iconEnd ? iconEndEl : null}
          </div>
          {this.renderCloseButton()}
          <div class={CSS.selectedIndicator} />
        </div>
      </InteractiveContainer>
    );
  }

  private renderCloseButton(): JsxNode {
    const { closable, messages } = this;

    return closable ? (
      <XButton
        disabled={false}
        focusable={true}
        key="close-button"
        label={messages.close}
        onClick={this.closeClickHandler}
        ref={this.closeButtonRef}
        round={false}
        scale={this.scale}
        title={messages.close}
      />
    ) : null;
  }

  //#endregion
}
