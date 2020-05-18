class DemoForm extends HTMLElement {
  connectedCallback() {
    this.addEventListener("submit", this.onFormSubmit);
    this.addEventListener("formdata", this.onFormData);
  }
  disconnectedCallback() {
    this.removeEventListener("submit", this.onFormSubmit);
    this.removeEventListener("formdata", this.onFormData);
  }
  onFormSubmit(event) {
    event.preventDefault();
    new FormData(event.target);
  }
  onFormData(event) {
    let data = {};
    for (var pair of event.formData.entries()) {
      data[pair[0]] = pair[1];
    }
    console.log(data);
    alert(JSON.stringify(data, null, 2))
  }
}
customElements.define("demo-form", DemoForm);