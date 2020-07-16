// Fail tests on console.error(): https://github.com/Esri/calcite-components/pull/728
let error = console.error;
console.error = function (message, ...args) {
    error.call(console, message, ...args); // keep default behaviour
    throw message instanceof Error ? message : new Error(message);
};
