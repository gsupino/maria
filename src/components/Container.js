import React, {PropTypes}from 'react';
import Styles from '../styles';
const mergeAndPrefix = require('../styles/autoprefix');

export default class Container {
    static displayName='Container'

    static propTypes = {
        column: React.PropTypes.bool,//defaults to row layout
        wrap: React.PropTypes.bool,//default is to wrap
        justifyContent: React.PropTypes.string,//flex-start | flex-end | center | space-between | space-around
        alignItems: React.PropTypes.string,//flex-start | flex-end | center | baseline | stretch
        width: React.PropTypes.string,
        height: React.PropTypes.string
    }

    static defaultProps={
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    }

    render() {
        let props = this.props;

        let styles={
            display: 'flex',
            flexDirection : props.column ? 'column' : 'row',
            flexWrap: props.nowrap ? 'nowrap' : 'wrap',
            justifyContent:props.justifyContent,
            alignItems: props.alignItems,
            width : props.width,
            height : props.height,
            boxSizing: 'border-box',
            backgroundColor:Styles.Colors.cyan300
        };
        return (
            <div style={mergeAndPrefix(styles, this.props.style)}>
                {this.props.children}
            </div>
        );
    }
}
