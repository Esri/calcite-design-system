// @ts-nocheck
import { CalciteVersion } from "../resources";
@Component({ tag: "sample-tag" })
export class SampleTag {
  @Prop() foo: string;

  @Prop() version = CalciteVersion;

  render() {
    return <Host />;
  }
}
