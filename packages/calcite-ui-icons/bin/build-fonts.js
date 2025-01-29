#!/usr/bin/env node
const { execSync } = require("child_process");
const {
  readdirSync,
  mkdirSync,
  rmSync,
  existsSync,
  lstatSync,
  symlinkSync,
  unlinkSync,
  readFileSync,
  writeFileSync,
} = require("fs");
const { join, basename } = require("path");
const prettier = require("@prettier/sync");

const SCRIPT_DIR = __dirname;
const PACKAGE_ROOT = join(SCRIPT_DIR, "..");
const fontsDir = join(PACKAGE_ROOT, "fonts/icons");
const iconsDir = join(PACKAGE_ROOT, "icons");

const sizes = [16, 24, 32];
const ensureDir = (dir) => mkdirSync(dir, { recursive: true });
const clearAndPrepareDirs = () => {
  if (existsSync(fontsDir)) {
    rmSync(fontsDir, { recursive: true, force: true });
  }
  sizes.forEach((size) => ensureDir(join(fontsDir, size.toString())));
};

const filterIcons = () =>
  readdirSync(iconsDir).filter((file) => {
    const filePath = join(iconsDir, file);
    return file.endsWith(".svg") && !readFileSync(filePath, "utf8").includes("opacity");
  });

const createLinks = (icons) => {
  icons.forEach((icon) => {
    const src = join(iconsDir, icon);
    const dest = join(fontsDir, basename(icon));
    symlinkSync(src, dest);
  });
};

const organizeIconsBySize = (size) => {
  const sizeDir = join(fontsDir, size.toString());
  readdirSync(fontsDir).forEach((file) => {
    if (file.includes(`-${size}`)) {
      const src = join(fontsDir, file);
      const dest = join(sizeDir, file.replace(`-${size}`, ""));
      if (lstatSync(src).isSymbolicLink()) {
        if (existsSync(dest)) unlinkSync(dest);
        symlinkSync(src, dest);
      }
    }
  });
};

const generateFonts = (size) =>
  execSync(`fantasticon fonts/icons/${size}/ -n calcite-ui-icons-${size} --normalize true -t ttf -g json -o fonts/`, {
    stdio: "inherit",
  });

const updateConfig = () => {
  const codepoints = JSON.parse(readFileSync(join(PACKAGE_ROOT, "fonts/calcite-ui-icons-16.json"), "utf8"));
  const config = prettier.format(JSON.stringify({ codepoints }), { parser: "json" });
  writeFileSync(join(PACKAGE_ROOT, "fantasticonrc.json"), config);
};

const main = () => {
  clearAndPrepareDirs();
  createLinks(filterIcons());
  sizes.forEach(organizeIconsBySize);
  sizes.forEach(generateFonts);
  updateConfig();
};

main();
