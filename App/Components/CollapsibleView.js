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
    AsyncStorage,
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
import AccordionNewListComponent from './AccordionNewListComponent';
import AccordionListCollapsible from './AccordionListCollapsible';

import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';
import localStorage from 'react-native-sync-localstorage';
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';
import LanguageSettings from '../Containers/LanguageSettingsNew';

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
    currentPersonName:'',
    showAccordionComponent: true,
    language:'',
    languageCode:'',
    text:{},
    token:'',
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

  console.tron.log("inside renderList personObj="+personObj);
  console.tron.log("PersonObj.ReferredPersonName="+personObj.ReferredPersonName);
  console.tron.log('PersonObj.PaidStatus='+personObj.PaidStatus);
  console.tron.log('personObj.amount='+personObj.Amount);

  if(this.props.referrals !== null)
      this.props.isLoading();

  return (

    <TouchableOpacity
          onPress={ ( ) => {
            this.getMoney(personObj.MobileReferralID);
            this.setState({menu: 2,showAccordionComponent:true,});
            this.setState({currentPersonName: personObj.ReferredPersonName, showAccordionComponent: true});
            this.props.back(personObj.ReferredPersonName,2);
            this.props.totalText();
            this.props.calenderToggle();
          }}
          activeOpacity={0.5}
          style={ newStyle.buttonStyle }>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent'}}>
              <Text style={newStyle.nameStyle}>{ personObj.ReferredPersonName }</Text>
              {(personObj.PaidStatus === "0")?<Text style={newStyle.statusStylePending}>{this.state.text.pending}</Text>
              :
               (personObj.PaidStatus === "2")?
               <Text style={newStyle.statusStyle}> {this.state.text.partial} </Text>
               :
              <Text style={newStyle.statusStyle}> {this.state.text.payed} </Text>}
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

  console.tron.log("MobileRefferalID is="+MobileReferralID);
  
  let authData = AuthComponent.authenticationData(this.state.languageCode);
  let encryptedData = AesComponent.aesCallback(authData);
  this.setState({isLoading: true});

  let payload = {
    "AuthenticationData": encryptedData,
    "LoginAccessToken": this.state.token,
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
  // if(this.props.monthlyEarningDetailsByReferrals === null)
  //     this.getMoney();

      console.log("componentWillReceiveProps of CollapsibleView");

      if(this.props.changeMenuOneBack === true)
      {
        this.setState({ menu: 1});
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

componentDidMount()
{

  //this.getMoney();

  console.log("componentDiDMount of CollapsibleView");

  let lang = localStorage.getItem('language');
  console.log('local storage language='+lang);

  this.getAsyncStorageToken();

  if(this.props.changeMenuOneBack === true)
  {
    this.setState({ menu: 1});
  }

  this.props.isLoading();
  
}

renderNothing = () => {
  return(

      <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{  fontFamily: 'WorkSans-Regular',
                          fontSize: 25,
                          fontWeight: '500',
                          fontStyle: 'normal',
                          letterSpacing: 0.67,
                          textAlign: 'right',
                          color: 'rgb(231, 61, 80)'
          }}>
              NO RECORDS TO SHOW!!!!
          </Text>
      </View>

  );
}
changeMenu = (cMenu) => {
  this.setState({ menu: cMenu});
} 

backMenu = (cMenu) => {
  this.setState({ menu: cMenu});
}

toggleCalendar = () => {

} 

render() {

    // console.log("referrals="+this.props.navigation.state.params.referrals);
    let referralsNew = this.props.referrals;
    console.log("referralNew="+referralsNew);
    console.log("collapsible view show accordionLIST="+this.props.accordionList);
    console.log("collapsible view props.menu in collapsible view ="+this.props.menu);
    console.log("collapsible view this.props.childMenu="+this.props.childMenu);
    console.log("collapsible view state.menu in collapsible view ="+this.state.menu);

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

        <ScrollView>
          <View style={{ flex:1, backgroundColor: 'transparent', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', overflow: "hidden" }}>

             {/* {
                this.props.fetching===true?
                <View style = {{position: 'absolute' , zIndex:3999, left: 20, top: 0, right: 0, bottom: 0}}>
                <BallIndicator color='#e73d50' />
                </View>:this.somethingElse()
              } */}
                   {
                    (this.props.menu===1 && this.props.childMenu === true)?
                    referralsNew !== null && referralsNew.map(
                      personObj => 
                          this.renderList(personObj))
                    :
                    (this.props.menu === 2)?
                    // <AccordionNewListComponent />
                    // <AccordionListCollapsible />
                    <AccordionListComponent
                        name={this.state.currentPersonName}
                        back={this.backMenu}
                        menu={this.changeMenu}              
                        // monthlyEarningDetailsByReferrals={this.props.monthlyEarningDetailsByReferrals}
                        // TotalEarnings = {this.props.TotalEarnings}
                        // TotalWorkedHours = { this.props.TotalWorkedHours}
                    />
                    :
                    this.renderNothing()
                  }
          </View>
          </ScrollView>

                  // {
                  //     this.state.isLoading===true?
                  //     <View style = {{position: 'absolute' , zIndex:3999, left: 150, top: 0, right: 0, bottom: 0}}>
                  //     <BallIndicator color='#e73d50' />
                  //     </View>:this.somethingElse()
                  // }      

 
    );
}

}

const newStyle = StyleSheet.create({

  nameStyle: {
    padding: 5,
    margin: 5,
    width: viewPortWidth*0.45,
    height: 25,
    fontFamily: "WorkSans-Bold",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.46,
    color: "rgb(53, 53, 53)",
    textAlign: "left",
    backgroundColor:'transparent',
    alignItems:'center',
    fontFamily: "WorkSans-Regular",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.39,
    //color: "rgb(155, 155, 155)",
    paddingLeft:0,

},

statusStyle: {
    paddingLeft: 5,
    marginTop: 28,
    width: 80,
    height: 15,
    flex:1,
    fontFamily: "WorkSans-Regular",
    fontSize: 11,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.39,
    color: "rgb(155, 155, 155)",
    backgroundColor: 'transparent',
    textAlign:'right',
    alignItems:'flex-end'
},

statusStylePending: {
  paddingLeft: 0,
  marginTop: 28,
  width: 250,
  height: 15,
  flex:8,
  fontFamily: "WorkSans-Regular",
  fontSize: 11,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0.39,
  color: "rgb(155, 155, 155)",
  backgroundColor:'transparent',
  textAlign:'right',
  alignItems:'flex-start'
},

buttonStyle: {

  width: viewPortWidth*0.83,
  height: 40,
  // borderBottomColor: "#333",
  // borderBottomWidth: StyleSheet.hairlineWidth,
  backgroundColor: 'transparent',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginBottom: 10,
  flexDirection: 'column'

},

borderBottom: {
  width: 310,
  height: 1,
  borderBottomColor: "rgb(231, 61, 80)",
  borderBottomWidth: StyleSheet.hairlineWidth,
  backgroundColor: 'rgb(231, 61, 80)',
  flex:1,
},

totalText: {
  width: 310,
  height: 20,
  // fontFamily: "WorkSans-Regular",
  // fontSize: 16,
  // fontWeight: "500",
  // fontStyle: "normal",
  // letterSpacing: 0.67,
  // textAlign: "left",
  flex: 8,
  marginTop: 20,
  marginBottom: 20,
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'flex-start',
},

fontStyle: {
  fontFamily: "WorkSans-Medium",
  fontSize: 11,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0.67,
  textAlign: 'right',
  color: "rgb(231, 61, 80)",
  marginLeft: 15,
  marginTop:28,
  backgroundColor:'transparent'
},

layoutBelow: {
  flex: 4,
  flexDirection: 'row',
  backgroundColor: 'transparent'
},

endButtons: {
  width: viewPortWidth * 0.77,
  height: viewPortHeight * 0.70,
  zIndex: 999,
  flex: Platform.OS === 'ios'?11:4,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',       
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
    fetching: MoneySelectors.getFetching(state),
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