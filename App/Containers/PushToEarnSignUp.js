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
    AsyncStorage,
    findNodeHandle,
    NativeModules,
} from 'react-native';
import { Container, Header, Content, Input, Item } from 'native-base';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";
import LoginActions, { LoginSelectors } from "../Redux/LoginRedux";
import RegisterActions, { RegisterSelectors } from "../Redux/RegisterRedux";
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
import CryptoJS from 'crypto-js';
import utf8 from 'utf8';
import Api from './Api';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import {RSA, RSAKeychain } from 'react-native-rsa-native';

import { Colors } from "../Themes";
import { Images } from '../Themes';

import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/page1.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginManager } from 'react-native-fbsdk';
import LinkedInModal from 'react-native-linkedin';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

const { RNTwitterSignIn } = NativeModules;

const Constants = {
    // Dev Parse keys
    TWITTER_COMSUMER_KEY: 'B9gQXS1YrrtH5Q9HDFl08MVVS',
    TWITTER_CONSUMER_SECRET: 'ourqEe3JmhpRh7ceLpCxN4RoIRXJT9FLslqqgfLscTtHtVvCXs',
  };


// Styles

let cLanguage = '';
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


class PushToEarnSignUp extends Component {

    static propTypes = {
        language: PropTypes.string.isRequired
    }

    constructor(props)
    {
        super(props);             

        this.state = {
            isLoggedIn: false,
            language: 'NEDERLANDS',
            validation: false,
            renderValidate: false,
            usernameInput:'',
            passwordInput:'',
            cpasswordInput:'',
            buttonText: 'SIGNUP',
            usernameError:true,
            emailErrorText:'',     
            ErrorText:'',
            EmptyErrorText:'',
            usernameEmptyError:false,
            passwordEmptyError:false,
        };    
    }

    onGoogleButtonClick = async () => {
        await GoogleSignin.configure({
          iosClientId: '1041950784543-pkmc6rhf0e6av81q1j8qhspb10oqa7dn.apps.googleusercontent.com',
        })
          .then(() => {
          // you can now call currentUserAsync()
            GoogleSignin.currentUserAsync().then((user) => {
              console.log('USER', user);
              this.setState({ user });
            }).done();
          });
        const userNew = GoogleSignin.currentUser();
    
        GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
          // play services are available. can now configure library
        })
          .catch((err) => {
            console.log('Play services error', err.code, err.message);
          });
    
        GoogleSignin.signIn()
          .then((user) => {
            console.log(user);
            this.setState({ user });
    
            GoogleSignin.getAccessToken()
              .then((token) => {
                console.log(token);
              })
              .catch((err) => {
                console.log(err);
              })
              .done();
          })
          .catch((err) => {
            console.log('WRONG SIGNIN', err);
          })
          .done();
      };

    twitterSignIn = () => {
        console.warn('twitter button clicked'); // eslint-disable-line
        RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);
        RNTwitterSignIn.logIn()
          .then(loginData => {
            console.log(loginData)
            const { authToken, authTokenSecret } = loginData
            if (authToken && authTokenSecret) {
              this.setState({
                isLoggedIn: true
              })
            }
          })
          .catch(error => {
            console.log(error)
          }
        )
      }
    
      handleLogout = () => {
        console.log("logout")
        RNTwitterSignIn.logOut()
        this.setState({
          isLoggedIn: false
        });
    }

    onFacebookButtonClick = () => {
        console.log('facebook butotn clicked');
        console.warn('Facebook button clicked'); // eslint-disable-line
    
        LoginManager.logInWithReadPermissions(['public_profile']).then(
          (result) => {
            if (result.isCancelled) {
              console.log('Login was cancelled');
            } else {
              console.log(`Login was successful with permissions: ${
                result.grantedPermissions.toString()}`);
            }
          },
          (error) => {
            console.log(`Login failed with error: ${error}`);
          },
        );
      };

      linkedin = () => {
           
      }

    validatePassword = (password) => {

        console.log('password sent='+password);
        if(password.length >= 6 && !password.includes(" "))
            this.setState({ passwordEmptyError: false, passwordInput: password, EmptyErrorText: '' });
        else
            console.log("password incorrect---->"+password);
    }

    validateEmail = (text) => {

        console.log("email="+text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
            console.log("Email is Not Correct");
            this.setState({ usernameInput: text, usernameEmptyError: false, EmptyErrorText: '' });
               return false;
        }
        else 
        {
           this.setState({ usernameInput: text, usernameEmptyError: false, EmptyErrorText: '' });
           console.log("Email is Correct");
        }

    }

    componentWillReceiveProps(nextProps) {
        // console.log("in Form One screen language received="+nextProps.language);
        // if (this.props.navigation.state.params.language !== nextProps.language) {
        //     this.setState({ language: nextProps.language });
        //     this.setText();
        // }
    }

    componentDidMount() {
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
                                    'language': this.state.language,
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
                                    'language': this.state.language,
                                    'backgroundColor': 'normal'
                                }} />
                    </View>
            );
                
        return;

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
      
        // var key = CryptoJS.enc.Utf8.parse('VyhoMoGxi25xn/Tc');

        var key = CryptoJS.enc.Utf8.parse(Api.securityKey);
        var iv = CryptoJS.enc.Utf8.parse(ivRandom.toString());
        const ivFirstPart = ivRandom.substr(0,8);
        const ivLastPart = ivRandom.substring(8);
        
        //console.log('first part='+ivFirstPart+ " Last part="+ivLastPart);
      
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
      
        // console.log('Encrypted :' + encrypted);
        // console.log('Key :' + encrypted.key);
        // console.log('Salt :' + encrypted.salt);
        // console.log('iv :' + encrypted.iv);
        // console.log('Decrypted : ' + decrypted);
        // console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));
      
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

      updateText = (encodedMessage) => {         

        console.log("updateText=",encodedMessage);
        this.setState({encodedText: encodedMessage, loginD: encodedMessage});
        console.log("after setting state encodedText=",this.state.encodedText);

     }

    getLoginEncData = () => {

        console.log("state encodedText=",this.state.encodedText);
        console.log("state loginD=",this.state.loginD);
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

                            //console.log("publicKey="+publicKeyNew);
                            //console.log("privateKey="+privateKeyNew);

                            that.updateText(encodedMessage);

                            //console.log('encoded Message stored =',encodedT);
                            //console.log('encoded Message=',encodedMessage);

                            RSA.decrypt(encodedMessage, privateKeyNew)
                            .then(msg => {
                                //console.log("decrypt="+msg);
                            });

                        });                  

        } catch (error) {
            console.log('error=',error);
        }

        //console.log("encoded message to return ="+this.state.encodedText);
       
        return this.getLoginEncData();
    }

    validateEncrypt = (password) => {

        console.log("validate Encrypt");
        if(this.state.usernameInput === '')
            {
                if(this.state.usernameInput === '')
                {   
                    Alert.alert(
                        'Username is Empty',
                        'Fill in Username',
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
          else
          {

            let language = "en";
            let cAuthenticationData = "{'Lang':"+" '"+language+"',"+"  'AuthID': 'JS#236734', 'Data':'FormSignUp', 'D' :"+" '"+this.getUTCDate()+"'"+","+  " 'R' : 'er3rss'}";
            
            //console.log("AuthenticationData:",cAuthenticationData);

            let loginInfo = "{'U':"+"'"+this.state.usernameInput+"',"+" 'P':"+"'"+this.state.passwordInput+"','D':"+" '"+this.getUTCDate()+"'"+", 'R' : 'er3rssfd'}";
      
            let authEncrypted = this.aes(cAuthenticationData);
            this.rsa(loginInfo);

            this.setState({ cAuthenticationData: authEncrypted,});

            //console.log('authentication Data Encrypted :' + authEncrypted);
            //console.log("Login Data encrypted is =",this.state.encodedText);
          }
    }

      signUp = async () => {

        let language = "en";

        console.log("signup field has value="+this.state.usernameInput);
        console.log("password field has value="+this.state.passwordInput);

        if(this.state.usernameInput === '' || this.state.cpasswordInput === '' || this.state.cpasswordInput.length < 6 ||  this.state.passwordInput === '' || this.state.passwordInput.length < 6)
            {
                if(this.state.usernameInput === '')
                {   
                    Alert.alert(
                        'Username is Empty',
                        'Fill in Username',
                        [                      
                            {
                              text: 'OK', 
                              onPress: () => console.log('Ask me later Pressed')
                            },                      
                        ],
                        {cancelable: false}
                    );
                }

                if(this.state.passwordInput === '')
                {
                    Alert.alert(
                        'Password is Empty',
                        'Fill in Password',
                        [                      
                            {
                              text: 'OK', 
                              onPress: () => console.log('Ask me later Pressed')
                            },                      
                        ],
                        {cancelable: false}
                    );
                }

                if(this.state.passwordInput.length < 6 || !this.state.passwordInput.includes(" ") )
                {
                    Alert.alert(
                        'Password Length is less than 6 and no spaces',
                        'Password',
                        [                      
                            {
                              text: 'OK', 
                              onPress: () => console.log('Ask me later Pressed')
                            },                      
                        ],
                        {cancelable: false}
                    );    
                }

                if(this.state.cpasswordInput === '')
                {
                    Alert.alert(
                        'Password is Empty',
                        'Fill in Password',
                        [                      
                            {
                              text: 'OK', 
                              onPress: () => console.log('Ask me later Pressed')
                            },                      
                        ],
                        {cancelable: false}
                    );
                }

                if(this.state.cpasswordInput.length < 6 || !this.state.cpasswordInput.includes(" ") )
                {
                    Alert.alert(
                        'Password Length is less than 6 and no spaces',
                        'Password',
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
        else
           {

            console.log('password sent='+this.state.cpasswordInput);

            this.setState({isLoading: true});

                if(this.state.cpasswordInput.length >= 6 && !this.state.cpasswordInput.includes(" ") &&
                   this.state.cpasswordInput.length >= 6 && !this.state.cpasswordInput.includes(" "))
                {
                    //this.setState({ passwordEmptyError: false, passwordInput: password, EmptyErrorText: '' });
                    this.validateEncrypt(this.state.cpasswordInput);
                }
                else
                    {
                        console.log("password incorrect---->"+this.state.cpasswordInput);

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
               
               let cAuthenticationData = "{'Lang':"+" '"+language+"',"+"  'AuthID': 'JS#236734', 'Data':'FormSignUp', 'D' :"+" '"+this.getUTCDate()+"'"+","+  " 'R' : 'er3rss'}";
               //console.log("AuthenticationData:",cAuthenticationData);

               let loginData = "{'U':"+"'"+this.state.usernameInput+"',"+" 'P':"+"'"+this.state.passwordInput+"','D':"+" '"+this.getUTCDate()+"'"+", 'R' : 'er3rssfd'}";
        
              let authEncrypted = this.aes(cAuthenticationData);              
              let loginDataEncrypted = this.rsa(loginData);

              console.log('authentication Data Encrypted to send --->' + authEncrypted);
              console.log('login Data encrypted to send --->'+ loginDataEncrypted);
            

            setTimeout( () => {
                if( this.state.encodedText !== ""  || this.state.cAuthenticationData !== "" )
                {
  
                  let payload = JSON.stringify({
                     
                      "AuthenticationData": this.state.cAuthenticationData,
                      "LoginData": this.state.encodedText,
                      "SignupMode": true
               
                    });
    
                    this.props.registerAction(payload, this.state.usernameInput,this.state.passwordInput);
                    
                    this.setState({isLoading: false});
                }
                else
                  console.log("loginData  or authentication Data is empty");
            },6000);

        }

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


    func = (renderValidate,EmptyErrorText) => {
      this.setState({renderValidate,EmptyErrorText});
    }

    render() {
        const platform = Platform.OS;
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

                <View style= {{ flex:1, flexDirection: 'row', }}>
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
                            Sign up 
                    </Text>
                    <Text
                        style={{    
                            width: 43,
                            height: 14,
                            marginTop:10,
                            marginRight:30,
                            fontFamily: "WorkSans-Medium",
                            fontSize: 12,
                            fontWeight: "500",
                            fontStyle: "normal",
                            letterSpacing: 0.43,
                            textAlign: "left",
                            color: "rgb(231, 61, 80)",
                            textDecorationLine: 'underline',
                        }}
                        onPress = { () => this.props.navigation.navigate('PushToEarnSignIn') }>
                           Sign in
                        </Text>
                </View>                

                <View style= { newStyle.socialIcons }>

                        <View style={{ width: 70, height: 70, marginRight: 20, borderRadius: 70, backgroundColor: '#E73D50' }}>
                                <TouchableOpacity onPress={() => this.onFacebookButtonClick() }
                                    activeOpacity={0.5}
                                    style={ newStyle.iconStyle }>
                                        <Icon
                                            containerStyle={newStyle.iconImageStyle}
                                            name='facebook-f'
                                            type='font-awesome'
                                            color='#fff'
                                            size = {35}
                                            onPress={() => this.onFacebookButtonClick()} /> 
                                </TouchableOpacity>
                        </View>

                        <View style= {{width: 70, height: 70,marginRight: 20, borderRadius: 70, backgroundColor: '#E73D50' }}>
                                <TouchableOpacity onPress={() => this.linkedin() }
                                    activeOpacity={0.5}
                                    style={ newStyle.iconStyle }>
                                        <Icon
                                            containerStyle={newStyle.iconImageStyle}
                                            name='linkedin'
                                            type='font-awesome'
                                            color='#fff'
                                            size = {35}
                                            onPress={() => console.log('hello')} /> 
                                            <LinkedInModal
                                                        linkText=''
                                                        clientID="81td97f0ibm93v"
                                                        clientSecret="RotJQJQRBbBoWG7l"
                                                        redirectUri="https://www.linkedin.com/developer/apps"
                                                        onSuccess={token => console.log(token)} />
                                </TouchableOpacity>
                        </View>

                        <View style = {{width: 70, height: 70,marginRight: 20, borderRadius: 70, backgroundColor: '#E73D50'}}>
                                <TouchableOpacity onPress={() => { this.twitterSignIn() } }
                                    activeOpacity={0.5}
                                    style={ newStyle.iconStyle }>
                                        <Icon
                                            containerStyle={newStyle.iconImageStyle}
                                            name='twitter'
                                            type='font-awesome'
                                            color='#fff'
                                            size = {35}
                                            onPress={() => this.twitterSignIn() } /> 
                                </TouchableOpacity>
                        </View>

                        <View style = {{ width: 70, height: 70, marginRight: 20, borderRadius: 70, backgroundColor: '#E73D50' }}>
                                <TouchableOpacity onPress={() => this.onGoogleButtonClick() }
                                    activeOpacity={0.5}
                                    style={ newStyle.iconStyle }>
                                        <Icon
                                            containerStyle={newStyle.iconImageStyle}
                                            name='google'
                                            type='font-awesome'
                                            color='#fff'
                                            size = {35}
                                            onPress={() => this.onGoogleButtonClick() } /> 
                                </TouchableOpacity>
                        </View>
               </View>

                  <View style= {{ flex:1, marginTop: 0}}>
                        <Text 
                        style={{
                        width: 334,
                        height: 34,
                        fontFamily: "WorkSans-Medium",
                        fontSize: 14,
                        fontWeight: "500",
                        fontStyle: "normal",
                        lineHeight: 34,
                        letterSpacing: 0,
                        textAlign: "center",
                        color: "#353535"
                        }}>
                    or sign up with:
                    </Text>
                </View>                

                <View style={newStyle.inputContainer}>
               
                    <Text style={newStyle.firstName}>Email Address</Text>
                    <TextInput
                                style={ newStyle.nameInput }
                                placeholder=''
                                underlineColorAndroid= 'transparent'
                                onBlur = { () => this.validateEmail(this.state.usernameInput) }
                                onChangeText={(usernameInput) => this.setState({usernameInput})}/>

                    <Text style={newStyle.password}>Password</Text>
                    <TextInput
                        style={ newStyle.nameInputPassword}
                        placeholder=''
                        underlineColorAndroid= 'transparent'
                        onBlur = { () => this.validatePassword(this.state.passwordInput) }
                        onChangeText= { (passwordInput) => this.setState({passwordInput}) }/>

                    <Text style={newStyle.cpassword}>Password</Text>
                    <TextInput
                        style={ newStyle.nameInputPassword}
                        placeholder=''
                        underlineColorAndroid= 'transparent'
                        onBlur = { () => this.validatePassword(this.state.cpasswordInput) }
                        onChangeText= { (cpasswordInput) => this.setState({cpasswordInput}) }/>

                    <View style={newStyle.endButtons}>

                     <TouchableOpacity
                            onPress={() => { this.signUp(); }}
                            activeOpacity={0.5}
                            style={{
                                width: 340,
                                height: 57,
                                marginBottom: 10,
                                marginLeft: 20,
                                borderRadius: 8,
                                backgroundColor: '#E73D50',
                                marginTop: viewPortHeight / 130,            
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
                            > {this.state.buttonText.toUpperCase()}</Text>
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
         {/* </View> */}
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
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        backgroundColor: 'white',
        marginTop: Platform.OS === 'ios'?25:10,
        padding: 25,
        flex: Platform.OS === 'ios'?20:1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginBottom: 15,
        position: 'absolute',
        left: 70,
        top: 0,
    },

    password:{
        width: 159,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginBottom: 15,
        marginTop: 10,
        position: 'absolute',
        left: 70,
        top: 85,
    },

    cpassword:{
        width: 159,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginBottom: 15,
        marginTop: 10,
        position: 'absolute',
        left: 70,
        top: 180,
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
        position: 'absolute',
        left: 70,
        top: 190,
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
        marginTop: 0,
    },

    nameInputPassword: {
        width: 334,
        height: 57,
        borderRadius: 8,
        backgroundColor: '#f6f6f6',
        marginBottom: 15,
        padding: 10,
        marginTop: 25,
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
        // fetching: RegisterSelectors.getFetching(state),
        userinfo: state.register.user,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
    
    registerAction: ( payload,username,password ) => dispatch(RegisterActions.makeRegisterRequest(payload, username, password)),
    resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
    navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
    navigateBack: () => this.props.navigation.goBack(),

    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnSignUp);