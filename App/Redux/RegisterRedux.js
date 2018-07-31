import { createReducer, createActions, Types as ReduxSauceTypes } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  makeRegisterRequest: ["payload",'username','password'],
  registerRequest: ["payload"],
  registerRequestNew: ["payload"],
  registerSuccess: ['user'],
  registerFailure: null,
  verifyOtp: ["payload"],
  verifyOtpFp: ["payload"],
  verifyOtpResend: ["payload"],
  forgetPassword: ["payload"],
});

export const RegisterTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  fetching: null,
  payload: null,
  error: null,
  user: null,
  username: null,
  password: null,
};

/* ------------- Selectors ------------- */

export const RegisterSelectors = {
  getUser: state => state["register"].user,
  getFetching: state => state["register"].fetching,
  getError: state => state["register"].error
};

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { payload }) => {
  return {...state, fetching: true, payload }
}

export const makerequest = (state, action) => {
  const { payload, username, password } = action
  return {...state, fetching: true, payload, username, password }
}

// new request the data from an api
export const newrequest = (state, { payload }) => {
  return {...state, fetching: true, payload }
}

// successful api lookup
export const success = (state, {user}) => {
  return { ...state,  fetching: false,};
};

// Something went wrong somewhere.
export const failure = state => {
  return {...state, fetching: false, }
};
 
// request OTP verification
export const otp = (state, {payload}) => {
  return {...state, fetching: true, payload }
};

export const otpResend = (state, {payload}) => {
  return {...state, fetching: true, payload }
}

// request forget password
export const forget = (state, {payload}) => {
  return {...state, fetching: true, payload }
}

export const otpforgetpassword = (state, {payload}) => {
  return { ...state, fetching: true, payload }
}

// Default Handler 
export const defaultHandler = (state) => {
  return { ...state}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MAKE_REGISTER_REQUEST]: makerequest,
  [Types.REGISTER_REQUEST]: request,
  [Types.REGISTER_REQUEST_NEW]: newrequest,
  [Types.REGISTER_SUCCESS]: success,
  [Types.REGISTER_FAILURE]: failure,
  [Types.VERIFY_OTP]: otp,
  [Types.VERIFY_OTP_FP]: otpforgetpassword,
  [Types.VERIFY_OTP_RESEND]: otpResend,
  [Types.FORGET_PASSWORD]: forget,
  [ReduxSauceTypes.DEFAULT]: defaultHandler
});