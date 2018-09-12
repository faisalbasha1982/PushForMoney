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

import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';
import localStorage from 'react-native-sync-localstorage';
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
                         height: 15,
                         fontSize: 15,
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

componentWillReceiveProps(newProps)
{
  if(this.props.monthlyEarningDetailsByReferrals === null)
      this.createListArray();
}

componentDidMount()
{    
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
         <View style= {{ flex: 1,flexDirection: 'column',backgroundColor: 'transparent', marginTop: 25, justifyContent: 'flex-start', alignItems:'flex-start', }}>

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

              <AccordionList
                list={this.state.list}
                header={this._head}
                body={this._body}
            />

            {/* <View style={newStyle.borderBottomNew}></View>
            <View style={{flex:1, flexDirection:'column', }}>
                    <View style={newStyle.totalText}>
                            <Text style={newStyle.firstName}>Total worked hours</Text>
                            <Text style={newStyle.fontStyle}>{this.props.TotalWorkedHours}</Text>
                    </View>
                    <View style={newStyle.totalText}>
                            <Text style={newStyle.firstName}>Total Earned</Text>
                            <Text style={newStyle.fontStyle}>€ {this.props.TotalEarnings}</Text>
                    </View>
            </View> */}
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    fontFamily: "WorkSans-Regular",
    fontSize: 13,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.54,
    color: "rgb(53, 53, 53)"
  },

  borderBottomNew: {
    width: 310,
    height: 1,
    borderBottomColor: "rgb(231, 61, 80)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex:2,
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