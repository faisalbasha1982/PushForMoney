import { createReducer, createActions, Types as ReduxSauceTypes } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registerRequest: ["payload"],
  registerRequestNew: ["payload"],
  registerSuccess: null,
  registerFailure: null,
  verifyOtp: ["payload"],
  verifyOtpFp: ["payload"],
  forgetPassword: ["payload"],
});

export const RegisterTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  fetching: null,
  payload: null,
  error: null
};

/* ------------- Selectors ------------- */

export const RegisterSelectors = {
  getFetching: state => state["register"].fetching,
  getError: state => state["register"].error
};

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { payload }) => {
  return {...state, fetching: true, payload }
}

// new request the data from an api
export const newrequest = (state, { payload }) => {
  return {...state, fetching: true, payload }
}

// successful api lookup
export const success = state => {
  return { ...state,  fetching: false,};
};

// Something went wrong somewhere.
export const failure = state => {
  return {...state, fetching: false, }
}
 
// request OTP verification
export const otp = (state, {payload}) => {
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
  [Types.REGISTER_REQUEST]: request,
  [Types.REGISTER_REQUEST_NEW]: newrequest,
  [Types.REGISTER_SUCCESS]: success,
  [Types.REGISTER_FAILURE]: failure,
  [Types.VERIFY_OTP]: otp,
  [Types.VERIFY_OTP_FP]: otpforgetpassword,
  [Types.FORGET_PASSWORD]: forget,
  [ReduxSauceTypes.DEFAULT]: defaultHandler
});
