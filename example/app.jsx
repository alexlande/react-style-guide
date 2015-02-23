var React = require('react');

var StyleGuideItem = require('../index');

var hl = require("highlight.js");

hl.configure({
  languages: ['xml']
});

var highlightMarkup = function (markup) {
  return hl.highlightAuto(markup).value;
};

var TestSection = React.createClass({
  render: function () {
    return (
      <section>
        {this.props.children}
      </section>
    );
  }
});

var CoolButton = React.createClass({
  render: function () {
    var styles = {};

    if (this.props.type === 'primary') {
      styles = {
        backgroundColor: '#0074d9',
        border: 0,
        color: '#fff',
        fontSize: 16,
        borderRadius: 3,
        padding: '0.5em 0.8em',
        marginLeft: '0.5em',
        cursor: 'pointer'
      }
    }

    return (
      <button style={styles}>
        {this.props.children}
      </button>
    );
  }
})

var App = React.createClass({
  render: function () {
    return (
      <div>
        <StyleGuideItem
          title="Test Section"
          description="This is a very cool test section!"
          highlighter={highlightMarkup}>
          <TestSection
            cool={true}
            type="primary"
            size="large"
            friends={["john", "mark"]}>
            <h1
              friends={["paul", "mark"]}
              things={{make: "Ford"}}>
              This is a section
            </h1>

            <CoolButton
              we="have"
              so="many"
              props="yeah!"
              >
              Button!
            </CoolButton>
          </TestSection>
        </StyleGuideItem>

        <StyleGuideItem
          title="Cool Button"
          description="This is a very cool button!"
          highlighter={highlightMarkup}>
          <CoolButton>
            Button!
          </CoolButton>

          <CoolButton type="primary">
            Primary Button!
          </CoolButton>
        </StyleGuideItem>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
