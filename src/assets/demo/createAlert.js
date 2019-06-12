// example for alerts appended to dom
function createExampleAlert (id) {
  const exampleAlert =
  `<calcite-alert id=${id} color='red'>
      <div slot='alert-title'>Something failed</div>
      <div slot='alert-message'>That thing you wanted to do didn't work as expected</div>
      <a slot='alert-link' href=''>Retry</a>
  </calcite-alert>`;

  if (!document.querySelector(`#${id}`)) {
    document.querySelector('#my-alert-container').insertAdjacentHTML('beforeend', exampleAlert);
  }

  // hacky way to allow animation after appending to dom
  document.querySelector('#my-alert-container').open(`${id}`);
}
