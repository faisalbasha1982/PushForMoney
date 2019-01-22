import React, { Component } from 'react'
import {
    Text,
    Image,
    View,
    Dimensions,
    Platform
} from 'react-native';

import ButtonWelcome from '../Components/ButtonWelcome';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/logojobfixersNew.png';
import newStyle from './Styles/WelcomeScreenStyles';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

// Styles

let languageGlobal = '';

export default class WelcomeScreen extends Component {

    constructor(props)
    {
        super(props);        

        this.state = {
            language: 'NEDERLANDS',
            workText: '',
            moreText: '',
            randomText: '',
            buttonText: '',
        };
    
    }

    getMoreText = () => {
        return this.state.moreText;
    }

    componentWillReceiveProps(nextProps) {

        console.log("Will receive props="+nextProps.language);
        if (nextProps.language !== this.props.language) {
          this.setState({
            language: nextProps.language,
          });
        }
        setTimeout( () => this.setText(),5000);
      }
    
    componentDidMount() {
        console.log("Welcome screen received props componentDidMount ="+this.props.navigation.state.params.language);
        () => this.setState({ language: this.props.navigation.state.params.language });
        this.setText();
    }

    setText = () => {

        console.log("set Text being called ="+this.props.navigation.state.params.language);
        console.log("state language="+ this.state.language)

        languageGlobal = this.props.navigation.state.params.language;

        if (languageGlobal === 'NEDERLANDS') {
            this.setState({
                workText: LanguageSettings.dutch.welcomeTextRed,
                moreText: LanguageSettings.dutch.welcomeTextMore,
                randomText: LanguageSettings.dutch.welcomeTextGray,
                buttonText: LanguageSettings.dutch.buttonText
            });
        }
        else
            if (languageGlobal === 'ENGLISH') {
                this.setState({
                    workText: LanguageSettings.english.welcomeTextRed,
                    moreText: LanguageSettings.english.welcomeTextMore,
                    randomText: LanguageSettings.english.welcomeTextGray,
                    buttonText: LanguageSettings.english.buttonText
                });
            }
            else
                this.setState({
                    workText: LanguageSettings.french.welcomeTextRed,
                    moreText: LanguageSettings.french.welcomeTextMore,
                    randomText: LanguageSettings.french.welcomeTextGray,
                    buttonText: LanguageSettings.french.buttonText
                });
    }

    render() {
        console.log("this.state.moreText="+ this.getMoreText());
        console.log("this.state.buttonText="+this.state.buttonText);
        return (
            <View style={newStyle.container}>

                <View style={newStyle.headerImage}>
                    <Image source={logoNew} resizeMode="contain" style={{ width: viewPortWidth, height: viewPortHeight * .45 }} />
                </View>

                <View style={newStyle.logoContainer}>
                    <Image source={logoHeader} resizeMode="contain" style={{ width: viewPortWidth * 0.532, height: viewPortHeight * 0.06 }} />
                </View>

                <View style={newStyle.workingText}>
                    <Text style={newStyle.languageText}>{this.state.workText }</Text>
                    <Text style={newStyle.languageText}>{this.state.moreText }</Text>
                </View>

                <View style={newStyle.randomText}>
                    <Text style={newStyle.rText}> {this.state.randomText}</Text>
                </View>

                <View style={newStyle.buttons}>
                    <ButtonWelcome objectParams= { {btnText: this.state.buttonText, language: this.props.navigation.state.params.language}  } />
                </View>

            </View>
        );
    }

}