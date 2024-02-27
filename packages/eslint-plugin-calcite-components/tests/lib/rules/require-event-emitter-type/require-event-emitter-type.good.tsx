// @ts-nocheck
@Component({ tag: "sample-tag" })
export class SampleTag {
  @Event()
  myEvent: EventEmitter<void>;

  render() {
    return <Host>test</Host>;
  }
}
