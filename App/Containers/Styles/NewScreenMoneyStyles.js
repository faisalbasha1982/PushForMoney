import {Platform, StyleSheet, Dimensions } from 'react-native';
const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;
import { Colors } from "../../Themes";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; 

const newStyle = StyleSheet.create({

    container: {
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
    },

    headerImageStyle: {
        width: viewPortWidth,
        height: viewPortHeight * 0.45,
        flex: Platform.OS === 'ios'?24:20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoContainer: {
                width: viewPortWidth, 
                height: 50, 
                flex: 4, 
                backgroundColor: 'white', 
                justifyContent: 'center', 
                alignItems: 'center',
                marginTop: "18.6%"
    },

    newLogoContainer: {
        width: viewPortWidth,
        height: 50,
        flex: 8,
        padding: 20,
        paddingBottom: 10,
        marginTop: 25,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    languageTextContainer: {
                width: viewPortWidth, 
                height: 50, 
                flex: 6, 
                backgroundColor: 'white',
                justifyContent: 'flex-end'
    },
    languageText: {
                width: scale(viewPortWidth),
                height: verticalScale(46) ,
                fontFamily: 'WorkSans-Regular',
                fontSize: moderateScale(30),
                fontWeight: "400",
                fontStyle: 'normal',
                lineHeight: 46,
                letterSpacing: 0,
                textAlign: Platform.OS === 'ios'?'left':'left',
                marginLeft: Platform.OS === 'ios'?moderateScale(15):5,
                marginTop: moderateScale(15)
    },

    buttons: {
                width: viewPortWidth * 0.98, 
                height: 87, 
                flex: 26, 
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 25 ,
                marginRight: 25,
                marginTop: 25,
                marginBottom: viewPortHeight * 0.05,
    },

})

export default newStyle;