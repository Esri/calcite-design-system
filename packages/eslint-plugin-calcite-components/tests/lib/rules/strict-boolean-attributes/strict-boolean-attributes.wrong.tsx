// @ts-nocheck
@Component({ tag: "sample-tag" })
export class SampleTag {
  @Prop() aBoolean = true;

  render() {
    return <div>test</div>;
  }
}
