import React, { Component } from 'react'
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    Alert,
    Platform,    
    AsyncStorage
} from 'react-native';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import localStorage from 'react-native-sync-localstorage';
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';
import CodeInput from 'react-native-confirmation-code-input';
import logoNew from '../Images/page1.png';
import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';
import newStyle from './Styles/PushToEarnOTPLoginStyles';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

// Styles

let cLanguage = '';

class PushToEarnOTPLogin extends Component {

    static propTypes = {
        language: PropTypes.string.isRequired
    }

    constructor(props)
    {
        super(props);             

        this.state = {
            language: 'NEDERLANDS',
            validation: false,
            renderValidate: false,
            firstInput:'',
            secondInput:'',
            thirdInput:'',
            fourthInput:'',
            loginAccessToken:'',
            buttonText: '',
            ErrorText:'',
            EmptyErrorText:'',
            token:'',
            text:'',
            otpText:'',
            resend: false,
            otp: false,
            newotpText:'',
            clearValues: false,
        };    
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {

        this.getAsyncStorage();
    }

    setLanguage = () => {

        console.tron.log("language="+this.state.language);

        if(this.state.language === 'Dutch')
        {
            console.tron.log("language settings="+languageSettingsPFM.Dutch);
            this.setState({ text: languageSettingsPFM.Dutch, languageCode:'nl'});
            console.tron.log("text="+this.state.text.otp);
        }
        else
            if(this.state.language === 'English')
            {
                console.tron.log("language settings="+languageSettingsPFM.English);
                this.setState({ text: languageSettingsPFM.English, languageCode:'en'});
            }
        else
            if(this.state.language === 'French')
                this.setState({ text: languageSettingsPFM.French, languageCode:'fr'});

    }

    getAsyncStorage = async () => {

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);

        await AsyncStorage.getItem('language').then((language) => {
            this.setState({ language: language });
        });

        setTimeout(() => {
            this.setLanguage();
        },200);

        await AsyncStorage.getItem('token').then((token) => {
            this.setState({ token: token });
        });
    }

    componentDidMount() {
       
        this.getAsyncStorage();

        let token = this.props.navigation.state.params.accessToken;

        this.setState({ token: token});

        this.setLanguage();

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


    setOtp = (otp) => {

        console.tron.log("otp typed="+otp);
          this.setState({ otpText: otp });

    }

    setNewOtp = (otp) => {

        console.tron.log("otp in resend="+otp);

        this.setState({ resend: false, clearValues: !this.state.clearValues,});        

        if(otp.length === 4)
          this.setState({ otpText: otp, resend: false });

    }

    clearOTP = () => {
        console.tron.log("inside clearOTP");
        this.setState({ otpText: '' });
      }

    callResendOTP = () => {

        this.forceUpdate();

        this.setState({ resend: true, clearValues: true});

        console.tron.log("resend = "+this.state.resend);

        this.clearOTP();

        this.setState({ isLoading: true});

        let tokenLocalStorage = localStorage.getItem('token');
        this.setState({loginAccessToken:tokenLocalStorage});

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        console.log("authdata=",authData);

        let encryptedData = AesComponent.aesCallback(authData);
        console.log("encrypted data=",encryptedData);

        let payload = {
            "AuthenticationData": encryptedData,
            "LoginAccessToken": this.props.navigation.state.params.accessToken,
            "SignupType": "L",
        };

        this.props.verifyOTPResend(payload);

        setTimeout( () => {
            this.setState({ resend: false});
        },200);

    }

    callOTP = () => {

        console.tron.log("calling OTP....");

        this.setState({ otp: true});

        if(this.state.otpText === '')
        {
            Alert.alert("empty otp text!!");
        }
        else
         {
            let authData = AuthComponent.authenticationData(this.state.languageCode);
            let encryptedData = AesComponent.aesCallback(authData);

            let token = this.props.navigation.state.params.accessToken;
            console.tron.log("token="+token);
            this.setState({ token: token});

            console.tron.log("otpstring="+this.state.otpText);
    
             let newPayload = {

                 "AuthenticationData": encryptedData,
                 "LoginAccessToken": token,
                 "OTP": this.state.otpText,
                 "OTPType" : "L",

             };

             this.props.verifyOTP(newPayload);

         }
    }

    handleOTPChange = OTP => {
        console.tron.log("inside handleOTPChange otp="+OTP);

            if (OTP.length == 4) {
                this.setState({ otpText: OTP });
              //this.props.submitForm({ PhoneNo: this.props.registerFormValues.phoneNumber, OTP, dailCode: this.props.registerFormValues.dailCode });
            }
      };
    
      _onFinishCheckingCode1(isValid,code) {
        console.tron.log("isValid="+isValid);

        this.setState({ otpText: code});
      }
    
    renderOTP = () => {

        // this.setState({ resend:  });

        console.tron.log("in render OTP");

        if(this.state.otpText !== '')
         {
            this.setState({ resend: false});
         }

        return (

            <CodeInput
            ref="codeInputRef2"
            codeLength = {4}
            compareWithCode='AsDW'
            activeColor = 'rgb(0,0,0)'
            inactiveColor='rgba(0, 0, 0)'
            // activeColor='rgba(49, 180, 4, 1)'
            // inactiveColor='rgba(49, 180, 4, 1.3)'
            autoFocus={false}
            ignoreCase={true}
            inputPosition='center'
            size={50}
            resend = { this.state.resend }
            onFulfill={(code) => { this.setState({ otpText: code}) } }
            containerStyle={{ marginTop: 0 }}
            codeInputStyle={{ borderWidth: 1 }}
          />
        );
    }

    _onFulfill(code) {
        // TODO: call API to check code here
        // If code does not match, clear input with: this.refs.codeInputRef1.clear()
       this.setState({ otpText: code});
      }

      _onFinishCheckingCode2(isValid, code) {
        console.log(isValid);
        if (!isValid) {
            this.setState({ otpText: code });
        } else {
        
          Alert.alert(
            'Confirmation Code',
            'Successful!',
            [{text: 'OK'}],
            { cancelable: false }
          );
        }
      }
    

    render() {
        const platform = Platform.OS;
        console.tron.log("text="+this.state.text.otpMessage);
        console.tron.log("text otp ="+this.state.text.otp);
        console.tron.log("text start="+this.state.text.start);
        console.tron.log("login acces token="+this.props.navigation.state.params.accessToken);

        let elements = this.state;
        let btnText = this.state.text.start;

        console.log("platform --->",Platform.OS);
        return (

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
                     {
                         this.state.text.otpMessage 
                     } {'\n'}
                     {
                         this.state.text.otpMessagecntd
                     }
                    </Text>
                </View>

                <View style={newStyle.inputContainer}>

                    <View style={newStyle.numberBox}>     
                    {
                        <CodeInput
                        ref="codeInputRef2"
                        codeLength = {4}
                        compareWithCode='AsDW'
                        activeColor = 'rgb(0,0,0)'
                        inactiveColor='rgba(0, 0, 0)'
                        // activeColor='rgba(49, 180, 4, 1)'
                        // inactiveColor='rgba(49, 180, 4, 1.3)'
                        autoFocus={false}
                        ignoreCase={true}
                        inputPosition='center'
                        size={50}
                        resend = { this.state.resend }
                        onFulfill={(code) => { this.setState({ otpText: code}); } }
                        containerStyle={{ marginTop: 0 }}
                        codeInputStyle={{ borderWidth: 1 }}
                      />
                    }   
                    </View>

                    <View style={{
                     width: viewPortWidth*0.80,
                     height: 15,
                     flex:1,
                     backgroundColor: 'transparent',
                     justifyContent:'flex-start',
                     alignItems:'center'
                 }}>
                        <TouchableOpacity
                            onPress={() => { this.callResendOTP() } }
                            activeOpacity={0.5}
                            style={{
                            width: 120,
                            height: 10,
                            marginBottom: 0,
                            marginLeft: 20,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 17,
                                            width: 200,
                                            height: 20,
                                            fontFamily: 'WorkSans-Regular',
                                            fontWeight: '500',
                                            fontStyle: 'normal',
                                            color:'#E73D50',
                                            marginTop: 0,
                                            letterSpacing: 0.67,
                                            textAlign: 'center'}}> {this.state.text.resend}.....
                                    </Text>
                        </TouchableOpacity>
                </View>
                            
                    <View style={newStyle.endButtons}>

                      <TouchableOpacity
                            onPress={() => { this.callOTP() } }
                            activeOpacity={0.5}
                            style={{
                                width: Platform.OS==='ios'?330:310,
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
 
            </KeyboardAwareScrollView>       

        );
    }

}

const mapStateToProps = state => {
    return {
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {  

      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      navigateBack: () => this.props.navigation.goBack(),
      verifyOTP: (payload) => dispatch({ type: 'VERIFY_OTP_LOGIN', payload }),
      verifyOTPResend: (payload) => dispatch({ type: 'VERIFY_OTP_RESEND',payload }),

    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnOTPLogin);