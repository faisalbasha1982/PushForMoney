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
  StyleSheet,
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
import logoNew from '../Images/NewHeaderImage.png';
import ProfileComponent from '../Components/PushToEarnProfileComponent';
import AddFriendComponent from '../Components/PushToEarnNoFriendsComponent';
import MoneyComponent from '../Components/PushToEarnMoneyComponent';
import InformationComponent from '../Components/PushToEarnInformationComponent';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth  = Dimensions.get('window').width;

export default class TestPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectionFirst: false,
            selectionSecond: false,
            selectionThird: false,
            selectionFourth: false,
            menu: 1,
        };
    }

    doNothing = () => {
        
    }

    render() {

        const { navigate } = this.props.navigation;

        return(
                <View style={newStyle.container}>

                    <View style={newStyle.topHeader}> 
                        <View style={newStyle.headerImage}>
                                <Image source={logoNew} resizeMode="contain" style={{ width: viewPortWidth, height: viewPortHeight * .40,}} />
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
                               this.state.menu === 1?
                                    <ProfileComponent />:
                               this.state.menu === 2?
                                    <AddFriendComponent />:
                               this.state.menu === 3?
                                    <MoneyComponent />:
                               this.state.menu === 4?
                                    <InformationComponent />: this.doNothing
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

            flex: 2,
            backgroundColor: 'powderblue',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'

},

bottomLayout: {

            flex: 5,
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
    height: viewPortHeight * .72,
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