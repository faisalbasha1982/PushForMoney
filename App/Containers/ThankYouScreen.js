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
    Platform,
    Linking,
    Alert
} from 'react-native';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from "react-navigation";
import TimerMixin from 'react-timer-mixin';
import ButtonWelcome from '../Components/ButtonWelcome';
import LanguageButton from '../Components/LanguageButton';
import Spinner from "react-native-loading-spinner-overlay";
import DeviceInfo from 'react-native-device-info'
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import CompanyBanner from '../Components/CompanyBanner';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from "../Themes";
import { Images } from '../Themes';

import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/logojobfixersNew.png';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

// Styles

class ThankYouScreen extends Component {

    constructor(props)
    {
        super(props);        
        //this._interval = setInterval(() => { this.props.onButtonPress(),60000});        
    }

    state = {
        language: 'NEDERLANDS',
        thankYouText: '',
        thankYouTextOne: '',
        thankYouTextTwo: '',
        followText: '',                
        buttonText: '',
        timer:0,
    };

    timerCount = () => {
        setTimeout(() => { this.props.navigation.navigate('PushForJob',{navigation: this.props.navigation}),60000});
    }

    checkTimer = () => {
        
        this.setState({timer: this.state.timer + 1});

        if(this.state.timer===500)
            this.props.navigation.navigate('PushForJob',{navigation: this.props.navigation});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.language !== this.props.navigation.state.params.language) {
            this.setState({ language: nextProps.language });
            this.setText();

            //this._interval = setInterval(() => { this.props.onButtonPress(),60000});
        }
    }

    componentDidMount() {
        console.log("language="+this.state.language);
        this.setState({ language: this.props.navigation.state.params.language });
        this.setText();

        this._interval = setInterval(() => { this.checkTimer(),1000});        
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    setText = () => {

        if (this.props.navigation.state.params.language === 'NEDERLANDS') {
            this.setState({
                thankYouText: LanguageSettings.dutch.thankYouText,
                thankYouTextOne: LanguageSettings.dutch.thankYouTextOne,
                thankYouTextTwo: LanguageSettings.dutch.thankYouTextTwo,
                followText: LanguageSettings.dutch.followText,
                buttonText: LanguageSettings.dutch.buttonText
            });
        }
        else
            if (this.props.navigation.state.params.language === 'ENGLISH') {
                this.setState({
                    thankYouText: LanguageSettings.english.thankYouText,
                    thankYouTextOne: LanguageSettings.english.thankYouTextOne,
                    thankYouTextTwo: LanguageSettings.english.thankYouTextTwo,
                    followText: LanguageSettings.english.followText,
                    buttonText: LanguageSettings.english.buttonText
                });
            }
            else
                this.setState({
                    thankYouText: LanguageSettings.french.thankYouText,
                    thankYouTextOne: LanguageSettings.french.thankYouTextOne,
                    thankYouTextTwo: LanguageSettings.french.thankYouTextTwo,
                    followText: LanguageSettings.french.followText,
                    buttonText: LanguageSettings.french.buttonText
                });
    }

    doNothing = () => {

    }

    render() {
        return (

            
            <View style={newStyle.container}>

                <View style={newStyle.headerImage}>
                    <Image source={logoNew} resizeMode="contain" style={{ width: viewPortWidth, height: viewPortHeight * .45 }} />
                </View>

                <View style={newStyle.logoContainer}>
                    <Image source={logoHeader} resizeMode="contain" style={{ width: viewPortWidth * 0.532, height: viewPortHeight * 0.06 }} />
                </View>

                <View style={newStyle.thankYouText}>
                    <Text style={newStyle.languageText}>{ this.state.thankYouText + '\n'+ this.state.thankYouTextOne + '\n'+ this.state.thankYouTextTwo }</Text>
                </View>

                <View style={newStyle.randomText}>
                    <Text style={newStyle.rText}> {this.state.followText}</Text>
                </View>

                <View style={newStyle.buttons}>
                        <TouchableOpacity
                                style={{
                                    alignItems:'center',
                                    justifyContent:'center',
                                    width:35,
                                    height:35,
                                    marginRight: 25,
                                    backgroundColor:'#e73d50',
                                    borderRadius:35,
                                    }}
                                onPress = {() => { Linking.openURL('https://facebook.com/jobFIXers.be/') }}
                                >
                                <Icon name={"facebook-f"}  size={15} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                                style={{
                                    alignItems:'center',
                                    justifyContent:'center',
                                    width:35,
                                    height:35,
                                    backgroundColor:'#e73d50',
                                    borderRadius:35,
                                    }}
                                    onPress = {() => { Linking.openURL('https://www.instagram.com/jobfixers/') }}
                                >
                                <Icon name={"instagram"}  size={17} color="#fff" />
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

    headerImage: {
        width: viewPortWidth,
        height: viewPortHeight * 0.55,
        flex: Platform.OS==='ios'?28:23,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoContainer: {
        width: viewPortWidth,
        height: 50,
        flex: 8,
        padding: 20,
        paddingBottom: 10,
        marginTop: 25,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    languageTextContainer: {
        width: viewPortWidth,
        height: 50,
        flex: 2,
        backgroundColor: 'powderblue',
        justifyContent: 'flex-end',
        marginTop: 10,
        padding: 10,
    },

    thankYouText: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 5,
        flexDirection: 'column',
        height: viewPortHeight * 0.50,
        width: viewPortWidth,
        padding: 17,
        margin: 50,
        marginTop: 80
    },

    languageText: {
        width: 316,
        height: 140,
        fontFamily: 'WorkSans-Regular',
        fontSize: 28,
        fontWeight: '500',
        color: '#e73d50',
        fontStyle: 'normal',
        lineHeight: 34,
        letterSpacing: 0,
        textAlign: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginLeft: 15,
        marginRight: 15,
    },

    randomText: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 8,
        flexDirection: 'column',
        marginTop: 10,
    },

    rText: {
        width: 148,
        height: 25,
        fontFamily: 'WorkSans-Medium',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'normal',
        letterSpacing: 0.8,
        textAlign: 'center',
    },


    buttons: {
        width: viewPortWidth,
        height: 157,
        flex: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 15,
        marginRight: 25,
        marginTop: 0,        
        marginBottom:  10,
        paddingTop: 0,
        paddingLeft: 15
    },

});

ThankYouScreen.propTypes = {
    language: PropTypes.string.isRequired
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
        navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
        // navigateBack: () => this.props.navigation.goBack(),
        // onButtonPress: () => this.props.navigation.navigate('PushForJob'),  
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThankYouScreen);

