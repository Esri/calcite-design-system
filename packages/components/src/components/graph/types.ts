import { Dimensions } from "../types";

/**
 * x,y coordinate set
 *
 * @public
 */
export type Point = [number, number];

/**
 * array of coordinates
 *
 * @public
 */
export type DataSeries = Point[];

/** Function that converts point from data space to pixels */
export type Translator = (p: Point) => Point;

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

/** @public */
export interface ColorStop {
  /** @public */
  offset: number;
  /** @public */
  color: string;
  /** @public */
  opacity?: number;
}
