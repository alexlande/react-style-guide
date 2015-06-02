# React Style Guide

A simple React component for building living style guides with React. Check out the [example](http://www.alexlande.com/react-style-guide/).

## Features

- Markup samples based on React elements passed in as children.
- Custom markup strings if you don't want auto-generated ones.
- Built-in syntax highlighting with `highlight.js` (or include your own).
- Highly configurable (maybe too configurable).
  - Allows custom class names and text on every element.
  - Titles, descriptions, and expand/collapse controls are optional.  

## Usage

```js
<StyleGuideItem
  title="Cool Button"
  description="This is a very cool button!"
>
  <CoolButton>
    Button!
  </CoolButton>

  <CoolButton type="primary">
    Primary Button!
  </CoolButton>
</StyleGuideItem>
```

Optionally, include the CSS in `react-style-guide.css` for a nice set of default styles.

## Building the Examples

```bash
npm install
npm run example
```

Then you can browse to [http://localhost:8080/](http://localhost:8080/)

To build the example files once:

```bash
npm run build-example
```

Then you can open `./examples/index.html`

### Props

#### title

Type: `String` Optional

A text title for the section.

#### description

Type: `String` Optional

An expanded description.

#### descriptionIsHtml

Type: `Boolean` Default: `false`

Set to `true` to use HTML for the section description.

#### staticMarkup

Type: `String`

Example markup as a string. Use when you don't want auto-generated JSX markup for a section.

#### highlighter

Type: `Function`

A custom syntax highlighting function. Takes the code example markup as a string, must return the example as HTML with syntax highlighting markup.

#### expandingMarkup

Type: `Boolean` Default: `true`

Set to `false` to disable expandable markup samples (making markup visible all the time).

#### markupExpandedByDefault

Type: `Boolean` Default: `false`

Set to `true` to make markup samples expanded by default.

#### sectionAnchor

Type: `Boolean` Default: `true`

Set to true to prevent section titles from being wrapped in anchor tags (allowing users to easily link to sections).

#### headingTag

Type: `String` Default: `h2`

HTML tag name for style guide headings.

#### componentClass

Type: `String` Default: `Guide`

HTML class for the top level element of the component.

#### headingClass

Type: `String` Default: `Guide-heading`

HTML class for the heading element.

#### descriptionClass

Type: `String` Default: `Guide-description`

HTML class for the description element.

#### exampleClass

Type: `String` Default: `Guide-example`

HTML class for the example element.

#### markupClass

Type: `String` Default: `Guide-markup`

HTML class for the markup sample element.

#### anchorClass

Type: `String` Default: `Guide-anchor`

HTML class for the anchor wrapping the heading element.

#### expanderSectionClass

Type: `String` Default: `Guide-expanderSection`

HTML class for the element containing the section expander button.

#### expanderClass

Type: `String` Default: `Guide-expander`

HTML class for the section expander button.

#### expanderInactiveText

Type: `String` Default: `Expand`

Text content of the section expander button when section is not expanded.

#### expanderActiveText

Type: `String` Default: `Collapse`

Text content of the section expander button when section is expanded.
