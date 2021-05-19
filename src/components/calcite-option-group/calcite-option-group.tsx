import { Component, h, Prop, VNode, Watch, Event, EventEmitter, Fragment } from "@stencil/core";

@Component({
  tag: "calcite-option-group",
  shadow: true
})
export class CalciteOptionGroup {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When true, it prevents selection from any of its associated options.
   */
  @Prop({
    reflect: true
  })
  disabled = false;

  /**
   * The group label. This property is required.
   */
  @Prop()
  label!: string;

  @Watch("disabled")
  @Watch("label")
  protected handlePropChange(): void {
    this.calciteOptionGroupChange.emit();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event()
  private calciteOptionGroupChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    return (
      <Fragment>
        <div>{this.label}</div>
        <slot />
      </Fragment>
    );
  }
}
