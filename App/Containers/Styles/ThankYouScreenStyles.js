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
        flex: Platform.OS==='ios'?28:23,
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

    languageTextContainer: {
        width: viewPortWidth,
        height: 50,
        flex: 2,
        backgroundColor: 'powderblue',
        justifyContent: 'flex-end',
        marginTop: 10,
        padding: 10,
    },

    thankYouText: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 5,
        flexDirection: 'column',
        height: viewPortHeight * 0.50,
        width: viewPortWidth,
        padding: 17,
        margin: 50,
        marginTop: 80
    },

    languageText: {
        width: 316,
        height: 140,
        fontFamily: 'WorkSans-Regular',
        fontSize: 28,
        fontWeight: '500',
        color: '#e73d50',
        fontStyle: 'normal',
        lineHeight: 34,
        letterSpacing: 0,
        textAlign: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginLeft: 15,
        marginRight: 15,
    },

    randomText: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 8,
        flexDirection: 'column',
        marginTop: 10,
    },

    rText: {
        width: 148,
        height: 25,
        fontFamily: 'WorkSans-Medium',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'normal',
        letterSpacing: 0.8,
        textAlign: 'center',
    },


    buttons: {
        width: viewPortWidth,
        height: 157,
        flex: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 15,
        marginRight: 25,
        marginTop: 0,        
        marginBottom:  10,
        paddingTop: 0,
        paddingLeft: 15
    },

});

export default newStyle;