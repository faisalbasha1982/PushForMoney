import {AccordionList} from "accordion-collapse-react-native";
import React, { Component } from 'react';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getMoneyMonth } from "../Sagas/MoneySagas";
import { connect } from "react-redux";
import _ from 'lodash';
import {
    ScrollView,
    Text,
    Image,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput,
    PixelRatio,
    Alert,
    Platform,    
    findNodeHandle,
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
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";
import AccordionListComponent from './AccordionListComponent';

import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';
import localStorage from 'react-native-sync-localstorage';
import { MoneySelectors } from "../Redux/MoneyRedux";

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth  = Dimensions.get('window').width;

class CollapsibleView extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
    list:[
        {
          title: '14.03.2018 - 14.04.2018',
          body: 'Correction -- Ann Contract - 1 ',
          time: 'Time 6:00',
          newTime: 'New Time 8:00',
        },
        {
          title: '14.03.2018 - 14.04.2018',
          body: 'Correction -- Ann Contract - 1 ',
          time: 'Time 6:00',
          newTime: 'New Time 8:00',
        },
        {
          title: '14.03.2018 - 14.04.2018',
          body: 'Correction -- Ann Contract - 1 ',
          time: 'Time 6:00',
          newTime: 'New Time 8:00',
        }
        ],
    menu:1,
  }

}

_head(item){
    return(
        <View style={ newStyle.borderBottom}>
          <Text style={{ color: '#000',  
                        fontFamily: "WorkSans-Medium",
                         fontSize: 14 }}>
            {item.title}
          </Text>
         
          <TouchableOpacity onPress={ ( ) => {} }
                                    activeOpacity={0.5}
                                    style={newStyle.iconStyle}>
            <Icon
              containerStyle={newStyle.iconImageStyle}
              name='exclamation-triangle'
              type='font-awesome'
              color='#E73D50'
              size = {15}
              onPress={() => console.log('hello')} /> 

          </TouchableOpacity>
        </View>
    );
}

_body(item){
    return (
        <View style={{padding:5}}>
          <Text style={ newStyle.fontStyle }>{item.body}</Text>
          <Text style={newStyle.fontStyle}>{item.time}</Text>
          <Text style={newStyle.fontStyle}>{item.newTime}</Text>
        </View>
    );
}

renderList = (personObj) => {  

  return (

    <TouchableOpacity
          onPress={ ( ) => { 
            this.getMoney(personObj.MobileReferralID);
            this.setState({menu: 2});
          }}
          activeOpacity={0.5}
          style={ newStyle.buttonStyle }>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
          <Text style={newStyle.statusStyle}>{ personObj.ReferredPersonName }</Text>
          {(personObj.PaidStatus === "0")?<Text style={newStyle.statusStyle}>Pending</Text>
          :<Text style={newStyle.statusStyle}> Paid </Text>}
          <Text style={newStyle.fontStyle}>€{ personObj.Amount }</Text>
        </View>

        <View style={newStyle.borderBottom}></View>

    </TouchableOpacity>

    /* <View style={{ flexDirection: 'column', justifyContent:'center', alignItems:'flex-start'}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <Text style={newStyle.statusStyle}>{ personObj.ReferredPersonName }</Text>
        {(personObj.PaidStatus === "0")?<Text style={newStyle.statusStyle}>Pending</Text>
        :<Text style={newStyle.statusStyle}> Paid </Text>}
        <Text style={newStyle.fontStyle}>€{ personObj.Amount }</Text>
    </View>
    <View style={newStyle.borderBottom}></View>
    </View> */

  );

}

getMoney = (MobileReferralID) => {

  let authData = AuthComponent.authenticationData("en");
  let encryptedData = AesComponent.aesCallback(authData);
  let ltoken = localStorage.getItem('token');
  this.setState({isLoading: true});

  let payload = {
    "AuthenticationData": encryptedData,
    "LoginAccessToken": ltoken,
    "ReferralId": MobileReferralID,
    "Month" : this.props.month,
    "Year" : this.props.year,
  };

  this.props.getMoney(payload);
}

somethingElse = () => {

}

componentWillReceiveProps(newProps)
{
  if(this.props.monthlyEarningDetailsByReferrals === null)
      this.getMoney();     
}

componentDidMount()
{
  this.getMoney();
}

renderNothing = () => {

}

render() {

    // console.log("referrals="+this.props.navigation.state.params.referrals);
    let referralsNew = this.props.referrals;
    console.log("referralsNew="+referralsNew);

  //   let referralsNew =  [
  //     {
  //         "MobileReferralID": 1,
  //         "ReferredPersonName": "Balaji",
  //         "PaidStatus": "0",
  //         "TimeWorked": "18:0",
  //         "Amount": "9.00"
  //     },
  //     {
  //         "MobileReferralID": 1,
  //         "ReferredPersonName": "Balaji",
  //         "PaidStatus": "0",
  //         "TimeWorked": "9:0",
  //         "Amount": "4.50"
  //     }
  // ];

    return (
          <View style= {{ height: viewPortHeight*0.50, flex: 1,flexDirection: 'column',backgroundColor: 'powderblue', marginTop: 0, justifyContent: 'center', alignItems:'center'   }}>

                  {
                      this.state.isLoading===true?
                      <View style = {{position: 'absolute' , zIndex:3999, left: 150, top: 0, right: 0, bottom: 0}}>
                      <BallIndicator color='#e73d50' />
                      </View>:this.somethingElse()
                  }      

                  {/* <View style={{flex:1, height: viewPortHeight, flexDirection: 'column', backgroundColor: 'steelblue'}}> */}
                          {
                            (this.state.menu===1)?
                            referralsNew !== null && referralsNew.map(
                              personObj => 
                                  this.renderList(personObj))
                            :
                            (this.state.menu===2)?
                            <AccordionListComponent monthlyEarningDetailsByReferrals={this.props.monthlyEarningDetailsByReferrals} />
                            :
                            this.renderNothing()
                          }
                  {/* </View> */}
          </View>
    );
}

}

const newStyle = StyleSheet.create({

  nameStyle: {
    padding: 5,
    margin: 5,
    width: 111,
    height: 50,
    fontFamily: "WorkSans-Regular",
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.46,
    color: "rgb(53, 53, 53)"
},

statusStyle: {
    width: 120,
    height: 30,
    paddingLeft: 5,
    marginTop: 8,
    fontFamily: "WorkSans-Regular",
    fontSize: 11,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.39,
    color: "rgb(155, 155, 155)"
},

buttonStyle: {

  width: viewPortWidth*0.75,
  height: 30,
  borderBottomColor: "#333",
  borderBottomWidth: StyleSheet.hairlineWidth,
  backgroundColor: 'powderblue',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginBottom: 10,
  flexDirection: 'column'

},

borderBottom: {
  width: viewPortWidth*0.75,
  height: 30,
  borderBottomColor: "#333",
  borderBottomWidth: StyleSheet.hairlineWidth,
  backgroundColor: 'transparent',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginBottom: 10,
  flexDirection: 'row'
},

fontStyle: {
  fontFamily: "WorkSans-Medium",
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0.67,
  textAlign: 'left',
  color: "rgb(231, 61, 80)",
},

iconImageStyle:{
  width: 13,
  height: 16,
  fontFamily: "FontAwesome",
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0.67,
  textAlign: 'right',
  color: "rgb(231, 61, 80)", 
},

iconStyle: {
  width: 30,
  height: 30,
  borderRadius: 0,
  backgroundColor: 'transparent',
  // marginTop: viewPortHeight / 80,
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginLeft: 10,
},

// borderBottom: {
//   width: 280,
//   height: 1,
//   borderBottomColor: "rgb(231, 61, 80)",
//   borderBottomWidth: StyleSheet.hairlineWidth,
//   marginBottom: 20,
// },

});

const mapStateToProps = state => {
  return {

    TotalWorkedHours: MoneySelectors.getTotalWorkedHours(state),
    TotalEarnings: MoneySelectors.getTotalEarnings(state),
    monthlyEarningDetailsByReferrals: MoneySelectors.getMonthlyReferrals(state),
    ReferredPersonName: MoneySelectors.getReferredPersonName(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {  
    resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
    navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
    navigateBack: () => this.props.navigation.goBack(),
    getMoney: (payload) => dispatch({ type: 'GET_MONEY_MONTH', payload})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleView);