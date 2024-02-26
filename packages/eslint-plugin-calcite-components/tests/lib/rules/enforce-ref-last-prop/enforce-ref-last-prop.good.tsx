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
          tabIndex={0}
          // eslint-disable-next-line react/jsx-sort-props -- ref node is placed last per enforce-ref-last-prop rule
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
