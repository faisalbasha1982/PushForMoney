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
    Platform,    
    findNodeHandle,
    AsyncStorage,
} from 'react-native';

import { Container, Header, Content, Input, Item } from 'native-base';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";
import ButtonNext from '../Components/ButtonNext';
import ButtonLogin from '../Components/ButtonLogin';
import ButtonPushWelcome from '../Components/ButtonPushWelcome';
import ButtonWelcome from '../Components/ButtonWelcome';
import ButtonCardDetails from '../Components/ButtonCardDetails';
import LanguageButton from '../Components/LanguageButton';
import Spinner from "react-native-loading-spinner-overlay";
import DeviceInfo from 'react-native-device-info'
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import CompanyBanner from '../Components/CompanyBanner';
import Validation from '../Components/ButtonValidation';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-input';
import { ProfileSelectors } from '../Redux/ProfileRedux';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; 

import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';
import localStorage from 'react-native-sync-localstorage';
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';

import { Colors } from "../Themes";
import { Images } from '../Themes';

import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/NewHeaderImage.png';
import Icon from 'react-native-vector-icons/FontAwesome';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;
let ltoken = localStorage.getItem('token');


const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

let cLanguage = '';

class PushToEarnLanguageComponent extends Component {

    constructor(props)
    {
        super(props);             

        this.state = {
            language: '',
            languageCode:'',
            text:{},
        };    
    }   

    componentWillReceiveProps(nextProps) {

    }

    setLanguage = () => {

        if(this.props.language === 'Dutch')
            this.setState({ text: languageSettingsPFM.Dutch, languageCode:'nl'});
        else
            if(this.props.language === 'English')
                this.setState({ text: languageSettingsPFM.English, languageCode:'en'});
        else
            if(this.props.language === 'French')
                this.setState({ text: languageSettingsPFM.French, languageCode:'fr'});

   }

    componentDidMount() {    

        let language = localStorage.getItem('language');
        this.setLanguage();
        
    }


    renderNothing = () => {

    }

    changeLanguage = (language) => {

        console.log("language changing to --->"+language);

      if(language === 'FRANÇAIS')
      {
        localStorage.setItem("language",'French');
        AsyncStorage.setItem('language','French');
        this.props.menu(1,'French');
      }
      else
        if(language === 'NEDERLANDS')
        {
            localStorage.setItem("language",'Dutch');
            AsyncStorage.setItem('language','Dutch');
            this.props.menu(1,'Dutch');
        }
      else
        if(language === 'ENGLISH')
        {
            localStorage.setItem("language",'English');
            AsyncStorage.setItem('language','English');
            this.props.menu(1,'English');
        }

    }
      

    render() {
        const platform = Platform.OS;
        console.log("platform --->",Platform.OS);
        return (

                <View style= {newStyle.layoutBelow}>
                    <View style={newStyle.endButtons}>

                        <View style={newStyle.topView}>

                            <View style={{width: 80, height: 50, backgroundColor: 'transparent'}}>
                                <Text style= {newStyle.topText}>
                                        {this.state.text.changeLanguage}
                                </Text>
                            </View>

                            <View style={newStyle.languageTextContainer}>
                                <Text style={newStyle.languageText}> Choose your language!</Text>
                            </View>
 
                        </View>

                        <View style= {newStyle.inputContainer}>

                            <View style={{width: viewPortWidth*.80, height: 80, backgroundColor: 'transparent',flex:1,}}>
                                    <TouchableOpacity
                                            onPress={() => { this.changeLanguage(languageSettingsPFM.Dutch.languageText)  } }
                                            activeOpacity={0.5}
                                            style={{
                                                width: viewPortWidth*.80,
                                                height: 57,
                                                marginBottom: 0,
                                                marginLeft: 0,
                                                borderRadius: 8,
                                                backgroundColor: '#E73D50',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: 17,
                                                    width: 333,
                                                    height: 19,
                                                    fontFamily: 'WorkSans-Regular',
                                                    fontWeight: '500',
                                                    fontStyle: 'normal',
                                                    color: '#ffffff',
                                                    marginTop: 0,
                                                    letterSpacing: 0.67,
                                                    textAlign: 'center'}}
                                            > {languageSettingsPFM.Dutch.languageText} </Text>
                                        </TouchableOpacity>
                            </View>
                            <View style={{width: viewPortWidth*.80, height: 80, backgroundColor: 'transparent',flex:1,}} >
                            <TouchableOpacity
                                            onPress={() => { this.changeLanguage(languageSettingsPFM.English.languageText)  } }
                                            activeOpacity={0.5}
                                            style={{
                                                width: viewPortWidth*.80,
                                                height: 57,
                                                marginBottom: 10,
                                                marginLeft: 0,
                                                borderRadius: 8,
                                                backgroundColor: '#E73D50',
                                                marginTop: viewPortHeight / 20,
                                                justifyContent: 'center',
                                                alignItems: 'flex-start'
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: 17,
                                                    width: viewPortWidth*.80,
                                                    height: 19,
                                                    fontFamily: 'WorkSans-Regular',
                                                    fontWeight: '500',
                                                    fontStyle: 'normal',
                                                    color: '#ffffff',
                                                    marginTop: 0,
                                                    letterSpacing: 0.67,
                                                    textAlign: 'center'}}
                                            > {languageSettingsPFM.English.languageText} </Text>
                                        </TouchableOpacity>
                            </View>
                            <View style={{width: viewPortWidth*.80, height: 80, backgroundColor: 'transparent',flex:2}} >
                            <TouchableOpacity
                                            onPress={() => { this.changeLanguage(languageSettingsPFM.French.languageText)  } }
                                            activeOpacity={0.5}
                                            style={{
                                                width: viewPortWidth*.80,
                                                height: 57,
                                                marginBottom: 10,
                                                marginLeft: 0,
                                                borderRadius: 8,
                                                backgroundColor: '#E73D50',
                                                marginTop: viewPortHeight / 10,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: 17,
                                                    width: 333,
                                                    height: 19,
                                                    fontFamily: 'WorkSans-Regular',
                                                    fontWeight: '500',
                                                    fontStyle: 'normal',
                                                    color: '#ffffff',
                                                    marginTop: 0,
                                                    letterSpacing: 0.67,
                                                    textAlign: 'center'}}
                                            > {languageSettingsPFM.French.languageText} </Text>
                                        </TouchableOpacity>
                            </View>      

                              <View style={newStyle.emptyContainer}>
                                  <Text style={newStyle.languageText}></Text>
                            </View>
                        </View>

                    </View>
                
                </View>
                 
        );
    }

}

const newStyle = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: 'steelblue',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },

    innerContainer: {

        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginRight: 4,
        marginBottom: 5,
        
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
        width: viewPortWidth,
        height: Platform.OS === 'ios'?viewPortHeight * 0.51:
                                      viewPortHeight * 0.29,
        flex: Platform.OS === 'ios'?2:6,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    firstName: {
        width: 190,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginBottom: 1,
        marginTop: 5,
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

    nameInputFirst:{
        width: viewPortWidth*.83,
        height: 30,
        margin:0,
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        marginBottom: 0,
        padding: 0,
        flex:8,
    },

    nameInputEmail:{
        width: viewPortWidth*.78,
        height: 30,
        margin:0,
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        marginBottom: 0,
        padding: 0,
        flex:8,
    },

    nameInput: {
        width: viewPortWidth*.83,
        height: 30,
        margin:0,
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        marginBottom: 5,
        padding: 0,
        flex:8,
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

    layoutBelow: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },

    leftButtons:{
        width: 45,        
        backgroundColor: 'white',
        shadowColor: "rgba(216, 216, 216, 0.15)",
        shadowOffset: {
          width: 1,
          height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1,
        flex:2
  },

  leftButton: {
    width: 54,
    height: 111,
    backgroundColor: Colors.white,
    shadowColor: "rgba(216, 216, 216, 0.20)",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    marginBottom: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },

  leftButtonSelected: {
    width: 54,
    height: 111,
    backgroundColor: "rgb(246, 246, 246)",
    shadowColor: "rgba(216, 216, 216, 0.15)",
    shadowOffset: {
        width: 1,
        height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    marginBottom: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },

  endButtons: {
        width: viewPortWidth * 0.77,
        height: viewPortHeight * 0.70,
        zIndex: 999,
        flex: Platform.OS === 'ios'?11:4,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    inputContainer: {
        backgroundColor: 'transparent',
        width: 330,
        height: 34,
        flex: Platform.OS === 'ios'?6:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10,
    },

    topText: {
        width: 321,
        height: 34,
        fontFamily: "WorkSans-Medium",
        fontSize: 21,
        fontWeight: "600",
        fontStyle: "normal",
        lineHeight: 34,
        letterSpacing: 0,
        textAlign: "center",
        color: "rgb(231, 61, 80)"
    },

    topView: {
        width: viewPortWidth * 0.83,
        height: 68,
        flex:2,
        marginTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection:'column',
        backgroundColor:'transparent',
    },

    changeLanguage:{
        width: 180,
        height: 34,
        fontFamily: "WorkSans-Medium",
        fontSize: 10,
        fontWeight: "600",
        fontStyle: "normal",
        lineHeight: 34,
        letterSpacing: 0,
        textAlign: "right",
        color: "rgb(231, 61, 80)",
        borderBottomColor:'rgb(231, 61, 80)',
        borderBottomWidth:1,
        borderStyle:'solid'
    },

    emptyContainer:{
        width: viewPortWidth*0.80,
        height: 10,
        flex: 2,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems:'flex-start'        
    },

    languageTextContainer: {
        width: viewPortWidth*0.80,
        height: 10,
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems:'flex-start'
    },

languageText: {
        width: scale(viewPortWidth *0.80),
        height: verticalScale(40),
        fontFamily: 'WorkSans-Regular',
        fontSize: moderateScale(25),
        fontWeight: "400",
        fontStyle: 'normal',
        lineHeight: 46,
        letterSpacing: 0,
        textAlign: Platform.OS === 'ios'?'left':'left',
        marginLeft: Platform.OS === 'ios'?moderateScale(5):5,
    },


    paraView: {
        width: 276,
        height: 57,
        flex: 1,
    },

    buttonView: {
        flex: 7,
    },

    para: {
        width: 276,
        height: 57,
        fontFamily: "WorkSans-Medium",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.67,
        textAlign: "center",
        color: "rgb(53, 53, 53)",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    iconImageStyle:{
        width: 24,
        height: 16,
        fontFamily: "FontAwesome",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.67,
        textAlign: "left",
        color: "rgb(231, 61, 80)", 
        marginTop: 30,
        marginRight: 20,
        backgroundColor: 'powderblue'
    },

    iconStyle: {
        width: 30,
        height: 30,
        borderRadius: 0,
        backgroundColor: 'transparent',
        marginTop: viewPortHeight / 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },

    validationStyle:{
        position: 'absolute',
        top: 62,
        left: 35,
        width: 60,
        height: 60,    
    },
});

const mapStateToProps = state => {
    return {
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {  
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      navigateBack: () => this.props.navigation.goBack(),

    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnLanguageComponent);
