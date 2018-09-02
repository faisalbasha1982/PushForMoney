import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Dimensions, StyleSheet,View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const viewPortWidth = Dimensions.get('window').width;
const viewPortHeight = Dimensions.get('window').height;

export default class TotalComponent extends Component 
{
    constructor(props)
    {
        super(props);

        state = {
        }
    }

    renderTotal = (total, earnings) => {
        return(

            <View style={{flex:1, flexDirection:'column', }}>
                        <View style={newStyle.borderBottomNew}></View>
                    <View style={newStyle.totalText}>
                            <Text style={newStyle.firstName}>Total worked hours</Text>
                            <Text style={newStyle.fontStyle}>{total}</Text>
                    </View>
                    <View style={newStyle.totalText}>
                            <Text style={newStyle.firstName}>Total Earned</Text>
                            <Text style={newStyle.fontStyle}>€ {earnings}</Text>
                    </View>
            </View>
        );
    }


    render() {

        return (

            //this.renderTotal(this.props.workedHours,this.props.earnings)
            <View style={{flex:1, flexDirection:'column', }}>
                    <View style={newStyle.borderBottomNew}></View>
                <View style={newStyle.totalText}>
                        <Text style={newStyle.firstName}>Total worked hours</Text>
                        <Text style={newStyle.fontStyle}>{this.props.workedHours}</Text>
                </View>
                <View style={newStyle.totalText}>
                        <Text style={newStyle.firstName}>Total Earned</Text>
                        <Text style={newStyle.fontStyle}>€ {this.props.earnings}</Text>
                </View>
            </View>
        );
    }
}



const newStyle = StyleSheet.create({

  nameAndback: {
      width: viewPortWidth,
      height: viewPortHeight * 0.03,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'flex-start',
      backgroundColor:'transparent',
  },
  
  backButton: {
  
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center',
      marginLeft:20,
      backgroundColor: 'transparent'
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

fontStyle: {
    fontFamily: "WorkSans-Medium",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.67,
    textAlign: 'left',
    color: "rgb(231, 61, 80)",
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
  
  });