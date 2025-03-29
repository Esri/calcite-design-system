import { TransformedToken } from "style-dictionary/types";
import { SetRequired } from "type-fest";

// convenience type per https://styledictionary.com/reference/utils/tokens/#converttokendata
export type FlattenedTransformedToken = SetRequired<TransformedToken, "key">;
