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
import CryptoJS from 'crypto-js';
import utf8 from 'utf8';
import Api from './Api';

import languageSettingsPFM from '../Containers/LanguageSettingsPFM';
import localStorage from 'react-native-sync-localstorage';


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

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


class PushToEarnOTPForgetPass extends Component {

    static propTypes = {
        language: PropTypes.string.isRequired
    }

    constructor(props)
    {
        super(props);             

        this.state = {
            language: 'NEDERLANDS',
            languageCode:'',
            isLoading: false,
            firstInput:'',
            secondInput:'',
            thirdInput:'',
            fourthInput:'',
            validation: false,
            renderValidate: false,
            passwordInput:'',
            confirmpasswordInput:'',
            phoneNumberInput:'',
            buttonText: 'START NOW!',
            ErrorText:'',
            EmptyErrorText:'',
            text:{}
        };    
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

    componentWillReceiveProps(nextProps) {

        // console.log("in Form One screen language received="+nextProps.language);
        // if (this.props.navigation.state.params.language !== nextProps.language) {
        //     this.setState({ language: nextProps.language });
        //     this.setText();
        // }
    }

    componentDidMount() {

        let language = localStorage.getItem('language');
        console.log('local storage language='+language);

        if(language === 'Dutch')
            this.setState({ text: languageSettingsPFM.Dutch, languageCode:'nl'});
        else
        if(language === 'English')
            this.setState({ text: languageSettingsPFM.English,languageCode:'en'});
        else
        if(language === 'French')
            this.setState({ text: languageSettingsPFM.French, languageCode:'fr'});

        // console.log("language from props="+this.props.navigation.state.params.language);
        // console.log("default language="+this.state.language);
        // this.setState({ language: this.props.navigation.state.params.language });
        // console.log("language="+this.state.language);
        // this.setText();
        // console.log("this.state.firstName="+this.state.firstName);
        // console.log("this.state.buttonText="+this.state.buttonText);
    }

    // setText =  () => {

    //     this.setState({language: this.props.navigation.state.params.language});
    //     console.log("this.state.language="+this.state.language);

    //     if (this.props.navigation.state.params.language === 'NEDERLANDS') {
    //         console.log("setting in Nederlands");
    //         this.setState({
    //             firstName:  LanguageSettings.dutch.firstNameText,
    //             name:       LanguageSettings.dutch.lastNameText,
    //             phoneNumber: LanguageSettings.dutch.telephoneNumberText,
    //             buttonText: LanguageSettings.dutch.buttonNextText
    //         });
    //     }
    //     else
    //         if (this.props.navigation.state.params.language === 'ENGLISH') {
    //             console.log("setting in English");
    //             this.setState({
    //                 firstName:  LanguageSettings.english.firstNameText,
    //                 name: LanguageSettings.english.lastNameText,
    //                 phoneNumber: LanguageSettings.english.telephoneNumberText,
    //                 buttonText: LanguageSettings.english.buttonNextText
    //             });
    //         }
    //         else
    //           {
    //             console.log("setting in French");
    //             this.setState({
    //                 firstName:  LanguageSettings.french.firstNameText,
    //                 name: LanguageSettings.french.lastNameText,
    //                 phoneNumber: LanguageSettings.french.telephoneNumberText,
    //                 buttonText: LanguageSettings.french.buttonNextText
    //             });
    //         }
    
       
    // }

    renderNothing = () => {

    }

    renderValidation = () => {

        //if(this.state.language === 'NEDERLANDS')

        console.log("empty error text="+this.state.EmptyErrorText);
        console.log("first Name Input="+this.state.firstNameInput);
        console.log("phone Number Input="+this.state.phoneNumberInput);

        let errorString = this.state.EmptyErrorText;

        if(this.state.firstNameError===true || this.state.firstNameInput === '')
            errorString = errorString + '\n' + this.state.firstNameErrorText;

        // if(this.state.lastNameError===true)
        //     errorString = errorString + '\n' + this.state.lastNameErrorText;

        if(this.state.phoneNumberError===true || this.state.phoneNumberInput==='')
            errorString = errorString + '\n' + this.state.phoneNumberErrorText;
            
            console.log("errorString="+errorString);
        
            if(this.state.firstNameEmptyError === false  && this.state.phoneNumberEmptyError === false && this.state.firstNameError===false && this.state.lastNameError===false && this.state.phoneNumberError===false )
                return (                        
                    <View style={newStyle.validationStyle}> 
                            <Validation
                                objectParams = 
                                {{
                                    'btnText': errorString, 
                                    'language': this.props.navigation.state.params.language,
                                    'backgroundColor':'transparent'
                                }} />
                    </View>
                );
            else
                return (                        
                    <View style={newStyle.validationStyle}> 
                            <Validation
                                objectParams = 
                                {{
                                    'btnText': errorString, 
                                    'language': this.props.navigation.state.params.language,
                                    'backgroundColor': 'normal'
                                }} />
                    </View>
            );
                
        return;

    }

    aes  = (authenticationData) => {
     
        const ivRandom = this.randomStringIV();
      
        // var key = CryptoJS.enc.Utf8.parse('VyhoMoGxi25xn/Tc');
        var key = CryptoJS.enc.Utf8.parse(Api.securityKey);
        var iv = CryptoJS.enc.Utf8.parse(ivRandom.toString());
        const ivFirstPart = ivRandom.substr(0,8);
        const ivLastPart = ivRandom.substring(8);
        console.log('first part='+ivFirstPart+ " Last part="+ivLastPart);
      
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(authenticationData), key,
            {
                keySize: 256 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
      
        var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            keySize: 256 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
      
        console.log('Encrypted :' + encrypted);
        console.log('Key :' + encrypted.key);
        console.log('Salt :' + encrypted.salt);
        console.log('iv :' + encrypted.iv);
        console.log('Decrypted : ' + decrypted);
        console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));
      
        return ivFirstPart + encrypted.toString() + ivLastPart;
     }

    getUTCDate = () => {
        //2018-04-30 11:30:12
    
        var date, day, month, year;
        var today = new Date();
    
        day = parseInt(today.getUTCDate())>10?today.getUTCDate():('0'+today.getUTCDate().toString());
        month = parseInt(today.getUTCMonth()+1)>10?parseInt(today.getUTCMonth()+1):('0'+parseInt(today.getUTCMonth()+1));
        year = today.getUTCFullYear().toString();
    
        // let currentDate = year + '-' + month>10?month:('0'+month) + '-' + day>10?day:('0'+day);
        let currentDate = year + '-'+month+'-'+ day;
    
        // Creating variables to hold time.
        var date, TimeType, hour, minutes, seconds, fullTime;
        
        // Getting current hour from Date object.
        hour = today.getUTCHours(); 
    
        if(hour < 10)
          hour = '0' + today.getUTCHours();
    
        // Getting the current minutes from date object.
        minutes = today.getUTCMinutes();
     
        // // Checking if the minutes value is less then 10 then add 0 before minutes.
        if(minutes < 10)
          minutes = '0' + minutes.toString();
     
        //Getting current seconds from date object.
        seconds = today.getUTCSeconds();
     
        // // If seconds value is less than 10 then add 0 before seconds.
        if(seconds < 10)
          seconds = '0' + seconds.toString();
     
        // Adding all the variables in fullTime variable.
        fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString();
    
        //var utcDate = new Date(Date.UTC(year,month-1,day,hour,minutes,seconds));
       
      //   Alert.alert('Day & Time UTC', currentDate+' '+fullTime);
    
        return currentDate+' '+fullTime;
      }

    randomStringIV = () => {

        let c = Math.random()*62;
        let rString = chars.substr(c,1);
     
          for(i=0;i<15;i++)
             rString = rString + chars.substr(Math.random()*62,1);
     
       return rString;
     }

     validatePassword = (password) => {

        console.log('password sent='+password);
        if(password.length >= 6 && !password.includes(" "))
        {
            this.setState({ passwordEmptyError: false, passwordInput: password, EmptyErrorText: '' });
        }
        else
            {
                console.log("password incorrect---->"+password);

                // Alert.alert(
                //     'Password is Incorrect',
                //     'Password needs to be atleast 6 characters and no spaces',
                //     [                      
                //         {
                //           text: 'OK', 
                //           onPress: () => console.log('Ask me later Pressed')
                //         },                      
                //     ],
                //     {cancelable: false}
                // );
            }            

    }

    validateConfirmPassword = (password) => {

        console.log('password sent='+password);
        if(password.length >= 6 && !password.includes(" "))
        {
            this.setState({ passwordEmptyError: false, confirmpasswordInput: password, EmptyErrorText: '' });
        }
        else
            {
                console.log("password incorrect---->"+password);

                Alert.alert(
                    'Password is Incorrect',
                    'Password needs to be atleast 6 characters and no spaces',
                    [                      
                        {
                          text: 'OK', 
                          onPress: () => console.log('Ask me later Pressed')
                        },                      
                    ],
                    {cancelable: false}
                );
            }            

    }

    somethingElse = () => {

    }

    callOTP = (mobileUserId) => {

        this.setState({isLoading:true});

        console.log("password=",this.state.passwordInput);
        console.log("confirm password=",this.state.confirmpasswordInput);

        if(this.state.passwordInput === this.state.confirmpasswordInput)
        {

            console.tron.log("calling OTP....");
            let otpString = this.state.firstInput + this.state.secondInput + this.state.thirdInput + this.state.fourthInput;

            let authData = AuthComponent.authenticationData(this.state.languageCode);
            let encryptedData = AesComponent.aesCallback(authData);
            let ltoken = localStorage.getItem('token');
            this.setState({isLoading: true});
    
            let payload = {

                "AuthenticationData": encryptedData,
                "MobileUserId" : mobileUserId,
                "OTP" : otpString,
                "NewPassword" : this.state.passwordInput,
                "ConfirmPassword" : this.state.confirmpasswordInput,

            };
                
            console.tron.log("payload="+payload);
            this.props.verifyOTPForgetPassword(payload);

        }
        else
        {

            Alert.alert(
                'Passwords MisMatch',
                 'Please Input matching passwords',
                [
                    { text: 'Please Login', onPress:() => console.log('user exists ask me later')}
                ],
                {
                    cancelable: false
                }
            );
        }
    }

    func = (renderValidate,EmptyErrorText) => {
      this.setState({renderValidate,EmptyErrorText});
    }

    render() {
        const platform = Platform.OS;
        const mobileUserId = this.props.navigation.state.params.mobileId;
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
                         {this.state.text.otpMessage} {'\n'}
                         {this.state.text.otpMessagecntd}
                    </Text>
                </View>

                <View style={newStyle.inputContainer}>

                    <View style={newStyle.numberBox}>
               
                    <TextInput
                                style={ newStyle.otpInput }
                                placeholder=''
                                returnKeyType= {"next"}
                                autoFocus = {true}
                                onSubmitEditing= {(event) => {this.refs.secondInput.focus();}}
                                maxLength={1}
                                autoCapitalize="none"
                                blurOnSubmit={false}
                                underlineColorAndroid= 'transparent'
                                onChangeText={(firstInput) => this.validateOTPText1(firstInput)}/>

                    {
                            this.state.isLoading===true?
                            <View style = {{position: 'absolute' , zIndex:3999, left: 10, top: 50, right: 0, bottom: 0}}>
                            <BarIndicator color='#e73d50' />
                            </View>:this.somethingElse()
                    }                      


                    <TextInput
                                style={ newStyle.otpInput }
                                placeholder=''
                                ref='secondInput'
                                returnKeyType= {"next"}
                                autoFocus = {true}
                                onSubmitEditing= {(event) => {this.refs.thirdInput.focus();}}
                                maxLength={1}
                                autoCapitalize="none"
                                blurOnSubmit={false}
                                underlineColorAndroid= 'transparent'
                                onChangeText={(secondInput) => this.validateOTPText2(secondInput)}/>
                    <TextInput
                                style={ newStyle.otpInput }
                                placeholder=''
                                ref='thirdInput'
                                returnKeyType= {"next"}
                                autoFocus = {true}
                                onSubmitEditing= {(event) => {this.refs.fourthInput.focus();}}
                                maxLength={1}
                                autoCapitalize="none"
                                blurOnSubmit={false}
                                underlineColorAndroid= 'transparent'
                                onChangeText={(thirdInput) => this.validateOTPText3(thirdInput)}/>
                    <TextInput
                                style={ newStyle.otpInput }
                                placeholder=''
                                ref='fourthInput'
                                returnKeyType= {"next"}
                                autoFocus = {true}
                                onSubmitEditing= {(event) => {this.refs.passwordInput.focus();}}
                                maxLength={1}
                                autoCapitalize="none"
                                blurOnSubmit={false}
                                underlineColorAndroid= 'transparent'
                                onChangeText={(fourthInput) => this.validateOTPText4(fourthInput)}/>                                                    
                    </View>

                     <View style= {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

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

                        <Text style={newStyle.firstName}>{this.state.text.Password}</Text>
                        <TextInput
                                style={ newStyle.nameInput }
                                placeholder=''
                                ref='passwordInput'
                                returnKeyType= {"next"}
                                autoFocus = {true}
                                onSubmitEditing= {(event) => {this.refs.confirmPasswordInput.focus();}}
                                underlineColorAndroid= 'transparent'
                                blurOnSubmit={false}
                                onChangeText={(passwordInput) => this.validatePassword(passwordInput)}/>

                        <Text style={newStyle.firstName}>{this.state.text.confirmPassword}</Text>
                        <TextInput
                                style={ newStyle.nameInput }
                                placeholder=''
                                ref='confirmPasswordInput'
                                returnKeyType= {"next"}
                                autoFocus = {true}
                                blurOnSubmit={false}
                                underlineColorAndroid= 'transparent'
                                onChangeText={(confirmpasswordInput) => this.validateConfirmPassword(confirmpasswordInput)}/>

                      <TouchableOpacity
                            onPress={() => { this.callOTP(mobileUserId) } }
                            activeOpacity={0.5}
                            style={{
                                width: 330,
                                height: 50,
                                marginBottom: 30,
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
                </View>
 
            </KeyboardAwareScrollView>:
            <ScrollView>
            <KeyboardAvoidingView
               style = {newStyle.container}
               behavior = "padding"
               enabled>
             {/* <View style={newStyle.container}> */}
            
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
                 {/* <TextInput
                     keyboardType= "numeric"
                     style={ newStyle.nameInput}
                     placeholder=''
                     underlineColorAndroid= 'transparent'
                     onChangeText= { (phoneNumberInput) => this.validatePhone(phoneNumberInput) }/>                 */}
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
        marginTop: Platform.OS === 'ios'?0:10,
        padding: 25,
        marginLeft: 0,
        flex: Platform.OS === 'ios'?40:1,
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
        width: 37,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#f6f6f6',
        padding: 10,
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
        flex: Platform.OS === 'ios'?5:4,
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
      verifyOTPForgetPassword: (payload) => dispatch({ type: 'VERIFY_OTP_FP', payload }),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnOTPForgetPass);


//   https://prod-36.westeurope.logic.azure.com/workflows/64111a66520a4621a4f949f0d3a12413/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EcEqv1IaEYCat3Jx3zeQ8HLQzUiuqK8QAzP0R8cJcPw