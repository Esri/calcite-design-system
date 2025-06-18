import { boolean } from "../../../.storybook/utils";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import type { TileGroup } from "./tile-group";

const { dir, layout, scale } = ATTRIBUTES;

interface TileGroupStoryArgs extends Pick<TileGroup, "disabled" | "layout" | "scale"> {
  dir: string;
}

export default {
  title: "Components/Tiles/Tile Group",
  args: {
    dir: dir.defaultValue,
    disabled: false,
    layout: layout.defaultValue,
    scale: scale.defaultValue,
  },
  argTypes: {
    dir: {
      options: dir.values,
      control: { type: "select" },
    },
    layout: {
      options: layout.values.filter(
        (option) =>
          option !== "grid" &&
          option !== "inline" &&
          option !== "center" &&
          option !== "auto" &&
          option !== "fixed" &&
          option !== "none" &&
          option !== "horizontal-single",
      ),
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: { delay: 10000, viewports: [1728] },
  },
};

interface TileHtmlOptions {
  contentBottom: boolean;
  contentTop: boolean;
  description: boolean;
  heading: boolean;
  icon: boolean;
  link: boolean;
  selected: boolean;
}

function getTileGroupHtml(
  options: Partial<TileHtmlOptions> = {},
  layout: TileGroup["layout"],
  selectionMode: TileGroup["selectionMode"] = "none",
  scale: TileGroup["scale"],
): string {
  return html`
    <calcite-tile-group layout="${layout}" selection-mode="${selectionMode}" scale="${scale}">
      ${Array(4)
        .fill(null)
        .map((value, index) => {
          let selected = false;

          if (selectionMode === "single") {
            selected = index === (scale === "s" ? 0 : scale === "m" ? 1 : 2);
          } else if (selectionMode === "multiple") {
            selected =
              scale === "s"
                ? // select even tiles
                  index % 2 === 0
                : // select odd tiles
                  scale === "m"
                  ? index % 2 !== 0
                  : // select all except for the 3rd tile
                    index !== 2;
          }

          return getTileHtml({ ...options, selected });
        })
        .join("\n")}
    </calcite-tile-group>
  `;
}

function getTileHtml(options: Partial<TileHtmlOptions> = {}): string {
  const {
    contentBottom = false,
    contentTop = false,
    description = false,
    heading = false,
    icon = false,
    link = false,
    selected = false,
  } = options;

  const imageWidth = 275;
  const imageHeight = 100;
  const content = [
    contentTop
      ? html`<img src="${placeholderImage({ width: imageWidth, height: imageHeight })}" slot="content-top" />`
      : "",
    contentBottom
      ? html`<img src="${placeholderImage({ width: imageWidth, height: imageHeight })}" slot="content-bottom" />`
      : "",
  ];

  return html`
    <calcite-tile
      ${heading ? 'heading="Tile heading"' : ""}
      ${description ? 'description="This is sort of a medium length description."' : ""}
      ${link ? 'href="/"' : ""}
      ${icon ? 'icon="layers"' : ""}
      ${selected ? "selected" : ""}
    >
      ${content.length > 0 ? content.join("\n") : ""}
    </calcite-tile>
  `;
}

export const simple = (args: TileGroupStoryArgs): string => html`
  <calcite-tile-group
    dir="${args.dir}"
    ${boolean("disabled", args.disabled)}
    layout="${args.layout}"
    scale="${args.scale}"
  >
    ${getTileHtml({ heading: true, description: true, icon: true })}
    ${getTileHtml({ heading: true, description: true, icon: true })}
    ${getTileHtml({ heading: true, description: true, icon: true })}
    ${getTileHtml({ heading: true, description: true, icon: true })}
  </calcite-tile-group>
`;

function createVariantsHtmlStory(layout: TileGroup["layout"]): () => string {
  return () => html`
    <style>
      .parent {
        display: flex;
        color: var(--calcite-color-text-3);
        font-family: var(--calcite-sans-family);
        font-size: var(--calcite-font-size-0);
        font-weight: var(--calcite-font-weight-medium);
      }

      .child {
        display: inline-flex;
        flex-direction: column;
        flex: 0 1 50%;
        padding: 15px;
      }

      .right-aligned-text {
        text-align: right;
        flex: 0 0 21%;
      }

      .screenshot-test {
        gap: 1em;
        padding: 0 1em;
      }

      .spaced-column {
        display: flex;
        flex-direction: column;
        gap: 1em;
      }

      hr {
        margin: 25px 0;
        border-top: 1px solid var(--calcite-color-border-2);
      }
    </style>

    <div class="parent">
      <div class="child right-aligned-text"><h2>${layout}</h2></div>
    </div>

    <div class="parent">
      <div class="child"></div>
      <div class="child">small</div>
      <div class="child">medium</div>
      <div class="child">large</div>
    </div>

    <!-- single -->
    <div class="parent">
      <div class="child right-aligned-text">single</div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "single",
          "s",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "single",
          "m",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "single",
          "l",
        )}
      </div>
    </div>

    <!-- single selection-appearance="border" -->
    <div class="parent">
      <div class="child right-aligned-text">single selection-appearance="border"</div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "single",
          "s",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "single",
          "m",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "single",
          "l",
        )}
      </div>
    </div>

    <!-- multiple -->
    <div class="parent">
      <div class="child right-aligned-text">multiple</div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "multiple",
          "s",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "multiple",
          "m",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "multiple",
          "l",
        )}
      </div>
    </div>

    <!-- single-persist -->
    <div class="parent">
      <div class="child right-aligned-text">single-persist</div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "single-persist",
          "s",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "single-persist",
          "m",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "single-persist",
          "l",
        )}
      </div>
    </div>

    <!-- none -->
    <div class="parent">
      <div class="child right-aligned-text">none</div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "none",
          "s",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "none",
          "m",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "none",
          "l",
        )}
      </div>
    </div>

    <!-- links -->
    <div class="parent">
      <div class="child right-aligned-text">links</div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
            link: true,
          },
          layout,
          "none",
          "s",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
            link: true,
          },
          layout,
          "none",
          "m",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
            link: true,
          },
          layout,
          "none",
          "l",
        )}
      </div>
    </div>

    <!-- disabled -->
    <div class="parent">
      <div class="child right-aligned-text">disabled</div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "none",
          "s",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "none",
          "m",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            icon: true,
          },
          layout,
          "none",
          "l",
        )}
      </div>
    </div>

    <!-- heading -->
    <div class="parent">
      <div class="child right-aligned-text">heading</div>
      <div class="child">${getTileGroupHtml({ heading: true }, layout, "none", "s")}</div>
      <div class="child">${getTileGroupHtml({ heading: true }, layout, "none", "m")}</div>
      <div class="child">${getTileGroupHtml({ heading: true }, layout, "none", "l")}</div>
    </div>

    <!-- heading links -->
    <div class="parent">
      <div class="child right-aligned-text">heading links</div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            link: true,
          },
          layout,
          "none",
          "s",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            link: true,
          },
          layout,
          "none",
          "m",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            link: true,
          },
          layout,
          "none",
          "l",
        )}
      </div>
    </div>

    <!-- description -->
    <div class="parent">
      <div class="child right-aligned-text">description</div>
      <div class="child">${getTileGroupHtml({ description: true }, layout, "none", "s")}</div>
      <div class="child">${getTileGroupHtml({ description: true }, layout, "none", "m")}</div>
      <div class="child">${getTileGroupHtml({ description: true }, layout, "none", "l")}</div>
    </div>

    <!-- description links -->
    <div class="parent">
      <div class="child right-aligned-text">description links</div>
      <div class="child">
        ${getTileGroupHtml(
          {
            description: true,
            link: true,
          },
          layout,
          "none",
          "s",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            description: true,
            link: true,
          },
          layout,
          "none",
          "m",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            description: true,
            link: true,
          },
          layout,
          "none",
          "l",
        )}
      </div>
    </div>

    <!-- heading and description -->
    <div class="parent">
      <div class="child right-aligned-text">heading and description</div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
          },
          layout,
          "none",
          "s",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
          },
          layout,
          "none",
          "m",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
          },
          layout,
          "none",
          "l",
        )}
      </div>
    </div>

    <!-- heading and description links -->
    <div class="parent">
      <div class="child right-aligned-text">heading and description links</div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            link: true,
          },
          layout,
          "none",
          "s",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            link: true,
          },
          layout,
          "none",
          "m",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            description: true,
            link: true,
          },
          layout,
          "none",
          "l",
        )}
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">icon and heading (large visual) + none selection mode</div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            icon: true,
          },
          layout,
          "none",
          "s",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            icon: true,
          },
          layout,
          "none",
          "m",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            icon: true,
          },
          layout,
          "none",
          "l",
        )}
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">icon and heading (large visual) + multiple selection mode</div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            icon: true,
          },
          layout,
          "multiple",
          "s",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            icon: true,
          },
          layout,
          "multiple",
          "m",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            icon: true,
          },
          layout,
          "multiple",
          "l",
        )}
      </div>
    </div>

    <!-- icon and heading (large visual) links -->
    <div class="parent">
      <div class="child right-aligned-text">icon and heading (large visual) links</div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            icon: true,
            link: true,
          },
          layout,
          "none",
          "s",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            icon: true,
            link: true,
          },
          layout,
          "none",
          "m",
        )}
      </div>
      <div class="child">
        ${getTileGroupHtml(
          {
            heading: true,
            icon: true,
            link: true,
          },
          layout,
          "none",
          "l",
        )}
      </div>
    </div>

    <!-- content-top slotted images -->
    <div class="parent">
      <div class="child right-aligned-text">content-top slotted images</div>
      <div class="child">${getTileGroupHtml({ contentTop: true }, layout, "none", "s")}</div>
      <div class="child">${getTileGroupHtml({ contentTop: true }, layout, "none", "m")}</div>
      <div class="child">${getTileGroupHtml({ contentTop: true }, layout, "none", "l")}</div>
    </div>

    <!-- content-bottom slotted images -->
    <div class="parent">
      <div class="child right-aligned-text">content-bottom slotted images</div>
      <div class="child">${getTileGroupHtml({ contentBottom: true }, layout, "none", "s")}</div>
      <div class="child">${getTileGroupHtml({ contentBottom: true }, layout, "none", "m")}</div>
      <div class="child">${getTileGroupHtml({ contentBottom: true }, layout, "none", "l")}</div>
    </div>

    <!-- slotted images in both slots -->
    <div class="parent">
      <div class="child right-aligned-text">slotted images in both slots</div>
      <div class="child">${getTileGroupHtml({ contentBottom: true, contentTop: true }, layout, "none", "s")}</div>
      <div class="child">${getTileGroupHtml({ contentBottom: true, contentTop: true }, layout, "none", "m")}</div>
      <div class="child">${getTileGroupHtml({ contentBottom: true, contentTop: true }, layout, "none", "l")}</div>
    </div>
  `;
}

export const allVariantsHorizontal = createVariantsHtmlStory("horizontal");
export const allVariantsVertical = createVariantsHtmlStory("vertical");
