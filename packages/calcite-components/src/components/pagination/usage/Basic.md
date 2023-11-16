The component is meant to interface with responses from ArcGIS REST services, so the props share names with [response properties](https://developers.arcgis.com/rest/users-groups-and-items/search.htm) from various search endpoints.

For example, after querying the search API, you'll get back a response similar to JSON below. The response can be passed straight to the `calcite-pagination` component.

```JSON
{
  "total": 2021,
  "start": 1,
  "num": 100,
  "results": []
}
```

```html
<calcite-pagination start-item="1" page-size="100" total-items="2021"></calcite-pagination>
```
