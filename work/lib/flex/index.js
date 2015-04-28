'use strict';

var resizeMixin = {
    resize() {
        this.forceUpdate();
    },
    componentDidMount() {
        window.addEventListener('resize', this.resize);
    },
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }
};

module.exports = {
    Layout: require('./Layout'),
    resizeMixin: resizeMixin,
    Center: require('./Center'),
    CenterHorizontal: require('./CenterHorizontal'),
    CenterVertical: require('./CenterVertical'),
    Spacer: require('./Spacer'),
};