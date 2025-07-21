// @ts-strict-ignore
import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { useT9n } from "../../controllers/useT9n";
import { logger } from "../../utils/logger";
import { useSetFocus } from "../../controllers/useSetFocus";
import T9nStrings from "./assets/t9n/messages.en.json";
import { HandleChange, HandleNudge } from "./interfaces";
import { CSS, ICONS, SUBSTITUTIONS } from "./resources";
import { styles } from "./handle.scss";

declare global {
  interface DeclareElements {
    "calcite-handle": Handle;
  }
}

/**
 * @deprecated Use the `calcite-sort-handle` component instead.
 */
export class Handle extends LitElement implements InteractiveComponent {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private handleButton = createRef<HTMLSpanElement>();

  /**
   * Made into a prop for testing purposes only.
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>({ blocking: true });

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region Public Properties

  /**
   * When `true`, disables unselecting the component when blurred.
   *
   * @private
   */
  @property() blurUnselectDisabled = false;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** Value for the button title attribute. */
  @property({ reflect: true }) dragHandle: string;

  /**
   *
   * @private
   */
  @property() label: string;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** When `true`, the component is selected. */
  @property({ reflect: true }) selected = false;

  /**
   *
   * @private
   */
  @property() setPosition: number;

  /**
   *
   * @private
   */
  @property() setSize: number;

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.handleButton.value;
    }, options);
  }

  //#endregion

  //#region Events

  /** Fires whenever the component is selected or unselected. */
  calciteHandleChange = createEvent({ cancelable: false });

  /** Fires when the handle is selected and the up or down arrow key is pressed. */
  calciteHandleNudge = createEvent<HandleNudge>({ cancelable: false });

  /**
   * Fires when the assistive text has changed.
   *
   * @private
   */
  calciteInternalAssistiveTextChange = createEvent<HandleChange>({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      changes.has("messages") ||
      changes.has("label") ||
      (changes.has("selected") && (this.hasUpdated || this.selected !== false)) ||
      changes.has("setPosition") ||
      changes.has("setSize")
    ) {
      this.handleAriaTextChange();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    logger.deprecated("component", {
      name: "handle",
      removalVersion: 4,
      suggested: "sort-handle",
    });
  }

  //#endregion

  //#region Private Methods

  private handleAriaTextChange(): void {
    const message = this.getAriaText("live");

    if (message) {
      this.calciteInternalAssistiveTextChange.emit({
        message,
      });
    }
  }

  private getTooltip(): string {
    const { label, messages } = this;

    if (!messages) {
      return "";
    }

    if (!label) {
      return messages.dragHandleUntitled;
    }

    return messages.dragHandle.replace(SUBSTITUTIONS.itemLabel, label);
  }

  private getAriaText(type: "label" | "live"): string {
    const { setPosition, setSize, label, messages, selected } = this;

    if (!messages || !label || typeof setSize !== "number" || typeof setPosition !== "number") {
      return null;
    }

    const text =
      type === "label"
        ? selected
          ? messages.dragHandleChange
          : messages.dragHandleIdle
        : selected
          ? messages.dragHandleActive
          : messages.dragHandleCommit;

    const replacePosition = text.replace(SUBSTITUTIONS.position, setPosition.toString());
    const replaceLabel = replacePosition.replace(SUBSTITUTIONS.itemLabel, label);
    return replaceLabel.replace(SUBSTITUTIONS.total, setSize.toString());
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    switch (event.key) {
      case " ":
        this.selected = !this.selected;
        this.calciteHandleChange.emit();
        event.preventDefault();
        break;
      case "ArrowUp":
        if (!this.selected) {
          return;
        }
        event.preventDefault();
        this.calciteHandleNudge.emit({ direction: "up" });
        break;
      case "ArrowDown":
        if (!this.selected) {
          return;
        }
        event.preventDefault();
        this.calciteHandleNudge.emit({ direction: "down" });
        break;
    }
  }

  private handleBlur(): void {
    if (this.blurUnselectDisabled || this.disabled) {
      return;
    }

    if (this.selected) {
      this.selected = false;
      this.calciteHandleChange.emit();
    }
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
      <InteractiveContainer disabled={this.disabled}>
        <span
          // Needs to be a span because of https://github.com/SortableJS/Sortable/issues/1486
          ariaChecked={this.disabled ? null : this.selected}
          ariaDisabled={this.disabled ? this.disabled : null}
          ariaLabel={this.disabled ? null : this.getAriaText("label")}
          class={{ [CSS.handle]: true, [CSS.handleSelected]: !this.disabled && this.selected }}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          ref={this.handleButton}
          // role of radio is being applied to allow space key to select in screen readers
          role="radio"
          tabIndex={this.disabled ? null : 0}
          title={this.getTooltip()}
        >
          <calcite-icon icon={ICONS.drag} scale="s" />
        </span>
      </InteractiveContainer>
    );
  }

  //#endregion
}
