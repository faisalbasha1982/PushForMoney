import {Platform, StyleSheet, Dimensions } from 'react-native';
const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;
import { Colors } from "../../Themes";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; 

const newStyle = StyleSheet.create({

    nameStyle: {
      padding: 5,
      margin: 5,
      width: viewPortWidth*0.45,
      height: 25,
      fontFamily: "WorkSans-Bold",
      fontSize: 15,
      fontWeight: "normal",
      fontStyle: "normal",
      letterSpacing: 0.46,
      color: "rgb(53, 53, 53)",
      textAlign: "left",
      backgroundColor:'transparent',
      alignItems:'center',
      fontFamily: "WorkSans-Regular",
      fontSize: 15,
      fontWeight: "normal",
      fontStyle: "normal",
      letterSpacing: 0.39,
      //color: "rgb(155, 155, 155)",
      paddingLeft:0,
  
  },
  
  statusStyle: {
      paddingLeft: 5,
      marginTop: 28,
      width: 80,
      height: 15,
      flex:1,
      fontFamily: "WorkSans-Regular",
      fontSize: 11,
      fontWeight: "normal",
      fontStyle: "normal",
      letterSpacing: 0.39,
      color: "rgb(155, 155, 155)",
      backgroundColor: 'transparent',
      textAlign:'right',
      alignItems:'flex-end'
  },
  
  statusStylePending: {
    paddingLeft: 0,
    marginTop: 28,
    width: 250,
    height: 15,
    flex:8,
    fontFamily: "WorkSans-Regular",
    fontSize: 11,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.39,
    color: "rgb(155, 155, 155)",
    backgroundColor:'transparent',
    textAlign:'right',
    alignItems:'flex-start'
  },
  
  buttonStyle: {
  
    width: viewPortWidth*0.83,
    height: 40,
    // borderBottomColor: "#333",
    // borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,
    flexDirection: 'column'
  
  },
  
  borderBottom: {
    width: 310,
    height: 1,
    borderBottomColor: "rgb(231, 61, 80)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'rgb(231, 61, 80)',
    flex:1,
  },
  
  totalText: {
    width: 310,
    height: 20,
    // fontFamily: "WorkSans-Regular",
    // fontSize: 16,
    // fontWeight: "500",
    // fontStyle: "normal",
    // letterSpacing: 0.67,
    // textAlign: "left",
    flex: 8,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  
  fontStyle: {
    fontFamily: "WorkSans-Medium",
    fontSize: 11,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.67,
    textAlign: 'right',
    color: "rgb(231, 61, 80)",
    marginLeft: 15,
    marginTop:28,
    backgroundColor:'transparent'
  },
  
  layoutBelow: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  
  endButtons: {
    width: viewPortWidth * 0.77,
    height: viewPortHeight * 0.70,
    zIndex: 999,
    flex: Platform.OS === 'ios'?11:4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',       
  },
  
  iconImageStyle:{
    width: 13,
    height: 16,
    fontFamily: "FontAwesome",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.67,
    textAlign: 'right',
    color: "rgb(231, 61, 80)", 
  },
  
  iconStyle: {
    width: 30,
    height: 30,
    borderRadius: 0,
    backgroundColor: 'transparent',
    // marginTop: viewPortHeight / 80,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  
  // borderBottom: {
  //   width: 280,
  //   height: 1,
  //   borderBottomColor: "rgb(231, 61, 80)",
  //   borderBottomWidth: StyleSheet.hairlineWidth,
  //   marginBottom: 20,
  // },
  
  })

  export default newStyle;