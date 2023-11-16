# ban-events

Helps prevent usage of specific events and allows suggesting alternatives. This rule can be helpful for code consistency.

## Config

An array of event names to ban or an array of objects with the event name and custom message to display.

## Usage

```json
{ "@esri/calcite-components/ban-events": ["error", ["keypress", "gesturechange"]] }
```

```json
{
  "@esri/calcite-components/ban-props-on-host": [
    "error",
    [
      {
        "event": "keypress",
        "message": "use keyup or keydown instead"
      },
      {
        "event": "gesturechange",
        "message": "this event is non-standard, please use touch events instead"
      }
    ]
  ]
}
```
