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
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
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
