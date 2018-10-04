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
import localStorage from 'react-native-sync-localstorage';
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';
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

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

class PushToEarnOTPComponent extends Component {

    static propTypes = {
        language: PropTypes.string.isRequired
    }

    constructor(props)
    {
        super(props);             

        this.state = {
            language: 'NEDERLANDS',
            languageCode:'',
            phoneNumberInput:'',
            countryCode:'be',
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
            text:{},
            token:''
        };    
    }

    validatePhone = (phone) => {

        console.log("phone validation="+phone);

        let phoneSub = phone.substring(1);

        console.log("phone="+phoneSub);
        console.tron.log("phone="+phone);

        let reg = /^[0-9]{12}$/;
        let regNew = /^(?=(.*\d){10})(?!(.*\d){13})[\d\(\)\s+-]{10,}$/;

        if(phone === '')
        {
            this.setState({phoneNumberInput: ''});

            if(this.state.language === 'NEDERLANDS')
                this.setState({ phoneNumberEmptyError: true, EmptyErrorText: LanguageSettings.dutch.EmptyErrorText });
            else
                if(this.state.language === 'ENGLISH')
                    this.setState({ phoneNumberEmptyError: true, EmptyErrorText: LanguageSettings.english.EmptyErrorText });
                else
                    this.setState({ phoneNumberEmptyError: true, EmptyErrorText: LanguageSettings.french.EmptyErrorText });
        }
        else
        {
            let homePhone = /^((\+|00)32\s?|0)(\d\s?\d{3}|\d{2}\s?\d{2})(\s?\d{2}){2}$/;
            let mPhone = /^((\+|00)32\s?|0)4(60|[789]\d)(\s?\d{2}){3}$/;
    
            this.phoneText = this.state.country;
    
            if (regNew.exec(phoneSub))
            {
                this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: false, phoneNumberInput: phone, phoneNumberErrorText: '' });
                this.setState({isLoading:true});
                this.changeMobile(this.state.phoneNumberInput);
            }
            else
                if(this.state.languageCode === 'nl')
                    this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: true, phoneNumberErrorText: LanguageSettings.dutch.TelephoneNumberError });
                else
                    if(this.state.languageCode === 'en')
                        this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: true, phoneNumberErrorText: LanguageSettings.english.TelephoneNumberError });
                    else
                        this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: true, phoneNumberErrorText: LanguageSettings.french.TelephoneNumberError });
        }
    
    }

    changeMobile = (phoneNumber) => {

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);

        this.setState({isLoading: true});

        console.log("login access token="+ltoken);
        console.tron.log("login access token="+ltoken);

        let payload = {             
            "AuthenticationData": encryptedData,
            "LoginAccessToken":this.state.token,
            "NewMobileNumber": phoneNumber,
        };

        this.props.changeMobile(payload);
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
        
        if(this.props !== nextProps)
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

    componentDidMount() {

        let language = localStorage.getItem('language');
        console.log('local storage language='+language);

        this.getAsyncStorageToken();
        
    }

    componentWillMount() {
        this.getAsyncStorageToken();
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

    renderNothing = () => {

    }
    
    somethingElse = () => {

    }

    callOTP = () => {

        this.setState({isLoading:true});

        console.tron.log("calling OTP....");
        let otpString = this.state.firstInput + this.state.secondInput + this.state.thirdInput + this.state.fourthInput;

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);
        let ltoken = localStorage.getItem('token');

        let payload = {
                "AuthenticationData":encryptedData,
                "LoginAccessToken":this.state.token,
                "OTP": otpString,
                "OTPType" : "M",
            };

            console.tron.log("payload="+payload);
            this.props.verifyOTPChangeMobile(payload);

            setTimeout(() => {
                this.props.menu(1)
            },4000);
    }

    callResendOTP = () => {

        this.setState({ isLoading: true});

        let tokenLocalStorage = localStorage.getItem('token');
        this.setState({loginAccessToken:tokenLocalStorage});

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

    func = (renderValidate,EmptyErrorText) => {
      this.setState({renderValidate,EmptyErrorText});
    }

    render() {
        const platform = Platform.OS;
        console.log("platform --->",Platform.OS);
        return (

            <KeyboardAwareScrollView
                    behavior = "padding"
                    enableOnAndroid = { false }
                    contentContainerStyle={ newStyle.keyboardContainer }
                    scrollEnabled={true}>


            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
                <View style={{width: viewPortWidth*0.80, height: 50, backgroundColor: 'transparent', justifyContent:'center', alignItems:'center'}}>
                      <Text
                            style={{
                                width: 120,
                                height: 30,
                                fontFamily: "WorkSans-Medium",
                                fontSize: 18,
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
                <View style={{width: viewPortWidth*0.80, height: 100, backgroundColor: 'transparent', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{
                                        width: 310,
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
                <View style={{
                            width: viewPortWidth*0.80, 
                            height: 80, 
                            backgroundColor: 'transparent',
                            flexDirection:'row', 
                            justifyContent:'center', 
                            alignItems:'center'}}>                            
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

                <View style={{
                     width: viewPortWidth*0.80,
                     height: 15,
                     flex:1,
                     backgroundColor: 'transparent',
                     justifyContent:'center', 
                     alignItems:'center'
                 }}>
                        <TouchableOpacity
                            onPress={() => { this.callResendOTP() } }
                            activeOpacity={0.5}
                            style={{
                            width: 120,
                            height: 10,
                            marginBottom: 0,
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

                <View style={{
                      width: 280,
                      height: 60,
                      flex:4,
                      backgroundColor: 'transparent',
                      justifyContent:'flex-start',
                      alignItems:'flex-start'
                 }}>

                    {/* <PhoneInput
                        opacity={1}
                        ref={(ref) => { this.phone = ref; }}
                        initialCountry={this.state.countryCode}
                        onSelectCountry={(iso2) => { this.setState({countryCode: iso2}); console.log('country='+this.state.countryCode) }}
                        style= {newStyle.nameInput}
                        onChangePhoneNumber = { (phoneNumberInput) => this.validatePhone(phoneNumberInput) } 
                        value = {this.state.phoneNumberInput}
                        /> */}

                   <TouchableOpacity
                            onPress={() => { this.callOTP() } }
                            activeOpacity={0.5}
                            style={{
                                width: 280,
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
    </KeyboardAwareScrollView>
            // <View style= {newStyle.layoutBelow}>

            //             <View style={newStyle.inputContainer}>

            //                 <View style={newStyle.numberBox}>
                    
            //                 <TextInput
            //                             style={ newStyle.otpInput }
            //                             placeholder=''
            //                             returnKeyType= {"next"}
            //                             autoFocus = {true}
            //                             onSubmitEditing= {(event) => {this.refs.secondInput.focus();}}
            //                             maxLength={1}
            //                             autoCapitalize="none"
            //                             blurOnSubmit={false}
            //                             underlineColorAndroid= 'transparent'
            //                             onChangeText={(firstInput) => this.validateOTPText1(firstInput)}/>

            //                 {
            //                         this.state.isLoading===true?
            //                         <View style = {{position: 'absolute' , zIndex:3999, left: 10, top: 50, right: 0, bottom: 0}}>
            //                         <BarIndicator color='#e73d50' />
            //                         </View>:this.somethingElse()
            //                 }                      


            //                 <TextInput
            //                             style={ newStyle.otpInput }
            //                             placeholder=''
            //                             ref='secondInput'
            //                             returnKeyType= {"next"}
            //                             autoFocus = {true}
            //                             onSubmitEditing= {(event) => {this.refs.thirdInput.focus();}}
            //                             maxLength={1}
            //                             autoCapitalize="none"
            //                             blurOnSubmit={false}
            //                             underlineColorAndroid= 'transparent'
            //                             onChangeText={(secondInput) => this.validateOTPText2(secondInput)}/>
            //                 <TextInput
            //                             style={ newStyle.otpInput }
            //                             placeholder=''
            //                             ref='thirdInput'
            //                             returnKeyType= {"next"}
            //                             autoFocus = {true}
            //                             onSubmitEditing= {(event) => {this.refs.fourthInput.focus();}}
            //                             maxLength={1}
            //                             autoCapitalize="none"
            //                             blurOnSubmit={false}
            //                             underlineColorAndroid= 'transparent'
            //                             onChangeText={(thirdInput) => this.validateOTPText3(thirdInput)}/>
            //                 <TextInput
            //                             style={ newStyle.otpInput }
            //                             placeholder=''
            //                             ref='fourthInput'
            //                             returnKeyType= {"next"}
            //                             autoFocus = {true}
            //                             onSubmitEditing= {(event) => {this.refs.passwordInput.focus();}}
            //                             maxLength={1}
            //                             autoCapitalize="none"
            //                             blurOnSubmit={false}
            //                             underlineColorAndroid= 'transparent'
            //                             onChangeText={(fourthInput) => this.validateOTPText4(fourthInput)}/>                                                    
            //                 </View>

            //                 <View style= {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            //                 <TouchableOpacity
            //                             onPress={() => { this.callResendOTP() } }
            //                             activeOpacity={0.5}
            //                             style={{
            //                             width: 120,
            //                             height: 20,
            //                             marginBottom: 10,
            //                             marginLeft: 0,
            //                             justifyContent: 'center',
            //                             alignItems: 'center',
            //                             backgroundColor: 'transparent',
            //                         }}>
            //                             <Text
            //                                 style={{
            //                                     fontSize: 17,
            //                                     width: 120,
            //                                     height: 20,
            //                                     fontFamily: 'WorkSans-Regular',
            //                                     fontWeight: '500',
            //                                     fontStyle: 'normal',
            //                                     color:'#E73D50',
            //                                     marginTop: 0,
            //                                     letterSpacing: 0.67,
            //                                     textAlign: 'center'}}> Re-send.....
            //                             </Text>
            //                         </TouchableOpacity>
                    
            //             </View> 
                            

            //            //replace with phone Input

            //           <TouchableOpacity
            //                 onPress={() => { this.callOTP() } }
            //                 activeOpacity={0.5}
            //                 style={{
            //                     width: 330,
            //                     height: 50,
            //                     marginBottom: 30,
            //                     marginLeft: 0,
            //                     borderRadius: 8,
            //                     backgroundColor: '#E73D50',
            //                     marginTop: viewPortHeight / 30,            
            //                     justifyContent: 'center',
            //                     alignItems: 'center'
            //                 }}>
            //                 <Text
            //                     style={{
            //                         fontSize: 17,
            //                         width: 333,
            //                         height: 19,
            //                         fontFamily: 'WorkSans-Regular',
            //                         fontWeight: '500',
            //                         fontStyle: 'normal',
            //                         color: '#ffffff',
            //                         marginTop: 0,                
            //                         letterSpacing: 0.67,
            //                         textAlign: 'center'}}
            //                 > {this.state.text.start}</Text>
            //             </TouchableOpacity>

            //     </View>

            // </View>

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
        width: viewPortWidth * 0.80,
        height: viewPortHeight * 0.05,
        marginTop: Platform.OS === 'ios'?0:10,
        padding: 25,
        marginLeft: 10,
        flex: Platform.OS === 'ios'?4:1,
        backgroundColor: 'steelblue'
    },

    numberBox: {
        flex: Platform.OS === 'ios'?2:1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row'        
    },

    layoutBelow: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'transparent'
    },

    endButtons: {
        flex: Platform.OS === 'ios'?4:4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    topView: {
        width: viewPortWidth * 0.83,
        height: 10,
        flex:1,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'powderblue',
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
        width: 280,
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
      verifyOTPChangeMobile: (payload) => dispatch({ type: 'VERIFY_OTP_MOBILE', payload }),
      verifyOTPResend: (payload) => dispatch({ type: 'VERIFY_OTP_RESEND',payload }),
      changeMobile: (payload) => dispatch({ type: 'CHANGE_MOBILE', payload }),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnOTPComponent);


//   https://prod-36.westeurope.logic.azure.com/workflows/64111a66520a4621a4f949f0d3a12413/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EcEqv1IaEYCat3Jx3zeQ8HLQzUiuqK8QAzP0R8cJcPw