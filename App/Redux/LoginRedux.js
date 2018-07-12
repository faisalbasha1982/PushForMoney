import { createReducer, createActions, Types as ReduxSauceTypes } from 'reduxsauce'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ["payload"],
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
  error: ''
}

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getUser: state => state['login'].user,
  getFetching: state => state['login'].fetching,
  getError: state => state['login'].error
};

/* ------------- Reducers ------------- */

export const request = (state, action) => {
  return { ...state, fetching: true }
}

export const success = (state, {user}) => {
  return { ...state, user, fetching: false }
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
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.USER_REGISTERED]: registered,
  [Types.LOGOUT]: logout,
  [ReduxSauceTypes.DEFAULT]: defaultHandler
})
