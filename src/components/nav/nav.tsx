import { Component, Element, h, Host, Prop, VNode } from "@stencil/core";

@Component({
  tag: "calcite-nav",
  styleUrl: "nav.scss",
  shadow: true
})

/**
 * @slot logo - A slot for adding a `calcite-logo` component to the primary nav level
 * @slot user - A slot for adding a `calcite-user` component to the primary nav level
 * @slot progress - A slot for adding a `calcite-progress` component to the primary nav level
 * @slot primary-content-start - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the start position of the primary nav level
 * @slot primary-content-center - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the center position of the primary nav level
 * @slot primary-content-end - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the end position of the primary nav level
 * @slot secondary-content-start - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the start position of the secondary nav level
 * @slot secondary-content-end - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the end position of the secondary nav level
 * @slot tertiary-content-start - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the start position of the tertiary nav level
 * @slot tertiary-content-end - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the end position of the tertiary nav level
 */
export class CalciteNav {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteNavElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------
  @Prop({ reflect: true }) hidden = false;

  /* todo When `true`, hides slots secondary and tertiary slots and enables menu? */
  @Prop({ reflect: true }) collapsed = false;

  /* todo Provide the label for the action that will invoke the vertical sheet display? */
  @Prop({ reflect: true }) menuLabel: string;

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  renderNavLevel(level: "primary" | "secondary" | "tertiary"): VNode {
    // todo use slot change handlers
    const progress = this.el.querySelector('[slot="progress"]');
    const logo = this.el.querySelector('[slot="logo"]');
    const user = this.el.querySelector('[slot="user"]');
    const contentStart = this.el.querySelector(`[slot="${level}-content-start"]`);
    const contentCenter = this.el.querySelector(`[slot="${level}-content-center"]`);
    const contentEnd = this.el.querySelector(`[slot="${level}-content-end"]`);

    const showMenu =
      (level === "primary" && (logo || user)) || contentCenter || contentStart || contentEnd;

    return showMenu ? (
      <div class={`nav-container nav-${level}`}>
        {progress ? <slot name="progress" /> : null}
        <div class="nav-container-content">
          {level === "primary" && logo ? <slot name="logo" /> : null}
          {contentStart ? <slot name={`${level}-content-start`} /> : null}
          {contentCenter ? <slot name={`${level}-content-center`} /> : null}
          {contentStart ? <slot name={`${level}-content-end`} /> : null}
          {level === "primary" && user ? <slot name="user" /> : null}
        </div>
      </div>
    ) : null;
  }

  render(): VNode {
    return (
      <Host>
        {this.renderNavLevel("primary")}
        {this.renderNavLevel("secondary")}
        {this.renderNavLevel("tertiary")}
      </Host>
    );
  }
}
