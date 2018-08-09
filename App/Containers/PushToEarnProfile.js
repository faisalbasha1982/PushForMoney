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
import DeviceInfo from 'react-native-device-info'
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import CompanyBanner from '../Components/CompanyBanner';
import Validation from '../Components/ButtonValidation';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-input';

import { Colors } from "../Themes";
import { Images } from '../Themes';

import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/NewHeaderImage.png';
import Icon from 'react-native-vector-icons/FontAwesome';


const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

let cLanguage = '';

class PushToEarnProfile extends Component {

    constructor(props)
    {
        super(props);             

        this.state = {
            language: 'NEDERLANDS',
            firstName:'',
            name:'',
            phoneNumber:'',
            validation: false,
            renderValidate: false,
            firstNameInput:'',
            firstNameEditable: false,
            lastNameInput:'',
            phoneNumberInput:'',
            emailInput:'',            
            passwordInput:'',
            cardDetails:'',
            buttonText: '',
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
        };    
    }

    validateLastName = (name) => {

        let reg = /^[a-zA-Z\s]+$/;

        console.log("last name="+name);

        if(name === '')
        {
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

    validateFirstName = (name) => {

        let reg = /^[a-zA-Z\s]+$/;

        console.log("validating First Name="+name);

        if(name === '')
        {
            console.log("First name is empty="+name);
            console.log("Language ="+this.state.language);
            this.setState({firstNameInput: ''});

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
    
    }

    validateEmail = (email) => {

    }

    PhoneNumberPickerChanged = (country, callingCode, phoneNumber) => {
        this.setState({countryName: country.name, callingCode: callingCode, phoneNo:phoneNumber});
     }

    componentWillReceiveProps(nextProps) {

        if(this.props !== nextProps)
        {
            let payload = 
            {
    
                "AuthenticationData": "{'Lang': 'en',  'AuthID': 'JS#236734','Data':'FormSignUp','D' : '2018-07-21 11:42:12' ,'R' : 'er3rssf3dfd'}",
                "LoginAccessToken": "{'MobileUserEmail' : 'Balaji_sp@yahoo.com','MobileUserName':'Balaji Subbiah','MobileUserID' : 1,'Approval':'True','LoginDate':'2018-06-24 5:05:12','LoginExpiryDate':'2018-08-24 6:54:12', 'RandomString' : 'er3rssfd'}",
                "TestingMode":"Testing@JobFixers#09876",
            };
    
            this.props.getProfile(payload);
        }            
    }



    componentDidMount() {

        let payload = 
        {

            "AuthenticationData": "{'Lang': 'en',  'AuthID': 'JS#236734','Data':'FormSignUp','D' : '2018-07-21 11:42:12' ,'R' : 'er3rssf3dfd'}",
            "LoginAccessToken": "{'MobileUserEmail' : 'Balaji_sp@yahoo.com','MobileUserName':'Balaji Subbiah','MobileUserID' : 1,'Approval':'True','LoginDate':'2018-06-24 5:05:12','LoginExpiryDate':'2018-08-24 6:54:12', 'RandomString' : 'er3rssfd'}",
            "TestingMode":"Testing@JobFixers#09876",
        };

        console.tron.log("payload="+payload);
        this.props.getProfile(payload);
    }


    renderNothing = () => {

    }

    seteditable = () => {
        this.setState({firstNameEditable: true});
    }

    callUpdateName = (name) => {

        let payload = {         
            "AuthenticationData": "{'Lang': 'en',  'AuthID': 'JS#236734','Data':'FormSignUp','D' : '2018-07-23 08:18:12' ,'R' : 'er3rssf3dfd'}",
            "LoginAccessToken": "{'MobileUserEmail' : 'Balaji.sp@esteinternationalgroup.be.com','MobileUserName':'hello16','MobileUserID' : 12,'Approval':'True','LoginDate':'2018-07-03 08:18:12','LoginExpiryDate':'2018-08-02 08:18:12', 'RandomString' : 'fasdf13a'}",
            "NewFirstName": "kumar",
            "TestingMode":"Testing@JobFixers#09876"
        };

        this.props.nameUpdate(payload);
    }

    callUpdateLastName = (name) => {
        let payload = {         
            "AuthenticationData": "{'Lang': 'en',  'AuthID': 'JS#236734','Data':'FormSignUp','D' : '2018-07-23 08:18:12' ,'R' : 'er3rssf3dfd'}",
            "LoginAccessToken": "{'MobileUserEmail' : 'Balaji.sp@esteinternationalgroup.be.com','MobileUserName':'hello16','MobileUserID' : 12,'Approval':'True','LoginDate':'2018-07-03 08:18:12','LoginExpiryDate':'2018-08-02 08:18:12', 'RandomString' : 'fasdf13a'}",
            "NewLastName": name,
            "TestingMode":"Testing@JobFixers#09876"
        };

        this.props.nameUpdate(payload);
    }

    changeMobile = (phoneNumber) => {

        let payload = {             

            "AuthenticationData": "{'Lang': 'en',  'AuthID': 'JS#236734','Data':'FormSignUp','D' : '2018-07-22 08:18:12' ,'R' : 'er3rssf3dfd'}",
            "LoginAccessToken": "{'MobileUserEmail' : 'Balaji_sp@yahoo.com','MobileUserName':'Balaji Subbiah','MobileUserID' : 1,'Approval':'True','LoginDate':'2018-07-03 08:18:12','LoginExpiryDate':'2018-08-02 08:18:12', 'RandomString' : 'fasdf13a'}",
            "NewMobileNumber": phoneNumber,
            "TestingMode":"Testing@JobFixers#09876"
        };

        this.props.changeMobile(payload);
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
                    <Image source={logoNew} resizeMode="contain" style={{ width: viewPortWidth, height: viewPortHeight * .45 }} />
                    {
                      (this.state.renderValidate === true)?this.renderValidation():this.renderNothing()
                    }
                </View>

                <View style= { newStyle.layoutBelow }>

                    <View style={newStyle.leftButtons}>
                        <View 
                            style={ (this.state.selectionFirst === true)?newStyle.leftButtonSelected: newStyle.leftButton}
                            onPress = { (selectionFirst) => {this.setState({ selectionFirst: true, selectionSecond: false, selectionThird: false, selectionFourth: false, });}}>
                                <TouchableOpacity 
                                    activeOpacity={0.5}
                                    style={newStyle.iconStyle}>
                                <Icon
                                    containerStyle={newStyle.iconImageStyle}
                                    name='user'
                                    type='font-awesome'
                                    color='#E73D50'
                                    size = {20}
                                    onPress={() => console.log('hello')} /> 
                        </TouchableOpacity>
                        </View>             
                        <View style={(this.state.selectionSecond === true)?newStyle.leftButtonSelected: newStyle.leftButton}
                              onPress = { (selectionFirst) => {this.setState({ selectionFirst: true, selectionSecond: false, selectionThird: false, selectionFourth: false, });}}>
                                <TouchableOpacity onPress={ (selectionSecond) => {this.setState({ selectionFirst: false, selectionSecond: true, selectionThird: false, selectionFourth: false, }) } }
                                    activeOpacity={0.5}
                                    style={newStyle.iconStyle}>
                                        <Icon
                                            containerStyle={newStyle.iconImageStyle}
                                            name='users'
                                            type='font-awesome'
                                            color='#E73D50'
                                            size = {20}
                                            onPress={() => console.log('hello')} /> 
                                </TouchableOpacity>
                        </View>
                        <View style={(this.state.selectionThird === true)?newStyle.leftButtonSelected: newStyle.leftButton}>
                                <TouchableOpacity onPress={ (selectionThird) => {this.setState({ selectionFirst: false, selectionSecond: false, selectionThird: true, selectionFourth: false, }) } }
                                    activeOpacity={0.5}
                                    style={newStyle.iconStyle}>
                                <Icon
                                    containerStyle={newStyle.iconImageStyle}
                                    name='euro'
                                    type='font-awesome'
                                    color='#E73D50'
                                    size = {20}
                                    onPress={() => console.log('hello')} /> 
                        </TouchableOpacity>
                        </View>
                        <View style={(this.state.selectionFourth === true)?newStyle.leftButtonSelected: newStyle.leftButton}>
                                <TouchableOpacity onPress={ (selectionFourth) => {this.setState({ selectionFirst: false, selectionSecond: false, selectionThird: false, selectionFourth: true, }) } }
                                    activeOpacity={0.5}
                                    style={newStyle.iconStyle}>
                                <Icon
                                    containerStyle={newStyle.iconImageStyle}
                                    name='info-circle'
                                    type='font-awesome'
                                    color='#E73D50'
                                    size = {20}
                                    onPress={() => console.log('hello')} /> 
                        </TouchableOpacity>
                        </View>
                    </View>

                    <View style={newStyle.endButtons}>     

                        <View style={newStyle.topView}>
                            <Text style= {newStyle.topText}>           
                                    My Profile
                            </Text>    
                        </View>

                        <View style= {newStyle.inputContainer}>

                            <Text style={newStyle.firstName}>First Name</Text>

                            <View style={newStyle.innerContainer}>
                            <TextInput
                                        style={ newStyle.nameInput }
                                        placeholder='first name'
                                        editable={true}
                                        ref={(ref) => { this.FirstInput = ref; }}
                                        underlineColorAndroid= 'transparent'
                                        onBlur = { () => this.callUpdateName(this.state.firstNameInput)}
                                        onChangeText={(firstNameInput) => this.validateFirstName(firstNameInput)}/>                            
                            <Icon
                                        containerStyle={newStyle.iconImageStyle}
                                        name='edit'
                                        type='font-awesome'
                                        color='#E73D50'
                                        size = {20}    
                                        onPress={ () => this.seteditable()  } />                
                            </View>

                            <Text style={newStyle.firstName}>Last Name</Text>
                            <TextInput
                                style={ newStyle.nameInput}
                                placeholder='last name'
                                editable={true}
                                onBlur = { () => this.callUpdateLastName(this.state.lastNameInput)}
                                underlineColorAndroid= 'transparent'
                                onChangeText= { (lastNameInput) => this.validateLastName(lastNameInput) }/>


                            <Text style={newStyle.firstName}>Email Address</Text>
                            <TextInput
                                style={ newStyle.nameInput }
                                placeholder='Email Address'
                                editable={true}
                                underlineColorAndroid= 'transparent'
                                onBlur = { () => this.callUpdateName(this.state.emailInput)}
                                onChangeText= { (emailInput) => this.validateEmail(emailInput) }/>

                            <Text style={newStyle.firstName}>Phone Number</Text>
                            <TextInput
                                style={ newStyle.nameInput}
                                placeholder='Phone Number'
                                editable={true}
                                underlineColorAndroid= 'transparent'
                                onBlur = { () => this.changeMobile(this.state.phoneNumberInput)}
                                onChangeText= { (phoneNumberInput) => this.validatePhoneNumber(phoneNumberInput) }/>    

                            <Text style={newStyle.firstName}>Password</Text>
                            <TextInput
                                style={ newStyle.nameInput}
                                placeholder='Password'
                                editable={true}
                                underlineColorAndroid= 'transparent'
                                onBlur = { () => this.callUpdateName(this.state.passwordInput)}
                                onChangeText= { (passwordInput) => this.validatePassword(passwordInput) }/>

                        </View>


                        <View style={newStyle.buttonView}>
                                <ButtonCardDetails
                                    objectParams=
                                        {{
                                            btnText: "CARD DETAILS", 
                                            language: "ENGLISH",
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

                    </View>
                

                </View>
                 
            </KeyboardAwareScrollView>
            :
            <ScrollView>
            <KeyboardAvoidingView
               style = {newStyle.container}
               behavior = "padding"
               enabled>
            
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
                                    language: "ENGLISH",
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

const newStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    innerContainer: {

        flexDirection: 'row',
        backgroundColor: 'transparent'

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
        width: 159,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginBottom: 1,
        marginTop: 5,
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
        height: 50,
        margin:0,
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        marginBottom: 0,
        padding: 0,
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
        flex: Platform.OS === 'ios'?18:1,        
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
        width: 276,
        height: 68,
        flex:2,
        marginTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
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
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {  
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      navigateBack: () => this.props.navigation.goBack(),
      getProfile:(payload) => dispatch({ type: 'GET_PROFILE_REQUEST', payload }),
      nameUpdate: (payload) => dispatch({ type: 'UPDATE_FIRST_NAME', payload }),
      changeMobile: (payload) => dispatch({ type: 'CHANGE_MOBILE', payload }),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnProfile);