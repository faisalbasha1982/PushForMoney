import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions,} from 'react-native';
import AccordionList from 'react-native-collapsible/Accordion';
const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth  = Dimensions.get('window').width;

export default class AccordionCollapsible extends Component {
    render() {
      return (
        <View style={styles.container}>
        <AccordionList
            activeSections={[0]}
            sections={['Section 1', 'Section 2', 'Section 3']}
            renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
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

