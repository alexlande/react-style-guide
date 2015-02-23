var React = require('react');
var reactToJsx = require('react-to-jsx');
var slugify = require('slugify');

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
      highlighter: null,
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

  renderExpander: function () {
    if (!this.props.expandingMarkup) {
      return;
    }
    
    var expanderText = this.props.expanderInactiveText;

    if (this.state.markupExpanded) {
      expanderText = this.props.expanderActiveText;
    }

    return (
      <div>
        <button
          className={this.props.expanderClass}
          onClick={this.toggleExpander}
        >
          {expanderText}
        </button>
      </div>
    )
  },

  renderTitle: function () {
    if (!this.props.title) {
      return null;
    }

    var HeadingTag = this.props.headingTag;
    var sectionId = slugify(this.props.title);
    var anchorElement;

    if (this.props.sectionAnchor) {
      anchorElement = (
        <a
          href={'#' + sectionId}
          aria-hidden={true}
        >
        </a>
      );
    }

    return (
      <HeadingTag
        id={sectionId}
        className={this.props.headingClass}
      >
        {anchorElement}
        {this.props.title}
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
        {this.props.description}
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
