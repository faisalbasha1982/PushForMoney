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
    AsyncStorage
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

import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';
import localStorage from 'react-native-sync-localstorage';
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';
import { MoneySelectors } from "../Redux/MoneyRedux";

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth  = Dimensions.get('window').width;

class AccordionListComponent extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
    list:[],
    text:{},
    fetching: true,
    language:'',
    token:''
  }

}

_head(item){
    // console.log("title="+item.title);
    // console.log("item.workedHours="+item.workedHours);
    return(
        <View style={ newStyle.borderBottom}>
          <Text style={{ 
                         fontFamily: "WorkSans-Medium",
                         width: 220,
                         height: 22,
                         fontSize: 16,
                         fontWeight: "normal",
                         fontStyle: "normal",
                         letterSpacing: 0.54,
                         color: "rgb(53, 53, 53)"             
                        }}>
            {item.title}
          </Text>
         {

         (item.body !== undefined)? 
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
         :
         <TouchableOpacity onPress={ ( ) => {} }
         activeOpacity={0.5}
         style={newStyle.iconStyle}> 
        </TouchableOpacity>

         }

          <Text style={{ color: '#000',  
                        fontFamily: "WorkSans-Medium",
                         fontSize: 14 }}>
            {item.workedHours}
          </Text>

        </View>
    );
}

renderNothing = () => {

}

_body(item){

    return (
        (item.body !== undefined)?
        <View style={{padding:5}}>
          <Text style={ newStyle.fontStyle }>{item.body}</Text>
          <Text style={newStyle.fontStyle}>{item.time}</Text>
          <Text style={newStyle.fontStyle}>{item.newTime}</Text>
        </View>
        :
        <View
        ></View>
    );
}

somethingElse = () => {

}

componentWillReceiveProps(nextProps)
{
    if(this.props !== nextProps)
        this.getAsyncStorageToken();

    if(this.props.monthlyEarningDetailsByReferrals === null)
        this.createListArray();
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
    let language = localStorage.getItem('language');
    console.log('local storage language='+language);

   this.getAsyncStorageToken();

    setTimeout(() => {
            this.createListArray();
        },4000);
}

createListArray = () => {

    // "monthlyEarningDetailsByReferralsByContracts": {
    //     "Time": "9:0",
    //     "EarnedAmount": 4.5,
    //     "Correction": "-0:30",
    //     "CorrectionEarnedAmount": -0.5,
    //     "NewTime": "8:30",
    //     "NewEarnedAmount": 4
    // }

    this.setState({ fetching:false });
    console.log("inside accordion list component");

    let list = [];
    let counter = 0;

    console.log("monthlyEarningDetailsByReferrals="+this.props.monthlyEarningDetailsByReferrals);

    if(this.props.monthlyEarningDetailsByReferrals !== null)
     {
        this.props.monthlyEarningDetailsByReferrals.map( personObject => {

            if(personObject.monthlyEarningDetailsByReferralsByContracts !== null)
                list[counter] = {
                        "title": personObject.StartDate.split("T")[0] + " -  "+ personObject.EndDate.split("T")[0],
                        "body" :  "Correction - Adjustment Contract",
                        "time" : "Time: "+ personObject.monthlyEarningDetailsByReferralsByContracts.Time,
                        "newTime" : "New Time: " + personObject.monthlyEarningDetailsByReferralsByContracts.NewTime,
                        "workedHours": personObject.WorkedHours
                };
            else
                list[counter] = {
                "title": personObject.StartDate.split("T")[0] + "  -  "+ personObject.EndDate.split("T")[0],
                "workedHours": personObject.WorkedHours
            }        
            counter = counter + 1;
        });

        console.log("list="+list);

        if(list !== null)
        {
           this.setState({list: list});
        }   
     }     

}

render() {

    // console.log("referrals="+this.props.navigation.state.params.referrals);
    // let referralsNew = this.props.referrals;
    // console.log("referralsNew="+referralsNew);

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
  console.log("inside accordion list component");
    return (
        <ScrollView>
         <View style= {{ height: viewPortHeight*0.55,flex: 1,flexDirection: 'column',backgroundColor: 'transparent', marginTop: 15, justifyContent: 'flex-start', alignItems:'flex-start', }}>

            {/* <View style = {newStyle.nameAndback}>
                <Text style={{
                    fontFamily: "WorkSans-Regular",
                    fontSize: 13,
                    fontWeight: "500",
                    fontStyle: "normal",
                    letterSpacing: 0.54,
                    textAlign: "left",
                    color: "rgb(231, 61, 80)"
                }}>{ this.props.name} </Text>

                 <TouchableOpacity onPress={ ( ) => { this.props.menu(1); } }
                                                    activeOpacity={0.5}
                                                    style={newStyle.backButton}>
                                                    <Icon
                                                        containerStyle={newStyle.iconImageStyle}
                                                        name='angle-left'
                                                        type='font-awesome'
                                                        color='rgb(155, 155, 155)'
                                                        size = {18} /> 
                                                    <Text style= {{
                                                        width: 185,
                                                        height: 15,
                                                        marginLeft:10,
                                                        fontFamily: "WorkSans-Medium",
                                                        fontSize: 13,
                                                        fontWeight: "500",
                                                        fontStyle: "normal",
                                                        letterSpacing: 0.54,
                                                        textAlign: "left",
                                                        color: "rgb(231, 61, 80)",
                                                        backgroundColor: 'transparent'
                                                    }}>           
                                                        Back To Overview
                                                    </Text>
                                                </TouchableOpacity>
            </View> */}

                 {/* {
                    this.state.fetching===true?
                    <View style = {{position: 'absolute' , zIndex:3999, left: 20, top: 0, right: 0, bottom: 0}}>
                    <BallIndicator color='#e73d50' />
                    </View>:this.somethingElse()
                }       */}

              <AccordionList
                list={this.state.list}
                header={this._head}
                body={this._body}
            />

            <View style={{ justifyContent:'flex-end',alignItems:'flex-end',flex:8, marginTop:10, backgroundColor:'transparent' }}>
                    {/* <View style={newStyle.totalText}>
                                <Text style={newStyle.firstName}>{this.state.text.TotalNext}</Text>
                                <Text style={newStyle.earningsText}>€{this.props.TotalEarnings}</Text>
                    </View> */}
                    <View style={newStyle.totalLineDisplay}>
                        <View style={{flex: 4,}}></View>
                        <View style={newStyle.borderBottomNew}></View>
                        <View style={newStyle.totalHoursText}>
                                        <Text style={newStyle.firstNameTotalHours}>{this.state.text.Total}</Text>
                                        <Text style={newStyle.hoursText}>{this.props.TotalWorkedHours}</Text>
                        </View>
                    </View>
            </View>
          </View>
        </ScrollView>
 
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
  width: viewPortWidth*0.83,
  height: 30,
  borderBottomColor: "#333",
  borderBottomWidth: StyleSheet.hairlineWidth,
  backgroundColor: 'transparent',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginBottom: 10,
  flexDirection: 'column'
},

nameAndback: {
    width: viewPortWidth,
    height: viewPortHeight * 0.03,
    position: 'absolute',
    top:-25,
    left:0,
    right:0,
    bottom:0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor:'transparent',
},

backButton: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    marginLeft:20,
    backgroundColor: 'transparent'
},

borderBottom: {
  width: viewPortWidth*0.83,
  height: 30,
  borderBottomColor: "#333",
  borderBottomWidth: StyleSheet.hairlineWidth,
  backgroundColor: 'transparent',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginBottom: 10,
  flexDirection: 'row'
},

earningsText: {
    fontFamily: "WorkSans-Medium",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.67,
    marginLeft:15,
    textAlign: 'right',
    color: "rgb(231, 61, 80)",
    backgroundColor: 'transparent'
  },

  firstName: {
    width: 180,
    height: 19,
    fontFamily: 'WorkSans-Regular',
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.67,
    textAlign: 'right',        
    marginBottom: 0,
    backgroundColor:'transparent',
    marginLeft:28,
},

  firstNameTotalHours:{
    width: 180,
    height: 19,
    fontFamily: 'WorkSans-Regular',
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.67,
    textAlign: 'right',
    marginBottom: 15,
    marginLeft:25
},

totalText: {
    width: viewPortWidth*0.80,
    height: 20,
    flex: 12,
    marginTop: 0,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor:'transparent'
},

totalLineDisplay: {
    justifyContent: 'flex-end',
    flexDirection:'column',
    alignItems: 'flex-end',
    flex: 5,
    backgroundColor:'transparent'
},

totalHoursText:{
    width: viewPortWidth*0.82,
    height: 5,
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
    marginLeft:0,
    marginRight:0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
},

hoursText:{
    width: 80,
    height: 22,
    fontFamily: 'WorkSans-Regular',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.67,
    textAlign: 'center',
    color: "rgb(231, 61, 80)",
    marginBottom: 12,
    backgroundColor: 'transparent'
},

borderBottomNew: {
    width: 310,
    height: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: 'rgb(231, 61, 80)',
    borderBottomColor: "rgb(231, 61, 80)",
    marginBottom:5,
    marginTop:5,
},

//   borderBottomNew: {
//     width: 310,
//     height: 1,
//     borderBottomColor: "rgb(231, 61, 80)",
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     flex:2,
// },

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
  width: 15,
  height: 16,
  fontFamily: "FontAwesome",
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0.67,
  textAlign: 'right',
  color: "rgb(231, 61, 80)", 
  marginRight:10,
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

  };
};

const mapDispatchToProps = dispatch => {
  return {  
    resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
    navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
    navigateBack: () => this.props.navigation.goBack(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccordionListComponent);