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
import headerImage from '../Images/logojobfixersNew.png';
import newStyle from './Styles/NewScreenStyles';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth  = Dimensions.get('window').width;

// Styles

export default class NewScreen extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            language:''
        }

    }


    componentWillMount() {
        this.getAsyncStorage();
    }

    getAsyncStorage = async () => {

        await AsyncStorage.getItem('language').then((language) => {
            this.setState({ language: language })
          });

    }

    componentDidMount() {


    }


    render()
    {
        const { navigate } = this.props.navigation;

        console.log("width="+viewPortHeight);
        console.log("height="+viewPortWidth);

        return(

                (this.state.language === '')?
                <View style={newStyle.container}>
                    <View style={newStyle.headerImageStyle}>
                      <Image source={headerImage} resizeMode="contain" style={{ width: viewPortWidth, height: viewPortHeight * .45 }} />
                    </View>

                    <View style={newStyle.newLogoContainer}>
                      <Image source={logoHeader} resizeMode="contain" style={{ width: viewPortWidth * 0.532, height: viewPortHeight * 0.06 }} />
                    </View>

                    <View style={newStyle.languageTextContainer}>
                      <Text style={newStyle.languageText}> Choose your language!</Text>
                    </View>

                <View style={newStyle.buttons}>
                      <LanguageButton language={LanguageSettings.dutch.languageText} navigation={this.props.navigation} app={0} />
                      <LanguageButton language={LanguageSettings.french.languageText} navigation={this.props.navigation} app={0}/>
                      <LanguageButton language={LanguageSettings.english.languageText} navigation={this.props.navigation} app={0}/>
                </View>
              </View>
              :
              this.props.navigation.navigate("FormOne",{language: this.state.language,navigation: this.props.navigation})
        );
    }

}
