import React from 'react';
import StyleSheet from 'react-style';
import Flex from './flex';

let Toolbar=React.createClass({

    render: function() {

       return (
         <Flex styles={styles.toolbar}>
           {this.props.children}
         </Flex>
       );
     }

})

let styles=StyleSheet.create({
    toolbar:{
        backgroundColor: 'pink',
        height: 100,
        width: '100%',
        padding: '0 24'
    }
})

export default Toolbar;