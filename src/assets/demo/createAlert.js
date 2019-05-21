
// example for alerts appended to dom
function createExampleAlert (id) {
  const exampleAlert =
  `<calcite-alert color='red' id=${id}>
        <div slot="alert-title">You can't do that</div>
        <div slot="alert-message">Sorry bud</div>
      </calcite-alert>`;

  if (!document.querySelector(`#${id}`)) {
    document.querySelector('#my-alert-container').insertAdjacentHTML('beforeend', exampleAlert);
  }

  // hacky way to allow animation after appending to dom
  setTimeout(function () { document.querySelector('#my-alert-container').open(`${id}`); }, 0);
}
