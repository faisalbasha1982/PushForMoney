import { createReducer, createActions, Types as ReduxSauceTypes } from 'reduxsauce';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getProfileRequest: ["payload"],
  profileSuccess: ['user'],
  profileFailure: ['error'],
  userRegistered: ['user'],
  logout: null
});

export const ProfileTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  user: null,
  fetching: false,
  error: '',
  payload: null
}

/* ------------- Selectors ------------- */

export const ProfileSelectors = {
  getUser: state => state['profile'].user,
  getFetching: state => state['profile'].fetching,
  getError: state => state['profile'].error
};

/* ------------- Reducers ------------- */

export const request = (state, { payload }) => {
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
  [Types.GET_PROFILE_REQUEST]: request,
  [Types.PROFILE_SUCCESS]: success,
  [Types.PROFILE_FAILURE]: failure,
  [Types.USER_REGISTERED]: registered,
  [Types.LOGOUT]: logout,
  [ReduxSauceTypes.DEFAULT]: defaultHandler
});
