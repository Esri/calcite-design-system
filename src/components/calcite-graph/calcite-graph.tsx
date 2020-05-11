import { Component, Element, Prop, Host, h } from "@stencil/core";
import { DataSeries } from "../../interfaces/Graph";
import { area } from "./util";

@Component({
  tag: "calcite-graph",
  styleUrl: "calcite-graph.scss",
  shadow: true,
})
export class CalciteGraph {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

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
  @Prop() width: number = 300;

  /** Width of graph in pixels*/
  @Prop() height: number = 100;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillUpdate(): void {}

  render() {
    const { data, width, height } = this;
    return (
      <Host>
        <svg
          width={width}
          height={height}
          class="svg"
          viewBox={`0 0 ${width} ${height}`}
        >
          <path d={area({ data, width, height })} />
        </svg>
      </Host>
    );
  }
}
