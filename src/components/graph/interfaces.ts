/** x,y coordinate set */
export type Point = [number, number];

/** array of coordinates */
export type DataSeries = Point[];

/** Function that converts point from data space to pixels */
export type Translator = (p: Point) => Point;

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

export interface TranslateOptions extends Dimensions, Extent {}

export interface ColorStop {
  offset: number;
  color: string;
  opacity?: number;
}
