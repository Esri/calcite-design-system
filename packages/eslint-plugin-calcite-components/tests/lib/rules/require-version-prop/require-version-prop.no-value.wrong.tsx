// @ts-nocheck
@Component({ tag: "sample-tag" })
export class SampleTag {
  @Prop() foo: string;

  @Prop() version;

  render() {
    return <Host />;
  }
}
