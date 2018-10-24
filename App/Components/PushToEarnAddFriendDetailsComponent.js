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
    AsyncStorage,
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
import ButtonFriends from '../Components/ButtonFriends';
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
import PhoneInput from 'react-native-phone-input';
import _ from 'lodash';

import { Colors } from "../Themes";
import { Images } from '../Themes';

import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/NewHeaderImage.png';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';
import localStorage from 'react-native-sync-localstorage';
import { FriendSelectors } from '../Redux/FriendRedux';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

// Styles

let cLanguage = '';

class PushToEarnAddFriendDetailsComponent extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            language: 'NEDERLANDS',
            languageCode:'',
            firstName:'',
            name:'',
            phoneNumber:'',
            validation: false,
            renderValidate: false,
            firstNameInput:'',
            lastNameInput:'',
            phoneNumberInput:'',
            buttonText: '',
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
            aToken:'',
            countryCode: 'be',
            email:'',
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

        console.log("FD validating First Name="+name);

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

    formatPhone = (phone) => {

        this.setState({lastNameInput: phone.replace(/(?!\w|\s)./g, '')});

    }

    validateBelgiumPhoneNumber = (phone) => {

        phone = this.removeSpaces(phone);

        // console.tron.log("formatted phone text="+phone);

        console.log("phone number="+phone);

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

        if(this.props !== nextProps)
            this.getAsyncStorage();

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
            this.setState({ aToken:token });
        });

    }

    componentWillMount() {
        console.log("inside FD ="+this.state.firstNameInput);
        this.getAsyncStorage();
    }

    componentDidMount() {
        let language = localStorage.getItem('language');
        console.log('local storage language='+language);
        this.getAsyncStorage();
    }

    renderNothing = () => {

    }

    displayInputs = () => {
        Alert.alert(" firstNameInput= "+this.state.firstNameInput);
        console.log("this.state.firstNameInput="+this.state.firstNameInput);
    }

    saveReferralsFromEmpty = () => {

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);
        this.setState({isLoading: true});

        console.log("authData from save refferals Empty="+encryptedData);

        let payload = {
            "AuthenticationData": encryptedData,
            "LoginAccessToken": this.state.aToken,
            "MobileUsersReferrals":  [
                            {"firstName":this.state.firstNameInput.split(" ")[0], "lastName": this.state.firstNameInput.split(" ")[1], "mobilePhone":this.formatMobileNo(this.state.phoneNumberInput), "email": this.state.email}
                            ],
        };

        this.props.saveReferrals(payload);
        this.props.menu(2);

        setTimeout(() => {
            if(!_.isEmpty(this.props.MobileReferrals))
                {
                    console.log("mobileReferrals="+this.props.MobileReferrals);
                    this.props.MobileReferrals.map(personObj =>

                        {
                            if(personObj.ReferralAddStatus === true)
                            {
                                 this.props.menu(2);
                                 this.setState({isLoading: false});
                            }
                            else
                            {
                                this.setState({isLoading: false});
                                this.props.menu(2);
                                //Alert.alert("Referrals not added");
                            }
                        }
                    )
                }
            else    
                console.log("mobileReferrals="+this.props.MobileReferrals); 
        },2000);

    }

    saveReferrals = () => {

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);
        let ltoken = localStorage.getItem('token');
        this.setState({isLoading: true});

        console.log("authData from save refferals ="+encryptedData);

        let payload = {
            "AuthenticationData": encryptedData,
            "LoginAccessToken": this.state.aToken,
            "MobileUsersReferrals":  [
                            {"firstName":this.state.firstNameInput.split(" ")[0], "lastName": this.state.firstNameInput.split(" ")[1], "mobilePhone":this.formatMobileNo(this.state.phoneNumberInput), "email": this.state.email}
                            ],
        };

        if(this.state.aToken === null)
            setTimeout(()=>{
               this.getAsyncStorage();
            },2000)
        else
            {
                payload = {
                    "AuthenticationData": encryptedData,
                    "LoginAccessToken": this.state.aToken,
                    "MobileUsersReferrals":  [
                                    {"firstName":this.props.name.split(" ")[0], "lastName": this.props.name.split(" ")[1], "mobilePhone":this.formatMobileNo(this.props.phone), "email": this.props.email}
                                    ],
                };

                this.props.saveReferrals(payload);
                this.props.menu(2);

                setTimeout(() => {
                    if(!_.isEmpty(this.props.MobileReferrals))
                        {
                            this.props.MobileReferrals.map(personObj =>    
                                {
                                    if(personObj.ReferralAddStatus === true)
                                    {
                                        // console.tron.log("referral status="+true);
                                         this.props.menu(2);
                                         this.setState({isLoading: this.props.fetching});
                                    }
                                    else
                                    {
                                        // console.tron.log("referral status="+false);
                                        this.setState({isLoading: this.props.fetching});
                                        this.props.menu(2);
                                        //Alert.alert("Referrals not added");
                                    }
                                }
                            )
                        }
                    else    
                        console.log("mobileReferrals="+this.props.MobileReferrals); 
                },2000);
            }
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
                                    'language': '',
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
                                    'language': '',
                                    'backgroundColor': 'normal'
                                }} />
                    </View>
            );
        

        
        return;

    }

    somethingElse = () => {

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

    formatNew = (mobileNo) => {

        let firstFour = mobileNo.substring(0,4);
        let restofFour = mobileNo.substring(4);
        let first = mobileNo.substring(0,1);
        let firstTwo = mobileNo.substring(0,2);

        let newMobileNo = "+";

        if(firstFour === "0032")
            newMobileNo = newMobileNo +"32"+ restofFour;
        else
            if(first === "0" && first.length === 10)
                newMobileNo = newMobileNo + "32"+ mobileNo.substring(1);
            else
                if(firstTwo === "32" && mobileNo.length === 11)
                    newMobileNo = newMobileNo + mobileNo;
                else
                    if(first !== "+" &&  first!== "0" && mobileNo.length >=11)
                        newMobileNo = "+" + mobileNo;

        return newMobileNo;
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

    render() {
        const platform = Platform.OS;
        console.log("platform --->",Platform.OS);
        return (

            <KeyboardAwareScrollView
                behavior = "padding"
                enableOnAndroid = { false }
                contentContainerStyle={ newStyle.keyboardContainer }
                scrollEnabled={true}
                >

                <View style= { newStyle.layoutBelow }>

                    <View style={newStyle.endButtons}>     

                        <View style={newStyle.topView}>
                        <View style={{ marginLeft:0, width:40,justifyContent:'flex-start', alignItems:'flex-start' }}>
                                    <TouchableOpacity
                                            onPress={() => { this.props.menu(9); } }
                                            activeOpacity={0.5}
                                            style={{
                                                width: 30,
                                                height: 30, 
                                                backgroundColor: 'transparent',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}> 
                                            <Icon
                                                containerStyle={newStyle.iconImageStyle}
                                                name='arrow-circle-left'
                                                type='font-awesome'
                                                color='#E73D50'
                                                size = {20} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style= {newStyle.topText}>           
                                        {this.state.text.addFriendNew}
                                    </Text>    
                                </View>
                        </View>

                        <View style= {newStyle.inputContainer}>

                            <Text style={newStyle.firstName}>{this.state.text.addFriendName} </Text>
                            {
                            (this.props.name ==='')?
                            <TextInput
                                        style={ newStyle.nameInput }
                                        placeholder=''
                                        underlineColorAndroid= 'transparent'
                                        onChangeText={(firstNameInput) => this.setState({firstNameInput})}/>
                            :
                            <TextInput
                                        style={ newStyle.nameInput }
                                        placeholder=''
                                        underlineColorAndroid= 'transparent'
                                        value = { this.props.name }
                                        onChangeText={(firstNameInput) => this.setState({firstNameInput})}/>

                            }

                            {
                                this.state.isLoading===true?
                                <View style = {{position: 'absolute' , zIndex:3999, left: 30, top: 0, right: 0, bottom: 0}}>
                                <BallIndicator color='#e73d50' />
                                </View>:this.somethingElse()
                            }

                            <Text style={newStyle.firstName}>{this.state.text.Phone}</Text>
                            {
                            (this.props.phone ==='')?

                            <PhoneInput
                                    opacity={1}
                                    ref={(ref) => { this.phone = ref; }}
                                    initialCountry={this.state.countryCode}
                                    onSelectCountry={(iso2) => { this.setState({countryCode: iso2}); console.log('country='+this.state.countryCode) }}
                                    style= {newStyle.nameInput}
                                    onChangePhoneNumber = { (phoneNumberInput) => this.validateBelgiumPhoneNumber(phoneNumberInput) }
                                />                            
                            :
                            <PhoneInput
                                    opacity={1}
                                    ref={(ref) => { this.phone = ref; }}
                                    initialCountry={this.state.countryCode}
                                    onSelectCountry={(iso2) => { this.setState({countryCode: iso2}); console.log('country='+this.state.countryCode) }}
                                    style= {newStyle.nameInput}
                                    onChangePhoneNumber = { (phoneNumberInput) => this.validateBelgiumPhoneNumber(phoneNumberInput) }
                                    value = {this.formatMobileNo(this.props.phone)}
                                />                                
                            }
                        </View>

                        <View style={newStyle.buttonViewBottom}>
                        <TouchableOpacity
                                    onPress={() => { (this.props.name === '' && this.props.phone === '')? this.saveReferralsFromEmpty() : this.saveReferrals()  } }
                                    activeOpacity={0.5}
                                    style={{
                                        width: 280,
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
                                    > {this.state.text.addFriendsButton} </Text>
                                </TouchableOpacity>                  
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
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        width: 180,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginBottom: 15
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
        flex: 4,
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
        flex: Platform.OS === 'ios'?14:1,        
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop:10,
    },

    topText: {
        width: viewPortWidth * 0.70,
        height: 34,
        fontFamily: "WorkSans-Medium",
        fontSize: 21,
        fontWeight: "600",
        fontStyle: "normal",
        lineHeight: 34,
        letterSpacing: 0,
        textAlign: "center",
        color: "rgb(231, 61, 80)"
    },

    topView: {
        width: 276,
        height: 68,
        flex:2,
        flexDirection:'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    paraView: {
        width: 276,
        height: 57,
        flex: 1,
    },

    buttonView: {
        flex: 7,
    },

    buttonViewBottom: {
        flex: 10
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
        width: 13,
        height: 16,
        fontFamily: "FontAwesome",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.67,
        textAlign: "center",
        color: "rgb(231, 61, 80)", 
        marginTop: 30,
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
        MobileReferrals: FriendSelectors.getMobileReferral(state),
        fetching: FriendSelectors.getFetching(state)
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      navigateBack: () => this.props.navigation.goBack(),
      saveReferrals:  (payload) => dispatch({type: 'SAVE_REFERRALS', payload})
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnAddFriendDetailsComponent);