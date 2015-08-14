import React from 'react';

let Block = React.createClass({
    componentName:'Block',
    propTypes: {
        isFlex: React.PropTypes.bool,
        flex: React.PropTypes.string,//none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
        alignSelf: React.PropTypes.string,//auto | flex-start | flex-end | center | baseline | stretch
        width: React.PropTypes.number,
        height: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            isFlex:false,
            flex: '1 1 auto',
            alignSelf: 'auto'
        }
    },

    render: function() {
        let props = this.props;
        let propsStyle={};

        if (props.isFlex) {
            let prefix = (navigator.userAgent.indexOf('AppleWebKit') > -1) ? 'Webkit' : (navigator.userAgent.indexOf('MSIE') > -1) ? 'ms' : null;
            propsStyle={display: (this.props.prefix === 'Webkit') ? '-webkit-flex' : (this.props.prefix === 'ms') ? '-ms-flex' : 'flex'};
            // update style according to item flex prop
            propsStyle[prefix ? prefix + 'Flex' : 'flex'] = props.flex;
            propsStyle[(prefix && prefix !== 'ms') ? prefix + 'AlignSelf' : 'alignSelf'] = props.alignSelf;
        }
        propsStyle.height=props.height;
        propsStyle.width=props.width;

        let styles = [
            propsStyle
        ].concat(props.styles);

        return (
            React.createElement("div", styles={styles},
                props.children
            )
        );
    }

})

export default Block;

