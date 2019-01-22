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
import { StyleSheet } from 'react-native';
import logoHeader from '../Images/page1.png';
import pushFor from '../Images/pushFor.png';
import njobanimationImage from '../Images/newjobanimation.gif';
import animation from '../Images/moneylogonew.gif';
import jobanimationnew from '../Images/joblogonew.gif';
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import newStyle from './Styles/PushForJobQuitStyles';

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

class PushForJob_quit extends Component {

    constructor(props)
    {
      super(props);

        this.state = {
            isLoaded: false,
            language:'',
        };
    }

    getAsyncStorage = async () => {

        await AsyncStorage.getItem('token').then((token) => {
            this.setState({ hasToken: token !== null, isLoaded: true })
          });

          await AsyncStorage.getItem('language').then((language) => {
            this.setState({ language:language })
          });        

          this.setLanguage();
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
   

    componentWillReceiveProps(newProps)
    {
        if(newProps !== this.props)
            {
                this.getAsyncStorage();
            }
    }

    componentWillMount()
    {
        this.getAsyncStorage();
    }

    componentDidMount()
    {
        this.getAsyncStorage();
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

        return(
                <View style={newStyle.container}>
                    <View style={newStyle.topContainer}>
                        <View style={newStyle.bottomContainer}>
                            <TouchableOpacity onPress={() => { this.callForm() }}>
                                        <Image source={jobanimationnew} resizeMode="contain" style={{ width: viewPortWidth * 0.891, height: viewPortHeight * 0.891, marginLeft: 15, marginTop: 15, }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={newStyle.pushContainer}>
                            <Image source={pushFor} resizeMode="contain" style={{ width: viewPortWidth * 0.750, height: viewPortHeight * 0.550 }} />
                    </View>

                    <View style={newStyle.newBottomContainer}>
                        <TouchableOpacity onPress={() => { this.callMoney() }}>
                                    <Image source={animation} resizeMode="contain" style={{ width: viewPortWidth * 0.891, height: viewPortHeight * 0.891, marginLeft: 15, }} />
                        </TouchableOpacity>         
                    </View>
                    <View style={newStyle.logoBottom}>
                            <Image source={logoHeader} resizeMode="contain" style={{ width: viewPortWidth * 0.350, height: viewPortHeight * 0.04 }} />
                    </View>
                </View>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {  
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      onButtonPress: () => {dispatch(NavigationActions.navigate({routeName: 'NewScreen'}));},
      navigateBack: () => dispatch(NavigationActions.back()),  
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushForJob_quit);