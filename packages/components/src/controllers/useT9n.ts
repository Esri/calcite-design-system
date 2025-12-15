import { makeT9nController } from "@arcgis/lumina/controllers";
import { getAssetPath } from "../runtime";

export const useT9n = makeT9nController(getAssetPath);
