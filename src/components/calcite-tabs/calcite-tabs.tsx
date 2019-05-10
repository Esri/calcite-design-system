import { Component, Prop } from "@stencil/core";

@Component({
  tag: "calcite-tabs",
  styleUrl: "calcite-tabs.scss",
  shadow: true
})
export class CalciteTabs {
  @Prop({
    reflectToAttr: true
  })
  theme: "light" | "dark" = "light";

  render() {
    return (
      <div>
        <slot name="tab-nav" />
        <section class="tab-contents">
          <slot />
        </section>
      </div>
    );
  }
}
