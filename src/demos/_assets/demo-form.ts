class DemoForm extends HTMLElement {
  connectedCallback() {
    const form = this.querySelector("form");
    form.addEventListener("submit", this.onFormSubmit);
  }
  disconnectedCallback() {
    const form = this.querySelector("form");
    form.removeEventListener("submit", this.onFormSubmit);
  }
  onFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    for (const pair of formData.entries()) {
      data[pair[0]] = pair[1];
    }
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  }
}
customElements.define("demo-form", DemoForm);
