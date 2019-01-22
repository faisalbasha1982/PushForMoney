import {Platform, StyleSheet, Dimensions } from 'react-native';
const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;
import { Colors } from "../../Themes";

const newStyle = StyleSheet.create({

    wrapper: {
        backgroundColor: 'transparent'
    },

    slide1: {
      flex: 3,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: '#ffffff',
      padding: 0,
      paddingTop:5,
      paddingLeft:15,
      paddingRight:15,
    },
    slide2: {
      flex: 3,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: '#ffffff',
      padding: 0,
      paddingTop:5,
      paddingLeft:15,
      paddingRight:15,
    },
    slide3: {
      flex: 3,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: '#ffffff',
      padding: 0,
      paddingTop:5,
      paddingLeft:15,
      paddingRight:15,
    },
    slide4: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        padding: 0,
        paddingTop:5,
        paddingLeft:15,
        paddingRight:15,
    },
    slide5: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        padding: 0,
        paddingTop:5,
        paddingLeft:15,
        paddingRight:15,
    },
    slide6: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        padding: 0,
        paddingTop:5,
        paddingLeft:15,
        paddingRight:15,
    },    
    text: {
      color: '#000000',
      fontSize: 15,
      fontFamily: 'WorkSans-Medium'
    },

    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    keyboardScrollViewContainer: {
        backgroundColor: 'transparent',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    scrollStyle: {
        flex:1,
        margin:0,
        padding:0,
    },

    headerImage: {
        width: viewPortWidth * 0.65,
        height: Platform.OS === 'ios'?40:120,
        flex: Platform.OS === 'ios'?4:8,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios'?0:10,
        padding: 25,
        paddingTop: 0,
        marginLeft: 0,
        flex: Platform.OS === 'ios'?30:1,
        backgroundColor: '#ffffff',
    },

    socialIcons: {
        flex: 4,
        justifyContent: 'center', 
        alignItems: 'flex-start' ,
        marginTop: 10, 
        marginLeft: 20,
        padding: 30, 
        flexDirection: 'row', 
        width: viewPortWidth, 
        height: 400, 
        backgroundColor: 'transparent'
    },

    firstName: {
        width: 159,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginBottom: 15
    },

    forgotPassword:{
        width: 112,
        height: 14,
        fontFamily: "WorkSans-Medium",
        fontSize: 12,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0.43,
        color: "#E73D50",
    },

    phoneNumberStyle: {
        width: 190,
        height: 22,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginBottom: 15

    },

    nameInput: {
        width: 334,
        height: 57,
        borderRadius: 8,
        backgroundColor: '#f6f6f6',
        marginBottom: 15,
        padding: 10,
    },

    buttons: {
        width: viewPortWidth,
        height: 20,
        flex: 2,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 25,
        marginBottom:  10,
        marginTop: 10,
    },

    endButtons: {
        width: viewPortWidth,
        height: Platform.OS === 'ios'?50:150,
        zIndex: 999,
        flex: Platform.OS === 'ios'?1:4,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor:'transparent',
        paddingLeft:15,
        paddingTop: 5
    },

    iconImageStyle:{
        backgroundColor: 'black',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconStyle: {
        width: 45,
        height: 45,
        borderRadius: 45,
        backgroundColor: 'transparent',
        marginTop: viewPortHeight / 200,
        marginRight: 0,
        marginLeft: 15,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'        
    },

    validationStyle:{
        position: 'absolute',
        top: 62,
        left: 35,
        width: 60,
        height: 60,    
    },
});

export default newStyle;