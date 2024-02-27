import { Component, Element, h, Prop, State, VNode, Watch } from "@stencil/core";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { ScrimMessages } from "./assets/scrim/t9n";
import { CSS, BREAKPOINTS } from "./resources";
import { createObserver } from "../../utils/observers";
import { Scale } from "../interfaces";
import { slotChangeHasContent } from "../../utils/dom";

/**
 * @slot - A slot for adding custom content, primarily loading information.
 */
@Component({
  tag: "calcite-scrim",
  styleUrl: "scrim.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Scrim implements LocalizedComponent, T9nComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, a busy indicator is displayed.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: ScrimMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<ScrimMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteScrimElement;

  resizeObserver = createObserver("resize", () => this.handleResize());

  loaderEl: HTMLCalciteLoaderElement;

  @State() loaderScale: Scale;

  @State() defaultMessages: ScrimMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() hasContent = false;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
    this.resizeObserver?.observe(this.el);
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
    this.resizeObserver?.disconnect();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Method
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { hasContent, loading, messages } = this;

    return (
      <div class={CSS.scrim}>
        {loading ? (
          <calcite-loader
            label={messages.loading}
            scale={this.loaderScale}
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={this.storeLoaderEl}
          />
        ) : null}
        <div class={CSS.content} hidden={!hasContent}>
          <slot onSlotchange={this.handleDefaultSlotChange} />
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private handleDefaultSlotChange = (event: Event): void => {
    this.hasContent = slotChangeHasContent(event);
  };

  private storeLoaderEl = (el: HTMLCalciteLoaderElement): void => {
    this.loaderEl = el;
    this.handleResize();
  };

  private getScale(size: number): Scale {
    if (size < BREAKPOINTS.s) {
      return "s";
    } else if (size >= BREAKPOINTS.l) {
      return "l";
    } else {
      return "m";
    }
  }

  private handleResize(): void {
    const { loaderEl, el } = this;

    if (!loaderEl) {
      return;
    }

    this.loaderScale = this.getScale(Math.min(el.clientHeight, el.clientWidth) ?? 0);
  }
}
