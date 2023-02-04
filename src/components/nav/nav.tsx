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
 * @slot primary-menu-start - A slot for adding a `calcite-nav-menu` in the start position of the primary nav level
 * @slot primary-menu-center - A slot for adding a `calcite-nav-menu` in the center position of the primary nav level
 * @slot primary-menu-end - A slot for adding a `calcite-nav-menu` in the end position of the primary nav level
 * @slot secondary-menu-start - A slot for adding a `calcite-nav-menu` in the start position of the secondary nav level
 * @slot secondary-menu-end - A slot for adding a `calcite-nav-menu` in the end position of the secondary nav level
 * @slot tertiary-menu-start - A slot for adding a `calcite-nav-menu` in the start position of the tertiary nav level
 * @slot tertiary-menu-end - A slot for adding a `calcite-nav-menu` in the end position of the tertiary nav level
 * @slot primary-actions-start - A slot for adding a `calcite-action` or other content in the start position of the primary nav level
 * @slot primary-actions-end - A slot for adding a `calcite-action` or other content in the end position of the primary nav level
 * @slot secondary-actions-start - A slot for adding a `calcite-action` or other content in the start position of the secondary nav level
 * @slot secondary-actions-end - A slot for adding a `calcite-action` or other content in the end position of the secondary nav level
 * @slot tertiary-actions-start - A slot for adding a `calcite-action` or other content in the start position of the tertiary nav level
 * @slot tertiary-actions-end - A slot for adding a `calcite-action` or other content in the end position of the tertiary nav level
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

  /* todo When `true`, hides slots secondary and tertiary slots? */
  @Prop({ reflect: true }) hideNonPrimary = false;

  /* todo Provide the label for the action that will invoke the vertical sheet display? */
  @Prop({ reflect: true }) menuLabel: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   *
   * @param level - "primary" | "secondary" | "tertiary"
   * @returns
   */
  renderNavLevel(level: "primary" | "secondary" | "tertiary"): VNode {
    // todo use slot change handlers
    const progress = this.el.querySelector('[slot="progress"]');
    const logo = this.el.querySelector('[slot="logo"]');
    const user = this.el.querySelector('[slot="user"]');
    const menuStart = this.el.querySelector(`[slot="${level}-menu-start"]`);
    const menuCenter = this.el.querySelector(`[slot="${level}-menu-center"]`);
    const menuEnd = this.el.querySelector(`[slot="${level}-menu-end"]`);
    const actionsStart = this.el.querySelector(`[slot="${level}-actions-start"]`);
    const actionsEnd = this.el.querySelector(`[slot="${level}-actions-end"]`);

    const showMenu =
      (level === "primary" && (logo || user)) ||
      menuCenter ||
      menuStart ||
      menuEnd ||
      actionsStart ||
      actionsEnd;

    return showMenu ? (
      <div class={`nav-container nav-${level}`}>
        {progress ? <slot name="progress" /> : null}
        <div class="nav-container-content">
          {level === "primary" && logo ? <slot name="logo" /> : null}
          {menuStart ? <slot name={`${level}-menu-start`} /> : null}
          {actionsStart ? <slot name={`${level}-actions-start`} /> : null}
          {menuCenter ? <slot name={`${level}-menu-center`} /> : null}
          {actionsEnd ? <slot name={`${level}-actions-end`} /> : null}
          {menuStart ? <slot name={`${level}-menu-end`} /> : null}
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
