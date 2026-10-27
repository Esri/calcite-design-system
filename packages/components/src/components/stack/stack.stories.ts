import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { html } from "../../../support/formatting";
import type { Stack } from "./stack";
import "../action/action"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "../action-menu/action-menu"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "../avatar/avatar"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "../chip/chip"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "../dropdown/dropdown"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "../dropdown-group/dropdown-group"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "../dropdown-item/dropdown-item"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "../handle/handle"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "../input/input"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "../panel/panel"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "./stack"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature

export default {
  title: "Components/Support/Stack",
  args: {
    disabled: false,
  },
};

type StackStoryArgs = Pick<Stack, "disabled">;

const thumbnailImage = placeholderImage({ width: 44, height: 44 });

const simpleHTML = (args: StackStoryArgs): string =>
  html`<calcite-stack ${boolean("disabled", args.disabled)}>
    <calcite-action appearance="transparent" text="banana" icon="banana" slot="actions-start"></calcite-action>
    Hello World
    <calcite-avatar slot="content-end" thumbnail="${thumbnailImage}" scale="s"> </calcite-avatar>
    <calcite-chip slot="content-start" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
    <calcite-action appearance="transparent" text="Close" icon="x" slot="actions-end"></calcite-action>
  </calcite-stack>`;

export const simple = (args: StackStoryArgs): string => simpleHTML(args);

export const stretchSlottedContent = (): string => html`
  <calcite-stack>
    <calcite-handle slot="actions-start"></calcite-handle>
    <calcite-action appearance="transparent" text="banana" icon="banana" slot="actions-start"></calcite-action>
    Hello World
    <calcite-avatar slot="content-end" thumbnail="${thumbnailImage}" scale="s"> </calcite-avatar>
    <calcite-chip slot="content-start" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
    <calcite-action-menu slot="actions-end" appearance="transparent">
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
  </calcite-stack>
`;

export const simpleDarkMode = (): string => simpleHTML({ disabled: false });
simpleDarkMode.parameters = { themes: modesDarkDefault };

export const disabled = (): string =>
  html`<calcite-stack disabled>
    <calcite-action appearance="transparent" text="banana" icon="banana" slot="actions-start"></calcite-action>
    Hello World
    <calcite-avatar slot="content-end" thumbnail="${thumbnailImage}" scale="s"> </calcite-avatar>
    <calcite-chip slot="content-start" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
    <calcite-action appearance="transparent" text="Close" icon="x" slot="actions-end"></calcite-action>
  </calcite-stack>`;

export const panelFooter = (): string =>
  html`<calcite-panel>
    <div slot="header-content">My Panel</div>
    <p>My content</p>
    <calcite-stack slot="footer">
      <calcite-action text="select" icon="check" slot="actions-start"></calcite-action>
      <calcite-input disabled></calcite-input>
      <calcite-avatar slot="content-start" thumbnail="${thumbnailImage}" scale="s"> </calcite-avatar>
      <calcite-chip slot="content-end" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
      <calcite-action text="delete" icon="trash" slot="actions-end"></calcite-action>
    </calcite-stack>
  </calcite-panel>`;
