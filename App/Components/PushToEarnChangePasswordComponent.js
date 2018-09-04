import React, { Component } from 'react';
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
} from 'react-native';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';
import { Container, Header, Content, Input, Item } from 'native-base';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";
import ButtonNext from '../Components/ButtonNext';
import ButtonLogin from '../Components/ButtonLogin';
import ButtonPushWelcome from '../Components/ButtonPushWelcome';
import ButtonPushNoFriends from '../Components/ButtonPushNoFriends';
import ButtonWelcome from '../Components/ButtonWelcome';
import LanguageButton from '../Components/LanguageButton';
import Spinner from "react-native-loading-spinner-overlay";
import DeviceInfo from 'react-native-device-info';
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import CompanyBanner from '../Components/CompanyBanner';
import Validation from '../Components/ButtonValidation';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-input';

import { Colors } from "../Themes";
import { Images } from '../Themes';

import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/NewHeaderImage.png';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';
import localStorage from 'react-native-sync-localstorage';
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

let cLanguage = '';

class PushToEarnChangePasswordComponent extends Component {

    constructor(props)
    {
        super(props);             

        this.state = {
            language: '',
            languageCode: '',
            oldPassword:'',
            newPassword:'',
            confirmNewPassword: '',
            isLoading:false,
            buttonText: 'CHANGE PASSWORD',
            text:{}
        };    
    }
    somethingElse = ( ) => {

    }

    changePassword = () => {

        this.setState({isLoading: true});

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);
        let ltoken = localStorage.getItem('token');

        if(this.state.newPassword === this.state.confirmNewPassword)
        {
            let payload = {
                "AuthenticationData": encryptedData,
                "LoginAccessToken": ltoken,
                "OldPassword": this.state.oldPassword,
                "NewPassword": this.state.newPassword,            
            };

            this.props.changePassword(payload);
            this.props.menu(1);
        }
        else
        {
            Alert.alert("Your Passwords Don't Match");
            this.setState({isLoading: false});
        }

    }


    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {

        let language = localStorage.getItem('language');
        console.log('local storage language='+language);

        if(language === 'Dutch')
            this.setState({ text: languageSettingsPFM.Dutch, languageCode: 'nl'});
        else
            if(language === 'English')
            this.setState({ text: languageSettingsPFM.English, languageCode: 'en'});            
        else
            if(language === 'French')
            this.setState({ text: languageSettingsPFM.French, languageCode: 'fr'});

    }

    renderNothing = () => {

    }


    render() {
        const platform = Platform.OS;
        console.log("platform --->",Platform.OS);
        console.log("text="+this.state.text.myProfile);

        return (
                    <View style={newStyle.endButtons}>     

                        <View style={newStyle.topView}>
                            <Text style= {newStyle.topText}>           
                                    {this.state.text.myProfile}
                            </Text>    
                        </View>

                        <View style= {newStyle.inputContainer}>

                            <Text style={newStyle.firstName}>{this.state.text.oldPassword}</Text>
                            <TextInput
                                        style={ newStyle.nameInput }
                                        placeholder=''
                                        underlineColorAndroid= 'transparent'
                                        onChangeText={(oldPassword) => this.setState({oldPassword})}/>
                                    
                            <Text style={newStyle.firstName}>{this.state.text.newPassword}</Text>
                            <TextInput
                                style={ newStyle.nameInput}
                                placeholder=''
                                underlineColorAndroid= 'transparent'
                                onChangeText= { (newPassword) => this.setState({newPassword}) }/>

                              {
                                    this.state.isLoading===true?
                                    <View style = {{position: 'absolute' ,left: 30, top: 0, right: 0, bottom: 0}}>
                                    <BarIndicator color='#e73d50' />
                                    </View>:this.somethingElse()
                              }      

                            <Text style={newStyle.firstName}>{this.state.text.confirmPassword}</Text>
                            <TextInput
                                style={ newStyle.nameInput}
                                placeholder=''
                                underlineColorAndroid= 'transparent'
                                onChangeText= { (confirmNewPassword) => this.setState({confirmNewPassword}) }/>

                        </View>

                        <View style={newStyle.buttonView}>
                                <TouchableOpacity
                                    onPress={() => { this.changePassword() } }
                                    activeOpacity={0.5}
                                    style={{
                                        width: 280,
                                        height: 57,
                                        marginBottom: 10,
                                        marginLeft: 0,
                                        borderRadius: 8,
                                        backgroundColor: '#E73D50',
                                        marginTop: viewPortHeight / 30,
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
                                    > {this.state.text.changePassword}</Text>
                                </TouchableOpacity>           
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
        width: 290,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginBottom: 15
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
        width: 280,
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

    layoutBelow: {
        flex: 4,
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
        backgroundColor: 'white',
        flex: Platform.OS === 'ios'?18:1,        
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
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
        width: 276,
        height: 68,
        flex:2,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
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
        width: 13,
        height: 16,
        fontFamily: "FontAwesome",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.67,
        textAlign: "center",
        color: "rgb(231, 61, 80)", 
        marginTop: 30,
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
      changePassword: (payload) => dispatch({type:'CHANGE_PASSWORD',payload})
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnChangePasswordComponent);