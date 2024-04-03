import { CalciteIconPath, CalciteMultiPathEntry } from "@esri/calcite-ui-icons";
import { Build, Component, Element, h, Host, Prop, State, VNode, Watch } from "@stencil/core";
import { getElementDir, toAriaBoolean } from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { Scale } from "../interfaces";
import { CSS } from "./resources";
import { fetchIcon, scaleToPx } from "./utils";

@Component({
  tag: "calcite-icon",
  styleUrl: "icon.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Icon {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * Displays a specific icon.
   *
   * @see [Icons](https://esri.github.io/calcite-ui-icons)
   */
  @Prop({
    reflect: true,
  })
  icon: string = null;

  /**
   * When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`).
   */
  @Prop({
    reflect: true,
  })
  flipRtl = false;

  /**
   * Specifies the size of the component.
   */
  @Prop({
    reflect: true,
  })
  scale: Scale = "m";

  /**
   * Accessible name for the component.
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
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
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
        aria-hidden={toAriaBoolean(!semantic)}
        aria-label={semantic ? textLabel : null}
        role={semantic ? "img" : null}
      >
        <svg
          aria-hidden="true"
          class={{
            [CSS.flipRtl]: dir === "rtl" && flipRtl,
            svg: true,
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
            ),
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

  @Element() el: HTMLCalciteIconElement;

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

    const pathData = await fetchIcon({ icon, scale });

    // While the fetchIcon method is awaiting response, the icon requested can change. This check is to verify the response received belongs to the current icon.
    if (icon !== this.icon) {
      return;
    }

    this.pathData = pathData;
  }

  private waitUntilVisible(callback: () => void): void {
    this.intersectionObserver = createObserver(
      "intersection",
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = null;
            callback();
          }
        });
      },
      { rootMargin: "50px" },
    );

    if (!this.intersectionObserver) {
      callback();
      return;
    }

    this.intersectionObserver.observe(this.el);
  }
}
