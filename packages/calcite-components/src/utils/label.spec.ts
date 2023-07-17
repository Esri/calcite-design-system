import { connectLabel, disconnectLabel, getLabelText, LabelableComponent, labelClickEvent } from "./label";

describe("label", () => {
  function createFakeLabelable(overrides: Partial<LabelableComponent>): LabelableComponent {
    const base = {
      disabled: null,
      el: null,
      label: null,
      labelEl: null,
      onLabelClick: jest.fn(),
    };

    return { ...base, ...overrides };
  }

  describe("connectLabel/disconnectLabel", () => {
    describe("wires up the associated label", () => {
      /**
       * This util helps simulate calcite-label's behavior since we cannot use the component here
       *
       * @param label
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
          el: fakeLabelableEl,
        });

        connectLabel(nonLabelable);

        expect(nonLabelable.labelEl).toBeNull();

        disconnectLabel(nonLabelable);

        expect(nonLabelable.labelEl).toBeNull();
      });

      it("prevents selecting disabled labeled element", () => {
        document.body.innerHTML = `
        <calcite-label for="for">label</calcite-label>
        <fake-labelable id="for"></fake-labelable>
      `;

        const labelEl = document.querySelector<HTMLElement>("calcite-label");
        const fakeLabelableEl = document.querySelector<HTMLElement>("#for");
        wireUpFakeLabel(labelEl);

        const labelable = createFakeLabelable({
          el: fakeLabelableEl,
          disabled: true,
        });

        connectLabel(labelable);

        expect(labelable.labelEl).toBe(labelEl);

        labelEl.click();

        expect(labelable.onLabelClick).toHaveBeenCalledTimes(0);

        disconnectLabel(labelable);
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
          el: fakeLabelableEl,
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
          el: fakeLabelableEl,
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

      it("supports being rendered after labelable", () => {
        document.body.innerHTML = `
          <fake-labelable id="renderedFirst"></fake-labelable>
        `;

        const label = document.createElement("calcite-label");
        label.setAttribute("for", "renderedFirst");
        document.body.appendChild(label);

        const labelEl = document.querySelector<HTMLElement>("calcite-label");
        const fakeLabelableEl = document.querySelector<HTMLElement>("fake-labelable");

        wireUpFakeLabel(labelEl);

        const labelable = createFakeLabelable({
          el: fakeLabelableEl,
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

      it("works if reattached to labelable", () => {
        document.body.innerHTML = `
          <calcite-label for="for"></calcite-label>
          <fake-labelable id="for"></fake-labelable>
        `;
        document.querySelector("calcite-label").remove();

        const label = document.createElement("calcite-label");
        label.setAttribute("for", "for");
        document.body.appendChild(label);

        const labelEl = document.querySelector<HTMLElement>("calcite-label");
        const fakeLabelableEl = document.querySelector<HTMLElement>("fake-labelable");

        wireUpFakeLabel(labelEl);

        const labelable = createFakeLabelable({
          el: fakeLabelableEl,
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
          el: fakeInnerLabelableEl,
        });

        connectLabel(innerLabelable);

        expect(innerLabelable.labelEl).toBeNull();

        const outerLabelable = createFakeLabelable({
          el: fakeOuterLabelableEl,
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
          labelEl,
        })
      )
    ).toBe("from-text-content");

    expect(
      getLabelText(
        createFakeLabelable({
          label,
          labelEl,
        })
      )
    ).toBe("from-label");
  });
});
