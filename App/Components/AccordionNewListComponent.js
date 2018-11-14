import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions,} from 'react-native';
import Accordion from '@ercpereda/react-native-accordion';
const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth  = Dimensions.get('window').width;

const Header = ({ isOpen }) =>
  <View style={{
      paddingTop: 15,
      paddingRight: 15,
      paddingLeft: 15,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#a9a9a9',
      backgroundColor: '#ffffff',
      width: viewPortWidth * 0.90
    }}>
      <Text>{`${isOpen ? '-' : '+'} Click to Expand`}</Text>
    </View>;
 
const Content = (
  <View style={{
      display: 'flex',
      backgroundColor: '#ffffff'
    }}>
      <Text style={{
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        color: '#000000',
      }}>
        This content is hidden in the accordion
      </Text>
    </View>);
 
export default class AccordionNewListComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Accordion
          header={Header}
          content={Content}
          duration={300}
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});