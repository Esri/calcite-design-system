import { findAssociatedForm, FormOwner, resetForm, submitForm } from "./form";

describe("form", () => {
  it("has a `submitForm()` util", async () => {
    const formEl = document.createElement("form");
    const form = null;
    const el = document.createElement("div");
    const formOwner: FormOwner = { formEl, form, el };
    const submitSpy = jest.fn();
    formEl.requestSubmit = submitSpy;

    let submitted = submitForm(formOwner);

    expect(submitted).toBe(true);
    expect(submitSpy).toHaveBeenCalledTimes(1);

    formOwner.formEl = null;

    submitted = submitForm(formOwner);

    expect(submitted).toBe(false);
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });

  it("has a `resetForm()` util", async () => {
    const formEl = document.createElement("form");
    const form = null;
    const el = document.createElement("div");
    const formOwner: FormOwner = { formEl, form, el };
    const resetSpy = jest.fn();
    formEl.reset = resetSpy;

    resetForm(formOwner);
    expect(resetSpy).toHaveBeenCalledTimes(1);

    formOwner.formEl = null;

    resetForm(formOwner);
    expect(resetSpy).toHaveBeenCalledTimes(1);
  });

  describe("`findAssociatedForm()`", () => {
    it("finds form via ancestry", async () => {
      const formEl = document.createElement("form");
      const form = null;
      const el = document.createElement("div");
      formEl.append(el);
      const formOwner: FormOwner = { formEl, form, el };

      expect(findAssociatedForm(formOwner)).toBe(formEl);
    });

    it("finds form via ID", async () => {
      const formEl = document.createElement("form");
      const formId = "test-form";
      formEl.id = formId;
      const form = formId;
      const el = document.createElement("div");
      document.append(formEl, el);
      const formOwner: FormOwner = { formEl, form, el };

      expect(findAssociatedForm(formOwner)).toBe(formEl);
    });
  });
});
