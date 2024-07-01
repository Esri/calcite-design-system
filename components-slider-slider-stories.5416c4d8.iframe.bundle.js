"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[8143],{"./src/components/slider/slider.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Histogram:()=>Histogram,HistogramWithColors:()=>HistogramWithColors,WithLabelHandlesAndNoValue_TestOnly:()=>WithLabelHandlesAndNoValue_TestOnly,WithLargeFontSize_TestOnly:()=>WithLargeFontSize_TestOnly,__namedExportsOrder:()=>__namedExportsOrder,customLabelsAndTicks:()=>customLabelsAndTicks,darkModeHistogramRTL_TestOnly:()=>darkModeHistogramRTL_TestOnly,darkModeMirroredRange_TestOnly:()=>darkModeMirroredRange_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabled_TestOnly:()=>disabled_TestOnly,fillPlacements:()=>fillPlacements,maxTickRendering_TestOnly:()=>maxTickRendering_TestOnly,range:()=>range,rangeLabeledTicksEdgePositioningAtMax_TestOnly:()=>rangeLabeledTicksEdgePositioningAtMax_TestOnly,rangeLabeledTicksEdgePositioningAtMin_TestOnly:()=>rangeLabeledTicksEdgePositioningAtMin_TestOnly,rangeLabeledTicksOverlappingAtMax_TestOnly:()=>rangeLabeledTicksOverlappingAtMax_TestOnly,rangeLabeledTicksOverlappingAtMin_TestOnly:()=>rangeLabeledTicksOverlappingAtMin_TestOnly,rangeLabeledTicks_TestOnly:()=>rangeLabeledTicks_TestOnly,rendersWhenTrackRelatedPropChanges_TestOnly:()=>rendersWhenTrackRelatedPropChanges_TestOnly,simple:()=>simple,spaceGroupSeparatorNoBreak_TestOnly:()=>spaceGroupSeparatorNoBreak_TestOnly,wordBreakDoesNotAffectLabels_TestOnly:()=>wordBreakDoesNotAffectLabels_TestOnly});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/resources.ts"),process=__webpack_require__("../../node_modules/process/browser.js");const{scale}=_storybook_resources__WEBPACK_IMPORTED_MODULE_2__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Controls/Slider",args:{min:0,max:100,value:50,step:1,minLabel:"Temperature",disabled:!1,labelHandles:!1,labelTicks:!1,ticks:0,pageStep:5,precise:!1,mirrored:!1,snap:!0,scale:scale.defaultValue},argTypes:{scale:{options:scale.values,control:{type:"select"}}},parameters:{chromatic:{diffThreshold:Number(process.env.CHROMATIC_DIFF_THRESHOLD)||.3,delay:500}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-slider
    min="${args.min}"
    max="${args.max}"
    value="${args.value}"
    step="${args.step}"
    min-label="${args.minLabel}"
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("disabled",args.disabled)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("label-handles",args.labelHandles)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("label-ticks",args.labelTicks)}
    ticks="${args.ticks}"
    page-step="${args.pageStep}"
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("precise",args.precise)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("mirrored",args.mirrored)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("snap",args.snap)}
    scale="${args.scale}"
  ></calcite-slider>
`,range=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-slider
    min="0"
    min-label="Temperature, lower bound"
    min-value="25"
    max="100"
    max-label="Temperature, upper bound"
    max-value="75"
    step="1"
    ticks="20"
    snap
    scale="m"
  ></calcite-slider>
`,darkModeMirroredRange_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-slider
    class="calcite-mode-dark"
    mirrored
    min="0"
    min-label="Temperature, lower bound"
    min-value="25"
    max="100"
    max-label="Temperature, upper bound"
    max-value="75"
    step="1"
    label-handles
    label-ticks
    ticks="20"
    precise
    snap
    scale="m"
  ></calcite-slider>
`;darkModeMirroredRange_TestOnly.story={parameters:{themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At}};const rangeLabeledTicks_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="95"
    max="100"
    max-label="Temperature, upper bound"
    max-value="100"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
`;rangeLabeledTicks_TestOnly.parameters={chromatic:{diffThreshold:1}};const rangeLabeledTicksOverlappingAtMax_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="100"
    max="100"
    max-label="Temperature, upper bound"
    max-value="100"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
`;rangeLabeledTicksOverlappingAtMax_TestOnly.parameters={chromatic:{diffThreshold:1}};const rangeLabeledTicksOverlappingAtMin_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="5"
    max="100"
    max-label="Temperature, upper bound"
    max-value="5"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
`;rangeLabeledTicksOverlappingAtMin_TestOnly.parameters={chromatic:{diffThreshold:1}};const rangeLabeledTicksEdgePositioningAtMax_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="99.5"
    max="100"
    max-label="Temperature, upper bound"
    max-value="100"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
`;rangeLabeledTicksEdgePositioningAtMax_TestOnly.parameters={chromatic:{diffThreshold:1}};const rangeLabeledTicksEdgePositioningAtMin_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="5"
    max="100"
    max-label="Temperature, upper bound"
    max-value="5.5"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
`;rangeLabeledTicksEdgePositioningAtMin_TestOnly.parameters={chromatic:{diffThreshold:1}};const Histogram=()=>{const slider=document.createElement("calcite-slider");return slider.min=-100,slider.minValue=-33.32,slider.max=100,slider.maxValue=30.87,slider.histogram=[[-90,0],[-60,12],[-20,25],[20,55],[60,10],[90,0]],slider.ticks=10,slider.scale="m",slider.style.minWidth="60vw",slider},HistogramWithColors=()=>{const slider=document.createElement("calcite-slider");slider.min=0,slider.minValue=35,slider.max=100,slider.maxValue=55,slider.histogram=[[0,0],[20,12],[40,25],[60,55],[80,10],[100,0]],slider.style.minWidth="60vw";const colors=["red","green","blue"],offsets=colors.map(((_,i)=>""+1/(colors.length-1)*i));return slider.histogramStops=colors.map(((color,i)=>({offset:parseFloat(offsets[i]),color}))),slider.scale="m",slider},darkModeHistogramRTL_TestOnly=()=>{const slider=document.createElement("calcite-slider");return slider.min=0,slider.minValue=25,slider.max=100,slider.maxValue=75,slider.histogram=[[0,0],[20,12],[40,25],[60,55],[80,10],[100,0]],slider.ticks=10,slider.scale="m",slider.style.minWidth="60vw",slider.className="calcite-mode-dark",slider};darkModeHistogramRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const disabled_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-slider disabled value="5"></calcite-slider>`,wordBreakDoesNotAffectLabels_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-slider
    min="-100"
    max="100"
    min-value="-100"
    max-value="100"
    step="10"
    ticks="10"
    label-handles
    label-ticks
    style="word-break: break-all"
  ></calcite-slider>`,WithLabelHandlesAndNoValue_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <calcite-slider max="750"></calcite-slider> `,WithLargeFontSize_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<html lang="en">
    <head>
      <style>
        html {
          font-size: 24px;
        }
        calcite-label {
          padding: 10px;
        }
      </style>
    </head>
    <body>
      <div style="width: 400px; padding: 20px">
        <calcite-label>
          precise with label-handles
          <calcite-slider scale="s" min="10" max="100" value="50" step="10" precise label-handles></calcite-slider
        ></calcite-label>
        <calcite-label>
          precise with label-handles mirrored
          <calcite-slider
            scale="s"
            min="10"
            max="100"
            value="50"
            step="10"
            label-handles
            precise
            mirrored
          ></calcite-slider>
        </calcite-label>
        <calcite-label>
          precise with label-handles & label-ticks
          <calcite-slider
            min="0"
            max="100"
            value="40"
            step="10"
            ticks="10"
            scale="s"
            label-handles
            label-ticks
            precise
          ></calcite-slider>
        </calcite-label>
        <calcite-label>
          precise with label-handles & label-ticks mirrored
          <calcite-slider
            min="0"
            max="100"
            value="40"
            step="10"
            ticks="10"
            scale="s"
            label-handles
            precise
            mirrored
            label-ticks
          ></calcite-slider>
        </calcite-label>
        <calcite-label>
          range slider with label-handles & label-ticks
          <calcite-slider
            min="10"
            max="100"
            min-value="20"
            max-value="90"
            step="10"
            min-label="Temperature range (lower)"
            max-label="Temperature range (upper)"
            scale="s"
            label-handles
            ticks="10"
            label-ticks
          ></calcite-slider>
        </calcite-label>
        <calcite-label>
          precise range slider with label-handles & label-ticks
          <calcite-slider
            min="10"
            max="100"
            min-value="20"
            max-value="90"
            step="10"
            min-label="Temperature range (lower)"
            max-label="Temperature range (upper)"
            scale="s"
            label-handles
            ticks="10"
            precise
            label-ticks
          ></calcite-slider>
        </calcite-label>
        <calcite-label>
          precise range slider with label-handles & label-ticks mirrored
          <calcite-slider
            min="10"
            max="100"
            min-value="20"
            max-value="90"
            step="10"
            min-label="Temperature range (lower)"
            max-label="Temperature range (upper)"
            scale="s"
            label-handles
            ticks="10"
            precise
            label-ticks
            mirrored
          ></calcite-slider>
        </calcite-label>
      </div>
    </body>
  </html>`,maxTickRendering_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <style>
    calcite-slider {
      width: 60vw;
    }
  </style>

  <calcite-slider min="-100" max="100" ticks="1"></calcite-slider>
  <calcite-slider min="-100" max="100" ticks="5"></calcite-slider>
  <calcite-slider min="-100" max="100" ticks="10"></calcite-slider>
  <calcite-slider min="-250" max="250" ticks="1"></calcite-slider>
  <calcite-slider min="-250" max="250" ticks="5"></calcite-slider>
  <calcite-slider min="-250" max="250" ticks="10"></calcite-slider>
  <calcite-slider min="-500" max="500" ticks="1"></calcite-slider>
  <calcite-slider min="-500" max="500" ticks="5"></calcite-slider>
  <calcite-slider min="-500" max="500" ticks="10"></calcite-slider>
  <calcite-slider min="-1000" max="1000" ticks="1"></calcite-slider>
  <calcite-slider min="-1000" max="1000" ticks="5"></calcite-slider>
  <calcite-slider min="-1000" max="1000" ticks="10"></calcite-slider>
`,rendersWhenTrackRelatedPropChanges_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-slider id="example-slider" label-ticks max="32" value="24" min="16" snap step="8" ticks="8"></calcite-slider>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-slider");
      const slider = await document.querySelector("calcite-slider").componentOnReady();
      await new Promise((resolve) => requestAnimationFrame(resolve));

      slider.max = 64;
      slider.min = 48;
      slider.step = 16;
      slider.ticks = 16;
      slider.value = 64;
    })();
  </script>
`;rendersWhenTrackRelatedPropChanges_TestOnly.parameters={chromatic:{delay:500}};const spaceGroupSeparatorNoBreak_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-slider
    lang="ru"
    value="1000"
    label-handles
    label-ticks
    group-separator
    max-value="100000"
    max="10000"
    ticks="2000"
  ></calcite-slider>
`,fillPlacements=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <h1>single</h1>

  <h2>start (default)</h2>
  <calcite-slider min="0" max="100" value="0" fill-placement="start"></calcite-slider>
  <calcite-slider min="0" max="100" value="50" fill-placement="start"></calcite-slider>
  <calcite-slider min="0" max="100" value="100" fill-placement="start"></calcite-slider>
  <br />
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="0" fill-placement="start"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="50" fill-placement="start"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="100" fill-placement="start"></calcite-slider>
  <br />
  <h2>none</h2>
  <calcite-slider min="0" max="100" value="0" fill-placement="none"></calcite-slider>
  <calcite-slider min="0" max="100" value="50" fill-placement="none"></calcite-slider>
  <calcite-slider min="0" max="100" value="100" fill-placement="none"></calcite-slider>
  <br />
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="0" fill-placement="none"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="50" fill-placement="none"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="100" fill-placement="none"></calcite-slider>
  <br />
  <h2>end</h2>
  <calcite-slider min="0" max="100" value="0" fill-placement="end"></calcite-slider>
  <calcite-slider min="0" max="100" value="50" fill-placement="end"></calcite-slider>
  <calcite-slider min="0" max="100" value="100" fill-placement="end"></calcite-slider>
  <br />
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="0" fill-placement="end"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="50" fill-placement="end"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="100" fill-placement="end"></calcite-slider>

  <h1>range</h1>

  <h2>start (default)</h2>
  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="start"></calcite-slider>
  <calcite-slider min="0" max="100" min-value=25" max-value="75" fill-placement="start"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="start"></calcite-slider>
  <br />
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="0" max-value="25" fill-placement="start"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value=25" max-value="75"  fill-placement="start"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="75" max-value="100" fill-placement="start"></calcite-slider>
  <br />
  <h2>none</h2>
  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="none"></calcite-slider>
  <calcite-slider min="0" max="100" min-value=25" max-value="75"  fill-placement="none"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="none"></calcite-slider>
  <br />
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="0" max-value="25" fill-placement="none"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value=25" max-value="75"  fill-placement="none"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="75" max-value="100" fill-placement="none"></calcite-slider>
  <br />
  <h2>end</h2>
  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="end"></calcite-slider>
  <calcite-slider min="0" max="100" min-value=25" max-value="75"  fill-placement="end"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="end"></calcite-slider>
  <br />
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="0" max-value="25" fill-placement="end"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value=25" max-value="75"  fill-placement="end"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="75" max-value="100" fill-placement="end"></calcite-slider>
`,customLabelsAndTicks=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <label>Label formatter (single value)</label>
  <calcite-slider
    id="singleFormattedLabelSlider"
    label-handles
    label-ticks
    ticks="100"
    min="0"
    max="100"
    value="50"
    step="1"
    min-label="Temperature"
  ></calcite-slider>

  <label>Label formatter (min/max value)</label>
  <calcite-slider
    id="minMaxFormattedLabelSlider"
    label-handles
    label-ticks
    ticks="10"
    min="0"
    max="100"
    min-value="25"
    max-value="75"
    step="1"
    min-label="Temperature"
  ></calcite-slider>

  <script>
    const singleValueSlider = document.getElementById("singleFormattedLabelSlider");

    singleValueSlider.labelFormatter = function (value, type) {
      if (type === "value") {
        return value < 60 ? "🥶" : value > 80 ? "🥵" : "😎";
      }

      if (type === "tick") {
        return value === singleValueSlider.min ? "Cold" : value === singleValueSlider.max ? "Hot" : undefined;
      }
    };

    const minMaxValueSlider = document.getElementById("minMaxFormattedLabelSlider");

    minMaxValueSlider.labelFormatter = function (value, type) {
      if (type === "min" || type === "max") {
        const status = value < 60 ? "🥶" : value > 80 ? "🥵" : "😎";
        return type === "min" ? value + "ºF" + " " + status : status + " " + value + "ºF";
      }

      if (type === "tick") {
        return value === minMaxValueSlider.max ? value + "ºF" : value + "º";
      }
    };
  </script>
`;customLabelsAndTicks.parameters={chromatic:{delay:500}},simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: SliderStoryArgs): string => html`\n  <calcite-slider\n    min="${args.min}"\n    max="${args.max}"\n    value="${args.value}"\n    step="${args.step}"\n    min-label="${args.minLabel}"\n    ${boolean("disabled", args.disabled)}\n    ${boolean("label-handles", args.labelHandles)}\n    ${boolean("label-ticks", args.labelTicks)}\n    ticks="${args.ticks}"\n    page-step="${args.pageStep}"\n    ${boolean("precise", args.precise)}\n    ${boolean("mirrored", args.mirrored)}\n    ${boolean("snap", args.snap)}\n    scale="${args.scale}"\n  ></calcite-slider>\n`',...simple.parameters?.docs?.source}}},range.parameters={...range.parameters,docs:{...range.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-slider\n    min="0"\n    min-label="Temperature, lower bound"\n    min-value="25"\n    max="100"\n    max-label="Temperature, upper bound"\n    max-value="75"\n    step="1"\n    ticks="20"\n    snap\n    scale="m"\n  ></calcite-slider>\n`',...range.parameters?.docs?.source}}},darkModeMirroredRange_TestOnly.parameters={...darkModeMirroredRange_TestOnly.parameters,docs:{...darkModeMirroredRange_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-slider\n    class="calcite-mode-dark"\n    mirrored\n    min="0"\n    min-label="Temperature, lower bound"\n    min-value="25"\n    max="100"\n    max-label="Temperature, upper bound"\n    max-value="75"\n    step="1"\n    label-handles\n    label-ticks\n    ticks="20"\n    precise\n    snap\n    scale="m"\n  ></calcite-slider>\n`',...darkModeMirroredRange_TestOnly.parameters?.docs?.source}}},rangeLabeledTicks_TestOnly.parameters={...rangeLabeledTicks_TestOnly.parameters,docs:{...rangeLabeledTicks_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-slider\n    min="5"\n    min-label="Temperature, lower bound"\n    min-value="95"\n    max="100"\n    max-label="Temperature, upper bound"\n    max-value="100"\n    step="10"\n    label-handles\n    label-ticks\n    snap\n  ></calcite-slider>\n`',...rangeLabeledTicks_TestOnly.parameters?.docs?.source}}},rangeLabeledTicksOverlappingAtMax_TestOnly.parameters={...rangeLabeledTicksOverlappingAtMax_TestOnly.parameters,docs:{...rangeLabeledTicksOverlappingAtMax_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-slider\n    min="5"\n    min-label="Temperature, lower bound"\n    min-value="100"\n    max="100"\n    max-label="Temperature, upper bound"\n    max-value="100"\n    step="10"\n    label-handles\n    label-ticks\n    snap\n  ></calcite-slider>\n`',...rangeLabeledTicksOverlappingAtMax_TestOnly.parameters?.docs?.source}}},rangeLabeledTicksOverlappingAtMin_TestOnly.parameters={...rangeLabeledTicksOverlappingAtMin_TestOnly.parameters,docs:{...rangeLabeledTicksOverlappingAtMin_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-slider\n    min="5"\n    min-label="Temperature, lower bound"\n    min-value="5"\n    max="100"\n    max-label="Temperature, upper bound"\n    max-value="5"\n    step="10"\n    label-handles\n    label-ticks\n    snap\n  ></calcite-slider>\n`',...rangeLabeledTicksOverlappingAtMin_TestOnly.parameters?.docs?.source}}},rangeLabeledTicksEdgePositioningAtMax_TestOnly.parameters={...rangeLabeledTicksEdgePositioningAtMax_TestOnly.parameters,docs:{...rangeLabeledTicksEdgePositioningAtMax_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-slider\n    min="5"\n    min-label="Temperature, lower bound"\n    min-value="99.5"\n    max="100"\n    max-label="Temperature, upper bound"\n    max-value="100"\n    step="10"\n    label-handles\n    label-ticks\n    snap\n  ></calcite-slider>\n`',...rangeLabeledTicksEdgePositioningAtMax_TestOnly.parameters?.docs?.source}}},rangeLabeledTicksEdgePositioningAtMin_TestOnly.parameters={...rangeLabeledTicksEdgePositioningAtMin_TestOnly.parameters,docs:{...rangeLabeledTicksEdgePositioningAtMin_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-slider\n    min="5"\n    min-label="Temperature, lower bound"\n    min-value="5"\n    max="100"\n    max-label="Temperature, upper bound"\n    max-value="5.5"\n    step="10"\n    label-handles\n    label-ticks\n    snap\n  ></calcite-slider>\n`',...rangeLabeledTicksEdgePositioningAtMin_TestOnly.parameters?.docs?.source}}},Histogram.parameters={...Histogram.parameters,docs:{...Histogram.parameters?.docs,source:{originalSource:'(): HTMLCalciteSliderElement => {\n  const slider = (document.createElement("calcite-slider") as HTMLCalciteSliderElement);\n  slider.min = -100;\n  slider.minValue = -33.32;\n  slider.max = 100;\n  slider.maxValue = 30.87;\n  slider.histogram = ([[-90, 0], [-60, 12], [-20, 25], [20, 55], [60, 10], [90, 0]] as any);\n  slider.ticks = 10;\n  slider.scale = "m";\n  slider.style.minWidth = "60vw";\n  return slider;\n}',...Histogram.parameters?.docs?.source}}},HistogramWithColors.parameters={...HistogramWithColors.parameters,docs:{...HistogramWithColors.parameters?.docs,source:{originalSource:'(): HTMLCalciteSliderElement => {\n  const slider = (document.createElement("calcite-slider") as HTMLCalciteSliderElement);\n  slider.min = 0;\n  slider.minValue = 35;\n  slider.max = 100;\n  slider.maxValue = 55;\n  slider.histogram = ([[0, 0], [20, 12], [40, 25], [60, 55], [80, 10], [100, 0]] as any);\n  slider.style.minWidth = "60vw";\n  const colors = ["red", "green", "blue"];\n  const offsets = colors.map((_, i) => `${1 / (colors.length - 1) * i}`);\n  slider.histogramStops = colors.map((color, i) => ({\n    offset: parseFloat(offsets[i]),\n    color\n  }));\n  slider.scale = "m";\n  return slider;\n}',...HistogramWithColors.parameters?.docs?.source}}},darkModeHistogramRTL_TestOnly.parameters={...darkModeHistogramRTL_TestOnly.parameters,docs:{...darkModeHistogramRTL_TestOnly.parameters?.docs,source:{originalSource:'(): HTMLCalciteSliderElement => {\n  const slider = (document.createElement("calcite-slider") as HTMLCalciteSliderElement);\n  slider.min = 0;\n  slider.minValue = 25;\n  slider.max = 100;\n  slider.maxValue = 75;\n  slider.histogram = [[0, 0], [20, 12], [40, 25], [60, 55], [80, 10], [100, 0]];\n  slider.ticks = 10;\n  slider.scale = "m";\n  slider.style.minWidth = "60vw";\n  slider.className = "calcite-mode-dark";\n  return slider;\n}',...darkModeHistogramRTL_TestOnly.parameters?.docs?.source}}},disabled_TestOnly.parameters={...disabled_TestOnly.parameters,docs:{...disabled_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-slider disabled value="5"></calcite-slider>`',...disabled_TestOnly.parameters?.docs?.source}}},wordBreakDoesNotAffectLabels_TestOnly.parameters={...wordBreakDoesNotAffectLabels_TestOnly.parameters,docs:{...wordBreakDoesNotAffectLabels_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-slider\n    min="-100"\n    max="100"\n    min-value="-100"\n    max-value="100"\n    step="10"\n    ticks="10"\n    label-handles\n    label-ticks\n    style="word-break: break-all"\n  ></calcite-slider>`',...wordBreakDoesNotAffectLabels_TestOnly.parameters?.docs?.source}}},WithLabelHandlesAndNoValue_TestOnly.parameters={...WithLabelHandlesAndNoValue_TestOnly.parameters,docs:{...WithLabelHandlesAndNoValue_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-slider max="750"></calcite-slider> `',...WithLabelHandlesAndNoValue_TestOnly.parameters?.docs?.source}}},WithLargeFontSize_TestOnly.parameters={...WithLargeFontSize_TestOnly.parameters,docs:{...WithLargeFontSize_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<html lang="en">\n    <head>\n      <style>\n        html {\n          font-size: 24px;\n        }\n        calcite-label {\n          padding: 10px;\n        }\n      </style>\n    </head>\n    <body>\n      <div style="width: 400px; padding: 20px">\n        <calcite-label>\n          precise with label-handles\n          <calcite-slider scale="s" min="10" max="100" value="50" step="10" precise label-handles></calcite-slider\n        ></calcite-label>\n        <calcite-label>\n          precise with label-handles mirrored\n          <calcite-slider\n            scale="s"\n            min="10"\n            max="100"\n            value="50"\n            step="10"\n            label-handles\n            precise\n            mirrored\n          ></calcite-slider>\n        </calcite-label>\n        <calcite-label>\n          precise with label-handles & label-ticks\n          <calcite-slider\n            min="0"\n            max="100"\n            value="40"\n            step="10"\n            ticks="10"\n            scale="s"\n            label-handles\n            label-ticks\n            precise\n          ></calcite-slider>\n        </calcite-label>\n        <calcite-label>\n          precise with label-handles & label-ticks mirrored\n          <calcite-slider\n            min="0"\n            max="100"\n            value="40"\n            step="10"\n            ticks="10"\n            scale="s"\n            label-handles\n            precise\n            mirrored\n            label-ticks\n          ></calcite-slider>\n        </calcite-label>\n        <calcite-label>\n          range slider with label-handles & label-ticks\n          <calcite-slider\n            min="10"\n            max="100"\n            min-value="20"\n            max-value="90"\n            step="10"\n            min-label="Temperature range (lower)"\n            max-label="Temperature range (upper)"\n            scale="s"\n            label-handles\n            ticks="10"\n            label-ticks\n          ></calcite-slider>\n        </calcite-label>\n        <calcite-label>\n          precise range slider with label-handles & label-ticks\n          <calcite-slider\n            min="10"\n            max="100"\n            min-value="20"\n            max-value="90"\n            step="10"\n            min-label="Temperature range (lower)"\n            max-label="Temperature range (upper)"\n            scale="s"\n            label-handles\n            ticks="10"\n            precise\n            label-ticks\n          ></calcite-slider>\n        </calcite-label>\n        <calcite-label>\n          precise range slider with label-handles & label-ticks mirrored\n          <calcite-slider\n            min="10"\n            max="100"\n            min-value="20"\n            max-value="90"\n            step="10"\n            min-label="Temperature range (lower)"\n            max-label="Temperature range (upper)"\n            scale="s"\n            label-handles\n            ticks="10"\n            precise\n            label-ticks\n            mirrored\n          ></calcite-slider>\n        </calcite-label>\n      </div>\n    </body>\n  </html>`',...WithLargeFontSize_TestOnly.parameters?.docs?.source}}},maxTickRendering_TestOnly.parameters={...maxTickRendering_TestOnly.parameters,docs:{...maxTickRendering_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    calcite-slider {\n      width: 60vw;\n    }\n  </style>\n\n  <calcite-slider min="-100" max="100" ticks="1"></calcite-slider>\n  <calcite-slider min="-100" max="100" ticks="5"></calcite-slider>\n  <calcite-slider min="-100" max="100" ticks="10"></calcite-slider>\n  <calcite-slider min="-250" max="250" ticks="1"></calcite-slider>\n  <calcite-slider min="-250" max="250" ticks="5"></calcite-slider>\n  <calcite-slider min="-250" max="250" ticks="10"></calcite-slider>\n  <calcite-slider min="-500" max="500" ticks="1"></calcite-slider>\n  <calcite-slider min="-500" max="500" ticks="5"></calcite-slider>\n  <calcite-slider min="-500" max="500" ticks="10"></calcite-slider>\n  <calcite-slider min="-1000" max="1000" ticks="1"></calcite-slider>\n  <calcite-slider min="-1000" max="1000" ticks="5"></calcite-slider>\n  <calcite-slider min="-1000" max="1000" ticks="10"></calcite-slider>\n`',...maxTickRendering_TestOnly.parameters?.docs?.source}}},rendersWhenTrackRelatedPropChanges_TestOnly.parameters={...rendersWhenTrackRelatedPropChanges_TestOnly.parameters,docs:{...rendersWhenTrackRelatedPropChanges_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-slider id="example-slider" label-ticks max="32" value="24" min="16" snap step="8" ticks="8"></calcite-slider>\n  <script>\n    (async () => {\n      await customElements.whenDefined("calcite-slider");\n      const slider = await document.querySelector("calcite-slider").componentOnReady();\n      await new Promise((resolve) => requestAnimationFrame(resolve));\n\n      slider.max = 64;\n      slider.min = 48;\n      slider.step = 16;\n      slider.ticks = 16;\n      slider.value = 64;\n    })();\n  <\/script>\n`',...rendersWhenTrackRelatedPropChanges_TestOnly.parameters?.docs?.source}}},spaceGroupSeparatorNoBreak_TestOnly.parameters={...spaceGroupSeparatorNoBreak_TestOnly.parameters,docs:{...spaceGroupSeparatorNoBreak_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-slider\n    lang="ru"\n    value="1000"\n    label-handles\n    label-ticks\n    group-separator\n    max-value="100000"\n    max="10000"\n    ticks="2000"\n  ></calcite-slider>\n`',...spaceGroupSeparatorNoBreak_TestOnly.parameters?.docs?.source}}},fillPlacements.parameters={...fillPlacements.parameters,docs:{...fillPlacements.parameters?.docs,source:{originalSource:'(): string => html`\n  <h1>single</h1>\n\n  <h2>start (default)</h2>\n  <calcite-slider min="0" max="100" value="0" fill-placement="start"></calcite-slider>\n  <calcite-slider min="0" max="100" value="50" fill-placement="start"></calcite-slider>\n  <calcite-slider min="0" max="100" value="100" fill-placement="start"></calcite-slider>\n  <br />\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="0" fill-placement="start"></calcite-slider>\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="50" fill-placement="start"></calcite-slider>\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="100" fill-placement="start"></calcite-slider>\n  <br />\n  <h2>none</h2>\n  <calcite-slider min="0" max="100" value="0" fill-placement="none"></calcite-slider>\n  <calcite-slider min="0" max="100" value="50" fill-placement="none"></calcite-slider>\n  <calcite-slider min="0" max="100" value="100" fill-placement="none"></calcite-slider>\n  <br />\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="0" fill-placement="none"></calcite-slider>\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="50" fill-placement="none"></calcite-slider>\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="100" fill-placement="none"></calcite-slider>\n  <br />\n  <h2>end</h2>\n  <calcite-slider min="0" max="100" value="0" fill-placement="end"></calcite-slider>\n  <calcite-slider min="0" max="100" value="50" fill-placement="end"></calcite-slider>\n  <calcite-slider min="0" max="100" value="100" fill-placement="end"></calcite-slider>\n  <br />\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="0" fill-placement="end"></calcite-slider>\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="50" fill-placement="end"></calcite-slider>\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="100" fill-placement="end"></calcite-slider>\n\n  <h1>range</h1>\n\n  <h2>start (default)</h2>\n  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="start"></calcite-slider>\n  <calcite-slider min="0" max="100" min-value=25" max-value="75" fill-placement="start"></calcite-slider>\n  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="start"></calcite-slider>\n  <br />\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="0" max-value="25" fill-placement="start"></calcite-slider>\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value=25" max-value="75"  fill-placement="start"></calcite-slider>\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="75" max-value="100" fill-placement="start"></calcite-slider>\n  <br />\n  <h2>none</h2>\n  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="none"></calcite-slider>\n  <calcite-slider min="0" max="100" min-value=25" max-value="75"  fill-placement="none"></calcite-slider>\n  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="none"></calcite-slider>\n  <br />\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="0" max-value="25" fill-placement="none"></calcite-slider>\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value=25" max-value="75"  fill-placement="none"></calcite-slider>\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="75" max-value="100" fill-placement="none"></calcite-slider>\n  <br />\n  <h2>end</h2>\n  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="end"></calcite-slider>\n  <calcite-slider min="0" max="100" min-value=25" max-value="75"  fill-placement="end"></calcite-slider>\n  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="end"></calcite-slider>\n  <br />\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="0" max-value="25" fill-placement="end"></calcite-slider>\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value=25" max-value="75"  fill-placement="end"></calcite-slider>\n  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="75" max-value="100" fill-placement="end"></calcite-slider>\n`',...fillPlacements.parameters?.docs?.source}}},customLabelsAndTicks.parameters={...customLabelsAndTicks.parameters,docs:{...customLabelsAndTicks.parameters?.docs,source:{originalSource:'(): string => html`\n  <label>Label formatter (single value)</label>\n  <calcite-slider\n    id="singleFormattedLabelSlider"\n    label-handles\n    label-ticks\n    ticks="100"\n    min="0"\n    max="100"\n    value="50"\n    step="1"\n    min-label="Temperature"\n  ></calcite-slider>\n\n  <label>Label formatter (min/max value)</label>\n  <calcite-slider\n    id="minMaxFormattedLabelSlider"\n    label-handles\n    label-ticks\n    ticks="10"\n    min="0"\n    max="100"\n    min-value="25"\n    max-value="75"\n    step="1"\n    min-label="Temperature"\n  ></calcite-slider>\n\n  <script>\n    const singleValueSlider = document.getElementById("singleFormattedLabelSlider");\n\n    singleValueSlider.labelFormatter = function (value, type) {\n      if (type === "value") {\n        return value < 60 ? "🥶" : value > 80 ? "🥵" : "😎";\n      }\n\n      if (type === "tick") {\n        return value === singleValueSlider.min ? "Cold" : value === singleValueSlider.max ? "Hot" : undefined;\n      }\n    };\n\n    const minMaxValueSlider = document.getElementById("minMaxFormattedLabelSlider");\n\n    minMaxValueSlider.labelFormatter = function (value, type) {\n      if (type === "min" || type === "max") {\n        const status = value < 60 ? "🥶" : value > 80 ? "🥵" : "😎";\n        return type === "min" ? value + "ºF" + " " + status : status + " " + value + "ºF";\n      }\n\n      if (type === "tick") {\n        return value === minMaxValueSlider.max ? value + "ºF" : value + "º";\n      }\n    };\n  <\/script>\n`',...customLabelsAndTicks.parameters?.docs?.source}}};const __namedExportsOrder=["simple","range","darkModeMirroredRange_TestOnly","rangeLabeledTicks_TestOnly","rangeLabeledTicksOverlappingAtMax_TestOnly","rangeLabeledTicksOverlappingAtMin_TestOnly","rangeLabeledTicksEdgePositioningAtMax_TestOnly","rangeLabeledTicksEdgePositioningAtMin_TestOnly","Histogram","HistogramWithColors","darkModeHistogramRTL_TestOnly","disabled_TestOnly","wordBreakDoesNotAffectLabels_TestOnly","WithLabelHandlesAndNoValue_TestOnly","WithLargeFontSize_TestOnly","maxTickRendering_TestOnly","rendersWhenTrackRelatedPropChanges_TestOnly","spaceGroupSeparatorNoBreak_TestOnly","fillPlacements","customLabelsAndTicks"]},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-slider-slider-stories.5416c4d8.iframe.bundle.js.map