import { storiesOf } from "@storybook/html";
import { withKnobs, text } from "@storybook/addon-knobs";
import { darkBackground, parseReadme, boolean } from "../../../.storybook/helpers";
import readme from "./readme.md";
import videoMp4 from "../../assets/demo/video/sintel-short.mp4";
import videoWebm from "../../assets/demo/video/sintel-short.webm";
import subtitlesEn from "!file-loader?modules!./../../assets/demo/subtitles/vtt/sintel-en.vtt";
import subtitlesDe from "!file-loader?modules!./../../assets/demo/subtitles/vtt/sintel-de.vtt";
import subtitlesEs from "!file-loader?modules!./../../assets/demo/subtitles/vtt/sintel-es.vtt";

const notes = parseReadme(readme);

storiesOf("Video", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <div style="width:400px">
    <calcite-video
    ${boolean("disable-scrubbing", false)}
    ${boolean("disable-scrubbing", false)}
    ${boolean("disable-timestamp", false)}
    ${boolean("disable-progress", false)}
    ${boolean("disable-controls", false)}
    ${boolean("play-on-hover", false)}
    ${boolean("show-controls-on-hover", false)}
    ${boolean("loop", false)}
    ${boolean("autoplay", false)}
    ${boolean("muted", false)}
    >
    <source src=${videoMp4}>
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
    ${boolean("disable-scrubbing", false)}
    ${boolean("disable-scrubbing", false)}
    ${boolean("disable-timestamp", false)}
    ${boolean("disable-progress", false)}
    ${boolean("disable-controls", false)}
    ${boolean("play-on-hover", false)}
    ${boolean("show-controls-on-hover", false)}
    ${boolean("loop", false)}
    ${boolean("autoplay", false)}
    ${boolean("muted", false)}
    >
    <source src=${videoMp4}>
    <track label="English" kind="subtitles" srclang="en" src=${subtitlesEn} default>
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
    ${boolean("disable-scrubbing", false)}
    ${boolean("disable-scrubbing", false)}
    ${boolean("disable-timestamp", false)}
    ${boolean("disable-progress", false)}
    ${boolean("disable-controls", false)}
    ${boolean("play-on-hover", false)}
    ${boolean("show-controls-on-hover", false)}
    ${boolean("loop", false)}
    ${boolean("autoplay", false)}
    ${boolean("muted", false)}
    >
    <source src=${videoMp4}>
    <source src=${videoWebm}>
    <track label="English" kind="subtitles" srclang="en" src=${subtitlesEn} default>
    <track label="Deutsch" kind="subtitles" srclang="de" src=${subtitlesDe}>
    <track label="Español" kind="subtitles" srclang="es" src=${subtitlesEs}>
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
    intl-play="${text("intl-play", "play")}"
    intl-pause="${text("intl-pause", "pause")}"
    intl-restart="${text("intl-restart", "restart")}"
    intl-enter-fullscreen="${text("intl-enter-fullscreen", "enter fullscreen")}"
    intl-exit-fullscreen="${text("intl-exit-fullscreen", "exit fullscreen")}"
    intl-mute="${text("intl-mute", "mute")}"
    intl-unmute="${text("intl-unmute", "unmute")}"
    intl-subtitles="${text("intl-subtitles", "subtitles")}"
    ${boolean("disable-scrubbing", false)}
    ${boolean("disable-scrubbing", false)}
    ${boolean("disable-timestamp", false)}
    ${boolean("disable-progress", false)}
    ${boolean("disable-controls", false)}
    ${boolean("play-on-hover", false)}
    ${boolean("show-controls-on-hover", false)}
    ${boolean("loop", false)}
    ${boolean("autoplay", false)}
    ${boolean("muted", false)}
    >
    <source src=${videoMp4}>
    <source src=${videoWebm}>
    <track label="English" kind="subtitles" srclang="en" src=${subtitlesEn} default>
    <track label="Deutsch" kind="subtitles" srclang="de" src=${subtitlesDe}>
    <track label="Español" kind="subtitles" srclang="es" src=${subtitlesEs}>
    </calcite-video>
    </div>
  `,
    { notes }
  )
  .add(
    "Streaming (video from URL)",
    () => `
    <div style="width:400px">
    <calcite-video
    ${boolean("disable-scrubbing", false)}
    ${boolean("disable-scrubbing", false)}
    ${boolean("disable-timestamp", false)}
    ${boolean("disable-progress", false)}
    ${boolean("disable-controls", false)}
    ${boolean("play-on-hover", false)}
    ${boolean("show-controls-on-hover", false)}
    ${boolean("loop", false)}
    ${boolean("autoplay", false)}
    ${boolean("muted", false)}
    >
    <source src="${text(
      "source src",
      "https://archive.org/download/untvmi-Family_Strings_-_Billy_Strings_and_Terry_Barber_-_LIVE_2_28_2020/Family_Strings_-_Billy_Strings_and_Terry_Barber_-_LIVE_2_28_2020.mp4"
    )}"
    />
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
    ${boolean("disable-scrubbing", false)}
    ${boolean("disable-scrubbing", false)}
    ${boolean("disable-timestamp", false)}
    ${boolean("disable-progress", false)}
    ${boolean("disable-controls", false)}
    ${boolean("play-on-hover", false)}
    ${boolean("show-controls-on-hover", false)}
    ${boolean("loop", false)}
    ${boolean("autoplay", false)}
    ${boolean("muted", false)}
    >
    <source src=${videoMp4}>
    <source src=${videoWebm}>
    <track label="English" kind="subtitles" srclang="en" src=${subtitlesEn} default>
    <track label="Deutsch" kind="subtitles" srclang="de" src=${subtitlesDe}>
    <track label="Español" kind="subtitles" srclang="es" src=${subtitlesEs}>
    </calcite-video>
    </div>
  `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "RTL",
    () => `
    <div style="width:400px" dir="rtl">
    <calcite-video
    ${boolean("disable-scrubbing", false)}
    ${boolean("disable-scrubbing", false)}
    ${boolean("disable-timestamp", false)}
    ${boolean("disable-progress", false)}
    ${boolean("disable-controls", false)}
    ${boolean("play-on-hover", false)}
    ${boolean("show-controls-on-hover", false)}
    ${boolean("loop", false)}
    ${boolean("autoplay", false)}
    ${boolean("muted", false)}
    >
    <source src=${videoMp4}>
    <source src=${videoWebm}>
    <track label="English" kind="subtitles" srclang="en" src=${subtitlesEn} default>
    <track label="Deutsch" kind="subtitles" srclang="de" src=${subtitlesDe}>
    <track label="Español" kind="subtitles" srclang="es" src=${subtitlesEs}>
    </calcite-video>
    </div>
  `,
    { notes }
  );
