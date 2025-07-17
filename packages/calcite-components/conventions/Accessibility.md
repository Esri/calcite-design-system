# Accessibility

Calcite Components leverages the [W3C Accessibility Standards](https://www.w3.org/WAI/standards-guidelines) to ensure the applications and experiences are usable by a wide range of audiences. Additional considerations in designing for individuals include:

| Designing for Individuals                  | Do                                                                                                                                                                               | Don't                                                                                                                                                                                  |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| On the Autistic Spectrum                   | <p>Use simple sentences and bullets.</p> <img src="https://user-images.githubusercontent.com/5023024/173696318-e39483e1-6a78-4318-8fb0-4b2599b288e2.svg" alt="" />               | <p>Create a wall of text.</p> <img src="https://user-images.githubusercontent.com/5023024/173696337-6d2eff4d-e9be-4537-9418-f99beb2e0294.svg" alt="" />                                |
| Who use Screen Readers                     | <p>Write descriptive links & headings.</p> <img src="https://user-images.githubusercontent.com/5023024/173841832-cd01b9cb-23e7-4770-8e39-74d9562002b0.svg" alt="" />             | <p>Write vague links & headings.</p> <img src="https://user-images.githubusercontent.com/5023024/173696336-6eafc9dc-c55e-4e3f-9e08-0df30d13e50e.svg" alt="" />                         |
| <p>Who have low vision</p>                 | <p>Use a combination of color, shapes & text.</p> <img src="https://user-images.githubusercontent.com/5023024/173696330-9c3ea753-9aec-4768-bb34-4b8eea233442.svg" alt="" />      | <p>Use only color to convey meaning or status.</p> <img src="https://user-images.githubusercontent.com/5023024/173696322-e5fb7e87-a026-4cb9-97d7-4ce5fde58b5e.svg" alt="" />           |
| <p>With physical or motor difficulties</p> | <p>Make large clickable actions.</p> <img src="https://user-images.githubusercontent.com/5023024/173696323-11baf649-ec6d-499a-8e8a-cb1ffa74fc63.svg" alt="" />                   | <p>Demand precision.</p> <img src="https://user-images.githubusercontent.com/5023024/173696324-ca314eff-44a6-4327-ab2e-5d2ec215b1b8.svg" alt="" />                                     |
| <p>Who are deaf or hard of hearing</p>     | <p>Use subtitles or provide transcripts for video.</p> <img src="https://user-images.githubusercontent.com/5023024/173696320-c06c6999-2397-4390-a1f1-e4929510de90.svg" alt="" /> | <p>Put content in audio or video formats only.</p> <img src="https://user-images.githubusercontent.com/5023024/173696314-00c0911d-0acc-473d-a527-65b61f0d2101.svg" alt="" />           |
| <p>With Dyslexia</p>                       | <p>Provide reminders & prompts.</p> <img src="https://user-images.githubusercontent.com/5023024/173696328-767d2cc3-2635-449b-9159-1cea1dcdcc14.svg" alt="" />                    | <p>Force people to remember things from previous places.</p> <img src="https://user-images.githubusercontent.com/5023024/173696321-6655f279-71c0-4a8d-836f-5f429721e64a.svg" alt="" /> |

## Checklist

### Content

- [ ] Information should not depend on color, sound, shape, size, or visual location ==design==
- [ ] Text and background color should have sufficient contrast ==design==
- [ ] Links should be descriptive and provide intent ==design==
- [ ] Links should be visually identifiable ==design==
- [ ] Use descriptive section headings ==design==
- [ ] Content should use semantic HTML elements ==development==
- [ ] HTML should be valid and error-free ==development==
- [ ] Forms have descriptive labels ==design==
- [ ] Forms have helpful and accessible error and verification messages ==design==
- [ ] Labels and help text should be programmatically associated with form fields ==development==
- [ ] Use correct HTML5 input types ==development==
- [ ] Content does not loose context when zoomed/enlarged ==development==
- [ ] Site should not time out unexpectedly ==design==, ==development==
- [ ] Pages are understandable with no styles enabled ==development==
- [ ] Web page size should not exceed 500k ==development==

### Keyboard & assistive technology

- [ ] Users should be able to navigate content using a screen reader ==design==, ==development==
- [ ] Avoid mouse only interactions ==design==, ==development==
- [ ] Support keyboard navigation ==development==
- [ ] Focus states should be visible for keyboard users ==design==, ==development==
- [ ] Allow keyboard users to skip navigation ==development==
- [ ] Offer multiple ways to find pages on your website ==design==
- [ ] Use ARIA landmarks where applicable ==development==
- [ ] Set focus on modals, popovers, alerts, etc. ==development==

### Multimedia & data visualization

- [ ] Images should have meaningful alternative text or intentionally marked decorative ==design==, ==development==
- [ ] Decorative images should not be visible to screen readers ==development==
- [ ] Content that moves automatically has the ability to be paused ==design==, ==development==
- [ ] Limit or remove any flashing elements ==design==
- [ ] Ensure audio and video is not played automatically unless that is the expected behavior ==development==
- [ ] Multimedia should have alternative ways to be consumed ==design==, ==development==
- [ ] Make data available for graphs, charts, maps, SVGs, etc. through assistive technology ==design==, ==development==
- [ ] Table data is accessible to non-sighted users ==development==

### Renderring SVG elements within components

SVGs are visual elements. When rendering them in a component, assess if the SVG has semantic meaning that needs to be described.

If the SVG has no semantic meaning or the semantic meaning is described elsewhere, make sure to set `aria-hidden="true"` on it so that screen readers can ignore it.

If the SVG has some semantic meaning that needs to be described to an end user, set the role to `img` and ensure that it has an `aria-label` or `aria-lablledby`.

More information can be found here: <https://www.deque.com/blog/creating-accessible-svgs/>
