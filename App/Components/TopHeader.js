
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View,Dimensions,TouchableOpacity,Image,Text } from "react-native";
import {
    
    Thumbnail
  } from "native-base";
import { Colors } from "../Themes";
import logoNew from '../Images/NewHeaderImage.png';
import { StyleSheet } from "react-native";

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth  = Dimensions.get('window').width;

export default class TopHeader extends PureComponent
{
    constructor(props)
    {
        super(props);

        this.state = {

        };
    }

    render()
    {
            return (
                <View style={newStyle.headerImage}>
                        <Image source={logoNew} resizeMode="contain" style={{ width: viewPortWidth, height: viewPortHeight * .45 }} />
                        {/* {
                            (this.state.renderValidate === true)?this.renderValidation():this.renderNothing()
                        } */}
                </View>
                );
    }

}

const newStyle = StyleSheet.create({

    headerImage: {
        width: viewPortWidth,
        height: Platform.OS === 'ios'?viewPortHeight * 0.51:
                                      viewPortHeight * 0.29,
        flex: Platform.OS === 'ios'?2:6,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',        
    },


});