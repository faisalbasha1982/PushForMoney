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
import { ProfileSelectors } from '../Redux/ProfileRedux';

import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';
import localStorage from 'react-native-sync-localstorage';
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';

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

let authData = AuthComponent.authenticationData("en");
let encryptedData = AesComponent.aesCallback(authData);
let ltoken = localStorage.getItem('token');

class PushToEarnProfileComponent extends Component {

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
            buttonText: '.........',
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
            text:{}
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

    componentWillReceiveProps(nextProps) {

        if(this.props !== nextProps)
        {
            let authData = AuthComponent.authenticationData("en");
            let encryptedData = AesComponent.aesCallback(authData);
            let ltoken = localStorage.getItem('token');
            this.setState({isLoading: true});

            console.log("login access token="+ltoken);
            console.tron.log("login access token="+ltoken);

            setTimeout(() => 
            {

                let payload = {
                    "AuthenticationData": encryptedData,
                    "LoginAccessToken": ltoken,
                };

                this.props.getProfile(payload);

            },3000);
        }
    }

    componentDidMount() {

        let authData = AuthComponent.authenticationData("en");
        let encryptedData = AesComponent.aesCallback(authData);
        let ltoken = localStorage.getItem('token');
        this.setState({isLoading: true});

        console.log("login access token="+ltoken);
        console.tron.log("login access token="+ltoken);

        setTimeout(() => 
        {
            let payload = {
                "AuthenticationData": encryptedData,
                "LoginAccessToken": ltoken,
            };

            this.props.getProfile(payload);
        },3000);

        let language = localStorage.getItem('language');

            if(language === 'Dutch')
                this.setState({ text: languageSettingsPFM.Dutch});
            else
                if(language === 'English')
                this.setState({ text: languageSettingsPFM.English});
            else
                if(language === 'French')
                this.setState({ text: languageSettingsPFM.French});            
    

    }


    renderNothing = () => {

    }

    seteditable = () => {
        this.setState({firstNameEditable: true});
    }

    callUpdateName = (name) => {
     
        this.setState({isLoading: true});

        console.log("login access token="+ltoken);
        console.tron.log("login access token="+ltoken);

        let payload = {         
            "AuthenticationData": encryptedData,
            "LoginAccessToken":ltoken,
            "NewFirstName": name,
        };

        this.props.nameUpdate(payload);
    }

    callUpdateLastName = (name) => {

        this.setState({isLoading: true});

        console.log("login access token="+ltoken);
        console.tron.log("login access token="+ltoken);


        let payload = {         
            "AuthenticationData": encryptedData,
            "LoginAccessToken":ltoken,
            "NewLastName": name,
        };

        this.props.nameUpdate(payload);
    }

    changeMobile = (phoneNumber) => {

        this.setState({isLoading: true});

        console.log("login access token="+ltoken);
        console.tron.log("login access token="+ltoken);


        let payload = {             
            "AuthenticationData": encryptedData,
            "LoginAccessToken":ltoken,
            "NewMobileNumber": phoneNumber,
        };

        this.props.changeMobile(payload);
    }

    render() {
        const platform = Platform.OS;
        console.log("platform --->",Platform.OS);
        console.log("bankinfo="+this.props.bankInfo);
        return (

                <View style= {newStyle.layoutBelow}>
                    <View style={newStyle.endButtons}>

                        <View style={newStyle.topView}>
                            <Text style= {newStyle.topText}>
                                    {this.state.text.myProfile}
                            </Text>
                        </View>

                        <View style= {newStyle.inputContainer}>
                            <Text style={newStyle.firstName}>{this.state.text.firstName}</Text>

                            <View style={newStyle.innerContainer}>
                            <TextInput
                                        style={ newStyle.nameInputFirst }
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
                                        size = {15}
                                        onPress={ () => this.seteditable()  } />                
                            </View>

                            <Text style={newStyle.firstName}>{this.state.text.lastName}</Text>
                            <View style={newStyle.innerContainer}>
                            <TextInput
                                style={ newStyle.nameInput}
                                placeholder='last name'
                                editable={true}
                                onBlur = { () => this.callUpdateLastName(this.state.lastNameInput)}
                                underlineColorAndroid= 'transparent'
                                onChangeText= { (lastNameInput) => this.validateLastName(lastNameInput) }/>
                            <Icon
                                        containerStyle={newStyle.iconImageStyle}
                                        name='edit'
                                        type='font-awesome'
                                        color='#E73D50'
                                        size = {15}
                                        onPress={ () => this.seteditable()  } />
                            </View>

                            <Text style={newStyle.firstName}>{this.state.text.Email}</Text>
                            <View style={newStyle.innerContainer}>
                            <TextInput
                                style={ newStyle.nameInputEmail }
                                placeholder='Email Address'
                                editable={true}
                                underlineColorAndroid= 'transparent'
                                onBlur = { () => this.callUpdateName(this.state.emailInput)}
                                onChangeText= { (emailInput) => this.validateEmail(emailInput) }/>
                            <Icon
                                        containerStyle={newStyle.iconImageStyle}
                                        name=''
                                        type='font-awesome'
                                        color='#E73D50'
                                        size = {0}
                                        onPress={ () => this.seteditable()  } />
                            </View>

                            <Text style={newStyle.firstName}>{this.state.text.Phone}</Text>

                            <View style={newStyle.innerContainer}>
                            <TextInput
                                style={ newStyle.nameInput}
                                placeholder='Phone Number'
                                editable={true}
                                underlineColorAndroid= 'transparent'
                                onBlur = { () => this.changeMobile(this.state.phoneNumberInput)}
                                onChangeText= { (phoneNumberInput) => this.validatePhoneNumber(phoneNumberInput) }/>    
                                  <Icon
                                        containerStyle={newStyle.iconImageStyle}
                                        name='edit'
                                        type='font-awesome'
                                        color='#E73D50'
                                        size = {15}
                                        onPress={ () => this.seteditable()  } />
                            </View>
                                

                            <Text style={newStyle.firstName}>{this.state.text.Password}</Text>
                            <View style={newStyle.innerContainer}>
                            <TouchableOpacity
                                onPress={() => { this.props.menu(6) } }
                                activeOpacity={0.5}
                                style={{
                                    width: 280,
                                    height: 30,
                                    margin:0,
                                    borderBottomColor: "#353535",
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                    backgroundColor: 'transparent',
                                    marginBottom: 0,
                                    padding: 0,
                                    flex:8,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 25,
                                        fontFamily: 'WorkSans-Regular',
                                        fontWeight: '500',
                                        fontStyle: 'normal',
                                        color: '#000000',
                                        marginTop: 0,   
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        letterSpacing: 0.67,
                                        textAlign: 'left'}}
                                > {this.state.buttonText.toUpperCase()}</Text>
                            </TouchableOpacity>
                            <Icon
                                        containerStyle={newStyle.iconImageStyle}
                                        name='edit'
                                        type='font-awesome'
                                        color='#E73D50'
                                        size = {15}
                                        onPress={ () => this.seteditable()  } />
                            </View>

                            {/* <TextInput
                                style={ newStyle.nameInput}
                                placeholder='Password'
                                editable={true}
                                underlineColorAndroid= 'transparent'
                                onBlur = { () => this.callUpdateName(this.state.passwordInput)}
                                onChangeText= { (passwordInput) => this.validatePassword(passwordInput) }/> */}

                            <View style={{flex: 25, }}>
                                <Text style={newStyle.firstName}>{this.state.text.cardDetails}</Text> {'\n'}
                                {
                                     this.props.bankInfo === null || this.props.bankInfo === undefined || this.props.bankInfo.MobileUserBankDetailId === 0?
                                     <Text style={newStyle.para}> Add your card details  <Text style={{ color: '#e73d50',fontFamily: 'WorkSans-Bold', fontWeight: '500', fontSize: 20  }} onPress={() => this.props.menu(5)}>here</Text> </Text>
                                     :
                                      this.props.bankInfo.MobileUserBankDetailId !== 0?
                                     <View style={{ flex:1,  }}>
                                            <Text style={{  fontSize: 10,   
                                        fontFamily: 'WorkSans-Regular',
                                        fontWeight: '500',
                                        fontStyle: 'normal',
                                        color: '#000000', }}> BIC NO: { this.props.bankInfo.BIC_NO } </Text> {'\n'}
                                            <Text style={{  fontSize: 10,
                                        fontFamily: 'WorkSans-Regular',
                                        fontWeight: '500',
                                        fontStyle: 'normal',
                                        color: '#000000', }} > BANK NAME: { this.props.bankInfo.IBAN } </Text> {'\n'}
                                            <Text style={{  fontSize: 10,   
                                        fontFamily: 'WorkSans-Regular',
                                        fontWeight: '500',
                                        fontStyle: 'normal',
                                        color: '#000000', }}> IBAN NO: {  this.props.bankInfo.Bankname }  </Text> {'\n'}
                                      </View>
                                      : 
                                      this.renderNothing()
                                }
                            </View>


                            {/* {
                                this.props.bankInfo === null? this.renderNothing()
                                    :this.cardDetails(this.props.bankInfo.MobileUserBankDetails)
                            } */}

                        </View>


                        {/* <View style={newStyle.buttonView}>
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
                        </View> */}

                    </View>
                
                </View>
                 
        );
    }

}

const newStyle = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: 'steelblue',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },

    innerContainer: {

        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginRight: 4,
        marginBottom: 5,
        
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

    nameInputFirst:{
        width: viewPortWidth*.83,
        height: 30,
        margin:0,
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        marginBottom: 0,
        padding: 0,
        flex:8,
    },

    nameInputEmail:{
        width: viewPortWidth*.78,
        height: 30,
        margin:0,
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        marginBottom: 0,
        padding: 0,
        flex:8,
    },

    nameInput: {
        width: viewPortWidth*.83,
        height: 30,
        margin:0,
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        marginBottom: 5,
        padding: 0,
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
        width: 24,
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
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnProfileComponent);