import { html } from "../../support/formatting";

export const panelTokens = {
  calcitePanelCornerRadius: "",
  calcitePanelShadow: "",
  calcitePanelHeadingTextColor: "",
  calcitePanelBackgroundColor: "",
  calcitePanelHeaderBackgroundColor: "",
  calcitePanelFooterBackgroundColor: "",
  calcitePanelContentTopBackgroundColor: "",
  calcitePanelContentBottomBackgroundColor: "",
  calcitePanelBorderColor: "",
  calcitePanelHeaderBorderColor: "",
  calcitePanelFooterBorderColor: "",
  calcitePanelContentTopBorderColor: "",
  calcitePanelContentBottomBorderColor: "",
  calcitePanelActionBarBorderColor: "",
  calcitePanelSpace: "",
  calcitePanelHeaderSpace: "",
  calcitePanelFooterSpace: "",
  calcitePanelContentTopSpace: "",
  calcitePanelContentBottomSpace: "",
  calcitePanelActionsBackgroundColor: "",
  calcitePanelActionsBackgroundColorHover: "",
  calcitePanelActionsBackgroundColorPressed: "",
  calcitePanelActionsTextColor: "",
  calcitePanelActionsTextColorPressed: "",
};

export const panel = html`<calcite-panel
  heading="Terms and conditions"
  description="Something great about this"
  closable
  collapsible
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
    sollicitudin dui in fermentum. Fusce egestas erat nec eros sodales ornare. Ut malesuada est tortor, vitae semper
    turpis rutrum at. Donec suscipit, nulla in euismod luctus, nulla sapien interdum tortor, a iaculis elit mi sed
    lectus. Morbi in congue metus, non imperdiet ex. Nunc et neque tempor, porttitor est sed, vestibulum risus. Integer
    non erat libero.
  </p>
  <p>
    Cras sagittis vel neque sed efficitur. Vestibulum mattis diam eget urna condimentum tempus. Donec malesuada velit
    sit amet metus faucibus pharetra. Sed sit amet massa facilisis, porttitor nunc vitae, sollicitudin mauris. Nullam
    nec rhoncus augue. Praesent rhoncus varius sapien, sit amet porttitor nisl varius eu. Pellentesque at eros eget
    metus dignissim lacinia. Sed sed justo eget sapien ultrices commodo. Donec eget pretium urna. Vestibulum ut tortor
    ut quam viverra dictum. Morbi ut turpis velit. Phasellus maximus lacus nunc, ac consequat est varius in. Nullam
    facilisis, purus ut aliquet condimentum, est tortor accumsan justo, at sagittis urna dolor eget lacus. Interdum et
    malesuada fames ac ante ipsum primis in faucibus.
  </p>
  <p>
    Curabitur mauris quam, tempor sit amet massa sed, mattis blandit diam. Proin dignissim leo vitae quam fringilla
    viverra. Ut eget gravida magna, et tincidunt dui. Nullam a finibus ante, eu dignissim eros. Aenean sodales
    sollicitudin dui in fermentum. Fusce egestas erat nec eros sodales ornare. Ut malesuada est tortor, vitae semper
    turpis rutrum at. Donec suscipit, nulla in euismod luctus, nulla sapien interdum tortor, a iaculis elit mi sed
    lectus. Morbi in congue metus, non imperdiet ex. Nunc et neque tempor, porttitor est sed, vestibulum risus. Integer
    non erat libero.
  </p>
  <calcite-button slot="footer-end"> I'm done </calcite-button>
</calcite-panel>`;
