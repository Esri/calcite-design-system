/** x,y coordinate set */
export declare type Point = [number, number];
/** array of coordinates */
export declare type DataSeries = Point[];
/** Function that converts point from data space to pixels */
export declare type Translator = (p: Point) => Point;
/** Dimensions (in pixels) */
export interface Dimensions {
    width: number;
    height: number;
}
/** Min/Max from all values of a given data set */
export interface Extent {
    min: Point;
    max: Point;
}
export interface Graph extends Extent {
    data: DataSeries;
    t: Translator;
}
export interface TranslateOptions extends Dimensions, Extent {
}
