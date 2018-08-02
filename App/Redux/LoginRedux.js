import { createReducer, createActions, Types as ReduxSauceTypes } from 'reduxsauce'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ["payload"],
  facebookData:["payload"],
  rsaRequest:["payload"],
  loginSuccess: ['user'],
  loginFailure: ['error'],
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
}

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getUser: state => state['login'].user,
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

export const success = (state, {user}) => {
  return { ...state, user, fetching: false, }
}

export const failure = (state, {error}) => {
  return { ...state, fetching: false, error}
}

export const registered = (state, {user}) => {
  return { ...state, user, fetching: false }
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
  [Types.RSA_REQUEST]:   rsarequest,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.USER_REGISTERED]: registered,
  [Types.LOGOUT]: logout,
  [ReduxSauceTypes.DEFAULT]: defaultHandler
});
