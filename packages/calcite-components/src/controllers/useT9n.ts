import { makeT9nController } from "@arcgis/components-controllers";
import { getAssetPath } from "../runtime";

export const useT9n = makeT9nController(getAssetPath);
