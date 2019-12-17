import { Component, h, Element, Prop, State, Watch, Host } from "@stencil/core";
import { CSS } from "./resources";
import { getElementDir } from "../../utils/dom";
import { fetchIcon, scaleToPx } from "./utils";
import { Scale } from "../../interfaces/UIIcon";
import { Theme } from "../../interfaces/common";

@Component({
  assetsDirs: ["assets"],
  tag: "calcite-ui-icon",
  styleUrl: "calcite-ui-icon.scss",
  shadow: true
})
export class CalciteUIIcon {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element()
  el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When true, the icon will be filled.
   */
  @Prop({
    reflect: true,
    mutable: true
  })
  filled: boolean = false;

  /**
   * The UI icon to display. Name must match icon from https://esri.github.io/calcite-ui-icons/.
   */
  @Prop({
    reflect: true,
    mutable: true
  })
  icon: string = null;

  /**
   * When true, the icon will be mirrored when the element direction is 'rtl'.
   */
  @Prop({
    reflect: true,
    mutable: true
  })
  mirrored: boolean = false;

  /**
   * Icon scale. Can be "s" | "m" | "l".
   */
  @Prop({
    reflect: true,
    mutable: true
  })
  scale: Scale = "m";

  /**
   * Icon theme. Can be "light" or "dark".
   */
  @Prop({
    reflect: true
  })
  theme: Theme = "light";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.waitUntilVisible(() => {
      this.visible = true;
      this.loadIconPathData();
    });
  }

  disconnectedCallback(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
  }

  async componentWillLoad(): Promise<void> {
    this.loadIconPathData();
  }

  render() {
    const { el, mirrored, pathData, scale } = this;
    const dir = getElementDir(el);
    const size = scaleToPx[scale];

    return (
      <Host role="img">
        <svg
          class={{
            [CSS.icon]: true,
            [CSS.mirrored]: dir === "rtl" && mirrored
          }}
          xmlns="http://www.w3.org/2000/svg"
          height={size}
          width={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <path d={pathData} />
        </svg>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private intersectionObserver: IntersectionObserver;

  @State()
  private pathData: string;

  @State()
  private visible = false;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  @Watch("icon")
  @Watch("filled")
  @Watch("size")
  private async loadIconPathData(): Promise<void> {
    const { filled, icon, scale, visible } = this;

    if (!icon || !visible) {
      return;
    }

    this.pathData = await fetchIcon({ icon, scale, filled });
  }

  private waitUntilVisible(callback: () => void): void {
    if (!(window as any).IntersectionObserver) {
      callback();
    }

    this.intersectionObserver = new IntersectionObserver(
      ([iconEntry]) => {
        if (iconEntry.isIntersecting) {
          this.intersectionObserver.disconnect();
          this.intersectionObserver = null;
          callback();
        }
      },
      { rootMargin: "50px" }
    );

    this.intersectionObserver.observe(this.el);
  }
}
