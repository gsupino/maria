/*global __CLIENT__*/
import React from 'react';
import {Link} from 'react-router';
import {load} from '../actions/imageActions';
import View from './View';
import Container from './Container';
import Paper from './Paper';
import Block from './Block';

export default class App {
    render() {
        console.log(React.Children.count(this.props.children))
        return (
            <View>
                <Container width='100%' height='50%'>
                    <Paper zDepth={5} style={{backgroundColor:'white'}}>
                        {this.props.children}
                    </Paper>
                </Container>

                <Container width='100%' height='50%'>
                    <Block flex='1 0 0px' alignSelf='center' height='30%' >
                        <p className='vertical-align'>Home ciao</p>
                    </Block>
                    <Block flex='2 0 0px'>
                        <p>Home </p>
                    </Block>

                    {this.props.children}
                </Container>
            </View>
        );
    }

    static fetchData(store) {
        return store.dispatch(load());
    }

}
