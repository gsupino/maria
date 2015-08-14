var React = require('react')

module.exports = React.createClass({
         
         propTypes: {
            src: React.PropTypes.string,
            width: React.PropTypes.number,
            height: React.PropTypes.number
        },

        getDefaultProps: function () {
            return {
                width: 200,
                height: 200
            }
        },


  getInitialState: function() {
    return {
      loaded: false
    }
  },
  render: function() {
    var divStyles = {
      position: 'relative',
      paddingBottom: Math.round(100 / Number(this.props.aspectRatio)) + '%'
    }

    var imageStyles = {
      position: 'absolute',
      top: 0, right: 0, bottom: 0, left: 0,
      backgroundSize:'contain',
      backgroundPosition: 'center center',
      backgroundImage: 'url(' + this.props.src + ')',
      backgroundRepeat: 'no-repeat',
      opacity: this.state.loaded ? 100 : 0,
      //transition: this.props.transition || 'opacity 0.4s ease',
      width: this.props.width,
      height: this.props.height
 
    }

    return (
      React.DOM.div({
          className: 'component-image' + (!this.state.loaded ? ' component-image--loading' : ''),
          style: divStyles
        },
        React.DOM.div({
          style: imageStyles
        })
      )
    )
  },
  componentDidMount: function() {
    var self = this
    var img = document.createElement('img')

    img.onload = function() {
      self.setState({loaded: true})
    }

    img.src = this.props.src
  }
})