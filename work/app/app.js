'use strict';

var StyleSheet = require('react-style');
var React = require('react');
var mui = require('material-ui');
var FlatButton = mui.FlatButton;
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var DropDownMenu = mui.DropDownMenu;
var FontIcon = mui.FontIcon;
var DropDownIcon = mui.DropDownIcon;
var RaisedButton = mui.RaisedButton;
var ImageComponent = require('./image1');
var Image = require('./image2');

import {Layout,CenterVertical,resizeMixin,Spacer} from '../lib/flex';

var color = c => ({backgroundColor: c});




var App = React.createClass({
    render() {
        return (
            /*{...this.props} makes sure that the <App> component behaves just like a Layout component.*/
            <Layout {...this.props} orientation="horizontal" style={{outline: "1px #000 solid"}}>
                <Layout style={color("lightBlue")}> I’m in the center, taking 5/7 of the remaining space. </Layout>
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
                <Layout orientation="horizontal" size='100px' styles={styles.navbar}>
                    <Layout size='200px'>
                        <ImageComponent src={"build/img/brand/logo.gif"} aspectRatio={1} width={200} height={100}/>

                    </Layout> <Spacer /> <Layout> <CenterVertical>
                    <FontIcon className="muidocs-icon-custom-pie"/>
                    <FontIcon className="muidocs-icon-custom-sort"/>
                    <span className="mui-toolbar-separator">&nbsp;</span>
                    <RaisedButton label="Create Broadcast" primary={true}/> </CenterVertical>

                </Layout>


                </Layout> {/* Notice that we can control the size of the <App> component just the same as any other Layout */}
                <App /> </Layout>
        );
    }
});



import Flex from './flex';
import Block from './block';
import Toolbar from './toolbar';

var styles = StyleSheet.create({
    navbar: {
        color: 'FFEFD6'

    }
})

var Test = React.createClass({
    render(){
        return (
            <Toolbar>
                <Block isFlex flex={1} alignSelf='center'>from left</Block >
                <ImageComponent src={"build/img/brand/logo.gif"} aspectRatio={1} height={100} />

            </Toolbar>
            /*
            <Flex   height={100} styles={styles.navbar}>

                        <ImageComponent src={"build/img/brand/logo.gif"} aspectRatio={1} width={200} height={100}/>


                <Block isFlex flex={1} alignSelf='center'>
                    <Image src={"build/img/brand/logo.gif"} width='200'height='100'/>
                </Block >

                <Block isFlex flex={1} alignSelf='center'>from left</Block >
                <Block isFlex flex={1} alignSelf='center'>to right.</Block>
            </Flex>
            */
        )
    }
});

if (typeof window !== 'undefined') {
    React.render(<Test />, document.getElementById('content'));
}