// @ts-nocheck
@Component({ tag: "sample-tag" })
export class SampleTag {
  @Listen("keypress")
  onDisallowedEvent() {}

  connectedCallback(): void {
    document.addEventListener("some-unsupported-event", this.handleDisallowedEvent);
  }

  disconnectedCallback(): void {
    document.removeEventListener("some-unsupported-event", this.handleDisallowedEvent);
  }

  handleDisallowedEvent(): void {}

  render() {
    return <div>test</div>;
  }
}
