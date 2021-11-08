import { connectLabel, disconnectLabel, getLabelText, LabelableComponent, labelClickEvent } from "./label";

describe("label", () => {
  function createFakeLabelable(overrides: Partial<LabelableComponent>): LabelableComponent {
    const base = {
      el: null,
      label: null,
      labelEl: null,
      onLabelClick: jest.fn()
    };

    return { ...base, ...overrides };
  }

  describe("connectLabel/disconnectLabel", () => {
    describe("wires up the associated label", () => {
      beforeEach(() => {
        // we polyfill composedPath since Stencil's MockEvent does not support it: https://github.com/ionic-team/stencil/blob/main/src/mock-doc/event.ts#L5-L40
        CustomEvent.prototype.composedPath = function () {
          // based on https://gist.github.com/rockinghelvetica/00b9f7b5c97a16d3de75ba99192ff05c
          if (this.path) {
            return this.path;
          }
          let target = this.target;

          this.path = [];
          while (target.parentNode !== null) {
            this.path.push(target);
            target = target.parentNode;
          }
          this.path.push(document, window);
          return this.path;
        };
      });

      /**
       * This util helps simulate calcite-label's behavior since we cannot use the component here
       */
      function wireUpFakeLabel(label: HTMLElement): void {
        label.addEventListener("click", (event: MouseEvent) => {
          label.dispatchEvent(new CustomEvent(labelClickEvent, { detail: { sourceEvent: event } }));
        });
      }

      it("ignores labelable with no associated label", () => {
        document.body.innerHTML = `
          <fake-labelable id="unlabeled"></fake-labelable>
      `;

        const fakeLabelableEl = document.querySelector<HTMLElement>("#unlabeled");

        const nonLabelable = createFakeLabelable({
          el: fakeLabelableEl
        });

        connectLabel(nonLabelable);

        expect(nonLabelable.labelEl).toBeNull();

        disconnectLabel(nonLabelable);

        expect(nonLabelable.labelEl).toBeNull();
      });

      it("supports for attribute", () => {
        document.body.innerHTML = `
        <calcite-label for="for">label</calcite-label>
        <fake-labelable id="for"></fake-labelable>
      `;

        const labelEl = document.querySelector<HTMLElement>("calcite-label");
        const fakeLabelableEl = document.querySelector<HTMLElement>("#for");
        wireUpFakeLabel(labelEl);

        const labelable = createFakeLabelable({
          el: fakeLabelableEl
        });

        connectLabel(labelable);

        expect(labelable.labelEl).toBe(labelEl);

        labelEl.click();

        expect(labelable.onLabelClick).toHaveBeenCalledTimes(1);

        disconnectLabel(labelable);

        expect(labelable.labelEl).toBe(labelEl);

        labelEl.click();

        expect(labelable.onLabelClick).toHaveBeenCalledTimes(1);
      });

      it("supports wrapped labelable", () => {
        document.body.innerHTML = `
        <calcite-label>
          label
          <fake-labelable></fake-labelable>
        </calcite-label>
      `;

        const labelEl = document.querySelector<HTMLElement>("calcite-label");
        const fakeLabelableEl = document.querySelector<HTMLElement>("fake-labelable");

        wireUpFakeLabel(labelEl);

        const labelable = createFakeLabelable({
          el: fakeLabelableEl
        });

        connectLabel(labelable);

        expect(labelable.labelEl).toBe(labelEl);

        labelEl.click();

        expect(labelable.onLabelClick).toHaveBeenCalledTimes(1);

        disconnectLabel(labelable);

        expect(labelable.labelEl).toBe(labelEl);

        labelEl.click();

        expect(labelable.onLabelClick).toHaveBeenCalledTimes(1);
      });

      it("does not support nested labelables", () => {
        document.body.innerHTML = `
        <calcite-label>
          label
          <fake-labelable id="outer">
            <fake-labelable id="inner"></fake-labelable>
          </fake-labelable>
        </calcite-label>
      `;

        const labelEl = document.querySelector<HTMLElement>("calcite-label");
        const fakeInnerLabelableEl = document.querySelector<HTMLElement>("#inner");
        const fakeOuterLabelableEl = document.querySelector<HTMLElement>("#outer");

        wireUpFakeLabel(labelEl);

        const innerLabelable = createFakeLabelable({
          el: fakeInnerLabelableEl
        });

        connectLabel(innerLabelable);

        expect(innerLabelable.labelEl).toBeNull();

        const outerLabelable = createFakeLabelable({
          el: fakeOuterLabelableEl
        });

        connectLabel(outerLabelable);

        expect(outerLabelable.labelEl).toBe(labelEl);

        labelEl.click();

        expect(outerLabelable.onLabelClick).toHaveBeenCalledTimes(1);

        disconnectLabel(outerLabelable);

        labelEl.click();

        expect(outerLabelable.onLabelClick).toHaveBeenCalledTimes(1);
      });
    });
  });

  it("getLabelText", () => {
    const label = "from-label";

    expect(getLabelText(createFakeLabelable({ label }))).toBe("from-label");

    const labelEl = document.createElement("calcite-label");
    labelEl.textContent = "from-text-content";

    expect(
      getLabelText(
        createFakeLabelable({
          labelEl
        })
      )
    ).toBe("from-text-content");

    expect(
      getLabelText(
        createFakeLabelable({
          label,
          labelEl
        })
      )
    ).toBe("from-label");
  });
});
