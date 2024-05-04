// @ts-nocheck
@Component({ tag: "sample-tag" })
export class SampleTag {
  @Prop() foo: string;

  render() {
    return <Host />;
  }
}
