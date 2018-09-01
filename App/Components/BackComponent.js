import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Dimensions, StyleSheet,View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const viewPortWidth = Dimensions.get('window').width;
const viewPortHeight = Dimensions.get('window').height;

export default class BackComponent extends Component 
{
    constructor(props)
    {
        super(props);

        state = {
        }
    }

    render() {
        return (

            <View style = {newStyle.nameAndback}>
                <Text style={{
                    fontFamily: "WorkSans-Regular",
                    fontSize: 13,
                    fontWeight: "500",
                    fontStyle: "normal",
                    letterSpacing: 0.54,
                    textAlign: "left",
                    color: "rgb(231, 61, 80)"
                }}>{ this.props.name } </Text>

                <TouchableOpacity onPress={ ( ) => { 
                                                      this.props.back();
                                                    }}
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
  
  });