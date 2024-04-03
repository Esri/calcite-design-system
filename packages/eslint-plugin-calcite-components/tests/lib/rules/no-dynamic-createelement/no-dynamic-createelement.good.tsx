// @ts-nocheck
@Component({ tag: "sample-tag" })
export class SampleTag {
  @Prop()
  type: "one" | "two" = "one";

  connectedCallback() {
    const child =
      this.type === "one"
        ? document.createElement("my-component-1")
        : document.createElement("my-component-2");
    this.el.append(child);
    this.internalEl = child;
  }

  disconnectedCallback() {
    this.internalEl.remove();
  }
}
