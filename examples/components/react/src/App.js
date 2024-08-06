import React, { useState } from 'react';
import "@esri/calcite-components/dist/components/calcite-button.js";
import "@esri/calcite-components/dist/components/calcite-icon.js";
import "@esri/calcite-components/dist/components/calcite-slider.js";
import {
  CalciteButton,
  CalciteIcon,
  CalciteSlider
} from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/calcite/calcite.css';

function App() {
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <>
      <h1>
        Hello, React <CalciteIcon icon="banana" />
      </h1>
      <CalciteButton onClick={(e) => setSliderValue(0)}>Reset</CalciteButton>
      <CalciteSlider
        min="1"
        max="100"
        value={sliderValue}
        step="1"
        onCalciteSliderInput={(e) => setSliderValue(e.target.value)}
      />
      <p>The slider currently has a value of {sliderValue}</p>
    </>
  );
}

export default App;
