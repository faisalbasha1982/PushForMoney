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
                <View style={{
                        justifyContent:'flex-start',
                        alignItems:'flex-start',
                        position: 'absolute',
                        top: -26,
                        left:-20,

                        // marginLeft:viewPortWidth*0.37

                    }}>
                    <TouchableOpacity onPress={ ( ) => { 
                                                      this.props.back();
                                                      this.props.toggleCalender();
                                                    }}
                                                activeOpacity={0.5}
                                                style={newStyle.backButton}>
                                                <Icon
                                                    containerStyle={newStyle.iconImageStyle}
                                                    name='arrow-circle-left'
                                                    type='font-awesome'
                                                    color='rgb(231, 61, 80)'
                                                    size = {18} /> 
                                                {/* <Text style= {{
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
                                                    {this.props.backText}
                                                </Text> */}
                                            </TouchableOpacity>
                </View>

            <View style={{
                     justifyContent:'center',
                     alignItems:'center',
                     backgroundColor: 'transparent',
                     paddingTop: 7,
                }}>
                    <Text style={{
                                fontFamily: "WorkSans-Regular",
                                fontSize: 15,
                                fontWeight: "500",
                                fontStyle: "normal",
                                letterSpacing: 0.54,
                                textAlign: "left",
                                color: "rgb(231, 61, 80)"
                }}>{ this.props.name } </Text>
                <View style={newStyle.borderBottomNew}></View>
            </View>


        </View>
        );
    }
}



const newStyle = StyleSheet.create({

  nameAndback: {
      width: viewPortWidth,
      height: viewPortHeight * 0.06,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems:'flex-start',
      backgroundColor:'transparent',
  },

  borderBottomNew: {
    width: 310,
    height: 1,
    borderBottomColor: "rgb(231, 61, 80)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex:2,
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
    textAlign: 'left',
    color: "rgb(231, 61, 80)", 
    marginRight:10,
  },  
  
  });