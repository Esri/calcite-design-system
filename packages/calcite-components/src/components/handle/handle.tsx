import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { toAriaBoolean } from "../../utils/dom";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { HandleMessages } from "./assets/handle/t9n";
import { HandleChange, HandleNudge } from "./interfaces";
import { CSS, ICONS } from "./resources";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  updateHostInteraction,
} from "../../utils/interactive";

@Component({
  tag: "calcite-handle",
  styleUrl: "handle.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Handle implements LoadableComponent, T9nComponent, InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, the component is selected.
   */
  @Prop({ mutable: true, reflect: true }) selected = false;

  @Watch("messages")
  @Watch("label")
  @Watch("selected")
  @Watch("setPosition")
  @Watch("setSize")
  handleAriaTextChange(): void {
    const message = this.getAriaText("live");

    if (message) {
      this.calciteInternalAssistiveTextChange.emit({
        message,
      });
    }
  }

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Value for the button title attribute
   */
  @Prop({ reflect: true }) dragHandle: string;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  @Prop() messages: HandleMessages;

  /**
   *
   *
   * @internal
   */
  @Prop() setPosition: number;

  /**
   *
   *
   * @internal
   */
  @Prop() setSize: number;

  /**
   *
   *
   * @internal
   */
  @Prop() label: string;

  /**
   * Use this property to override individual strings used by the component.
   */
  @Prop() messageOverrides: Partial<HandleMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
    connectMessages(this);
    connectLocalized(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
    disconnectMessages(this);
    disconnectLocalized(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteHandleElement;

  handleButton: HTMLElement;

  @State() effectiveLocale: string;

  @State() defaultMessages: HandleMessages;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emits whenever the component is selected or unselected.
   *
   */
  @Event({ cancelable: false }) calciteHandleChange: EventEmitter<void>;

  /**
   * Emitted when the handle is selected and the up or down arrow key is pressed.
   */
  @Event({ cancelable: false }) calciteHandleNudge: EventEmitter<HandleNudge>;

  /**
   * Emitted when the assistive text has changed.
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalAssistiveTextChange: EventEmitter<HandleChange>;

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    this.handleButton?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  getAriaText(type: "label" | "live"): string {
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

    const replacePosition = text.replace("{position}", setPosition.toString());
    const replaceLabel = replacePosition.replace("{itemLabel}", label);
    return replaceLabel.replace("{total}", setSize.toString());
  }

  handleKeyDown = (event: KeyboardEvent): void => {
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
  };

  handleBlur = (): void => {
    if (this.disabled) {
      return;
    }

    this.selected = false;
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      // Needs to be a span because of https://github.com/SortableJS/Sortable/issues/1486
      <span
        aria-disabled={this.disabled ? toAriaBoolean(this.disabled) : null}
        aria-label={this.disabled ? null : this.getAriaText("label")}
        aria-pressed={this.disabled ? null : toAriaBoolean(this.selected)}
        class={{ [CSS.handle]: true, [CSS.handleSelected]: !this.disabled && this.selected }}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        role="button"
        tabIndex={this.disabled ? null : 0}
        title={this.messages?.dragHandle}
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={(el): void => {
          this.handleButton = el;
        }}
      >
        <calcite-icon icon={ICONS.drag} scale="s" />
      </span>
    );
  }
}
