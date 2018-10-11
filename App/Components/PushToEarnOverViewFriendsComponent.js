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

import { Container, Header, Content, Input, Item } from 'native-base';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";
import ButtonNext from '../Components/ButtonNext';
import ButtonLogin from '../Components/ButtonLogin';
import ButtonPushWelcome from '../Components/ButtonPushWelcome';
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
import PhoneInput from 'react-native-phone-input';
import { FriendSelectors } from '../Redux/FriendRedux';
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

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

let cLanguage = '';

let authData = AuthComponent.authenticationData("en");
let encryptedData = AesComponent.aesCallback(authData);
let ltoken = localStorage.getItem('token');

class PushToEarnOverViewFriendsComponent extends Component {

    constructor(props)
    {
        super(props);             

        this.state = {
            language: '',
            languageCode: '',
            firstName:'',
            ReferredPersonStatus: false,
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
            screenHeight: 0,
            text:{},
            token:''
        };    
    }

    validationLastName = (name) => {

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

    validationFirstName = (name) => {

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
    }

    PhoneNumberPickerChanged = (country, callingCode, phoneNumber) => {
        this.setState({countryName: country.name, callingCode: callingCode, phoneNo:phoneNumber});
     }

     componentWillMount() {

        console.log("FO component Will Mount");
        console.log("FO getting async storage token");

        this.getAsyncStorageToken();

        setTimeout(()=> {
            this.getFriendList();
        },3000);

        console.log("FO token from getFriendList ="+this.state.token);

     }

    componentWillReceiveProps(nextProps) {
        console.log("FO component Will Mount");

        if(nextProps != this.props)
        {            
            this.getAsyncStorageToken();

            setTimeout(()=> {
                this.getFriendList();
            },3000);
        }

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

    componentDidMount() {

        console.log("FO inside friends overview component language="+this.state.language);

        this.getAsyncStorageToken();

            setTimeout(()=> {
                this.getFriendList();
            },3000);
    }

    renderNothing = () => {

    }

    parseReferralObject = () => {

        let nreferral = this.props.referral;

        console.log("referral object="+nreferral);
        console.tron.log("referral object="+nreferral);

        nreferral.map(( users  ) => {

            console.log("nreferral name="+users.Name);
            console.log("nreferral status="+users.ReferredPersonStatus);

        });

        return (
            nreferral.map(( users  ) => {

                <View>
                    <Text style={newStyle.firstName}>{users.Name + "\t" + users.ReferredPersonStatus }</Text>
                    <View style={newStyle.borderBottom}> </View>
                </View>

                }

            )
        );

    }

    getAsyncStorageToken = async () => {

        await AsyncStorage.getItem('token').then((token) => {
            this.setState({ token: token});
        });

        await AsyncStorage.getItem('language').then((language) => {
            this.setState({ language: language});
        });

        this.setLanguage();
    }

    getFriendList = () => {

        console.log("INSIDE FRIEND LIST API CALL");
        console.log("language Code="+this.state.languageCode);

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);
        let ltoken = localStorage.getItem('token');

        this.getAsyncStorageToken();

        this.setState({isLoading: true,});

        console.log("FO token from getFriendList ="+this.state.token);

        if(this.state.token !== null || this.state.token !== undefined)
        {
            let payload = {
                "AuthenticationData": encryptedData,
                "LoginAccessToken": this.state.token,
            };

            this.props.friendRequest(payload); 
        }
        else
        {
            //ltoken = localStorage.getItem('token');
        }
        
        console.log("this.props.referral="+this.props.referral);
        console.tron.log("this.props.referral="+this.props.referral);

    }


    archiveApiCall = (personObj) => {

        Alert.alert("called archive Api");
        console.log("called archive Api");

        console.log("FO language code="+this.state.languageCode);

        this.getAsyncStorageToken();

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);

        let payload =
                {
                    "AuthenticationData": encryptedData,
                    "LoginAccessToken": this.state.token,
                    "MobileReferralID" : personObj.MobileReferralID,
                };

        console.log("archive Api:");
        console.log("ltoken="+ltoken);

        Alert.alert("archive Api="+payload.MobileReferralID);

        (this.state.token===null || this.state.token===undefined)?
        setTimeout(() => {
            this.getAsyncStorageToken();
        })
        :
        setTimeout(() => {
            Alert.alert("calling Api for archive");
            this.props.archiveApi(payload);
        },3000)

    }

    renderListOne = (personObj) => {
        return (
            <View style={{ padding: 2, paddingTop: 3, paddingLeft:0, flexDirection: 'column',height: viewPortHeight*0.08, backgroundColor: 'white', }}>
                    <View style={{ padding: 3,paddingLeft:0, paddingTop: 4, flex:1, height: viewPortHeight*0.31, flexDirection: 'row' , alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: 'white'}}>
                      <View style={{ flex:1, backgroundColor:'transparent', width:50,height:60, flexDirection: 'column' }}>
                          <Text style={newStyle.nameStyles}>{ personObj.Name }</Text>
                          {/* <Text style={newStyle.lastnameStyle}>{ personObj.Name.split(' ')[1] }</Text> */}
                      </View>
                      <View style={{ flex:2, backgroundColor:'transparent',flexDirection:'column',alignItems:'flex-end', justifyContent:'flex-end', marginTop:10, }}>
                                        <View style={{width: 120, height: 10, backgroundColor: 'transparent', justifyContent:'flex-end', alignItems:'flex-end'}}>
                                        {(personObj.ReferredPersonStatus === 'Finished' || personObj.ReferredPersonStatus === 'Afgewerkt' || personObj.ReferredPersonStatus === 'Fini')?
                                        
                                                <TouchableOpacity
                                                    onPress={() => {  this.archiveApiCall(personObj) } }
                                                    activeOpacity={0.5}
                                                    style={{
                                                        width: 20,
                                                        height: 20,
                                                        backgroundColor: 'transparent',
                                                        justifyContent:'center',
                                                        alignItems:'flex-end'
                                                    }}>
                                                        <Icon
                                                            containerStyle={newStyle.iconImageArchive}
                                                            name='times-circle'
                                                            type='font-awesome'
                                                            color='#E73D50'
                                                            size = {14}
                                                            onPress={ () => {         
                                                                        console.log("called archive Api");
                                                                        } } />
                                                </TouchableOpacity>
                                                :
                                                this.renderNothing()
                                            }
                                        </View>
                                        <View style={{width: 120, height: 15, backgroundColor: 'transparent'}}>
                                                <Text style={newStyle.statusStyle}>{ personObj.ReferredPersonStatus}</Text>
                                        </View>
                      </View>

                    </View>
                     <View style={newStyle.borderBottom}></View>
            </View>
        );


    }

    renderList = (personObj) => {
            return (            
                <View style={{ padding: 2, paddingTop: 3, paddingLeft:0, flexDirection: 'column',height: viewPortHeight*0.08, backgroundColor: 'white', }}>
                        <View style={{ padding: 3,paddingLeft:0, paddingTop: 4, flex:1, height: viewPortHeight*0.31, flexDirection: 'row' , alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: 'white'}}>
                          <View style={{ flex:1, backgroundColor:'transparent', width:50,height:60, flexDirection: 'column' }}>
                              <Text style={newStyle.nameStyles}>{ personObj.Name }</Text>
                              {/* <Text style={newStyle.lastnameStyle}>{ personObj.Name.split(' ')[1] }</Text> */}
                          </View>
                          <View style={{ flex:2, backgroundColor:'transparent',flexDirection:'column',alignItems:'flex-end', justifyContent:'flex-end', marginTop:10, }}>
                                 
                                            <View style={{width: 120, height: 10, backgroundColor: 'transparent', justifyContent:'flex-end', alignItems:'flex-end'}}>
                                            {(personObj.ReferredPersonStatus === 'Finished' || personObj.ReferredPersonStatus === 'Afgewerkt' || personObj.ReferredPersonStatus === 'Fini')?
                                            
                                                    <TouchableOpacity
                                                        onPress={() => {  this.archiveApiCall(personObj) } }
                                                        activeOpacity={0.5}
                                                        style={{
                                                            width: 20,
                                                            height: 20,
                                                            backgroundColor: 'transparent',
                                                            justifyContent:'center',
                                                            alignItems:'flex-end'
                                                        }}>
                                                            <Icon
                                                                containerStyle={newStyle.iconImageArchive}
                                                                name='times-circle'
                                                                type='font-awesome'
                                                                color='#E73D50'
                                                                size = {14}
                                                                onPress={ () => {         
                                                                            console.log("called archive Api");
                                                                            } } />
                                                    </TouchableOpacity>
                                                    :
                                                    this.renderNothing()
                                                }
                                            </View>
                                            <View style={{width: 120, height: 15, backgroundColor: 'transparent'}}>
                                                    <Text style={newStyle.statusStyle}>{ personObj.ReferredPersonStatus}</Text>
                                            </View>


                          </View>

                        </View>
                         <View style={newStyle.borderBottom}></View>
                </View>
            );

    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        // Save the content height in state
        this.setState({ screenHeight: contentHeight });
      };

    render() {
        const platform = Platform.OS;
        console.log("platform --->",Platform.OS);
        console.log("FO inside friends overview component referral object="+this.props.referral);

        return (

                <View style= { newStyle.layoutBelow }>
                
                    <View style={newStyle.endButtons}>     

                        <View style={newStyle.topView}>
                            <Text style= {newStyle.topText}>           
                                    {this.state.text.friend}
                            </Text>    
                            {/* <Text style= {{  width: 120, height: 20, backgroundColor: 'steelblue'}}>           
                                    New Kandidaten 
                            </Text>     */}

                            <View style={newStyle.rightView}>
                                <TouchableOpacity
                                    onPress={() => { this.props.menu(9) } }
                                    activeOpacity={0.5}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        backgroundColor: 'transparent',
                                        marginRight: 0,
                                    }}>
                                <Icon
                                        containerStyle={newStyle.iconImageStyleNew}
                                        name='user-plus'
                                        type='font-awesome'
                                        color='#E73D50'
                                        size = {20}
                                         />
                                </TouchableOpacity>
                                <Text style={{
                                        fontFamily: "WorkSans-Medium",
                                        fontSize: 11,
                                        fontWeight: "600",
                                        fontStyle: "normal",
                                        lineHeight: 34,
                                        letterSpacing: 0,
                                        textAlign: "left",
                                        color: "rgb(231, 61, 80)" }}>{this.state.text.friends}</Text>
                            </View> 
                        </View>
                      

                                <View style= {newStyle.inputContainer}>
                                <ScrollView 
                                        style={{ flex: 1, backgroundColor: 'transparent', height:viewPortHeight*0.90 }} 
                                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', }}
                                        onScroll = { () => { this.getFriendList(); } }
                                >
                                    {
                                        this.props.referral.map(
                                            personObj => 

                                                this.renderList(personObj)
                                        )
                                    }
                                </ScrollView>
                                </View> 



                        <View style={newStyle.buttonView}>
                        </View>

                    </View>
                </View>
                 
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
        width: viewPortWidth,
        height: Platform.OS === 'ios'?viewPortHeight * 0.51:
                                      viewPortHeight * 0.29,
        flex: Platform.OS === 'ios'?2:6,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    firstName: {
        width: 280,
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
        height: 17,
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'white',
        marginBottom: 15,
        padding: 10,
    },

    borderBottom: {
        width: viewPortWidth*.80,
        height: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: 'rgb(231, 61, 80)',
        borderBottomColor: "rgb(231, 61, 80)"
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
        alignItems: 'flex-start',
        backgroundColor: 'white',        
    },

    inputContainer: {
        backgroundColor: 'transparent',
        flex: Platform.OS === 'ios'?18:1,        
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: viewPortHeight
    },

    topText: {
        width: 120 ,
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
        width: viewPortWidth,
        height: 68,
        flex:2,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: 'transparent'
    },

    rightView: {
        width: 140,
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 30,
    },

    paraView: {
        width: 276,
        height: 57,
        flex: 1,
    },

    buttonView: {
        flex: 2,
        backgroundColor: 'transparent'
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

    iconImageStyleNew: {
        width: 13,
        height: 26,
        fontFamily: "FontAwesome",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.67,
        textAlign: "center",
        color: "rgb(231, 61, 80)", 
        marginTop: 0,
        marginRight: 10,
        backgroundColor:'steelblue'
    },

    iconImageArchive:{
        width: 13,
        height: 26,
        fontFamily: "FontAwesome",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.67,
        textAlign: "center",
        color: "rgb(231, 61, 80)", 
        marginTop: 0,
        marginRight: 0,
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

    nameStyle: {
        padding: 5,
        margin: 5,
        width: 111,
        height: 50,
        fontFamily: "WorkSans-Regular",
        fontSize: 15,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.46,
        color: "rgb(53, 53, 53)"
    },

    nameStyles:{
        width: viewPortWidth,
        height: 25,
        fontFamily: "WorkSans-Regular",
        fontSize: 15,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.46,
        color: "rgb(53, 53, 53)",
        textAlign: "left",
        backgroundColor:'transparent',
        alignItems:'center'
    },

    lastnameStyle:{
        width: 120,
        height: 25,
        fontFamily: "WorkSans-Regular",
        fontSize: 15,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.46,
        color: "rgb(53, 53, 53)",
        textAlign: "right",
    },

    statusStyle: {
        width: 120,
        height: 13,
        flex:1,
        paddingLeft: 0,
        fontFamily: "WorkSans-Regular",
        fontSize: 11,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.39,
        color: "rgb(155, 155, 155)",
        backgroundColor: 'transparent',
        textAlign:'right',
        alignItems:'flex-end'
    }

});

const mapStateToProps = state => {
    return {
        referral: FriendSelectors.getReferral(state)
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {          
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      navigateBack: () => this.props.navigation.goBack(),
      friendRequest: (payload) => dispatch({type: 'GET_FRIEND_REQUEST',payload}),
      archiveApi: (payload) => dispatch({ type: 'GET_ARCHIVE',payload}),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnOverViewFriendsComponent);