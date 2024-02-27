// @ts-nocheck
@Component({ tag: "sample-tag" })
export class SampleTag {
  @Event()
  myEvent: EventEmitter;

  @Event()
  myImplicitTypeEvent;

  render() {
    return <Host>test</Host>;
  }
}
