import { Component, Element, Host, Prop, h } from "@stencil/core";

import { CalciteTheme } from "../../interfaces/common";

@Component({
  tag: "calcite-scrim",
  styleUrl: "calcite-scrim.scss",
  shadow: true
})

export class CalciteScrim{
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLElement;

// --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  @Prop({ reflect: true, mutable: true }) loading: boolean = false;

}
