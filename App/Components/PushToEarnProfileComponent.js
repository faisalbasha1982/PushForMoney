import React, { Component } from 'react'
import {
    ScrollView,
    Text,
    Image,
    View,
    AsyncStorage,
    KeyboardAvoidingView,
    TouchableOpacity,
    Dimensions,
    TextInput,
    PixelRatio,
    Alert,
    Platform,
    AppState,
    PushNotificationIOS,
    findNodeHandle,
    NativeModules,
    Keyboard
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
import ButtonWelcome from '../Components/ButtonWelcome';
import ButtonCardDetails from '../Components/ButtonCardDetails';
import LanguageButton from '../Components/LanguageButton';
import Spinner from "react-native-loading-spinner-overlay";
import DeviceInfo, { isPinOrFingerprintSet } from 'react-native-device-info'
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import CompanyBanner from '../Components/CompanyBanner';
import Validation from '../Components/ButtonValidation';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-input';
import { ProfileSelectors } from '../Redux/ProfileRedux';
import { LoginSelectors } from '../Redux/LoginRedux';
import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';
import localStorage from 'react-native-sync-localstorage';
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';
import PushNotif from '../Containers/PushNotif';
import PushNotification from 'react-native-push-notification';
import { Colors } from "../Themes";
import { Images } from '../Themes';
import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/NewHeaderImage.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
// import ImgToBase64 from 'react-native-image-base64';
import call from 'react-native-phone-call';
// import RNFetchBlob from 'react-native-fetch-blob';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;
let ltoken = localStorage.getItem('token');

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

let cLanguage = '';

  // More info on all the options is below in the API Reference... just some common use cases shown here
  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

class PushToEarnProfileComponent extends Component {

    constructor(props)
    {
        super(props);             

        this.state = {
            language: 'NEDERLANDS',
            languageCode:'',
            placeHolderColor:'',
            placeHolderColorLastName:'',
            placeHolderColorEmail:'',
            placeHolderColorPhone:'',
            placeHolderColorPassword:'',
            pickerData:'',
            countryCode:'be',
            firstName:'',
            name:'',
            phoneNumber:'',
            validation: false,
            renderValidate: false,
            firstNameInput:'',
            firstNameEditable: false,
            lastNameEditable: false,
            emailEditable:false,
            phoneEditable:false,
            passwordEditable:false,
            lastNameInput:'',
            phoneNumberInput:'',
            emailInput:'',     
            passwordInput:'',
            cardDetails:'',
            buttonText: '...........................',
            selectionFirst:false,
            selectionSecond:false,
            selectionThird:false,
            selectionFourth:false,
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
            emailEmptyError:false,
            cardDetailsError:false,
            mobileNotifications:[],
            phoneTextChanged: false,
            aToken:'',
            text:{},
            isLoading:false
        };    
    }

    validateLastName = (name) => {

        let reg = /^[a-zA-Z\s]+$/;

        console.log("last name="+name);

        if(name === '')
        {
            this.setState({lastNameInput: ''});

            if(this.state.languageCode === 'nl')
                this.setState({ lastNameEmptyError: true, EmptyErrorText: LanguageSettings.dutch.EmptyErrorText });
            else
                if(this.state.languageCode === 'en')
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
              if(this.state.languageCode === 'NEDERLANDS')
                  this.setState({ lastNameEmptyError: false, lastNameError: true, lastNameErrorText: LanguageSettings.dutch.LNameErrorText });
              else
                  if(this.state.languageCode === 'ENGLISH')
                      this.setState({ lastNameEmptyError: false, lastNameError: true,lastNameErrorText: LanguageSettings.english.LNameErrorText });
                  else
                      this.setState({ lastNameEmptyError: false, lastNameError: true,lastNameErrorText: LanguageSettings.french.LNameErrorText });
            }    
        }    
    } 

    validateFirstName = (name) => {

        let reg = /^[a-zA-Z\s]+$/;

        console.log("validating First Name="+name);
        console.tron.log("validating the first name");

        if(name === '')
        {
            console.log("First name is empty="+name);
            console.log("Language ="+this.state.language);
            this.setState({firstNameInput: ''});

            if(this.state.languageCode === 'nl')
                this.setState({ firstNameEmptyError: true, EmptyErrorText: LanguageSettings.dutch.EmptyErrorText });
            else
                if(this.state.languageCode === 'en')
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
              if(this.state.languageCode === 'nl')
                  this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: true, firstNameErrorText: LanguageSettings.dutch.FNameErrorText });
              else
                  if(this.state.languageCode === 'en')
                      this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: true, firstNameErrorText: LanguageSettings.english.FNameErrorText });
                  else
                      this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: true, firstNameErrorText: LanguageSettings.french.FNameErrorText });
            }
        }        
    }

    validateUAEPhoneNumber = (phone) => {
        this.setState({ phoneNumberInput: phone});
        this.changeMobile(phone);  
    }

    validatePhoneOnChangeText = (phone) => {

        console.tron.log("phone through input="+phone);
        console.tron.log("phone in store="+this.props.mobileNo);

        //phone = this.state.phoneNumberInput;

        let phoneSub = phone.substring(1);
        let firstTwo = phone.substring(1,3);
        let nextTwo = phone.substring(3,5);
        let lengthOfString = phoneSub.length;

        console.tron.log("phone validation="+phone);
        console.tron.log("phone length="+lengthOfString);
        console.tron.log("first two="+firstTwo);
        console.tron.log("first two="+nextTwo);
        // console.tron.log("phone length="+phoneSub.length);

        console.log("formatted phone="+this.formatMobileNo(phone));

        let reg = /^[0-9]{12}$/;
        let regNew = /^(?=(.*\d){10})(?!(.*\d){13})[\d\(\)\s+-]{10,}$/;
        let homePhone = /^((\+|00)32\s?|0)(\d\s?\d{3}|\d{2}\s?\d{2})(\s?\d{2}){2}$/;
        let mPhone = /^((\+|00)32\s?|0)4(60|[789]\d)(\s?\d{2}){3}$/;

        this.setState({isLoading:false});

        if(phone === '')
        {
            this.setState({phoneNumberInput: ''});

            if(this.state.languageCode === 'nl')
                this.setState({ phoneNumberEmptyError: true, EmptyErrorText: LanguageSettings.dutch.EmptyErrorText });
            else
                if(this.state.languageCode === 'en')
                    this.setState({ phoneNumberEmptyError: true, EmptyErrorText: LanguageSettings.english.EmptyErrorText });
                else
                    this.setState({ phoneNumberEmptyError: true, EmptyErrorText: LanguageSettings.french.EmptyErrorText });
        }
        else
        {
                if(lengthOfString >= 11)
                {
                        if(nextTwo === "45" || nextTwo === "46" || nextTwo === "47"  || nextTwo === "48" || nextTwo === "49")
                        {
                            console.log("phone="+phone);

                                this.setState({phoneNumberInput: this.formatMobileNo(phone)});

                                    this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: false, phoneNumberInput: phone, phoneNumberErrorText: '', });

                                    if(phone !== this.props.mobileNo)
                                    {
                                        this.setState({isLoading:false,phoneTextChanged: true});
                                        //this.changeMobile(this.formatMobileNo(phone));
                                    }            
                                    else
                                    if(phone === this.props.mobileNo)
                                        {
                                            this.setState({isLoading:false,phoneTextChanged: false});
                                            //Alert.alert("This Mobile No is already assigned to you");
                                        }
                        }
                      else
                      {
                        //Alert.alert("Invalid phone number="+phone);
                        if(lengthOfString >=12)
                        {
                            this.setState({phoneNumberInput: this.formatMobileNo(phone)});
                            this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: false, phoneNumberInput: phone, phoneNumberErrorText: '',phoneTextChanged: true });

                            if(phone !== this.props.mobileNo )
                            {
                                this.setState({isLoading:false,phoneTextChanged: true});
                                //this.changeMobile(this.formatMobileNo(phone));    
                            }
                            else
                            if(phone === this.props.mobileNo)
                            {
                                this.setState({isLoading:false,phoneTextChanged: false});
                                // Alert.alert("This Mobile No is already assigned to you");
                            }


                        }
    
                      }
                }
                else
                {

                }
        }

    }
    

    validatePhone = (phone) => {

        //this.validateBGPhoneNumber(phone);

        console.tron.log("phone through input="+phone);
        console.tron.log("phone in store="+this.props.mobileNo);

        //phone = this.state.phoneNumberInput;

        let phoneSub = phone.substring(1);
        let firstTwo = phone.substring(1,3);
        let nextTwo = phone.substring(3,5);
        let lengthOfString = phoneSub.length;

        console.tron.log("phone validation="+phone);
        console.tron.log("phone length="+lengthOfString);
        console.tron.log("first two="+firstTwo);
        console.tron.log("first two="+nextTwo);
        // console.tron.log("phone length="+phoneSub.length);

        console.log("formatted phone="+this.formatMobileNo(phone));

        let reg = /^[0-9]{12}$/;
        let regNew = /^(?=(.*\d){10})(?!(.*\d){13})[\d\(\)\s+-]{10,}$/;
        let homePhone = /^((\+|00)32\s?|0)(\d\s?\d{3}|\d{2}\s?\d{2})(\s?\d{2}){2}$/;
        let mPhone = /^((\+|00)32\s?|0)4(60|[789]\d)(\s?\d{2}){3}$/;

        this.setState({isLoading:false});

        if(phone === '')
        {
            this.setState({phoneNumberInput: ''});

            if(this.state.languageCode === 'nl')
                this.setState({ phoneNumberEmptyError: true, EmptyErrorText: LanguageSettings.dutch.EmptyErrorText });
            else
                if(this.state.languageCode === 'en')
                    this.setState({ phoneNumberEmptyError: true, EmptyErrorText: LanguageSettings.english.EmptyErrorText });
                else
                    this.setState({ phoneNumberEmptyError: true, EmptyErrorText: LanguageSettings.french.EmptyErrorText });
        }
        else
        {
                if(lengthOfString >= 11)
                {
                        if(nextTwo === "45" || nextTwo === "46"
                            || nextTwo === "47"  || nextTwo === "48"
                            || nextTwo === "49")
                        {
                            console.log("phone="+phone);

                                this.setState({phoneNumberInput: this.formatMobileNo(phone)});

                                    this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: false, phoneNumberInput: phone, phoneNumberErrorText: '' });

                                    if(phone !== this.props.mobileNo)
                                    {
                                        this.setState({isLoading:false,});
                                        this.changeMobile(this.formatMobileNo(phone));
                                    }            
                                    else
                                    if(phone === this.props.mobileNo)
                                        {
                                            this.setState({isLoading:false});
                                            //Alert.alert("This Mobile No is already assigned to you");
                                        }
                        }
                      else
                      {
                        //Alert.alert("Invalid phone number="+phone);
                        if(lengthOfString >=12)
                        {
                            this.setState({phoneNumberInput: this.formatMobileNo(phone)});
                            this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: false, phoneNumberInput: phone, phoneNumberErrorText: '' });

                            if(phone !== this.props.mobileNo )
                            {
                                this.setState({isLoading:false});
                                this.changeMobile(this.formatMobileNo(phone));    
                            }
                            else
                            if(phone === this.props.mobileNo)
                            {
                                this.setState({isLoading:false});
                                // Alert.alert("This Mobile No is already assigned to you");
                            }


                        }
    
                      }
                }
                else
                {

                }
        }
    }

    validateEmail = (email) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

        if(reg.test(email) === false)
        {
            console.log("Email is Not Correct");
            // this.setState({emailInput:email});
            //Alert.alert("Your Email is not in Correct format");
            return false;
        }
        else {
            this.setState({emailInput:email});
            console.log("Email is Correct");
        }

    }

    renderNothing = () => {

    }

    cardDetails = (MobileUserBankDetails) => {
        return (
            <View style={{flex: 25, }}>
                    <Text style={newStyle.firstName}>Card Details</Text> {'\n'}
                    <Text style={newStyle.para}> Add your card details  <Text style={{ color: '#e73d50',fontFamily: 'WorkSans-Bold', fontWeight: '500', fontSize: 20  }} onPress={() => this.props.menu(5)}>here</Text> </Text>
            </View>
        );
    }        

    PhoneNumberPickerChanged = (country, callingCode, phoneNumber) => {
        this.setState({countryName: country.name, callingCode: callingCode, phoneNo:phoneNumber});
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
    
    componentWillReceiveProps(nextProps) {

    }

getAsyncStorage = async () => {

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);

        await AsyncStorage.getItem('language').then((language) => {
            this.setState({ language: language });
        });

        this.setLanguage();

        await AsyncStorage.getItem('token').then((token) => {
            this.setState({ aToken:token });

            // setTimeout(() => 
            // {
            //     console.log("async token from Storage="+this.state.aToken);
    
            //     let newPayload = {
            //         "AuthenticationData": encryptedData,
            //         "LoginAccessToken": this.state.aToken,
            //         "UpdateRequired" : 1,
            //         "ReadAll" : 0,
            //         "LastViewedNotificationID" : this.props.LastViewedNotificationID,
            //     };
    
            //     this.props.notificationRequest(newPayload);
    
            //     setTimeout(() => {
            //         // console.tron.log("mobilenotifications="+this.props.mobileNotifications);
            //         this.setState({ mobileNotifications: this.props.mobileNotifications});
            //     }, 3000);
    
            // },3000);    
    
            // setTimeout(() => {
            //     AppState.addEventListener('change',this.handleAppStateChange);            
            // },4000);

          });

    }

    pushNotification = () => {

        let date = new Date(Date.now() + (20 * 1000));
        console.log("push notifications");

        (this.state.mobileNotifications !== null && this.state.mobileNotifications !== undefined)?
        this.state.mobileNotifications.map(notificationObject => 
                PushNotification.localNotificationSchedule({
                    message: notificationObject.Message,
                    date
                }))
       :
       this.renderNothing();

    }

    handleAppStateChange = (appState) =>
    {
        if(appState === 'background')
        {

          console.log("inside handleAppStateChange");

          setTimeout(() => {
            this.pushNotification();
          },3000);

        }
    }

    componentWillMount() {
        console.log("component Will Mount inside profile component");
        this.getAsyncStorage();
        // this.setState({ isLoading: true});
    }
    
    componentWillUnmount() {
        AppState.addEventListener('change',this.handleAppStateChange);
    }
  
    displayBase64String = (base64String) => {

        console.log("base64 string="+base64String);
        // console.tron.log("base64 string="+base64String);

    }

    imageCapture = ( ) => {

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
        
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
            const source = { uri: response.uri };
        
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };

            // ImgToBase64.getBase64String(response.uri+':image/jpeg;base64',)
            //             .then(base64String => displayBase64String(base64String))
            //             .catch(err => console.log(err));

            NativeModules.RNImageToBase64.getBase64String(response.uri, (err, base64) => {

                // Do something with the base64 string
                console.log("base64="+base64);              

              });

            this.setState({
                avatarSource: source,
            });
            }
        });
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.isLoading !== prevProps.isLoading) {
            this.setState({ isLoading: false});
            //this.callProfile();
        }
      }

    callProfile = () =>  {

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);

        setTimeout(() =>
        {

            let payload = {
                "AuthenticationData": encryptedData,
                "LoginAccessToken": this.state.aToken,
            };

            this.props.getProfile(payload);

        },650);        
    }

    componentDidMount() {

        let language = localStorage.getItem('language');
        this.getAsyncStorage();

        console.log("language="+this.state.language);

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);
        ltoken = localStorage.getItem('token');

        let asynToken = '';
        console.log("PC login access token="+this.state.aToken);

        console.tron.log("first name="+this.props.firstName);
        console.tron.log("login access token="+this.state.aToken);

        setTimeout(() =>
        {
            let payload = {
                "AuthenticationData": encryptedData,
                "LoginAccessToken": this.state.aToken,
            };

            this.props.getProfile(payload);

            let newPayload = {
                "AuthenticationData": encryptedData,
                "LoginAccessToken": this.state.aToken,
                "UpdateRequired" : 0,
                "ReadAll" : 0,
                "LastViewedNotificationID" : this.props.LastViewedNotificationID,
            };

            this.props.notificationRequest(newPayload);

            setTimeout(() => {
                // console.tron.log("mobilenotifications="+this.props.mobileNotifications);
                this.setState({ mobileNotifications: this.props.mobileNotifications, isLoading: false,});
            }, 2000);

        },100);    

        setTimeout(() => {
            AppState.addEventListener('change',this.handleAppStateChange);            
        },600000 ); // 10 minutes
    }


    renderNothing = () => {

    }

    changeCountry = () => {

        // this.setState({ countryCode: this.phone.getPickerData() });

    }

    somethingElse = () => {

    }

    seteditablePassword = () => {

        this.setState({passwordEditable: !this.state.passwordEditable,firstNameEditable: false, lastNameEditable:false, emailEditable: false, phoneEditable: false,});

        (this.state.passwordEditable === true)?
        this.setState({placeHolderColorPassword:'grey' })
        :
        this.setState({placeHolderColorPassword:'grey'});
    }

    seteditablePhone = () => {

        this.setState({phoneEditable: !this.state.phoneEditable,firstNameEditable: false, lastNameEditable:false, emailEditable: false, passwordEditable: false,});

        (this.state.phoneEditable === true)?
        this.setState({placeHolderColorPhone:'lightgray' })
        :
        this.setState({placeHolderColorPhone:'grey'});

        if(this.state.phoneEditable === false)
        {
            console.tron.log("phone Editable pressed!");
            this.phone.focus();
        }

        if(this.state.phoneEditable === true && this.state.phoneTextChanged === true)
        {            
            if(this.state.phoneNumberInput !== this.props.mobileNo && this.state.phoneNumberInput.length >=11)
            {
                this.changeMobile(this.formatMobileNo(this.state.phoneNumberInput));
                this.setState({phoneTextChanged: false});    
            }
        }

    }

    seteditableEmail = () => {

        console.tron.log("email field called");

        if(this.state.phoneTextChanged === true)
        {
            if(this.state.phoneEditable === true && this.state.phoneTextChanged === true)
            {            
                if(this.state.phoneNumberInput !== this.props.mobileNo && this.state.phoneNumberInput.length >=11)
                {
                    this.changeMobile(this.formatMobileNo(this.state.phoneNumberInput));
                    this.setState({phoneTextChanged: false});    
                }
            }
        }

        this.setState({emailEditable: !this.state.emailEditable,firstNameEditable: false, lastNameEditable:false, phoneEditable: false, passwordEditable: false,});

        (this.state.emailEditable === true)?
        this.setState({placeHolderColorEmail:'lightgray' })
        :
        this.setState({placeHolderColorEmail:'grey'});

    }

    seteditableFirstName = () => {

        if(this.state.phoneTextChanged === true)
        {
            if(this.state.phoneEditable === true && this.state.phoneTextChanged === true)
            {            
                if(this.state.phoneNumberInput !== this.props.mobileNo && this.state.phoneNumberInput.length >=11)
                {
                    this.changeMobile(this.formatMobileNo(this.state.phoneNumberInput));
                    this.setState({phoneTextChanged: false});    
                }
            }
        }
        
        this.setState({firstNameEditable: !this.state.firstNameEditable,lastNameEditable: false, emailEditable:false, phoneEditable: false, passwordEditable: false,});

        (this.state.firstNameEditable === true)?
        this.setState({placeHolderColor:'lightgray' })
        :
        this.setState({placeHolderColor:'grey'});

    }

    seteditableLasttName = () => {

        if(this.state.phoneTextChanged === true)
        {
            if(this.state.phoneEditable === true && this.state.phoneTextChanged === true)
            {            
                if(this.state.phoneNumberInput !== this.props.mobileNo && this.state.phoneNumberInput.length >=11)
                {
                    this.changeMobile(this.formatMobileNo(this.state.phoneNumberInput));
                    this.setState({phoneTextChanged: false});    
                }
            }
        }

        this.setState({lastNameEditable: !this.state.lastNameEditable, firstNameEditable: false, emailEditable:false, phoneEditable: false, passwordEditable: false, });

        (this.state.lastNameEditable === true)?
        this.setState({placeHolderColorLastName:'lightgray' })
        :
        this.setState({placeHolderColorLastName:'grey'});
    }

    callUpdateEmail = (email) => {

        if(email === '')
            return;

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);

        this.setState({isLoading: true});

        let payload = {
            "AuthenticationData": encryptedData,
            "LoginAccessToken":this.state.aToken,
            "NewEmail": email,
        };

        // Alert.alert("inside update email:");

        this.props.emailUpdate(payload);

        setTimeout(() => {
            this.setState({ isLoading: false});
        },4000);

    }

    callUpdateName = (name) => {

        if(name === '')
            return ;

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);

        this.setState({isLoading: true});

        console.log("login access token="+this.state.aToken);
        // console.tron.log("update name login access token="+this.state.aToken);

        let payload = {
            "AuthenticationData": encryptedData,
            "LoginAccessToken":this.state.aToken,
            "NewFirstName": name,
        };

        this.props.nameUpdate(payload);

        setTimeout(() => {
            this.setState({ isLoading: false});
        },650);
    }

    callUpdateLastName = (name) => {

        if(name === '')
            return;

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);

        this.setState({isLoading: true});

        console.log("login access token="+this.state.aToken);
        // console.tron.log("login access token="+this.state.aToken);

        let payload = {
            "AuthenticationData": encryptedData,
            "LoginAccessToken":this.state.aToken,
            "NewLastName": name,
        };

        this.props.nameUpdate(payload);

        setTimeout(() => {
            this.setState({ isLoading: false});
        },650);
    }

    changeMobile = (phoneNumber) => {

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);

        this.setState({isLoading: true});

        console.log("login access token="+this.state.aToken);
        // console.tron.log("login access token="+this.state.aToken);

        console.log("actual phone number="+phoneNumber);

        console.log("phoneNumber="+this.formatMobileNo(phoneNumber));
        //Alert.alert("phoneNumber="+this.formatMobileNo(phoneNumber));

        let payload = {
            "AuthenticationData": encryptedData,
            "LoginAccessToken":this.state.aToken,
            "NewMobileNumber": phoneNumber,
        };

        this.props.changeMobile(payload);
        console.log(" CM this.props.statusCode="+this.props.statusCode);

        setTimeout(() => {
                {
                    this.setState({ isLoading: false });

                    (this.props.statusCode === 200)?
                        this.props.menu(11)
                     : 
                     (this.props.statusCode === 409)?
                        (this.state.language==='English')?
                            Alert.alert(languageSettingsPFM.English.duplicateMobilePhone+ phoneNumber)
                        :
                        (this.state.language==='Dutch')?
                            Alert.alert(languageSettingsPFM.Dutch.duplicateMobilePhone+ phoneNumber)
                        :
                            Alert.alert(languageSettingsPFM.French.duplicateMobilePhone+ phoneNumber)
                     :
                     (this.props.statusCode === 403)?
                         (this.state.language==='English')?
                            Alert.alert(languageSettingsPFM.English.invalidMobilePhone+ phoneNumber)
                        :
                         (this.state.language==='Dutch')?
                            Alert.alert(languageSettingsPFM.Dutch.invalidMobilePhone+ phoneNumber)
                        :
                            Alert.alert(languageSettingsPFM.French.invalidMobilePhone+ phoneNumber)

                     :
                     this.props.menu(11)
                       
                }
        },750);
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

    nameElement = () => {

        console.log("this.props.firstName="+this.props.firstName);

        return (

            // <Text style={{ color: '#353535', fontSize: 12, }}>
            //  { this.props.firstName }
            // </Text>

            this.props.firstName
        );
    }

    validateBGPhoneNumber = (phone) => {

        // 00 => +
       // 0 and digit after => +32 digit
       // 0032 => +32
       // 00320 => +32
       // +320 => +32
       // 320 => +32

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
              else
                if(dpPhone.substring(0,3) === "+32")
                {
                    this.setState({ phoneNumberInput: dpPhone});
                }

       }
   }

   focus = () => {

        this.FirstInput.focus();

  }

    render() {

        const platform = Platform.OS;
        console.log("platform --->",Platform.OS);
        console.log("bankinfo="+this.props.bankInfo);
        console.log("text="+this.state.text);

        return (

            <KeyboardAwareScrollView
                    behavior = "padding"
                    enableOnAndroid = { true }
                    enableAutomaticScroll= {true}
                    contentContainerStyle={ newStyle.keyboardContainer }
                    scrollEnabled={true}>
                <View style= {newStyle.layoutBelow}>
                    <View style={newStyle.endButtons}>
                        <View style={newStyle.topView}>                        
                            <View style={{width: 80, height: 50, backgroundColor: 'transparent'}}>
                                <Text style={newStyle.topText}>{this.state.text.myProfile}</Text>
                            </View>
                        <View style={{width: 100, height: 30, 
                                      justifyContent:'flex-end',
                                      alignItems:'flex-end',
                                      backgroundColor: 'transparent',}}>
                            <Text style={newStyle.changeLanguage} onPress={() => this.props.menu(10,this.state.language)}>{this.state.text.changeLanguage}</Text>
                            { this.state.text.changeLanguage==='Taal Wijzigen'?
                                    <View style={{
                                        height:1,
                                        width: 65,
                                        marginRight:5,
                                        borderBottomColor:'red',
                                        borderBottomWidth:1,
                                        borderStyle:'solid'
                                    }}></View>
                                :
                                <View style={{
                                    height:1,
                                    width: 95,
                                    marginRight:5,
                                    borderBottomColor:'red',
                                    borderBottomWidth:1,
                                    borderStyle:'solid'
                                }}></View>    
                            }
                        </View>
                        </View>

                        <View style= {newStyle.inputContainer}>
                            <Text style={newStyle.firstName}>{this.state.text.firstName}</Text>
                                 <View style={{
                                            flexDirection: 'column',
                                            backgroundColor: 'transparent',
                                            justifyContent:'flex-start',
                                            alignItems:'flex-end',
                                            flex:9,
                                    }}>
                                     <TouchableOpacity
                                            onPress={() => {  this.seteditableFirstName();  } }
                                            activeOpacity={0.5}
                                            style={{
                                                width:35,
                                                height:15,
                                                justifyContent: 'flex-start',
                                                alignItems: 'center'
                                            }}>
                                        {(this.state.firstNameEditable === true)?
                                         <Icon
                                                containerStyle={newStyle.iconImageStyle}
                                                name='pencil'
                                                type='font-awesome'
                                                color='#E73D50'
                                                size = {15} />
                                         :
                                         <Icon
                                                containerStyle={newStyle.iconImageStyle}
                                                name='edit'
                                                type='font-awesome'
                                                color='#E73D50'
                                                size = {15} />
                                        }
                                        </TouchableOpacity>
                                        {(this.state.firstNameEditable === false)?
                                            <TouchableOpacity
                                                style={{ width: viewPortWidth * 0.82, height: 20, backgroundColor: 'transparent', borderBottomColor: "#353535", borderBottomWidth: StyleSheet.hairlineWidth, }}
                                                onPress={ () => this.seteditableFirstName() }>
                                                <Text style={{
                                                        width: viewPortWidth*.83,
                                                        height: 10,
                                                        margin:0,
                                                        backgroundColor: 'transparent',
                                                        marginBottom: 0,
                                                        padding: 0,
                                                        paddingLeft:5,
                                                        flex:8,
                                                        color: 'grey'}}> {this.props.firstName}</Text>
                                                        {
                                                            this.props.firstName === null?
                                                            <View style = {{position: 'absolute' , zIndex:3999, left: 20, top: 120, right: 0, bottom: 0}}>
                                                            <BallIndicator color='#e73d50' />
                                                            </View>:this.somethingElse()
                                                         }
                                            </TouchableOpacity>
                                            :
                                            <TextInput
                                                        style={ newStyle.nameInputFirst }
                                                        placeholder={ this.props.firstName  }
                                                        placeholderTextColor={ this.state.placeHolderColor }
                                                        editable={ this.state.firstNameEditable }
                                                        ref={(ref) => { this.FirstInput = ref; }}
                                                        autoFocus = {true}
                                                        underlineColorAndroid= 'transparent'     
                                                        onBlur = { () => {
                                                            this.seteditableFirstName();
                                                            console.tron.log("called on Blur");
                                                            this.callUpdateName(this.state.firstNameInput);
                                                        }}
                                                        onEndEditing = { () => {
                                                            this.callUpdateName(this.state.firstNameInput);
                                                            console.tron.log("called on End Editing");
                                                            this.seteditableFirstName();
                                                            this.callProfile();
                                                        }}
                                                        onChangeText={(firstNameInput) => this.validateFirstName(firstNameInput)} />

                                        }
                            </View>
                               {this.state.isLoading === true?
                                    <View style = {{position: 'absolute' , zIndex:3999, left: 25, top: 0, right: 0, bottom: 0}}>
                                    <BallIndicator color='#e73d50' />
                                    </View>:this.somethingElse()
                               }

                            <Text style={newStyle.firstName}>{this.state.text.lastName}</Text>
                            <View style={{
                                            flexDirection: 'column',
                                            backgroundColor: 'transparent',
                                            justifyContent:'flex-start',
                                            alignItems:'flex-end',
                                            flex:9,
                                    }}>

                                       <TouchableOpacity
                                        onPress={() => {  
                                            this.seteditableLasttName();
                                        }}
                                        activeOpacity={0.5}
                                        style={{
                                            width:35,
                                            height:15,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                     {(this.state.lastNameEditable===true)?
                                         <Icon
                                         containerStyle={newStyle.iconImageStyle}
                                         name='pencil'
                                         type='font-awesome'
                                         color='#E73D50'
                                         size = {15} />
                                         :
                                         <Icon
                                         containerStyle={newStyle.iconImageStyle}
                                         name='edit'
                                         type='font-awesome'
                                         color='#E73D50'
                                         size = {15} />                                     
                                        }
                                 </TouchableOpacity>           
                                 {(this.state.lastNameEditable===false)?
                                    <TouchableOpacity
                                        style={{ width: viewPortWidth * 0.82, height: 20, backgroundColor: 'transparent', borderBottomColor: "#353535", borderBottomWidth: StyleSheet.hairlineWidth, }}
                                        onPress={ () => this.seteditableLasttName() }>
                                        <Text
                                            style={{
                                                width: viewPortWidth*.83,
                                                height: 10,
                                                margin:0,
                                                backgroundColor: 'transparent',
                                                marginBottom: 0,
                                                padding: 0,
                                                paddingLeft:5,
                                                flex:8,
                                                color: 'grey'
                                            }}>{this.props.lastName}</Text>
                                    </TouchableOpacity>                                  
                                    :
                                    <TextInput
                                        style={ newStyle.nameInput}
                                        placeholder={ this.props.lastName }
                                        placeholderTextColor = { this.state.placeHolderColorLastName }
                                        editable={ this.state.lastNameEditable }
                                        underlineColorAndroid= 'transparent'
                                        autoFocus = {true}
                                        onBlur = { () => {
                                            this.callUpdateLastName(this.state.lastNameInput);
                                            this.callProfile();
                                            this.seteditableLasttName();
                                        }}
                                        onEndEditing = { () => {
                                            this.callUpdateLastName(this.state.lastNameInput);
                                            this.callProfile();
                                            this.seteditableLasttName();
                                        }}
                                        onChangeText= { (lastNameInput) => this.validateLastName(lastNameInput) }/>
                                 }

                            </View>

                            <Text style={newStyle.firstName}>{this.state.text.Email}</Text>
                            <View style={{
                                            flexDirection: 'column',
                                            backgroundColor: 'transparent',
                                            justifyContent:'flex-start',
                                            alignItems:'flex-end',
                                            flex:9,
                                    }}>
                                 <TouchableOpacity
                                                onPress={() => {  this.seteditableEmail();  } }
                                                activeOpacity={0.5}
                                                style={{
                                                    width:35,
                                                    height:15,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                            {(this.state.emailEditable===true)?
                                                <Icon
                                                containerStyle={newStyle.iconImageStyle}
                                                name='pencil'
                                                type='font-awesome'
                                                color='#E73D50'
                                                size = {15} />
                                                :
                                                <Icon
                                                containerStyle={newStyle.iconImageStyle}
                                                name='edit'
                                                type='font-awesome'
                                                color='#E73D50'
                                                size = {15} />                                            
                                                }
                                    </TouchableOpacity>

                                   {(this.state.emailEditable === false)?
                                            <TouchableOpacity
                                            style={{ width: viewPortWidth * 0.82, height: 20, backgroundColor: 'transparent', borderBottomColor: "#353535", borderBottomWidth: StyleSheet.hairlineWidth, }}
                                            onPress={ () => this.seteditableEmail() }>
                                                <Text
                                                    style={{
                                                        width: viewPortWidth*.83,
                                                        height: 10,
                                                        margin:0,
                                                        backgroundColor: 'transparent',
                                                        marginBottom: 0,
                                                        padding: 0,
                                                        paddingLeft:5,
                                                        flex:8,
                                                        color: 'grey'
                                                    }}> {this.props.email} </Text>

                                    </TouchableOpacity>                                  
                                    :      
                                            <TextInput
                                                style={ newStyle.nameInputEmail }
                                                placeholder='Email Address'
                                                placeholderTextColor={this.state.placeHolderColorEmail}
                                                editable={this.state.emailEditable}
                                                underlineColorAndroid= 'transparent'
                                                autoFocus = {true}
                                                onBlur = { () => {
                                                    this.callUpdateEmail(this.state.emailInput);
                                                    this.callProfile();
                                                    this.seteditableEmail();
                                                }}
                                                onEndEditing = { () => {
                                                    this.callUpdateEmail(this.state.emailInput);
                                                    this.callProfile();
                                                    this.seteditableEmail();
                                                }}
                                                onChangeText= { (emailInput) => this.validateEmail(emailInput) }/>
                                   }
                            </View>

                            <Text style={newStyle.firstName}>{this.state.text.Phone}</Text>
                            <View style={newStyle.innerContainer}>
                                {(this.state.phoneEditable===true)?
                                    <View
                                        opacity={1}
                                        style={{
                                            width: viewPortWidth*.82,
                                            height: 30,
                                            margin:0,
                                            paddingLeft:0,
                                            marginTop:5,
                                            flex:8,
                                            backgroundColor:'transparent'
                                        }}>
                                        <PhoneInput
                                            autoFocus = { true }
                                            focus
                                            opacity={1}
                                            focusNeeded = { true }
                                            ref={(ref) => { this.phone = ref; }}
                                            initialCountry={this.state.countryCode}
                                            onSelectCountry={(iso2) => { this.setState({countryCode: iso2}); console.log('country='+this.state.countryCode) }}
                                            style= {newStyle.phoneInput}
                                            // onBlur = { () =>  this.validatePhone(this.state.phoneNumberInput) }
                                            //onChangePhoneNumber = { (phoneNumberInput) => this.validatePhoneOnChangeText(phoneNumberInput) }
                                            onChangePhoneNumber = { (phoneNumberInput) => this.validateUAEPhoneNumber(phoneNumberInput) }
                                            value ={this.formatMobileNo(this.props.mobileNo)}
                                        />
                                    </View>
                                    :
                                    <TouchableOpacity
                                        opacity={0.5}
                                        activeOpacity={0.5}
                                        style={{
                                            width: viewPortWidth*.82,
                                            height: 30,
                                            margin:0,
                                            marginTop:5,
                                            paddingLeft:0,
                                            flex:8,
                                            backgroundColor: 'transparent',
                                            color: 'grey',
                                            backgroundColor:'transparent'
                                        }}
                                        onPress = {() => { this.seteditablePhone(); }}>
                                        <PhoneInput
                                            opacity={0.5}
                                            focus
                                            autoFocus = { true }
                                            focusNeeded = { true }
                                            disabled={ true }
                                            ref={(ref) => {this.phone = ref;}}
                                            initialCountry={this.state.countryCode}
                                            style= {newStyle.nameInputLite}
                                            value = {this.formatMobileNo(this.props.mobileNo)} />
                                    </TouchableOpacity>
                                }                         
                                 <TouchableOpacity
                                        onPress={() => {  this.seteditablePhone();  } }
                                        activeOpacity={0.5}
                                        style={{
                                            width:35,
                                            height:15,
                                            paddingLeft:3,
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            backgroundColor:'transparent'
                                        }}>
                                     {(this.state.phoneEditable===true)?
                                         <Icon
                                         containerStyle={newStyle.iconImageStyle}
                                         name='pencil'
                                         type='font-awesome'
                                         color='#E73D50'
                                         size = {15} />
                                         :
                                         <Icon
                                         containerStyle={newStyle.iconImageStyle}
                                         name='edit'
                                         type='font-awesome'
                                         color='#E73D50'
                                         size = {15} />
                                     
                                        }
                                 </TouchableOpacity>
                            </View>
                                
                            {/* <Text style={newStyle.passwordStyle}>{this.state.text.Password}</Text>

                            <View style={{
                                            flexDirection: 'row',
                                            backgroundColor: 'transparent',
                                            justifyContent:'flex-start',
                                            alignItems:'center',
                                            flex:8,
                                    }}> */}
                                    {/* <TouchableOpacity
                                        onPress={() => { this.imageCapture();  } }
                                        activeOpacity={1}
                                        opacity={1}
                                        style={{
                                            width: viewPortWidth*0.65,
                                            height: 5,
                                            margin:0,
                                            borderBottomColor: "#353535",
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                            backgroundColor: 'transparent',
                                            padding: 0,
                                            flex:1,
                                        }}>
                                        <Text style={{
                                                fontSize: 12,
                                                fontFamily: 'WorkSans-Medium',
                                                fontWeight: '500',
                                                fontStyle: 'normal',
                                                color: '#353535',
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                letterSpacing: 0.67,
                                                textAlign: 'left',
                                                backgroundColor:'transparent'
                                            }}
                                        > Please Click Here to Capture Image......</Text>
                                    </TouchableOpacity> */}
                               {
                                // (this.state.passwordEditable===true)?
                                //     <TouchableOpacity
                                //         onPress={() => { this.props.menu(6) } }
                                //         activeOpacity={1}
                                //         opacity={1}
                                //         style={{
                                //             width: viewPortWidth*0.65,
                                //             height: 5,
                                //             margin:0,
                                //             borderBottomColor: "#353535",
                                //             borderBottomWidth: StyleSheet.hairlineWidth,
                                //             backgroundColor: 'transparent',
                                //             padding: 0,
                                //             flex:1,
                                //         }}>
                                //         <Text
                                //             style={{
                                //                 fontSize: 12,
                                //                 fontFamily: 'WorkSans-Medium',
                                //                 fontWeight: '500',
                                //                 fontStyle: 'normal',
                                //                 color: '#353535',
                                //                 alignItems: 'flex-start',
                                //                 justifyContent: 'flex-start',
                                //                 letterSpacing: 0.67,
                                //                 textAlign: 'left',
                                //                 backgroundColor:'transparent'
                                //             }}
                                //         > Please Click Here To Enter Password......</Text>
                                //     </TouchableOpacity>
                                //     :
                                //     <TouchableOpacity
                                //             onPress={() => {  this.props.menu(6) } }
                                //             activeOpacity={0.5}
                                //             opacity={0.5}
                                //             style={{
                                //                 width: viewPortWidth*0.65,
                                //                 height: 25,
                                //                 margin:0,
                                //                 borderBottomColor: "#353535",
                                //                 borderBottomWidth: StyleSheet.hairlineWidth,
                                //                 backgroundColor: 'transparent',
                                //                 padding: 0,
                                //                 flex:2,
                                //             }}>
                                //     <Text
                                //         style={{
                                //             fontSize: 12,
                                //             fontFamily: 'WorkSans-Regular',
                                //             fontWeight: '500',
                                //             fontStyle: 'normal',
                                //             color: '#000000',
                                //             marginTop: 0,
                                //             alignItems: 'flex-start',
                                //             justifyContent: 'flex-start',
                                //             letterSpacing: 0.67,
                                //             textAlign: 'left'}}
                                //     > {this.state.buttonText.toUpperCase()}</Text>
                                // </TouchableOpacity>

                            }

                             {/* <TouchableOpacity
                                        onPress={() => {
                                                    this.seteditablePassword();
                                                    this.props.menu(6);
                                                }}
                                        activeOpacity={0.5}
                                        style={{
                                            width:35,
                                            marginBottom:10,
                                            height:20,
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            backgroundColor:'transparent'
                                        }}>
                                     {(this.state.passwordEditable===true)?
                                         <Icon
                                                containerStyle={newStyle.iconImageStylePass}
                                                name='pencil'
                                                type='font-awesome'
                                                color='#E73D50'
                                                size = {15} />
                                         :
                                         <Icon
                                                containerStyle={newStyle.iconImageStylePass}
                                                name='edit'
                                                type='font-awesome'
                                                color='#E73D50'
                                                size = {15} />                                     
                                        }
                                 </TouchableOpacity> */}
                            {/* </View> */}

                            {/* <PushNotif /> */}

                            <View style={{flex: 25}}>
                                <Text style={newStyle.firstName}>{this.state.text.cardDetails}</Text>
                                {
                                     this.props.bankInfo === null || this.props.bankInfo === undefined || this.props.bankInfo.MobileUserBankDetailId === 0?
                                     <Text style={newStyle.para}>{this.state.text.add}<Text style={{ color: '#e73d50',fontFamily: 'WorkSans-Bold', fontWeight: '500', fontSize: 20  }} onPress={() => this.props.menu(5)}>{this.state.text.here}</Text></Text>
                                     :
                                      (this.props.bankInfo.MobileUserBankDetailId !== 0)?
                                     <View style={{ flex:1,  }}>
                                            <Text style={{  fontSize: 14,   
                                        fontFamily: 'WorkSans-Regular',
                                        fontWeight: '500',
                                        marginLeft:5,
                                        fontStyle: 'normal',
                                        color: '#000000', }}> {this.state.text.Bic}: { this.props.bankInfo.BIC_NO } </Text>
                                            <Text style={{  fontSize: 14,
                                        fontFamily: 'WorkSans-Regular',
                                        fontWeight: '500',
                                        marginLeft:5,
                                        fontStyle: 'normal',
                                        color: '#000000', }} > {this.state.text.BankName}: { this.props.bankInfo.Bankname } </Text>
                                            <Text style={{  fontSize: 14,   
                                        fontFamily: 'WorkSans-Regular',
                                        fontWeight: '500',
                                        marginLeft:5,
                                        fontStyle: 'normal',
                                        color: '#000000', }}> {this.state.text.Iban}: {  this.props.bankInfo.IBAN }  </Text>
                                      </View>
                                      : 
                                      this.renderNothing()
                                }
                            </View>
                        </View>
                    </View>                
                </View>
                </KeyboardAwareScrollView>                 
        );
    }

}

const newStyle = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },

    innerContainer: {

        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginRight: 4,
        marginBottom:4,

    },

    keyboardContainer: {
        flex: 1,
        width: viewPortWidth * 0.85,
        height: viewPortHeight * 0.80,
        backgroundColor: 'steelblue',
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
        width: 190,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginBottom: 1,
        marginTop: 10,
        marginLeft:5,
        alignItems:'flex-end',
    },

    passwordStyle:{
        width: 190,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginBottom: 1,
        marginTop: 5,
        marginLeft:5,
        alignItems:'flex-end',
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

    nameInputFirst:{
        width: viewPortWidth*.83,
        height: 30,
        margin:0,
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        marginBottom: 0,
        padding: 0,
        paddingLeft:5,
        flex:8,
        color: 'grey'
    },

    nameInputFirstOff: {
        width: viewPortWidth*.83,
        height: 30,
        margin:0,
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        marginBottom: 0,
        padding: 0,
        paddingLeft:5,
        flex:8,
        color: 'grey'
    },

    nameInputEmail:{
        width: viewPortWidth*.83,
        height: 30,
        margin:0,
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        marginBottom: 0,
        padding: 0,
        paddingLeft:5,
        flex:8,
        color:'black'
    },

    nameInputEmailOff:{
        width: viewPortWidth*.83,
        height: 30,
        margin:0,
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        marginBottom: 0,
        padding: 0,
        paddingLeft:5,
        flex:8,
        color: 'grey'
    },

    nameInput: {
        width: viewPortWidth*.83,
        height: 30,
        margin:0,
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        marginBottom: 0,
        padding: 0,
        paddingLeft:5,
        flex:8,
        color: 'black'
    },

    phoneInput:{
        width: viewPortWidth*.83,
        height: 30,
        margin:0,
        borderColor:'transparent',
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        marginBottom: 0,
        padding: 0,
        paddingLeft:5,
        flex:8,
        color: 'lightgray'
    },

    nameInputOff: {
        width: viewPortWidth*.83,
        height: 30,
        margin:0,
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        marginBottom: 0,
        padding: 0,
        paddingLeft:5,
        flex:8,
        color: 'grey'
    },

    nameInputLite:
    {
        width: viewPortWidth*.83,
        height: 30,
        margin:0,
        paddingLeft:5,
        backgroundColor: 'transparent',
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flex:8,
        color: 'grey'
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
        flex: 1,
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

  leftButtonSelected: {
    width: 54,
    height: 111,
    backgroundColor: "rgb(246, 246, 246)",
    shadowColor: "rgba(216, 216, 216, 0.15)",
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
        flex: Platform.OS === 'ios'?20:20,        
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
        textAlign: "left",
        color: "rgb(231, 61, 80)"
    },

    topView: {
        width: viewPortWidth * 0.83,
        height: 68,
        flex:2,
        marginTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection:'row',
        backgroundColor:'transparent',
    },

    changeLanguage:{
        width: 120,
        height: 24,
        fontFamily: "WorkSans-Medium",
        fontSize: 10,
        fontWeight: "600",
        fontStyle: "normal",
        lineHeight: 34,
        letterSpacing: 0,
        textAlign: "right",
        paddingRight:5,
        color: "rgb(231, 61, 80)",
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
        width: 30,
        height: 16,
        fontFamily: "FontAwesome",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.67,
        textAlign: "left",
        color: "rgb(231, 61, 80)", 
        marginTop: 30,
        marginRight: 25,
        backgroundColor: 'powderblue'
    },

    iconImageStylePass: {
        width: 30,
        height: 26,
        fontFamily: "FontAwesome",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.67,
        textAlign: "left",
        color: "rgb(231, 61, 80)", 
        marginTop: 0,
        marginRight: 25,
        backgroundColor: 'powderblue',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
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
        bankInfo: ProfileSelectors.getBankInfo(state),
        fetching: ProfileSelectors.getFetching(state),
        LastViewedNotificationID: LoginSelectors.getLastViewedNotificationID(state),
        mobileNotifications: LoginSelectors.getMobileNotifications(state),
        firstName: ProfileSelectors.getFirstName(state),
        lastName: ProfileSelectors.getLastName(state),
        email: ProfileSelectors.getEmail(state),
        mobileNo: ProfileSelectors.getMobileNo(state),
        statusCode: ProfileSelectors.getStatusCode(state)
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      navigateBack: () => this.props.navigation.goBack(),
      getProfile:(payload) => dispatch({ type: 'GET_PROFILE_REQUEST_NEW', payload }),
      nameUpdate: (payload) => dispatch({ type: 'UPDATE_FIRST_NAME', payload }),
      emailUpdate: (payload) => { dispatch({ type: 'UPDATE_EMAIL', payload})},
      changeMobile: (payload) => dispatch({ type: 'CHANGE_MOBILE', payload }),
      notificationRequest: (payload) => dispatch({ type: 'NOTIFICATION_REQUEST', payload})
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnProfileComponent);