class CalciteForm extends HTMLElement {
  connectedCallback() {
    this.addEventListener("submit", this.onFormSubmit);
  }

  disconnectedCallback() {
    this.removeEventListener("submit", this.onFormSubmit);
  }

  onFormSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    alert(JSON.stringify(data, null, 2));
  }
}
customElements.define("calcite-form", CalciteForm);
