import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { existsSync } from "fs";

const t9nLocales = [
  "ar",
  "bg",
  "bs",
  "ca",
  "cs",
  "da",
  "de",
  "el",
  "en",
  "es",
  "et",
  "fi",
  "fr",
  "he",
  "hr",
  "hu",
  "id",
  "it",
  "ja",
  "ko",
  "lt",
  "lv",
  "no",
  "nl",
  "pl",
  "pt-BR",
  "pt-PT",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-CN",
  "zh-HK",
  "zh-TW",
];

// use yargs with proper types to get a lang argument from the command line
const argv = yargs(hideBin(process.argv)).argv;

(async function () {
  const {
    promises: { copyFile },
  } = await import("fs");
  const { resolve, sep, win32 } = await import("path");

  const entries = ["./src/components/input-time-zone/assets/input-time-zone/t9n"];
  const synchronized: string[] = [];

  console.log(`synchronizing t9n messages.json files`);

  for (const entry of entries) {
    const path = entry.split(win32.sep).join(sep);
    const component = path.split(sep)[2];

    const source = resolve(`${path}/messages.json`);

    const { target } = argv as any;

    // if target equals "all", iterate through all strings from the t9nLocales constant from the locales module
    // if target is a string, use that string as the target language
    // if target is an array, use each string in the array as a target language
    // then check if a file exists and copy it to the target location only if it does not exist
    if (target === "all") {
      for (const locale of t9nLocales) {
        const destination = resolve(`${path}/messages_${locale}.json`);
        if (!existsSync(destination)) {
          await copyFile(source, destination);
          synchronized.push(component);
        }
      }
    } else if (typeof target === "string") {
      const destination = resolve(`${path}/messages_${target}.json`);
      if (!existsSync(destination)) {
        await copyFile(source, destination);
        synchronized.push(component);
      }
    } else if (Array.isArray(target)) {
      for (const locale of target) {
        const destination = resolve(`${path}/messages_${locale}.json`);
        if (!existsSync(destination)) {
          await copyFile(source, destination);
          synchronized.push(component);
        }
      }
    } else {
      console.error(`Invalid target language: ${target}`);
      process.exit(1);
    }
  }

  console.log(
    `created messages_en.json file for the following components: \n${synchronized
      .map((synchronized) => `* ${synchronized}`)
      .join("\n")} `
  );
})();
