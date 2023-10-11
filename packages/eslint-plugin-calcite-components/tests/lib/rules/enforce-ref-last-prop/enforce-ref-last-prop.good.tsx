// @ts-nocheck
@Component({ tag: "sample-tag" })
export class SampleTag {
  render() {
    return (
      <Host>
        <div
          class="some-class"
          id={`${guid}-element`}
          onClick={() => {
            /* click! */
          }}
          ref={(el: HTMLDivElement): void => {
            /* refEl */
          }}
        >
          test
        </div>
      </Host>
    );
  }
}
