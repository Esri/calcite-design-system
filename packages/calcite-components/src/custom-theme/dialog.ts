import { html } from "../../support/formatting";

export const dialogTokens = {
  calciteDialogScrimBackgroundColor: "",
  calciteDialogSizeX: "",
  calciteDialogMinSizeX: "",
  calciteDialogMaxSizeX: "",
  calciteDialogSizeY: "",
  calciteDialogMinSizeY: "",
  calciteDialogMaxSizeY: "",
  calciteDialogOffsetX: "",
  calciteDialogOffsetY: "",
  calciteDialogBackgroundColor: "",
  calciteDialogIconColor: "",
  calciteDialogAccentColor: "",
  calciteDialogCornerRadius: "",
  calciteDialogHeadingTextColor: "",
  calciteDialogDescriptionTextColor: "",
  calciteDialogBorderColor: "",
  calciteDialogHeaderBackgroundColor: "",
  calciteDialogHeaderActionBackgroundColor: "",
  calciteDialogHeaderActionBackgroundColorHover: "",
  calciteDialogHeaderActionBackgroundColorPress: "",
  calciteDialogHeaderActionTextColor: "",
  calciteDialogHeaderActionTextColorPress: "",
  calciteDialogFooterBackgroundColor: "",
  calciteDialogSpace: "",
  calciteDialogHeaderContentSpace: "",
  calciteDialogFooterSpace: "",
  calciteDialogActionMenuBorderColor: "",
};

export const dialog = html`
  <calcite-shell style="position:relative; height: 500px; width: 500px">
    <calcite-dialog
      heading="Information"
      description="Themed"
      kind="info"
      scale="s"
      placement="bottom-end"
      open
      width="s"
      slot="dialogs"
    >
      <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
      <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
      <calcite-action text="Layers" icon="question" slot="header-actions-end"></calcite-action>
      <div slot="content-top">To continue, you must agree to the terms</div>
      <calcite-label slot="content-bottom" layout="inline-space-between" style="--calcite-label-margin-bottom: 0">
        <calcite-checkbox></calcite-checkbox>I agree to the terms
      </calcite-label>
      <p>
        Curabitur mauris quam, tempor sit amet massa sed, mattis blandit diam. Proin dignissim leo vitae quam fringilla
        viverra. Ut eget gravida magna, et tincidunt dui. Nullam a finibus ante, eu dignissim eros. Aenean sodales
        sollicitudin dui in fermentum.
      </p>

      <calcite-button slot="footer-end" width="auto" scale="s">Add members now</calcite-button>
    </calcite-dialog>
  </calcite-shell>
`;
