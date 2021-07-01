import { Component, Element, Prop, h, VNode } from "@stencil/core";
import { DataSeries } from "./interfaces";
import { guid } from "../../utils/guid";
import { area, range, translate } from "./util";

@Component({
  tag: "calcite-graph",
  styleUrl: "calcite-graph.scss",
  shadow: true
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

  render(): VNode {
    const { data, width, height, highlightMax, highlightMin } = this;
    const id = this.maskId;

    // if we have no data, return empty svg
    if (!data || data.length === 0) {
      return (
        <svg
          class="svg"
          height={height}
          preserveAspectRatio="none"
          viewBox={`0 0 ${width} ${height}`}
          width={width}
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
        class="svg"
        height={height}
        preserveAspectRatio="none"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
      >
        {highlightMin !== undefined ? (
          <svg
            class="svg"
            height={height}
            preserveAspectRatio="none"
            viewBox={`0 0 ${width} ${height}`}
            width={width}
          >
            <mask height="100%" id={`${id}1`} width="100%" x="0%" y="0%">
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
            </mask>

            <mask height="100%" id={`${id}2`} width="100%" x="0%" y="0%">
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
            </mask>

            <mask height="100%" id={`${id}3`} width="100%" x="0%" y="0%">
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
            </mask>

            <path class="graph-path" d={areaPath} mask={`url(#${id}1)`} />
            <path class="graph-path--highlight" d={areaPath} mask={`url(#${id}2)`} />
            <path class="graph-path" d={areaPath} mask={`url(#${id}3)`} />
          </svg>
        ) : (
          <path class="graph-path" d={areaPath} />
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
