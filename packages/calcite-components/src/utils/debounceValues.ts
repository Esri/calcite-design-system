// Resizing Debounce
// - Usecase: The `debounce` function ensures that the `resize` method is not called more often than the specified milliseconds, regardless of how frequently the resize event is triggered.
// - Use in the Component:

// Action-bar resize method is called with debounce when it overflows actions that won't fit into menus.
export const overflowActionsDebounceInMs = 150;
export const overflowActionsDebounceInMsExtended = overflowActionsDebounceInMs + 10;

// Filtering Debounce
// - UseCase: As the user types to filter the options, each keystroke could potentially trigger a filtering operation. By debouncing, the code waits until the user pauses typing before executing the filtering logic, thereby reducing the number of executions and improving performance.
// - Use in the Component:

// Combobox filtering method is called with debounce.
export const comboboxFilterDebounceInMs = 100;

// Filter `updateFiltered` method is called with debounce.
export const filterDebounceInMs = 250;

// List `updateListItems` method is called with debounce.
export const noDebounce = 0;
export const listDebounceInMs = noDebounce + filterDebounceInMs;

// UI Reposition Debounce
// - UseCase: In scenarios where multiple reposition requests might be made in quick succession (e.g., due to rapid UI changes), calling debounce helps in optimizing performance by reducing unnecessary computations and re-renderings.
// - Use in the Component:

// Floating-ui `positionFloatingUI` is called with debounce.
export const repositionDebounceInMs = 100;

// Drag Debounce
// UseCase: Methods can fire frequently during drag. To perform expensive operations consider using a debounce to avoid locking up the main thread.
// Use in the Component:

// TODO: Slider `calciteSliderInput`
