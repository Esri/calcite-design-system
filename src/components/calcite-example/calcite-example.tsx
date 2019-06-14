import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Method,
  State,
  h
} from "@stencil/core";

@Component({
  tag: "calcite-example",
  styleUrl: "calcite-example.scss",
  shadow: true
})
export class CalciteExample {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------
  /**
  * Be sure to add a jsdoc comment describing your propery for the generated readme file.
  * If your property should be hidden from documentation, you can use the `@internal` tag
  */
  @Prop() property: string = "default";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillUpdate(): void {}

  render() {
    return <Host />;
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Event() open: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /**
  * Add a jsdoc comment describing your method and it's parameters (use `@param`).
  */
  @Method() async close(): Promise<void> {
    return Promise.resolve(this._privateMethod());
  }

  //--------------------------------------------------------------------------
  //
  //  Private State
  //
  //--------------------------------------------------------------------------

  @State() state: string = "default";

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _privateMethod(): void {}
}
