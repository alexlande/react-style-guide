var React = require('react');
var PropTypes = require('prop-types');
var createClass = require('create-react-class');
var reactToJsx = require('react-to-jsx');
var slugify = require('slugify');
var hl = require("highlight.js/lib/highlight.js");

hl.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

var highlightMarkup = function (markup) {
  return hl.highlightAuto(markup).value;
};

var StyleGuideItem = createClass({
  displayName: "StyleGuideItem",
  propTypes: {
    // Content
    title: PropTypes.string,
    description: PropTypes.string,
    descriptionIsHtml: PropTypes.bool,
    staticMarkup: PropTypes.string,

    // Behavior
    highlighter: PropTypes.func,
    expandingMarkup: PropTypes.bool,
    markupExpandedByDefault: PropTypes.bool,
    sectionLink: PropTypes.bool,
    sectionId: PropTypes.string,

    // Classes and Markup
    headingTag: PropTypes.string,
    componentClass: PropTypes.string,
    headingClass: PropTypes.string,
    descriptionClass: PropTypes.string,
    exampleClass: PropTypes.string,
    markupClass: PropTypes.string,
    anchorClass: PropTypes.string,
    expanderSectionClass: PropTypes.string,
    expanderClass: PropTypes.string,

    // Text
    expanderInactiveText: PropTypes.string,
    expanderActiveText: PropTypes.string
  },

  getDefaultProps: function () {
    return {
      // Content
      title: null,
      description: null,
      descriptionIsHtml: false,
      staticMarkup: null,

      // Behavior
      highlighter: highlightMarkup,
      expandingMarkup: true,
      markupExpandedByDefault: false,
      sectionAnchor: true,

      // Classes and Markup
      headingTag: 'h2',
      componentClass: 'Guide',
      headingClass: 'Guide-heading',
      descriptionClass: 'Guide-description',
      exampleClass: 'Guide-example',
      markupClass: 'Guide-markup',
      anchorClass: 'Guide-anchor',
      expanderSectionClass: 'Guide-expanderSection',
      expanderClass: 'Guide-expander',

      // Text
      expanderInactiveText: 'Expand',
      expanderActiveText: 'Collapse'
    }
  },

  getInitialState: function () {
    return {
      markupExpanded: this.props.markupExpandedByDefault
    }
  },

  toggleExpander: function () {
    this.setState({
      markupExpanded: !this.state.markupExpanded
    });
  },

  renderTitle: function () {
    if (!this.props.title) {
      return null;
    }

    var HeadingTag = this.props.headingTag;
    var sectionId = slugify(this.props.title);
    var titleElement = this.props.title;

    if (this.props.sectionAnchor) {
      titleElement = (
        React.createElement("a", {
          className: this.props.anchorClass,
          href: '#' + sectionId
        },
          this.props.title
        )
      );
    }

    return (
      React.createElement(HeadingTag, {
        id: sectionId,
        className: this.props.headingClass
      },
        titleElement
      )
    );
  },

  renderDescription: function () {
    if (!this.props.description) {
      return null;
    }

    if (this.props.descriptionIsHtml) {
      return (
        React.createElement("div", {
          className: this.props.descriptionClass,
          dangerouslySetInnerHTML: {__html: this.props.description}}
        )
      );
    }

    return (
      React.createElement("div", {className: this.props.descriptionClass},
        React.createElement("p", null, this.props.description)
      )
    );
  },

  renderMarkup: function (markup) {
    if (this.props.expandingMarkup && !this.state.markupExpanded) {
      return;
    }

    if (this.props.highlighter) {
      return (
        React.createElement("pre", {
          className: this.props.markupClass,
          dangerouslySetInnerHTML: {__html: this.props.highlighter(markup)}}
        )
      );
    }

    return (
      React.createElement("pre", {className: this.props.markupClass},
        markup
      )
    );
  },

  renderExpander: function () {
    if (!this.props.expandingMarkup) {
      return;
    }

    var expanderText = this.props.expanderInactiveText;

    if (this.state.markupExpanded) {
      expanderText = this.props.expanderActiveText;
    }

    return (
      React.createElement("div", {className: this.props.expanderSectionClass},
        React.createElement("button", {
          className: this.props.expanderClass,
          onClick: this.toggleExpander,
          type: "button"
        },
          expanderText
        )
      )
    )
  },

  render: function () {
    var markup = this.props.staticMarkup || reactToJsx(this.props.children);

    return (
      React.createElement("div", {className: this.props.componentClass},
        this.renderTitle(),
        this.renderDescription(),

        React.createElement("div", {className: this.props.exampleClass},
          this.props.children
        ),

        this.renderMarkup(markup),

        this.renderExpander()
      )
    );
  }
});

module.exports = StyleGuideItem;
