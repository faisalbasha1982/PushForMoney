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
  AsyncStorage
} from 'react-native';
import PropTypes from "prop-types";
import DeviceInfo from 'react-native-device-info'
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import logoHeader from '../Images/page1.png';
import pushImage from '../Images/pushForA.png';
import jobImage from '../Images/group2.png';
import pushFor from '../Images/pushFor.png';
import njobanimationImage from '../Images/newjobanimation.gif';
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import AppNavigation from '../Navigation/AppNavigation';
import { Colors } from "../Themes";
import { Images } from '../Themes';
import { Button } from 'react-native-elements';
import { isNullOrUndefined } from 'util';
import TestPage from '../Containers/TestPage';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth  = Dimensions.get('window').width;

const animations = [
    ['bounce','#62B42C'],
    ['flash','#316BA7'],
    ['jello','#A0A0A0'],
    ['pulse','#FFC600'],
    ['rotate','#1A7984'],
    ['rubberBand','transparent'],
    ['shake','#FF6800'],
    ['swing','#B4354F'],
    ['tada','#333333']
];

const animationsNew = [
    ['bounce','transparent'],
    ['flash','transparent'],
    ['jello','transparent'],
    ['pulse','transparent'],
    ['rotate','transparent'],
    ['rubberBand','transparent'],
    ['shake','transparent'],
    ['swing','transparent'],
    ['tada','transparent']
];

// Styles

class PushForJob extends Component {

    constructor(props)
    {
      super(props);

        this.state = {
            hasToken:false,
            isLoaded: false,
            language:''
        };

    }

    getToken = async () => {

        console.log("inside push for job screen ---->"+ this.state.hasToken)
        console.log("hasToken --->"+this.state.hasToken);

     await AsyncStorage.getItem('token').then((token) => {
            this.setState({ hasToken: token !== null, isLoaded: true })
          });
    }

    getLanguage = async () => {

       await AsyncStorage.getItem('language').then((language) => {
            this.setState({ language:language })
          });
    
        setTimeout(() => {
            console.log("inside get Language in Push For Job language="+this.state.language);
        },3000);

    }

    reset = () => {

        return this.props.navigation(
            NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'NewScreen'
                        })
                    ]
                }));
    }    

    renderNothing = () => {

        if(this.state.hasToken===true)
           return(
                <TestPage language = { this.state.language} />
           )
        else
            return null;
    }

    changeScreen = async () => {

        await AsyncStorage.getItem('language').then((language) => {
            language === ''?this.setState({ hasToken: false }):
            this.setState({ hasToken: true})
        });

        this.state.hasToken === false?
            this.renderNothing()
        :
            this.props.navigation.navigate('TestPage',{language: this.state.language});

        // setTimeout(() => {
        //     this.props.navigation.navigate('TestPage',{language: this.state.language});
        // },3000)

    }

    componentWillReceiveProps(newProps)
    {
        // if(newProps != )

        if(newProps !== this.props)
            {
                this.getToken();
                this.getLanguage();
                console.log("hasToken --->"+this.state.hasToken);
            }
    }

    componentDidMount()
    {
        this.getToken();
        this.getLanguage();

        console.log("inside push for job screen ---->"+ this.state.hasToken)
        console.log("hasToken --->"+this.state.hasToken);
    }

    callForm = () => {
        this.props.navigation.navigate('NewScreen');
    }

    callMoney = () => {
        this.props.navigation.navigate('NewScreenMoney');
    }

    renderAnimation = () => {
                    return (                        
                            <TouchableOpacity onPress={() => 
                                { 
                                //this.props.onButtonPress()
                                this.reset();
                                this.props.navigation.navigate('NewScreen');
                            }}>
                                    <Image source={njobanimationImage} resizeMode="contain" style={{ width: viewPortWidth * 0.891, height: viewPortHeight * 0.891 }} />
                            </TouchableOpacity>
                    );
    }

    render()
    {
        let tokenAsync = '';
        console.log("has token --->"+this.state.hasToken);

        return(
                (this.state.hasToken === false)?
                <View style={newStyle.container}>
                    <View style={newStyle.topContainer}>
                        {/* <Animatable.Text animation="zoomInUp" style={newStyle.pushStyle}>PUSH {'\n'} FOR {'\n'} A</Animatable.Text> */}
                        {/* <Image source={pushImage} resizeMode="contain" style={{ width: viewPortWidth * 0.812, height: viewPortHeight * 0.35, }} /> */}
                        <View style={newStyle.bottomContainer}>
                            <TouchableOpacity onPress={() => { this.callForm() }}>
                                        <Image source={njobanimationImage} resizeMode="contain" style={{ width: viewPortWidth * 0.891, height: viewPortHeight * 0.891, marginLeft: 15, }} />
                            </TouchableOpacity>         
                        </View>
                    </View>
                    
                    <View style={newStyle.pushContainer}>
                            <Image source={pushFor} resizeMode="contain" style={{ width: viewPortWidth * 0.750, height: viewPortHeight * 0.550 }} />
                    </View>

                    <View style={newStyle.bottomContainer}>
                        <TouchableOpacity onPress={() => { this.callMoney() }}>
                                    <Image source={njobanimationImage} resizeMode="contain" style={{ width: viewPortWidth * 0.891, height: viewPortHeight * 0.891, marginLeft: 15, }} />
                        </TouchableOpacity>         
                    </View>
                    <View style={newStyle.logoBottom}>
                            <Image source={logoHeader} resizeMode="contain" style={{ width: viewPortWidth * 0.350, height: viewPortHeight * 0.04 }} />
                    </View>
                </View>                                
                :
                this.renderNothing()
        );
    }

}

const newStyle = StyleSheet.create({

    container: {
                flex: 1,
                backgroundColor: '#fad704',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 45
    },

    topContainer: {
                flex:5,   
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 35,
                backgroundColor: 'transparent'
    },

    logoBottom: {
                flex:1,                
                alignItems: 'center',
                justifyContent: 'center',
                width:99.7,
                height: 20,        
    },

    pushContainer: {
        width: 238,
        height: 75,
        flex:16,
    },

    bottomContainer: {
                flex:12,
                width: viewPortWidth,
                height: viewPortHeight * 0.85,                
                alignItems: 'center',
                justifyContent: 'center',
    },

    button: {
                backgroundColor: 'red',
                flex:1,                
                borderColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                width:viewPortWidth,
                height: viewPortHeight * 0.85,        
    },

    box: {
                flex:1,
                alignItems: 'center',
                justifyContent: 'center',
                height: viewPortHeight * 0.85,
                width: viewPortWidth,
                backgroundColor: '#fff'                
    },

    jobText: {
        width:155,
        height:114,
        fontFamily: 'barlowsemicondensed-extrabold',
        fontSize: 95,
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#fad704",
        textShadowColor: "#07438f",
        textShadowOffset: {
            width: 3,
            height: 5
        },
        textShadowRadius: 0
    },

    pushStyle: {
                width: 130,
                height: 237,
                fontFamily: 'barlowsemicondensed-extrabold',
                fontSize: 60,
                fontStyle: "normal",
                fontWeight: "800",
                lineHeight: 75,
                letterSpacing: 0,
                textAlign: "center",
                color: "#e73d50",
                textShadowColor:"#07438f",
                textShadowOffset: {
                    width: 3,
                    height: 5
                },
                textShadowRadius: 0           
    },

});

const mapStateToProps = state => {
    return {
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {  
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      onButtonPress: () => {dispatch(NavigationActions.navigate({routeName: 'NewScreen'}));},
    //   onButtonPress: () => this.props.navigation.navigate('NewScreen'),
      navigateBack: () => dispatch(NavigationActions.back()),  
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushForJob);