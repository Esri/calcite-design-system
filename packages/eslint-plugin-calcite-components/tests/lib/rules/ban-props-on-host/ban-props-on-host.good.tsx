// @ts-nocheck
@Component({ tag: "sample-tag" })
export class SampleTag {
  render() {
    return (
      <Host
        aria-label="useful-label"
        role="presentation"
        tabIndex={0}
        onClick={() => {
          /* click! */
        }}
      >
        test
      </Host>
    );
  }
}
