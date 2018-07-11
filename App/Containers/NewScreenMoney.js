import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  PixelRatio,
  Alert,
  Platform
} from 'react-native';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LanguageButton from '../Components/LanguageButton';
import Spinner from "react-native-loading-spinner-overlay";
import DeviceInfo from 'react-native-device-info';
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import CompanyBanner from '../Components/CompanyBanner';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; 
import { Colors } from "../Themes";
import { Images } from '../Themes';
import logo from '../Images/logoheader.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/NewHeaderImage.png';
import headerImage from '../Images/logojobfixersNew.png';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth  = Dimensions.get('window').width;

// Styles

export default class NewScreenMoney extends Component {    

    render()
    {
        const { navigate } = this.props.navigation;

        console.log("width="+viewPortHeight);
        console.log("height="+viewPortWidth);

        return(
                <View style={newStyle.container}>
                    <View style={newStyle.headerImageStyle}>
                      <Image source={logoNew} resizeMode="contain" style={{ width: viewPortWidth, height: viewPortHeight * .45 }} />
                    </View>

                    <View style={newStyle.newLogoContainer}>
                      <Image source={logoHeader} resizeMode="contain" style={{ width: viewPortWidth * 0.532, height: viewPortHeight * 0.06 }} />
                    </View>

                    <View style={newStyle.languageTextContainer}>
                      <Text style={newStyle.languageText}> Choose your language!</Text>
                    </View>

                <View style={newStyle.buttons}>
                      <LanguageButton language={LanguageSettings.dutch.languageText} navigation={this.props.navigation} />
                      <LanguageButton language={LanguageSettings.french.languageText} navigation={this.props.navigation} />
                      <LanguageButton language={LanguageSettings.english.languageText} navigation={this.props.navigation} />
                </View>
              </View>
        );
    }

}

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

});