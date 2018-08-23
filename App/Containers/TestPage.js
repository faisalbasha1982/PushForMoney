import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image
} from 'react-native';

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
import { FriendSelectors } from '../Redux/FriendRedux';
import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';

import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';
import localStorage from 'react-native-sync-localstorage';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth  = Dimensions.get('window').width;

let authData = AuthComponent.authenticationData("en");
let encryptedData = AesComponent.aesCallback(authData);
let ltoken = localStorage.getItem('token');

class TestPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectionFirst: false,
            selectionSecond: false,
            selectionThird: false,
            selectionFourth: false,
            menu: 0,
        };
    }

    menuChange = (mChange) =>{

        this.setState({ menu: mChange});

    }

    doNothing = () => {
        
    }

    componentWillReceiveProps(nextProps) {

        //console.log("in Form One screen language received="+nextProps.language);
        // if (this.props.navigation.state.params.language !== nextProps.language) {
        //     this.setState({ language: nextProps.language });
        //     this.setText();
        // }

        // console.log("this.props.referral="+this.props.refferal);
        // if(this.props.referral === null)
        //     this.getFriendList();

        // if(this.props.referral !== nextProps.referral)
        // {
        //     console.log("this.props.referral="+this.props.referral);
        //     console.tron.log("this.props.referral="+this.props.referral);
    
        //     if(this.props.referral !== null)
        //      {
        //          this.setState({ menu: 8 });
        //          console.log("menu="+this.state.menu);
        //      }
        //      else
        //     {
        //         this.setState({ menu: 2});
        //         console.log("menu="+this.state.menu);
        //     }
        // }
        // else
        // {
        //     this.setState({ menu: 2});
        //     console.log("menu="+this.state.menu);
        // }
    }

    componentDidMount() {

        //call all the api's relevant with inner screens
        //console.log("this.props.referral="+this.props.referral);
        //console.tron.log("this.props.referral="+this.props.referral);
        this.getFriendList();

    }

    getFriendList = () => {

        console.log("INSIDE FRIEND LIST API CALL");

        this.setState({isLoading: true,});
        let ltoken = localStorage.getItem('token');       

        console.log("token from getFriendList ="+ltoken);
      
        if(ltoken !== null || ltoken !== undefined)
        {
            let payload = {
                "AuthenticationData": encryptedData,
                "LoginAccessToken": ltoken,
            };    

            this.props.friendRequest(payload); 

        }
        else
        {
            ltoken = localStorage.getItem('token');       
        }
        


        console.log("this.props.referral="+this.props.referral);
        console.tron.log("this.props.referral="+this.props.referral);

    }

    render() {

        const { navigate } = this.props.navigation;

        return(
                <View style={newStyle.container}>

                    <View style={newStyle.topHeader}> 
                        <View style={newStyle.headerImage}>
                                <Image source={logoNew} resizeMode="contain" style={{ width: viewPortWidth, height: viewPortHeight * .36,}} />
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

                    <View style={newStyle.pageElement}>
                            {
                               this.state.menu === 0?
                                    <WelcomeComponent />:
                               this.state.menu === 1?
                                    <ProfileComponent menu = {this.menuChange} />:
                               this.state.menu === 2?
                                (this.props.referral === null || this.props.referral === undefined)?
                                    <AddFriendComponent />:
                                    <FriendsOverViewComponent />:
                               this.state.menu === 3?
                                    <MoneyComponent />:
                               this.state.menu === 4?
                                    <InformationComponent />:
                               this.state.menu === 5?
                                    <ProfileBankInfoComponent menu = {this.menuChange} />:
                               this.state.menu === 6?
                                    <ProfileChangePasswordComponent menu = {this.menuChange} />:
                               this.state.menu === 7?
                                    <ProfileDetailsComponent />:
                               this.state.menu === 8?
                                    <FriendsOverViewComponent />:
                               this.state.menu === 9?
                                    <FriendsLastComponent />:
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
            backgroundColor: 'powderblue',
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

    width: 54,
    height: viewPortHeight * .67,
    backgroundColor: 'rgb(246, 246, 246)',
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
        referral: FriendSelectors.getReferral(state)
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      navigateBack: () => this.props.navigation.goBack(),
      friendRequest: (payload) => dispatch({type: 'GET_FRIEND_REQUEST',payload}),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(TestPage);