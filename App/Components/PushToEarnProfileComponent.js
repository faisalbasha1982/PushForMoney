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

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;
let ltoken = localStorage.getItem('token');


const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

let cLanguage = '';

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
            aToken:'',
            text:{}
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
              this.callUpdateName(name);
            }
            else
            {
              if(this.state.language === 'nl')
                  this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: true, firstNameErrorText: LanguageSettings.dutch.FNameErrorText });
              else
                  if(this.state.language === 'en')
                      this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: true, firstNameErrorText: LanguageSettings.english.FNameErrorText });
                  else
                      this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: true, firstNameErrorText: LanguageSettings.french.FNameErrorText });
            }
        }        
    }

    validatePhone = (phone) => {

        let phoneSub = phone.substring(1);
        let firstTwo = phone.substring(1,3);
        let nextTwo = phone.substring(3,5);
        let lengthOfString = phoneSub.length;

        console.log("phone validation="+phone);
        console.log("phone length="+lengthOfString);
        console.log("first two="+firstTwo);
        console.log("first two="+nextTwo);
        console.tron.log("phone length="+phoneSub.length);

        let reg = /^[0-9]{12}$/;
        let regNew = /^(?=(.*\d){10})(?!(.*\d){13})[\d\(\)\s+-]{10,}$/;
        let homePhone = /^((\+|00)32\s?|0)(\d\s?\d{3}|\d{2}\s?\d{2})(\s?\d{2}){2}$/;
        let mPhone = /^((\+|00)32\s?|0)4(60|[789]\d)(\s?\d{2}){3}$/;

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
                                this.setState({phoneNumberInput: phone});

                                // if (regNew.exec(phone))
                                // {  
                                    this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: false, phoneNumberInput: phone, phoneNumberErrorText: '' });
                                    this.setState({isLoading:true});
                                    this.changeMobile(phone);
                                //}
                                // else
                                //     if(this.state.languageCode === 'nl')
                                //         this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: true, phoneNumberErrorText: LanguageSettings.dutch.TelephoneNumberError });
                                //     else
                                //         if(this.state.languageCode === 'en')
                                //             this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: true, phoneNumberErrorText: LanguageSettings.english.TelephoneNumberError });
                                //         else
                                //             this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: true, phoneNumberErrorText: LanguageSettings.french.TelephoneNumberError });
            
                        }
                      else
                      {
                        Alert.alert("Invalid Mobile Phone Number");
                      }
                }
                else
                {
                }
        }
    }

    validateEmail = (email) => {

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

        if(this.props !== nextProps)
        {
            let language = localStorage.getItem('language');

            this.getAsyncStorage();
    
            console.log("text="+this.state.text);
            console.log("text changeLanguage="+this.state.text);

            let authData = AuthComponent.authenticationData(this.state.languageCode);
            let encryptedData = AesComponent.aesCallback(authData);
            ltoken = localStorage.getItem('token');
            this.setState({isLoading: true});

            console.log("login access token="+this.state.aToken);
            console.tron.log("login access token="+this.state.aToken);

            setTimeout(() => 
            {

                let payload = {
                    "AuthenticationData": encryptedData,
                    "LoginAccessToken": this.state.aToken,
                };

                this.props.getProfile(payload);

            },3000);
        }
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
                    console.tron.log("mobilenotifications="+this.props.mobileNotifications);
                    this.setState({ mobileNotifications: this.props.mobileNotifications});
                }, 3000);
    
            },3000);    
    
            setTimeout(() => {
                AppState.addEventListener('change',this.handleAppStateChange);            
            },4000);



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
    }

    
    componentWillUnmount() {
        AppState.addEventListener('change',this.handleAppStateChange);
    }

    componentDidMount() {

        let language = localStorage.getItem('language');
        this.getAsyncStorage();

        console.log("language="+this.state.language);

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);
        ltoken = localStorage.getItem('token');

        let asynToken = '';
        this.setState({isLoading: true});

        console.log("PC login access token="+this.state.aToken);
        console.tron.log("PC login access token="+this.state.aToken);

        setTimeout(() => {
            console.tron.log("async token="+this.state.aToken);
        },4000);

        console.tron.log("lastviewednotificationid="+this.props.LastViewedNotificationID);

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
                console.tron.log("mobilenotifications="+this.props.mobileNotifications);
                this.setState({ mobileNotifications: this.props.mobileNotifications});
            }, 3000);

        },3000);    

        setTimeout(() => {
            AppState.addEventListener('change',this.handleAppStateChange);            
        },4000);
    }


    renderNothing = () => {

    }

    changeCountry = () => {

        // this.setState({ countryCode: this.phone.getPickerData() });

    }

    somethingElse = () => {

    }

    seteditablePassword = () => {        

        this.setState({passwordEditable: !this.state.passwordEditable,});

        (this.state.passwordEditable === true)?
        this.setState({placeHolderColorPassword:'grey' })
        :
        this.setState({placeHolderColorPassword:'grey'});
    }

    seteditablePhone = () => {

        this.setState({phoneEditable: !this.state.phoneEditable,});

        (this.state.phoneEditable === true)?
        this.setState({placeHolderColorPhone:'lightgray' })
        :
        this.setState({placeHolderColorPhone:'grey'});

    }

    seteditableEmail = () => {
        this.setState({emailEditable: !this.state.emailEditable,});

        (this.state.emailEditable === true)?
        this.setState({placeHolderColorEmail:'lightgray' })
        :
        this.setState({placeHolderColorEmail:'grey'});

    }

    seteditableFirstName = () => {
        
        this.setState({firstNameEditable: !this.state.firstNameEditable,});

        (this.state.firstNameEditable === true)?
        this.setState({placeHolderColor:'lightgray' })
        :
        this.setState({placeHolderColor:'grey'});
    }

    seteditableLasttName = () => {
        this.setState({lastNameEditable: !this.state.lastNameEditable,});

        (this.state.lastNameEditable === true)?
        this.setState({placeHolderColorLastName:'lightgray' })
        :
        this.setState({placeHolderColorLastName:'grey'});
    }

    callUpdateName = (name) => {
     
        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);

        this.setState({isLoading: true});

        console.log("login access token="+this.state.aToken);
        console.tron.log("update name login access token="+this.state.aToken);

        let payload = {
            "AuthenticationData": encryptedData,
            "LoginAccessToken":this.state.aToken,
            "NewFirstName": name,
        };

        this.props.nameUpdate(payload);
    }

    callUpdateLastName = (name) => {

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);

        this.setState({isLoading: true});

        console.log("login access token="+this.state.aToken);
        console.tron.log("login access token="+this.state.aToken);

        let payload = {         
            "AuthenticationData": encryptedData,
            "LoginAccessToken":this.state.aToken,
            "NewLastName": name,
        };

        this.props.nameUpdate(payload);
    }

    changeMobile = (phoneNumber) => {

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);

        this.setState({isLoading: true});

        console.log("login access token="+this.state.aToken);
        console.tron.log("login access token="+this.state.aToken);

        console.log("phoneNumber="+phoneNumber);
        Alert.alert("phoneNumber="+phoneNumber);

        let payload = {             
            "AuthenticationData": encryptedData,
            "LoginAccessToken":this.state.aToken,
            "NewMobileNumber": phoneNumber,
        };

        this.props.changeMobile(payload);
        this.props.menu(11);
    }

    formatMobileNo = (mobileNo) => {

        let newMobNo = "+";

        if(mobileNo === null)
            return null;

        console.log("newMobNo="+newMobNo+ " mobileNo substring(0,3)="+mobileNo.substring(0,3));

        if(mobileNo.substring(0,2)==="00")
            newMobNo = newMobNo + mobileNo.substring(2);
        else
            if(mobileNo.substring(0,1)==="0")
                newMobNo = newMobNo + mobileNo.substring(1);

        console.log("newMobNo="+newMobNo);

        return newMobNo;


    }

    render() {

        const platform = Platform.OS;
        console.log("platform --->",Platform.OS);
        console.log("bankinfo="+this.props.bankInfo);
        console.log("text="+this.state.text);

        return (

            <KeyboardAwareScrollView
                    behavior = "padding"
                    enableOnAndroid = { false }
                    contentContainerStyle={ newStyle.keyboardContainer }
                    scrollEnabled={true}>

                <View style= {newStyle.layoutBelow}>
                    <View style={newStyle.endButtons}>

                        <View style={newStyle.topView}>                        

                            <View style={{width: 80, height: 50, backgroundColor: 'transparent'}}>
                                <Text style= {newStyle.topText}>
                                        {this.state.text.myProfile}
                                </Text>
                            </View>
                        <View style={{width: 100, height: 30, 
                                      justifyContent:'flex-end',
                                      alignItems:'flex-end',
                                      backgroundColor: 'transparent',}}>
                            <Text
                                style= {newStyle.changeLanguage}
                                onPress={() => this.props.menu(10,this.state.language)}>
                                    {this.state.text.changeLanguage}
                            </Text>
                            {
                                this.state.text.changeLanguage==='Taal Wijzigen'?
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
                                        {/* <Text style={newStyle.firstName}>{this.state.text.firstName}</Text> */}

                                     <TouchableOpacity
                                            onPress={() => {  this.seteditableFirstName();  } }
                                            activeOpacity={0.5}
                                            style={{
                                                width:35,
                                                height:15,
                                                justifyContent: 'flex-start',
                                                alignItems: 'center'
                                            }}>
                                        {
                                         (this.state.firstNameEditable===true)?
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
                                    
                                     <TextInput
                                        style={ newStyle.nameInputFirst }
                                        placeholder='first name'
                                        placeholderTextColor={this.state.placeHolderColor}
                                        editable={this.state.firstNameEditable}
                                        ref={(ref) => { this.FirstInput = ref; }}
                                        underlineColorAndroid= 'transparent'
                                        value = {this.props.firstName}
                                        onBlur = { () => this.callUpdateName(this.state.firstNameInput)}
                                        onChangeText={(firstNameInput) => this.validateFirstName(firstNameInput)}/>
                            </View>

                            <Text style={newStyle.firstName}>{this.state.text.lastName}</Text>
                            <View style={{
                                            flexDirection: 'column',
                                            backgroundColor: 'transparent',
                                            justifyContent:'flex-start',
                                            alignItems:'flex-end',
                                            flex:9,
                                    }}>

                                       <TouchableOpacity
                                        onPress={() => {  this.seteditableLasttName();  } }
                                        activeOpacity={0.5}
                                        style={{
                                            width:35,
                                            height:15,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                     {
                                         (this.state.lastNameEditable===true)?
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

                                <TextInput
                                        style={ newStyle.nameInput}
                                        placeholder='last name'
                                        placeholderTextColor = {this.state.placeHolderColorLastName}
                                        editable={this.state.lastNameEditable}
                                        value = {this.props.lastName}
                                        onBlur = { () => this.callUpdateLastName(this.state.lastNameInput)}
                                        underlineColorAndroid= 'transparent'
                                        onChangeText= { (lastNameInput) => this.validateLastName(lastNameInput) }/>

                              

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
                                            {
                                                (this.state.emailEditable===true)?
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

                                <TextInput
                                    style={ newStyle.nameInputEmail }
                                    placeholder='Email Address'
                                    placeholderTextColor={this.state.placeHolderColorEmail}
                                    editable={this.state.emailEditable}
                                    value = { this.props.email}
                                    underlineColorAndroid= 'transparent'
                                    onBlur = { () => this.callUpdateName(this.state.emailInput)}
                                    onChangeText= { (emailInput) => this.validateEmail(emailInput) }/>
                               
                            </View>

                            <Text style={newStyle.firstName}>{this.state.text.Phone}</Text>
                            <View style={newStyle.innerContainer}>
                                            
                                {/* {
                                            this.props.fetching===true?
                                            <View style = {{position: 'absolute' , zIndex:3999, left: 30, top: 0, right: 0, bottom: 0}}>
                                            <BallIndicator color='#e73d50' />
                                            </View>:this.somethingElse()
                                } */}

                                {
                                    (this.state.phoneEditable===true)?
                                    <View
                                        opacity={1}
                                        style={{
                                            width: viewPortWidth*.83,
                                            height: 30,
                                            margin:0,
                                            paddingLeft:0,
                                            marginTop:5,
                                            flex:8,
                                        }}>
                                        <PhoneInput
                                            opacity={1}
                                            ref={(ref) => { this.phone = ref; }}
                                            initialCountry={this.state.countryCode}
                                            onSelectCountry={(iso2) => { this.setState({countryCode: iso2}); console.log('country='+this.state.countryCode) }}
                                            style= {newStyle.nameInput}
                                            onChangePhoneNumber = { (phoneNumberInput) => this.validatePhone(phoneNumberInput) }
                                            value = {this.state.phoneNumberInput}
                                            />
                                    </View>
                                    :
                                    <View
                                        opacity={0.5}
                                        style={{
                                            width: viewPortWidth*.83,
                                            height: 30,
                                            margin:0,
                                            marginTop:5,
                                            paddingLeft:0,
                                            flex:8,
                                        }}
                                        >
                                        <PhoneInput
                                        opacity={0.5}
                                        disabled={true}
                                        ref='phone'
                                        initialCountry={this.state.countryCode}
                                        style= {newStyle.nameInputLite}
                                        value = {this.formatMobileNo(this.props.mobileNo)} />
                                    </View>
                                }                         
                                 <TouchableOpacity
                                        onPress={() => {  this.seteditablePhone();  } }
                                        activeOpacity={0.5}
                                        style={{
                                            width:35,
                                            height:15,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                     {
                                         (this.state.phoneEditable===true)?
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
                                

                            <Text style={newStyle.passwordStyle}>{this.state.text.Password}</Text>

                            <View style={{
                                            flexDirection: 'column',
                                            backgroundColor: 'transparent',
                                            justifyContent:'flex-start',
                                            alignItems:'flex-end',
                                            flex:8,
                                    }}>

                                     <TouchableOpacity
                                        onPress={() => {  this.seteditablePassword();
                                                          this.props.menu(6);
                                                }}
                                        activeOpacity={0.5}
                                        style={{
                                            width:35,
                                            height:25,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor:'transparent'
                                        }}>
                                     {
                                         (this.state.passwordEditable===true)?
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

                               {
                                (this.state.passwordEditable===true)?
                                    <TouchableOpacity
                                        onPress={() => { this.props.menu(6) } }
                                        activeOpacity={1}
                                        opacity={1}
                                        style={{
                                            width: viewPortWidth*0.83,
                                            height: 5,
                                            margin:0,
                                            borderBottomColor: "#353535",
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                            backgroundColor: 'transparent',
                                            padding: 0,
                                            flex:1,
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontFamily: 'WorkSans-Medium',
                                                fontWeight: '500',
                                                fontStyle: 'normal',
                                                color: '#353535',
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                letterSpacing: 0.67,
                                                textAlign: 'left'}}
                                        > Please Click Here To Enter Password......</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                    onPress={() => {  } }
                                    activeOpacity={0.5}
                                    opacity={0.5}
                                    style={{
                                        width: viewPortWidth*0.83,
                                        height: 25,
                                        margin:0,
                                        borderBottomColor: "#353535",
                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                        backgroundColor: 'transparent',
                                        padding: 0,
                                        flex:2,
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: 'WorkSans-Regular',
                                            fontWeight: '500',
                                            fontStyle: 'normal',
                                            color: '#000000',
                                            marginTop: 0,
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start',
                                            letterSpacing: 0.67,
                                            textAlign: 'left'}}
                                    > {this.state.buttonText.toUpperCase()}</Text>
                                </TouchableOpacity>

                            }

                            </View>

                            <PushNotif />

                            <View style={{flex: 25, }}>
                                <Text style={newStyle.firstName}>{this.state.text.cardDetails}</Text> {'\n'}
                                {
                                     this.props.bankInfo === null || this.props.bankInfo === undefined || this.props.bankInfo.MobileUserBankDetailId === 0?
                                     <Text style={newStyle.para}> {this.state.text.add}  <Text style={{ color: '#e73d50',fontFamily: 'WorkSans-Bold', fontWeight: '500', fontSize: 20  }} onPress={() => this.props.menu(5)}>here</Text> </Text>
                                     :
                                      this.props.bankInfo.MobileUserBankDetailId !== 0?
                                     <View style={{ flex:1,  }}>
                                            <Text style={{  fontSize: 10,   
                                        fontFamily: 'WorkSans-Regular',
                                        fontWeight: '500',
                                        marginLeft:5,
                                        fontStyle: 'normal',
                                        color: '#000000', }}> {this.state.text.Bic}: { this.props.bankInfo.BIC_NO } </Text> {'\n'}
                                            <Text style={{  fontSize: 10,
                                        fontFamily: 'WorkSans-Regular',
                                        fontWeight: '500',
                                        marginLeft:5,
                                        fontStyle: 'normal',
                                        color: '#000000', }} > {this.state.text.BankName}: { this.props.bankInfo.IBAN } </Text> {'\n'}
                                            <Text style={{  fontSize: 10,   
                                        fontFamily: 'WorkSans-Regular',
                                        fontWeight: '500',
                                        marginLeft:5,
                                        fontStyle: 'normal',
                                        color: '#000000', }}> {this.state.text.Iban}: {  this.props.bankInfo.Bankname }  </Text> {'\n'}
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
        flex: Platform.OS === 'ios'?20:1,        
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
        marginRight: 20,
        backgroundColor: 'powderblue'
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
        mobileNo: ProfileSelectors.getMobileNo(state)
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {  
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      navigateBack: () => this.props.navigation.goBack(),
      getProfile:(payload) => dispatch({ type: 'GET_PROFILE_REQUEST_NEW', payload }),
      nameUpdate: (payload) => dispatch({ type: 'UPDATE_FIRST_NAME', payload }),
      changeMobile: (payload) => dispatch({ type: 'CHANGE_MOBILE', payload }),
      notificationRequest: (payload) => dispatch({ type: 'NOTIFICATION_REQUEST', payload})
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnProfileComponent);