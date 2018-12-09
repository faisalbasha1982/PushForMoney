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
import LanguageSettingsPFM from '../Containers/LanguageSettingsPFM';
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

import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';


const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

let cLanguage = '';
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

class PushToEarnRegisterProfile extends Component {

    // static propTypes = {
    //     language: PropTypes.string.isRequired,
    //     uname: PropTypes.string.isRequired,
    //     pword: PropTypes.string.isRequired,
    // }

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
            emailInput:'',
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
            text:{},
            countryCode:'be',
            isFocusedFirst:false,
            isFocusedSecond:false,
            isFocusedThird:false,
            isFocusedFourth:false,
        };
    }

    validationLastName = (name) => {

        let reg = /^[a-zA-Z\s]+$/;

        console.log("last name="+name);

        if(name === '')
        {
            //this.setState({ lastNameError: true, ErrorText: 'Last Name is Required' });
            this.setState({lastNameInput: ''});

            if(this.state.language === 'Dutch')
                this.setState({ lastNameEmptyError: true, EmptyErrorText: LanguageSettings.dutch.EmptyErrorText });
            else
                if(this.state.language === 'English')
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
                console.tron.log("found other characts");
              if(this.state.language === 'Dutch')
              {
                  Alert.alert(LanguageSettingsPFM.Dutch.FNameErrorText);
                  //this.setState({ lastNameEmptyError: false, lastNameError: true, lastNameErrorText: LanguageSettings.dutch.LNameErrorText });
              }
              else
                  if(this.state.language === 'English')
                  {
                    Alert.alert(LanguageSettingsPFM.English.FNameErrorText);
                    //this.setState({ lastNameEmptyError: false, lastNameError: true,lastNameErrorText: LanguageSettings.english.LNameErrorText });
                  }
                  else
                  {
                    Alert.alert(LanguageSettingsPFM.French.FNameErrorText);
                    //this.setState({ lastNameEmptyError: false, lastNameError: true,lastNameErrorText: LanguageSettings.french.LNameErrorText });
                  }
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
            if(this.state.language === 'Dutch')
                this.setState({ firstNameEmptyError: true, EmptyErrorText: LanguageSettings.dutch.EmptyErrorText });
            else
                if(this.state.language === 'English')
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
              if(this.state.language === 'Dutch')
              {
                  Alert.alert(LanguageSettingsPFM.Dutch.FNameErrorText);
                  //this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: true, firstNameErrorText: LanguageSettings.dutch.FNameErrorText });
              }
              else
                  if(this.state.language === 'English')
                  {
                    Alert.alert(LanguageSettingsPFM.English.FNameErrorText);
                    //this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: true, firstNameErrorText: LanguageSettings.english.FNameErrorText });
                  }
                  else
                  {
                    Alert.alert(LanguageSettingsPFM.French.FNameErrorText);
                    //this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: true, firstNameErrorText: LanguageSettings.french.FNameErrorText });
                  }
            }
        }        
    }

    removeSpaces = (input) => {
       
        if(input === null || input === undefined)
            return;

        let array = input.split(" ");

        let finalString = '';

        for(element in array)
        {
            console.log("element="+array[element]);

            if(array[element] !== " ")
                finalString = finalString + array[element];
        }

        console.log("finalString="+finalString);

        return finalString;
        
    }
    
    validateUAEPhoneNumber = (phone) => {
        
        this.setState({ phoneNumberInput: phone});
    }

    validateBelgiumPhoneNumber = (phone) => {

        phone = this.removeSpaces(phone);

        // console.tron.log("formatted phone text="+phone);

        let countryCode = "+32";
        let firstFour = phone.substring(0,4);
        let rest = phone.substring(4);
        let firstTwo = phone.substring(0,2);
        let restTwo = phone.substring(2);

        if(phone.substring(0,1) !== "+" && phone.substring(0,1) !== "0" && phone.length ===11)
            this.setState({ phoneNumberInput: "+" + phone});
        else
            if(firstFour === "0032" && phone.length === 9)
                this.setState({ phoneNumberInput: countryCode + rest});
            else
                if(firstTwo === "04" && restTwo.length === 8)
                    this.setState({ phoneNumberInput: countryCode + restTwo});
                else
                  if(phone.substring(0,3) === "+32" && phone.length === 12)
                    this.setState({ phoneNumberInput: phone });

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

            if(this.state.language === 'Dutch')
                this.setState({ phoneNumberEmptyError: true, EmptyErrorText: LanguageSettings.dutch.EmptyErrorText });
            else
                if(this.state.language === 'English')
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
            {
                //this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: false, phoneNumberInput: this.validateBelgiumPhoneNumber(phone), phoneNumberErrorText: '' });
                console.log("vaidated phone text="+this.state.phoneNumberInput);
                console.tron.log("vaidated phone text="+this.state.phoneNumberInput);
            }
            else
                if(this.state.language === 'Dutch')
                    this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: true, phoneNumberErrorText: LanguageSettings.dutch.TelephoneNumberError });
                else
                    if(this.state.language === 'English')
                        this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: true, phoneNumberErrorText: LanguageSettings.english.TelephoneNumberError });
                    else
                        this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: true, phoneNumberErrorText: LanguageSettings.french.TelephoneNumberError });
        }    
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

        if(this.state.language === 'Dutch')
            this.setState({ text: LanguageSettingsPFM.Dutch, languageCode:'nl'});
        else
        if(this.state.language === 'English')
            this.setState({ text: LanguageSettingsPFM.English,languageCode:'en'});
        else
        if(this.state.language === 'French')
            this.setState({ text: LanguageSettingsPFM.French, languageCode:'fr'});

        if(this.props.navigation.state.params.mobilephone !== '')
            this.setState({ phoneNumberInput:  this.props.navigation.state.params.mobilephone});
    }

    setLanguage = () => {

        if(this.state.language === 'Dutch')
            this.setState({ text: LanguageSettingsPFM.Dutch, languageCode:'nl'});
        else
            if(this.state.language === 'English')
                this.setState({ text: LanguageSettingsPFM.English, languageCode:'en'});
        else
            if(this.state.language === 'French')
                this.setState({ text: LanguageSettingsPFM.French, languageCode:'fr'});

    }

    getAsyncStorage = async () => {

        await AsyncStorage.getItem('language').then((language) => {
            this.setState({ language: language });
        });

        this.setLanguage();

    }


    componentWillMount() {
        
        this.getAsyncStorage();
    }

    setText =  () => {

        let payload = this.props.navigation.state.params.payload;

        let firstname = payload.firstname;
        let lastname = payload.lastname;
        let email = payload.email;
        let id = payload.id;

        if (this.state.language === 'Dutch') {
            console.log("setting in Nederlands");
            this.setState({
                firstNameInput: firstname,
                lastNameInput: lastname,
                usernameInput: email,
            });
        }
        else
            if (this.state.language === 'English') {
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

    updateText = (encodedMessage) => {         

        this.setState({encodedText: encodedMessage, loginD: encodedMessage});

     }

    getLoginEncData = () => {

        return this.state.encodedText;

    }

    rsa = (data) => {

        let secret = data;

        var encodedT ="bDJxsO65xybMkjHgroG/xPDgj7mVNpdbNTJ1oreGzF1coMBxrAL7HneqkzGOxF/W"+
        "QrSntpF6deb39KvalBrBLDxKwZgjoArnaCBPGEoRcIlCeXspvyWTsIIUjrorirIv"+
        "6oLcmqxX91HJk4d/3wNA98lEfYEkAM1oGDLZIR3cRqe+sgDByder7tYoAYyXl8Z2"+
        "jyJN8VBNhcWLtvqaj6BwitZh+H4bZjoKn4LiqQtuyiKKDonS2G7qBBrFNs+MAdeU"+
        "ykDrGndhugO8asOFIzrqPKwbiL3KWqKaIn1GFHP96tUW+DZ75rSE/SczYRv4bYiO"+
        "tesbLW82TJo/NpEXlsSGEQ==";

        const privateKeyNew = 
        "-----BEGIN RSA PRIVATE KEY-----\n"+
        "MIIEpAIBAAKCAQEAsM/NEwCFn/Jci2ayfM+lYEY35fSa7S6JzMFNBnq8MHzxwR7D"+
        "S4AcGWudORH39E3UGDlpVdCXlcaj+ivvdUIe6HhjhM4EfXp5cBo52ORLawETuHmS"+
        "qfysNUtESxx3gWwHIIsgXhBMt+0ysHrfiYAylIKP+b1f9j4oCRwd4mX+eYUHhqMQ"+
        "h3fu3vy82wce1K8N1XCjWC3ABMEUDB3bp+nQnW1ZWg7jVh/Cmk6yvRehgc29gyNB"+
        "o5bkgp8Ha7dLIGc1mzv17uc6kQ3lS3FStqeGn0mdv6OQF1pQ2iOiTwTBWvU8hlJF"+
        "+aVM72s5YYzTOzXKfrsEqtvCcFKwhajb1fRDZQIDAQABAoIBAASxZ0yPUXym1qz+"+
        "i1NDwax2AKrSXMBZ4V91bAF1hYQ19Ma+9ckNu/EyyYgHwZCS9kO0VmboM/XOQXD0"+
        "9JSkriRWebG/NCBOfWWr1Ig8uwG6lBbr5ygq5Dk/566ksUlWoDPNbY0Bmr+xBIzp"+
        "ngBMzkrh0kd7Ls5e5Pok7Ggjc+cuxPHprhAZKtfufb7Rp/6nO+B9O2Wy9NGcYCBv"+
        "XFI8xjDBqxaaiv8IbHe6UUKjJFrTGMIst2/NR43jo+W13JuIJ7nGAUXzCYjfQ2JO"+
        "0JGfvjh/mCI7x2damj/quR8z9oihHSjOw//Cr10B/LgBXAR0jD9rY2pzLuKnttC5"+
        "Set4vpsCgYEA2WhSVGyJ7mHoFWlDu3RLi0Q6qOlf1K3HOS+JokFgRXs7YADK9sUa"+
        "AE3X4PJmpHlS17bH85FHoO5OykHQzcCbznHj7nXjDx1TUbWD/K/H5fZvkIj4s8nl"+
        "ZkvvYf9u59FuMEdY/4CBSoB8aj5XOOS/n39RNQxemYfY8o0aA+H+G/cCgYEA0DKu"+
        "CxgGqUbMvHGha2zdSadX/a5BcbHlzhX6BvsXDoz8pfAFNyt85FiQSAxqpJbyUBZ1"+
        "tJJjX6nrKlkad5OiArq2blmyflJHFb71OktohHD0cu62+1XrAP7weWxYJravxWVS"+
        "fOv6kDO4LRsahT8NWpyRyqOgECJMWElWmp5urIMCgYEAiIIGX9ge6z0yem80BjnJ"+
        "TVKz+mc+ss3Cr9d3dhfSmQ39hBQ7XKL55oL6L9ZEOLWtHKE5/2eTMCsx8bFNqENu"+
        "ETxVv97piQ4CyOVOUJUW0P/hoUE/17PHhGndjwzR2GEZ7Np/uT448Eyo0hT+s0x+"+
        "PWm11bdEluZDhFiwowt9gJUCgYBs8she59C8jl8fEbtt0sct/tMt3h1DGNvv71Iq"+
        "iwSyyZaAY0znZOtzNuExwsWfoZnlzQsFVkGIUwvL2lreTjROh1RmBKxCLF4khAwh"+
        "2Eo2XEGfT0oT1g8nM0G12Lt8bscmXfI/iuFQyq/Lcs57AdbEHwCv8NYW+0vGO4KF"+
        "YPj7bwKBgQCswX+t8pweGBy5d1LUr1+iEDCH8aW3Iq5Nyi/fwTvvAn2cQUP36Svi"+
        "Cls2sSm61qi6INY8R19d0VbHc928CwXPhkih1nwU6Ncj7vqutbjEtElfHgJeot4B"+
        "LZubRTknSNxpi1AxkRjvJNthAvRWgeg6vN/YJ+e78X1ASYY4V8owCA==\n"+
        "-----END RSA PRIVATE KEY-----";

        const publicKeyNew = 
        "-----BEGIN RSA PUBLIC KEY-----\n"+
        "MIIBCgKCAQEAsM/NEwCFn/Jci2ayfM+lYEY35fSa7S6JzMFNBnq8MHzxwR7DS4Ac"+
        "GWudORH39E3UGDlpVdCXlcaj+ivvdUIe6HhjhM4EfXp5cBo52ORLawETuHmSqfys"+
        "NUtESxx3gWwHIIsgXhBMt+0ysHrfiYAylIKP+b1f9j4oCRwd4mX+eYUHhqMQh3fu"+
        "3vy82wce1K8N1XCjWC3ABMEUDB3bp+nQnW1ZWg7jVh/Cmk6yvRehgc29gyNBo5bk"+
        "gp8Ha7dLIGc1mzv17uc6kQ3lS3FStqeGn0mdv6OQF1pQ2iOiTwTBWvU8hlJF+aVM"+
        "72s5YYzTOzXKfrsEqtvCcFKwhajb1fRDZQIDAQAB\n"+
        "-----END RSA PUBLIC KEY-----";

        const privateKey = 
        "-----BEGIN RSA PRIVATE KEY-----\n"+
        "MIIEowIBAAKCAQEAuXMytO6R54GKgQkym94wvVIDJu4VPWrrwEnZVIgBqoPH7tJf"+
        "FI29qScrR5kvTb+fQR89Vz/vBN8AyWxNmc0tAsvj3ukkpKTh2F3TXbMRrFULz2Od"+
        "gP6xueQVQE0mZ3z3lTbIqQj/DHGMRm8c6CT+RBKzQhb/FlqqC4HPG9xCGBn+pqfY"+
        "D9HoOgsY+/ugyx6A3En1cWtDcmOwoApM6s2UiYyioe+gu+psBOfErgeTkuRxYA28"+
        "MOKhQ6IGNyLAUyKPBxNz1z8jMllVrqRBrpkAbyMRe+pjZdoMVH47hhzjNPQbEz6q"+
        "wJT76w0XOEtUQlIyNJU5GQdK/pIXIIPlTpLmKwIDAQABAoIBAFgWqi1bbR7EX5/v"+
        "WITFQ+2JuUmSqbAky5ro+Ty35eKy+hMtBlDjCwYAPwShdOC/dsweJKr/CXAM5XjH"+
        "4wx9czXy12iY4fj7APQfjTjiyDBNrXBzZutRD+a2uolynB1oNMpB3Yq9ZTjp7rG+"+
        "McLrX4PCRjfMaJqbsk4I+PHI6/Q6BLMmTXd4llwOJ0sblJTkPSxwzUqrRDxFvm78"+
        "z8UWTQtR2n4E2e2ZKaB/iP3bSrFgWZw7QDIKPGlKTwBAQ+Z1UKzxlqtxEdM/AK55"+
        "fhHfJDQIpfsIvoKFXyrCN1y/JbUlAiVSEbc/WngxSeBm9EMfAfJQTZz4gmPgq2WJ"+
        "/EFKdeECgYEA8UdMOgN6Rb+p2yaVxwrC55thDtOjR+dlWdK+k7a1J4E2o+UXeIn3"+
        "gw1Kw63HGnoVSDDflQ8KXI9VUTvAGWED5On8jDwLfwYHEW2jvm8cZU2VEBLpU4Bw"+
        "Uvq2jpFT7OWjdx0HzB+Rv5ADQwGL+v94jW1i9U4mz595a/ss5SBW29kCgYEAxMPf"+
        "6coLG4HkWOD4LvoH/0k/qWu6VyhLVr8f4rNUfWaN5odMPdHF+5aU+11XJi5phplw"+
        "M31nDxLydYH+s5ZzJOwj+77cfmyfeFzg5ZMHQUEPejeXRxlOA1yhYrjlj11a4F6W"+
        "Et7pM8YguQuyy0WvYdPK9fhzcUlDJBzsijpAY6MCgYEA2VsQaWa+nNznyHv/C9s+"+
        "7+SC0BeKDXmATSXT9z/t/BOkRItZ1IX9inrL8nG3XrvCNlGI6UAuZmndQxvflz1V"+
        "g7/iefaRqLGmZmXtz91KqFv2wA85ULbw+V/QW6jCATRySRjG8HU0GG1E8vUOxGOm"+
        "l0mGj1QDFKEmgkc5D4RNmykCgYBABzU/0H1Y0CXMPjjEoJwlmGJc8S9L2VLawYrQ"+
        "rGZcABlA4NoQa8ivG8sTGMaZKBUytY9rUe1NXG8Fie2l5tlFNIppCyyY/yPNePu9"+
        "+OAtfcxZiulxO2zFb0kc5OnegxRlWqIfNeZQ8LIJRSNDPkPZ459x9w0p2hs9DyRx"+
        "vo7hXQKBgDFdnQACX5NDSjOStEZK+pRh0jI4lQWBdCHG5Pd6Wmb6P3aFAfwaEYvk"+
        "QA0J/2DdXPoN8Jm2Mm7rFrPWZ53yjcq4LmRfO2fFBHliqWDten7tWKdfLBe3Bh2Z"+
        "N/NkqkZfDLfEXa3dJubEcqbOHYYyTxfyabAoQWn+AdaPkTXXhR5A\n"+
        "-----END RSA PRIVATE KEY-----";

        const publicKey = "-----BEGIN RSA PUBLIC KEY-----\n"+ 
        "MIIBCgKCAQEAuXMytO6R54GKgQkym94wvVIDJu4VPWrrwEnZVIgBqoPH7tJfFI29"
        +"qScrR5kvTb+fQR89Vz/vBN8AyWxNmc0tAsvj3ukkpKTh2F3TXbMRrFULz2OdgP6x"
        +"ueQVQE0mZ3z3lTbIqQj/DHGMRm8c6CT+RBKzQhb/FlqqC4HPG9xCGBn+pqfYD9Ho"
        +"OgsY+/ugyx6A3En1cWtDcmOwoApM6s2UiYyioe+gu+psBOfErgeTkuRxYA28MOKh"
        +"Q6IGNyLAUyKPBxNz1z8jMllVrqRBrpkAbyMRe+pjZdoMVH47hhzjNPQbEz6qwJT7"
        +"6w0XOEtUQlIyNJU5GQdK/pIXIIPlTpLmKwIDAQAB\n"+
        "-----END RSA PUBLIC KEY-----";

        let that = this;

        try {            

                RSA.encrypt(secret, publicKeyNew)
                        .then(encodedMessage => {

                            encodedT = encodedMessage;
                            that.updateText(encodedMessage);

                            RSA.decrypt(encodedMessage, privateKeyNew)
                            .then(msg => {
                            });

                        });                  

        } catch (error) {
            console.log('error=',error);
        }
       
        return this.getLoginEncData();
    }

    validateEncrypt = (password) => {

        console.log("validate Encrypt");
        if(this.state.phoneNumberInput === '')
            {
                    // Alert.alert(
                    //     'PhoneNumber is Empty',
                    //     'Fill in PhoneNumber',
                    //     [
                    //         {
                    //           text: 'OK', 
                    //           onPress: () => console.log('Ask me later Pressed')
                    //         },                      
                    //     ],
                    //     {cancelable: false}
                    // );
            }
          else
          {

            let language = this.state.languageCode;

            let authData = AuthComponent.authenticationData(this.state.languageCode);
            let encryptedData = AesComponent.aesCallback(authData);

            //let cAuthenticationData = "{'Lang':"+" '"+this.state.language+"',"+"  'AuthID': 'JS#236734', 'Data':'FormSignUp', 'D' :"+" '"+this.getUTCDate()+"'"+","+  " 'R' : 'er3rss'}";            
            let loginInfo = "{'M':"+"'"+this.state.phoneNumberInput+"','D':"+" '"+this.getUTCDate()+"'"+", 'R' : 'er3rssfd'}";

            this.rsa(loginInfo);

            this.setState({ cAuthenticationData: encryptedData,});

          }
    }

    callPrivateScreen = (payload) => {

        let phoneData = '';

        if(this.state.phoneNumberInput === '')
         {
             Alert.alert("Please enter your phone number!");
             return;
         }

         if(this.props.navigation.state.params.mobilephone === '')
             phoneData = this.state.phoneNumberInput;
         else
             phoneData = this.props.navigation.state.params.mobilephone;

         console.tron.log("this.props.navigation.state.params.phone="+this.props.navigation.state.params.mobilephone );

        this.setState({ isLoading: true});

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);

        // Email instead of mobile
        let signUpData = "\"SignUpData\":" +"\""+this.aes("{ 'FName' : "+"'"+this.state.firstNameInput+"'" + ", 'LName' : "+"'"+this.state.lastNameInput+"'"+", 'Mob':"+"'"+phoneData+"'"+", 'Email':"+"'"+this.state.emailInput+"'"+",'Approval':'true','Device':'ios','D':'"+this.getUTCDate()+"','R' : 'er3rssf3dfd'}") +"\"";
         let unencrypted = "{ 'FName' : "+"'"+this.state.firstNameInput+"'" + ", 'LName' : "+"'"+this.state.lastNameInput+"'"+", 'Mob':"+"'"+phoneData+"'"+", 'Email':"+"'"+this.state.emailInput+"'"+",'Approval':'true','Device':'ios','D':'"+this.getUTCDate()+"','R' : 'er3rssf3dfd'}";
        console.tron.log(" unencrypted signUpData="+ unencrypted );

        // console.tron.log("signupData="+"{ 'FName' : "+"'"+this.state.firstNameInput+"'" + ", 'LName' : "+"'"+this.state.lastNameInput+"'"+", 'Mob':"+"'"+this.state.phoneNumberInput+"'"+",'Approval':'true','Device':'ios','D':'"+this.getUTCDate()+"','R' : 'er3rssf3dfd'}" +"\"");
        console.log("signUpData=","{ 'FName' : "+"'"+this.state.firstNameInput+"'" + ", 'LName' : "+"'"+this.state.lastNameInput+"'"+", 'Mob':"+"'"+phoneData+"'"+", 'Email':"+"'"+this.state.emailInput+"'"+",'Approval':'true','Device':'ios','D':'"+this.getUTCDate()+"','R' : 'er3rssf3dfd'}" +"\"");
        console.log("encrypted signup data="+this.aes("{ 'FName' : "+this.state.firstNameInput+", 'LName' : "+this.state.lastNameInput+", 'Mob':"+"'"+phoneData+"'"+", 'Email':"+this.state.emailInput+",'Approval':'true','Device':'ios','D':'"+this.getUTCDate()+"','R' : 'er3rssf3dfd'}"));
        console.log("payload passed to private policy=",payload);
        console.tron.log("Authentication in payload="+encryptedData);
        console.tron.log("type of payload="+typeof(payload));
        console.tron.log("signUpData=","{ 'FName' : "+"'"+this.state.firstNameInput+"'" + ", 'LName' : "+"'"+this.state.lastNameInput+"'"+", 'Mob':"+"'"+phoneData+"'"+", 'Email':"+"'"+this.state.emailInput+"'"+",'Approval':'true','Device':'ios','D':'"+this.getUTCDate()+"','R' : 'er3rssf3dfd'}" +"\"");
        

        let loginData = '';

        if(typeof(payload) === 'string')
        {
            loginData = ((payload.split(",")[1]).split(":")[1]);
            let loginDataLength = loginData.length;
            loginData = loginData.substring(1,loginDataLength-2);    
        }
        else
        {
                if(typeof(payload) === 'object')
                    loginData = payload.LoginData;
        }

        console.tron.log("Login Data="+loginData);

        let finalPayload = "{" + "\"AuthenticationData\":"+ "\""+encryptedData + "\"" + "," + "\"LoginData\":" + "\"" + loginData + "\"" + "," + signUpData + "}";

        console.log("finalPayload = "+finalPayload);
        console.tron.log("finalPayload="+finalPayload);

        this.props.navigation.navigate('PushToEarnPrivatePolicy',{payload: finalPayload});

    }

    somethingElse = () => {

    }

    validateEmail = (text) => {

        console.log("email="+text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
            console.log("Email is Not Correct");
            this.setState({ emailInput: text, usernameInputError: true, usernameInput: text, usernameEmptyError: false, EmptyErrorText: '' });
            //    return false;
        }
        else 
        {
           this.setState({ usernameInputError: false, usernameInput: text, usernameEmptyError: false, EmptyErrorText: '' });
        }

    }

    formatMobileNo = (mobileNo) => {

        console.log("mobileNo="+mobileNo);

        let newMobNo = "+32";

        if(mobileNo === null || mobileNo === undefined)
            return null;
        else
         {
            if(mobileNo !== null && mobileNo.substring(0,2)==="00")
                if(mobileNo.substring(2,4)==="32")
                    newMobNo = newMobNo + mobileNo.substring(4);
                else
                    newMobNo = newMobNo + mobileNo.substring(2);
            else
                    if(mobileNo !== null && mobileNo.substring(0,1)==="0")
                        newMobNo = newMobNo + mobileNo.substring(1);


            if(newMobNo.includes(" ") === true)
            {
               console.log("includes space newMobNo="+newMobNo);
               let array =  newMobNo.split(" ");
               let finalMobNo = "";

               forEach( e in array)
               {
                  finalMobNo = finalMobNo + e;
               }

               console.log("finalMobo="+finalMobNo);

               if(finalMobNo !== null || finalMobNo !== undefined)
                newMobNo = finalMobNo;
            }


            console.log("newMobNo="+newMobNo);
         }


        return newMobNo;
    }   

    focusFirstOff = () => {
        this.setState({ isFocusedFirst: false, });
    }

    focusFirst = () => {
        this.setState({ isFocusedFirst: true, isFocusedSecond:false, isFocusedThird:false, isFocusedFourth:false });
    }

    focusSecond = () => {
        this.setState({ isFocusedFirst: false, isFocusedSecond:true, isFocusedThird:false, isFocusedFourth:false });
    }

    focusSecondOff = () => {
        this.setState({ isFocusedSecond: false,  });
    }

    focusThird = () => {
        this.setState({ isFocusedFirst: false, isFocusedSecond:false, isFocusedThird:true, isFocusedFourth:false });
    }

    focusThirdOff = () => {
        this.setState({  isFocusedThird:false, });
    }

    focusFourth = () => {
        this.setState({ isFocusedFirst: false, isFocusedSecond:false, isFocusedThird:false, isFocusedFourth:true });
    }

    focusFourthOff = () => {
        this.setState({  isFocusedFourth:false, });
    }

    validateBGPhoneNumber = (phone) => {

        // 00 => +
       // 0 and digit after => +32 digit
       // 0032 => +32
       // 00320 => +32
       // +320 => +32
       // 320 => +32

       // Alert.alert("phone="+phone);
       console.tron.log("text input phone="+phone);
       
       phone = this.removeSpaces(phone);

       let dpPhone = phone;        

       let first = phone.substring(0,1);
       let second = phone.substring(1,2);
       let firstTwo = phone.substring(0,2);
       let restTwo = phone.substring(2);
       let firstThree  = phone.substring(0,3);
       let firstFour = phone.substring(0,4);
       let firstFive = phone.substring(0,5);

       let finalString = '+32';

       let homePhone = /^((\+|00)32\s?|0)(\d\s?\d{3}|\d{2}\s?\d{2})(\s?\d{2}){2}$/;
       let mPhone = /^((\+|00)32\s?|0)4(60|[789]\d)(\s?\d{2}){3}$/;

       if(dpPhone.substring(0,1) !== '+')
       dpPhone = '+' + dpPhone;

       if(mPhone.exec(phone) || homePhone.exec(phone))
       {
          console.tron.log("Valid Phone Number");
          this.setState({ phoneNumberInput: phone});
       }
       else
       {
           console.tron.log("InValid Phone Number="+phone);
           console.tron.log("phone 0,2="+(phone.substring(0,2) === "+0"));
           console.tron.log("Length of Phone Number="+phone.length);

           if( dpPhone.substring(0,3) === "+00")
           {
               if(dpPhone.length >3)
                   dpPhone = "+" + dpPhone.substring(3);
               else
                   dpPhone = "+" ;

               console.tron.log("phone length="+dpPhone.length+"  firstThree="+firstThree+" phone="+dpPhone);                
               this.setState({ phoneNumberInput: dpPhone});
               console.tron.log("phone number input="+this.state.phoneNumberInput);

           }
           else
               if(dpPhone.substring(0,2) === "+0" && dpPhone.length === 2)
               {
               console.tron.log("first & second ="+dpPhone.substring(0,1)+ " second="+dpPhone.substring(1,2));
               dpPhone = "+"
                   this.setState({ phoneNumberInput: dpPhone});
               }
           else
               if(dpPhone.substring(0,2) === "+0" && dpPhone.length > 2 && dpPhone.substring(2,3) !== '0')
               {
                   console.tron.log("first & second ="+first+ " second="+second);
                   dpPhone = "+32" + dpPhone.substring(2);
                   this.setState({ phoneNumberInput: dpPhone});
               }
           else
               if(dpPhone.substring(0,2) === "32")
               {
                   console.tron.log("firsttwo ="+dpPhone.substring(0,2));
                   dpPhone = "+" + dpPhone.substring(2);
                   this.setState({ phoneNumberInput: dpPhone});
               }
           else
               if( dpPhone.substring(0,2) === "00")
               {
                   if(dpPhone.length >2)
                   dpPhone = "+" + dpPhone.substring(2);
                   else
                   dpPhone = "+" ;
                   
                   console.tron.log("first two ="+dpPhone.substring(0,2));

                   first = dpPhone.substring(0,1);
                   second = dpPhone.substring(1,2);
                   firstTwo = dpPhone.substring(0,2);
                   restTwo = dpPhone.substring(2);
                   firstThree  = dpPhone.substring(0,3);
                   firstFour = dpPhone.substring(0,4);
                   firstFive = dpPhone.substring(0,5);

                   this.setState({ phoneNumberInput: dpPhone});

               }
           else
               if(dpPhone.substring(0,1) === "0" && this.isDigit(second))
               {
                   dpPhone = "+32" + dpPhone.substring(1);

                   first = dpPhone.substring(0,1);
                   second = dpPhone.substring(1,2);
                   firstTwo = dpPhone.substring(0,2);
                   restTwo = dpPhone.substring(2);
                   firstThree  = dpPhone.substring(0,3);
                   firstFour = dpPhone.substring(0,4);
                   firstFive = dpPhone.substring(0,5);  

                   this.setState({ phoneNumberInput: dpPhone});

               }
           else
               if(dpPhone.substring(0,3) === "320")
               {
                   console.tron.log("first Three"+dpPhone.substring(0,3));

                   dpPhone = "+32" + dpPhone.substring(3);

                   first = dpPhone.substring(0,1);
                   second = dpPhone.substring(1,2);
                   firstTwo = dpPhone.substring(0,2);
                   restTwo = dpPhone.substring(2);
                   firstThree  = dpPhone.substring(0,3);
                   firstFour = dpPhone.substring(0,4);
                   firstFive = dpPhone.substring(0,5); 

                   this.setState({ phoneNumberInput: dpPhone});

               }
              else
               if(dpPhone.substring(0,4) === "+320")
               {
                   console.tron.log("first Three"+dpPhone.substring(0,4));

                   dpPhone = "+32" + dpPhone.substring(4);

                   first = dpPhone.substring(0,1);
                   second = dpPhone.substring(1,2);
                   firstTwo = dpPhone.substring(0,2);
                   restTwo = dpPhone.substring(2);
                   firstThree  = dpPhone.substring(0,3);
                   firstFour = dpPhone.substring(0,4);
                   firstFive = dpPhone.substring(0,5);  

                   this.setState({ phoneNumberInput: dpPhone});

               }
       }
   }    


    render() {

        const platform = Platform.OS;
        const username = this.props.navigation.state.params.uname;
        const password = this.props.navigation.state.params.pword;

        let payload  = this.props.navigation.state.params.payload;
        //let phone = this.props.navigation.state.params.phone;

        let firstname = this.props.navigation.state.params.firstname;
        let lastname = this.props.navigation.state.params.lastname;
        let uname = this.props.navigation.state.params.uname;
        let mobilephone = this.props.navigation.state.params.mobilephone;

        console.tron.log("firstname="+firstname);
        console.tron.log("lastname="+lastname);
        console.tron.log("uname="+uname);
        console.tron.log("mobilephone="+mobilephone);

        console.log("payload type="+typeof(payload));
        console.log("username received in register profile="+this.props.navigation.state.params.uname);
        // console.tron.log("username received in register profile="+this.props.navigation.state.params.uname);
        console.log("platform --->",Platform.OS);
        console.log("lastname="+this.state.text.lastName);
        //console.tron.log("phone in register profile="+phone);
        console.tron.log("payload loginData ="+payload.LoginData);
        console.tron.log("payload="+payload.LoginData);

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
                        textAlign: "center",
                        color: "#E73D50" 
                        }}>
                    {this.state.text.profile}
                    </Text>
                </View>

                <View style={newStyle.inputContainer}>
               
                    <Text style={newStyle.firstName}>{this.state.text.firstName}</Text>
                    <TextInput
                                style={ [newStyle.nameInput, { borderColor:this.state.isFocusedFirst===true?'#e73d50':'transparent', borderStyle:'solid', borderWidth:1 }] }
                                onFocus = { () => this.focusFirst() }
                                onBlur = { () => this.focusFirstOff()}
                                placeholder=''
                                value={ firstname }
                                underlineColorAndroid= 'transparent'
                                onChangeText={(firstNameInput) => this.validationFirstName(firstNameInput)}/>
                            
                    <Text style={newStyle.firstName}>{this.state.text.lastName}</Text>
                    <TextInput
                        style={ [newStyle.nameInput, { borderColor:this.state.isFocusedSecond===true?'#e73d50':'transparent', borderStyle:'solid', borderWidth:1 }] }
                        onFocus = { () => this.focusSecond() }
                        onBlur = { () => this.focusSecondOff()}
                        value = { lastname }
                        placeholder=''
                        underlineColorAndroid= 'transparent'
                        onChangeText= { (lastNameInput) => this.validationLastName(lastNameInput) }/>
 
                      {
                            this.state.isLoading===true?
                            <View style = {{position: 'absolute' , zIndex:3999, left: 30, top: 0, right: 0, bottom: 0}}>
                            <BallIndicator color='#e73d50' />
                            </View>:this.somethingElse()
                      }

                    <Text style={newStyle.firstName}>{this.state.text.Email}</Text>
                    <TextInput
                        style={ [newStyle.nameInput, { borderColor:this.state.isFocusedThird===true?'#e73d50':'transparent', borderStyle:'solid', borderWidth:1 }] }
                        onFocus = { () => this.focusThird() }
                        onBlur = { () => this.focusThirdOff()}                    
                        value = { uname }
                        placeholder=''
                        editable = {true}
                        underlineColorAndroid= 'transparent'
                        onChangeText = { (emailInput) => { this.validateEmail( emailInput ) } }
                    />

                    <Text style={newStyle.firstName}>{this.state.text.Phone}</Text>
                    <PhoneInput
                                            opacity={1}
                                            ref={(ref) => { this.phone = ref; }}
                                            initialCountry={this.state.countryCode}
                                            onSelectCountry={(iso2) => { this.setState({countryCode: iso2}); console.log('country='+this.state.countryCode) }}
                                            style= {newStyle.nameInput}
                                            value= { mobilephone }
                                            onChangePhoneNumber = { (phoneNumberInput) => this.validateBGPhoneNumber(phoneNumberInput) }
                                        />
                    {/* <Text style={newStyle.firstName}>{this.state.text.Password}</Text>

                    <TextInput
                        style={ newStyle.nameInput}
                        placeholder=''
                        editable = {false}
                        underlineColorAndroid= 'transparent'
                        value = { password } /> */}
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
                            > {this.state.text.ready}</Text>
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
        mobilePhone: RegisterSelectors.getPhone(state),
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