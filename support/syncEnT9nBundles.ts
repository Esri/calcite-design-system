import { readFile, copyFile } from "fs";

function syncEnT9nFiles() {
  const t9nManifestPath = "./manifest.txt";

  readFile(t9nManifestPath, (err, data) => {
    if (err) {
      return (err.code = "ENOENT") ? console.error(`${t9nManifestPath} file not found`) : console.error(err);
    }

    const arr = data.toString().replace(/\r\n/g, "\n").split("\n");

    for (const i of arr) {
      const path = i.replaceAll("\\", "/");
      const component = path.split("/")[2];

      console.log(`syncronizing t9 en files for ${component}`);

      copyFile(`${path}/en.json`, `${path}/en-US.json`, (err) => {
        if (err) {
          return console.log("err", err);
        }

        console.log(`created en-US.json file for ${component} `);
      });
    }
  });
}

syncEnT9nFiles();
