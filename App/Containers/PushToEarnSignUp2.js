import React, { Component } from 'react'
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    Alert,
    Platform,
    AsyncStorage,
    NativeModules,
} from 'react-native';
import {
    BallIndicator,
  } from 'react-native-indicators';
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import Validation from '../Components/ButtonValidation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-input';
import CryptoJS from 'crypto-js';
import Api from './Api';
import { GoogleSignin } from 'react-native-google-signin';
import { RSA } from 'react-native-rsa-native';
import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';
import localStorage from 'react-native-sync-localstorage';
import InstagramLogin from 'react-native-instagram-login';
import Cookie from 'react-native-cookie';
import logoNew from '../Images/page1.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import languageSettingsPFM from './LanguageSettingsPFM';
import newStyle from './Styles/PushToEarnSignUp2Styles';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

import OAuthManager from 'react-native-oauth';

const manager = new OAuthManager('PushForMoney');

manager.configure({
  twitter: {
    callback_url: 'pushformoney://oauth-response/twitter',
    consumer_key: 'B9gQXS1YrrtH5Q9HDFl08MVVS',
    consumer_secret: 'ourqEe3JmhpRh7ceLpCxN4RoIRXJT9FLslqqgfLscTtHtVvCXs'
  },
  google: {
    callback_url: `io.fullstack.FirestackExample:/oauth2redirect`,
    client_id: '',
    client_secret: ''
  }
});

const Constants = {
    // Dev Parse keys
    TWITTER_COMSUMER_KEY: 'B9gQXS1YrrtH5Q9HDFl08MVVS',
    TWITTER_CONSUMER_SECRET: 'ourqEe3JmhpRh7ceLpCxN4RoIRXJT9FLslqqgfLscTtHtVvCXs',
  };

// Styles
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

class PushToEarnSignUp2 extends Component {

    // static propTypes = {
    //     language: PropTypes.string.isRequired
    // }

    constructor(props)
    {
        super(props);             

        this.state = {
            isLoggedIn: false,
            language: '',
            languageCode: '',
            validation: false,
            renderValidate: false,
            usernameInput:'',
            passwordInput:'',
            cpasswordInput:'',
            usernameInputError:false,
            passwordInputError:false,
            cpasswordInputError:false,
            buttonText: 'SIGNUP',
            ErrorText:'',
            EmptyErrorText:'',
            usernameEmptyError:false,
            passwordEmptyError:false,
            cpasswordEmptyError: false,
            text: {},
            countryCode: 'be',
            phoneNumberInput:'',
            igToken:'',
            phone:''
        };    
    }

    onGoogleButtonClick = async () => {

        console.warn('google button clicked');
        // eslint-disable-line

        this.googleSignOut();

        await GoogleSignin.configure({
          iosClientId: '1041950784543-pkmc6rhf0e6av81q1j8qhspb10oqa7dn.apps.googleusercontent.com',
        })
          .then(() => {
          // you can now call currentUserAsync()
            GoogleSignin.currentUserAsync().then((user) => {
              console.log('USER', user);
              this.setState({ user });

              if(user === null)
                  this.googleSignOut();

              this.signInGoogle();

            }).done();
          });
    };

      // Somewhere in your code
      signInGoogle = async () => {

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo });
            this.googleLogin(userInfo);

            const userNew = GoogleSignin.currentUser();

            GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
              // play services are available. can now configure library
            })
            .catch((err) => {
                console.log('Play services error', err.code, err.message);
              });

        } catch (error) {

            console.tron.log("not signed in....");
            this.setState({isLoading: false});

        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            this.setState({isLoading: false});
            // user cancelled the login flow
            Alert.alert("SIGN CANCELLED");
        } else if (error.code === statusCodes.IN_PROGRESS) {
            this.setState({isLoading: false});
            // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            this.setState({isLoading: false});
            // play services not available or outdated
        } else {
            this.setState({isLoading: false});
            // some other error happened
        }
    }

  };

      
      googleSignOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          this.setState({ user: null });
        } catch (error) {
          this.setState({
            error,
          });
        }
      };

      googleSignIn = async () => {
        GoogleSignin.signIn()
        .then((user) => {

          this.googleLogin(user);
  
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
      }

    googleLogin = (user) =>
    {

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);
        let loginInfo = "{ 'G' : '"+user.id+"','D':'"+this.getUTCDate()+"', 'R' : 'er3rssfd'}";

        console.tron.log("login data:"+loginInfo);
        
        this.rsa(loginInfo);

        this.setState({isLoading: true});

        setTimeout(() => 
        {
          if( this.state.encodedText !== "")
          {

            let payload = {

                "AuthenticationData": encryptedData,
                "LoginData": this.state.encodedText,
                "SignupMode": false,

            };

            this.props.googleLogin(payload,user.givenName,user.familyName,user.email);
        }
          else
            console.log("loginData  or authentication Data is empty");
          },3000);

    }

    instaLoginGetUsers = async (token) => {

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);

        try {

            let response = await fetch(`https://api.instagram.com/v1/users/self/?access_token=${token}`, 
            {
              method: 'GET'
            });

            console.tron.log("response="+response.ok);

            if (response.ok) {

              console.tron.log(response);

              let jsonResponse = await response.json();
              console.tron.log("jsonResponse="+jsonResponse.data.id);
              console.tron.log("jsonResponse="+jsonResponse.data.username);
              console.tron.log("jsonResponse="+jsonResponse.data.full_name);

              let loginInfo = "{ 'I' : '"+jsonResponse.data.id+"','D':'"+this.getUTCDate()+"', 'R' : 'er3rssfd'}";

              console.tron.log("authData:"+authData);
              console.tron.log("authentication data:"+encryptedData);
              console.tron.log("LoginData:"+loginInfo);
      
              this.rsa(loginInfo);

              setTimeout(() => {
                this.setState({isLoading: true,});
          
                if( this.state.encodedText !== "")
                {
        
                    let payload = {
        
                        "AuthenticationData": encryptedData,
                        "LoginData": this.state.encodedText,
                        "SignupMode": false,
        
                    };
        
                    console.tron.log("LoginData:"+this.state.encodedText);        
                    this.props.instagramLogin(payload,jsonResponse.data.username,'','','');
                }
                else
                    console.log("loginData  or authentication Data is empty");
  
              }
              ,650);            

            }
          }           
          catch (error) {

            console.tron.log("error="+error);

          }

    }

    instLogin = (token) => 
    {
        let users = this.instaLoginGetUsers(token);
    }

    instLogout = () => 
    {

        Cookie.clear().then(() => {
                this.setState({ igToken: null })
        });
  
    }

    twitterLogin(userID,userName)
    {
        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);
        let loginInfo = "{ 'T' : '"+userID+"','D':'"+this.getUTCDate()+"', 'R' : 'er3rssfd'}";
        this.rsa(loginInfo);

        this.setState({isLoading: true,});

        console.log("userName:"+userName);

        setTimeout(() => 
        {
          if( this.state.encodedText !== "")
          {

            let payload = {

                "AuthenticationData": encryptedData,
                "LoginData": this.state.encodedText,
                "SignupMode": false,

            };

            let payloadNew = JSON.stringify({
                  "userName": userName,
                  "id": userID,
            });

            this.props.twitterlogin(payload,userName,'','');
          }
          else
            console.log("loginData  or authentication Data is empty");
          },3000);
    }

    twitterSignIn = () => {
        console.warn('twitter button clicked'); // eslint-disable-line

        manager.authorize('twitter', {scopes: 'profile email'})
        .then(resp => 
            {
             console.tron.log("resp="+" access_token=" +resp.response.credentials.access_token+" "+ "refresh token="+resp.response.credentials.refresh_token);

             let done = false;
             
             const userTimelineUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
                manager
                    .makeRequest('twitter', userTimelineUrl)
                    .then(resp => {
                        console.tron.log('Data ->', resp.data);
                        resp.data.map((data) => {
                            console.tron.log("data.user="+data.user.id +" name="+data.user.name);     
                             if(!done)
                             {
                                done = true;
                                this.twitterLogin(data.user.id,data.user.name);
                             }
                        })
                    });
            }
            )
        .catch(err => console.log(err));
      }
    
      handleTwitterLogout = () => {
        console.log("logout")
        manager.deauthorize('twitter');
    }

    _responseInfoCallback = (error, result) => {

        if (error) {
            Alert.alert('Error fetching data: ' + error.toString());
        } 
        else 
        {

          let authData = AuthComponent.authenticationData(this.state.languageCode);
          let encryptedData = AesComponent.aesCallback(authData);
          let loginInfo = "{ 'F' : '"+result.id.toString()+"','D':'"+this.getUTCDate()+"', 'R' : 'er3rssfd'}";
          this.rsa(loginInfo);

          console.tron.log("login data:"+loginInfo);

          this.setState({isLoading: false});

          setTimeout(() => 
          {
            if( this.state.encodedText !== "")
            {
              let payload = {

                  "AuthenticationData": encryptedData,
                  "LoginData": this.state.encodedText,
                  "SignupMode": false,

              };

              let payloadNew = {

                    firstname: result.first_name,
                    lastname: result.last_name,
                    email: result.email,
                    id: result.id,

              };

              this.props.loginFaceBook(payload,result.first_name, result.last_name,result.email);
            }
            else
              console.log("loginData  or authentication Data is empty");
            },3000);
          
        }
      }

    initUser = (token) => {

            // Create a graph request asking for user information with 
            // a callback to handle the response.

            const infoRequest = new GraphRequest(
                '/me',
                {
                    accessToken: token,
                    parameters: {
                      fields: {
                        string: 'email,name,first_name,middle_name,last_name,id'
                      }
                    }
                },this._responseInfoCallback
              );

            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();        
          
    }

    onFacebookButtonClick = () => {

        console.log('facebook button clicked');
        console.warn('Facebook button clicked'); // eslint-disable-line
    
        LoginManager.logInWithReadPermissions(['user_friends', 'public_profile', 'email']).then(
          (result) => {
            if (result.isCancelled) {

              console.log('Login was cancelled');

            } else {

              console.log(`Login was successful with permissions: ${result.grantedPermissions.toString()}`);

              const data = AccessToken.getCurrentAccessToken();

                AccessToken.getCurrentAccessToken().then((data) => {
                    const { accessToken } = data;                   
                    this.initUser(accessToken);
                  });
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

        if(password.length >= 6 && !password.includes(" "))
            this.setState({ passwordInputError: false, passwordEmptyError: false, passwordInput: password, EmptyErrorText: '' });
        else
        {
            this.setState({ passwordInputError:true, passwordEmptyError: false, passwordInput: password, EmptyErrorText: '' });

        }
    }

    validateEmail = (text) => {

        console.log("email="+text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
            console.log("Email is Not Correct");
            this.setState({ usernameInputError: true, usernameInput: text, usernameEmptyError: false, EmptyErrorText: '' });
            //    return false;
        }
        else 
        {
           this.setState({ usernameInputError: false, usernameInput: text, usernameEmptyError: false, EmptyErrorText: '' });
        }

    }

    somethingElse = () => {

    }

    componentWillReceiveProps(nextProps) {

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

        console.log("phone="+this.props.navigation.state.params.phone);
        console.tron.log("phone="+this.props.navigation.state.params.phone);

        await AsyncStorage.getItem('language').then((language) => {
            this.setState({ language: language, phone: this.props.navigation.state.params.phone });
        });

        this.setLanguage();

    }

    componentDidMount() {

        console.log("phone="+this.props.navigation.state.params.phone);
        console.tron.log("phone="+this.props.navigation.state.params.phone);


        let language = localStorage.getItem('language');
        console.log('local storage language='+language);

        AsyncStorage.getItem('language').then((language) => {
            this.setState({ language: language });
        });

        this.setState({ language: language});
        
        if(this.state.language === 'Dutch')
            this.setState({ text: languageSettingsPFM.Dutch, languageCode: 'nl'});
        else
            if(this.state.language === 'English')
            this.setState({ text: languageSettingsPFM.English, languageCode: 'en'});
        else
            if(this.state.language === 'French')
            this.setState({ text: languageSettingsPFM.French, languageCode: 'fr'});

        LoginManager.logOut();

        this.instLogout();

        this.googleSignOut();

        this.handleTwitterLogout();

    }

    renderNothing = () => {

    }

    renderValidation = () => {

        console.log("empty error text="+this.state.EmptyErrorText);
        console.log("first Name Input="+this.state.firstNameInput);
        console.log("phone Number Input="+this.state.phoneNumberInput);

        let errorString = this.state.EmptyErrorText;

        if(this.state.firstNameError===true || this.state.firstNameInput === '')
            errorString = errorString + '\n' + this.state.firstNameErrorText;

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
        //2018-04-30 11:30:12
    
        var date, day, month, year;
        var today = new Date();
    
        day = parseInt(today.getUTCDate())>=10?today.getUTCDate():('0'+today.getUTCDate().toString());
        month = parseInt(today.getUTCMonth()+1)>=10?parseInt(today.getUTCMonth()+1):('0'+parseInt(today.getUTCMonth()+1));
        year = today.getUTCFullYear().toString();

        console.tron.log("day="+day);
    
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

        console.tron.log("encodedText="+this.state.encodedText);

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

        console.tron.log("validate Encrypt");
        if(this.state.phoneNumberInput === '')
            {
                    Alert.alert(
                        'PhoneNumber is Empty',
                        'Fill in PhoneNumber',
                        [
                            {
                              text: 'OK', 
                              onPress: () => console.log('Ask me later Pressed')
                            },                      
                        ],
                        {cancelable: false}
                    );
            }
          else
          {

            let language = this.state.languageCode;

            let authData = AuthComponent.authenticationData(this.state.languageCode);
            let encryptedData = AesComponent.aesCallback(authData);

            //let cAuthenticationData = "{'Lang':"+" '"+this.state.language+"',"+"  'AuthID': 'JS#236734', 'Data':'FormSignUp', 'D' :"+" '"+this.getUTCDate()+"'"+","+  " 'R' : 'er3rss'}";            
            let loginInfo = "{'M':"+"'"+this.state.phoneNumberInput+"','D':"+" '"+this.getUTCDate()+"'"+", 'R' : 'er3rssfd'}";

            this.rsa(loginInfo);

            console.tron.log("loginData:"+loginInfo);

            this.setState({ cAuthenticationData: encryptedData,});

            console.tron.log("encrypted Data:"+this.state.cAuthenticationData);

          }
    }

      signUp =  () => 
      {

        let language = this.state.languageCode;

        console.tron.log("phone in state.phone ="+this.state.phone);
        console.tron.log("phone length in state.phone ="+this.state.phone.length);

        if(this.state.phone.length < 11 && this.state.phoneNumberInput === '')
        {
            Alert.alert(this.state.text.invalidMobilePhone);
            return;
        }

        if(this.state.phone !== null)
        {
            this.setState({isLoading: true, });

                this.validateBGPhoneNumber(this.state.phone);                

                setTimeout(() => {

                    if(this.state.phoneNumberInput !== '')
                    {
                        console.tron.log("phone number Input==="+this.state.phoneNumberInput);
                            this.validateEncrypt(this.state.phoneNumberInput);
                    }
                    else
                    {

                    }            
                       
                        let authData = AuthComponent.authenticationData(this.state.languageCode);
                        let encryptedData = AesComponent.aesCallback(authData);
    
                        setTimeout( () => {
                            if( this.state.encodedText !== "")
                            {
            
                            let payload = {
                                
                                "AuthenticationData": encryptedData,
                                "LoginData": this.state.encodedText,
                                "SignupMode": true
                        
                            };
                            
                                console.tron.log("payload="+payload);
                                console.tron.log("phone number Input="+this.state.phoneNumberInput);

    
                                this.props.registerAction(payload,this.state.phoneNumberInput);
                                
                                this.setState({isLoading: false});
                            }
                            else
                            console.log("loginData  or authentication Data is empty");
                        },1200);
                },700);

        }
        else
            if(this.state.phoneNumberInput === '')
                {
                    
                }
            else
            {

                this.setState({isLoading: true});

                    if(this.state.phoneNumberInput !== '')
                    {
                        this.validateEncrypt(this.state.phoneNumberInput);
                    }
                    else
                        {

                        }            
                
                let authData = AuthComponent.authenticationData(this.state.languageCode);
                let encryptedData = AesComponent.aesCallback(authData);

                setTimeout( () => {
                    if( this.state.encodedText !== "")
                    {
    
                    let payload = {
                        
                        "AuthenticationData": encryptedData,
                        "LoginData": this.state.encodedText,
                        "SignupMode": true
                
                    };

                    
                        console.tron.log("payload="+payload);
                        console.tron.log("phone number Input="+this.state.phoneNumberInput);

                        this.props.registerAction(payload,this.state.phoneNumberInput);
                        
                        this.setState({isLoading: false});
                    }
                    else
                    console.log("loginData  or authentication Data is empty");
                },2000);

            }
    }


    func = (renderValidate,EmptyErrorText) => {
      this.setState({renderValidate,EmptyErrorText});
    }

    getUser = async ( access_token ) => {

        console.log("access_token="+access_token.toString());

        this.setState({ refreshing: true });

        const baseApi = 'https://api.linkedin.com/v1/people/';
        const qs = { format: 'json' };

        const params = [
          'first-name',
          'last-name',
          'picture-urls::(original)',
          'headline',
          'email-address',
        ];

        const response = await fetch(
            `${baseApi}~:(${params.join(',')})?format=json`,
            {
              method: 'GET',
              headers: {
                Authorization: 'Bearer ' + access_token
              }
            }
          );

        const payload = await response.json();

        const userStr = JSON.stringify(payload);

        JSON.parse(userStr, (key, value) => { 
            console.log(value);
        });

        Alert.alert(
            'Fetching User Data from linkedin',
            'getUser method response='+JSON.parse(JSON.stringify(payload)),
            [                      
                {
                text: 'OK', 
                onPress: () => console.log('Ask me later Pressed')
                },                      
            ],
            {cancelable: false}
        ); 
      }

      linkedIn = () => {

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

    formatMobileNo = (mobileNo) => {

        let newMobNo = "+32";
        mobileNo = this.removeSpaces(mobileNo);
        console.log("mobileNo w/out spaces ="+mobileNo);
        console.log("mobileNo="+mobileNo);

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

            console.log("newMobNo="+newMobNo);
         }

        if(newMobNo === "+32")
          {
              if(mobileNo.substring(0,1)!=="+")
                newMobNo = "+" + mobileNo;
              else
                newMobNo = mobileNo;
          }

        return newMobNo;
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

        phone = this.removeSpaces(phone);
        console.tron.log("formatted phone text="+phone);
        this.setState({phoneNumberInput: phone});

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

    validateBelgiumPhoneNumber = (phone) => {

        phone = this.removeSpaces(phone);

        console.tron.log("formatted phone text="+phone);

        let countryCode = "+32";
        let firstFour = phone.substring(0,4);
        let rest = phone.substring(4);
        let firstTwo = phone.substring(0,2);
        let restTwo = phone.substring(2);

        if(phone.substring(0,1) !== "+" && phone.substring(0,1) !== "0" && phone.length === 11)
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

    render() {

        const platform = Platform.OS;
        console.log("platform --->",Platform.OS);
        console.log('language='+this.state.language);
        console.log('text='+this.state.text.SignUp);

        return (

            <KeyboardAwareScrollView
                behavior="padding"
                enableOnAndroid={false}
                contentContainerStyle={newStyle.container}
                scrollEnabled={true}
                scrollToEnd={false}
                enableResetScrollToCoords={false}
                enableAutomaticScroll={false}>
            
                <View style={newStyle.headerImage}>
                    <Image source={logoNew} resizeMode="contain" style={{ width: 225, height: 45 }} />
                </View>

                <View style= {{ flex:1, flexDirection: 'row', paddingLeft:20, backgroundColor: 'transparent' }}>
                        <Text 
                            style={{
                            width: 340,
                            height: 34,
                            fontFamily: "WorkSans-Medium",
                            fontSize: 21,
                            fontWeight: "500",
                            fontStyle: "normal",
                            lineHeight: 34,
                            letterSpacing: 0,
                            textAlign: "center",
                            paddingLeft: 45,
                            marginRight: 0,
                            color: "#E73D50",
                            backgroundColor:'transparent'
                        }}>
                        {this.state.text.SignUp}
                    </Text>
                    <Text
                        style={{    
                            width: 43,
                            height: 20,
                            marginTop:10,
                            marginRight: Platform.OS==='ios'?30:50,
                            fontFamily: "WorkSans-Medium",
                            fontSize: 12,
                            fontWeight: "500",
                            fontStyle: "normal",
                            letterSpacing: 0.43,
                            textAlign: "left",
                            color: "rgb(231, 61, 80)",
                            textDecorationLine: 'underline',
                            backgroundColor: 'transparent'
                        }}
                        onPress = { () => this.props.navigation.navigate('PushToEarnSignIn2',{isLoading:false}) }>
                           {this.state.text.SignIn}
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
                                            size = {40}
                                        /> 
                                </TouchableOpacity>
                        </View>

                        <View style= {{width: 70, height: 70,marginRight: 20, borderRadius: 70, backgroundColor: '#E73D50' }}>
                                <TouchableOpacity onPress={() => this.instagramLogin.show() }
                                    activeOpacity={0.5}
                                    style={ newStyle.iconStyle }>
                                        <Icon
                                            containerStyle={newStyle.iconImageStyle}
                                            name='instagram'
                                            type='font-awesome'
                                            color='#fff'
                                            size = {40}
                                        /> 
                                            <InstagramLogin
                                                        ref= {ref => this.instagramLogin = ref}
                                                        clientId={'31953fccb0a14a4488e6845bdb225786'}
                                                        scopes={['public_content', 'follower_list']}
                                                        redirectUrl = {'https://jobfixers.be'}
                                                        onLoginSuccess={(igToken) => {
                                                            this.setState({ igToken });
                                                            this.instLogin( igToken );
                                                        }}
                                                        onLoginFailure={(data) => console.log(data)}                                                        
                                            />
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
                                            size = {40}
                                        /> 
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
                                            size = {40}
                                        /> 
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
                    {this.state.text.SignUpWith}
                    </Text>
                </View>

                 {
                        this.state.isLoading===true?
                            <View style = {{position: 'absolute' , zIndex:3999, left: 30, top: 0, right: 0, bottom: 0}}>
                                    <BallIndicator color='#e73d50' />
                            </View>
                            :
                            this.somethingElse()
                  }

                <View style={newStyle.inputContainer}>

                    <Text style={newStyle.firstName}>{this.state.text.Phone}</Text>
                    {
                        (this.state.phone === '')?
                        <PhoneInput
                            opacity={1}
                            ref={(ref) => { this.phone = ref; }}
                            initialCountry={this.state.countryCode}
                            onSelectCountry={(iso2) => { this.setState({countryCode: iso2}); console.log('country='+this.state.countryCode) }}
                            style= {newStyle.nameInput}              
                            onChangePhoneNumber = { (phoneNumberInput) => this.validateBGPhoneNumber(phoneNumberInput) }
                        />
                        :
                        <PhoneInput
                        opacity={1}
                        ref={(ref) => { this.phone = ref; }}
                        initialCountry={this.state.countryCode}
                        onSelectCountry={(iso2) => { this.setState({countryCode: iso2}); console.log('country='+this.state.countryCode) }}
                        style= {newStyle.nameInput} 
                        value = { this.state.phone }
                        onChangePhoneNumber = { (phoneNumberInput) => this.validateBGPhoneNumber(phoneNumberInput) }
                    />

                    }
                    <View style={newStyle.endButtons}>

                     <TouchableOpacity
                            onPress={() => { this.signUp(); }}
                            activeOpacity={0.5}
                            style={{
                                width: 340,
                                height: 57,
                                marginBottom: 10,
                                marginLeft: Platform.OS==='ios'?20:12,
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
                                    height: 21,
                                    fontFamily: 'WorkSans-Regular',
                                    fontWeight: '500',
                                    fontStyle: 'normal',
                                    color: '#ffffff',
                                    marginTop: 0,                
                                    letterSpacing: 0.67,
                                    textAlign: 'center'}}
                            > {this.state.text.SignUp}</Text>
                        </TouchableOpacity>
                    </View>                

                </View>
 
            </KeyboardAwareScrollView>


        );
    }

}

const mapStateToProps = state => {
    return {
        // fetching: RegisterSelectors.getFetching(state),
        userinfo: state.register.user,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
    
        registerAction: ( payload, mobileNumber ) => {
            dispatch({type: 'MOBILE_REGISTER_REQUEST',payload,mobileNumber})
        },  

        loginFaceBook: ( payload, firstname, lastname, email ) => dispatch({ type: 'FACEBOOK_REQUEST', payload, firstname, lastname, email}),
        twitterlogin: (payload,firstname,lastname,email) => dispatch({ type:'TWITTER_REQUEST',payload,firstname,lastname,email }),
        googleLogin: (payload,firstname,lastname,email) => dispatch({ type: 'GOOGLE_REQUEST',payload,firstname,lastname,email}),
        instagramLogin: (payload,username,firstname,lastname,email) => dispatch({ type: 'INSTAGRAM_REQUEST', payload,username,firstname,lastname,email}),
        resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
        navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
        navigateBack: () => this.props.navigation.goBack(),

    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnSignUp2);