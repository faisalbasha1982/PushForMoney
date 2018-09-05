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
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterActions, { RegisterSelectors } from "../Redux/RegisterRedux";
import NavigationService from '../Navigation/NavigationService';
import PhoneInput from 'react-native-phone-input';
import ButtonLogin from '../Components/ButtonLogin';
import ButtonSignUp from '../Components/ButtonSignUp';
import CryptoJS from 'crypto-js';
import utf8 from 'utf8';
import Api from './Api';
import localStorage from 'react-native-sync-localstorage';

import { Colors } from "../Themes";
import { Images } from '../Themes';

import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/page1.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setContext } from '../../node_modules/redux-saga/effects';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

let cLanguage = '';
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

class PushToEarnRegisterProfile extends Component {

    static propTypes = {
        language: PropTypes.string.isRequired,
        uname: PropTypes.string.isRequired,
        pword: PropTypes.string.isRequired,
    }

    constructor(props)
    {
        super(props);             

        this.state = {
            language: 'NEDERLANDS',
            languageCode:'',
            isLoading: false,
            firstName:'',
            name:'',
            phoneNumber:'',
            validation: false,
            renderValidate: false,
            firstNameInput:'',
            lastNameInput:'',
            phoneNumberInput:'',
            usernameInput:'',
            passwordInput:'',
            buttonText: 'I\'M READY!',
            firstNameError:true,
            firstNameErrorText:'',            
            lastNameError:false,
            lastNameErrorText:'',
            phoneNumberError:true,
            phoneNumberErrorText:'',
            ErrorText:'',
            EmptyErrorText:'',
            firstNameEmptyError:false,
            lastNameEmptyError:false,
            phoneNumberEmptyError:false,
            text:{}
        };    
    }

    validationLastName = (name) => {

        let reg = /^[a-zA-Z\s]+$/;

        console.log("last name="+name);

        if(name === '')
        {
            //this.setState({ lastNameError: true, ErrorText: 'Last Name is Required' });
            this.setState({lastNameInput: ''});

            if(this.state.language === 'NEDERLANDS')
                this.setState({ lastNameEmptyError: true, EmptyErrorText: LanguageSettings.dutch.EmptyErrorText });
            else
                if(this.state.language === 'ENGLISH')
                    this.setState({ lastNameEmptyError: true, EmptyErrorText: LanguageSettings.english.EmptyErrorText });
                else
                    this.setState({ lastNameEmptyError: true, EmptyErrorText: LanguageSettings.french.EmptyErrorText });
        }
        else
        {

            if(reg.exec(name))
            {
              this.setState({ lastNameEmptyError: false, EmptyErrorText: '',lastNameError: false, lastNameInput: name,lastNameErrorText:'' });
            }
            else
            {
                console.log("found digits");
              if(this.state.language === 'NEDERLANDS')
                  this.setState({ lastNameEmptyError: false, lastNameError: true, lastNameErrorText: LanguageSettings.dutch.LNameErrorText });
              else
                  if(this.state.language === 'ENGLISH')
                      this.setState({ lastNameEmptyError: false, lastNameError: true,lastNameErrorText: LanguageSettings.english.LNameErrorText });
                  else
                      this.setState({ lastNameEmptyError: false, lastNameError: true,lastNameErrorText: LanguageSettings.french.LNameErrorText });
            }    
        }    
    } 

    validationFirstName = (name) => {

        let reg = /^[a-zA-Z\s]+$/;

        console.log("validating First Name="+name);

        if(name === '')
        {
            console.log("First name is empty="+name);
            console.log("Language ="+this.state.language);
            this.setState({firstNameInput: ''});
            //this.setState({ firstNameError: true, ErrorText: 'First Name is Required' });
            if(this.state.language === 'NEDERLANDS')
                this.setState({ firstNameEmptyError: true, EmptyErrorText: LanguageSettings.dutch.EmptyErrorText });
            else
                if(this.state.language === 'ENGLISH')
                    this.setState({ firstNameEmptyError: true, EmptyErrorText: LanguageSettings.english.EmptyErrorText });
                else
                    this.setState({ firstNameEmptyError: true, EmptyErrorText: LanguageSettings.french.EmptyErrorText });
        }
        else
        {
            if(reg.exec(name))
            {
              this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: false, firstNameInput: name, firstNameErrorText:'' });
            }
            else
            {
              if(this.state.language === 'NEDERLANDS')
                  this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: true, firstNameErrorText: LanguageSettings.dutch.FNameErrorText });
              else
                  if(this.state.language === 'ENGLISH')
                      this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: true, firstNameErrorText: LanguageSettings.english.FNameErrorText });
                  else
                      this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: true, firstNameErrorText: LanguageSettings.french.FNameErrorText });
            }
        }        
    }

    validatePhone = (phone) => {

        console.log("phone="+phone);

        let phoneSub = phone.substring(1);

        console.log("phone="+phoneSub);

        let reg = /^[0-9]{12}$/;
        let regNew = /^(?=(.*\d){10})(?!(.*\d){13})[\d\(\)\s+-]{10,}$/;

        if(phone === '')
        {
            //this.setState({ phoneNumberError: true, ErrorText: 'Phone Number is Required' });
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
            // home phone number belgium
            let homePhone = /^((\+|00)32\s?|0)(\d\s?\d{3}|\d{2}\s?\d{2})(\s?\d{2}){2}$/;
            // mobile phone number belgium
            let mPhone = /^((\+|00)32\s?|0)4(60|[789]\d)(\s?\d{2}){3}$/;
    
            this.phoneText = this.state.country;
    
            if (regNew.exec(phoneSub))
              this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: false, phoneNumberInput: phone, phoneNumberErrorText: '' });
            else
                if(this.state.language === 'NEDERLANDS')
                    this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: true, phoneNumberErrorText: LanguageSettings.dutch.TelephoneNumberError });
                else
                    if(this.state.language === 'ENGLISH')
                        this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: true, phoneNumberErrorText: LanguageSettings.english.TelephoneNumberError });
                    else
                        this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: true, phoneNumberErrorText: LanguageSettings.french.TelephoneNumberError });
        }
    
        // if (homePhone.exec(phone))
        //   this.setState({ phoneError: false, phone: phone });
        // else
        //   this.setState({ phoneError: true });
    
    }

    PhoneNumberPickerChanged = (country, callingCode, phoneNumber) => {
        this.setState({countryName: country.name, callingCode: callingCode, phoneNo:phoneNumber});
     }

    componentWillReceiveProps(nextProps) {
        // console.log("in Form One screen language received="+nextProps.language);
        // if (this.props.navigation.state.params.language !== nextProps.language) {
        //     this.setState({ language: nextProps.language });
        //     this.setText();
        // }

        if(nextProps != this.props)
            {
                console.log("usrname=",this.props.navigation.state.params.uname);
                console.log("password=",this.props.navigation.state.params.pword);   

                this.setText();
            }

    }

    componentDidMount() {

        console.log("usrname=",this.props.navigation.state.params.uname);
        console.log("password=",this.props.navigation.state.params.pword);
        this.setText();

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

    }

    setText =  () => {

        let payload = this.props.navigation.state.params.payload;

        let firstname = payload.firstname;
        let lastname = payload.lastname;
        let email = payload.email;
        let id = payload.id;

        if (this.state.language === 'NEDERLANDS') {
            console.log("setting in Nederlands");
            this.setState({
                firstNameInput: firstname,
                lastNameInput: lastname,
                usernameInput: email,
            });
        }
        else
            if (this.state.language === 'ENGLISH') {
                console.log("setting in English");
                this.setState({
                    firstNameInput: firstname,
                    lastNameInput: lastname,
                    usernameInput: email,                    
                });
            }
            else
              {
                console.log("setting in French");
                this.setState({
                    firstNameInput: firstname,
                    lastNameInput: lastname,
                    usernameInput: email,                    
                });
            }   
    }

    renderNothing = () => {

    }

    randomStringIV = () => {

        let c = Math.random()*62;
        let rString = chars.substr(c,1);
     
          for(i=0;i<15;i++)
             rString = rString + chars.substr(Math.random()*62,1);
     
       return rString;
     }

    aes  = (authenticationData) => {
     
        const ivRandom = this.randomStringIV();
      
        var key = CryptoJS.enc.Utf8.parse(Api.securityKey);
        var iv = CryptoJS.enc.Utf8.parse(ivRandom.toString());
        const ivFirstPart = ivRandom.substr(0,8);
        const ivLastPart = ivRandom.substring(8);
              
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
      
        return ivFirstPart + encrypted.toString() + ivLastPart;
     }

    getUTCDate = () => {
            
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

    callPrivateScreen = (payload) => {

        this.setState({ isLoading: true});

        let signUpData = "\"SignUpData\":" +"\""+this.aes("{ 'FName' : "+"'"+this.state.firstNameInput+"'" + ", 'LName' : "+"'"+this.state.lastNameInput+"'"+", 'Mob':"+"'"+this.state.phonenumberInput+"'"+",'Approval':'true','Device':'ios','D':'"+this.getUTCDate()+"','R' : 'er3rssf3dfd'}") +"\"";

        console.log("signUpData=",signUpData);

        console.log("encrypted signup data="+this.aes("{ 'FName' : "+this.state.firstNameInput+", 'LName' : "+this.state.lastNameInput+", 'Mob':"+this.state.phonenumberInput+",'Approval':'true','Device':'ios','D':'"+this.getUTCDate()+"','R' : 'er3rssf3dfd'}"));
        console.log("payload passed to private policy=",payload);

        let newPayload = payload.substring(1,payload.length-1);
        console.log("newpayload="+newPayload);

        let payloadArray = newPayload.split(",");
        console.log("payloadArray="+payloadArray[0]);

        let finalPayload = "{" + payloadArray[0] + "," + payloadArray[1] + "," + signUpData + "}";

        console.log("finalPayload = "+finalPayload);

        this.props.navigation.navigate('PushToEarnPrivatePolicy',{payload: finalPayload});

    }

    somethingElse = () => {

    }


    render() {

        const platform = Platform.OS;
        const username = this.props.navigation.state.params.uname;
        const password = this.props.navigation.state.params.pword;
        let payload  = this.props.navigation.state.params.payload;

        console.log("username received in register profile="+this.props.navigation.state.params.uname);
        console.tron.log("username received in register profile="+this.props.navigation.state.params.uname);
        console.log("platform --->",Platform.OS);
        console.log("lastname="+this.state.text.lastName);

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

                <View style= {{ flex:1, }}>
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
                        textAlign: "left",
                        color: "#E73D50" 
                        }}>
                    {this.state.text.profile}
                    </Text>
                </View>                

                <View style={newStyle.inputContainer}>
               
                    <Text style={newStyle.firstName}>{this.state.text.firstName}</Text>
                    <TextInput
                                style={ newStyle.nameInput }
                                placeholder=''
                                underlineColorAndroid= 'transparent'
                                onChangeText={(firstNameInput) => this.validationFirstName(firstNameInput)}/>
                            
                    <Text style={newStyle.firstName}>{this.state.text.lastName}</Text>
                    <TextInput
                        style={ newStyle.nameInput}
                        placeholder=''
                        underlineColorAndroid= 'transparent'
                        onChangeText= { (lastNameInput) => this.setState({lastNameInput}) }/>
 
                      {
                            this.state.isLoading===true?
                            <View style = {{position: 'absolute' , zIndex:3999, left: 30, top: 0, right: 0, bottom: 0}}>
                            <WaveIndicator color='#e73d50' />
                            </View>:this.somethingElse()
                      }

                    <Text style={newStyle.firstName}>{this.state.text.Email}</Text>
                    <TextInput
                        style={ newStyle.nameInput}
                        placeholder=''
                        editable = {false}
                        underlineColorAndroid= 'transparent'
                        value = { username }/>

                    <Text style={newStyle.firstName}>{this.state.text.Phone}</Text>
                    <TextInput
                        style={ newStyle.nameInput}
                        placeholder=''
                        underlineColorAndroid= 'transparent'
                        onChangeText= { (phonenumberInput) => this.setState({phonenumberInput}) }/>
                    <Text style={newStyle.firstName}>{this.state.text.Password}</Text>

                    <TextInput
                        style={ newStyle.nameInput}
                        placeholder=''
                        editable = {false}
                        underlineColorAndroid= 'transparent'
                        value = { password } />
                </View>

                     <TouchableOpacity
                            onPress={() => { this.callPrivateScreen( payload ); } }
                            activeOpacity={0.5}
                            style={{
                                width: 330,
                                height: 50,
                                marginTop: 20,
                                marginBottom: 10,
                                marginLeft: 0,
                                borderRadius: 8,
                                backgroundColor: '#E73D50',
                                marginTop: viewPortHeight / 600,
                                justifyContent: 'center',
                                alignItems: 'flex-start'
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
                            > {this.state.buttonText.toUpperCase()}</Text>
                        </TouchableOpacity>
                   
 
            </KeyboardAwareScrollView>

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

    headerImage: {
        width: viewPortWidth * 0.65,
        height: Platform.OS === 'ios'?40:120,
        flex: Platform.OS === 'ios'?17:8,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        backgroundColor: 'white',        
        marginTop: Platform.OS === 'ios'?25:10,
        padding: 10,
        marginLeft: 0,
        flex: Platform.OS === 'ios'?100:1,
        backgroundColor: 'transparent'
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
        width: 190,
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
        height: 50,
        borderRadius: 8,
        backgroundColor: '#f6f6f6',
        marginBottom: 10,
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

    endButtons: {
        width: viewPortWidth,
        height: Platform.OS === 'ios'?50:150,
        zIndex: 999,
        flex: Platform.OS === 'ios'?4:4,
        flexDirection: 'row',
        backgroundColor: 'white',
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
        fetchingRegister: RegisterSelectors.getFetching(state),
        getUser: RegisterSelectors.getUser(state),
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {  
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      navigateBack: () => this.props.navigation.goBack(),
    //   register: (payload) => dispatch(RegisterActions.registerRequest(payload)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnRegisterProfile);