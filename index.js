var React = require('react');
var reactToJsx = require('react-to-jsx');
var slugify = require('slugify');
var hl = require("highlight.js");

hl.configure({
  languages: ['xml']
});

var highlightMarkup = function (markup) {
  return hl.highlightAuto(markup).value;
};

var StyleGuideItem = React.createClass({
  propTypes: {
    // Content
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    descriptionIsHtml: React.PropTypes.bool,
    staticMarkup: React.PropTypes.string,

    // Behavior
    highlighter: React.PropTypes.func,
    expandingMarkup: React.PropTypes.bool,
    markupExpandedByDefault: React.PropTypes.bool,
    sectionLink: React.PropTypes.bool,
    sectionId: React.PropTypes.string,

    // Classes and Markup
    headingTag: React.PropTypes.string,
    componentClass: React.PropTypes.string,
    headingClass: React.PropTypes.string,
    descriptionClass: React.PropTypes.string,
    exampleClass: React.PropTypes.string,
    markupClass: React.PropTypes.string,
    anchorClass: React.PropTypes.string,
    expanderSectionClass: React.PropTypes.string,
    expanderClass: React.PropTypes.string,

    // Text
    expanderInactiveText: React.PropTypes.string,
    expanderActiveText: React.PropTypes.string
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
        <a
          className={this.props.anchorClass}
          href={'#' + sectionId}
        >
          {this.props.title}
        </a>
      );
    }

    return (
      <HeadingTag
        id={sectionId}
        className={this.props.headingClass}
      >
        {titleElement}
      </HeadingTag>
    );
  },

  renderDescription: function () {
    if (!this.props.description) {
      return null;
    }

    if (this.descriptionIsHtml) {
      return (
        <div
          className={this.props.descriptionClass}
          dangerouslySetInnerHTML={{__html: this.props.description }}
        />
      );
    }

    return (
      <div className={this.props.descriptionClass}>
        <p>{this.props.description}</p>
      </div>
    );
  },

  renderMarkup: function (markup) {
    if (this.props.expandingMarkup && !this.state.markupExpanded) {
      return;
    }

    if (this.props.highlighter) {
      return (
        <pre
          className={this.props.markupClass}
          dangerouslySetInnerHTML={{__html: this.props.highlighter(markup)}}
        />
      );
    }

    return (
      <pre className={this.props.markupClass}>
        {markup}
      </pre>
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
      <div className={this.props.expanderSectionClass}>
        <button
          className={this.props.expanderClass}
          onClick={this.toggleExpander}
        >
          {expanderText}
        </button>
      </div>
    )
  },

  render: function () {
    var markup = this.props.staticMarkup || reactToJsx(this.props.children);

    return (
      <div className={this.props.componentClass}>
        {this.renderTitle()}
        {this.renderDescription()}

        <div className={this.props.exampleClass}>
          {this.props.children}
        </div>

        {this.renderMarkup(markup)}

        {this.renderExpander()}
      </div>
    );
  }
});

module.exports = StyleGuideItem;
