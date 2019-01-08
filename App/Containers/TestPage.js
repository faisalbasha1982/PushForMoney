import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  AppState,
  Platform,
  PushNotificationIOS,
  AsyncStorage,  
} from 'react-native';
import * as NavigationService from '../Navigation/NavigationService';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import TopHeader from '../Components/TopHeader';
import logoNew from '../Images/NewHeaderImage.png';
import ProfileComponent from '../Components/PushToEarnProfileComponent';
import AddFriendComponent from '../Components/PushToEarnNoFriendsComponent';
import MoneyComponent from '../Components/PushToEarnMoneyComponent';
import InformationComponent from '../Components/PushToEarnInformationComponent';
import WelcomeComponent from '../Components/PushToEarnWelcomeComponent';
import ProfileChangePasswordComponent from '../Components/PushToEarnChangePasswordComponent';
import ProfileBankInfoComponent from '../Components/PushToEarnProfileBankInfoComponent';
import ProfileDetailsComponent from '../Components/PushToEarnAddFriendDetailsComponent';
import FriendsOverViewComponent from '../Components/PushToEarnOverViewFriendsComponent';
import FriendsLastComponent from '../Components/PushToEarnAddFriendLastComponent';
import PushToEarnOTPComponent from '../Components/PushToEarnOTPComponent';
import { FriendSelectors } from '../Redux/FriendRedux';
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';
import LanguageComponent from '../Components/PushToEarnLanguageComponent';
import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import PushNotif from '../Containers/PushNotif';
import PushNotification from 'react-native-push-notification';
import { LoginSelectors } from '../Redux/LoginRedux';
import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';

import localStorage from 'react-native-sync-localstorage';
import PushForJob from './PushForJob';
import _ from 'lodash';

 
const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth  = Dimensions.get('window').width;

class TestPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            language: '',
            languageCode: '',
            selectionFirst: false,
            selectionSecond: false,
            selectionThird: false,
            selectionFourth: false,
            menu: 0,
            nameParam:'',
            phoneParam:'',
            emailParam:'',
            languageChanged:false,
            token:'',
            currentMonth:'',
            currentYear:'',
            selectedValue:[]
        };
    }

    formatPhone = (phone) => {
       return phone.replace(/(?!\w|\s)./g, '');
    }

    menuChangeWithParameters = (mChange,name,phone,email,lang) => {
        //format phone
        let phoneString = this.formatPhone(phone);
        console.log("phone number="+phoneString);
        this.setState({ menu: mChange, nameParam: name, phoneParam: phoneString, emailParam: email, language: lang });
    }

    menuChange = (mChange,lang) =>{
        console.log("inside menu change with langauge ="+lang);
        this.setState({ menu: mChange, language: lang, languageChanged: true});
        
        setTimeout(() => {
            console.log("inside menu Change language set --->"+this.state.language);
        },2000);
    }

    doNothing = () => {
        
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

    componentWillMount() {

        console.log("TP component will mount");
        this.getAsyncStorage();

        AsyncStorage.getItem('token').then((token)=>{
            this.setState({ token: token});
        })

        this.setState({ menu:0 });

        let date, day, month, year;
        let today = new Date();
    
        day = parseInt(today.getUTCDate())>=10?today.getUTCDate():('0'+today.getUTCDate().toString());
        month = parseInt(today.getUTCMonth()+1)>=10?parseInt(today.getUTCMonth()+1):('0'+parseInt(today.getUTCMonth()+1));
        year = today.getUTCFullYear().toString();

        setTimeout(()=> {
            this.getFriendList();
            this.setDayYear(month,year);
        },600);

        this.callProfile();

    }

    componentWillReceiveProps(nextProps)
    {
        if(this.props !== nextProps)
        {
            if(this.props.navigation.state.params.language && !this.state.languageChanged)
            {
                if(this.props.navigation.state.params.language === 'Dutch')
                    this.setState({ text: languageSettingsPFM.Dutch, languageCode:'nl', language: 'Dutch'});
                else
                    if(this.props.navigation.state.params.language === 'English')
                        this.setState({ text: languageSettingsPFM.English, languageCode:'en', language: 'English'});
                    else
                        if(this.props.navigation.state.params.language === 'French')
                            this.setState({ text: languageSettingsPFM.French, languageCode:'fr', language: 'French'});
          
            }

            // setTimeout(()=> {
            //     this.getFriendList();
            // },600);

            // setTimeout(() => 
            // {

            //     console.log("async token from Storage="+this.state.aToken);
    
            //     let newPayload = {
            //         "AuthenticationData": encryptedData,
            //         "LoginAccessToken": this.state.token,
            //         "UpdateRequired" : 1,
            //         "ReadAll" : 0,
            //         "LastViewedNotificationID" : this.props.LastViewedNotificationID,
            //     };
    
            //     this.props.notificationRequest(newPayload);
    
            //     setTimeout(() => {
            //         // console.tron.log("mobilenotifications="+this.props.mobileNotifications);
            //         this.setState({ mobileNotifications: this.props.mobileNotifications});
            //     }, 900000);
    
            // },900000);    

        }
    }

    changeScreen = () => {
        this.props.navigation.navigate('PushForJob');
    }

    getAsyncStorageToken = async () => {

        await AsyncStorage.getItem('token').then((token) => {
            this.setState({ token: token});
        });

    }

    getAsyncStorage = async () => {

        await AsyncStorage.getItem('language').then((language) => {
            this.setState({ language: language })
          });

        await AsyncStorage.getItem('token').then((token) => {
            this.setState({ token: token });

            let authData = AuthComponent.authenticationData(this.state.languageCode);
            let encryptedData = AesComponent.aesCallback(authData);
    
            setTimeout(() => 
            {
                let payload = {
                    "AuthenticationData": encryptedData,
                    "LoginAccessToken": token,
                };
    
                this.props.getProfile(payload);
    
            },650);

        });

    }

    convertMonth = (month) => {

        console.tron.log("convert month="+typeof(month)+ " language="+this.state.language);        

        //month = month.to

        month = parseInt(month, 10);

        console.tron.log("month="+month);

        if(this.state.language === "English")
        {

            if(month === 1)
                return "JANUARY";
            if(month === 2)
                return "FEBRUARY";
            if(month === 3)
                return "MARCH";
            if(month === 4)
                return "APRIL";
            if(month === 5)
                return "MAY";
            if(month === 6)
                return "JUNE";
            if(month === 7)
                return "JULY";
            if(month === 8)
                return "AUGUST";
            if(month === 9)
                return "SEPTEMBER";
            if(month === 10)
                return "OCTOBER";
            if(month === 11)
                return "NOVEMBER";
            if(month === 12)
                return "DECEMBER";

        }
        else
            if(this.state.language === "French")
            {
                if(month === 1)
                    return "JANVIER";
                if(month === 2)
                    return "février";
                if(month === 3)
                    return "MARS";
                if(month === 4)
                    return "AVRIL";
                if(month === 5)
                    return "MAI";
                if(month === 6)
                    return "JUIN";
                if(month === 7)
                    return "JUILLET";
                if(month === 8)
                    return "AOUT";
                if(month === 9)
                    return "SEPTEMBRE";
                if(month === 10)
                    return "OCTOBRE";
                if(month === 11)
                    return "NOVEMBRE";
                if(month === 12)
                    return "décembre";        
            }
        else
            if(this.state.language === "Dutch")
            {
             
                if(month === 1)
                    return "JANUARI";
                if(month === 2)
                    return "FEBRUARI";
                if(month === 3)
                    return "MAART";
                if(month === 4)
                    return "APRIL";
                if(month === 5)
                    return "MEI";
                if(month === 6)
                    return "JUNI";
                if(month === 7)
                    return "JULI";
                if(month === 8)
                    return "AUGUSTUS";
                if(month === 9)
                    return "SEPTEMBER";
                if(month === 10)
                    return "OKTOBER";
                if(month === 11)
                    return "NOVEMBER";
                if(month === 12)
                    return "DECEMBER";
            }       

    }

    setDayYear = (month, year) => {

        console.tron.log("Received month="+month+ " type="+typeof(month));
        
        let cMonth = this.convertMonth(month);
        console.tron.log("cMonth="+cMonth);
        this.setState({ currentMonth: cMonth, currentYear: year, selectedValue:[cMonth,year] });
        console.log("setDayYear selectedValue="+this.state.selectedValue);

    }


    renderNothing = () => {

    }

    componentWillUnmount() {
        AppState.addEventListener('change',this.handleAppStateChange);
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
          },650);

        }
    }

    languageChange = (language) => {

        console.log("inside language change function ="+language);
        this.setState({ language:language });

    }

    componentDidMount() {

        console.log("test page did mount language="+this.state.language);
 
        if(this.props.navigation.state.params.language)
        {
            if(this.props.navigation.state.params.language === 'Dutch')
                this.setState({ text: languageSettingsPFM.Dutch, languageCode:'nl', language: 'Dutch'});
            else
                if(this.props.navigation.state.params.language === 'English' )
                    this.setState({ text: languageSettingsPFM.English, languageCode:'en', language: 'English'});
            else
                if(this.props.navigation.state.params.language === 'French' )
                    this.setState({ text: languageSettingsPFM.French, languageCode:'fr', language: 'French'});

            console.log("language set in TestPage="+this.state.language);
            console.log("language from push for job via navigaton ---->"+this.props.language);
                      
            setTimeout(()=> {
                this.getFriendList();
            },600);

            this.callProfile();

            let authData = AuthComponent.authenticationData(this.state.languageCode);
            let encryptedData = AesComponent.aesCallback(authData);    

            setTimeout(() => 
            {
                console.log("async token from Storage="+this.state.token);
    
                let newPayload = {
                    "AuthenticationData": encryptedData,
                    "LoginAccessToken": this.state.token,
                    "UpdateRequired" : 1,
                    "ReadAll" : 0,
                    "LastViewedNotificationID" : this.props.LastViewedNotificationID,
                };
    
                this.props.notificationRequest(newPayload);
    
                setTimeout(() => {
                    // console.tron.log("mobilenotifications="+this.props.mobileNotifications);
                    this.setState({ mobileNotifications: this.props.mobileNotifications});
                }, 3000);
    
            },600);
    
            setTimeout(() => {
                AppState.addEventListener('change',this.handleAppStateChange);            
            },600);
        }

    }

    getFriendList = () => {

        let authData = AuthComponent.authenticationData(this.state.languageCode);
        let encryptedData = AesComponent.aesCallback(authData);
        let ltoken = localStorage.getItem('token');

        this.getAsyncStorageToken();

        this.getAsyncStorage();

        this.setState({isLoading: true,});

        let token = '';

        console.log("token from getFriendList ="+this.state.token);
      
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
            ltoken = localStorage.getItem('token');       
        }
    }

    addComponent = () => {

        // setTimeout(()=> {
        //     this.getFriendList();
        // },3000);

        console.tron.log("adding component this.props.referral = "+ this.props.referral);
        console.tron.log("current language="+this.state.language);

        if(_.isEmpty(this.props.referral))
            return (
                <AddFriendComponent menu = { this.menuChange }  language={this.state.language} />
            );
        
    return (
            <FriendsOverViewComponent menu = {this.menuChange}  language={this.state.language} />
        );            
    }


    render() {

        // console.log("test page this.props.referral="+typeof(this.props.referral));
        // console.tron.log("this.props.referral="+this.props.referral);
        console.log("TP render method language="+this.state.language);
        return(
                <View style={newStyle.container}>

                    <View style={newStyle.topHeader}> 
                        <View style={newStyle.headerImage}>
                                <Image source={logoNew} resizeMode="stretch" style={{ width: viewPortWidth, height: viewPortHeight * .36,}} />
                        </View>
                    </View>

                    {/* (this.state.selectionFirst === true)?newStyle.leftButtonSelected: */}

                    <View style={ newStyle.bottomLayout }>                    
                    <View style={ newStyle.leftButtons}>
                            <View
                                style={ (this.state.selectionFirst === true)?newStyle.leftButtonSelected: newStyle.leftButton}
                                onPress = { (selectionFirst) => {
                                    this.setState({ selectionFirst: !this.state.selectionFirst, selectionSecond: false, selectionThird: false, selectionFourth: false, menu: 1, });
                                    }}>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={newStyle.iconStyle}
                                        onPress = { (selectionFirst) => {
                                                        this.setState({ selectionFirst: !this.state.selectionFirst, selectionSecond: false, selectionThird: false, selectionFourth: false, menu: 1, });
                                                }
                                            }>
                                        <Icon
                                            containerStyle={newStyle.iconImageStyle}
                                            name='user'
                                            type='font-awesome'
                                            color='#E73D50'
                                            size = {20}
                                            onPress={(selectionFirst) => {this.setState({ selectionFirst: !this.state.selectionFirst, selectionSecond: false, selectionThird: false, selectionFourth: false, menu: 1, });}} /> 
                                    </TouchableOpacity>
                            </View>             
                            <View
                                style={ (this.state.selectionSecond === true)?newStyle.leftButtonSelected: newStyle.leftButton}
                                onPress = { (selectionSecond) => {this.setState({ selectionFirst: false, selectionSecond: !this.state.selectionSecond, selectionThird: false, selectionFourth: false, menu: 2, });}}>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={newStyle.iconStyle}
                                        onPress = { (selectionSecond) => {this.setState({ selectionFirst: false, selectionSecond: !this.state.selectionSecond, selectionThird: false, selectionFourth: false, menu: 2, });} }>
                                        <Icon
                                            containerStyle={newStyle.iconImageStyle}
                                            name='users'
                                            type='font-awesome'
                                            color='#E73D50'
                                            size = {20}
                                            onPress={(selectionSecond) => {this.setState({ selectionFirst: false, selectionSecond: !this.state.selectionSecond, selectionThird: false, selectionFourth: false, menu: 2, });}} /> 
                                    </TouchableOpacity>
                            </View>             
                            <View
                                style={ (this.state.selectionThird === true)?newStyle.leftButtonSelected: newStyle.leftButton}
                                onPress = { (selectionThird) => {this.setState({ selectionFirst: false, selectionSecond: false, selectionThird: !this.state.selectionThird, selectionFourth: false, menu: 3,  });}}>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={newStyle.iconStyle}
                                        onPress = { (selectionThird) => {this.setState({ selectionFirst: false, selectionSecond: false, selectionThird: !this.state.selectionThird, selectionFourth: false, menu: 3, });} }>
                                        <Icon
                                            containerStyle={newStyle.iconImageStyle}
                                            name='euro'
                                            type='font-awesome'
                                            color='#E73D50'
                                            size = {20}
                                            onPress={(selectionThird) => {this.setState({ selectionFirst: false, selectionSecond: false, selectionThird: !this.state.selectionThird, selectionFourth: false, menu: 3, });}} /> 
                                    </TouchableOpacity>
                            </View>             
                            <View
                                style={ (this.state.selectionFourth === true)?newStyle.leftButtonSelected: newStyle.leftButton}
                                onPress = { (selectionFourth) => {this.setState({ selectionFirst: false, selectionSecond: false, selectionThird: false, selectionFourth: !this.state.selectionFourth, menu: 4,  });}}>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={newStyle.iconStyle}
                                        onPress = { (selectionFourth) => {this.setState({ selectionFirst: false, selectionSecond: false, selectionThird: false, selectionFourth: !this.state.selectionFourth, menu: 4,  });}}>
                                        <Icon
                                            containerStyle={newStyle.iconImageStyle}
                                            name='info-circle'
                                            type='font-awesome'
                                            color='#E73D50'
                                            size = {20}
                                            onPress={(selectionFourth) => {this.setState({ selectionFirst: false, selectionSecond: false, selectionThird: false, selectionFourth: !this.state.selectionFourth,  menu: 4, });}} /> 
                                    </TouchableOpacity>
                            </View>             
                    </View>

                    {/* <PushNotif /> */}

                    <View style={newStyle.pageElement}>
                            {
                                    this.state.menu === 0?
                                            <WelcomeComponent menu = {this.menuChange} language={this.props.navigation.state.params.language}/>:
                                    this.state.menu === 1?
                                            <ProfileComponent menu = {this.menuChange} language={this.state.language} />:
                                    this.state.menu === 2?
                                            this.addComponent():
                                    this.state.menu === 3?
                                            <MoneyComponent language={this.state.language} month={this.state.currentMonth} year={this.state.currentYear} />:
                                    this.state.menu === 4?
                                            <InformationComponent menu = {this.menuChange} language={this.state.language} />:
                                    this.state.menu === 5?
                                            <ProfileBankInfoComponent menu = {this.menuChange}  language={this.state.language} />:
                                    this.state.menu === 6?
                                            <ProfileChangePasswordComponent menu = {this.menuChange}  language={this.state.language} />:
                                    this.state.menu === 7?
                                            <ProfileDetailsComponent
                                                menu  = {this.menuChange} 
                                                name  = {this.state.nameParam} 
                                                phone = {this.state.phoneParam} 
                                                email = {this.state.emailParam} 
                                                language = {this.state.language}
                                        />:
                                    this.state.menu === 8 && this.props.referral !== null?
                                            <FriendsOverViewComponent menu= {this.menuChange} language={this.state.language} />:
                                    this.state.menu === 9?
                                            <FriendsLastComponent menu = {this.menuChangeWithParameters}  language={this.state.language} />:
                                    this.state.menu === 10?
                                            <LanguageComponent menu = {this.menuChange}  language={this.state.language} />:
                                    this.state.menu === 11?
                                            <PushToEarnOTPComponent menu = {this.menuChange}  language={this.state.language} />:
                                    this.state.menu === 12?
                                            this.changeScreen()
                                            :
                                    this.state.menu === 13?
                                            <AddFriendComponent menu = {this.menuChange }  language={this.state.language} />
                                            :
                                            this.doNothing()
                                
                            }
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
            alignItems: 'flex-start',

},

topHeader: {

            flex: 3,
            backgroundColor: 'transparent',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'

},

bottomLayout: {

            flex: 6,
            width: viewPortWidth,
            height: viewPortHeight * .34,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'

},

iconStyle: {

    width: 54,
    height: viewPortHeight * .14,
    borderRadius: 0,
    backgroundColor: 'transparent',
    marginTop: viewPortHeight / 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,

},

leftButton: {

    width: 54,
    height: viewPortHeight * .34,
    backgroundColor: 'white',
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
    flex: 1,

  },

leftButtons: {

    width: Platform.OS==='ios'?54:57,
    height: Platform.OS==='ios'?viewPortHeight * .67:viewPortHeight*0.69,
    backgroundColor: 'rgb(246, 246, 246)',
    elevation: Platform.OS ==='ios'?1:1,
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
    flex: 1,

  },

  leftButtonSelected: {

    width: 54,
    height: viewPortHeight * .34,
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
    flex: 1,

  },

  iconImageStyle:{

    backgroundColor: 'black',
    width: 54,
    height: viewPortHeight * .14,
    justifyContent: 'center',
    alignItems: 'center'

  },
   
  pageElement: {
        
        backgroundColor: 'transparent',
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center'

    }

});

const mapStateToProps = state => {
    return {
        referral: FriendSelectors.getReferral(state),
        LastViewedNotificationID: LoginSelectors.getLastViewedNotificationID(state),
        mobileNotifications: LoginSelectors.getMobileNotifications(state)

    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      navigateBack: () => this.props.navigation.goBack(),
      friendRequest: (payload) => dispatch({type: 'GET_FRIEND_REQUEST',payload}),
      notificationRequest: (payload) => dispatch({ type: 'NOTIFICATION_REQUEST', payload}),
      getProfile:(payload) => dispatch({ type: 'GET_PROFILE_REQUEST_NEW', payload }),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(TestPage);