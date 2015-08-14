import React from 'react';

let Flex = React.createClass({
    componentName:'Flex',
    propTypes: {
        column: React.PropTypes.bool,//defaults to row layout
        wrap: React.PropTypes.bool,//default is to wrap
        justifyContent: React.PropTypes.string,//flex-start | flex-end | center | space-between | space-around
        alignItems: React.PropTypes.string,//flex-start | flex-end | center | baseline | stretch
        width: React.PropTypes.number,
        height: React.PropTypes.number
    },

    getDafaultProps: function() {
        return {
            justifyContent: 'flex-start',
            alignItems: 'stretch'
        }
    },



    render: function() {
        let props = this.props;

        let prefix = (navigator.userAgent.indexOf('AppleWebKit') > -1) ? 'Webkit' : (navigator.userAgent.indexOf('MSIE') > -1) ? 'ms' : null;
        let flexStyle={display: (this.props.prefix === 'Webkit') ? '-webkit-flex' : (this.props.prefix === 'ms') ? '-ms-flex' : 'flex'};

        // update style according to box props
        // flex-direction
        flexStyle[prefix ? prefix + 'FlexDirection' : 'flexDirection'] = props.column ? 'column' : 'row';
        // flex-wrap
        flexStyle[prefix ? prefix + 'FlexWrap' : 'flexWrap'] = props.nowrap ? 'nowrap' : 'wrap';
        // justify-content
        flexStyle[(prefix && prefix !== 'ms') ? prefix + 'JustifyContent' : 'justifyContent'] = props.justifyContent;
        // align-items
        flexStyle[(prefix && prefix !== 'ms') ? prefix + 'AlignItems' : 'alignItems'] = props.alignItems;
        flexStyle.height = props.height;
        flexStyle.width = props.width;

        let styles = [
            flexStyle
        ].concat(props.styles);

        return (
            React.createElement("div", styles={styles},
                props.children
            )
        );
    }
})

export default Flex;