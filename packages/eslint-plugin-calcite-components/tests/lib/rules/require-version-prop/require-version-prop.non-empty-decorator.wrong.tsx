// @ts-nocheck
@Component({ tag: "sample-tag" })
export class SampleTag {
  @Prop() foo: string;

  @Prop({ reflect: true }) version = CalciteVersion;

  render() {
    return <Host />;
  }
}
