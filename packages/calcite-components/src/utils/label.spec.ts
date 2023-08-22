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

        expect(labelable.labelEl).toBeNull();
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

        expect(labelable.labelEl).toBeNull();

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

        expect(labelable.labelEl).toBeNull();

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

        expect(labelable.labelEl).toBeNull();

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

        expect(labelable.labelEl).toBeNull();

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

      it("handles the first labelable child only", () => {
        document.body.innerHTML = `
        <calcite-label>
          label
          <fake-labelable id="first"></fake-labelable>
          <fake-labelable id="second"></fake-labelable>
          <fake-labelable id="third"></fake-labelable>
        </calcite-label>
      `;

        const labelEl = document.querySelector<HTMLElement>("calcite-label");
        const fakeLabelableEl1 = document.querySelector<HTMLElement>("#first");
        const fakeLabelableEl2 = document.querySelector<HTMLElement>("#second");
        const fakeLabelableEl3 = document.querySelector<HTMLElement>("#third");

        wireUpFakeLabel(labelEl);

        const labelable1 = createFakeLabelable({ el: fakeLabelableEl1 });
        const labelable2 = createFakeLabelable({ el: fakeLabelableEl2 });
        const labelable3 = createFakeLabelable({ el: fakeLabelableEl3 });

        // we connect in reverse order to ensure we test last element handles label click first
        connectLabel(labelable1);
        connectLabel(labelable2);
        connectLabel(labelable3);

        expect(labelable1.labelEl).toBe(labelEl);
        expect(labelable2.labelEl).toBe(labelEl);
        expect(labelable3.labelEl).toBe(labelEl);

        labelEl.click();

        expect(labelable1.onLabelClick).toHaveBeenCalledTimes(1); // should be 1
        expect(labelable2.onLabelClick).toHaveBeenCalledTimes(0);
        expect(labelable3.onLabelClick).toHaveBeenCalledTimes(0);

        disconnectLabel(labelable1);

        labelEl.click();

        expect(labelable1.onLabelClick).toHaveBeenCalledTimes(1);
        expect(labelable2.onLabelClick).toHaveBeenCalledTimes(1);
        expect(labelable3.onLabelClick).toHaveBeenCalledTimes(0);

        disconnectLabel(labelable2);

        labelEl.click();

        expect(labelable1.onLabelClick).toHaveBeenCalledTimes(1);
        expect(labelable2.onLabelClick).toHaveBeenCalledTimes(1);
        expect(labelable3.onLabelClick).toHaveBeenCalledTimes(1);

        disconnectLabel(labelable3);

        labelEl.click();

        expect(labelable1.onLabelClick).toHaveBeenCalledTimes(1);
        expect(labelable2.onLabelClick).toHaveBeenCalledTimes(1);
        expect(labelable3.onLabelClick).toHaveBeenCalledTimes(1);
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
