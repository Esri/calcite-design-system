import stylelint from "stylelint";
import * as meta from "./meta.ts";
import { requireDeprecationAndRemovalVersions } from "./rule.ts";

export default stylelint.createPlugin(meta.name, requireDeprecationAndRemovalVersions);
