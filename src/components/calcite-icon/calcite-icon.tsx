import { Build, Component, Element, h, Host, Prop, State, VNode, Watch } from "@stencil/core";
import { CSS } from "./resources";
import { getElementDir } from "../../utils/dom";
import { fetchIcon, scaleToPx } from "./utils";
import { Scale } from "../interfaces";
import { CalciteIconPath, CalciteMultiPathEntry } from "@esri/calcite-ui-icons";

@Component({
  tag: "calcite-icon",
  styleUrl: "calcite-icon.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class CalciteIcon {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element()
  el: HTMLCalciteIconElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * The name of the icon to display. The value of this property must match the icon name from https://esri.github.io/calcite-ui-icons/.
   */
  @Prop({
    reflect: true
  })
  icon: string = null;

  /**
   * When true, the icon will be flipped when the element direction is 'rtl'.
   */
  @Prop({
    reflect: true
  })
  flipRtl = false;

  /**
   * Icon scale.
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

  render(): VNode {
    const { el, flipRtl, pathData, scale, textLabel } = this;
    const dir = getElementDir(el);
    const size = scaleToPx[scale];
    const semantic = !!textLabel;
    const paths = [].concat(pathData || "");
    return (
      <Host
        aria-hidden={(!semantic).toString()}
        aria-label={semantic ? textLabel : null}
        role={semantic ? "img" : null}
      >
        <svg
          class={{
            [CSS.flipRtl]: dir === "rtl" && flipRtl,
            svg: true
          }}
          fill="currentColor"
          height="100%"
          viewBox={`0 0 ${size} ${size}`}
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          {paths.map((path: string | CalciteMultiPathEntry) =>
            typeof path === "string" ? (
              <path d={path} />
            ) : (
              <path d={path.d} opacity={"opacity" in path ? path.opacity : 1} />
            )
          )}
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
  private pathData: CalciteIconPath;

  @State()
  private visible = false;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  @Watch("icon")
  @Watch("scale")
  private async loadIconPathData(): Promise<void> {
    const { icon, scale, visible } = this;

    if (!Build.isBrowser || !icon || !visible) {
      return;
    }

    this.pathData = await fetchIcon({ icon, scale });
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
      (entries) => {
        entries.forEach((entry) => {
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
