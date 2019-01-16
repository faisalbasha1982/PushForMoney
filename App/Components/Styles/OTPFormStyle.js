import {
    StyleSheet
  } from 'react-native'
  import {
    ApplicationStyles,
    Fonts,
    Metrics,
    Colors
  } from "../../Themes/";
  
  export default StyleSheet.create({
    container: {
      flex: 1
    },
    otpContainer: {
      
    },
    inputContainer: {
      backgroundColor: Colors.burntSienna,
    //   borderRightWidth: 0,
    //   borderLeftWidth: 0,
    //   borderTopWidth: 0,
      width: 60,
      borderWidth:1,
      borderStyle: "solid",
      borderColor: 'lightgray'
    },
    errorMessageContainer: {
      margin: 0,
      marginTop: 0
    },
    errorMessageText: {
      height: 0,
      width: 0
    },
    input: {
      color: Colors.drawer,
      fontFamily: Fonts.type.openSans_light,      
      width: '100%',
      height:'100%',
      borderRadius:6,
      borderColor:'blue',
      borderStyle:'solid',
      borderWidth:1,
      backgroundColor:'#a1a1a1',
      alignItems:'center',
      
    }
  });
  