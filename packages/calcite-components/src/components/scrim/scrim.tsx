import { Component, Element, h, Prop, State, VNode, Watch } from "@stencil/core";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { ScrimMessages } from "./assets/scrim/t9n";
import { CSS } from "./resources";
import { createObserver } from "../../utils/observers";
import { Scale } from "../interfaces";

const loaderBreakpoints = {
  s: 100,
  m: 300
};

/**
 * @slot - A slot for adding custom content, primarily loading information.
 */
@Component({
  tag: "calcite-scrim",
  styleUrl: "scrim.scss",
  shadow: true,
  assetsDirs: ["assets"]
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

  @State() loaderScale: Scale = "m";

  @State() defaultMessages: ScrimMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Method
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { el, loading, messages } = this;
    const hasContent = el.innerHTML.trim().length > 0;
    const loaderNode = loading ? (
      <calcite-loader label={messages.loading} ref={this.storeLoaderEl} scale={this.loaderScale} />
    ) : null;
    const contentNode = hasContent ? (
      <div class={CSS.content}>
        <slot />
      </div>
    ) : null;

    return (
      <div class={CSS.scrim}>
        {loaderNode}
        {contentNode}
      </div>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private storeLoaderEl = (el: HTMLCalciteLoaderElement): void => {
    this.loaderEl = el;
    this.handleResize();
  };

  private getScale(height: number): Scale {
    if (height <= loaderBreakpoints.s) {
      return "s";
    } else if (height <= loaderBreakpoints.m) {
      return "m";
    } else {
      return "l";
    }
  }

  private handleResize = (): void => {
    const { loaderEl, el } = this;

    if (!loaderEl) {
      return;
    }

    this.loaderScale = this.getScale(el.clientHeight);
  };
}
