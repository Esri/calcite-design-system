// @ts-nocheck
@Component({ tag: "sample-tag" })
export class SampleTag {
  @Listen("keydown")
  onAllowedEvent() {}

  connectedCallback(): void {
    document.addEventListener("click", this.handleAllowedEvent);
  }

  disconnectedCallback(): void {
    document.removeEventListener("click", this.handleAllowedEvent);
  }

  handleAllowedEvent(): void {}

  render() {
    return <div>test</div>;
  }
}
