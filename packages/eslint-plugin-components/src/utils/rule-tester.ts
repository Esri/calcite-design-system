import { RuleTester } from "@typescript-eslint/rule-tester";
import { describe, it, afterAll } from "vitest";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

export const ruleTester = () =>
  new RuleTester({
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.ts*"],
        }
      },
    },
  });
