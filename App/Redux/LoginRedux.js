import { createReducer, createActions, Types as ReduxSauceTypes } from 'reduxsauce'
import { REHYDRATE } from 'redux-persist';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ["payload"],
  facebookRequest:["payload","payload"],
  twitterRequest:["payload","username"],
  googleRequest:["payload","payload"],
  instagramRequest: ["payload","username"],
  rsaRequest:["payload"],
  loginSuccess: ['user'],
  loginFailure: ['error'],
  verifyOtpLogin: ['payload','OTP','OTPType'],
  notificationRequest: ['payload'],
  notificationSuccess: ['MobileNotifications', 'LastViewedNotificationID'],
  notificationFailure: ['error'],
  userRegistered: ['user'],
  logout: null
})

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  user: null,
  fetching: false,
  error: '',
  payload: null,
  payloadNew:null,
  LastViewedNotificationID: 0,
  MobileNotifications:null,
  username:null,
}

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getUser: state => state['login'].user,
  getLastViewedNotificationID: state => state['login'].LastViewedNotificationID,
  getMobileNotifications: state => state['login'].MobileNotifications,
  getFetching: state => state['login'].fetching,
  getError: state => state['login'].error
};

/* ------------- Reducers ------------- */

//request
export const request = (state, { payload }) => {
  return { ...state, fetching: true, payload }
}

export const rsarequest = (state, {payload}) => {
  return { ...state, fetching: true, payload }
}

//facebook
export const facebookdata = (state, {payload}) => {
  return { ...state, fetching: true, payload }
}

//google
export const googledata = (state, {payload}) => {
  return { ...state, fetching: true, payload }
}

//twitter
export const twitterdata = (state, {payload}) => {
  return { ...state, fetching: true, payload }
}

//instagram
export const instagramdata = (state, {payload}) => {
  return { ...state, fetching: true, payload}
}

// success
export const success = (state, {user}) => {
  return { ...state, user, fetching: false, }
}

// failure
export const failure = (state, {error}) => {
  return { ...state, fetching: false, error}
}

// register user
export const registered = (state, {user}) => {
  return { ...state, user, fetching: false }
}

// request
export const nrequest = (state, { payload }) => {
  return { ...state, fetching: true, payload }
}

// request OTP verification
export const otp = (state, {payload}) => {
  return {...state, fetching: true, payload }
};

// success
export const nsuccess = (state, {MobileNotifications,LastViewedNotificationID}) => {
  return { ...state, MobileNotifications,LastViewedNotificationID, fetching: false, }
}

//failure 
export const nfailure = (state, {error}) => {
  return { ...state, error, fetching: false, }
}

//logout
export const logout = (state) => {
  return { ...INITIAL_STATE}
}

export const defaultHandler = (state) => {
  return { ...state}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.FACEBOOK_REQUEST]: facebookdata,
  [Types.TWITTER_REQUEST]:  twitterdata,
  [Types.GOOGLE_REQUEST]: googledata,
  [Types.INSTAGRAM_REQUEST]: instagramdata,
  [Types.RSA_REQUEST]:   rsarequest,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.USER_REGISTERED]: registered,
  [Types.NOTIFICATION_REQUEST]: nrequest,
  [Types.NOTIFICATION_SUCCESS]: nsuccess,
  [Types.NOTIFICATION_FAILURE]: nfailure,
  [Types.VERIFY_OTP_LOGIN]: otp,
  [Types.LOGOUT]: logout,
  [ReduxSauceTypes.DEFAULT]: defaultHandler
});
