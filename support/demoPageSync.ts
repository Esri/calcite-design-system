const { close: fsClose, copyFileSync, open: fsOpen, utimes } = require("fs");
const { normalize } = require("path");
const { watch } = require("chokidar");

const projectRoot = normalize(`${__dirname}/../`);
const sourceDir = normalize(`${projectRoot}src/`);
const sourceDemoDir = normalize(`${sourceDir}demos/`);
const destinationWebDir = normalize(`${projectRoot}www/`);
const destinationDemoDir = normalize(`${destinationWebDir}demos/`);
const sourceIndexFile = normalize(`${sourceDir}index.html`);
const buildTriggeringFile = normalize(`${sourceDir}components/interfaces.ts`);
const noop = (): void => {
  // intentionally empty
};

const dotFiles = /(^|[\/\\])\../;

const demoWatcher = watch(normalize(`${sourceDemoDir}**/*.@(js|css|html|template)`), {
  ignored: dotFiles,
  persistent: true,
  ignoreInitial: true
});
demoWatcher.on("all", (_eventName, path) => triggerBuild(sourceDemoDir, destinationDemoDir, path));

const indexWatcher = watch(sourceIndexFile, {
  ignored: dotFiles,
  persistent: true,
  ignoreInitial: true
});
indexWatcher.on("change", (path) => triggerBuild(sourceDir, destinationWebDir, path));

function triggerBuild(srcDir: string, destinationDir: string, path: string): void {
  const dest = path.replace(srcDir, destinationDir);
  copyFileSync(path, dest);

  // This triggers a rebuild in Stencil, which triggers a reload of the demo page.
  markFileAsModified(buildTriggeringFile);
}

function markFileAsModified(path: string, done: (error?: NodeJS.ErrnoException) => void = noop): void {
  const time = new Date();

  utimes(path, time, time, (timestampError) => {
    if (timestampError) {
      return fsOpen(path, "w", (fileOpenError, fileDescriptor) => {
        fileOpenError ? done(fileOpenError) : fsClose(fileDescriptor, done);
      });
    }

    done();
  });
}
