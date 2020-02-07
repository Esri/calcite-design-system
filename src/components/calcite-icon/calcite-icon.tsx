import {
  Component,
  h,
  Element,
  Prop,
  State,
  Watch,
  Host,
  Build
} from "@stencil/core";
import { CSS } from "./resources";
import { getElementDir } from "../../utils/dom";
import { fetchIcon, scaleToPx } from "./utils";
import { Scale } from "../../interfaces/Icon";
import { Theme } from "../../interfaces/common";

@Component({
  assetsDirs: ["assets"],
  tag: "calcite-icon",
  styleUrl: "calcite-icon.scss",
  shadow: true
})
export class CalciteIcon {
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
    reflect: true
  })
  filled: boolean = false;

  /**
   * The name of the icon to display. The value of this property must match the icon name from https://esri.github.io/calcite-ui-icons/.
   */
  @Prop({
    reflect: true
  })
  icon: string = null;

  /**
   * When true, the icon will be mirrored when the element direction is 'rtl'.
   */
  @Prop({
    reflect: true
  })
  mirrored: boolean = false;

  /**
   * Icon scale. Can be "s" | "m" | "l".
   */
  @Prop({
    reflect: true
  })
  scale: Scale = "m";

  /**
   * The icon label.
   *
   * It is recommended to set this value if your icon is semantic.
   */
  @Prop()
  textLabel: string;

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
    const { el, mirrored, pathData, scale, textLabel } = this;
    const dir = getElementDir(el);
    const size = scaleToPx[scale];
    const semantic = !!textLabel;

    return (
      <Host
        aria-label={semantic ? textLabel : null}
        role={semantic ? "img" : null}
      >
        <svg
          class={{
            [CSS.mirrored]: dir === "rtl" && mirrored
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
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

    if (!Build.isBrowser || !icon || !visible) {
      return;
    }

    this.pathData = await fetchIcon({ icon, scale, filled });
  }

  private waitUntilVisible(callback: () => void): void {
    if (
      !Build.isBrowser ||
      typeof window === "undefined" ||
      !(window as any).IntersectionObserver
    ) {
      callback();
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = null;
            callback();
          }
        });
      },
      { rootMargin: "50px" }
    );

    this.intersectionObserver.observe(this.el);
  }
}
