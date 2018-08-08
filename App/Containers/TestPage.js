import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  PixelRatio,
  Alert,
  Platform,
  StyleSheet
} from 'react-native';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LanguageButton from '../Components/LanguageButton';
import Spinner from "react-native-loading-spinner-overlay";
import DeviceInfo from 'react-native-device-info';
import * as Animatable from 'react-native-animatable';
import CompanyBanner from '../Components/CompanyBanner';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; 
import { Colors } from "../Themes";
import { Images } from '../Themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopHeader from '../Components/TopHeader';

// Styles

export default class TestPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectionFirst: false,
            selectionSecond: false,
            selectionThird: false,
            selectionFourth: false
        };
    }

    render() {

        const { navigate } = this.props.navigation;

        return(
                <View style={newStyle.container}>

                    <TopHeader />

                    <View style={newStyle.leftButtons}>
                            <View 
                                style={ (this.state.selectionFirst === true)?newStyle.leftButtonSelected: newStyle.leftButton}
                                onPress = { (selectionFirst) => {this.setState({ selectionFirst: true, selectionSecond: false, selectionThird: false, selectionFourth: false, });}}>
                                    <TouchableOpacity 
                                        activeOpacity={0.5}
                                        style={newStyle.iconStyle}>
                                        <Icon
                                            containerStyle={newStyle.iconImageStyle}
                                            name='user'
                                            type='font-awesome'
                                            color='#E73D50'
                                            size = {20}
                                            onPress={() => console.log('hello')} /> 
                                    </TouchableOpacity>
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
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
},

leftButton: {
    width: 54,
    height: 111,
    backgroundColor: 'powderblue',
    shadowColor: "rgba(216, 216, 216, 0.20)",
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
    flex: 2,
  },

leftButtons: {
    width: 54,
    height: 111,
    backgroundColor: 'white',
    shadowColor: "rgba(216, 216, 216, 0.20)",
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
    flex: 5,
  },

  leftButtonSelected: {
    width: 54,
    height: 111,
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
    flex: 2,
  },

});