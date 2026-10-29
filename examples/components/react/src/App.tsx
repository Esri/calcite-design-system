import { useState } from "react";
import "@esri/calcite-components/components/calcite-button";
import "@esri/calcite-components/components/calcite-icon";
import "@esri/calcite-components/components/calcite-slider";
import "./App.css";

function App() {
  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderInput = (event: CustomEvent) => {
    const value = (event.target as HTMLCalciteSliderElement).value;
    if (typeof value === "number") {
      setSliderValue(value);
    }
  };

  return (
    <>
      <h1>
        Hello, React <calcite-icon icon="banana" />
      </h1>
      <calcite-button onClick={() => setSliderValue(0)}>Reset</calcite-button>
      <calcite-slider
        min={1}
        max={100}
        value={sliderValue}
        step={1}
        oncalciteSliderInput={handleSliderInput}
      />
      <p>The slider currently has a value of {sliderValue}.</p>
    </>
  );
}

export default App;
