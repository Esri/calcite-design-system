import stylelint from "stylelint";
import * as meta from "./meta.ts";
import { deprecationFormat } from "./rule.ts";

export default stylelint.createPlugin(meta.name, deprecationFormat);
