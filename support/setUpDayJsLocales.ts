import cpy from "cpy";

(async function () {
  const {
    promises: { readdir, readFile, writeFile }
  } = await import("fs");
  const { join } = await import("path");

  const targetDayJsLocaleDir = "./src/components/input-time-picker/assets/input-time-picker/nls/dayjs/locale/";
  const targetDayJsLocalePattern = "./node_modules/dayjs/esm/locale/*.js";
  await cpy(targetDayJsLocalePattern, targetDayJsLocaleDir, { flat: true });

  const localeDirPath = "src/components/input-time-picker/assets/input-time-picker/nls/dayjs/locale/";
  const localeFiles = await readdir(localeDirPath);

  // dayjs locales expect dayjs to be a local resource for auto-registration and won't load correctly when imported dynamically
  // since these lines are consistent in all locales, we remove them, so we can configure the locales ourselves after being imported

  for (const localeFile of localeFiles) {
    const localeFilePath = join(localeDirPath, localeFile);
    const contents = await readFile(localeFilePath, { encoding: "utf-8" });
    const updatedContents = contents
      .replace("import dayjs from '../index';", "")
      .replace("dayjs.locale(locale, null, true);", "");

    await writeFile(localeFilePath, updatedContents);
  }
})();
