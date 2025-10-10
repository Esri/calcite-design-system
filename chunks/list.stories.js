import { k as c, h as e, j as N } from "./index.js";
import { p as F } from "./placeholder-image.js";
import { i as q } from "./helpers.js";
import { A as J } from "./resources16.js";
import { w as G } from "./without.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  selectionMode: V,
  interactionMode: A,
  selectionAppearance: W,
  scale: K
} = J, X = {
  title: "Components/List",
  args: {
    closable: !1,
    closed: !1,
    disabled: !1,
    displayMode: "flat",
    dragEnabled: !1,
    filterEnabled: !1,
    interactionMode: A.values[0],
    label: "My List",
    loading: !1,
    scale: K.defaultValue,
    selectionAppearance: W.defaultValue,
    selectionMode: V.values[1],
    iconStart: "",
    iconEnd: ""
  },
  argTypes: {
    selectionMode: {
      options: V.values.filter((a) => a !== "children" && a !== "multichildren" && a !== "ancestors"),
      control: {
        type: "select"
      }
    },
    interactionMode: {
      options: A.values,
      control: {
        type: "select"
      }
    },
    displayMode: {
      options: ["flat", "nested"],
      control: {
        type: "select"
      }
    },
    scale: {
      options: K.values,
      control: {
        type: "select"
      }
    },
    selectionAppearance: {
      options: G(W.values, "neutral", "highlight"),
      control: {
        type: "select"
      }
    },
    iconStart: {
      options: q,
      control: {
        type: "select"
      }
    },
    iconEnd: {
      options: q,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      delay: 500
    }
  }
}, t = F({
  width: 44,
  height: 44
}), l = () => e` selection-mode="none" selection-appearance="icon" label="My List" `, r = (a) => e`
  <calcite-list
    ${c("closable", a.closable)}
    ${c("closed", a.closed)}
    ${c("disabled", a.disabled)}
    ${c("drag-enabled", a.dragEnabled)}
    ${c("filter-enabled", a.filterEnabled)}
    ${c("loading", a.loading)}
    display-mode="${a.displayMode}"
    interaction-mode="${a.interactionMode}"
    label="${a.label}"
    scale="${a.scale}"
    selection-appearance="${a.selectionAppearance}"
    selection-mode="${a.selectionMode}"
  >
    <calcite-list-item
      label="Cras iaculis ultricies nulla."
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      icon-start="${a.iconStart}"
      icon-end="${a.iconEnd}"
    ></calcite-list-item>
    <calcite-list-item
      label="Ut aliquam sollicitudin leo."
      description="Aliquam tincidunt mauris eu risus."
      icon-start="${a.iconStart}"
      icon-end="${a.iconEnd}"
    ></calcite-list-item>
    <calcite-list-item
      label="Vestibulum commodo felis quis tortor.
    "
      description="Vestibulum auctor dapibus neque.
    "
      icon-start="${a.iconStart}"
      icon-end="${a.iconEnd}"
    ></calcite-list-item>
    <calcite-list-item
      disabled
      label="Vestibulum commodo felis quis tortor.
    "
      description="Vestibulum auctor dapibus neque.
    "
      icon-start="${a.iconStart}"
      icon-end="${a.iconEnd}"
    ></calcite-list-item>
    <calcite-list-item
      drag-disabled
      label="Vestibulum commodo felis quis tortor.
    "
      description="Vestibulum auctor dapibus neque.
    "
      icon-start="${a.iconStart}"
      icon-end="${a.iconEnd}"
    ></calcite-list-item>
    <calcite-list-item
      unavailable
      label="Vestibulum commodo felis quis tortor."
      description="Vestibulum auctor dapibus neque."
      icon-start="${a.iconStart}"
      icon-end="${a.iconEnd}"
    ></calcite-list-item>
  </calcite-list>
`, m = () => e`
  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales with icon-start and icon-end</div>

    <div class="child">
      <calcite-list scale="s" selection-mode="none" label="test">
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
      <calcite-list selection-mode="none" label="test">
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
      <calcite-list scale="l" selection-mode="none" label="test">
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales nested with icon-start and icon-end</div>

    <div class="child">
      <calcite-list display-mode="nested" scale="s" selection-mode="none" label="test">
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          scale="s"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="small parent"
          value="small"
          description="small hello world"
          scale="s"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="small child"
            value="small"
            description="small hello world"
            scale="s"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="s"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="small grandchild"
              value="small"
              description="small hello world"
              scale="s"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="s"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="s"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" selection-mode="none" label="test">
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          scale="m"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="medium parent"
          value="medium"
          description="medium hello world"
          scale="m"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="medium child"
            value="medium"
            description="medium hello world"
            scale="m"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="m"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="medium grandchild"
              value="medium"
              description="medium hello world"
              scale="m"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="m"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="m"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" scale="l" selection-mode="none" label="test">
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          scale="l"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="large parent"
          value="large"
          description="large hello world"
          scale="l"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="large child"
            value="large"
            description="large hello world"
            scale="l"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="l"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="large grandchild"
              value="large"
              description="large hello world"
              scale="l"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="l"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="l"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales draggable</div>

    <div class="child">
      <calcite-list drag-enabled scale="s" selection-mode="none" label="test">
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list drag-enabled selection-mode="none" label="test">
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list drag-enabled scale="l" selection-mode="none" label="test">
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales draggable nested</div>

    <div class="child">
      <calcite-list display-mode="nested" drag-enabled scale="s" selection-mode="none" label="test">
        <calcite-list-item closable label="small" value="small" description="small hello world" scale="s">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small parent" value="small" description="small hello world" scale="s">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="small child" value="small" description="small hello world" scale="s">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="s"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="small grandchild"
              value="small"
              description="small hello world"
              scale="s"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="s"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="s"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" drag-enabled selection-mode="none" label="test">
        <calcite-list-item closable label="medium" value="medium" description="medium hello world" scale="m">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium parent" value="medium" description="medium hello world" scale="m">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="medium child" value="medium" description="medium hello world" scale="m">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="m"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="medium grandchild"
              value="medium"
              description="medium hello world"
              scale="m"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="m"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="m"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" drag-enabled scale="l" selection-mode="none" label="test">
        <calcite-list-item closable label="large" value="large" description="large hello world" scale="l">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large parent" value="large" description="large hello world" scale="l">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="large child" value="large" description="large hello world" scale="l">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="l"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="large grandchild"
              value="large"
              description="large hello world"
              scale="l"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="l"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="l"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales icon</div>

    <div class="child">
      <calcite-list scale="s" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          scale="s"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          scale="s"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          scale="m"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          scale="m"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list scale="l" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          scale="l"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          scale="l"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales icon nested</div>

    <div class="child">
      <calcite-list display-mode="nested" scale="s" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          scale="s"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="small parent"
          value="small"
          description="small hello world"
          scale="s"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="small child"
            value="small"
            description="small hello world"
            scale="s"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="s"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="small grandchild"
              value="small"
              description="small hello world"
              scale="s"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="s"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="s"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          scale="m"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="medium parent"
          value="medium"
          description="medium hello world"
          scale="m"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="medium child"
            value="medium"
            description="medium hello world"
            scale="m"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="m"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="medium grandchild"
              value="medium"
              description="medium hello world"
              scale="m"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="m"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="m"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" scale="l" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          scale="l"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="large parent"
          value="large"
          description="large hello world"
          scale="l"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="large child"
            value="large"
            description="large hello world"
            scale="l"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="l"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="large grandchild"
              value="large"
              description="large hello world"
              scale="l"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="l"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="l"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales icon draggable</div>

    <div class="child">
      <calcite-list drag-enabled scale="s" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list drag-enabled selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list drag-enabled scale="l" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales icon draggable nested</div>

    <div class="child">
      <calcite-list display-mode="nested" drag-enabled scale="s" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          scale="s"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="small parent"
          value="small"
          description="small hello world"
          scale="s"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="small child"
            value="small"
            description="small hello world"
            scale="s"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="s"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="small grandchild"
              value="small"
              description="small hello world"
              scale="s"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="s"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="s"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" drag-enabled selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          scale="m"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="medium parent"
          value="medium"
          description="medium hello world"
          scale="m"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="medium child"
            value="medium"
            description="medium hello world"
            scale="m"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="m"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="medium grandchild"
              value="medium"
              description="medium hello world"
              scale="m"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="m"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="m"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" drag-enabled scale="l" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          scale="l"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="large parent"
          value="large"
          description="large hello world"
          scale="l"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="large child"
            value="large"
            description="large hello world"
            scale="l"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="l"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="large grandchild"
              value="large"
              description="large hello world"
              scale="l"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="l"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="l"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales border</div>

    <div class="child">
      <calcite-list scale="s" selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list scale="l" selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales border nested</div>

    <div class="child">
      <calcite-list display-mode="nested" scale="s" selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small parent" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="small child" value="small" description="small hello world" scale="s">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="s"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="small grandchild"
              value="small"
              description="small hello world"
              scale="s"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="s"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="s"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium parent" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="medium child" value="medium" description="medium hello world">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="m"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item closable label="medium grandchild" value="medium" description="medium hello world">
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="m"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="m"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" scale="l" selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large parent" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="large child" value="large" description="large hello world" scale="l">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="l"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="large grandchild"
              value="large"
              description="large hello world"
              scale="l"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="l"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="l"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales border draggable</div>

    <div class="child">
      <calcite-list drag-enabled scale="s" selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list drag-enabled selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list drag-enabled scale="l" selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales border draggable nested</div>

    <div class="child">
      <calcite-list
        display-mode="nested"
        drag-enabled
        scale="s"
        selection-appearance="border"
        selection-mode="single"
        label="test"
      >
        <calcite-list-item closable label="small" value="small" description="small hello world" scale="s">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small parent" value="small" description="small hello world" scale="s">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="small child" value="small" description="small hello world" scale="s">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="s"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="small grandchild"
              value="small"
              description="small hello world"
              scale="s"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="s"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="s"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list
        display-mode="nested"
        drag-enabled
        selection-appearance="border"
        selection-mode="single"
        label="test"
      >
        <calcite-list-item closable label="medium" value="medium" description="medium hello world" scale="m">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium parent" value="medium" description="medium hello world" scale="m">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="medium child" value="medium" description="medium hello world" scale="m">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="m"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="medium grandchild"
              value="medium"
              description="medium hello world"
              scale="m"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="m"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="m"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list
        display-mode="nested"
        drag-enabled
        scale="l"
        selection-appearance="border"
        selection-mode="single"
        label="test"
      >
        <calcite-list-item closable label="large" value="large" description="large hello world" scale="l">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large parent" value="large" description="large hello world" scale="l">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="large child" value="large" description="large hello world" scale="l">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="l"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="large grandchild"
              value="large"
              description="large hello world"
              scale="l"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="l"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="l"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- filter enabled -->
  <div class="parent">
    <div class="child right-aligned-text">filter enabled small scale</div>

    <div class="child">
      <calcite-list scale="s" drag-enabled selection-mode="single" label="test" filter-enabled>
        <calcite-action
          appearance="transparent"
          icon="banana"
          text="menu"
          label="menu"
          scale="s"
          slot="filter-actions-start"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="ellipsis"
          text="menu"
          label="menu"
          scale="s"
          slot="filter-actions-start"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="filter"
          text="menu"
          label="menu"
          scale="s"
          slot="filter-actions-end"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="sort-ascending"
          text="menu"
          label="menu"
          scale="s"
          slot="filter-actions-end"
        ></calcite-action>
        <calcite-list-item label="small1" value="small1" description="small hello world 1">
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item label="small2" value="small2" description="small hello world 2">
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item label="small3" value="small3" description="small hello world 3">
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item disabled label="small4" value="small4" description="small hello world 4: disabled">
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item unavailable label="small4" value="small5" description="small hello world 5: unavailable">
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-notice slot="filter-no-results" icon kind="warning" scale="s" open>
          <div slot="title">No Results</div>
          <div slot="message">Try a different filter</div>
        </calcite-notice>
      </calcite-list>
    </div>
  </div>

  <!-- filter enabled -->
  <div class="parent">
    <div class="child right-aligned-text">filter enabled medium scale</div>

    <div class="child">
      <calcite-list drag-enabled selection-mode="single" label="test" filter-enabled>
        <calcite-action
          appearance="transparent"
          icon="banana"
          text="menu"
          label="menu"
          slot="filter-actions-start"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="ellipsis"
          text="menu"
          label="menu"
          slot="filter-actions-start"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="filter"
          text="menu"
          label="menu"
          slot="filter-actions-end"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="sort-ascending"
          text="menu"
          label="menu"
          slot="filter-actions-end"
        ></calcite-action>
        <calcite-list-item label="medium1" value="medium1" description="medium hello world 1">
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item label="medium2" value="medium2" description="medium hello world 2">
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item label="medium3" value="medium3" description="medium hello world 3">
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item disabled label="medium4" value="medium4" description="medium hello world 4: disabled">
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item unavailable label="medium4" value="medium5" description="medium hello world 5: unavailable">
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-notice slot="filter-no-results" icon kind="warning" scale="s" open>
          <div slot="title">No Results</div>
          <div slot="message">Try a different filter</div>
        </calcite-notice>
      </calcite-list>
    </div>
  </div>

  <!-- filter enabled -->
  <div class="parent">
    <div class="child right-aligned-text">filter enabled large scale</div>

    <div class="child">
      <calcite-list scale="l" drag-enabled selection-mode="single" label="test" filter-enabled>
        <calcite-action
          appearance="transparent"
          icon="banana"
          text="menu"
          label="menu"
          scale="l"
          slot="filter-actions-start"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="ellipsis"
          text="menu"
          label="menu"
          scale="l"
          slot="filter-actions-start"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="filter"
          text="menu"
          label="menu"
          scale="l"
          slot="filter-actions-end"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="sort-ascending"
          text="menu"
          label="menu"
          scale="l"
          slot="filter-actions-end"
        ></calcite-action>
        <calcite-list-item label="large1" value="large1" description="large hello world 1">
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item label="large2" value="large2" description="large hello world 2">
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item label="large3" value="large3" description="large hello world 3">
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item disabled label="large4" value="large4" description="large hello world 4: disabled">
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item unavailable label="large4" value="large5" description="large hello world 5: unavailable">
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-notice slot="filter-no-results" icon kind="warning" scale="s" open>
          <div slot="title">No Results</div>
          <div slot="message">Try a different filter</div>
        </calcite-notice>
      </calcite-list>
    </div>
  </div>

  <!-- content-bottom slot -->
  <div class="parent">
    <div class="child right-aligned-text">content-bottom slot</div>

    <div class="child">
      <calcite-list scale="s" selection-mode="none" label="test">
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
          <span slot="content-bottom">Some text in the content-bottom slot</span>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
      <calcite-list selection-mode="none" label="test">
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
          <span slot="content-bottom">Some text in the content-bottom slot</span>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
      <calcite-list scale="l" selection-mode="none" label="test">
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
          <span slot="content-bottom">Some text in the content-bottom slot</span>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- grouped -->
  <div class="parent">
    <div class="child right-aligned-text">grouped small scale</div>

    <div class="child">
      <calcite-list scale="s" selection-mode="single">
        <calcite-list-item-group heading="Small Heading 1">
          <calcite-list-item label="Small Label 1" description="small description 1"></calcite-list-item>
          <calcite-list-item label="Small Label 2" description="small description 2"></calcite-list-item>
          <calcite-list-item label="Small Label 3" description="small description 3"></calcite-list-item>
        </calcite-list-item-group>
        <calcite-list-item-group heading="Small Heading 2">
          <calcite-list-item label="Small Label 1" description="small description 1"></calcite-list-item>
          <calcite-list-item label="Small Label 2" description="small description 2"></calcite-list-item>
          <calcite-list-item label="Small Label 3" description="small description 3"></calcite-list-item>
        </calcite-list-item-group>
      </calcite-list>
    </div>
  </div>

  <!-- grouped -->
  <div class="parent">
    <div class="child right-aligned-text">grouped medium scale</div>

    <div class="child">
      <calcite-list scale="m" selection-mode="single">
        <calcite-list-item-group heading="Medium Heading 1">
          <calcite-list-item label="Medium Label 1" description="medium description 1"></calcite-list-item>
          <calcite-list-item label="Medium Label 2" description="medium description 2"></calcite-list-item>
          <calcite-list-item label="Medium Label 3" description="medium description 3"></calcite-list-item>
        </calcite-list-item-group>
        <calcite-list-item-group heading="Medium Heading 2">
          <calcite-list-item label="Medium Label 1" description="medium description 1"></calcite-list-item>
          <calcite-list-item label="Medium Label 2" description="medium description 2"></calcite-list-item>
          <calcite-list-item label="Medium Label 3" description="medium description 3"></calcite-list-item>
        </calcite-list-item-group>
      </calcite-list>
    </div>
  </div>

  <!-- grouped -->
  <div class="parent">
    <div class="child right-aligned-text">grouped large scale</div>

    <div class="child">
      <calcite-list scale="l" selection-mode="single">
        <calcite-list-item-group heading="Large Heading 1">
          <calcite-list-item label="Large Label 1" description="large description 1"></calcite-list-item>
          <calcite-list-item label="Large Label 2" description="large description 2"></calcite-list-item>
          <calcite-list-item label="Large Label 3" description="large description 3"></calcite-list-item>
        </calcite-list-item-group>
        <calcite-list-item-group heading="Large Heading 2">
          <calcite-list-item label="Large Label 1" description="large description 1"></calcite-list-item>
          <calcite-list-item label="Large Label 2" description="large description 2"></calcite-list-item>
          <calcite-list-item label="Large Label 3" description="large description 3"></calcite-list-item>
        </calcite-list-item-group>
      </calcite-list>
    </div>
  </div>
`, d = () => e`
  <calcite-list ${l()}>
    <calcite-list-item label="This has no description."> </calcite-list-item>
  </calcite-list>
  <calcite-list>
    <calcite-list-item description="This has no label."> </calcite-list-item>
  </calcite-list>
`, p = () => e`
  <calcite-list ${l()}>
    <calcite-list-item label="This has no description.">
      <calcite-handle slot="actions-start"></calcite-handle>
      <calcite-action
        slot="actions-start"
        appearance="transparent"
        text="Banana"
        icon="banana"
        text-enabled
      ></calcite-action>
      <calcite-action-menu appearance="transparent" slot="actions-end">
        <calcite-action appearance="transparent" text="Plus" icon="plus" text-enabled></calcite-action>
        <calcite-action appearance="transparent" text="Minus" icon="minus" text-enabled></calcite-action>
        <calcite-action appearance="transparent" text="Table" icon="table" text-enabled></calcite-action>
      </calcite-action-menu>
      <calcite-dropdown slot="actions-end">
        <calcite-action appearance="transparent" icon="plus" slot="trigger"></calcite-action>
        <calcite-dropdown-group selection-mode="single" group-title="Sort by">
          <calcite-dropdown-item>Relevance</calcite-dropdown-item>
          <calcite-dropdown-item>Date modified</calcite-dropdown-item>
          <calcite-dropdown-item>Title</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
    </calcite-list-item>
  </calcite-list>
`, n = () => e`
  <calcite-list display-mode="nested" ${l()}>
    <calcite-list-item
      expanded
      label="Level 1 item 1"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    ></calcite-list-item>
    <calcite-list-item
      expanded
      label="Level 1 item 2"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <calcite-list-item
        expanded
        label="Level 2 item 1"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      >
        <calcite-list-item
          expanded
          label="Level 3 item 1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ></calcite-list-item>
        <calcite-list-item
          expanded
          label="Level 3 item 2"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        >
          <calcite-list-item
            expanded
            label="Level 4 item 1"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <calcite-list-item
              expanded
              label="Level 5 item 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            ></calcite-list-item>
          </calcite-list-item>
          <calcite-list-item
            expanded
            label="Level 4 item 2"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          ></calcite-list-item>
          <calcite-list-item
            expanded
            label="Level 4 item 3"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          ></calcite-list-item>
        </calcite-list-item>
        <calcite-list-item
          expanded
          label="Level 3 item 3"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ></calcite-list-item>
      </calcite-list-item>
      <calcite-list-item
        expanded
        label="Level 2 item 2"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      ></calcite-list-item>
      <calcite-list-item
        expanded
        label="Level 2 item 3"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      ></calcite-list-item>
    </calcite-list-item>
    <calcite-list-item
      expanded
      label="Level 1 item 3"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    ></calcite-list-item>
  </calcite-list>
`;
n.parameters = {
  chromatic: {
    diffThreshold: 1
  }
};
const i = () => e`
  <calcite-list display-mode="nested" ${l()}>
    <calcite-list-item-group heading="Nested">
      <calcite-list-item
        expanded
        label="Cras iaculis ultricies nulla."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      >
        <calcite-list-item
          expanded
          label="Ut aliquam sollicitudin leo."
          description="Aliquam tincidunt mauris eu risus."
        >
          <calcite-list-item
            expanded
            label="Vestibulum commodo felis quis tortor."
            description="Vestibulum auctor dapibus neque."
          ></calcite-list-item></calcite-list-item
      ></calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item-group heading="Digits">
      <calcite-list-item
        expanded
        label="One"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      ></calcite-list-item>
      <calcite-list-item expanded label="Two" description="Aliquam tincidunt mauris eu risus."></calcite-list-item>
      <calcite-list-item label="Three" description="Vestibulum auctor dapibus neque."></calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item-group heading="Letters">
      <calcite-list-item
        expanded
        label="A"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      ></calcite-list-item>
      <calcite-list-item expanded label="B" description="Aliquam tincidunt mauris eu risus."></calcite-list-item>
      <calcite-list-item
        expanded
        label="C"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      ></calcite-list-item>
    </calcite-list-item-group>
  </calcite-list>
`;
i.parameters = {
  chromatic: {
    diffThreshold: 1
  }
};
const u = () => e`<calcite-list ${l()}>
    <calcite-list-item>
      <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>
      <calcite-icon icon="layers" scale="m" slot="content-start"></calcite-icon>
      <span slot="content-start">Some value or something and a <b>thing</b>.</span>
      <div slot="content-end" style="display: flex; justify-content: flex-end">
        <calcite-chip class="list-chip" icon="ribbon-rosette" scale="s">Review</calcite-chip>
        <calcite-chip class="list-chip" icon="globe" scale="s">Good</calcite-chip>
      </div>
    </calcite-list-item>
    <calcite-list-item>
      <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>
      <calcite-icon icon="user" scale="m" slot="content-start"></calcite-icon>
      <span slot="content-start">Some value or something and a <b>thing</b>.</span>
      <div slot="content-end" style="display: flex; justify-content: flex-end">
        <calcite-chip class="list-chip" icon="globe" scale="s">Good</calcite-chip>
      </div>
    </calcite-list-item>
    <calcite-list-item>
      <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>
      <calcite-icon icon="user" scale="m" slot="content-start"></calcite-icon>
      <span slot="content-start">Some value or something and a <b>thing</b>.</span>
      <div slot="content-end" style="display: flex; justify-content: flex-end">
        <calcite-chip class="list-chip" icon="bell" scale="s">Halp!</calcite-chip>
      </div>
    </calcite-list-item>
    <calcite-list-item unavailable>
      <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>
      <calcite-icon icon="user" scale="m" slot="content-start"></calcite-icon>
      <span slot="content-start">Some value or something and a <b>thing</b>.</span>
      <div slot="content-end" style="display: flex; justify-content: flex-end">
        <calcite-chip class="list-chip" icon="bell" scale="s">Halp!</calcite-chip>
      </div>
    </calcite-list-item>
  </calcite-list> `, b = () => e`<calcite-list ${l()}>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
    </calcite-list-item>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
    </calcite-list-item>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
    </calcite-list-item>
    <calcite-list-item unavailable label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
    </calcite-list-item>
  </calcite-list> `, g = () => e`<calcite-list display-mode="nested" ${l()}>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom" expanded>
      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
      <calcite-list display-mode="nested"
        ><calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom" expanded>
          <span slot="content-bottom">Some value or something and a <b>thing</b>.</span
          ><calcite-list display-mode="nested"
            ><calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
              <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
            </calcite-list-item></calcite-list
          >
        </calcite-list-item></calcite-list
      >
    </calcite-list-item>
  </calcite-list> `, v = () => e`
  <calcite-list ${l()}>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <calcite-action icon="web" label="Princess Bubblegum website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${t}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Finn Mertens website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${t}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Jake T. Dog website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${t}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="exclamation-mark-triangle"
        slot="content-end"
        style="color: var(--calcite-color-status-danger)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
  </calcite-list>
`, h = () => e`
  <calcite-list filter-enabled>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <calcite-action icon="web" label="Princess Bubblegum website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${t}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Finn Mertens website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${t}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Jake T. Dog website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${t}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="exclamation-mark-triangle"
        slot="content-end"
        style="color: var(--calcite-color-status-danger)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
  </calcite-list>
`, x = () => e`
  <calcite-list filter-enabled>
    <calcite-list-item-group hidden heading="Layers">
      <calcite-list-item hidden label="Hidden item" description="I should not be displayed."> </calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom"> </calcite-list-item>
    <calcite-list-item hidden label="Hidden item" description="I should not be displayed."> </calcite-list-item>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom"> </calcite-list-item>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom"> </calcite-list-item>
  </calcite-list>
`, s = () => e`
  <h1>selection-mode="none" + selection-appearance="icon"</h1>
  <calcite-list class="calcite-mode-dark" dir="rtl" ${l()}>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <calcite-action icon="web" label="Princess Bubblegum website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${t}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Finn Mertens website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${t}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Jake T. Dog website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${t}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="exclamation-mark-triangle"
        slot="content-end"
        style="color: var(--calcite-color-status-danger)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
  </calcite-list>

  <h1>selection-mode="single-persist" + selection-appearance="border" + dir="rtl"</h1>
  <calcite-list
    class="calcite-mode-dark"
    label="RTL list"
    selection-appearance="border"
    selection-mode="single-persist"
    dir="rtl"
  >
    <calcite-list-item label="My first list item" selected>First </calcite-list-item>
    <calcite-list-item label="My second list item">Second </calcite-list-item>
  </calcite-list>
`;
s.parameters = {
  themes: N
};
const w = () => e`<calcite-list disabled>
    <calcite-list-item
      label="Cras iaculis ultricies nulla."
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    ></calcite-list-item>
    <calcite-list-item
      disabled
      label="Ut aliquam sollicitudin leo."
      description="Aliquam tincidunt mauris eu risus."
    ></calcite-list-item>
    <calcite-list-item
      label="Vestibulum commodo felis quis tortor.
    "
      description="Vestibulum auctor dapibus neque.
    "
    ></calcite-list-item>
  </calcite-list>`, _ = () => e`<calcite-list disabled>
    <calcite-list-item>
      <div slot="content">
        <strong>Cras iaculis ultricies nulla.</strong>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div></calcite-list-item
    >
    <calcite-list-item disabled>
      <div slot="content">
        <strong>Cras iaculis ultricies nulla.</strong>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div></calcite-list-item
    >
    <calcite-list-item
      ><div slot="content">
        <strong>Cras iaculis ultricies nulla.</strong>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div></calcite-list-item
    >
  </calcite-list>`, f = () => e`<calcite-list selection-mode="single-persist" label="test">
    <calcite-list-item selected label="basic" value="basic" description="hello world">
      <calcite-icon
        icon="banana"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action
        appearance="transparent"
        icon="ellipsis"
        text="menu"
        label="menu"
        slot="actions-end"
      ></calcite-action>
    </calcite-list-item>
    <calcite-list-item disabled label="disabled" value="disabled" description="hello world">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item label="basic2" value="basic2" description="hello world">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
  </calcite-list>`, y = () => e`<calcite-list selection-mode="single" label="test" filter-enabled>
    <calcite-list-item selected closable label="basic" value="basic" description="hello world">
      <calcite-icon
        icon="banana"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action
        appearance="transparent"
        icon="ellipsis"
        text="menu"
        label="menu"
        slot="actions-end"
      ></calcite-action>
    </calcite-list-item>
    <calcite-list-item closable disabled label="disabled" value="disabled" description="hello world">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item closed closable label="closed" value="closed" description="hello world">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
  </calcite-list>`, o = () => e`<calcite-list
      display-mode="nested"
      filter-enabled
      filter-text="est"
      filter-placeholder="Find content"
      selection-appearance="border"
      selection-mode="single"
    >
      <calcite-list-item label="Estuaries" value="estuaries" hidden></calcite-list-item>
      <calcite-list-item-group heading="Layers">
        <calcite-list-item selected label="Hiking trails" value="hiking-trails">
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item disabled label="Waterfalls" value="waterfalls">
          <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item label="Rivers" value="rivers" expanded>
          <calcite-list-item label="Estuaries" value="estuaries">
            <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
              <calcite-action
                slot="trigger"
                appearance="transparent"
                icon="ellipsis"
                scale="s"
                text="Trails layer"
              ></calcite-action>
              <calcite-dropdown-group scale="s" selection-mode="none">
                <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
              </calcite-dropdown-group>
            </calcite-dropdown>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list-item-group>
      <calcite-list-item-group heading="Tables">
        <calcite-list-item label="Hiking trails table" value="hiking-trails-table">
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item label="Waterfalls table" value="waterfalls-table">
          <calcite-icon slot="content-end" icon="exclamation-mark-circle-f" scale="s"></calcite-icon>
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
      </calcite-list-item-group>
      <calcite-list-item-group heading="Basemaps">
        <calcite-list-item disabled label="Waterfalls" value="waterfalls">
          <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>
        </calcite-list-item>
      </calcite-list-item-group> </calcite-list
    ><calcite-list
      filter-enabled
      filter-text="water"
      filter-placeholder="Find content"
      selection-appearance="border"
      selection-mode="single"
    >
      <calcite-list-item-group heading="Layers">
        <calcite-list-item selected label="Hiking trails" value="hiking-trails">
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item disabled label="Waterfalls" value="waterfalls">
          <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item label="Rivers" value="rivers" expanded>
          <calcite-list-item label="Estuaries" value="estuaries">
            <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
              <calcite-action
                slot="trigger"
                appearance="transparent"
                icon="ellipsis"
                scale="s"
                text="Trails layer"
              ></calcite-action>
              <calcite-dropdown-group scale="s" selection-mode="none">
                <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
              </calcite-dropdown-group>
            </calcite-dropdown>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list-item-group>
      <calcite-list-item-group heading="Tables">
        <calcite-list-item label="Hiking trails table" value="hiking-trails-table">
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item label="Waterfalls table" value="waterfalls-table">
          <calcite-icon slot="content-end" icon="exclamation-mark-circle-f" scale="s"></calcite-icon>
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
      </calcite-list-item-group>
      <calcite-list-item-group heading="Basemaps">
        <calcite-list-item disabled label="Waterfalls" value="waterfalls">
          <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>
        </calcite-list-item>
      </calcite-list-item-group>
    </calcite-list>`;
o.parameters = {
  chromatic: {
    delay: 1e3
  }
};
const L = () => e`<calcite-list selection-mode="single" label="test" filter-enabled>
    <calcite-action
      appearance="transparent"
      icon="banana"
      text="menu"
      label="menu"
      slot="filter-actions-start"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="ellipsis"
      text="menu"
      label="menu"
      slot="filter-actions-start"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="filter"
      text="menu"
      label="menu"
      slot="filter-actions-end"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="sort-ascending"
      text="menu"
      label="menu"
      slot="filter-actions-end"
    ></calcite-action>
    <calcite-list-item label="test1" value="test1" description="hello world 1">
      <calcite-icon
        icon="banana"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item selected label="test2" value="test2" description="hello world 2">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item label="test3" value="test3" description="hello world 3">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item disabled label="test4" value="test4" description="hello world 4">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
  </calcite-list>`, T = () => e`<calcite-list drag-enabled selection-mode="single" label="List 1" filter-enabled>
    <calcite-action
      appearance="transparent"
      icon="banana"
      text="menu"
      label="menu"
      slot="filter-actions-start"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="ellipsis"
      text="menu"
      label="menu"
      slot="filter-actions-start"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="filter"
      text="menu"
      label="menu"
      slot="filter-actions-end"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="sort-ascending"
      text="menu"
      label="menu"
      slot="filter-actions-end"
    ></calcite-action>
    <calcite-list-item label="test1" value="test1" description="hello world 1">
      <calcite-icon
        icon="banana"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item selected label="test2" value="test2" description="hello world 2">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item label="test3" value="test3" description="hello world 3">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item disabled label="test4" value="test4" description="hello world 4">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item drag-disabled label="test5" value="test5" description="hello world 55">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
  </calcite-list>`, S = () => e`<calcite-list display-mode="nested" drag-enabled group="nested" label="List 1" selection-mode="multiple">
    <calcite-list-item expanded label="Hi! 1" description="hello world">
      <calcite-list display-mode="nested" drag-enabled label="List 2" group="nested" selection-mode="multiple">
        <calcite-list-item expanded label="Hi! 2" description="hello world">
          <calcite-list display-mode="nested" drag-enabled label="List 3" group="nested" selection-mode="multiple">
            <calcite-list-item expanded label="Hi! 3" description="hello world">
              <calcite-list
                display-mode="nested"
                drag-enabled
                label="List 4"
                group="nested"
                selection-mode="multiple"
              ></calcite-list>
            </calcite-list-item>
            <calcite-list-item expanded label="Hi! 4" description="hello world"></calcite-list-item>
          </calcite-list>
        </calcite-list-item>
        <calcite-list-item expanded label="Hi! 5" description="hello world"></calcite-list-item>
      </calcite-list>
    </calcite-list-item>
    <calcite-list-item expanded label="Hi! 6" description="hello world"></calcite-list-item>
    <calcite-list-item expanded label="Hi! 7" description="hello world"></calcite-list-item>
  </calcite-list>`, k = () => e`<calcite-list display-mode="nested" drag-enabled group="nested" label="List 1" selection-mode="multiple">
    <calcite-list-item expanded label="Hi! 1" description="hello world">
      <calcite-list display-mode="nested" drag-enabled label="List 2" group="nested" selection-mode="multiple">
        <calcite-list-item expanded label="Hi! 2" description="hello world">
          <calcite-list display-mode="nested" drag-enabled label="List 3" group="nested" selection-mode="multiple">
            <calcite-list-item expanded label="Hi! 3" description="hello world">
              <calcite-action-menu overlay-positioning="fixed" slot="actions-end">
                <calcite-action text-enabled text="Edit" icon="pencil"></calcite-action>
                <calcite-action text-enabled text="Delete" icon="trash"></calcite-action>
                <calcite-action text-enabled text="Delete" icon="trash"></calcite-action>
                <calcite-action text-enabled text="Delete" icon="trash"></calcite-action>
                <calcite-action text-enabled text="Delete" icon="trash"></calcite-action>
              </calcite-action-menu>
              <calcite-list
                display-mode="nested"
                drag-enabled
                label="List 4"
                group="nested"
                selection-mode="multiple"
              ></calcite-list>
            </calcite-list-item>
            <calcite-list-item expanded label="Hi! 4" description="hello world">
              <calcite-list
                display-mode="nested"
                drag-enabled
                label="List 5"
                group="nested"
                selection-mode="multiple"
              ></calcite-list>
            </calcite-list-item>
          </calcite-list>
        </calcite-list-item>
        <calcite-list-item expanded label="Hi! 5" description="hello world">
          <calcite-list
            display-mode="nested"
            drag-enabled
            label="List 6"
            group="nested"
            selection-mode="multiple"
          ></calcite-list>
        </calcite-list-item>
      </calcite-list>
    </calcite-list-item>
    <calcite-list-item expanded label="Hi! 6" description="hello world">
      <calcite-list
        display-mode="nested"
        drag-enabled
        label="List 7"
        group="nested"
        selection-mode="multiple"
      ></calcite-list>
    </calcite-list-item>
    <calcite-list-item expanded label="Hi! 7" description="hello world">
      <calcite-list
        display-mode="nested"
        drag-enabled
        label="List 8"
        group="nested"
        selection-mode="multiple"
      ></calcite-list></calcite-list-item
  ></calcite-list>`, I = () => e`<calcite-list display-mode="nested" drag-enabled label="List 1" group="nested" selection-mode="single">
    <calcite-list-item expanded label="Hi! 4" description="hello world">
      <calcite-list
        display-mode="nested"
        drag-enabled
        label="List 2"
        group="nested"
        selection-mode="single"
      ></calcite-list>
    </calcite-list-item>
  </calcite-list>`, D = () => e`<calcite-list filter-enabled>
    <calcite-list-item-group heading="Outdoor recreation">
      <calcite-list-item label="Hiking trails" description="Designated routes for hikers to use." value="hiking-trails">
        <calcite-action slot="actions-end" icon="layer" text="Trails layer"></calcite-action>
      </calcite-list-item>
      <calcite-list-item label="Waterfalls" description="Vertical drops from a river." value="waterfalls">
        <calcite-action slot="actions-end" icon="layer" text="Waterfalls layer"></calcite-action>
      </calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item label="Rivers" description="Large naturally flowing watercourses." value="rivers">
      <calcite-action slot="actions-end" icon="layer" text="Rivers layer"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Estuaries" description="Where the river meets the sea." value="estuaries">
      <calcite-action slot="actions-end" icon="layer" text="Estuaries layer"></calcite-action>
    </calcite-list-item>
    <calcite-list-item
      label="Park offices"
      description="Home base for park staff to converse with visitors."
      value="offices"
    >
      <calcite-action slot="actions-end" icon="layer" text="Offices layer"></calcite-action>
    </calcite-list-item>
    <calcite-list-item-group heading="Buildings">
      <calcite-list-item
        label="Guest lodges"
        description="Small houses available for visitors to book for stays."
        value="lodges"
      >
        <calcite-action slot="actions-end" icon="layer" text="Lodges layer"></calcite-action>
      </calcite-list-item>
      <calcite-list-item
        label="Yurts"
        description="Insulated portable rounded structures similar to tents."
        value="yurts"
      >
        <calcite-action slot="actions-end" icon="layer" text="Yurts layer"></calcite-action>
      </calcite-list-item>
    </calcite-list-item-group>
  </calcite-list>`, H = () => e`<calcite-list filter-enabled filter-text="Bananas" selection-appearance="border" selection-mode="single">
    <calcite-list-item label="Apples" value="apples"></calcite-list-item>
    <calcite-list-item label="Oranges" value="oranges"></calcite-list-item>
    <calcite-list-item label="Pears" value="pears"></calcite-list-item>
    <calcite-notice slot="filter-no-results" icon kind="warning" scale="s" open>
      <div slot="title">No fruits found</div>
      <div slot="message">Try a different fruit?</div>
    </calcite-notice>
  </calcite-list>`, $ = () => e`<h4>Nesting List Items</h4>
  <calcite-list display-mode="nested">
    <calcite-list-item label="List Item" expanded>
      <calcite-list-item label="List Item"></calcite-list-item>
      <calcite-list-item label="List Item"></calcite-list-item>
      <calcite-list-item label="List Item"></calcite-list-item>
    </calcite-list-item>
  </calcite-list>
  </br>
  <h4>Nesting Lists</h4>
  <calcite-list display-mode="nested">
    <calcite-list-item label="List Item" expanded>
      <calcite-list display-mode="nested">
        <calcite-list-item label="List Item"></calcite-list-item>
        <calcite-list-item label="List Item"></calcite-list-item>
        <calcite-list-item label="List Item"></calcite-list-item>
      </calcite-list>
    </calcite-list-item>
  </calcite-list>`, R = () => e` <calcite-list>
    <calcite-list-item
      closable
      label="Hiking trails"
      description="Designated routes for hikers to use."
      value="hiking-trails"
    >
    </calcite-list-item>
    <calcite-list-item closed closable label="Waterfalls" description="Vertical drops from a river." value="waterfalls">
    </calcite-list-item>
    <calcite-list-item
      closed
      closable
      label="Rivers"
      description="Large naturally flowing watercourses."
      value="rivers"
    >
    </calcite-list-item>
    <calcite-list-item
      closed
      closable
      label="Hiking trails"
      description="Designated routes for hikers to use."
      value="hiking-trails"
    >
    </calcite-list-item>
    <calcite-list-item closed closable label="Waterfalls" description="Vertical drops from a river." value="waterfalls">
    </calcite-list-item>
    <calcite-list-item
      closed
      closable
      label="Rivers"
      description="Large naturally flowing watercourses."
      value="rivers"
    >
    </calcite-list-item>
    <calcite-list-item
      closed
      closable
      label="Hiking trails"
      description="Designated routes for hikers to use."
      value="hiking-trails"
    >
    </calcite-list-item>
    <calcite-list-item closed closable label="Waterfalls" description="Vertical drops from a river." value="waterfalls">
    </calcite-list-item>
    <calcite-list-item
      closed
      closable
      label="Rivers"
      description="Large naturally flowing watercourses."
      value="rivers"
    >
    </calcite-list-item>
    <calcite-list-item
      closable
      label="Hiking trails"
      description="Designated routes for hikers to use."
      value="hiking-trails"
    >
    </calcite-list-item>
  </calcite-list>`, P = () => e`<calcite-list display-mode="nested" id="root" drag-enabled label="List 1" group="my-list">
    <calcite-list-item expanded label="Depth 1" description="Item 1">
      <calcite-list display-mode="nested" group="my-list">
        <calcite-list-item expanded label="Depth 2" description="Item 2">
          <calcite-list display-mode="nested" drag-enabled label="List 2" group="my-list">
            <calcite-list-item label="Depth 3" description="Item 3">
              <calcite-list display-mode="nested" drag-enabled label="List 3" group="my-list"></calcite-list>
            </calcite-list-item>
            <calcite-list-item label="Depth 3" description="Item 4"></calcite-list-item>
          </calcite-list>
        </calcite-list-item>
        <calcite-list-item label="Depth 2" description="Item 5"></calcite-list-item>
      </calcite-list>
    </calcite-list-item>
    <calcite-list-item label="Depth 1" description="Item 6"></calcite-list-item>
    <calcite-list-item drag-disabled label="Depth 1" description="Item 7"></calcite-list-item>
  </calcite-list>`, C = () => e`<calcite-list display-mode="nested" id="root" drag-enabled label="List 1" group="my-list">
    <div>
      <calcite-list-item expanded label="Depth 1" description="Item 1">
        <calcite-list display-mode="nested" group="my-list">
          <div>
            <calcite-list-item expanded label="Depth 2" description="Item 2">
              <calcite-list display-mode="nested" drag-enabled label="List 2" group="my-list">
                <div>
                  <calcite-list-item label="Depth 3" description="Item 3">
                    <calcite-list display-mode="nested" drag-enabled label="List 3" group="my-list"></calcite-list>
                  </calcite-list-item>
                </div>
                <div><calcite-list-item label="Depth 3" description="Item 4"></calcite-list-item></div>
              </calcite-list>
            </calcite-list-item>
          </div>
          <div><calcite-list-item label="Depth 2" description="Item 5"></calcite-list-item></div>
        </calcite-list>
      </calcite-list-item>
    </div>
    <div><calcite-list-item label="Depth 1" description="Item 6"></calcite-list-item></div>
    <div><calcite-list-item drag-disabled label="Depth 1" description="Item 7"></calcite-list-item></div>
  </calcite-list>`, M = () => e`
  <h2>interaction-mode="static" and selection-mode="none" (non-interactive)</h2>

  <calcite-list interaction-mode="static" selection-mode="none">
    <calcite-list-item label="List Item 1" description="Descriptive description about something"></calcite-list-item>
    <calcite-list-item label="List Item 2" description="Descriptive description about something"></calcite-list-item>
    <calcite-list-item label="List Item 3" description="Descriptive description about something"></calcite-list-item>
  </calcite-list>
  <br />

  <h2>interaction-mode="static" and selection-appearance="icon" (non-interactive)</h2>

  <calcite-list interaction-mode="static" selection-appearance="icon" selection-mode="single">
    <calcite-list-item label="List Item 1" description="Descriptive description about something"></calcite-list-item>
    <calcite-list-item label="List Item 2" description="Descriptive description about something"></calcite-list-item>
    <calcite-list-item label="List Item 3" description="Descriptive description about something"></calcite-list-item>
  </calcite-list>
  <br />

  <h2>interaction-mode="static" and selection-appearance="border" (interactive)</h2>

  <calcite-list interaction-mode="static" selection-appearance="border" selection-mode="single">
    <calcite-list-item label="List Item 1" description="Descriptive description about something"></calcite-list-item>
    <calcite-list-item label="List Item 2" description="Descriptive description about something"></calcite-list-item>
    <calcite-list-item label="List Item 3" description="Descriptive description about something"></calcite-list-item>
  </calcite-list>
  <br />

  <h2>interaction-mode="interactive" (interactive)</h2>

  <calcite-list interaction-mode="interactive" selection-mode="single">
    <calcite-list-item label="List Item 1" description="Descriptive description about something"></calcite-list-item>
    <calcite-list-item label="List Item 2" description="Descriptive description about something"></calcite-list-item>
    <calcite-list-item label="List Item 3" description="Descriptive description about something"></calcite-list-item>
  </calcite-list>
`, B = () => e`<calcite-list drag-enabled label="test">
    <calcite-list-item label="small" value="small" description="small hello world"></calcite-list-item>
  </calcite-list>`, E = () => e` <calcite-list
    filter-enabled
    filter-placeholder="typing 'recreation' should show 1st group with all items"
    filter-text="Beaches"
  >
    <calcite-list-item-group heading="Outdoor recreation" id="recreation">
      <calcite-list-item
        label="Hiking trails"
        description="Designated routes for hikers to use."
        value="hiking-trails"
      ></calcite-list-item>
      <calcite-list-item
        label="Waterfalls"
        description="Vertical drops from a river."
        value="waterfalls"
      ></calcite-list-item>
      <calcite-list-item-group heading="Beaches" id="beaches">
        <calcite-list-item label="Surfing" description="Surfing" value="Surfing"></calcite-list-item>
        <calcite-list-item label="Paragliding" description="Paragliding" value="Paragliding"></calcite-list-item>
      </calcite-list-item-group>
    </calcite-list-item-group>
  </calcite-list>`, O = () => e`<calcite-list style="block-size: 600px; inline-size: 400px;" loading></calcite-list>`;
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(args: ListStoryArgs): string => html\`
  <calcite-list
    \${boolean("closable", args.closable)}
    \${boolean("closed", args.closed)}
    \${boolean("disabled", args.disabled)}
    \${boolean("drag-enabled", args.dragEnabled)}
    \${boolean("filter-enabled", args.filterEnabled)}
    \${boolean("loading", args.loading)}
    display-mode="\${args.displayMode}"
    interaction-mode="\${args.interactionMode}"
    label="\${args.label}"
    scale="\${args.scale}"
    selection-appearance="\${args.selectionAppearance}"
    selection-mode="\${args.selectionMode}"
  >
    <calcite-list-item
      label="Cras iaculis ultricies nulla."
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      icon-start="\${args.iconStart}"
      icon-end="\${args.iconEnd}"
    ></calcite-list-item>
    <calcite-list-item
      label="Ut aliquam sollicitudin leo."
      description="Aliquam tincidunt mauris eu risus."
      icon-start="\${args.iconStart}"
      icon-end="\${args.iconEnd}"
    ></calcite-list-item>
    <calcite-list-item
      label="Vestibulum commodo felis quis tortor.
    "
      description="Vestibulum auctor dapibus neque.
    "
      icon-start="\${args.iconStart}"
      icon-end="\${args.iconEnd}"
    ></calcite-list-item>
    <calcite-list-item
      disabled
      label="Vestibulum commodo felis quis tortor.
    "
      description="Vestibulum auctor dapibus neque.
    "
      icon-start="\${args.iconStart}"
      icon-end="\${args.iconEnd}"
    ></calcite-list-item>
    <calcite-list-item
      drag-disabled
      label="Vestibulum commodo felis quis tortor.
    "
      description="Vestibulum auctor dapibus neque.
    "
      icon-start="\${args.iconStart}"
      icon-end="\${args.iconEnd}"
    ></calcite-list-item>
    <calcite-list-item
      unavailable
      label="Vestibulum commodo felis quis tortor."
      description="Vestibulum auctor dapibus neque."
      icon-start="\${args.iconStart}"
      icon-end="\${args.iconEnd}"
    ></calcite-list-item>
  </calcite-list>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales with icon-start and icon-end</div>

    <div class="child">
      <calcite-list scale="s" selection-mode="none" label="test">
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
      <calcite-list selection-mode="none" label="test">
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
      <calcite-list scale="l" selection-mode="none" label="test">
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales nested with icon-start and icon-end</div>

    <div class="child">
      <calcite-list display-mode="nested" scale="s" selection-mode="none" label="test">
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          scale="s"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="small parent"
          value="small"
          description="small hello world"
          scale="s"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="small child"
            value="small"
            description="small hello world"
            scale="s"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="s"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="small grandchild"
              value="small"
              description="small hello world"
              scale="s"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="s"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="s"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" selection-mode="none" label="test">
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          scale="m"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="medium parent"
          value="medium"
          description="medium hello world"
          scale="m"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="medium child"
            value="medium"
            description="medium hello world"
            scale="m"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="m"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="medium grandchild"
              value="medium"
              description="medium hello world"
              scale="m"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="m"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="m"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" scale="l" selection-mode="none" label="test">
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          scale="l"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="large parent"
          value="large"
          description="large hello world"
          scale="l"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="large child"
            value="large"
            description="large hello world"
            scale="l"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="l"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="large grandchild"
              value="large"
              description="large hello world"
              scale="l"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="l"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="l"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales draggable</div>

    <div class="child">
      <calcite-list drag-enabled scale="s" selection-mode="none" label="test">
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list drag-enabled selection-mode="none" label="test">
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list drag-enabled scale="l" selection-mode="none" label="test">
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales draggable nested</div>

    <div class="child">
      <calcite-list display-mode="nested" drag-enabled scale="s" selection-mode="none" label="test">
        <calcite-list-item closable label="small" value="small" description="small hello world" scale="s">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small parent" value="small" description="small hello world" scale="s">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="small child" value="small" description="small hello world" scale="s">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="s"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="small grandchild"
              value="small"
              description="small hello world"
              scale="s"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="s"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="s"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" drag-enabled selection-mode="none" label="test">
        <calcite-list-item closable label="medium" value="medium" description="medium hello world" scale="m">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium parent" value="medium" description="medium hello world" scale="m">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="medium child" value="medium" description="medium hello world" scale="m">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="m"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="medium grandchild"
              value="medium"
              description="medium hello world"
              scale="m"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="m"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="m"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" drag-enabled scale="l" selection-mode="none" label="test">
        <calcite-list-item closable label="large" value="large" description="large hello world" scale="l">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large parent" value="large" description="large hello world" scale="l">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="large child" value="large" description="large hello world" scale="l">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="l"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="large grandchild"
              value="large"
              description="large hello world"
              scale="l"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="l"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="l"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales icon</div>

    <div class="child">
      <calcite-list scale="s" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          scale="s"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          scale="s"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          scale="m"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          scale="m"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list scale="l" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          scale="l"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          scale="l"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales icon nested</div>

    <div class="child">
      <calcite-list display-mode="nested" scale="s" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          scale="s"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="small parent"
          value="small"
          description="small hello world"
          scale="s"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="small child"
            value="small"
            description="small hello world"
            scale="s"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="s"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="small grandchild"
              value="small"
              description="small hello world"
              scale="s"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="s"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="s"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          scale="m"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="medium parent"
          value="medium"
          description="medium hello world"
          scale="m"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="medium child"
            value="medium"
            description="medium hello world"
            scale="m"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="m"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="medium grandchild"
              value="medium"
              description="medium hello world"
              scale="m"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="m"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="m"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" scale="l" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          scale="l"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="large parent"
          value="large"
          description="large hello world"
          scale="l"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="large child"
            value="large"
            description="large hello world"
            scale="l"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="l"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="large grandchild"
              value="large"
              description="large hello world"
              scale="l"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="l"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="l"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales icon draggable</div>

    <div class="child">
      <calcite-list drag-enabled scale="s" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list drag-enabled selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list drag-enabled scale="l" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales icon draggable nested</div>

    <div class="child">
      <calcite-list display-mode="nested" drag-enabled scale="s" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="small"
          value="small"
          description="small hello world"
          scale="s"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="small parent"
          value="small"
          description="small hello world"
          scale="s"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="small child"
            value="small"
            description="small hello world"
            scale="s"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="s"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="small grandchild"
              value="small"
              description="small hello world"
              scale="s"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="s"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="s"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" drag-enabled selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="medium"
          value="medium"
          description="medium hello world"
          scale="m"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="medium parent"
          value="medium"
          description="medium hello world"
          scale="m"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="medium child"
            value="medium"
            description="medium hello world"
            scale="m"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="m"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="medium grandchild"
              value="medium"
              description="medium hello world"
              scale="m"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="m"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="m"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" drag-enabled scale="l" selection-mode="single" label="test">
        <calcite-list-item
          closable
          label="large"
          value="large"
          description="large hello world"
          scale="l"
          icon-start="banana"
          icon-end="banana"
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item
          closable
          label="large parent"
          value="large"
          description="large hello world"
          scale="l"
          icon-start="banana"
          icon-end="banana"
          selected
        >
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item
            closable
            label="large child"
            value="large"
            description="large hello world"
            scale="l"
            icon-start="banana"
            icon-end="banana"
          >
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="l"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="large grandchild"
              value="large"
              description="large hello world"
              scale="l"
              icon-start="banana"
              icon-end="banana"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="l"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="l"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales border</div>

    <div class="child">
      <calcite-list scale="s" selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list scale="l" selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales border nested</div>

    <div class="child">
      <calcite-list display-mode="nested" scale="s" selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small parent" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="small child" value="small" description="small hello world" scale="s">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="s"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="small grandchild"
              value="small"
              description="small hello world"
              scale="s"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="s"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="s"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium parent" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="medium child" value="medium" description="medium hello world">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="m"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item closable label="medium grandchild" value="medium" description="medium hello world">
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="m"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="m"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list display-mode="nested" scale="l" selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large parent" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="large child" value="large" description="large hello world" scale="l">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="l"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="large grandchild"
              value="large"
              description="large hello world"
              scale="l"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="l"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="l"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales border draggable</div>

    <div class="child">
      <calcite-list drag-enabled scale="s" selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list drag-enabled selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>

      <calcite-list drag-enabled scale="l" selection-appearance="border" selection-mode="single" label="test">
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- scales -->
  <div class="parent">
    <div class="child right-aligned-text">scales border draggable nested</div>

    <div class="child">
      <calcite-list
        display-mode="nested"
        drag-enabled
        scale="s"
        selection-appearance="border"
        selection-mode="single"
        label="test"
      >
        <calcite-list-item closable label="small" value="small" description="small hello world" scale="s">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small parent" value="small" description="small hello world" scale="s">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="small child" value="small" description="small hello world" scale="s">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="s"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="s"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="small grandchild"
              value="small"
              description="small hello world"
              scale="s"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="s"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="s"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="s"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list
        display-mode="nested"
        drag-enabled
        selection-appearance="border"
        selection-mode="single"
        label="test"
      >
        <calcite-list-item closable label="medium" value="medium" description="medium hello world" scale="m">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium parent" value="medium" description="medium hello world" scale="m">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="medium child" value="medium" description="medium hello world" scale="m">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="m"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="m"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="medium grandchild"
              value="medium"
              description="medium hello world"
              scale="m"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="m"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="m"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="m"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
      <calcite-list
        display-mode="nested"
        drag-enabled
        scale="l"
        selection-appearance="border"
        selection-mode="single"
        label="test"
      >
        <calcite-list-item closable label="large" value="large" description="large hello world" scale="l">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large parent" value="large" description="large hello world" scale="l">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
          <calcite-list-item closable label="large child" value="large" description="large hello world" scale="l">
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-start"
            ></calcite-action>
            <calcite-avatar
              scale="l"
              slot="content-start"
              thumbnail="./_assets/images/placeholder.svg"
            ></calcite-avatar>
            <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
            <calcite-action
              appearance="transparent"
              icon="sort-ascending"
              text="menu"
              label="menu"
              scale="l"
              slot="actions-end"
            ></calcite-action>
            <calcite-list-item
              closable
              label="large grandchild"
              value="large"
              description="large hello world"
              scale="l"
            >
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-start"
              ></calcite-action>
              <calcite-avatar
                scale="l"
                slot="content-start"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-avatar
                scale="l"
                slot="content-end"
                thumbnail="./_assets/images/placeholder.svg"
              ></calcite-avatar>
              <calcite-action
                appearance="transparent"
                icon="sort-ascending"
                text="menu"
                label="menu"
                scale="l"
                slot="actions-end"
              ></calcite-action>
            </calcite-list-item>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- filter enabled -->
  <div class="parent">
    <div class="child right-aligned-text">filter enabled small scale</div>

    <div class="child">
      <calcite-list scale="s" drag-enabled selection-mode="single" label="test" filter-enabled>
        <calcite-action
          appearance="transparent"
          icon="banana"
          text="menu"
          label="menu"
          scale="s"
          slot="filter-actions-start"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="ellipsis"
          text="menu"
          label="menu"
          scale="s"
          slot="filter-actions-start"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="filter"
          text="menu"
          label="menu"
          scale="s"
          slot="filter-actions-end"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="sort-ascending"
          text="menu"
          label="menu"
          scale="s"
          slot="filter-actions-end"
        ></calcite-action>
        <calcite-list-item label="small1" value="small1" description="small hello world 1">
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item label="small2" value="small2" description="small hello world 2">
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item label="small3" value="small3" description="small hello world 3">
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item disabled label="small4" value="small4" description="small hello world 4: disabled">
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item unavailable label="small4" value="small5" description="small hello world 5: unavailable">
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-notice slot="filter-no-results" icon kind="warning" scale="s" open>
          <div slot="title">No Results</div>
          <div slot="message">Try a different filter</div>
        </calcite-notice>
      </calcite-list>
    </div>
  </div>

  <!-- filter enabled -->
  <div class="parent">
    <div class="child right-aligned-text">filter enabled medium scale</div>

    <div class="child">
      <calcite-list drag-enabled selection-mode="single" label="test" filter-enabled>
        <calcite-action
          appearance="transparent"
          icon="banana"
          text="menu"
          label="menu"
          slot="filter-actions-start"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="ellipsis"
          text="menu"
          label="menu"
          slot="filter-actions-start"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="filter"
          text="menu"
          label="menu"
          slot="filter-actions-end"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="sort-ascending"
          text="menu"
          label="menu"
          slot="filter-actions-end"
        ></calcite-action>
        <calcite-list-item label="medium1" value="medium1" description="medium hello world 1">
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item label="medium2" value="medium2" description="medium hello world 2">
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item label="medium3" value="medium3" description="medium hello world 3">
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item disabled label="medium4" value="medium4" description="medium hello world 4: disabled">
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item unavailable label="medium4" value="medium5" description="medium hello world 5: unavailable">
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-notice slot="filter-no-results" icon kind="warning" scale="s" open>
          <div slot="title">No Results</div>
          <div slot="message">Try a different filter</div>
        </calcite-notice>
      </calcite-list>
    </div>
  </div>

  <!-- filter enabled -->
  <div class="parent">
    <div class="child right-aligned-text">filter enabled large scale</div>

    <div class="child">
      <calcite-list scale="l" drag-enabled selection-mode="single" label="test" filter-enabled>
        <calcite-action
          appearance="transparent"
          icon="banana"
          text="menu"
          label="menu"
          scale="l"
          slot="filter-actions-start"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="ellipsis"
          text="menu"
          label="menu"
          scale="l"
          slot="filter-actions-start"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="filter"
          text="menu"
          label="menu"
          scale="l"
          slot="filter-actions-end"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="sort-ascending"
          text="menu"
          label="menu"
          scale="l"
          slot="filter-actions-end"
        ></calcite-action>
        <calcite-list-item label="large1" value="large1" description="large hello world 1">
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item label="large2" value="large2" description="large hello world 2">
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item label="large3" value="large3" description="large hello world 3">
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item disabled label="large4" value="large4" description="large hello world 4: disabled">
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-list-item unavailable label="large4" value="large5" description="large hello world 5: unavailable">
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
        </calcite-list-item>
        <calcite-notice slot="filter-no-results" icon kind="warning" scale="s" open>
          <div slot="title">No Results</div>
          <div slot="message">Try a different filter</div>
        </calcite-notice>
      </calcite-list>
    </div>
  </div>

  <!-- content-bottom slot -->
  <div class="parent">
    <div class="child right-aligned-text">content-bottom slot</div>

    <div class="child">
      <calcite-list scale="s" selection-mode="none" label="test">
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
          <span slot="content-bottom">Some text in the content-bottom slot</span>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="small" value="small" description="small hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="s" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="s" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="s"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
      <calcite-list selection-mode="none" label="test">
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
          <span slot="content-bottom">Some text in the content-bottom slot</span>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="medium" value="medium" description="medium hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="m" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="m" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="m"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
      <calcite-list scale="l" selection-mode="none" label="test">
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
          <span slot="content-bottom">Some text in the content-bottom slot</span>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
        <calcite-list-item closable label="large" value="large" description="large hello world">
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-start"
          ></calcite-action>
          <calcite-avatar scale="l" slot="content-start" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-avatar scale="l" slot="content-end" thumbnail="./_assets/images/placeholder.svg"></calcite-avatar>
          <calcite-action
            appearance="transparent"
            icon="sort-ascending"
            text="menu"
            label="menu"
            scale="l"
            slot="actions-end"
          ></calcite-action>
        </calcite-list-item>
      </calcite-list>
    </div>
  </div>

  <!-- grouped -->
  <div class="parent">
    <div class="child right-aligned-text">grouped small scale</div>

    <div class="child">
      <calcite-list scale="s" selection-mode="single">
        <calcite-list-item-group heading="Small Heading 1">
          <calcite-list-item label="Small Label 1" description="small description 1"></calcite-list-item>
          <calcite-list-item label="Small Label 2" description="small description 2"></calcite-list-item>
          <calcite-list-item label="Small Label 3" description="small description 3"></calcite-list-item>
        </calcite-list-item-group>
        <calcite-list-item-group heading="Small Heading 2">
          <calcite-list-item label="Small Label 1" description="small description 1"></calcite-list-item>
          <calcite-list-item label="Small Label 2" description="small description 2"></calcite-list-item>
          <calcite-list-item label="Small Label 3" description="small description 3"></calcite-list-item>
        </calcite-list-item-group>
      </calcite-list>
    </div>
  </div>

  <!-- grouped -->
  <div class="parent">
    <div class="child right-aligned-text">grouped medium scale</div>

    <div class="child">
      <calcite-list scale="m" selection-mode="single">
        <calcite-list-item-group heading="Medium Heading 1">
          <calcite-list-item label="Medium Label 1" description="medium description 1"></calcite-list-item>
          <calcite-list-item label="Medium Label 2" description="medium description 2"></calcite-list-item>
          <calcite-list-item label="Medium Label 3" description="medium description 3"></calcite-list-item>
        </calcite-list-item-group>
        <calcite-list-item-group heading="Medium Heading 2">
          <calcite-list-item label="Medium Label 1" description="medium description 1"></calcite-list-item>
          <calcite-list-item label="Medium Label 2" description="medium description 2"></calcite-list-item>
          <calcite-list-item label="Medium Label 3" description="medium description 3"></calcite-list-item>
        </calcite-list-item-group>
      </calcite-list>
    </div>
  </div>

  <!-- grouped -->
  <div class="parent">
    <div class="child right-aligned-text">grouped large scale</div>

    <div class="child">
      <calcite-list scale="l" selection-mode="single">
        <calcite-list-item-group heading="Large Heading 1">
          <calcite-list-item label="Large Label 1" description="large description 1"></calcite-list-item>
          <calcite-list-item label="Large Label 2" description="large description 2"></calcite-list-item>
          <calcite-list-item label="Large Label 3" description="large description 3"></calcite-list-item>
        </calcite-list-item-group>
        <calcite-list-item-group heading="Large Heading 2">
          <calcite-list-item label="Large Label 1" description="large description 1"></calcite-list-item>
          <calcite-list-item label="Large Label 2" description="large description 2"></calcite-list-item>
          <calcite-list-item label="Large Label 3" description="large description 3"></calcite-list-item>
        </calcite-list-item-group>
      </calcite-list>
    </div>
  </div>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-list \${listAttributes()}>
    <calcite-list-item label="This has no description."> </calcite-list-item>
  </calcite-list>
  <calcite-list>
    <calcite-list-item description="This has no label."> </calcite-list-item>
  </calcite-list>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-list \${listAttributes()}>
    <calcite-list-item label="This has no description.">
      <calcite-handle slot="actions-start"></calcite-handle>
      <calcite-action
        slot="actions-start"
        appearance="transparent"
        text="Banana"
        icon="banana"
        text-enabled
      ></calcite-action>
      <calcite-action-menu appearance="transparent" slot="actions-end">
        <calcite-action appearance="transparent" text="Plus" icon="plus" text-enabled></calcite-action>
        <calcite-action appearance="transparent" text="Minus" icon="minus" text-enabled></calcite-action>
        <calcite-action appearance="transparent" text="Table" icon="table" text-enabled></calcite-action>
      </calcite-action-menu>
      <calcite-dropdown slot="actions-end">
        <calcite-action appearance="transparent" icon="plus" slot="trigger"></calcite-action>
        <calcite-dropdown-group selection-mode="single" group-title="Sort by">
          <calcite-dropdown-item>Relevance</calcite-dropdown-item>
          <calcite-dropdown-item>Date modified</calcite-dropdown-item>
          <calcite-dropdown-item>Title</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
    </calcite-list-item>
  </calcite-list>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-list display-mode="nested" \${listAttributes()}>
    <calcite-list-item
      expanded
      label="Level 1 item 1"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    ></calcite-list-item>
    <calcite-list-item
      expanded
      label="Level 1 item 2"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <calcite-list-item
        expanded
        label="Level 2 item 1"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      >
        <calcite-list-item
          expanded
          label="Level 3 item 1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ></calcite-list-item>
        <calcite-list-item
          expanded
          label="Level 3 item 2"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        >
          <calcite-list-item
            expanded
            label="Level 4 item 1"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <calcite-list-item
              expanded
              label="Level 5 item 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            ></calcite-list-item>
          </calcite-list-item>
          <calcite-list-item
            expanded
            label="Level 4 item 2"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          ></calcite-list-item>
          <calcite-list-item
            expanded
            label="Level 4 item 3"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          ></calcite-list-item>
        </calcite-list-item>
        <calcite-list-item
          expanded
          label="Level 3 item 3"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ></calcite-list-item>
      </calcite-list-item>
      <calcite-list-item
        expanded
        label="Level 2 item 2"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      ></calcite-list-item>
      <calcite-list-item
        expanded
        label="Level 2 item 3"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      ></calcite-list-item>
    </calcite-list-item>
    <calcite-list-item
      expanded
      label="Level 1 item 3"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    ></calcite-list-item>
  </calcite-list>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-list display-mode="nested" \${listAttributes()}>
    <calcite-list-item-group heading="Nested">
      <calcite-list-item
        expanded
        label="Cras iaculis ultricies nulla."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      >
        <calcite-list-item
          expanded
          label="Ut aliquam sollicitudin leo."
          description="Aliquam tincidunt mauris eu risus."
        >
          <calcite-list-item
            expanded
            label="Vestibulum commodo felis quis tortor."
            description="Vestibulum auctor dapibus neque."
          ></calcite-list-item></calcite-list-item
      ></calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item-group heading="Digits">
      <calcite-list-item
        expanded
        label="One"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      ></calcite-list-item>
      <calcite-list-item expanded label="Two" description="Aliquam tincidunt mauris eu risus."></calcite-list-item>
      <calcite-list-item label="Three" description="Vestibulum auctor dapibus neque."></calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item-group heading="Letters">
      <calcite-list-item
        expanded
        label="A"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      ></calcite-list-item>
      <calcite-list-item expanded label="B" description="Aliquam tincidunt mauris eu risus."></calcite-list-item>
      <calcite-list-item
        expanded
        label="C"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      ></calcite-list-item>
    </calcite-list-item-group>
  </calcite-list>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list \${listAttributes()}>
    <calcite-list-item>
      <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>
      <calcite-icon icon="layers" scale="m" slot="content-start"></calcite-icon>
      <span slot="content-start">Some value or something and a <b>thing</b>.</span>
      <div slot="content-end" style="display: flex; justify-content: flex-end">
        <calcite-chip class="list-chip" icon="ribbon-rosette" scale="s">Review</calcite-chip>
        <calcite-chip class="list-chip" icon="globe" scale="s">Good</calcite-chip>
      </div>
    </calcite-list-item>
    <calcite-list-item>
      <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>
      <calcite-icon icon="user" scale="m" slot="content-start"></calcite-icon>
      <span slot="content-start">Some value or something and a <b>thing</b>.</span>
      <div slot="content-end" style="display: flex; justify-content: flex-end">
        <calcite-chip class="list-chip" icon="globe" scale="s">Good</calcite-chip>
      </div>
    </calcite-list-item>
    <calcite-list-item>
      <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>
      <calcite-icon icon="user" scale="m" slot="content-start"></calcite-icon>
      <span slot="content-start">Some value or something and a <b>thing</b>.</span>
      <div slot="content-end" style="display: flex; justify-content: flex-end">
        <calcite-chip class="list-chip" icon="bell" scale="s">Halp!</calcite-chip>
      </div>
    </calcite-list-item>
    <calcite-list-item unavailable>
      <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>
      <calcite-icon icon="user" scale="m" slot="content-start"></calcite-icon>
      <span slot="content-start">Some value or something and a <b>thing</b>.</span>
      <div slot="content-end" style="display: flex; justify-content: flex-end">
        <calcite-chip class="list-chip" icon="bell" scale="s">Halp!</calcite-chip>
      </div>
    </calcite-list-item>
  </calcite-list> \``,
      ...u.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list \${listAttributes()}>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
    </calcite-list-item>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
    </calcite-list-item>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
    </calcite-list-item>
    <calcite-list-item unavailable label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
    </calcite-list-item>
  </calcite-list> \``,
      ...b.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list display-mode="nested" \${listAttributes()}>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom" expanded>
      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
      <calcite-list display-mode="nested"
        ><calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom" expanded>
          <span slot="content-bottom">Some value or something and a <b>thing</b>.</span
          ><calcite-list display-mode="nested"
            ><calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
              <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
            </calcite-list-item></calcite-list
          >
        </calcite-list-item></calcite-list
      >
    </calcite-list-item>
  </calcite-list> \``,
      ...g.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-list \${listAttributes()}>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <calcite-action icon="web" label="Princess Bubblegum website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="\${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Finn Mertens website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="\${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Jake T. Dog website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="\${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="exclamation-mark-triangle"
        slot="content-end"
        style="color: var(--calcite-color-status-danger)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
  </calcite-list>
\``,
      ...v.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-list filter-enabled>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <calcite-action icon="web" label="Princess Bubblegum website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="\${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Finn Mertens website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="\${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Jake T. Dog website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="\${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="exclamation-mark-triangle"
        slot="content-end"
        style="color: var(--calcite-color-status-danger)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
  </calcite-list>
\``,
      ...h.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-list filter-enabled>
    <calcite-list-item-group hidden heading="Layers">
      <calcite-list-item hidden label="Hidden item" description="I should not be displayed."> </calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom"> </calcite-list-item>
    <calcite-list-item hidden label="Hidden item" description="I should not be displayed."> </calcite-list-item>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom"> </calcite-list-item>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom"> </calcite-list-item>
  </calcite-list>
\``,
      ...x.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <h1>selection-mode="none" + selection-appearance="icon"</h1>
  <calcite-list class="calcite-mode-dark" dir="rtl" \${listAttributes()}>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <calcite-action icon="web" label="Princess Bubblegum website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="\${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Finn Mertens website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="\${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Jake T. Dog website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="\${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="exclamation-mark-triangle"
        slot="content-end"
        style="color: var(--calcite-color-status-danger)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
  </calcite-list>

  <h1>selection-mode="single-persist" + selection-appearance="border" + dir="rtl"</h1>
  <calcite-list
    class="calcite-mode-dark"
    label="RTL list"
    selection-appearance="border"
    selection-mode="single-persist"
    dir="rtl"
  >
    <calcite-list-item label="My first list item" selected>First </calcite-list-item>
    <calcite-list-item label="My second list item">Second </calcite-list-item>
  </calcite-list>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list disabled>
    <calcite-list-item
      label="Cras iaculis ultricies nulla."
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    ></calcite-list-item>
    <calcite-list-item
      disabled
      label="Ut aliquam sollicitudin leo."
      description="Aliquam tincidunt mauris eu risus."
    ></calcite-list-item>
    <calcite-list-item
      label="Vestibulum commodo felis quis tortor.
    "
      description="Vestibulum auctor dapibus neque.
    "
    ></calcite-list-item>
  </calcite-list>\``,
      ...w.parameters?.docs?.source
    }
  }
};
_.parameters = {
  ..._.parameters,
  docs: {
    ..._.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list disabled>
    <calcite-list-item>
      <div slot="content">
        <strong>Cras iaculis ultricies nulla.</strong>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div></calcite-list-item
    >
    <calcite-list-item disabled>
      <div slot="content">
        <strong>Cras iaculis ultricies nulla.</strong>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div></calcite-list-item
    >
    <calcite-list-item
      ><div slot="content">
        <strong>Cras iaculis ultricies nulla.</strong>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div></calcite-list-item
    >
  </calcite-list>\``,
      ..._.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list selection-mode="single-persist" label="test">
    <calcite-list-item selected label="basic" value="basic" description="hello world">
      <calcite-icon
        icon="banana"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action
        appearance="transparent"
        icon="ellipsis"
        text="menu"
        label="menu"
        slot="actions-end"
      ></calcite-action>
    </calcite-list-item>
    <calcite-list-item disabled label="disabled" value="disabled" description="hello world">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item label="basic2" value="basic2" description="hello world">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
  </calcite-list>\``,
      ...f.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list selection-mode="single" label="test" filter-enabled>
    <calcite-list-item selected closable label="basic" value="basic" description="hello world">
      <calcite-icon
        icon="banana"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action
        appearance="transparent"
        icon="ellipsis"
        text="menu"
        label="menu"
        slot="actions-end"
      ></calcite-action>
    </calcite-list-item>
    <calcite-list-item closable disabled label="disabled" value="disabled" description="hello world">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item closed closable label="closed" value="closed" description="hello world">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
  </calcite-list>\``,
      ...y.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list
      display-mode="nested"
      filter-enabled
      filter-text="est"
      filter-placeholder="Find content"
      selection-appearance="border"
      selection-mode="single"
    >
      <calcite-list-item label="Estuaries" value="estuaries" hidden></calcite-list-item>
      <calcite-list-item-group heading="Layers">
        <calcite-list-item selected label="Hiking trails" value="hiking-trails">
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item disabled label="Waterfalls" value="waterfalls">
          <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item label="Rivers" value="rivers" expanded>
          <calcite-list-item label="Estuaries" value="estuaries">
            <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
              <calcite-action
                slot="trigger"
                appearance="transparent"
                icon="ellipsis"
                scale="s"
                text="Trails layer"
              ></calcite-action>
              <calcite-dropdown-group scale="s" selection-mode="none">
                <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
              </calcite-dropdown-group>
            </calcite-dropdown>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list-item-group>
      <calcite-list-item-group heading="Tables">
        <calcite-list-item label="Hiking trails table" value="hiking-trails-table">
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item label="Waterfalls table" value="waterfalls-table">
          <calcite-icon slot="content-end" icon="exclamation-mark-circle-f" scale="s"></calcite-icon>
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
      </calcite-list-item-group>
      <calcite-list-item-group heading="Basemaps">
        <calcite-list-item disabled label="Waterfalls" value="waterfalls">
          <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>
        </calcite-list-item>
      </calcite-list-item-group> </calcite-list
    ><calcite-list
      filter-enabled
      filter-text="water"
      filter-placeholder="Find content"
      selection-appearance="border"
      selection-mode="single"
    >
      <calcite-list-item-group heading="Layers">
        <calcite-list-item selected label="Hiking trails" value="hiking-trails">
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item disabled label="Waterfalls" value="waterfalls">
          <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item label="Rivers" value="rivers" expanded>
          <calcite-list-item label="Estuaries" value="estuaries">
            <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
              <calcite-action
                slot="trigger"
                appearance="transparent"
                icon="ellipsis"
                scale="s"
                text="Trails layer"
              ></calcite-action>
              <calcite-dropdown-group scale="s" selection-mode="none">
                <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
              </calcite-dropdown-group>
            </calcite-dropdown>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list-item-group>
      <calcite-list-item-group heading="Tables">
        <calcite-list-item label="Hiking trails table" value="hiking-trails-table">
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item label="Waterfalls table" value="waterfalls-table">
          <calcite-icon slot="content-end" icon="exclamation-mark-circle-f" scale="s"></calcite-icon>
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
      </calcite-list-item-group>
      <calcite-list-item-group heading="Basemaps">
        <calcite-list-item disabled label="Waterfalls" value="waterfalls">
          <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>
        </calcite-list-item>
      </calcite-list-item-group>
    </calcite-list>\``,
      ...o.parameters?.docs?.source
    }
  }
};
L.parameters = {
  ...L.parameters,
  docs: {
    ...L.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list selection-mode="single" label="test" filter-enabled>
    <calcite-action
      appearance="transparent"
      icon="banana"
      text="menu"
      label="menu"
      slot="filter-actions-start"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="ellipsis"
      text="menu"
      label="menu"
      slot="filter-actions-start"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="filter"
      text="menu"
      label="menu"
      slot="filter-actions-end"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="sort-ascending"
      text="menu"
      label="menu"
      slot="filter-actions-end"
    ></calcite-action>
    <calcite-list-item label="test1" value="test1" description="hello world 1">
      <calcite-icon
        icon="banana"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item selected label="test2" value="test2" description="hello world 2">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item label="test3" value="test3" description="hello world 3">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item disabled label="test4" value="test4" description="hello world 4">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
  </calcite-list>\``,
      ...L.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list drag-enabled selection-mode="single" label="List 1" filter-enabled>
    <calcite-action
      appearance="transparent"
      icon="banana"
      text="menu"
      label="menu"
      slot="filter-actions-start"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="ellipsis"
      text="menu"
      label="menu"
      slot="filter-actions-start"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="filter"
      text="menu"
      label="menu"
      slot="filter-actions-end"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="sort-ascending"
      text="menu"
      label="menu"
      slot="filter-actions-end"
    ></calcite-action>
    <calcite-list-item label="test1" value="test1" description="hello world 1">
      <calcite-icon
        icon="banana"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item selected label="test2" value="test2" description="hello world 2">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item label="test3" value="test3" description="hello world 3">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item disabled label="test4" value="test4" description="hello world 4">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item drag-disabled label="test5" value="test5" description="hello world 55">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
  </calcite-list>\``,
      ...T.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list display-mode="nested" drag-enabled group="nested" label="List 1" selection-mode="multiple">
    <calcite-list-item expanded label="Hi! 1" description="hello world">
      <calcite-list display-mode="nested" drag-enabled label="List 2" group="nested" selection-mode="multiple">
        <calcite-list-item expanded label="Hi! 2" description="hello world">
          <calcite-list display-mode="nested" drag-enabled label="List 3" group="nested" selection-mode="multiple">
            <calcite-list-item expanded label="Hi! 3" description="hello world">
              <calcite-list
                display-mode="nested"
                drag-enabled
                label="List 4"
                group="nested"
                selection-mode="multiple"
              ></calcite-list>
            </calcite-list-item>
            <calcite-list-item expanded label="Hi! 4" description="hello world"></calcite-list-item>
          </calcite-list>
        </calcite-list-item>
        <calcite-list-item expanded label="Hi! 5" description="hello world"></calcite-list-item>
      </calcite-list>
    </calcite-list-item>
    <calcite-list-item expanded label="Hi! 6" description="hello world"></calcite-list-item>
    <calcite-list-item expanded label="Hi! 7" description="hello world"></calcite-list-item>
  </calcite-list>\``,
      ...S.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list display-mode="nested" drag-enabled group="nested" label="List 1" selection-mode="multiple">
    <calcite-list-item expanded label="Hi! 1" description="hello world">
      <calcite-list display-mode="nested" drag-enabled label="List 2" group="nested" selection-mode="multiple">
        <calcite-list-item expanded label="Hi! 2" description="hello world">
          <calcite-list display-mode="nested" drag-enabled label="List 3" group="nested" selection-mode="multiple">
            <calcite-list-item expanded label="Hi! 3" description="hello world">
              <calcite-action-menu overlay-positioning="fixed" slot="actions-end">
                <calcite-action text-enabled text="Edit" icon="pencil"></calcite-action>
                <calcite-action text-enabled text="Delete" icon="trash"></calcite-action>
                <calcite-action text-enabled text="Delete" icon="trash"></calcite-action>
                <calcite-action text-enabled text="Delete" icon="trash"></calcite-action>
                <calcite-action text-enabled text="Delete" icon="trash"></calcite-action>
              </calcite-action-menu>
              <calcite-list
                display-mode="nested"
                drag-enabled
                label="List 4"
                group="nested"
                selection-mode="multiple"
              ></calcite-list>
            </calcite-list-item>
            <calcite-list-item expanded label="Hi! 4" description="hello world">
              <calcite-list
                display-mode="nested"
                drag-enabled
                label="List 5"
                group="nested"
                selection-mode="multiple"
              ></calcite-list>
            </calcite-list-item>
          </calcite-list>
        </calcite-list-item>
        <calcite-list-item expanded label="Hi! 5" description="hello world">
          <calcite-list
            display-mode="nested"
            drag-enabled
            label="List 6"
            group="nested"
            selection-mode="multiple"
          ></calcite-list>
        </calcite-list-item>
      </calcite-list>
    </calcite-list-item>
    <calcite-list-item expanded label="Hi! 6" description="hello world">
      <calcite-list
        display-mode="nested"
        drag-enabled
        label="List 7"
        group="nested"
        selection-mode="multiple"
      ></calcite-list>
    </calcite-list-item>
    <calcite-list-item expanded label="Hi! 7" description="hello world">
      <calcite-list
        display-mode="nested"
        drag-enabled
        label="List 8"
        group="nested"
        selection-mode="multiple"
      ></calcite-list></calcite-list-item
  ></calcite-list>\``,
      ...k.parameters?.docs?.source
    }
  }
};
I.parameters = {
  ...I.parameters,
  docs: {
    ...I.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list display-mode="nested" drag-enabled label="List 1" group="nested" selection-mode="single">
    <calcite-list-item expanded label="Hi! 4" description="hello world">
      <calcite-list
        display-mode="nested"
        drag-enabled
        label="List 2"
        group="nested"
        selection-mode="single"
      ></calcite-list>
    </calcite-list-item>
  </calcite-list>\``,
      ...I.parameters?.docs?.source
    }
  }
};
D.parameters = {
  ...D.parameters,
  docs: {
    ...D.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list filter-enabled>
    <calcite-list-item-group heading="Outdoor recreation">
      <calcite-list-item label="Hiking trails" description="Designated routes for hikers to use." value="hiking-trails">
        <calcite-action slot="actions-end" icon="layer" text="Trails layer"></calcite-action>
      </calcite-list-item>
      <calcite-list-item label="Waterfalls" description="Vertical drops from a river." value="waterfalls">
        <calcite-action slot="actions-end" icon="layer" text="Waterfalls layer"></calcite-action>
      </calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item label="Rivers" description="Large naturally flowing watercourses." value="rivers">
      <calcite-action slot="actions-end" icon="layer" text="Rivers layer"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Estuaries" description="Where the river meets the sea." value="estuaries">
      <calcite-action slot="actions-end" icon="layer" text="Estuaries layer"></calcite-action>
    </calcite-list-item>
    <calcite-list-item
      label="Park offices"
      description="Home base for park staff to converse with visitors."
      value="offices"
    >
      <calcite-action slot="actions-end" icon="layer" text="Offices layer"></calcite-action>
    </calcite-list-item>
    <calcite-list-item-group heading="Buildings">
      <calcite-list-item
        label="Guest lodges"
        description="Small houses available for visitors to book for stays."
        value="lodges"
      >
        <calcite-action slot="actions-end" icon="layer" text="Lodges layer"></calcite-action>
      </calcite-list-item>
      <calcite-list-item
        label="Yurts"
        description="Insulated portable rounded structures similar to tents."
        value="yurts"
      >
        <calcite-action slot="actions-end" icon="layer" text="Yurts layer"></calcite-action>
      </calcite-list-item>
    </calcite-list-item-group>
  </calcite-list>\``,
      ...D.parameters?.docs?.source
    }
  }
};
H.parameters = {
  ...H.parameters,
  docs: {
    ...H.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list filter-enabled filter-text="Bananas" selection-appearance="border" selection-mode="single">
    <calcite-list-item label="Apples" value="apples"></calcite-list-item>
    <calcite-list-item label="Oranges" value="oranges"></calcite-list-item>
    <calcite-list-item label="Pears" value="pears"></calcite-list-item>
    <calcite-notice slot="filter-no-results" icon kind="warning" scale="s" open>
      <div slot="title">No fruits found</div>
      <div slot="message">Try a different fruit?</div>
    </calcite-notice>
  </calcite-list>\``,
      ...H.parameters?.docs?.source
    }
  }
};
$.parameters = {
  ...$.parameters,
  docs: {
    ...$.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<h4>Nesting List Items</h4>
  <calcite-list display-mode="nested">
    <calcite-list-item label="List Item" expanded>
      <calcite-list-item label="List Item"></calcite-list-item>
      <calcite-list-item label="List Item"></calcite-list-item>
      <calcite-list-item label="List Item"></calcite-list-item>
    </calcite-list-item>
  </calcite-list>
  </br>
  <h4>Nesting Lists</h4>
  <calcite-list display-mode="nested">
    <calcite-list-item label="List Item" expanded>
      <calcite-list display-mode="nested">
        <calcite-list-item label="List Item"></calcite-list-item>
        <calcite-list-item label="List Item"></calcite-list-item>
        <calcite-list-item label="List Item"></calcite-list-item>
      </calcite-list>
    </calcite-list-item>
  </calcite-list>\``,
      ...$.parameters?.docs?.source
    }
  }
};
R.parameters = {
  ...R.parameters,
  docs: {
    ...R.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-list>
    <calcite-list-item
      closable
      label="Hiking trails"
      description="Designated routes for hikers to use."
      value="hiking-trails"
    >
    </calcite-list-item>
    <calcite-list-item closed closable label="Waterfalls" description="Vertical drops from a river." value="waterfalls">
    </calcite-list-item>
    <calcite-list-item
      closed
      closable
      label="Rivers"
      description="Large naturally flowing watercourses."
      value="rivers"
    >
    </calcite-list-item>
    <calcite-list-item
      closed
      closable
      label="Hiking trails"
      description="Designated routes for hikers to use."
      value="hiking-trails"
    >
    </calcite-list-item>
    <calcite-list-item closed closable label="Waterfalls" description="Vertical drops from a river." value="waterfalls">
    </calcite-list-item>
    <calcite-list-item
      closed
      closable
      label="Rivers"
      description="Large naturally flowing watercourses."
      value="rivers"
    >
    </calcite-list-item>
    <calcite-list-item
      closed
      closable
      label="Hiking trails"
      description="Designated routes for hikers to use."
      value="hiking-trails"
    >
    </calcite-list-item>
    <calcite-list-item closed closable label="Waterfalls" description="Vertical drops from a river." value="waterfalls">
    </calcite-list-item>
    <calcite-list-item
      closed
      closable
      label="Rivers"
      description="Large naturally flowing watercourses."
      value="rivers"
    >
    </calcite-list-item>
    <calcite-list-item
      closable
      label="Hiking trails"
      description="Designated routes for hikers to use."
      value="hiking-trails"
    >
    </calcite-list-item>
  </calcite-list>\``,
      ...R.parameters?.docs?.source
    }
  }
};
P.parameters = {
  ...P.parameters,
  docs: {
    ...P.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list display-mode="nested" id="root" drag-enabled label="List 1" group="my-list">
    <calcite-list-item expanded label="Depth 1" description="Item 1">
      <calcite-list display-mode="nested" group="my-list">
        <calcite-list-item expanded label="Depth 2" description="Item 2">
          <calcite-list display-mode="nested" drag-enabled label="List 2" group="my-list">
            <calcite-list-item label="Depth 3" description="Item 3">
              <calcite-list display-mode="nested" drag-enabled label="List 3" group="my-list"></calcite-list>
            </calcite-list-item>
            <calcite-list-item label="Depth 3" description="Item 4"></calcite-list-item>
          </calcite-list>
        </calcite-list-item>
        <calcite-list-item label="Depth 2" description="Item 5"></calcite-list-item>
      </calcite-list>
    </calcite-list-item>
    <calcite-list-item label="Depth 1" description="Item 6"></calcite-list-item>
    <calcite-list-item drag-disabled label="Depth 1" description="Item 7"></calcite-list-item>
  </calcite-list>\``,
      ...P.parameters?.docs?.source
    }
  }
};
C.parameters = {
  ...C.parameters,
  docs: {
    ...C.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-list display-mode="nested" id="root" drag-enabled label="List 1" group="my-list">
    <div>
      <calcite-list-item expanded label="Depth 1" description="Item 1">
        <calcite-list display-mode="nested" group="my-list">
          <div>
            <calcite-list-item expanded label="Depth 2" description="Item 2">
              <calcite-list display-mode="nested" drag-enabled label="List 2" group="my-list">
                <div>
                  <calcite-list-item label="Depth 3" description="Item 3">
                    <calcite-list display-mode="nested" drag-enabled label="List 3" group="my-list"></calcite-list>
                  </calcite-list-item>
                </div>
                <div><calcite-list-item label="Depth 3" description="Item 4"></calcite-list-item></div>
              </calcite-list>
            </calcite-list-item>
          </div>
          <div><calcite-list-item label="Depth 2" description="Item 5"></calcite-list-item></div>
        </calcite-list>
      </calcite-list-item>
    </div>
    <div><calcite-list-item label="Depth 1" description="Item 6"></calcite-list-item></div>
    <div><calcite-list-item drag-disabled label="Depth 1" description="Item 7"></calcite-list-item></div>
  </calcite-list>\``,
      ...C.parameters?.docs?.source
    }
  }
};
M.parameters = {
  ...M.parameters,
  docs: {
    ...M.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <h2>interaction-mode="static" and selection-mode="none" (non-interactive)</h2>

  <calcite-list interaction-mode="static" selection-mode="none">
    <calcite-list-item label="List Item 1" description="Descriptive description about something"></calcite-list-item>
    <calcite-list-item label="List Item 2" description="Descriptive description about something"></calcite-list-item>
    <calcite-list-item label="List Item 3" description="Descriptive description about something"></calcite-list-item>
  </calcite-list>
  <br />

  <h2>interaction-mode="static" and selection-appearance="icon" (non-interactive)</h2>

  <calcite-list interaction-mode="static" selection-appearance="icon" selection-mode="single">
    <calcite-list-item label="List Item 1" description="Descriptive description about something"></calcite-list-item>
    <calcite-list-item label="List Item 2" description="Descriptive description about something"></calcite-list-item>
    <calcite-list-item label="List Item 3" description="Descriptive description about something"></calcite-list-item>
  </calcite-list>
  <br />

  <h2>interaction-mode="static" and selection-appearance="border" (interactive)</h2>

  <calcite-list interaction-mode="static" selection-appearance="border" selection-mode="single">
    <calcite-list-item label="List Item 1" description="Descriptive description about something"></calcite-list-item>
    <calcite-list-item label="List Item 2" description="Descriptive description about something"></calcite-list-item>
    <calcite-list-item label="List Item 3" description="Descriptive description about something"></calcite-list-item>
  </calcite-list>
  <br />

  <h2>interaction-mode="interactive" (interactive)</h2>

  <calcite-list interaction-mode="interactive" selection-mode="single">
    <calcite-list-item label="List Item 1" description="Descriptive description about something"></calcite-list-item>
    <calcite-list-item label="List Item 2" description="Descriptive description about something"></calcite-list-item>
    <calcite-list-item label="List Item 3" description="Descriptive description about something"></calcite-list-item>
  </calcite-list>
\``,
      ...M.parameters?.docs?.source
    }
  }
};
B.parameters = {
  ...B.parameters,
  docs: {
    ...B.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-list drag-enabled label="test">\n    <calcite-list-item label="small" value="small" description="small hello world"></calcite-list-item>\n  </calcite-list>`',
      ...B.parameters?.docs?.source
    }
  }
};
E.parameters = {
  ...E.parameters,
  docs: {
    ...E.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-list
    filter-enabled
    filter-placeholder="typing 'recreation' should show 1st group with all items"
    filter-text="Beaches"
  >
    <calcite-list-item-group heading="Outdoor recreation" id="recreation">
      <calcite-list-item
        label="Hiking trails"
        description="Designated routes for hikers to use."
        value="hiking-trails"
      ></calcite-list-item>
      <calcite-list-item
        label="Waterfalls"
        description="Vertical drops from a river."
        value="waterfalls"
      ></calcite-list-item>
      <calcite-list-item-group heading="Beaches" id="beaches">
        <calcite-list-item label="Surfing" description="Surfing" value="Surfing"></calcite-list-item>
        <calcite-list-item label="Paragliding" description="Paragliding" value="Paragliding"></calcite-list-item>
      </calcite-list-item-group>
    </calcite-list-item-group>
  </calcite-list>\``,
      ...E.parameters?.docs?.source
    }
  }
};
O.parameters = {
  ...O.parameters,
  docs: {
    ...O.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-list style="block-size: 600px; inline-size: 400px;" loading></calcite-list>`',
      ...O.parameters?.docs?.source
    }
  }
};
const Z = ["simple", "scales", "onlyLabelVersusOnlyDescription_TestOnly", "stretchSlottedContent", "nestedItems", "groupedItems", "startAndEndContentSlots", "contentBottomSlots", "contentBottomSlotsNested", "richContent", "richContentFilterEnabled", "filterEnabledWithHiddenItems", "darkModeRTL_TestOnly", "disabled_TestOnly", "customContent_TestOnly", "singlePersist_TestOnly", "closableListItems_TestOnly", "filteredChildListItems_TestOnly", "filterActions_TestOnly", "sortableList_TestOnly", "sortableNestedList_TestOnly", "emptyExpandedLists_TestOnly", "listWithEmptyChildList_TestOnly", "listWithGroupedAndSlottedItems_TestOnly", "filteredListItemsNoResults_TestOnly", "nestingLists_TestOnly", "closedItems_TestOnly", "dragEnabledNestedLists", "dragEnabledNestedListsIndirectChildren", "interactiveMode", "sortableListWithSingleItem", "filterGroups", "emptyFixedHeight"];
export {
  Z as __namedExportsOrder,
  y as closableListItems_TestOnly,
  R as closedItems_TestOnly,
  b as contentBottomSlots,
  g as contentBottomSlotsNested,
  _ as customContent_TestOnly,
  s as darkModeRTL_TestOnly,
  X as default,
  w as disabled_TestOnly,
  P as dragEnabledNestedLists,
  C as dragEnabledNestedListsIndirectChildren,
  k as emptyExpandedLists_TestOnly,
  O as emptyFixedHeight,
  L as filterActions_TestOnly,
  x as filterEnabledWithHiddenItems,
  E as filterGroups,
  o as filteredChildListItems_TestOnly,
  H as filteredListItemsNoResults_TestOnly,
  i as groupedItems,
  M as interactiveMode,
  I as listWithEmptyChildList_TestOnly,
  D as listWithGroupedAndSlottedItems_TestOnly,
  n as nestedItems,
  $ as nestingLists_TestOnly,
  d as onlyLabelVersusOnlyDescription_TestOnly,
  v as richContent,
  h as richContentFilterEnabled,
  m as scales,
  r as simple,
  f as singlePersist_TestOnly,
  B as sortableListWithSingleItem,
  T as sortableList_TestOnly,
  S as sortableNestedList_TestOnly,
  u as startAndEndContentSlots,
  p as stretchSlottedContent
};
