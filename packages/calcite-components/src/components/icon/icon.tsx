// @ts-strict-ignore
import { CalciteIconPath, CalciteMultiPathEntry } from "@esri/calcite-ui-icons";
import { PropertyValues } from "lit";
import { LitElement, property, h, state, JsxNode } from "@arcgis/lumina";
import { getElementDir, toAriaBoolean } from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { Scale } from "../interfaces";
import { isBrowser } from "../../utils/browser";
import { CSS } from "./resources";
import { fetchIcon, getCachedIconData, scaleToPx } from "./utils";
import { IconNameOrString } from "./interfaces";
import { styles } from "./icon.scss";

declare global {
  interface DeclareElements {
    "calcite-icon": Icon;
  }
}

export class Icon extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private intersectionObserver: IntersectionObserver;

  // #endregion

  // #region State Properties

  @state() private pathData: CalciteIconPath;

  @state() private visible = false;

  // #endregion

  // #region Public Properties

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({
    reflect: true,
  })
  flipRtl = false;

  /**
   * Displays a specific icon.
   *
   * @see [Calcite UI Icons](https://developers.arcgis.com/calcite-design-system/icons).
   */
  @property({
    reflect: true,
  })
  icon: IconNameOrString = null;

  /** When true, it loads preloads the icon data. */
  @property({ reflect: true }) preload = false;

  /** Specifies the size of the component. */
  @property({
    reflect: true,
  })
  scale: Scale = "m";

  /**
   * Accessible name for the component.
   *
   * It is recommended to set this value if your icon is semantic.
   */
  @property() textLabel: string;

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    if (this.preload) {
      this.visible = true;
      this.loadIconPathData();
      return;
    }

    if (!this.visible) {
      this.waitUntilVisible(() => {
        this.visible = true;
        this.loadIconPathData();
      });
    }
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("icon") && (this.hasUpdated || this.icon !== null)) ||
      (changes.has("scale") && (this.hasUpdated || this.scale !== "m"))
    ) {
      this.loadIconPathData();
    }
  }

  override disconnectedCallback(): void {
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
  }

  // #endregion

  // #region Private Methods

  private async loadIconPathData(): Promise<void> {
    const { icon, scale, visible } = this;

    if (!isBrowser() || !icon || !visible) {
      return;
    }

    const fetchIconProps = { icon, scale };
    const pathData = getCachedIconData(fetchIconProps) || (await fetchIcon(fetchIconProps));

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

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { el, flipRtl, pathData, scale, textLabel } = this;
    const dir = getElementDir(el);
    const size = scaleToPx[scale];
    const semantic = !!textLabel;
    const paths = [].concat(pathData || "");
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaHidden = toAriaBoolean(!semantic);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaLabel = semantic ? textLabel : null;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = semantic ? "img" : null;
    return (
      <svg
        ariaHidden="true"
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
    );
  }

  // #endregion
}
