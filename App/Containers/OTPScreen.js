import React, { Component } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";

import { Container, Content, Header, Text, Button } from "native-base";
import { NavigationActions } from "react-navigation";
import { submit, getFormValues } from "redux-form";
import Spinner from "react-native-loading-spinner-overlay";
import { Colors } from "../Themes";
import Icon from "react-native-vector-icons/Ionicons";

// import RegisterActions, { RegisterSelectors } from "../Redux/RegisterRedux";

// Styles
import styles from "./Styles/OTPScreenStyle";
import * as Animatable from "react-native-animatable";
import OTPForm from "../Components/OTPForm";

class OTPScreen extends Component {
  static navigationOptions = {
    header: null
  };

  handleOTPChange = OTP => {
    if (OTP.length == 4) {
      //this.props.submitForm({ PhoneNo: this.props.registerFormValues.phoneNumber, OTP, dailCode: this.props.registerFormValues.dailCode });
    }
  };

  componentWillMount() {
    console.tron.log(`Register form values in OTP are ${JSON.stringify(this.props.registerFormValues, null, 2)}`);
  }

  render() {
    const { back, onSubmit } = this.props;

    return (
      <Container>
        <Content scrollEnabled={false}>
          <View style={styles.mainContainer}>
            <Spinner
              visible={false}
              style={{ alignSelf: "center" }}
              color={Colors.burntSienna}
              size="large"
            />
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={this.props.navigateBack}
                >
                  <Icon
                    size={40}
                    name="ios-arrow-round-back"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <View style={styles.headerTitle} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Phone Verification</Text>
                <Text style={styles.bodyText}>
                  Enter the 4 digit OTP sent to your phone number +971503468885
                </Text>
                <TouchableOpacity>
                  <Text style={styles.editText}>Edit number</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.formContainer}>
                <OTPForm handleChange={this.handleOTPChange} />
              </View>
              <View style={styles.bottomContainer}>
                <Text style={styles.bottomText}>
                  Didn't receive the OTP yet?
                </Text>
                <TouchableOpacity style={styles.resendContainer}>
                  <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    //fetchingRegister: RegisterSelectors.getFetching(state),
    //registerFormValues: getFormValues('registerForm')(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // submitForm: body => {
    //   dispatch(RegisterActions.verifyOtp(body));
    // },
    navigateBack: () => dispatch(NavigationActions.back()),
    navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
    verifyOTP: (payload) => dispatch({ type: 'VERIFY_OTP_LOGIN', payload }),
    verifyOTPResend: (payload) => dispatch({ type: 'VERIFY_OTP_RESEND',payload }),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OTPScreen);
