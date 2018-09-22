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
    findNodeHandle,
    AsyncStorage
} from 'react-native';

import { Container, Header, Content, Input, Item } from 'native-base';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";
import ButtonPushWelcome from '../Components/ButtonPushWelcome';
import ButtonWelcome from '../Components/ButtonWelcome';
import LanguageButton from '../Components/LanguageButton';
import Spinner from "react-native-loading-spinner-overlay";
import DeviceInfo from 'react-native-device-info'
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import localStorage from 'react-native-sync-localstorage';

import LanguageSettings from '../Containers/LanguageSettingsNew';
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';

import { Colors } from "../Themes";
import { Images } from '../Themes';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

let cLanguage = '';

class PushToEarnWelcomeComponent extends Component {

    constructor(props)
    {
        super(props);             

        this.state = {
            language: 'NEDERLANDS',
            buttonText: '',
            text:{}
        };    

        this.setLanguage();
    }

    setLanguage = async () => {
       
          if(this.props.language === 'Dutch')
              this.setState({ text: languageSettingsPFM.Dutch, languageCode:'nl'});
          else
              if(this.props.language === 'English')
                  this.setState({ text: languageSettingsPFM.English, languageCode:'en'});
          else
              if(this.props.language === 'French')
                  this.setState({ text: languageSettingsPFM.French, languageCode:'fr'});

    }

    componentWillReceiveProps(nextProps)
    {
        console.log("willReceiveProps WP welcome component language="+this.props.language);

        if(this.props !== nextProps)
            this.setLanguage();
    }

    componentWillMount()
    {
        console.log("willMount WP welcome component language="+this.props.language);
    }

    componentDidMount()
    {
        console.log('DidMount WP welcome component language='+this.props.language);
        this.setLanguage();
    }

    render() {

        const platform = Platform.OS;
        console.log("platform --->",Platform.OS);
        console.log('text='+this.state.text.money);
        console.log("welcome WP component language in render ="+this.props.language);

        return (

                <View style={newStyle.endButtons}>
                    <View style={newStyle.topView}>
                        <Text style= {newStyle.topText}>           
                                {this.state.text.money}
                        </Text>    
                    </View>

                    <View style={newStyle.paraView}>
                        <Text style= {newStyle.para}>
                                Phallus sed tellus quis justo
                                finibus tempus.Nam sagittis.
                                Sollicitudin turpis.
                        </Text>
                    </View>

                    <View style={newStyle.buttonView}>

                      <TouchableOpacity
                                    onPress={() => {  } }
                                    activeOpacity={0.5}
                                    style={{
                                        width: 280,
                                        height: 57,
                                        marginBottom: 10,
                                        marginLeft: 0,
                                        borderRadius: 8,
                                        backgroundColor: '#E73D50',
                                        marginTop: viewPortHeight / 30,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 17,
                                            width: 333,
                                            height: 19,
                                            fontFamily: 'WorkSans-Regular',
                                            fontWeight: '500',
                                            fontStyle: 'normal',
                                            color: '#ffffff',
                                            marginTop: 0,
                                            letterSpacing: 0.67,
                                            textAlign: 'center'}}
                                    > {this.state.text.workButton} </Text>
                                </TouchableOpacity>      
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
        alignItems: 'center',
    },

    buttons: {
        width: viewPortWidth,
        height: 20,
        flex: 2,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 25,
        marginBottom:  10,
        marginTop: 10,
    },

    layoutBelow: {
        flex: 4,
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },

    leftButtons:{
        width: 54,
        height: viewPortHeight,
        backgroundColor: 'white',
        shadowColor: "rgba(216, 216, 216, 0.15)",
        shadowOffset: {
          width: 1,
          height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1,
        flex:1
  },

  leftButton: {
    width: 54,
    height: 111,
    backgroundColor: Colors.white,
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
  },

  endButtons: {
        width: viewPortWidth * 0.77,
        height: viewPortHeight * 0.70,
        zIndex: 999,
        flex: Platform.OS === 'ios'?4:4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    topText: {
        width: 276,
        height: 68,
        fontFamily: "WorkSans-Medium",
        fontSize: 28,
        fontWeight: "500",
        fontStyle: "normal",
        lineHeight: 34,
        letterSpacing: 0,
        textAlign: "center",
        color: "rgb(202, 44, 62)",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    topView: {
        width: 276,
        height: 68,
        flex:2,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    paraView: {
        width: 276,
        height: 57,
        flex: 1,
    },

    buttonView: {
        flex: 3,
    },

    para: {
        width: 276,
        height: 57,
        fontFamily: "WorkSans-Medium",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.67,
        textAlign: "center",
        color: "rgb(53, 53, 53)",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    
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
      notificationRequest: (payload) => dispatch({ type: 'NOTIFICATION_REQUEST', payload})
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnWelcomeComponent);