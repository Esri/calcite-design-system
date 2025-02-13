import { useState } from "react";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-slider";
import { CalciteButton, CalciteIcon, CalciteSlider } from "@esri/calcite-components-react";
import "./App.css";

function App() {
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <>
      <h1>
        Hello, React <CalciteIcon icon="banana" />
      </h1>
      <CalciteButton onClick={() => setSliderValue(0)}>Reset</CalciteButton>
      <CalciteSlider
        min={1}
        max={100}
        value={sliderValue}
        step={1}
        onCalciteSliderInput={({ target }) => {
          const value = (target as HTMLCalciteSliderElement).value;
          if (typeof value === "number") {
            setSliderValue(value);
          }
        }}
      />
      <p>The slider currently has a value of {sliderValue}</p>
    </>
  );
}

export default App;
