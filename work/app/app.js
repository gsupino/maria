'use strict';

var StyleSheet   = require('react-style');
var React        = require('react');
var mui = require('material-ui');
var FlatButton = mui.FlatButton;

import {Layout,resizeMixin} from '../lib/flex'

var color = c => ({ backgroundColor: c});

var MyAwesomeReactComponent = React.createClass({

    render: function() {
        return (
            <FlatButton label="Primary" primary={true} />
        );
    }

});


var App = React.createClass({
    render() {
        return (
            /*{...this.props} makes sure that the <App> component behaves just like a Layout component.*/
            <Layout {...this.props} orientation="horizontal" style={{outline: "1px #000 solid"}}>
                <Layout size="weight 2" style={color("#D6E6FF")}>
                    I’m on the left, 2/7 of the remaining space wide.
                </Layout>
                <Layout size="weight 5" style={color("lightBlue")}>
                    I’m in the center, taking 5/7 of the remaining space.
                    <MyAwesomeReactComponent />
                </Layout>
                <Layout size="60px" style={color("#4EC8CF")}>
                    I’m on the right, 60px wide.
                </Layout>
            </Layout>
        );
    }
});

var Root = React.createClass({
    mixins: [resizeMixin],
    render() {
        return (
            /* The root instance needs a fixes height and width */
            <Layout calculatedWidth={window.innerWidth} calculatedHeight={window.innerHeight}>
                <Layout style={color("#FFEFD6")}>
                    Header, fills the remaining space.
                </Layout>
                {/* Notice that we can control the size of the <App> component just the same as any other Layout */}
                <App size="0.7 ofParent"/>
                <Layout size="50px" style={color("#FFEFD6")}>
                    Footer, fixed height of 50px.
                </Layout>
            </Layout>
        );
    }
});

if (typeof window !== 'undefined') {
    React.render(<Root />, document.getElementById('content'));
}