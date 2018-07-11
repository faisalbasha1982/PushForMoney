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

class ButtonLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      language:'',
      firstName:'',
      lastName: '',
      phoneNumber:'',
      firstNameError: false,
      lastNameError: false,
      phoneNumberError: false,
      firstNameEmpty: false,
      lastNameEmpty: false,
      phoneNumberEmpty: false,      
    };
  }

  componentWillReceiveProps(nextProps)
  {

    if (nextProps.objectParams !== this.props.objectParams) {
      this.setState({
        text: nextProps.objectParams.btnText,
        language: nextProps.objectParams.language,
        firstName: nextProps.objectParams.firstName,
        lastName: nextProps.objectParams.lastName,
        phoneNumber: nextProps.objectParams.phoneNumber,
        firstNameError: nextProps.objectParams.firstNameError,
        lastNameError: nextProps.objectParams.lastNameError,
        phoneNumberError: nextProps.objectParams.phoneNumberError,
        firstNameEmpty: nextProps.objectParams.firstNameEmpty,
        lastNameEmpty: nextProps.objectParams.lastNameEmpty,
        phoneNumberEmpty: nextProps.objectParams.phoneNumberEmpty
      });

      clanguage = this.props.objectParams.language;
    }

  }

  componentDidMount()
  {
    console.log("received props from NewScreen ="+this.props.objectParams);
    console.log("received props from NewScreen language ="+this.props.objectParams.language);
    clanguage = this.props.objectParams.language;

    this.setState({ 
        text: this.props.objectParams.btnText, 
        language: this.props.objectParams.language,
        firstName: this.props.objectParams.firstName,
        lastName: this.props.objectParams.lastName,
        phoneNumber: this.props.objectParams.phoneNumber, 
        firstNameError: this.props.objectParams.firstNameError,
        lastNameError: this.props.objectParams.lastNameError,
        phoneNumberError: this.props.objectParams.phoneNumberError,
        firstNameEmpty: this.props.objectParams.firstNameEmpty,
        lastNameEmpty: this.props.objectParams.lastNameEmpty,
        phoneNumberEmpty: this.props.objectParams.phoneNumberEmpty            
    });
  }

  setlanguage = () => {
  }


  somethingElse = () => {

    console.log("somethingElse this.state.language==="+this.state.language);

    if(this.state.language === 'NEDERLANDS')
        this.props.func(true,LanguageSettings.dutch.EmptyErrorText);
    else
      if(this.state.language === 'ENGLISH')
          this.props.func(true,LanguageSettings.english.EmptyErrorText);
      else
          this.props.func(true,LanguageSettings.french.EmptyErrorText);
           
    console.log("firstNameError:"+this.state.firstNameError);
    console.log("lastNameError:"+this.state.lastNameError);
    console.log("phoneNameError:"+this.state.phoneNumberError);
    console.log("firstNameError:"+this.state.firstNameEmpty);
    console.log("lastNameError:"+this.state.lastNameEmpty);
    console.log("phoneNameError:"+this.state.phoneNumberEmpty);
  }

 // width: (viewPortWidth * 41) / 46,
 // height: viewPortHeight / 11,
 
  render() {
    console.log("First Name="+this.state.firstName);
    console.log("Last Name="+this.state.lastName);
    console.log("Phone Number="+this.state.phoneNumber);
    console.log("firstNameError:"+this.state.firstNameError);
    console.log("lastNameError:"+this.state.lastNameError);
    console.log("phoneNameError:"+this.state.phoneNumberError);
    console.log("firstNameError:"+this.state.firstNameEmpty);
    console.log("lastNameError:"+this.state.lastNameEmpty);
    console.log("phoneNameError:"+this.state.phoneNumberEmpty);

    // width: 266,
    // height: 57,
    // borderRadius: 8,
    // backgroundColor: '#e73d50',
    // marginTop: viewPortHeight / 80,
    // justifyContent: 'center',
    // alignItems: 'center'

      return (
        <TouchableOpacity
        onPress={() => 
          (!this.state.firstNameEmpty &&
           !this.state.phoneNumberEmpty &&
           !this.state.firstNameError && 
           !this.state.lastNameError && 
           !this.state.phoneNumberError)?
           this.props.navigation.navigate('FormTwo',
           {
            objectParams: {
              text: this.state.text,
              language: this.state.language,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              phoneNumber: this.state.phoneNumber,      
           },
           navigation: this.props.navigation,
          }):this.somethingElse() }
          activeOpacity={0.5}
          style={{
            width: 330,
            height: 57,
            marginBottom: 20,
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
        > {this.state.text.toUpperCase()}</Text>
        </TouchableOpacity>
      );
  }
}

ButtonLogin.propTypes = {
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

    // onButtonPress: (text,language,firstName,lastName,phoneNumber) => this.props.navigation.navigate('FormTwo',{
    //   objectParams: {
    //     text: text,
    //     language: language,
    //     firstName: firstName,
    //     lastName: lastName,
    //     phoneNumber: phoneNumber,      
    // }}),
    // navigateBack: () => this.props.navigation.goBack(),

    // navigateBack: () => dispatch(NavigationActions.back()),
    // onButtonPress: (text,language,firstName,lastName,phoneNumber) => dispatch(NavigationActions.navigate({routeName: 'FormTwo',
    // params: {objectParams: {
    //     text: text,
    //     language: language,
    //     firstName: firstName,
    //     lastName: lastName,
    //     phoneNumber: phoneNumber,      
    // }}})),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonLogin);