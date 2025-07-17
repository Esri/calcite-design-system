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

<fieldset style="padding:3rem">
    <legend># Checklist</legend>

## Content

<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="1" id="1">
    <label style="margin-left: 1rem" for="1">Information should not depend on color, sound, shape, size, or visual location
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="2" id="2">
    <label style="margin-left: 1rem" for="2">Text and background color should have sufficient contrast
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="3" id="3">
    <label style="margin-left: 1rem" for="3">Links should be descriptive and provide intent
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="4" id="4">
    <label style="margin-left: 1rem" for="4">Links should be visually identifiable
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="5" id="5">
    <label style="margin-left: 1rem" for="5">Use descriptive section headings
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="6" id="6">
    <label style="margin-left: 1rem" for="6">Content should use semantic HTML elements
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="7" id="7">
    <label style="margin-left: 1rem" for="7">HTML should be valid and error-free
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="8" id="8">
    <label style="margin-left: 1rem" for="8">Forms have descriptive labels
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="9" id="9">
    <label style="margin-left: 1rem" for="9">Forms have helpful and accessible error and verification messages
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="10" id="10">
    <label style="margin-left: 1rem" for="10">Labels and help text should be programmatically associated with form fields
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="11" id="11">
    <label style="margin-left: 1rem" for="11">Use correct HTML5 input types
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="12" id="12">
    <label style="margin-left: 1rem" for="12">Content does not loose context when zoomed/enlarged
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="13" id="13">
    <label style="margin-left: 1rem" for="13">Site should not time out unexpectedly
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="14" id="14">
    <label style="margin-left: 1rem" for="14">Pages are understandable with no styles enabled
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="15" id="15">
    <label style="margin-left: 1rem" for="15">Web page size should not exceed 500k
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>

## Keyboard & Assistive Tech

<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="16" id="16">
    <label style="margin-left: 1rem" for="16">Users should be able to navigate content using a screen reader
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="17" id="17">
    <label style="margin-left: 1rem" for="17">Avoid mouse only interactions
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="18" id="18">
    <label style="margin-left: 1rem" for="18">Support keyboard navigation
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="19" id="19">
    <label style="margin-left: 1rem" for="19">Focus states should be visible for keyboard users
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="20" id="20">
    <label style="margin-left: 1rem" for="20">Allow keyboard users to skip navigation
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="21" id="21">
    <label style="margin-left: 1rem" for="21">Offer multiple ways to find pages on your website
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="22" id="22">
    <label style="margin-left: 1rem" for="22">Use ARIA landmarks where applicable
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="23" id="23">
    <label style="margin-left: 1rem" for="23">Set focus on modals, popovers, alerts, etc.
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>

## Multimedia & Data Viz

<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="25" id="25">
    <label style="margin-left: 1rem" for="25">Images should have meaningful alternative text or intentionally marked decorative
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="26" id="26">
    <label style="margin-left: 1rem" for="26">Decorative images should not be visible to screen readers
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="27" id="27">
    <label style="margin-left: 1rem" for="27">Content that moves automatically has the ability to be paused
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="28" id="28">
    <label style="margin-left: 1rem" for="28">Limit or remove any flashing elements
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="29" id="29">
    <label style="margin-left: 1rem" for="29">Ensure audio and video is not played automatically unless that is the expected behavior
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="30" id="30">
    <label style="margin-left: 1rem" for="30">Multimedia should have alternative ways to be consumed
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="31" id="31">
    <label style="margin-left: 1rem" for="31">Make data available for graphs, charts, maps, SVGs, etc. through assistive technology
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" icon="palette" scale="s">Design</calcite-chip>
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>
<div class="check-div" style="padding: 1rem">
    <input type="checkbox" name="32" id="32">
    <label style="margin-left: 1rem" for="32">Table data is accessible to non-sighted users
    <calcite-chip style="margin-right: 0.5rem" style="margin-right: 0.5rem" appearance="solid" kind="neutral" icon="code" scale="s">Development</calcite-chip>
    </label>
</div>

</fieldset>

## Renderring SVG elements within components

SVGs are visual elements. When rendering them in a component, assess if the SVG has semantic meaning that needs to be described.

If the SVG has no semantic meaning or the semantic meaning is described elsewhere, make sure to set `aria-hidden="true"` on it so that screen readers can ignore it.

If the SVG has some semantic meaning that needs to be described to an end user, set the role to `img` and ensure that it has an `aria-label` or `aria-lablledby`.

More information can be found here: <https://www.deque.com/blog/creating-accessible-svgs/>
