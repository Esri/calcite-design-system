import { RuleTester } from "@typescript-eslint/rule-tester";

export const ruleTester = () =>
  new RuleTester({
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.ts*"],
        },
        tsconfigRootDir: "../../../",
      },
    },
  });
