const {
  promises: { readFile, readdir, writeFile }
} = require("fs");
const { normalize } = require("path");
const { quote } = require("shell-quote");

(async function () {
  const esmEs5Output = quote([normalize(`${__dirname}/../dist/esm-es5/`)]);

  // we patch __spreadArray to work around https://github.com/microsoft/tslib/issues/175
  // see https://github.com/Esri/calcite-components/issues/4481#issuecomment-1128336510 for more info
  const spreadArrayHelperToken =
    /(var __spreadArray\=this\&\&this\.__spreadArray\|\|function\(\w\,)(\w)(\,\w\)\{)(if\((?:\w)\|\|arguments\.length\=\=\=2\))/;
  const patchedSpreadArrayReplacement = '$1$2$3if(typeof $2 === "string"){$2=Array.prototype.slice.call($2)}$4';
  const files = await readdir(esmEs5Output);

  try {
    for (const file of files) {
      const filePath = quote([normalize(`${esmEs5Output}/${file}`)]);
      const contents = await readFile(filePath, { encoding: "utf8" });
      await writeFile(filePath, contents.replace(spreadArrayHelperToken, patchedSpreadArrayReplacement));
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
