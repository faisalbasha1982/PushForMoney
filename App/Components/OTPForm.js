import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, Text } from "react-native";
import OtpInputs from "react-native-otp-inputs";

import styles from "./Styles/OTPFormStyle";
import { Colors } from "../Themes";


const OTPForm = ({handleChange,otp}) => {
    console.tron.log("otp value received in OTPFORM="+otp);
  return (
    <OtpInputs
      unfocusedBorderColor={Colors.charcoal}
      focusedBorderColor={Colors.burntSienna}
      clearTextonFocus = { true }
      containerStyles={styles.otpContainer}
      inputTextErrorColor="#222"
      inputContainerStyles={styles.inputContainer}
      errorMessageTextStyles={styles.errorMessageText}
      errorMessageContainerStyles={styles.errorMessageContainer}
      inputStyles={styles.input}
      handleChange={handleChange}
      numberOfInputs={4}
      value = { otp }
    />
  );
};

OTPForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  otp: PropTypes.string.isRequired,
}

export default OTPForm;
