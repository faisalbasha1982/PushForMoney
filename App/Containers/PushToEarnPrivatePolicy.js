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
import * as NavigationService from '../Navigation/NavigationService';
import TimerCountdown from 'react-native-timer-countdown';
import RegisterTypes, { RegisterActions } from '../Redux/RegisterRedux';

import { Colors } from "../Themes";
import { Images } from '../Themes';

import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/page1.png';
import Icon from 'react-native-vector-icons/FontAwesome';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

// Styles

let cLanguage = '';

class PushToEarnPrivatePolicy extends Component {

    static propTypes = {
        language: PropTypes.string.isRequired
    }

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
            lastNameInput:'',
            phoneNumberInput:'',
            buttonText: 'I Agree',
            buttonTextO: 'I Disagree',
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
        };    
    }


    callOTP = () => {

        // NavigationService.navigate('PushToEarnOTP');
        let payload =    {
			"AuthenticationData": "{'Lang': 'en', 'AuthID': 'JS#236734','Data':'FormSignUp','D' : '2018-07-17 9:15:12' ,'R' : 'ssf3dfd'}",
            "LoginData": "{ 'U' : 'fassl@esteinternational.com','P':'hello4','D':'2018-07-17 9:15:12', 'R' : 'er3rssfd'}",
            "SignUpData": "{ 'FName' : 'Balaji', 'LName' : 'Subbiah', 'Mob':'971505642772','Approval':'true','Device':'ios','D':'2018-07-17 9:15:12','R' : 'er3rssf3dfd'}",
            "TestingMode":"Testing@JobFixers#09876"
         };
            
        this.props.registerAction(payload);
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
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
                            color: "#353535" 
                        }}>
                    Private Policy Text
                    </Text>
                </View>                

                <View style={newStyle.inputContainer}>
                                           
                    <View style={newStyle.endButtons}>                
                
                        <TouchableOpacity
                            onPress={() => { this.callOTP(); } }
                            activeOpacity={0.5}
                            style={{
                                width: 150,
                                height: 57,
                                marginBottom: 0,
                                marginLeft: 15,
                                marginRight: 15,                                
                                borderRadius: 8,
                                backgroundColor: '#E73D50',
                                marginTop: viewPortHeight / 600,
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                            <Text
                                style={{
                                    fontSize: 17,
                                    width: 150,
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

                        <TouchableOpacity
                            onPress={() => { this.callOTP(); } }
                            activeOpacity={0.5}
                            style={{
                                width: 150,
                                height: 57,
                                marginBottom: 0,
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
                                    width: 150,
                                    height: 19,
                                    fontFamily: 'WorkSans-Regular',
                                    fontWeight: '500',
                                    fontStyle: 'normal',
                                    color: '#ffffff',
                                    marginTop: 0,                
                                    letterSpacing: 0.67,
                                    textAlign: 'center'}}
                            > {this.state.buttonTextO.toUpperCase()}</Text>
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
             <View style={newStyle.endButtons}>                
                
                <TouchableOpacity
                    onPress={() => { this.callOTP(); } }
                    activeOpacity={0.5}
                    style={{
                        width: 150,
                        height: 57,
                        marginBottom: 0,
                        marginLeft: 15,
                        marginRight: 15,                                
                        borderRadius: 8,
                        backgroundColor: '#E73D50',
                        marginTop: viewPortHeight / 600,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                    <Text
                        style={{
                            fontSize: 17,
                            width: 150,
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

                <TouchableOpacity
                    onPress={() => { this.callOTP(); } }
                    activeOpacity={0.5}
                    style={{
                        width: 150,
                        height: 57,
                        marginBottom: 0,
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
                            width: 150,
                            height: 19,
                            fontFamily: 'WorkSans-Regular',
                            fontWeight: '500',
                            fontStyle: 'normal',
                            color: '#ffffff',
                            marginTop: 0,                
                            letterSpacing: 0.67,
                            textAlign: 'center'}}
                    > {this.state.buttonTextO.toUpperCase()}</Text>
                </TouchableOpacity>                   
            </View>
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
        marginLeft: 30,
        flex: Platform.OS === 'ios'?30:1,
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

    endButtons: {
        width: viewPortWidth,
        height: Platform.OS === 'ios'?50:150,
        zIndex: 999,
        flex: Platform.OS === 'ios'?1:4,
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
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {  
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      navigateBack: () => this.props.navigation.goBack(),
      registerAction: ( payload ) => dispatch({ type: 'REGISTER_REQUEST_NEW', payload }),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnPrivatePolicy);