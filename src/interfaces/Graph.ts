/** x,y coordinate set */
export type Point = [number, number];

/** array of coordinates */
export type DataSeries = Point[];

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

export interface Graph extends Dimensions {
  data: DataSeries;
}

export interface TranslateOptions extends Dimensions, Extent {}
export type Translator = (p: Point) => Point;
