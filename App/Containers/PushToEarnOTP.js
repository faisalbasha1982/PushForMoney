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
    AsyncStorage
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
import ButtonWelcome from '../Components/ButtonWelcome';
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
import ButtonLogin from '../Components/ButtonLogin';
import TimerCountdown from 'react-native-timer-countdown';
import CountDown from 'react-native-countdown-component';

import languageSettingsPFM from '../Containers/LanguageSettingsPFM';
import localStorage from 'react-native-sync-localstorage';

import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';

import { Colors } from "../Themes";
import { Images } from '../Themes';

import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/page1.png';
import Icon from 'react-native-vector-icons/FontAwesome';


const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

// Styles

let cLanguage = '';

class PushToEarnOTP extends Component {

    // static propTypes = {
    //     language: PropTypes.string.isRequired
    // }

    constructor(props)
    {
        super(props);             

        this.state = {
            language: 'NEDERLANDS',
            languageCode:'',
            isLoading: false,
            validation: false,
            renderValidate: false,
            firstInput:'',
            secondInput:'',
            thirdInput:'',
            fourthInput:'',
            loginAccessToken:'',
            buttonText: 'START NOW!',
            ErrorText:'',
            EmptyErrorText:'',
            text:{},
            token:''
        };
    }

    componentWillMount() {

        this.getAsyncStorageToken();

    }

    setLanguage = () => {

        if(this.state.language === 'Dutch')
            this.setState({ text: languageSettingsPFM.Dutch, languageCode:'nl'});
        else
            if(this.state.language === 'English')
                this.setState({ text: languageSettingsPFM.English, languageCode:'en'});
        else
            if(this.state.language === 'French')
                this.setState({ text: languageSettingsPFM.French, languageCode:'fr'});

   }

     getAsyncStorageToken = async () => {

        await AsyncStorage.getItem('token').then((token) => {
            this.setState({ token: token});
        });

        await AsyncStorage.getItem('language').then((language) => {
            this.setState({ language: language});
        });

        this.setLanguage();
    }

    componentWillReceiveProps(nextProps) {

        if(this.props !== nextProps)
            this.getAsyncStorageToken();
        
    }

    

    componentDidMount() {

        this.getAsyncStorageToken();

    }

    validateOTPText1 = (text) => {

        var regExp = /^[A-Za-z0-9]+$/;

        if(regExp.test(text) === true )
            this.setState({ firstInput: text });
    }

    validateOTPText2 = (text) => {

        var regExp = /^[A-Za-z0-9]+$/;

        if(regExp.test(text) === true )
            this.setState({ secondInput: text });
    }

    validateOTPText3 = (text) => {

        var regExp = /^[A-Za-z0-9]+$/;

        if(regExp.test(text) === true )
            this.setState({ thirdInput: text });
    }

    validateOTPText4 = (text) => {

        var regExp = /^[A-Za-z0-9]+$/;

        if(regExp.test(text) === true )
            this.setState({ fourthInput: text });
    }

    callResendOTP = () => {

        this.setState({ isLoading: true});

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        console.log("authdata=",authData);

        let encryptedData = AesComponent.aesCallback(authData);
        console.log("encrypted data=",encryptedData);

        let payload = {
            "AuthenticationData": encryptedData,
            "LoginAccessToken": this.state.token,
            "SignupType": "S",
        };

        this.props.verifyOTPResend(payload);

    }        

    somethingElse = () => {
        
    }

    callOTP = async () =>  {

        console.tron.log("calling OTP....");

        await AsyncStorage.getItem('token').then((token) => {
            this.setState({ token: token});
        });

        this.setState({ isLoading: true});

        if(this.state.firstInput === '' || this.state.secondInput === '' || this.state.thirdInput === '' || this.state.fourthInput === '')
        {
            //Alert Box to fill in otp text
        }
        else
         {
            console.log("received payload for OTP screen=",payload);            
            let otpText = this.state.firstInput + this.state.secondInput + this.state.thirdInput + this.state.fourthInput;

            let authData = AuthComponent.authenticationData(this.state.languageCode);
            console.log("authdata=",authData);
    
            let encryptedData = AesComponent.aesCallback(authData);
            console.log("encrypted data=",encryptedData);

            let newpayload = "{" +"\"" + "AuthenticationData"+"\""+":"+ encryptedData +"\""+","+"\""+"LoginAccessToken"+"\""+":"+"\""+this.state.token+"\""+","+"\""+"OTP"+"\""+":"+ "\""+otpText+"\""+","+"\""+"OTPType"+"\""+":"+"\""+ "S"+"\"" + "}";
            console.tron.log("payload="+newpayload);
            this.props.verifyOTP(newpayload);

         }
    }

    render() {
        const platform = Platform.OS;
        // const payload  = this.props.navigation.state.params.payload;

        console.log("platform --->",Platform.OS);
        return (

            (platform === 'ios')?
            <KeyboardAwareScrollView
                behavior="padding"
                enableOnAndroid={false}
                contentContainerStyle={newStyle.container}
                scrollEnabled={true}
                scrollToEnd={true}
                enableResetScrollToCoords={true}
                enableAutomaticScroll={true}>
            
                <View style={newStyle.headerImage}>
                    <Image source={logoNew} resizeMode="contain" style={{ width: 225, height: 45 }} />
                </View>

                <View style= {{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text 
                        style={{
                            width: 334,
                            height: 34,
                            fontFamily: "WorkSans-Medium",
                            fontSize: 21,
                            fontWeight: "500",
                            fontStyle: "normal",
                            lineHeight: 34,
                            letterSpacing: 0,                          
                            textAlign: 'center',
                            color: "#E73D50"                        
                        }}>
                    {this.state.text.otp}
                    </Text>
                </View>                

                <View style={{
                  flex: 4, 
                  padding: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  marginTop: 25,
                }}>
                     <Text style={{
                           width: 333,
                           height: 57,
                           fontFamily: "WorkSans-Medium",
                           fontSize: 16,
                           fontWeight: "500",
                           fontStyle: "normal",
                           letterSpacing: 0.57,
                           textAlign: "center",
                           color: "#000000"
                     }}>
                         {this.state.text.otpMessage} 
                         {'\n'}
                         {this.state.text.otpMessagecntd}
                    </Text>
                </View>

                {
                    this.state.isLoading===true?
                    <View style = {{position: 'absolute' , zIndex:3999, left: 30, top: 0, right: 0, bottom: 0}}>
                    <BallIndicator color='#e73d50' />
                    </View>:this.somethingElse()
                }                       

                <View style={newStyle.inputContainer}>

                    <View style={newStyle.numberBox}>
               
                    <TextInput
                                style={ newStyle.otpInput }
                                placeholder=''
                                maxLength={1}
                                autoCapitalize="none"
                                autoFocus = {true}
                                blurOnSubmit={false}
                                returnKeyType={"next"}
                                underlineColorAndroid= 'transparent'
                                onChangeText={(firstInput) => this.validateOTPText1(firstInput)}/>


                    <TextInput
                                style={ newStyle.otpInput }
                                placeholder=''
                                maxLength={1}
                                autoCapitalize="none"
                                autoFocus = {true}
                                blurOnSubmit={false}
                                returnKeyType={"next"}
                                underlineColorAndroid= 'transparent'
                                onChangeText={(secondInput) => this.validateOTPText2(secondInput)}/>            

                    <TextInput
                                style={ newStyle.otpInput }
                                placeholder=''
                                maxLength={1}
                                autoCapitalize="none"
                                autoFocus = {true}
                                blurOnSubmit={false}
                                returnKeyType={"next"}
                                underlineColorAndroid= 'transparent'
                                onChangeText={(thirdInput) => this.validateOTPText3(thirdInput)}/>
                    <TextInput
                                style={ newStyle.otpInput }
                                placeholder=''
                                maxLength={1}
                                autoCapitalize="none"
                                autoFocus = {true}
                                blurOnSubmit={false}
                                returnKeyType={"next"}
                                underlineColorAndroid= 'transparent'
                                onChangeText={(fourthInput) => this.validateOTPText4(fourthInput)}/>                                                    
                    </View>
                    

                    <View style= {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                
                                {/* <CountDown
                                    until={600}
                                    onFinish={ () => alert('finished')}
                                    onPress={ () => alert('hello')}
                                    size={20}
                                    timeToShow={ ['M','S'] }
                                    /> */}

                                <TouchableOpacity
                                    onPress={() => { this.callResendOTP() } }
                                    activeOpacity={0.5}
                                    style={{
                                    width: 120,
                                    height: 20,
                                    marginBottom: 10,
                                    marginLeft: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }}>
                                    <Text
                                        style={{
                                            fontSize: 17,
                                            width: 120,
                                            height: 20,
                                            fontFamily: 'WorkSans-Regular',
                                            fontWeight: '500',
                                            fontStyle: 'normal',
                                            color:'#E73D50',
                                            marginTop: 0,
                                            letterSpacing: 0.67,
                                            textAlign: 'center'}}> Re-send.....
                                    </Text>
                                </TouchableOpacity>
                    </View>
                            
                    <View style={newStyle.endButtons}>

                      <TouchableOpacity
                            onPress={() => { this.callOTP() } }
                            activeOpacity={0.5}
                            style={{
                                width: 330,
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
                            > {this.state.text.start}</Text>
                        </TouchableOpacity>                        

                    </View>

                    <View style= {{ width: 334, height: 34,}}>
                            <Text style={{
                                 fontFamily: "WorkSans-Medium",
                                 fontSize: 21,
                                 fontWeight: "500",
                                 fontStyle: "normal",
                                 lineHeight: 34,
                                 letterSpacing: 0,                          
                                 textAlign: 'center',
                                 color: "#E73D50"       
                            }}> {this.state.text.contactSupport} </Text>
                    </View>

                    <View style = {{ width: 333, height: 95, }}>
                     <Text style= {{
                           fontFamily: "WorkSans-Medium",
                           fontSize: 16,
                           fontWeight: "500",
                           fontStyle: "normal",
                           letterSpacing: 0.57,
                           textAlign: "center",                         
                     }}>
                     Mauris de numero bent kend the berore rhelogic
                     halp pinses berore rhelogic did berore rhelogic
                     palse

                     </Text>
                     <Text style= {{
                         fontFamily: "WorkSans-Medium",
                         fontSize: 16,
                         marginTop: 10,
                         fontWeight: "500",
                         fontStyle: "normal",
                         letterSpacing: 0.57,
                         textAlign: "center",
                         color: "#E73D50"  
                     }}>support@jobfixers.be</Text>
                     </View>
                </View>
 
            </KeyboardAwareScrollView>:
            <ScrollView>
            <KeyboardAvoidingView
               style = {newStyle.container}
               behavior = "padding"
               enabled>
            
             <View style={newStyle.headerImage}>
                 <Image source={logoNew} resizeMode="contain" style={{ width: viewPortWidth, height: viewPortHeight * .45 }} />
                 {
                   (this.state.renderValidate === true)?this.renderValidation():this.renderNothing()
                 }
             </View>

             <View style={newStyle.inputContainer}>
            
                 <Text style={newStyle.firstName}>{this.state.firstName}</Text>
                 <TextInput
                             style={ newStyle.nameInput }
                             placeholder=''
                             underlineColorAndroid= 'transparent'
                             onChangeText={(firstNameInput) => this.validationFirstName(firstNameInput)}/>
                         

                 <Text style={newStyle.firstName}>{this.state.name}</Text>
                 <TextInput
                     style={ newStyle.nameInput}
                     placeholder=''
                     underlineColorAndroid= 'transparent'
                     onChangeText= { (lastNameInput) => this.setState({lastNameInput}) }/>

                 <Text style={newStyle.phoneNumberStyle}>{this.state.phoneNumber}</Text>

                 <PhoneInput 
                         ref='phone'
                         initialCountry='be'
                         style= {newStyle.nameInput}
                         onChangePhoneNumber = { (phoneNumberInput) => this.validatePhone(phoneNumberInput) } />


             </View>

            <View style={newStyle.endButtons}>

                <TouchableOpacity onPress={() => this.props.navigation.goBack() }
                    activeOpacity={0.5}
                    style={newStyle.iconStyle}>
                        <Icon
                            containerStyle={newStyle.iconImageStyle}                               
                            name='angle-left'
                            type='font-awesome'
                            color='#fff'
                            size = {40}
                            onPress={() => console.log('hello')} /> 
                </TouchableOpacity>

                <ButtonNext 
                            objectParams=
                                {{
                                    btnText: this.state.buttonText, 
                                    language: this.state.language,
                                    firstName: this.state.firstNameInput,
                                    lastName: this.state.lastNameInput,
                                    phoneNumber: this.state.phoneNumberInput,
                                    firstNameError: this.state.firstNameError,
                                    lastNameError: this.state.lastNameError,
                                    phoneNumberError: this.state.phoneNumberError,
                                    firstNameEmpty: this.state.firstNameEmptyError,
                                    lastNameEmpty: this.state.lastNameEmptyError,
                                    phoneNumberEmpty: this.state.phoneNumberEmptyError
                                }}
                            func = {this.func}
                            navigation = { this.props.navigation}
                />

            </View>
         </KeyboardAvoidingView>
         </ScrollView>

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
        width: viewPortWidth * 0.65,
        height: Platform.OS === 'ios'?40:120,
        flex: Platform.OS === 'ios'?8:8,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        backgroundColor: 'white',        
        width: viewPortWidth,
        marginTop: Platform.OS === 'ios'?25:10,
        padding: 25,
        marginLeft: 0,
        flex: Platform.OS === 'ios'?35:1,
        backgroundColor: 'transparent'
    },

    numberBox: {
        flex: Platform.OS === 'ios'?2:1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row'        
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

    otpInput: {
        width: 39,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#f6f6f6',
        padding: 7,
        margin: 10
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
        flex:1,
        padding: 0,
        height: Platform.OS === 'ios'?50:150,
        zIndex: 999,
        flex: Platform.OS === 'ios'?2:4,
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

const mapStateToProps = state => {
    return {
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {  
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      navigateBack: () => this.props.navigation.goBack(),
      verifyOTP: (payload) => dispatch({ type: 'VERIFY_OTP', payload }),
      verifyOTPResend: (payload) => dispatch({ type: 'VERIFY_OTP_RESEND',payload }),
      verfifyMobileOTP: (payload) => dispatch({ type: 'VERIFY_OTP_MOBILE',payload}),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnOTP);