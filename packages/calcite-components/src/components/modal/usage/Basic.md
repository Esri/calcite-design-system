Customize the modal by passing your content into multiple named slots: `header` (title-area of the modal), `content` (main body of the modal), and up to three modal actions: primary, secondary, and back. Notice below we use the `aria-labelledby` attribute, relating it to the title of the modal. In order to ensure good accessibility, it's recommended that you use either an `aria-label` or `aria-labelledby` attribute so screen readers can infer what the subject matter of your modal is.

```html
<calcite-modal aria-labelledby="modal-title" open>
  <h3 slot="header" id="modal-title">Edit Profile</h3>
  <div slot="content">Please Update Your Profile Information Below:</div>
  <calcite-button slot="back" kind="neutral" appearance="outline" icon="chevron-left" width="full">
    Back
  </calcite-button>
  <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
  <calcite-button slot="primary" width="full">Save Changes</calcite-button>
</calcite-modal>
```
