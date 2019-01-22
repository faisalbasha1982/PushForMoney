import {Platform, StyleSheet, Dimensions } from 'react-native';
const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const newStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    forgotPasswordStyle: {
        flex:1,
        backgroundColor: 'transparent',
        width: viewPortWidth * 0.40,
        height: viewPortHeight * 0.40,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 180,
        height: 14,
    },

    forgotPassword:{
        fontFamily: "WorkSans-Medium",
        fontSize: 12,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0.43,
        color: "#E73D50",    
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
        height: Platform.OS === 'ios'?40:40,
        flex: Platform.OS === 'ios'?8:4,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        marginTop: Platform.OS === 'ios'?35:10,
        padding: 25,
        flex: Platform.OS === 'ios'?15:9,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    socialIcons: {
        flex: Platform.OS === 'ios'?4:1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: Platform.OS === 'ios'?10:20,
        marginLeft: 20,
        padding: 30,
        paddingTop: Platform.OS === 'ios'?30:0,
        flexDirection: 'row', 
        width: viewPortWidth, 
        height: Platform.OS === 'ios'?400:20,
        backgroundColor: 'transparent'
    },

    firstName: {
        width: 182,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginBottom: 15,
        position: 'absolute',
        left: 50,
        top: 0,
    },

    password:{
        width: 159,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginBottom: 15,
        marginTop: 10,
        position: 'absolute',
        left: 75,
        top: 85,
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
        marginTop: 0,
    },

    nameInputPassword: {
        width: 334,
        height: 57,
        borderRadius: 8,
        backgroundColor: '#f6f6f6',
        marginBottom: 15,
        padding: 10,
        marginTop: 25,
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
        flex: Platform.OS === 'ios'?4:2,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor:'transparent'
    },

    iconImageStyle:{
        backgroundColor: 'black',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconImageStyleInstagram:{
        backgroundColor: 'black',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    iconStyleInstagram: {
        width: 70,
        height: 70,
        borderRadius: 70,
        backgroundColor: 'black',
        // marginTop: viewPortHeight / 100,
        marginRight: 0,
        marginLeft: 0,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    iconStyle: {
        width: 70,
        height: 70,
        borderRadius: 70,
        backgroundColor: 'transparent',
        marginTop: viewPortHeight / 200,
        marginRight: 0,
        marginLeft: 0,
        marginTop: 0,
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