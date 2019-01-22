import React, { Component } from 'react'
import {
    ScrollView,
    Text,
    Image,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Dimensions,
    Platform,    
    AsyncStorage,
} from 'react-native';

import {
    BallIndicator,
  } from 'react-native-indicators';

import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as NavigationService from '../Navigation/NavigationService';
import newStyle from './Styles/PushToEarnPrivacyPolicyStyles';
import logoNew from '../Images/page1.png';
import Icon from 'react-native-vector-icons/FontAwesome';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;
import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';

import Swiper from 'react-native-swiper';

// Styles

let cLanguage = '';

class PushToEarnPrivatePolicy extends Component {

    // static propTypes = {
    //     language: PropTypes.string.isRequired
    // }

    constructor(props)
    {
        super(props);             

        this.state = {
            isLoading: false,
            language: '',
            languageCode:'',
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
            text:{}
        };    
    }


    callOTP = (payload) => {

        if(payload === '')
            return ;

        this.setState({ isLoading: true});

        console.tron.log("payload sent to private policy page=",payload);

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);

        console.tron.log("loginData:="+payload.LoginData);
        console.tron.log("SignUpData="+payload.SignupData);

        let finalPayload = {

            "AuthenticationData": encryptedData,
            "LoginData": payload.LoginData,
            "SignUpData": payload.SignupData

        };

        console.log("payload to pass=",finalPayload);

        this.props.registerAction(payload);
    }

    componentWillReceiveProps(nextProps) {
    }

    getAsyncStorageToken = async () => {

        await AsyncStorage.getItem('language').then((language) => {
            this.setState({ language: language});
        });

        this.setLanguage();

        await AsyncStorage.getItem('token').then((token) => {
            this.setState({ token: token});
        });

    }

    componentWillMount() {

        this.getAsyncStorageToken();
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

        if(this.state.language === 'Dutch')
            this.setState({ text: languageSettingsPFM.Dutch, languageCode:'nl'});
        else
        if(this.state.language === 'English')
            this.setState({ text: languageSettingsPFM.English,languageCode:'en'});
        else
        if(this.state.language === 'French')
            this.setState({ text: languageSettingsPFM.French, languageCode:'fr'});

    }

    somethingElse = ( ) => {

    }

    render() {

        const platform = Platform.OS;
        const payload  = this.props.navigation.state.params.payload;

        console.log("platform --->",Platform.OS);
        // console.tron.log("payload="+payload.LoginData);
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
                <View style={{ flex:3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' ,backgroundColor: 'transparent' }}>
                    <View style={{ marginLeft:0, backgroundColor:'transparent', width:80,justifyContent:'center', alignItems:'center' }}>
                                        <TouchableOpacity
                                                onPress={() => { NavigationService.goBack(); } }
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
                                                    size = {30} />
                                        </TouchableOpacity>
                    </View>
                    <View style= {{ flex:1, }}>
                            <Text
                            style={{
                                width: 334,
                                height: 34,
                                fontFamily: "WorkSans-Medium",
                                fontSize: 30,
                                fontWeight: "500",
                                fontStyle: "normal",
                                lineHeight: 34,
                                letterSpacing: 0,
                                color: "#E73D50" 
                            }}>
                            {this.state.text.pPolicy}
                        </Text>
                    </View>
                </View>

                <View style={newStyle.inputContainer}>
                    <View style={{width: viewPortWidth, height: viewPortHeight*0.88, flex:9 }}>
                    <Swiper style={newStyle.wrapper}
                             height={viewPortHeight} horizontal={true}
                             dot={<View style={{backgroundColor: '#FFFFFF', width: 10, height: 10,borderWidth:2, borderStyle: 'solid', borderColor:'#E73D50', borderRadius: 10, marginLeft: 3, marginRight: 3, marginTop: 20, marginBottom: 0}} />}
                             activeDot={<View style={{backgroundColor: '#E73D50', width: 10, height: 10, borderRadius: 10, marginLeft: 3, marginRight: 3, marginTop: 20, marginBottom: 0}} />}
                             showsButtons={false}>
                        <View style={newStyle.slide1}>
                            <Text style={newStyle.text}>{languageSettingsPFM.English.PolicyText}</Text>
                        </View>
                        <View style={newStyle.slide2}>
                            <Text style={newStyle.text}>{languageSettingsPFM.English.PolicyText}</Text>
                        </View>
                        <View style={newStyle.slide3}>
                            <Text style={newStyle.text}>{languageSettingsPFM.English.PolicyText}</Text>
                        </View>
                        <View style={newStyle.slide4}>
                            <Text style={newStyle.text}>{languageSettingsPFM.English.PolicyText}</Text>
                        </View>
                        <View style={newStyle.slide5}>
                            <Text style={newStyle.text}>{languageSettingsPFM.English.PolicyText}</Text>
                        </View>
                        <View style={newStyle.slide6}>
                            <Text style={newStyle.text}>{languageSettingsPFM.English.PolicyText}</Text>
                        </View>

                    </Swiper> 
                    </View>
                  

                    <View style={newStyle.endButtons}>               
                
                        <TouchableOpacity
                            onPress={() => { this.callOTP(payload); } }
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
                            > {this.state.text.agree}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { NavigationService.navigate('PushToEarnSignIn2') } }
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
                            > {this.state.text.disagree}</Text>
                        </TouchableOpacity>                   
                   

                    </View>
                </View>    
                {
                            this.state.isLoading===true?
                            <View style = {{position: 'absolute' , zIndex:3999, left: 30, top: 0, right: 0, bottom: 0}}>
                            <BallIndicator color='#e73d50' />
                            </View>:this.somethingElse()
                  }            
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