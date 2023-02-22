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
  Watch
} from "@stencil/core";
import { toAriaBoolean } from "../../utils/dom";
import {
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent
} from "../../utils/loadable";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { HandleMessages } from "./assets/handle/t9n";
import { HandleNudge } from "./interfaces";
import { CSS, ICONS } from "./resources";

@Component({
  tag: "calcite-handle",
  styleUrl: "handle.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class Handle implements LoadableComponent, T9nComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * @internal
   */
  @Prop({ mutable: true, reflect: true }) activated = false;

  /**
   * Value for the button title attribute
   */
  @Prop({ reflect: true }) dragHandle;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  @Prop() messages: HandleMessages;

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
    connectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    disconnectMessages(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteHandleElement;

  handleButton: HTMLElement;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: HandleMessages;
  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when the handle is activated and the up or down arrow key is pressed.
   */
  @Event({ cancelable: false }) calciteHandleNudge: EventEmitter<HandleNudge>;

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);

    this.handleButton?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  handleKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case " ":
        this.activated = !this.activated;
        event.preventDefault();
        break;
      case "ArrowUp":
        if (!this.activated) {
          return;
        }
        event.preventDefault();
        this.calciteHandleNudge.emit({ direction: "up" });
        break;
      case "ArrowDown":
        if (!this.activated) {
          return;
        }
        event.preventDefault();
        this.calciteHandleNudge.emit({ direction: "down" });
        break;
    }
  };

  handleBlur = (): void => {
    this.activated = false;
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
        aria-pressed={toAriaBoolean(this.activated)}
        class={{ [CSS.handle]: true, [CSS.handleActivated]: this.activated }}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        ref={(el): void => {
          this.handleButton = el;
        }}
        role="button"
        tabindex="0"
        title={this.messages.dragHandle}
      >
        <calcite-icon icon={ICONS.drag} scale="s" />
      </span>
    );
  }
}
