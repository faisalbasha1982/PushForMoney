import {Platform, StyleSheet, Dimensions } from 'react-native';
const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;
import { Colors } from "../../Themes";

const newStyle = StyleSheet.create({

    container: {
                flex: 1,
                backgroundColor: '#fad704',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 45
    },

    topContainer: {
                flex:5,   
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 35,
                backgroundColor: 'transparent'
    },

    logoBottom: {
                flex:3,
                alignItems: 'center',
                justifyContent: 'center',
                width:99.7,
                height: 20,
    },

    pushContainer: {
        width: 238,
        height: 75,
        flex:16,
    },

    bottomContainer: {
                flex:12,
                width: viewPortWidth,
                height: viewPortHeight * 0.85,                
                alignItems: 'center',
                justifyContent: 'center',
    },

    newBottomContainer:{
        flex:14,
        width: viewPortWidth,
        height: viewPortHeight * 0.85,
        alignItems: 'center',
        justifyContent: 'center'
    },

    button: {
                backgroundColor: 'red',
                flex:1,                
                borderColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                width:viewPortWidth,
                height: viewPortHeight * 0.85,        
    },

    box: {
                flex:1,
                alignItems: 'center',
                justifyContent: 'center',
                height: viewPortHeight * 0.85,
                width: viewPortWidth,
                backgroundColor: '#fff'                
    },

    jobText: {
        width:155,
        height:114,
        fontFamily: 'barlowsemicondensed-extrabold',
        fontSize: 95,
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#fad704",
        textShadowColor: "#07438f",
        textShadowOffset: {
            width: 3,
            height: 5
        },
        textShadowRadius: 0
    },

    pushStyle: {
                width: 130,
                height: 237,
                fontFamily: 'barlowsemicondensed-extrabold',
                fontSize: 60,
                fontStyle: "normal",
                fontWeight: "800",
                lineHeight: 75,
                letterSpacing: 0,
                textAlign: "center",
                color: "#e73d50",
                textShadowColor:"#07438f",
                textShadowOffset: {
                    width: 3,
                    height: 5
                },
                textShadowRadius: 0           
    },

});

export default newStyle;