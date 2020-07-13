import { storiesOf } from "@storybook/html";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Video", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <div style="width:400px">
    <calcite-video
    disable-scrubbing="${boolean("disable-scrubbing", false)}"
    disable-fullscreen="${boolean("disable-scrubbing", false)}"
    disable-timestamp="${boolean("disable-timestamp", false)}"
    disable-progress="${boolean("disable-progress", false)}"
    disable-controls="${boolean("disable-controls", false)}"
    play-on-hover="${boolean("play-on-hover", false)}"
    show-controls-on-hover="${boolean("show-controls-on-hover", false)}"
    loop="${boolean("loop", false)}"
    autoplay="${boolean("autoplay", false)}"
    muted="${boolean("muted", false)}"
    >
    <source src="../../assets/demo/video/sintel-short.mp4" type="video/mp4">
    </calcite-video>
    </div>
  `,
    { notes }
  )
  .add(
    "With Single Subtitle",
    () => `
    <div style="width:400px">
    <calcite-video
    disable-scrubbing="${boolean("disable-scrubbing", false)}"
    disable-fullscreen="${boolean("disable-scrubbing", false)}"
    disable-timestamp="${boolean("disable-timestamp", false)}"
    disable-progress="${boolean("disable-progress", false)}"
    disable-controls="${boolean("disable-controls", false)}"
    play-on-hover="${boolean("play-on-hover", false)}"
    show-controls-on-hover="${boolean("show-controls-on-hover", false)}"
    loop="${boolean("loop", false)}"
    autoplay="${boolean("autoplay", false)}"
    muted="${boolean("muted", false)}"
    >
    <source src="../../assets/demo/video/sintel-short.mp4" type="video/mp4">
    <track label="English" kind="subtitles" srclang="en" src="../../assets/demo/subtitles/vtt/sintel-en.vtt" default>
    </calcite-video>
    </div>
  `,
    { notes }
  )
  .add(
    "With Multiple Subtitle",
    () => `
    <div style="width:400px">
    <calcite-video
    disable-scrubbing="${boolean("disable-scrubbing", false)}"
    disable-fullscreen="${boolean("disable-scrubbing", false)}"
    disable-timestamp="${boolean("disable-timestamp", false)}"
    disable-progress="${boolean("disable-progress", false)}"
    disable-controls="${boolean("disable-controls", false)}"
    play-on-hover="${boolean("play-on-hover", false)}"
    show-controls-on-hover="${boolean("show-controls-on-hover", false)}"
    loop="${boolean("loop", false)}"
    autoplay="${boolean("autoplay", false)}"
    muted="${boolean("muted", false)}"
    >
    <source src="../../assets/demo/video/sintel-short.mp4" type="video/mp4">
    <source src="../../assets/demo/video/sintel-short.webm" type="video/webm">
    <track label="English" kind="subtitles" srclang="en" src="../../assets/demo/subtitles/vtt/sintel-en.vtt" default>
    <track label="Deutsch" kind="subtitles" srclang="de" src="../../assets/demo/subtitles/vtt/sintel-de.vtt">
    <track label="Español" kind="subtitles" srclang="es" src="../../assets/demo/subtitles/vtt/sintel-es.vtt">
    </calcite-video>
    </div>
  `,
    { notes }
  )
  .add(
    "Custom intl strings",
    () => `
    <div style="width:400px">
    <calcite-video
    disable-scrubbing="${boolean("disable-scrubbing", false)}"
    disable-fullscreen="${boolean("disable-scrubbing", false)}"
    disable-timestamp="${boolean("disable-timestamp", false)}"
    disable-progress="${boolean("disable-progress", false)}"
    disable-controls="${boolean("disable-controls", false)}"
    play-on-hover="${boolean("play-on-hover", false)}"
    show-controls-on-hover="${boolean("show-controls-on-hover", false)}"
    intl-play="${text("intl-play", "play")}"
    intl-pause="${text("intl-pause", "pause")}"
    intl-restart="${text("intl-restart", "restart")}"
    intl-enter-fullscreen="${text("intl-enter-fullscreen", "enter fullscreen")}"
    intl-exit-fullscreen="${text("intl-exit-fullscreen", "exit fullscreen")}"
    intl-mute="${text("intl-mute", "mute")}"
    intl-unmute="${text("intl-unmute", "unmute")}"
    intl-subtitles="${text("intl-subtitles", "subtitles")}"
    loop="${boolean("loop", false)}"
    autoplay="${boolean("autoplay", false)}"
    muted="${boolean("muted", false)}"
    >
    <source src="../../assets/demo/video/sintel-short.mp4" type="video/mp4">
    <source src="../../assets/demo/video/sintel-short.webm" type="video/webm">
    <track label="English" kind="subtitles" srclang="en" src="../../assets/demo/subtitles/vtt/sintel-en.vtt" default>
    <track label="Deutsch" kind="subtitles" srclang="de" src="../../assets/demo/subtitles/vtt/sintel-de.vtt">
    <track label="Español" kind="subtitles" srclang="es" src="../../assets/demo/subtitles/vtt/sintel-es.vtt">
    </calcite-video>
    </div>
  `,
    { notes }
  )

  .add(
    "Dark theme",
    () => `
    <div style="width:400px">
    <calcite-video
    theme="dark"
    disable-scrubbing="${boolean("disable-scrubbing", false)}"
    disable-fullscreen="${boolean("disable-scrubbing", false)}"
    disable-timestamp="${boolean("disable-timestamp", false)}"
    disable-progress="${boolean("disable-progress", false)}"
    disable-controls="${boolean("disable-controls", false)}"
    play-on-hover="${boolean("play-on-hover", false)}"
    show-controls-on-hover="${boolean("show-controls-on-hover", false)}"
    loop="${boolean("loop", false)}"
    autoplay="${boolean("autoplay", false)}"
    muted="${boolean("muted", false)}"
    src="${text(
      "src",
      "https://archive.org/download/untvmi-Family_Strings_-_Billy_Strings_and_Terry_Barber_-_LIVE_2_28_2020/Family_Strings_-_Billy_Strings_and_Terry_Barber_-_LIVE_2_28_2020.mp4"
    )}"
    ></calcite-video>
    </div>
  `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "RTL",
    () => `
    <div style="width:400px" dir="rtl">
    <calcite-video
    disable-scrubbing="${boolean("disable-scrubbing", false)}"
    disable-fullscreen="${boolean("disable-scrubbing", false)}"
    disable-timestamp="${boolean("disable-timestamp", false)}"
    disable-progress="${boolean("disable-progress", false)}"
    disable-controls="${boolean("disable-controls", false)}"
    play-on-hover="${boolean("play-on-hover", false)}"
    show-controls-on-hover="${boolean("show-controls-on-hover", false)}"
    loop="${boolean("loop", false)}"
    autoplay="${boolean("autoplay", false)}"
    muted="${boolean("muted", false)}"
    src="${text(
      "src",
      "https://archive.org/download/untvmi-Family_Strings_-_Billy_Strings_and_Terry_Barber_-_LIVE_2_28_2020/Family_Strings_-_Billy_Strings_and_Terry_Barber_-_LIVE_2_28_2020.mp4"
    )}"
    ></calcite-video>
    </div>
  `,
    { notes }
  );
