import dedent from "dedent";
import { writeFile } from "node:fs/promises";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { getProjectLicenses } from "generate-license-file";

(async function(): Promise<void> {
  console.info("Generating third-party licenses file");

  const execAsync = promisify(exec);

  try {
    // we need a local `npm install` for `generate-license-file` to resolve licenses properly
    await execAsync("npm install --no-workspaces");

    const coveredByEsriLicense = [
      "@arcgis/lumina/controllers",
      "@arcgis/components-utils",
      "@arcgis/lumina",
      "@esri/calcite-components",
      "@esri/calcite-components-react",
      "@esri/calcite-design-tokens",
      "@esri/calcite-ui-icons",
      "@esri/eslint-config-calcite",
      "@esri/eslint-plugin-calcite-components",
    ];

    const licenses = await getProjectLicenses("./package.json", {
      exclude: [
        ...coveredByEsriLicense
      ],
      omitVersions: true,
      replace: {
        "type-fest": "./node_modules/type-fest/license-mit",
      },
    });

    const noLicensesMessage = "This packages does not have any third-party dependencies.";
    const markdownDivider = "---";
    const licensesContent = !licenses.length
      ? noLicensesMessage
      : licenses.map(
          (license) => dedent`
            ${license.dependencies.join(`\n`)}
            
            ${license.content}
           `,
        ).join(`\n\n${markdownDivider}\n\n`);

    const licenseFileContent = dedent`
## Third Party Licenses

${licensesContent}\n
`;

    const outputLicensesFile = "./THIRD-PARTY-LICENSES.md";
    await writeFile(outputLicensesFile, licenseFileContent);

    console.info(`Wrote third-party licenses to ${outputLicensesFile}`);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await execAsync("rimraf ./node_modules ./package-lock.json");
  }
})();
