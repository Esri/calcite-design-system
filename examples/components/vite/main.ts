/**
 * This example uses the Custom Elements build of Calcite Components.
 * Refer to the documentation if switching to the Distribution build:
 * https://developers.arcgis.com/calcite-design-system/get-started/#choose-a-build
 **/
import { setAssetPath } from '@esri/calcite-components/dist/components';
import '@esri/calcite-components/dist/components/calcite-button';
import '@esri/calcite-components/dist/components/calcite-icon';
import '@esri/calcite-components/dist/components/calcite-date-picker';
import '@esri/calcite-components/dist/components/calcite-loader';

import '@esri/calcite-components/dist/calcite/calcite.css';
import './style.css';

setAssetPath(location.href);

const loader = document.createElement('calcite-loader');
document.body.appendChild(loader);
