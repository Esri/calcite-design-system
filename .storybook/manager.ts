import { addons } from "@storybook/addons";
import theme from "./theme";
const cheerio = require("cheerio");

// override
addons.register("@whitespace/storybook-addon-html", (api) => {
  // intercept HTML-preview event and remove internal-attrs
  api.on("html/htmlReceived", (eventData) => {
    const $ = cheerio.load(eventData.html, null, false);
    $("[calcite-hydrated]", "");
    eventData.html = $.html();
  });
});

addons.setConfig({
  panelPosition: "right",
  theme
});
