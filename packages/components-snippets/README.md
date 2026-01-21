# Calcite Snippets

A CLI tool that loads MDX snippets from the docs repo and injects them into your local component demo page for quick testing.

## Usage

1. Clone the documentation repo (internal) as a sibling to the Calcite Design System monorepo.
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run the snippet tool
   ```bash
   npx snippet [component]
   ```
4. If a component isn’t provided, you’ll be prompted to select one, then choose snippet(s).
5. The `components` package demo page will be updated with the selected snippet(s).

## License

COPYRIGHT Esri - <https://js.arcgis.com/5.0/LICENSE.txt>

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at <http://www.esri.com/legal/pdfs/mla_e204_e300/english>

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: <contracts@esri.com>

## Third-party notices

See [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md).
