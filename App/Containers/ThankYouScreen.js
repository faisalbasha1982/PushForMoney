import React, { Component } from 'react'
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    Platform,
    Linking,
} from 'react-native';

import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from "react-navigation";
import LanguageSettings from '../Containers/LanguageSettingsNew';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/logojobfixersNew.png';
import newStyle from './Styles/ThankYouScreenStyles';

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

// ThankYouScreen.propTypes = {
//     language: PropTypes.string.isRequired
// }

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

