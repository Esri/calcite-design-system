import { j as e, M as o, c as s } from "./blocks.js";
import { useMDXComponents as a } from "./index3.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const r = `# Design Quick Start Guide

<details>
    <summary>Table of Contents</summary>

- [Design Quick Start Guide](#design-quick-start-guide)
  - [1. Color](#1-color)
    - [Color contrast](#color-contrast)
    - [Color and state](#color-and-state)
    - [Who does color help?](#who-does-color-help)
    - [Color resources](#color-resources)
    - [WCAG Success Criteria for Color](#wcag-success-criteria-for-color)
  - [2. Typography](#2-typography)
    - [Text styling](#text-styling)
    - [Text resizing](#text-resizing)
    - [Who does typography help?](#who-does-typography-help)
    - [Typography resources](#typography-resources)
  - [3. Information hierarchy](#3-information-hierarchy)
    - [Semantic structure](#semantic-structure)
    - [Headings](#headings)
    - [Links](#links)
    - [Navigation](#navigation)
    - [Focus order](#focus-order)
    - [Who does information hierarchy help?](#who-does-information-hierarchy-help)
    - [Information hierarchy resources](#information-hierarchy-resources)
    - [WCAG Success Criteria for Information hierarchy](#wcag-success-criteria-for-information-hierarchy)
  - [4. Forms](#4-forms)
    - [Labels](#labels)
    - [Grouping controls](#grouping-controls)
    - [Form fields](#form-fields)
    - [Buttons](#buttons)
      - [Disabled buttons](#disabled-buttons)
    - [User notifications](#user-notifications)
    - [Touch zones](#touch-zones)
    - [Who does form accessibility help?](#who-does-form-accessibility-help)
    - [WCAG Success Criteria for Forms](#wcag-success-criteria-for-forms)
  - [5. Images](#5-images)
    - [Background images](#background-images)
    - [Icons](#icons)
    - [Who does image accessibility help?](#who-does-image-accessibility-help)
    - [WCAG Success Criteria for Images](#wcag-success-criteria-for-images)
  - [6. Animation](#6-animation)
    - [Who does animation help?](#who-does-animation-help)
    - [WCAG Success Criteria for Animation](#wcag-success-criteria-for-animation)
  - [7. Writing and labels](#7-writing-and-labels)
    - [Error messaging](#error-messaging)
    - [Who does writing and labels help?](#who-does-writing-and-labels-help)
    - [WCAG Success Criteria for Writing and labels](#wcag-success-criteria-for-writing-and-labels)

</details>

## 1. Color

### Color contrast

Esri targets WCAG 2.1 AA compliance, so large text and graphical elements need to pass a luminance contrast ratio of 3:1 and regular text needs to pass 4.5:1.

Large text equates 18pt or 14pt bold and greater. Regular sized text is anything less than that.

> Note: Windows also provides a high contrast mode that is designed to improve text legibility and readability. It is often used by people with low-vision. High contrast mode will force a preset color palette on the browsing experience, but it also disables background images.

### Color and state

When designing components, it is important to use a combination of color, shapes, and text to indicate states and statuses, such as keyboard focus, form validation, and alerts. Using these other elements provides a secondary indicator in the event a color cannot be seen.

### Who does color help?

Approximately 300 million people in the world have some type of color vision deficiency. Color vision deficiency diminishes an individual's ability to distinguish between certain colors and may prevent them from seeing certain colors all together.

### Color resources

- [Color Contrast Checker](https://coolors.co/contrast-checker/000000-73777d)
- [Adobe Color](https://coolors.co/contrast-checker/000000-73777d)
- [Color Oracle](https://colororacle.org/)

### WCAG Success Criteria for Color

- [1.4.1 Use of Color](https://www.w3.org/TR/WCAG21/#use-of-color)
- [1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [1.4.11 Non-Text Contrast](https://www.w3.org/TR/WCAG21/#non-text-contrast)

[scroll to top](#design-quick-start-guide)

## 2. Typography

### Text styling

Keeping text aligned to the left (or right in certain languages) and limiting the use of text formatting such as underlining, italics, or writing in all capitals improves design for individuals who have dyslexia.

### Text resizing

Consider how text will reflow within components if the words become longer in translations or get bigger because an individual has changed their browser or operating system base font size. Within WCAG it's expected that text should be able to scale up to 200% without loss of content or functionality.

### Who does typography help?

Smart typography choices can improve readability for individuals with dyslexia, cognitive disabilities, or those who have low vision and may be using zoom tools to navigate an app or web page.

### Typography resources

- [Zoom Magnifier (Mac)](https://support.apple.com/en-us/HT210978)
- [Magnifier](https://support.microsoft.com/en-us/windows/use-magnifier-to-make-things-on-the-screen-easier-to-see-414948ba-8b1c-d3bd-8615-0e5e32204198)
- Zoom: [Firefox](https://support.mozilla.org/en-US/kb/font-size-and-zoom-increase-size-of-web-pages) | [Chrome](https://support.google.com/chrome/answer/96810) | [Edge](https://support.microsoft.com/en-us/microsoft-edge/accessibility-features-in-microsoft-edge-4c696192-338e-9465-b2cd-bd9b698ad19a) | [Safari](https://support.apple.com/guide/safari/zoom-in-on-webpages-ibrw1068/mac)

[scroll to top](#design-quick-start-guide)

## 3. Information hierarchy

### Semantic structure

The value of using semantic HTML elements in interface design is that many elements communicate specific states to assistive technologies automatically; although, ARIA can be used to supplement interactions. However, it is recommended to use ARIA sparingly. When adding multiple elements to a page, ensure the HTML matches the intent. (e.g., If it is something that operates like a checkbox, is that apparent?)

### Headings

Headings allow assistive technologies to automatically identify section headings and allow for keyboard shortcuts for navigating the page. It is best practice to properly nest headings (h1, h2, h3, h4, h5, h6) as a missing heading may make an individual think, they have missed a section of content.

### Links

Link text should be meaningful and inform the individual where the link will take them. For example, “Learn more about WCAG 4.1.3” instead of “Learn More”. Links should be associated with a unique identifier, such as an item title using aria-labelledby.

Body links should be denoted with a style other than color and should either avoid opening in a new tab or display an indicator, such as an icon or supporting text, that communicates it as such.

<img src="https://user-images.githubusercontent.com/5023024/171473221-4d0bfe41-c7cb-47e8-99c5-12ebbe872199.svg" alt="" />

### Navigation

Navigation should remain consistent when moving linearly on a page; nothing should move or disappear. Primary navigation should also remain consistent between related web pages, so that high-level links and components, like search or sign in, show up in the same places.

### Focus order

When navigating via keyboard, focus order should be logical and generally follow the visual order of the page.

### Who does information hierarchy help?

A well thought out page structure helps all users, especially those who navigate with assistive technologies to better understand the content and what native shortcuts are available within their tools.

### Information hierarchy resources

- [The Accessibility Tree](https://web.dev/the-accessibility-tree/)

### WCAG Success Criteria for Information hierarchy

- [1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [1.3.2 Meaningful Sequence](https://www.w3.org/TR/WCAG21/#meaningful-sequence)
- [2.4.1 Bypass Blocks](https://www.w3.org/TR/WCAG21/#bypass-blocks)
- [2.4.3 Focus Order](https://www.w3.org/TR/WCAG21/#focus-order)
- [2.4.6 Headings and Labels](https://www.w3.org/TR/WCAG21/#headings-and-labels)
- [3.1.5 Reading Level](https://www.w3.org/TR/WCAG21/#reading-level)
- [3.2.3 Consistent Navigation](https://www.w3.org/TR/WCAG21/#consistent-navigation)
- [3.2.4 Consistent Identification](https://www.w3.org/TR/WCAG21/#consistent-identification)
- [3.3.2 Labels or Instructions](https://www.w3.org/TR/WCAG21/#labels-or-instructions)

[scroll to top](#design-quick-start-guide)

## 4. Forms

### Labels

Labels and supporting text should be kept near their relevant fields providing context for non-sighted and low vision individuals who may be using assistive technologies. If the system has constraints (e.g., dates being formatted in a specific way) supply help text.

Placeholder text should not be used as a replacement for labels as it vanishes upon typing, which can increase the cognitive load for individuals using the form as they must memorize what was there.

### Grouping controls

Elements that are grouped need to be associated with related form controls, such as \`<fieldset>\` and \`<legend>\`. Examples include radio button groups, grouped checkboxes, and related form fields.

<img src="https://user-images.githubusercontent.com/5023024/171473214-3b1824dc-553e-4d6d-8ce5-57a2d68e1d23.svg" alt="" />

### Form fields

- Always indicate required vs optional fields.
- If a field uses input masks (asterisks on sensitive fields) provide an option to reveal the text to reduce cognitive load. Avoid patterns that require a press-and-hold to display plaintext.

### Buttons

- Buttons are triggered by the spacebar and enter/return keys.
- Because buttons have slightly different keyboard interactions than links, it's good practice to distinguish the design patterns. This helps individuals who may be using assistive technologies like dictation software, verbally navigate a page.
- Buttons should trigger an event, not take you to a different URL, as that is the purpose of links.

#### Disabled buttons

It may not always be clear to an individual why a button is disabled. Due to its disabled state, an individual cannot interact with the button to use error messaging to inform their understanding. When disabling a button is necessary, it's recommended to add a tooltip or supporting text explaining why.

### User notifications

Displaying form validation errors next to the field, which has triggered the message helps individuals with limited working memory maintain context.

- Summarize errors at the top of the form with anchor links to jump to the affected fields. This benefits anyone using a keyboard who may be forced to move through the form linearly.
- Including a count of errors in the summary helps all users, in particular those with cognitive disabilities.
- After establishing an error pattern, it should be used consistently throughout the interface. Icons and styling need to mean the same thing, no matter where the pattern is surfaced.

<img src="https://user-images.githubusercontent.com/5023024/171473203-9a60e718-d5dd-4e31-9a34-03cd1580fe40.svg" alt="" />

### Touch zones

Being able to use mobile and touchscreen devices is valuable for individuals with physical or motor disabilities. Interactive elements should not require precise touch points and a best practice within mobile to use 44x44 px touch zones.

<img src="https://user-images.githubusercontent.com/5023024/171473228-345c2b4d-c5d3-44fa-b9bb-04440d621990.svg" alt="" />

### Who does form accessibility help?

A well-designed form can be helpful to all users. Whereas poorly designed forms can add hurdles for those with cognitive disabilities or those who need to navigate by keyboard.

### WCAG Success Criteria for Forms

- [1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [1.3.2 Meaningful Sequence](https://www.w3.org/TR/WCAG21/#meaningful-sequence)
- [2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [2.1.2 No Keyboard Trap](https://www.w3.org/TR/WCAG21/#no-keyboard-trap)
- [2.1.4 Character Key Shortcuts](https://www.w3.org/TR/WCAG21/#character-key-shortcuts)
- [2.2.3 No Timing](https://www.w3.org/TR/WCAG21/#no-timing)
- [2.2.6 Timeouts](https://www.w3.org/TR/WCAG21/#timeouts)
- [2.4.6 Headings and Labels](https://www.w3.org/TR/WCAG21/#headings-and-labels)
- [2.5.5 Target Size](https://www.w3.org/TR/WCAG21/#target-size)
- [3.2.1 On Focus](https://www.w3.org/TR/WCAG21/#on-focus)
- [3.2.2 On Input](https://www.w3.org/TR/WCAG21/#on-input)
- [3.2.3 Consistent Navigation](https://www.w3.org/TR/WCAG21/#consistent-navigation)
- [3.2.4 Consistent Identification](https://www.w3.org/TR/WCAG21/#consistent-identification)
- [3.3 Input Assistance](https://www.w3.org/TR/WCAG21/#input-assistance)
- [4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)

[scroll to top](#design-quick-start-guide)

## 5. Images

When adding images to content, use alt text to provide a succinct description that can be read by screen readers. Avoid alt text that would be redundant to surrounding content. If no new information is conveyed, consider marking the image as decorative.

### Background images

Background images do not support the application of alt text in the same manner as images do because they are rendered with CSS. They can be marked up to communicate as an image, but it requires role="img" and an aria-label rather than an alt attribute.

> Tip: Remember Windows High Contrast Mode will disable background images, so if using them to convey information, add an aria-label.

### Icons

If an icon has a functional purpose, such as indicating a menu expands, it should have alt text. For vector-based icons such as iconfonts or SVGs, the alt text should be added via an aria-label.

To support the screen reader, NVDA, SVGs must also have role="img" to be read.

If the icon is decorative and describing it would be redundant to surrounding content, then it should be marked as decorative. To hide SVGs from screen readers, use aria-hidden="true". Do not use aria-hidden="false" as screen reader support is inconsistent.

While not always possible due to mobile or internationalization, it is best practice to include a visible label with icons in buttons as this reduces the guesswork of an icon's label when using voice dictation software.

### Who does image accessibility help?

Adding alternative text to graphics benefits anyone who may be using a screen reader or voice dictation software to navigate and interact with content.

### WCAG Success Criteria for Images

- [1.1.1 Non-Text content](https://www.w3.org/TR/WCAG21/#non-text-content)
- [1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [1.3.3 Sensory Characteristics](https://www.w3.org/TR/WCAG21/#sensory-characteristics)
- [1.4.5 Images of Text](https://www.w3.org/TR/WCAG21/#images-of-text)
- [1.4.11 Non-Text Content](https://www.w3.org/TR/WCAG21/#non-text-contrast)

[scroll to top](#design-quick-start-guide)

## 6. Animation

- Auto-playing content is often considered distracting, especially if audio is involved.
- Content should not flash or blink more than three times per second to avoid triggering photo-epileptic seizures.

### Who does animation help?

For individuals who have motion sensitivities, whether that rooted in a vestibular disorder, migraines, or other factors, moving interfaces may cause dizziness, headaches, nausea, or even seizures.

### WCAG Success Criteria for Animation

- [1.3.3 Sensory Characteristics](https://www.w3.org/TR/WCAG21/#sensory-characteristics)
- [1.4.2 Audio Control](https://www.w3.org/TR/WCAG21/#audio-control)
- [2.2.2 Pause, Stop, hide](https://www.w3.org/TR/WCAG21/#pause-stop-hide)
- [2.3.1 Three Flashes or Below Threshold](https://www.w3.org/TR/WCAG21/#three-flashes-or-below-threshold)
- [2.5.4 Motion Actuation](https://www.w3.org/TR/WCAG21/#motion-actuation)

[scroll to top](#design-quick-start-guide)

## 7. Writing and labels

Instructions for understanding and interacting with an interface should not rely on any sensory characteristics such as shape, size, visual location, orientation, or sound. Contextual descriptors such as those are often lost by non-sighted or low-vision individuals who may be using a screen-reader and keyboard shortcuts to navigate.

### Error messaging

Error text should be descriptive and should not remove any visible instruction. If a form field has help text and form validation, they should both be able to be viewed at the same time.

### Who does writing and labels help?

Providing clear and unambiguous content, instructions and/or labels benefits everyone in better understanding an interface, but it can be particularly useful to those with cognitive, language, or learning disabilities, or those navigating an interface in a non-linear way.

### WCAG Success Criteria for Writing and labels

- [1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [1.3.2 Meaningful Sequence](https://www.w3.org/TR/WCAG21/#meaningful-sequence)
- [3.1.2 Language of Parts](https://www.w3.org/TR/WCAG21/#language-of-parts)
- [3.1.5 Reading Level](https://www.w3.org/TR/WCAG21/#reading-level)
- [3.2.4 Consistent Identification](https://www.w3.org/TR/WCAG21/#consistent-identification)
- [3.3.1 Error Identification](https://www.w3.org/TR/WCAG21/#error-identification)
- [3.3.2 Labels or Instructions](https://www.w3.org/TR/WCAG21/#labels-or-instructions)
- [3.3.3 Error Suggestion](https://www.w3.org/TR/WCAG21/#error-suggestion)
- [3.3.4 Error Prevention (Legal, Financial, Data)](https://www.w3.org/TR/WCAG21/#error-suggestion)
- [3.3.5 Help](https://www.w3.org/TR/WCAG21/#help)

[scroll to top](#design-quick-start-guide)
`;
function i(n) {
  return e.jsxs(e.Fragment, {
    children: [e.jsx(o, {
      title: "Overview/Accessibility/Design Quick Start"
    }), `
`, `
`, e.jsx(s, {
      children: r
    })]
  });
}
function h(n = {}) {
  const { wrapper: t } = {
    ...a(),
    ...n.components
  };
  return t ? e.jsx(t, {
    ...n,
    children: e.jsx(i, {
      ...n
    })
  }) : i();
}
export {
  h as default
};
