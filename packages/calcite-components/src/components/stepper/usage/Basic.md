```html
<calcite-stepper icon numbered id="my-example-stepper">
  <calcite-stepper-item heading="Choose Group" description="Select a group to make changes" complete>
    <calcite-notice width="full" open>
      <div slot="title">
        In this step, choose a group from the list to make changes. Make sure to select the right one for your updates.
      </div>
    </calcite-notice>
  </calcite-stepper-item>
  <calcite-stepper-item heading="Compile Member List" description="Add or remove members from the list" complete>
    <calcite-notice width="full" open>
      <div slot="title">
        Now, compile the member list. Add or remove members as needed. Ensure the list is accurate before proceeding to
        the next step.
      </div>
    </calcite-notice>
  </calcite-stepper-item>
  <calcite-stepper-item heading="Set Member Properties" description="Specify properties for each member" selected>
    <calcite-notice width="full" open>
      <div slot="title">
        In this step, set individual properties for each member. Customize their details to meet your requirements.
      </div>
    </calcite-notice>
  </calcite-stepper-item>
  <calcite-stepper-item heading="Confirm and Complete" description="Review and finalize your changes" disabled>
    <calcite-notice width="full" open>
      <div slot="title">
        Review the changes you've made in the previous steps. Once confirmed, proceed to complete the process. This step
        is currently disabled.
      </div>
    </calcite-notice>
  </calcite-stepper-item>
</calcite-stepper>
```
