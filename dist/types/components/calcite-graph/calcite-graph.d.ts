import { DataSeries } from "../../interfaces/Graph";
export declare class CalciteGraph {
    el: HTMLElement;
    /**
     * Array of tuples describing a single data point ([x, y])
     * These data points should be sorted by x-axis value
     */
    data: DataSeries;
    /** Width of graph in pixels*/
    width: number;
    /** Width of graph in pixels*/
    height: number;
    /** Start of highlight color if highlighting range */
    highlightMin: number;
    /** End of highlight color if highlighting range */
    highlightMax: number;
    componentWillUpdate(): void;
    render(): any;
    private maskId;
}
