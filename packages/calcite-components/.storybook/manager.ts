import { addons } from "@storybook/manager-api";
import { load } from "cheerio";
import theme from "./theme";

const globalInternalAttributes = ["calcite-hydrated", "calcite-hydrated-hidden"];

addons.register("@whitespace/storybook-addon-html", (api) => {
  // intercept HTML-preview event and remove global internal-attrs
  api.on("html/htmlReceived", (eventData) => {
    const $ = load(eventData.html, null, false);
    globalInternalAttributes.forEach((attribute) => $(`[${attribute}]`).removeAttr(attribute));
    eventData.html = $.html();
  });
});

addons.setConfig({
  panelPosition: "right",
  theme,
});
