import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Method,
  State,
  Listen,
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
   * Be sure to add a jsdoc comment describing your property for the generated readme file.
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
    console.log(this.state);
    return <Host />;
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click") onClick(e: Event) {
    console.log(e);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
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
  @Method() async doThing(): Promise<void> {
    return Promise.resolve(this.privateMethod());
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @State() private state: string = "default";

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private privateMethod(): void {}
}
