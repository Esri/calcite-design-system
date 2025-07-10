// @ts-strict-ignore
import { LitElement, property, h, JsxNode } from "@arcgis/lumina";
import { guid } from "../../utils/guid";
import { createObserver } from "../../utils/observers";
import { ColorStop, DataSeries, Point } from "./interfaces";
import { area, range, translate } from "./util";
import { styles } from "./graph.scss";
import { CSS, IDS } from "./resources";

declare global {
  interface DeclareElements {
    "calcite-graph": Graph;
  }
}

export class Graph extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private graphId = guid();

  private resizeObserver = createObserver("resize", () => this.requestUpdate());

  // #endregion

  // #region Public Properties

  /**
   * Array of values describing a single color stop ([offset, color, opacity])
   * These color stops should be sorted by offset value.
   */
  @property() colorStops: ColorStop[];

  /**
   * Array of tuples describing a single data point ([x, y])
   * These data points should be sorted by x-axis value.
   */
  @property() data: DataSeries = [];

  /** End of highlight color if highlighting range. */
  @property() highlightMax: number;

  /** Start of highlight color if highlighting range. */
  @property() highlightMin: number;

  /**
   * Highest point of the range.
   *
   * @required
   */
  @property({ reflect: true }) max: number;

  /**
   * Lowest point of the range.
   *
   * @required
   */
  @property({ reflect: true }) min: number;

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    this.resizeObserver?.observe(this.el);
  }

  override disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { data, colorStops, el, highlightMax, highlightMin, min, max } = this;
    const id = this.graphId;
    const { clientHeight: height, clientWidth: width } = el;

    // if we have no data, return empty svg
    if (!data || data.length === 0) {
      return (
        <svg
          ariaHidden="true"
          class={CSS.svg}
          height={height}
          preserveAspectRatio="none"
          viewBox={`0 0 ${width} ${height}`}
          width={width}
        />
      );
    }

    const { min: rangeMin, max: rangeMax } = range(data);

    let currentMin: Point = rangeMin;
    let currentMax: Point = rangeMax;

    if (min < rangeMin[0] || min > rangeMin[0]) {
      currentMin = [min, 0];
    }

    if (max > rangeMax[0] || max < rangeMax[0]) {
      currentMax = [max, rangeMax[1]];
    }

    const t = translate({ min: currentMin, max: currentMax, width, height });
    const [hMinX] = t([highlightMin, currentMax[1]]);
    const [hMaxX] = t([highlightMax, currentMax[1]]);
    const areaPath = area({ data, min: rangeMin, max: rangeMax, t });
    const fill = colorStops ? `url(#${IDS.linearGradient(id)})` : undefined;
    return (
      <svg
        ariaHidden="true"
        class={CSS.svg}
        height={height}
        preserveAspectRatio="none"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
      >
        {colorStops ? (
          <defs>
            <linearGradient id={IDS.linearGradient(id)} x1="0" x2="1" y1="0" y2="0">
              {colorStops.map(({ offset, color, opacity }) => (
                <stop offset={`${offset * 100}%`} stop-color={color} stop-opacity={opacity} />
              ))}
            </linearGradient>
          </defs>
        ) : null}

        {highlightMin !== undefined ? (
          [
            <mask height="100%" id={IDS.mask(id, 1)} width="100%" x="0%" y="0%">
              <path
                d={`
            M 0,0
            L ${hMinX - 1},0
            L ${hMinX - 1},${height}
            L 0,${height}
            Z
          `}
                fill="white"
              />
            </mask>,

            <mask height="100%" id={IDS.mask(id, 2)} width="100%" x="0%" y="0%">
              <path
                d={`
            M ${hMinX + 1},0
            L ${hMaxX - 1},0
            L ${hMaxX - 1},${height}
            L ${hMinX + 1}, ${height}
            Z
          `}
                fill="white"
              />
            </mask>,

            <mask height="100%" id={IDS.mask(id, 3)} width="100%" x="0%" y="0%">
              <path
                d={`
                M ${hMaxX + 1},0
                L ${width},0
                L ${width},${height}
                L ${hMaxX + 1}, ${height}
                Z
              `}
                fill="white"
              />
            </mask>,

            <path
              class={CSS.graphPath}
              d={areaPath}
              fill={fill}
              mask={`url(#${IDS.mask(id, 1)})`}
            />,
            <path
              class={CSS.graphPathHighlight}
              d={areaPath}
              fill={fill}
              mask={`url(#${IDS.mask(id, 2)})`}
            />,
            <path
              class={CSS.graphPath}
              d={areaPath}
              fill={fill}
              mask={`url(#${IDS.mask(id, 3)})`}
            />,
          ]
        ) : (
          <path class={CSS.graphPath} d={areaPath} fill={fill} />
        )}
      </svg>
    );
  }

  // #endregion
}
