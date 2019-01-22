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
    Alert,
    Platform,    
    AsyncStorage
} from 'react-native';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";
import ButtonNext from '../Components/ButtonNext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-input';
import localStorage from 'react-native-sync-localstorage';
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';
import CodeInput from 'react-native-confirmation-code-input';
import newStyle from './Styles/PushToEarnOTPRegisterStyles';
import logoNew from '../Images/page1.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

// Styles

let cLanguage = '';

class PushToEarnOTPRegister extends Component {

    static propTypes = {
        language: PropTypes.string.isRequired
    }

    constructor(props)
    {
        super(props);             

        this.state = {
            language: 'NEDERLANDS',
            languageCode:'',
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
            token:'',
            text:{},
            otpText:'',
            resend:false
        };    
    }

    componentWillReceiveProps(nextProps) {
        // console.log("in Form One screen language received="+nextProps.language);
        // if (this.props.navigation.state.params.language !== nextProps.language) {
        //     this.setState({ language: nextProps.language });
        //     this.setText();
        // }

    }

    componentWillMount() {

        this.getAsyncStorage();
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

    getAsyncStorage = async () => {

        await AsyncStorage.getItem('language').then((language) => {
            this.setState({ language: language });
        });

        this.setLanguage();

        await AsyncStorage.getItem('token').then((token) => {
            this.setState({ token: token });
        });
    }

    componentDidMount() {
        this.getAsyncStorage();

        let token = this.props.navigation.state.params.accessToken;

        this.setState({ token: token});

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

        if(otp.length === 4)
          this.setState({ otpText: otp });

    }

    clearOTP = () => {
        console.tron.log("inside clearOTP");

        this.setState({ otpText: '' });
        // this.setState({ resend: false });
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
            "SignupType": "R",
        };

        this.props.verifyOTPResend(payload);

        setTimeout( () => {
            this.setState({ resend: false});
        },200);

    }

    callOTP = () => {

        console.tron.log("calling OTP....");

        if(this.state.otpText === '')
        {
             Alert.alert("Please Enter Otp Text");
        }
        else
         {
            let authData = AuthComponent.authenticationData(this.state.languageCode);
            let encryptedData = AesComponent.aesCallback(authData);
  
            let token = this.props.navigation.state.params.accessToken;
            let phone = this.props.navigation.state.params.phone;
            let pPayload = this.props.navigation.state.params.payload;

            this.setState({ token: token});

            console.tron.log("otpstring="+this.state.otpText);
            console.tron.log("phone="+phone);
    
             let newPayload = {

                 "AuthenticationData": encryptedData,
                 "LoginAccessToken": token,
                 "OTP": this.state.otpText,
                 "OTPType" : "R",

             };

             this.props.verifyOTP(newPayload,phone,pPayload);

         }
    }

    render() {
        const platform = Platform.OS;

        console.log("platform --->",Platform.OS);
        console.log("text otp ="+this.state.text.otp);
        console.tron.log("text start="+this.state.text.start);
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
                            marginLeft: 10,
                            justifyContent: 'center',
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
                                    btnText: this.state.text.start,
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


const mapStateToProps = state => {
    return {
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {

      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      navigateBack: () => this.props.navigation.goBack(),
      verifyOTP: (payload,phone,pPayload) => dispatch({ type: 'VERIFY_OTP', payload, phone, pPayload }),
      verifyOTPResend: (payload) => dispatch({ type: 'VERIFY_OTP_RESEND',payload }),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnOTPRegister);