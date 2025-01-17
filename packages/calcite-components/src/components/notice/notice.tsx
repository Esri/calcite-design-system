// @ts-strict-ignore
import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  state,
  JsxNode,
  stringOrBoolean,
} from "@arcgis/lumina";
import { setRequestedIcon, slotChangeHasAssignedElement } from "../../utils/dom";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { Kind, Scale, Width } from "../interfaces";
import { KindIcons } from "../resources";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import { getIconScale } from "../../utils/component";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, SLOTS } from "./resources";
import { styles } from "./notice.scss";

declare global {
  interface DeclareElements {
    "calcite-notice": Notice;
  }
}

/**
 * Notices are intended to be used to present users with important-but-not-crucial contextual tips or copy. Because
 * notices are displayed inline, a common use case is displaying them on page-load to present users with short hints or contextual copy.
 * They are optionally closable - useful for keeping track of whether or not a user has closed the notice. You can also choose not
 * to display a notice on page load and set the "active" attribute as needed to contextually provide inline messaging to users.
 *
 * @slot title - A slot for adding the title.
 * @slot message - A slot for adding the message.
 * @slot link - A slot for adding a `calcite-action` to take, such as: "undo", "try again", "link to page", etc.
 * @slot actions-end - A slot for adding `calcite-action`s to the end of the component. It is recommended to use two or less actions.
 */
export class Notice extends LitElement implements LoadableComponent, OpenCloseComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  /** The close button element. */
  private closeButton = createRef<HTMLButtonElement>();

  transitionProp = "opacity" as const;

  /** The computed icon to render. */
  private requestedIcon?: IconNameOrString;

  transitionEl: HTMLElement;

  // #endregion

  // #region State Properties

  @state() hasActionEnd = false;

  // #endregion

  // #region Public Properties

  /** When `true`, a close button is added to the component. */
  @property({ reflect: true }) closable = false;

  /** When `true`, shows a default recommended icon. Alternatively, pass a Calcite UI Icon name to display a specific icon. */
  @property({ reflect: true, converter: stringOrBoolean }) icon: IconNameOrString | boolean;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** Specifies the kind of the component, which will apply to top border and icon. */
  @property({ reflect: true }) kind: Extract<
    "brand" | "danger" | "info" | "success" | "warning",
    Kind
  > = "brand";

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  /** When `true`, the component is visible. */
  @property({ reflect: true }) open = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the width of the component. [Deprecated] The `"half"` value is deprecated, use `"full"` instead. */
  @property({ reflect: true }) width: Extract<Width, "auto" | "half" | "full"> = "auto";

  // #endregion

  // #region Public Methods

  /** Sets focus on the component's first focusable element. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    const noticeLinkEl = this.el.querySelector("calcite-link");

    if (!this.closeButton.value && !noticeLinkEl) {
      return;
    }
    if (noticeLinkEl) {
      return noticeLinkEl.setFocus();
    } else if (this.closeButton.value) {
      this.closeButton.value.focus();
    }
  }

  // #endregion

  // #region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteNoticeBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteNoticeBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component is closed and animation is complete. */
  calciteNoticeClose = createEvent({ cancelable: false });

  /** Fires when the component is open and animation is complete. */
  calciteNoticeOpen = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  async load(): Promise<void> {
    setUpLoadableComponent(this);
    this.requestedIcon = setRequestedIcon(KindIcons, this.icon, this.kind);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      onToggleOpenCloseComponent(this);
    }

    if (
      changes.has("icon") ||
      (changes.has("kind") && (this.hasUpdated || this.kind !== "brand"))
    ) {
      this.requestedIcon = setRequestedIcon(KindIcons, this.icon, this.kind);
    }
  }

  loaded(): void {
    setComponentLoaded(this);
  }

  // #endregion

  // #region Private Methods
  onBeforeClose(): void {
    this.calciteNoticeBeforeClose.emit();
  }

  onBeforeOpen(): void {
    this.calciteNoticeBeforeOpen.emit();
  }

  onClose(): void {
    this.calciteNoticeClose.emit();
  }

  onOpen(): void {
    this.calciteNoticeOpen.emit();
  }

  private setTransitionEl(el: HTMLElement): void {
    this.transitionEl = el;
  }

  private close(): void {
    this.open = false;
  }

  private handleActionsEndSlotChange(event: Event): void {
    this.hasActionEnd = slotChangeHasAssignedElement(event);
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const closeButton = (
      <button
        ariaLabel={this.messages.close}
        class={CSS.close}
        onClick={this.close}
        ref={this.closeButton}
      >
        <calcite-icon icon="x" scale={getIconScale(this.scale)} />
      </button>
    );

    return (
      <div class={CSS.container} ref={this.setTransitionEl}>
        {this.requestedIcon ? (
          <div class={CSS.icon}>
            <calcite-icon
              flipRtl={this.iconFlipRtl}
              icon={this.requestedIcon}
              scale={getIconScale(this.scale)}
            />
          </div>
        ) : null}
        <div class={CSS.content}>
          <slot name={SLOTS.title} />
          <slot name={SLOTS.message} />
          <slot name={SLOTS.link} />
        </div>
        <div class={CSS.actionsEnd} hidden={!this.hasActionEnd}>
          <slot name={SLOTS.actionsEnd} onSlotChange={this.handleActionsEndSlotChange} />
        </div>
        {this.closable ? closeButton : null}
      </div>
    );
  }

  // #endregion
}
