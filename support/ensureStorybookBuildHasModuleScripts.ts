// this script should no longer be needed once https://github.com/storybookjs/storybook/issues/9900 is addressed

const posthtml = require("posthtml");
const { readFileSync, writeFileSync } = require("fs");

const html = readFileSync(".docs/iframe.html");

posthtml()
  .process(html)
  .then(({ tree }) => {
    tree.match({ tag: "script" }, (node) => {
      if (node.attrs?.src?.endsWith(".esm.js") && node.attrs?.type !== "module") {
        node.attrs.type = "module";
      }

      return node;
    });

    return tree.render(tree);
  })
  .then((transformedHtml) => writeFileSync(".docs/iframe.html", transformedHtml));
