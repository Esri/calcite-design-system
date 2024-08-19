import { html } from "../../../support/formatting";
import { setCSSVariables } from "../../tests/utils/cssTokenValues";

export default {
  title: "Components/Action Group",
};

export const honorsFlexGrow = (): string =>
  html`<style>
      calcite-action {
        flex-grow: 1;
      }
    </style>
    <calcite-action-group style="width:600px" layout="horizontal">
      <calcite-action icon="bell" alignment="center"></calcite-action>
      <calcite-action icon="biking" alignment="center"></calcite-action>
      <calcite-action icon="bluetooth" alignment="center"></calcite-action>
    </calcite-action-group>`;

export const gridCenteringOfActionsInAGroup = (): string => html`
  <div style="width:400px">
    <calcite-action-group layout="grid">
      <calcite-action alignment="center" scale="m" appearance="solid" icon="polygon"> </calcite-action>
      <calcite-action alignment="center" scale="m" appearance="solid" icon="rectangle"> </calcite-action>
      <calcite-action alignment="center" scale="m" appearance="solid" icon="trash"> </calcite-action>
    </calcite-action-group>
  </div>
`;

export const withoutDefinedGridGap_TestOnly = (): string =>
  html` <calcite-action-group layout="grid">
    <calcite-action text="Add" icon="arrow-up-left"></calcite-action>
    <calcite-action text="Save" icon="chevron-up"></calcite-action>
    <calcite-action text="Layers" icon="arrow-up-right"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-left"></calcite-action>
    <calcite-action text="Layers" icon="layers"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-right"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-left"></calcite-action>
    <calcite-action text="Layers" icon="chevron-down"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-right"></calcite-action>
  </calcite-action-group>`;

export const arabicLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-group expanded lang="ar">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`;

export const germanLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-group expanded lang="de">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`;

export const norwegianLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-group expanded lang="no">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`;

export const ChineseLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-group expanded lang="zh-CN">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`;

export const GreekLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-group expanded lang="el">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`;

export const TurkishLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-group expanded lang="tr">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`;

export const theming_TestOnly = (): string =>
  html` <style>
      .container {
        ${setCSSVariables([
        "--calcite-action-background-color",
        "--calcite-action-group-border-color",
        "--calcite-action-group-columns",
      ])}
      }
    </style>
    <div class="container">
      <calcite-action-bar>
        <calcite-action-group
          ><calcite-action id="plus" slot="menu-actions" text="Add" icon="plus"></calcite-action>
          <calcite-action id="banana" slot="menu-actions" text="Banana" icon="banana"></calcite-action
        ></calcite-action-group>
        <calcite-action-group
          ><calcite-action id="plus" slot="menu-actions" text="Add" icon="plus"></calcite-action>
          <calcite-action id="banana" slot="menu-actions" text="Banana" icon="banana"></calcite-action
        ></calcite-action-group>
      </calcite-action-bar>
      <calcite-action-group layout="grid">
        <calcite-action text="Add" icon="arrow-up-left"></calcite-action>
        <calcite-action text="Save" icon="chevron-up"></calcite-action>
        <calcite-action text="Layers" icon="arrow-up-right"></calcite-action>
        <calcite-action text="Basemaps" icon="chevron-left"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Basemaps" icon="chevron-right"></calcite-action>
        <calcite-action text="Basemaps" icon="arrow-down-left"></calcite-action>
        <calcite-action text="Layers" icon="chevron-down"></calcite-action>
        <calcite-action text="Basemaps" icon="arrow-down-right"></calcite-action>
      </calcite-action-group>
    </div>`;
