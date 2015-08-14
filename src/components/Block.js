import React, {PropTypes}from 'react';
import Styles from '../styles';
const mergeAndPrefix = require('../styles/autoprefix');

export default class Block {
    static displayName = 'Block'

    static propTypes = {
        order: React.PropTypes.number,
        flex: React.PropTypes.string,//none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
        basis: React.PropTypes.number,//auto | flex-start | flex-end | center | baseline | stretch
        width: React.PropTypes.number,
        height: React.PropTypes.number
    }

    static defaultProps = {
        flex: 0
    }

    render() {
        let _this = this;

        let styles = this.props;
        styles.boxSizing= 'border-box';

        //verifico se è presente un width ed lo fisso come prioritatio
        if (styles.width) {
            styles.flex = '0 1 auto'
        }
        return (
            <div style={mergeAndPrefix(styles, this.props.style)}>
                {this.props.children}
            </div>
        );
    }
}
