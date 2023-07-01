// @ts-nocheck
@Component({ tag: "sample-tag" })
export class SampleTag {
  render() {
    return (
      <Host some-other-attr="some-attr" someProp={0}>
        test
      </Host>
    );
  }
}
