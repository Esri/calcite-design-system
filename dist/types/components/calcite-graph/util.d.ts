import { DataSeries, Graph, TranslateOptions, Translator, Extent } from "../../interfaces/Graph";
/**
 * Generate a function which will translate a point
 * from the data coordinate space to svg viewbox oriented pixels
 */
export declare function translate({ width, height, min, max, }: TranslateOptions): Translator;
/**
 * Get the min and max values from the dataset
 */
export declare function range(data: DataSeries): Extent;
/**
 * Generate drawing commands for an area graph
 * returns a string can can be passed directly to a path element's `d` attribute
 */
export declare function area({ data, min, max, t }: Graph): string;
