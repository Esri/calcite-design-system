import { Component, Element, Prop, h } from "@stencil/core";
import { DataSeries } from "../../interfaces/Graph";
import { guid } from "../../utils/guid";
import { area, range, translate } from "./util";

@Component({
  tag: "calcite-graph",
  styleUrl: "calcite-graph.scss"
})
export class CalciteGraph {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteGraphElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * Array of tuples describing a single data point ([x, y])
   * These data points should be sorted by x-axis value
   */
  @Prop() data: DataSeries = [];

  /** Width of graph in pixels*/
  @Prop() width = 300;

  /** Width of graph in pixels*/
  @Prop() height = 100;

  /** Start of highlight color if highlighting range */
  @Prop() highlightMin: number;

  /** End of highlight color if highlighting range */
  @Prop() highlightMax: number;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    const { data, width, height, highlightMax, highlightMin } = this;
    const id = this.maskId;

    // if we have no data, return empty svg
    if (!data || data.length === 0) {
      return (
        <svg
          preserveAspectRatio="none"
          class="svg"
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
        />
      );
    }

    const { min, max } = range(data);
    const t = translate({ min, max, width, height });
    const [hMinX] = t([highlightMin, max[1]]);
    const [hMaxX] = t([highlightMax, max[1]]);
    const areaPath = area({ data, min, max, t });
    return (
      <svg
        preserveAspectRatio="none"
        class="svg"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
      >
        {highlightMin !== undefined ? (
          <svg
            preserveAspectRatio="none"
            class="svg"
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
          >
            <mask id={`${id}1`} x="0%" y="0%" width="100%" height="100%">
              <path
                fill="white"
                d={`
              M 0,0
              L ${hMinX - 1},0
              L ${hMinX - 1},${height}
              L 0,${height}
              Z
            `}
              />
            </mask>

            <mask id={`${id}2`} x="0%" y="0%" width="100%" height="100%">
              <path
                fill="white"
                d={`
              M ${hMinX + 1},0
              L ${hMaxX - 1},0
              L ${hMaxX - 1},${height}
              L ${hMinX + 1}, ${height}
              Z
            `}
              />
            </mask>

            <mask id={`${id}3`} x="0%" y="0%" width="100%" height="100%">
              <path
                fill="white"
                d={`
                  M ${hMaxX + 1},0
                  L ${width},0
                  L ${width},${height}
                  L ${hMaxX + 1}, ${height}
                  Z
                `}
              />
            </mask>

            <path d={areaPath} class="graph-path" mask={`url(#${id}1)`} />
            <path d={areaPath} class="graph-path--highlight" mask={`url(#${id}2)`} />
            <path d={areaPath} class="graph-path" mask={`url(#${id}3)`} />
          </svg>
        ) : (
          <path d={areaPath} class="graph-path" />
        )}
      </svg>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private maskId = `calcite-graph-mask-${guid()}`;
}
