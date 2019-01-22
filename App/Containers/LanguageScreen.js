import React, { Component } from 'react'
import {
  Text,
  Dimensions,
  Platform
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LanguageButton from '../Components/LanguageButton';
import CompanyBanner from '../Components/CompanyBanner';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Styles

const viewPortHeight = Dimensions.get('window').height;

export default class LanguageScreen extends Component 
{
    constructor(props){
        super(props);
    }

    state = {

    }

    render()
    {

        return(

        <KeyboardAwareScrollView
        ref={(ref) => { this.keyboardAvoidView = ref; }}>
        
        <CompanyBanner />

        <Text style={{
            width: "100%",
            height: Platform.OS === 'ios' ? "6.9%" : 80,
            flex: 6,
            fontSize: 30,
            color: 'black', 
            fontFamily: 'WorkSans-Regular',
            lineHeight: 46,
            letterSpacing: 0,
            textAlign: 'left',
            backgroundColor: 'black' }}> Choose your What! </Text>

        <Animatable.View
          animation="fadeIn"
          delay={1900}
          duration={1000}
          style={{ flex: 7, 
                   marginLeft: 20,
                   flexDirection: 'column', 
                   alignItems: 'flex-start', 
                   justifyContent: 'center', 
                   height: viewPortHeight, 
                }}>

          <LanguageButton
            language={<Text style={{ fontFamily: 'WorkSans-Light'}}>{LanguageSettings.dutch.languageText}</Text>}
          />

          <LanguageButton
            language={LanguageSettings.french.languageText}
          />

          <LanguageButton
            language={LanguageSettings.english.languageText}
          />



        </Animatable.View>
      </KeyboardAwareScrollView>
      );
    }
}


