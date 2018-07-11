import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Dimensions } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import { colors } from '../Themes/Colors';
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import LanguageSettings from '../Containers/LanguageSettingsNew';

const viewPortWidth = Dimensions.get('window').width;
const viewPortHeight = Dimensions.get('window').height;

let clanguage = '';

class ButtonWelcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      language:'',
    };
  }

  componentWillReceiveProps(nextProps)
  {

    if (nextProps.objectParams !== this.props.objectParams) {
      this.setState({
        text: nextProps.objectParams.btnText,        
        language: nextProps.objectParams.language,
      });

      clanguage = this.props.objectParams.language;
    }

  }

  componentDidMount()
  {
    console.log("received props from NewScreen ="+this.props.objectParams);
    console.log("received props from NewScreen language ="+this.props.objectParams.language);
    clanguage = this.props.objectParams.language;
    this.setState({ text: this.props.objectParams.btnText, language: this.props.objectParams.language });
  }

  setlanguage = () => {
  }

  somethingElse = () => {

  }

 // width: (viewPortWidth * 41) / 46,
 // height: viewPortHeight / 11,
 
  render() {
      return (
        <TouchableOpacity
        onPress={() => { this.props.navigation.navigate('FormOne', {language: clanguage }) }}
          activeOpacity={0.5}
          style={{
            width: 333,
            height: 57,
            marginBottom: 17,
            marginLeft: 8,
            borderRadius: 8,
            backgroundColor: '#E73D50',
            marginTop: viewPortHeight / 80,            
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
                marginTop: 20,                
                letterSpacing: 0.67,
                textAlign: 'center'}}
        > {this.state.text.toUpperCase()}</Text>
        </TouchableOpacity>
      );
  }
}

ButtonWelcome.propTypes = {
    text: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
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
    // onButtonPress: (language) => this.props.navigation.navigate('FormOne', {language: language }),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonWelcome);