// @ts-strict-ignore
import { createRef } from "lit-html/directives/ref.js";
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
import { componentFocusable } from "../../utils/component";
import type { Action } from "../action/action";
import { CSS, ICONS, SLOTS } from "./resources";
import { styles } from "./navigation.scss";

declare global {
  interface DeclareElements {
    "calcite-navigation": Navigation;
  }
}

/**
 * @slot logo - A slot for adding a `calcite-logo` component to the primary navigation level.
 * @slot user - A slot for adding a `calcite-user` component to the primary navigation level.
 * @slot progress - A slot for adding a `calcite-progress` component to the primary navigation level.
 * @slot navigation-action - A slot for adding a `calcite-action` component to the primary navigation level.
 * @slot content-start - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the start position of any navigation level.
 * @slot content-center - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the center position of the primary navigation level.
 * @slot content-end - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the end position of any navigation level.
 * @slot navigation-secondary - A slot for adding a `calcite-navigation` component in the secondary navigation level. Components rendered here will not display `calcite-navigation-logo` or `calcite-navigation-user` components.
 * @slot navigation-tertiary - A slot for adding a `calcite-navigation` component in the tertiary navigation level.  Components rendered here will not display `calcite-navigation-logo` or `calcite-navigation-user` components.
 */
export class Navigation extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private navigationActionEl = createRef<Action["el"]>();

  // #endregion

  // #region State Properties

  @state() logoSlotHasElements: boolean;

  @state() navigationActionSlotHasElements: boolean;

  @state() primaryContentCenterSlotHasElements: boolean;

  @state() primaryContentEndSlotHasElements: boolean;

  @state() primaryContentStartSlotHasElements: boolean;

  @state() progressSlotHasElement: boolean;

  @state() secondarySlotHasElements: boolean;

  @state() tertiarySlotHasElements: boolean;

  @state() userSlotHasElements: boolean;

  // #endregion

  // #region Public Properties

  /** When `navigationAction` is `true`, specifies the label of the `calcite-action`. */
  @property() label: string;

  /** When `true`, displays a `calcite-action` and emits a `calciteNavActionSelect` event on selection change. */
  @property({ reflect: true }) navigationAction = false;

  // #endregion

  // #region Public Methods

  /** When `navigationAction` is `true`, sets focus on the component's action element. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    return this.navigationActionEl.value?.setFocus();
  }

  // #endregion

  // #region Events

  /** When `navigationAction` is `true`, emits when the displayed action selection changes. */
  calciteNavigationActionSelect = createEvent({ cancelable: false });

  // #endregion

  // #region Private Methods

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

  // #endregion

  // #region Rendering

  private renderMenuAction(): JsxNode {
    return (
      <slot name={SLOTS.navigationAction} onSlotChange={this.handleMenuActionSlotChange}>
        {this.navigationAction && (
          <calcite-action
            icon={ICONS.hamburger}
            onClick={this.actionClickHandler}
            ref={this.navigationActionEl}
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

  // #endregion
}
