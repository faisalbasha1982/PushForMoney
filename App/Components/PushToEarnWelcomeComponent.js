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
    AppState,
    PushNotificationIOS,
} from 'react-native';

import { Container, Header, Content, Input, Item } from 'native-base';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";
import ButtonPushWelcome from '../Components/ButtonPushWelcome';
import ButtonWelcome from '../Components/ButtonWelcome';
import LanguageButton from '../Components/LanguageButton';
import Spinner from "react-native-loading-spinner-overlay";
import DeviceInfo from 'react-native-device-info'
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import localStorage from 'react-native-sync-localstorage';
import { ProfileSelectors } from '../Redux/ProfileRedux';
import { LoginSelectors } from '../Redux/LoginRedux';
import PushNotif from '../Containers/PushNotif';
import PushNotification from 'react-native-push-notification';
import PushToEarnAddFriendDetails from '../Components/PushToEarnAddFriendDetailsComponent';
import AddFriendComponent from '../Components/PushToEarnNoFriendsComponent';

import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';
import * as NavigationService from '../Navigation/NavigationService';

import LanguageSettings from '../Containers/LanguageSettingsNew';
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';
import newStyle from './Styles/WelcomeComponentStyles';

import { Colors } from "../Themes";
import { Images } from '../Themes';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

let cLanguage = '';

class PushToEarnWelcomeComponent extends Component {

    constructor(props)
    {
        super(props);             

        this.state = {
            language: 'NEDERLANDS',
            buttonText: '',
            text:{},
            languageCode:'',
            aToken:''
        };    

        //this.setLanguage();
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

    setLanguage = async () => {
       
          if(this.state.language === 'Dutch')
              this.setState({ text: languageSettingsPFM.Dutch, languageCode:'nl'});
          else
              if(this.state.language === 'English')
                  this.setState({ text: languageSettingsPFM.English, languageCode:'en'});
          else
              if(this.state.language === 'French')
                  this.setState({ text: languageSettingsPFM.French, languageCode:'fr'});

    }

    componentWillReceiveProps(nextProps)
    {
        console.log("willReceiveProps WP welcome component language="+this.props.language);

        if(this.props !== nextProps)
            this.getAsyncStorage();
    }

    componentWillUnmount() {
        AppState.addEventListener('change',this.handleAppStateChange);
    }

    renderNothing = () => {

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


    componentWillMount()
    {
        console.log("willMount WP welcome component language="+this.props.language);
        this.getAsyncStorage();

        // let authData = AuthComponent.authenticationData(this.state.languageCode);
        // let encryptedData = AesComponent.aesCallback(authData);
        // this.setState({isLoading: true});

        // console.log("login access token="+this.state.aToken);
        // console.tron.log("login access token="+this.state.aToken);

        //     setTimeout(() => 
        //     {
        //         let payload = {
        //             "AuthenticationData": encryptedData,
        //             "LoginAccessToken": this.state.aToken,
        //         };

        //         this.props.getProfile(payload);

        //     },3000);
        
    }

    renderFriendsComponent = () => {

        return (
            <AddFriendComponent menu = { this.menuChange }  language={this.state.language} />
        );
    }

    componentDidMount()
    {
        console.log('DidMount WP welcome component language='+this.props.language);
        this.getAsyncStorage();

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);

        setTimeout(() =>
        {

            console.log("async token from Storage="+this.state.aToken);

            let newPayload = {
                "AuthenticationData": encryptedData,
                "LoginAccessToken": this.state.aToken,
                "UpdateRequired" : 1,
                "ReadAll" : 0,
                "LastViewedNotificationID" : this.props.LastViewedNotificationID,
            };

            this.props.notificationRequest(newPayload);

            setTimeout(() => {
                // console.tron.log("mobilenotifications="+this.props.mobileNotifications);
                this.setState({ mobileNotifications: this.props.mobileNotifications});
            }, 3000);

        },3000);    

        setTimeout(() => {
            AppState.addEventListener('change',this.handleAppStateChange);            
        },4000);
    }

    render() {

        const platform = Platform.OS;
        console.log("platform --->",Platform.OS);
        console.log('text='+this.state.text.money);
        console.log("welcome WP component language in render ="+this.state.language);

        return (

                <View style={newStyle.endButtons}>
                    <View style={newStyle.topView}>
                        <Text style= {newStyle.topText}>           
                                {this.state.text.money}
                        </Text>    
                    </View>

                    <View style={newStyle.paraView}>
                        <Text style= {newStyle.para}>
                                Phallus sed tellus quis justo
                                finibus tempus.Nam sagittis.
                                Sollicitudin turpis.
                        </Text>
                    </View>

                    <PushNotif />

                    <View style={newStyle.buttonView}>

                      <TouchableOpacity
                                    onPress={() => {  } }
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
                                    > {this.state.text.workButton} </Text>
                                </TouchableOpacity>
                      <TouchableOpacity
                                    onPress={() => { 
                                        this.props.menu(9);
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
                                    > {this.state.text.addFriendsButton} </Text>
                       </TouchableOpacity>
                    </View>
                </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        bankInfo: ProfileSelectors.getBankInfo(state),
        fetching: ProfileSelectors.getFetching(state),
        LastViewedNotificationID: LoginSelectors.getLastViewedNotificationID(state),
        firstName: ProfileSelectors.getFirstName(state),
        lastName: ProfileSelectors.getLastName(state),
        email: ProfileSelectors.getEmail(state),
        mobileNo: ProfileSelectors.getMobileNo(state),
        statusCode: ProfileSelectors.getStatusCode(state),
        LastViewedNotificationID: LoginSelectors.getLastViewedNotificationID(state),
        mobileNotifications: LoginSelectors.getMobileNotifications(state)

    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
        navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
        navigateBack: () => this.props.navigation.goBack(),
        notificationRequest: (payload) => dispatch({ type: 'NOTIFICATION_REQUEST', payload}),
        getProfile:(payload) => dispatch({ type: 'GET_PROFILE_REQUEST_NEW', payload }),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnWelcomeComponent);