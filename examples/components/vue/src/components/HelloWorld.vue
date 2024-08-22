<script>
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-date-picker";
import "@esri/calcite-components/dist/components/calcite-icon";

/**
 * This is a workaround for listening to custom events
 * that contain capital letters.  Adapted from:
 * https://github.com/vuejs/core/issues/5401#issuecomment-1041214293
 */
const eventDirective = {
  beforeMount(el, { arg, value }) {
    console.log(arg); // casing is preserved, check console
    el.addEventListener(arg, value);
  },
  beforeUnmount(el, { arg, value }) {
    el.removeEventListener(arg, value);
  },
};

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    datePickerRangeChangeHandler(event) {
      console.log("datePickerRangeChangeHandler", event.target.value);
    },
  },
  directives: {
    event: eventDirective,
  },
};
</script>

<style src="@esri/calcite-components/dist/calcite/calcite.css"></style>

<template>
  <div class="hello">
    <h1>{{ msg }} <calcite-icon icon="banana"></calcite-icon></h1>
    <calcite-date-picker
      range
      v-event:calciteDatePickerRangeChange="datePickerRangeChangeHandler"
    ></calcite-date-picker>
    <calcite-button>Button</calcite-button>
  </div>
</template>
