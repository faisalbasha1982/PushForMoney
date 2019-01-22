import {Platform, StyleSheet, Dimensions } from 'react-native';
const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;
import { Colors } from "../../Themes";

const styles = StyleSheet.create({

    title_style: {
      fontSize: 14
    },
  
    item_text_style: {
      color: '#333333',
      fontSize: 14,
      textAlign: 'left',
      fontFamily: 'WorkSans-Regular',
      fontSize: 16,
      fontWeight: '500',
      fontStyle: 'normal',
      letterSpacing: 0.67,
    },
  
    buttonStyle: {
      flex: 3, 
      height: 57,    
      borderRadius: 8,
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: '#f6f6f6',
    },
  
    dropDownStyle: {
      flex:1,
      flexDirection: 'row',
      width: viewPortWidth,
      height: 57,
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: 'transparent',
    },
  
    iconStyleNew: {
      width: 57,
      height: 57,
      borderRadius: 8,
      backgroundColor: '#f6f6f6',
      marginLeft: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    iconImageStyle:{
      backgroundColor: 'black',
      width: 50,
      height: 50
  }
  });