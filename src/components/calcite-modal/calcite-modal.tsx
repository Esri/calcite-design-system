import { Component, Prop } from "@stencil/core";
import { format } from "../../utils/utils";

@Component({
  tag: "calcite-modal",
  styleUrl: "calcite-modal.css",
  shadow: true
})
export class CalciteModal {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div>Hello, World! I'm {this.getText()}</div>;
  }
}
