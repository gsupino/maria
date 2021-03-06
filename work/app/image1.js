var React = require('react')

import Block from './block';

module.exports = React.createClass({

         propTypes: {
            src: React.PropTypes.string,
            width: React.PropTypes.number,
            height: React.PropTypes.number
        },

        getDefaultProps: function () {
            return {
                width: '100%',
                height: '100%'
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
      //position: 'absolute',
      //top: 0, right: 0, bottom: 0, left: 0,
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
      <Block isFlex flex={1} alignSelf='center'>
            <Block isFlex flex={1} alignSelf='center' styles={imageStyles}>

            </Block>
      </Block>
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