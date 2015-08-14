import React, {PropTypes}from 'react';
const mergeAndPrefix = require('../styles/autoprefix');

export default class View {
    static displayName='View'

    static propTypes = {
        width:PropTypes.string,
        height:PropTypes.string,
    }

    static defaultProps={
        width:'100vw',
        height:'100vh'

    }
    render() {
        let styles={
            height:this.props.height,
            width:this.props.width,
            position:'relative',
            top:0,
            left:0

        }
        return (
            <div style={mergeAndPrefix(styles, this.props.style)}>
                {this.props.children}
            </div>
        );
    }
}
