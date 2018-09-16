import { createReducer, createActions, Types as ReduxSauceTypes } from 'reduxsauce'
import { REHYDRATE } from 'redux-persist';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ["payload"],
  facebookData:["payload"],
  twitterRequest:["payload"],
  googleRequest:["payload"],
  rsaRequest:["payload"],
  loginSuccess: ['user'],  
  loginFailure: ['error'],
  notificationRequest: ['payload'],
  notificationSuccess: ['MobileNotifications', 'lastViewedNotificationID'],
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
  lastViewedNotificationID: -1,
  MobileNotifications:null,
}

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getUser: state => state['login'].user,
  getLastViewedNotificationID: state => state['login'].lastViewedNotificationID,
  getMobileNotifications: state => state['login'].MobileNotifications,
  getFetching: state => state['login'].fetching,
  getError: state => state['login'].error
};

/* ------------- Reducers ------------- */

export const request = (state, { payload }) => {
  return { ...state, fetching: true, payload }
}

export const rsarequest = (state, {payload}) => {
  return { ...state, fetching: true, payload }
}

export const facebookdata = (state, {payload}) => {
  return { ...state, fetching: true, payload }
}

export const googledata = (state, {payload}) => {
  return { ...state, fetching: true, payload }
}

export const twitterdata = (state, {payload}) => {
  return { ...state, fetching: true, payload }
}

export const success = (state, {user}) => {
  return { ...state, user, fetching: false, }
}

export const failure = (state, {error}) => {
  return { ...state, fetching: false, error}
}

export const registered = (state, {user}) => {
  return { ...state, user, fetching: false }
}

export const nrequest = (state, { payload }) => {
  return { ...state, fetching: true, payload }
}

export const nsuccess = (state, {MobileNotifications,lastViewedNotificationID}) => {
  return { ...state, MobileNotifications,lastViewedNotificationID, fetching: false, }
}

export const nfailure = (state, {error}) => {
  return { ...state, error, fetching: false, }
}

export const logout = (state) => {
  return { ...INITIAL_STATE}
}

export const defaultHandler = (state) => {
  return { ...state}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.FACEBOOK_DATA]: facebookdata,
  [Types.TWITTER_REQUEST]:  twitterdata,
  [Types.GOOGLE_REQUEST]: googledata,
  [Types.RSA_REQUEST]:   rsarequest,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.USER_REGISTERED]: registered,
  [Types.NOTIFICATION_REQUEST]: nrequest,
  [Types.NOTIFICATION_SUCCESS]: nsuccess,
  [Types.NOTIFICATION_FAILURE]: nfailure,
  [Types.LOGOUT]: logout,
  [ReduxSauceTypes.DEFAULT]: defaultHandler
});
