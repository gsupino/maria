import React from 'react';

let Image = React.createClass({
    getInitialState: function() {
        return {
            loaded: false
        };
    },

    onImageLoad: function() {
        if (this.isMounted()) {
            this.setState({loaded: true});
        }
    },

    componentDidMount: function() {
        var imgTag = this.refs.img.getDOMNode();
        var imgSrc = imgTag.getAttribute('src');
        var img = new window.Image();
        img.onload = this.onImageLoad;
        img.src = imgSrc;
    },

    render: function() {
        var className = this.props.className ? this.props.className + ' image' : 'image';
        if (this.state.loaded) {
            className += ' image-loaded';
        }
        return React.createElement('img', Object.assign({}, this.props, {
            ref: 'img',
            className: className
        }));
    }
});



export default Image;