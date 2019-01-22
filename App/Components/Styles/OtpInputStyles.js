import {Platform, StyleSheet, Dimensions } from 'react-native';
const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;
import { Colors } from "../../Themes";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; 

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
  
    newcontainer: {
      flex: 1,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'center'
  },
    otpContainer: {
      backgroundColor: 'rgb(246, 246, 246)',
      borderRadius: 8,
      borderWidth: 1,
      height: 50,
      width:37,
      margin: 10,
    },
    otpInput: {
      color: '#000000',
      fontSize: 24,
      paddingTop: 10,
      textAlign: 'center',
      width: 40,
    },
    inputsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 25,
      marginVertical: 20,
    },
    errorMessageContainer: {
      marginHorizontal: 25,
    },
  
  
    cell: {
      paddingVertical: 11,
      width: 40,
      height: 40,
      margin: 5,
      textAlign: 'center',
      fontSize: 16,
      color: '#000',
      borderRadius: 40/2,
      borderWidth:1,
      backgroundColor:'#a1a1a1'
    }
  })

  export default styles;