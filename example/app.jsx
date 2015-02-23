var React = require('react');

var StyleGuideItem = require('../index');

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
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
