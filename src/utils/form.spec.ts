import { FormOwner, submitForm } from "./form";

describe("form", () => {
  it("has a `submitForm()` util", () => {
    const formEl = document.createElement("form");
    const formOwner: FormOwner = { formEl };
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
});
