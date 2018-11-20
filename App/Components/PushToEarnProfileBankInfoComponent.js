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
import ButtonNew from '../Components/ButtonNew';
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

import { Colors } from "../Themes";
import { Images } from '../Themes';

import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';
import localStorage from 'react-native-sync-localstorage';

import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/NewHeaderImage.png';
import Icon from 'react-native-vector-icons/FontAwesome';


const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

// Styles

let cLanguage = '';

class PushToEarnProfileBankInfoComponent extends Component {

    constructor(props)
    {
        super(props);             

        this.state = {
            language: 'NEDERLANDS',
            languageCode: '',
            bankName:'',
            ibanNumber: 34,
            bicNumber: 12,
            validation: false,
            renderValidate: false,
            selectionFirst: false,
            selectionSecond: false,
            selectionThird: false,
            selectionFourth: false,
            buttonText: 'SAVE DATA',
            text:{},
            aToken:'',
            isLoading:''
        };    
    }

    componentWillReceiveProps(nextProps) {

        if(this.props !== nextProps)
            this.getAsyncStorage();
    }

    componentWillMount() {
        this.getAsyncStorage();
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

        },500);        
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
        let language = localStorage.getItem('language');
        this.getAsyncStorage();
    }   

    renderNothing = () => {

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

    saveData = () => {


        let authData = AuthComponent.authenticationData(this.state.language);
        let encryptedData = AesComponent.aesCallback(authData);
        let ltoken = localStorage.getItem('token');
        this.setState({isLoading: true});

        if(this.state.bankName === null || this.state.bankName === undefined)
            {
                Alert.alert("Bank Name is empty");
            }
        else
        {
            if(this.state.ibanNumber === null || this.state.ibanNumber === undefined)
            {
                Alert.alert("bank Number is empty");
            }
            else
                if(this.state.bicNumber === null || this.state.bicNumber === undefined)
                {
                    Alert.alert("bank Number is empty");
                }
                else
                {

                    if(this.state.bankName === '' || this.state.ibanNumber === '' || this.state.bicNumber === '')
                        this.props.menu(1);
                    else
                    {
                        let payload = {
                            "AuthenticationData":encryptedData,
                            "LoginAccessToken": this.state.aToken,
                            "Bankname" : this.state.bankName,        
                            "IBAN" : this.state.ibanNumber,
                            "BIC_NO" : this.state.bicNumber,
                            "Status" : "1",
                        };
                
                        this.props.cardDetails(payload);
                        this.callProfile();
                        this.props.menu(1);
                    }


                }
        }

    }

    render() {
        const platform = Platform.OS;
        console.log("platform --->",Platform.OS);
        return (

            <KeyboardAwareScrollView
                    behavior = "padding"
                    enableOnAndroid = { false }
                    contentContainerStyle={ newStyle.keyboardContainer }
                    scrollEnabled={true}>

                    <View style={newStyle.endButtons}>     

                        <View style={newStyle.topView}>
                        <View style={{ marginLeft:31, width:80,justifyContent:'flex-end', alignItems:'flex-end' }}>
                                    <TouchableOpacity
                                            onPress={() => { this.props.menu(1); } }
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
                            <Text style= {newStyle.topText}>           
                                    {this.state.text.myProfile}
                            </Text>    
                        </View>

                        <View style= {newStyle.inputContainer}>

                            <Text style={newStyle.firstName}>{this.state.text.BankName}</Text>
                            <TextInput
                                        style={ newStyle.nameInput }
                                        placeholder=''
                                        underlineColorAndroid= 'transparent'
                                        onChangeText={(bankName) => this.setState({bankName})}/>

                              {/* {this.state.isLoading === true?
                                    <View style = {{position: 'absolute' , zIndex:3999, left: 25, top: 0, right: 0, bottom: 0}}>
                                    <BallIndicator color='#e73d50' />
                                    </View>:this.somethingElse()
                               }             */}
                                    
                            <Text style={newStyle.firstName}>{this.state.text.Iban}</Text>
                            <TextInput
                                style={ newStyle.nameInput}
                                placeholder=''
                                underlineColorAndroid= 'transparent'
                                onChangeText= { (ibanNumber) => this.setState({ibanNumber}) }/>

                            <Text style={newStyle.firstName}>{this.state.text.Bic}</Text>
                            <TextInput
                                style={ newStyle.nameInput}
                                placeholder=''
                                underlineColorAndroid= 'transparent'
                                onChangeText= { (bicNumber) => this.setState({bicNumber}) }/>

                        </View>


                        <View style={newStyle.buttonView}>
                        <TouchableOpacity
                            onPress={() => { this.saveData(); 
                                              this.callProfile();
                            } }
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
                            > {this.state.buttonText.toUpperCase()}</Text>
                        </TouchableOpacity>               
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
        flex:2,
        justifyContent: 'center',
        alignItems: 'center',        
  },

  leftButton: {
    width: 54,
    height: 111,
    backgroundColor: Colors.white,
    shadowColor: "rgba(216, 216, 216, 0.15)",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    marginBottom: 5,
    marginRight: 10,
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
    marginRight: 10,
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
        width: viewPortWidth * 0.90,
        height: 34,
        fontFamily: "WorkSans-Medium",
        fontSize: 21,
        fontWeight: "600",
        fontStyle: "normal",
        lineHeight: 34,
        letterSpacing: 0,
        textAlign: "left",
        marginLeft:15,
        color: "rgb(231, 61, 80)",
        backgroundColor:'transparent'
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
        marginTop: 15,
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
      cardDetails: ( payload ) => dispatch({ type: 'CARD_DETAILS_REQUEST', payload }),
      getProfile:(payload) => dispatch({ type: 'GET_PROFILE_REQUEST_NEW', payload }),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnProfileBankInfoComponent);