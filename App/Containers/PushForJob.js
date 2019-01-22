import React, { Component } from 'react'
import {
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from 'react-native';
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';
import logoHeader from '../Images/page1.png';
import pushFor from '../Images/pushFor.png';
import njobanimationImage from '../Images/newjobanimation.gif';
import animation from '../Images/moneylogonew.gif';
import jobanimationnew from '../Images/joblogonew.gif';
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import newStyle from './Styles/PushForJobStyles';

import SplashScreen from 'react-native-splash-screen';

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
        // if(newProps != )

        if(newProps !== this.props)
            {
                this.getAsyncStorage();
                console.log("hasToken --->"+this.state.hasToken);
            }
    }

    componentWillMount()
    {
        this.getAsyncStorage();
    }

    componentDidMount()
    {
        this.getAsyncStorage();

        console.log("inside push for job screen ---->"+ this.state.hasToken)
        console.log("hasToken --->"+this.state.hasToken);
        SplashScreen.hide();
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
                            <TouchableOpacity onPress={() => { this.callForm() }}
                                              style={{ backgroundColor: 'transparent'  }}>
                                        <Image source={jobanimationnew} resizeMode="contain" style={{ width: viewPortWidth * 0.891, height: viewPortHeight * 0.891, marginLeft: 15, marginTop: 15, }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={newStyle.pushContainer}>
                            <Image source={pushFor} resizeMode="contain" style={{ width: viewPortWidth * 0.750, height: viewPortHeight * 0.550 }} />
                    </View>

                    <View style={newStyle.newBottomContainer}>
                        <TouchableOpacity onPress={() => { this.callMoney() }}
                                          style={{ backgroundColor: 'transparent'  }}>
                                    <Image source={animation} resizeMode="contain" style={{ width: viewPortWidth * 0.891, height: viewPortHeight * 0.891, marginLeft: 15, }} />
                        </TouchableOpacity>         
                    </View>
                    <View style={newStyle.logoBottom}>
                            <Image source={logoHeader} resizeMode="contain" style={{ width: viewPortWidth * 0.350, height: viewPortHeight * 0.04 }} />
                    </View>
                </View>                                
                :
                    this.props.navigation.navigate('TestPage',{language: this.state.language})
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
    //   onButtonPress: () => this.props.navigation.navigate('NewScreen'),
      navigateBack: () => dispatch(NavigationActions.back()),  
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushForJob);