import {
  Component,
  Element,
  // Event,
  // EventEmitter,
  h,
  Host,
  // Listen,
  Prop
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { CSS, TEXT } from "./resources";

@Component({
  tag: "calcite-pagination",
  styleUrl: "calcite-pagination.scss",
  shadow: true
})
export class CalcitePagination {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  @Prop({ reflect: true }) start = 1;

  @Prop({ reflect: true }) total = 2;

  /** specify the theme of accordion, defaults to light */
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

  @Prop({ reflect: true }) num = 1;

  @Prop({ reflect: true }) textLabelNext:string = TEXT.nextLabel;

  @Prop({ reflect: true }) textLabelPrevious:string = TEXT.previousLabel;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render() {
    const dir = getElementDir(this.el);
    return (
      <Host dir={dir}>hello world</Host>
    );
  }
}
