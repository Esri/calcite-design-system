import { Component, Event, EventEmitter, Fragment, h, Prop, VNode, Watch } from "@stencil/core";

/**
 * @slot - A slot for adding `calcite-option`s.
 */
@Component({
  tag: "calcite-option-group",
  styleUrl: "option-group.scss",
  shadow: true,
})
export class OptionGroup {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({
    reflect: true,
  })
  disabled = false;

  /**
   * Accessible name for the component.
   */
  @Prop()
  label!: string;

  @Watch("disabled")
  @Watch("label")
  protected handlePropChange(): void {
    this.calciteInternalOptionGroupChange.emit();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event({ cancelable: false })
  private calciteInternalOptionGroupChange: EventEmitter<void>;

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
