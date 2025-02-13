// @ts-strict-ignore
import { LitElement, property, h, state, JsxNode } from "@arcgis/lumina";
import { createObserver } from "../../utils/observers";
import { Scale } from "../interfaces";
import { slotChangeHasContent } from "../../utils/dom";
import { useT9n } from "../../controllers/useT9n";
import type { Loader } from "../loader/loader";
import { CSS, BREAKPOINTS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./scrim.scss";

declare global {
  interface DeclareElements {
    "calcite-scrim": Scrim;
  }
}

/** @slot - A slot for adding custom content, primarily loading information. */
export class Scrim extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private loaderEl: Loader["el"];

  private resizeObserver = createObserver("resize", () => this.handleResize());

  // #endregion

  // #region State Properties

  @state() hasContent = false;

  @state() loaderScale: Scale;

  // #endregion

  // #region Public Properties

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    this.resizeObserver?.observe(this.el);
  }

  override disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
  }

  // #endregion

  // #region Private Methods

  private handleDefaultSlotChange(event: Event): void {
    this.hasContent = slotChangeHasContent(event);
  }

  private storeLoaderEl(el: Loader["el"]): void {
    this.loaderEl = el;
    this.handleResize();
  }

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

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { hasContent, loading, messages } = this;

    return (
      <div class={CSS.scrim}>
        {loading ? (
          <calcite-loader
            label={messages.loading}
            ref={this.storeLoaderEl}
            scale={this.loaderScale}
          />
        ) : null}
        <div class={CSS.content} hidden={!hasContent}>
          <slot onSlotChange={this.handleDefaultSlotChange} />
        </div>
      </div>
    );
  }

  // #endregion
}
