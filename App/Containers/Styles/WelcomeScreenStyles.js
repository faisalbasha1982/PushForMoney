import {Platform, StyleSheet, Dimensions } from 'react-native';
const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;
import { Colors } from "../../Themes";

const newStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    headerImage: {
        width: viewPortWidth,
        height: viewPortHeight * 0.55,
        flex: Platform.OS === 'ios'?32:27,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoContainer: {
        width: viewPortWidth,
        height: 50,
        flex: 8,
        padding: 20,
        paddingBottom: 10,
        marginTop: 25,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    workingText: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 12,
        flexDirection: 'column',
        height: viewPortHeight * 0.90,
        width: viewPortWidth,
        padding: 0,
        margin: 50,
    },

    languageText: {
        width: 316,
        height: 30,
        fontFamily: 'WorkSans-Medium',
        fontSize: 25,
        fontWeight: '500',
        color: '#e73d50',
        fontStyle: 'normal',
        lineHeight: 34,
        letterSpacing: 0,
        textAlign: 'center',
        flexDirection: 'column',        
        marginLeft: 15,
        marginRight: 15,
        marginTop: 0,
        marginBottom: 0,
    },

    languageTextBelow: {
        width: 316,
        height: 35,
        fontFamily: 'WorkSans-Medium',
        fontSize: 25,
        fontWeight: '500',
        color: '#e73d50',
        fontStyle: 'normal',
        lineHeight: 34,
        letterSpacing: 0,
        textAlign: 'auto',
        flexDirection: 'column',        
        marginLeft: 15,
        marginRight: 15,
        marginTop: 0,
        marginBottom: 0,
    },


    randomText: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'white',
        flex: 8,
        flexDirection: 'column',
        marginTop: 10,
    },

    rText: {
        width: 276,
        height: 57,
        fontFamily: 'WorkSans-Medium',
        fontSize: 16,
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'center',
    },

 
    buttons: {
        width: viewPortWidth,
        height: 157,
        flex: 10,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 25,
        marginTop: 35,        
        marginBottom:  10,
        paddingTop: 20,
    },

});

export default newStyle;