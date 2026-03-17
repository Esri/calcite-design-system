import stylelint from "stylelint";
import * as meta from "./meta.ts";
import { requireDeprecationDetails } from "./rule.ts";

export default stylelint.createPlugin(meta.name, requireDeprecationDetails);
