// @ts-nocheck
@Component({ tag: "sample-tag" })
export class SampleTag {
  render() {
    return (
      <Host>
        <div
          ref={(el: HTMLDivElement): void => {
            /* refEl */
          }}
          class="some-class"
          id={`${guid}-element`}
          onClick={() => {
            /* click! */
          }}
        >
          test
        </div>
      </Host>
    );
  }
}
