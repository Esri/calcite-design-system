import { describe } from "vitest";
import rule from "../../../../src/rules/native-button-tab-index-required";
import * as path from "path";
import * as fs from "fs";
import { ruleTester } from "../../../../src/utils/rule-tester";

describe("native-button-tab-index-required", () => {
    const files = {
        good: path.resolve(__dirname, "native-button-tab-index-required.good.tsx"),
        wrong: path.resolve(__dirname, "native-button-tab-index-required.wrong.tsx"),
    };
    ruleTester().run("native-button-tab-index-required", rule, {
        valid: [
            {
                code: fs.readFileSync(files.good, "utf8"),
                filename: files.good,
            },
        ],

        invalid: [
            {
                code: fs.readFileSync(files.wrong, "utf8"),
                filename: files.wrong,
                errors: [
                    {
                        messageId: "default",
                    },
                ],
            },
        ],
    });
});
