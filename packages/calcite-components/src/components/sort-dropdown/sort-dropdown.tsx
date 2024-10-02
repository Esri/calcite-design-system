import { Component, Element, h, Method, Prop, State, VNode, Watch } from "@stencil/core";
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
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { Scale } from "../interfaces";
import { FlipPlacement, MenuPlacement, OverlayPositioning } from "../../components";
import { defaultMenuPlacement } from "../../utils/floating-ui";
import { SortDropdownMessages } from "./assets/sort-dropdown/t9n";
import { CSS, ICONS, SUBSTITUTIONS } from "./resources";

@Component({
  tag: "calcite-sort-dropdown",
  styleUrl: "sort-dropdown.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class SortDropdown implements LoadableComponent, T9nComponent, InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Specifies the component's fallback `calcite-dropdown-item` `placement` when it's initial or specified `placement` has insufficient space available.
   */
  @Prop() flipPlacements: FlipPlacement[];

  /**
   * Specifies the maximum number of `calcite-dropdown-item`s to display before showing a scroller.
   * Value must be greater than `0`, and does not include `groupTitle`'s from `calcite-dropdown-group`.
   */
  @Prop({ reflect: true }) maxItems = 0;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   *
   */
  @Prop({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Determines where the component will be positioned relative to the container element.
   *
   * @default "bottom-start"
   */
  @Prop({ reflect: true }) placement: MenuPlacement = defaultMenuPlacement;

  /**
   * Made into a prop for testing purposes only.
   *
   * @internal
   * @readonly
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: SortDropdownMessages;

  /**
   * Specifies the label of the component.
   */
  @Prop() label: string;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<SortDropdownMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * When `true`, displays and positions the component.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * todo
   */
  @Prop() setPosition: number;

  /**
   * todo
   */
  @Prop() setSize: number;

  /**
   * Specifies the width of the component.
   */
  @Prop({ reflect: true }) widthScale: Scale;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
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
    disconnectMessages(this);
    disconnectLocalized(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteSortDropdownElement;

  @State() effectiveLocale: string;

  @State() defaultMessages: SortDropdownMessages;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  dropdownEl: HTMLCalciteDropdownElement;
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.dropdownEl?.setFocus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private getLabel(): string {
    const { label, messages } = this;

    if (!messages) {
      return "";
    }

    if (!label) {
      return messages.untitledLabel;
    }

    return messages.label.replace(SUBSTITUTIONS.itemLabel, label);
  }

  private handleOpen = (): void => {
    this.open = true;
  };

  private handleClose = (): void => {
    this.open = false;
  };

  private handleReorder = (event: CustomEvent<void>): void => {
    console.log((event.target as HTMLElement).dataset.value);
  };

  private handleMoveTo = (event: CustomEvent<void>): void => {
    console.log((event.target as HTMLElement).dataset.value);
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const {
      disabled,
      flipPlacements,
      messages,
      open,
      overlayPositioning,
      placement,
      scale,
      widthScale,
    } = this;
    const text = this.getLabel();

    return (
      <InteractiveContainer disabled={disabled}>
        <calcite-dropdown
          disabled={disabled}
          flipPlacements={flipPlacements}
          onCalciteDropdownClose={this.handleClose}
          onCalciteDropdownOpen={this.handleOpen}
          open={open}
          overlayPositioning={overlayPositioning}
          placement={placement}
          ref={(el): void => {
            this.dropdownEl = el;
          }}
          scale={scale}
          widthScale={widthScale}
        >
          <calcite-action
            active={open}
            appearance="transparent"
            class={CSS.handle}
            disabled={disabled}
            icon={ICONS.drag}
            label={text}
            scale="s"
            slot="trigger"
            text={text}
            title={text}
          />
          <calcite-dropdown-group groupTitle={messages.reorder} scale={scale} selectionMode="none">
            <calcite-dropdown-item
              data-value="top"
              label={messages.moveToTop}
              onCalciteDropdownItemSelect={this.handleReorder}
            >
              {messages.moveToTop}
            </calcite-dropdown-item>
            <calcite-dropdown-item
              data-value="up"
              label={messages.moveUp}
              onCalciteDropdownItemSelect={this.handleReorder}
            >
              {messages.moveUp}
            </calcite-dropdown-item>
            <calcite-dropdown-item
              data-value="down"
              label={messages.moveDown}
              onCalciteDropdownItemSelect={this.handleReorder}
            >
              {messages.moveDown}
            </calcite-dropdown-item>
            <calcite-dropdown-item
              data-value="bottom"
              label={messages.moveToBottom}
              onCalciteDropdownItemSelect={this.handleReorder}
            >
              {messages.moveToBottom}
            </calcite-dropdown-item>
          </calcite-dropdown-group>
          <calcite-dropdown-group groupTitle={messages.moveTo} scale={scale} selectionMode="none">
            <calcite-dropdown-item
              data-value="todo"
              label={"todo"}
              onCalciteDropdownItemSelect={this.handleMoveTo}
            >
              List 2
            </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </InteractiveContainer>
    );
  }
}
