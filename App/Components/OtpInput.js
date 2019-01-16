import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import PropTypes from 'prop-types';

class OTPInput extends Component {

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    otpLength: PropTypes.number,
    tintColor: PropTypes.string,
    offTintColor: PropTypes.string,
    containerStyle: PropTypes.object,
    cellStyle: PropTypes.object,
    defaultValue: PropTypes.string,
    editable: PropTypes.bool
  }

  static defaultProps = {
    onChange: () => null,
    otpLength: 4,
    tintColor: '#FB6C6A',
    offTintColor: '#BBBCBE',
    containerStyle: {},
    cellStyle: {}
  };

  textInput = null;

  state = {
    internalVal: this.props.value || this.props.defaultValue
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('value') && nextProps.value !== this.state.internalVal) {
      this.setState({ internalVal: nextProps.value });
    }
  }

  componentDidMount() {
    this.focus();
  };

  handleChangeText = (val) => {
    const { onChange } = this.props;
    
    onChange(val);
    this.setState({ internalVal: val })
  };

  // public methods
  inputRef() {
    return this.textInput;
  }

  focus() {
    if (this.props.editable !== false) {
      this.inputRef().focus();
    }
  }

  blur() {
    this.inputRef().blur();
  }

  isFocused() {
    return this.inputRef().isFocused();
  }

  clear() {
    this.setState({ internalVal: '' })
  }

  _onFocus = () => {
    this.textInput.focus();
  }

  render() {
    const {
      containerStyle,
      cellStyle,
      tintColor,
      offTintColor,
      otpLength,
      ...otherProps
    } = this.props;

    const { internalVal } = this.state;

    return (
      <View>
        <TextInput
          ref={input => (this.textInput = input)}
          onChangeText={this.handleChangeText}
          style={{ width: 0, height:0 , borderColor:'red', borderWidth:1 , borderStyle:"solid"}}
          value={internalVal}
          autoFocus={true}
          onFocus={() => this._onFocus()}
          clearTextOnFocus={true}
          minLength={otpLength}
          maxLength={otpLength}
          returnKeyType="done"
          keyboardType="numeric"
          {...otherProps}
        />
        <View style={[styles.newcontainer, containerStyle]}>
            {Array(otpLength)
              .fill()
              .map((_, index) => (
                <Text
                  key={index}
                  style={[
                    styles.otpContainer,
                    styles.otpInput,
                    {
                      borderColor:
                      internalVal && (index) === internalVal.length - 1 ? tintColor : offTintColor
                    }
                  ]}
                  onPress={() => this.textInput.focus()}
                >
                  {internalVal && internalVal.length > index ? internalVal[index] : " "}
                </Text>
              ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  newcontainer: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center'
},
  otpContainer: {
    backgroundColor: 'rgb(246, 246, 246)',
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    width:37,
    margin: 10,
  },
  otpInput: {
    color: '#000000',
    fontSize: 24,
    paddingTop: 10,
    textAlign: 'center',
    width: 40,
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 20,
  },
  errorMessageContainer: {
    marginHorizontal: 25,
  },


  cell: {
    paddingVertical: 11,
    width: 40,
    height: 40,
    margin: 5,
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    borderRadius: 40/2,
    borderWidth:1,
    backgroundColor:'#a1a1a1'
  }
});

export default OTPInput;

