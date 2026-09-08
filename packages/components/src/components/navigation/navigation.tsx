import { createRef } from "lit/directives/ref.js";
import { PropertyValues } from "lit";
import {
  LitElement,
  property,
  createEvent,
  Fragment,
  h,
  method,
  state,
  JsxNode,
} from "@arcgis/lumina";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import type { Action } from "../action/action";
import { isNavigationLogo } from "../navigation-logo/resources";
import { isNavigationUser } from "../navigation-user/resources";
import { useSetFocus } from "../../controllers/useSetFocus";
import { createObserver } from "../../utils/observers";
import { Scale } from "../types";
import { CSS, ICONS, SLOTS, isNavigation } from "./resources";
import { styles } from "./navigation.scss";

declare global {
  interface DeclareElements {
    "calcite-navigation": Navigation;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the width of the component's content area.
     */
    "--calcite-navigation-width": "*";
    /**
     * Specifies the background color of the component.
     *
     * @deprecated in v3.0.0, removal target v6.0.0 - Use `--calcite-navigation-background-color` instead.
     */
    "--calcite-navigation-background": "*";
    /**
     * Specifies the component's background color.
     */
    "--calcite-navigation-background-color": "*";
    /**
     * Specifies the component's border color.
     */
    "--calcite-navigation-border-color": "*";
  }
}

interface NavigationSlots {
  /**
   * A slot for adding a `calcite-logo` component to the primary navigation level.
   */
  logo: Node[];
  /**
   * A slot for adding a `calcite-user` component to the primary navigation level.
   */
  user: Node[];
  /**
   * A slot for adding a `calcite-progress` component to the primary navigation level.
   */
  progress: Node[];
  /**
   * A slot for adding a `calcite-action` component to the primary navigation level.
   */
  "navigation-action": Node[];
  /**
   * A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the start position of any navigation level.
   */
  "content-start": Node[];
  /**
   * A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the center position of the primary navigation level.
   */
  "content-center": Node[];
  /**
   * A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the end position of any navigation level.
   */
  "content-end": Node[];
  /**
   * A slot for adding a `calcite-navigation` component in the secondary navigation level. Components rendered here will not display `calcite-navigation-logo` or `calcite-navigation-user` components.
   */
  "navigation-secondary": Node[];
  /**
   * A slot for adding a `calcite-navigation` component in the tertiary navigation level.  Components rendered here will not display `calcite-navigation-logo` or `calcite-navigation-user` components.
   */
  "navigation-tertiary": Node[];
}

export class Navigation extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  override ["@slots"]!: NavigationSlots;

  private navigationActionRef = createRef<Action["el"]>();

  private focusSetter = useSetFocus<this>()(this);

  private mutationObserver = createObserver("mutation", () => {
    this.updateNavigationLogo();
    this.updateNavigationUser();
    this.updateNestedNavigation();
  });

  //#endregion

  //#region State Properties

  @state() logoSlotHasElements = false;

  @state() navigationActionSlotHasElements = false;

  @state() primaryContentCenterSlotHasElements = false;

  @state() primaryContentEndSlotHasElements = false;

  @state() primaryContentStartSlotHasElements = false;

  @state() progressSlotHasElement = false;

  @state() secondarySlotHasElements = false;

  @state() tertiarySlotHasElements = false;

  @state() userSlotHasElements = false;

  //#endregion

  //#region Public Properties

  /** @copyDoc */
  @property() label?: string;

  /** When `true`, displays a `calcite-action` and emits a `calciteNavActionSelect` event on selection change. */
  @property({ reflect: true }) navigationAction = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  //#endregion

  //#region Public Methods

  /**
   * When `navigationAction` is `true`, sets focus on the component's action element.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.navigationActionRef.value, options);
  }

  //#endregion

  //#region Events

  /** When `navigationAction` is `true`, emits when the displayed action selection changes. */
  calciteNavigationActionSelect = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true });
    this.updateNavigationLogo();
    this.updateNavigationUser();
    this.updateNestedNavigation();
  }

  override updated(changes: PropertyValues<this>): void {
    if (
      changes.has("scale") ||
      changes.has("logoSlotHasElements") ||
      changes.has("userSlotHasElements") ||
      changes.has("secondarySlotHasElements") ||
      changes.has("tertiarySlotHasElements")
    ) {
      this.updateNavigationLogo();
      this.updateNavigationUser();
      this.updateNestedNavigation();
    }
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private actionClickHandler() {
    this.calciteNavigationActionSelect.emit();
  }

  private handleUserSlotChange(event: Event): void {
    if (this.isPrimaryLevel()) {
      this.userSlotHasElements = slotChangeHasAssignedElement(event);
    }
  }

  private handleLogoSlotChange(event: Event): void {
    if (this.isPrimaryLevel()) {
      this.logoSlotHasElements = slotChangeHasAssignedElement(event);
    }
  }

  private handleContentStartSlotChange(event: Event): void {
    if (this.isPrimaryLevel()) {
      this.primaryContentStartSlotHasElements = slotChangeHasAssignedElement(event);
    }
  }

  private handleContentEndSlotChange(event: Event): void {
    if (this.isPrimaryLevel()) {
      this.primaryContentEndSlotHasElements = slotChangeHasAssignedElement(event);
    }
  }

  private handleContentCenterSlotChange(event: Event): void {
    if (this.isPrimaryLevel()) {
      this.primaryContentCenterSlotHasElements = slotChangeHasAssignedElement(event);
    }
  }

  private handleSecondarySlotChange(event: Event): void {
    this.secondarySlotHasElements = slotChangeHasAssignedElement(event);
  }

  private handleTertiarySlotChange(event: Event): void {
    this.tertiarySlotHasElements = slotChangeHasAssignedElement(event);
  }

  private handleMenuActionSlotChange(event: Event): void {
    if (this.isPrimaryLevel()) {
      this.navigationActionSlotHasElements = slotChangeHasAssignedElement(event);
      if (this.navigationActionSlotHasElements) {
        this.navigationAction = false;
      }
    }
  }

  private handleProgressSlotChange(event: Event): void {
    if (this.isPrimaryLevel()) {
      this.progressSlotHasElement = slotChangeHasAssignedElement(event);
    }
  }

  private isPrimaryLevel(): boolean {
    return this.el.slot !== SLOTS.navSecondary && this.el.slot !== SLOTS.navTertiary;
  }

  private getOwnedNavigationElements<T extends Element>(
    slotName: string,
    predicate: (element: Element) => element is T,
  ): T[] {
    const slot = this.el.shadowRoot?.querySelector<HTMLSlotElement>(`slot[name="${slotName}"]`);

    if (!slot) {
      return [];
    }

    return slot.assignedElements({ flatten: true }).filter(predicate);
  }

  private updateNavigationLogo(): void {
    this.getOwnedNavigationElements(SLOTS.logo, isNavigationLogo).forEach((item) => {
      item.scale = this.scale;
    });
  }

  private updateNavigationUser(): void {
    this.getOwnedNavigationElements(SLOTS.user, isNavigationUser).forEach((item) => {
      item.scale = this.scale;
    });
  }

  private updateNestedNavigation(): void {
    const nestedNavigation = [
      ...this.getOwnedNavigationElements(SLOTS.navSecondary, isNavigation),
      ...this.getOwnedNavigationElements(SLOTS.navTertiary, isNavigation),
    ];
    nestedNavigation.forEach((item) => {
      if (item !== this.el) {
        (item as Navigation).scale = this.scale;
      }
    });
  }

  //#endregion

  //#region Rendering

  private renderMenuAction(): JsxNode {
    return (
      <slot name={SLOTS.navigationAction} onSlotChange={this.handleMenuActionSlotChange}>
        {this.navigationAction && (
          <calcite-action
            icon={ICONS.hamburger}
            onClick={this.actionClickHandler}
            ref={this.navigationActionRef}
            text={this.label}
          />
        )}
      </slot>
    );
  }

  override render(): JsxNode {
    const primaryLevelHasElements =
      this.logoSlotHasElements ||
      this.userSlotHasElements ||
      this.navigationActionSlotHasElements ||
      this.primaryContentCenterSlotHasElements ||
      this.primaryContentEndSlotHasElements ||
      this.primaryContentStartSlotHasElements ||
      this.navigationAction;
    const slotName = this.el.slot;
    return (
      <>
        <div
          class={{
            [CSS.container]: true,
            [CSS.secondary]: slotName === SLOTS.navSecondary,
            [CSS.tertiary]: slotName === SLOTS.navTertiary,
            [CSS.primary]: primaryLevelHasElements,
          }}
        >
          <div class={{ [CSS.hide]: !this.progressSlotHasElement, [SLOTS.progress]: true }}>
            <slot name={SLOTS.progress} onSlotChange={this.handleProgressSlotChange} />
          </div>
          <div
            class={{ [CSS.containerContent]: true, [CSS.hasProgress]: this.progressSlotHasElement }}
          >
            {this.renderMenuAction()}
            <div class={{ [CSS.hide]: !this.logoSlotHasElements, [SLOTS.logo]: true }}>
              <slot name={SLOTS.logo} onSlotChange={this.handleLogoSlotChange} />
            </div>
            <slot name={SLOTS.contentStart} onSlotChange={this.handleContentStartSlotChange} />
            <slot name={SLOTS.contentCenter} onSlotChange={this.handleContentCenterSlotChange} />
            <slot name={SLOTS.contentEnd} onSlotChange={this.handleContentEndSlotChange} />
            <div class={{ [CSS.hide]: !this.userSlotHasElements, [SLOTS.user]: true }}>
              <slot name={SLOTS.user} onSlotChange={this.handleUserSlotChange} />
            </div>
          </div>
        </div>

        <>
          <slot name={SLOTS.navSecondary} onSlotChange={this.handleSecondarySlotChange} />
          <slot name={SLOTS.navTertiary} onSlotChange={this.handleTertiarySlotChange} />
        </>
      </>
    );
  }

  //#endregion
}
