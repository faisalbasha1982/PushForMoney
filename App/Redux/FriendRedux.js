import { createReducer, createActions, Types as ReduxSauceTypes } from 'reduxsauce';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getFriendRequest: ["payload"],
  getArchive:["payload"],  
  friendSuccess: ['referral'],
  friendFailure: ['error'],
  userRegistered: ['user'],
  logout: null
});

export const FriendTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  referral: null,
  fetching: false,
  error: '',
  payload: null
}

/* ------------- Selectors ------------- */

export const FriendSelectors = {
  getReferral: state => state['friend'].referral,
  getFetching: state => state['friend'].fetching,
  getError: state => state['friend'].error
};

/* ------------- Reducers ------------- */

export const request = (state, { payload }) => {
  return { ...state, fetching: true, payload }
}

export const newrequest = (state, { payload }) => {
    return { ...state, fetching: true, payload }
  }

export const archiveSuccess = (state, { payload }) => {
    return { ...state, fetching: true, }
}

export const success = (state, { referral }) => {
  return { ...state, referral, fetching: false, }
}

export const failure = (state, { error }) => {
  return { ...state, fetching: false, error}
}

export const registered = (state, {referral}) => {
  return { ...state, referral, fetching: false }
}

export const logout = (state) => {
  return { ...INITIAL_STATE}
}

export const defaultHandler = (state) => {
  return { ...state}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_FRIEND_REQUEST]: request,
  [Types.GET_ARCHIVE]: newrequest,
  [Types.FRIEND_SUCCESS]: success,
  [Types.FRIEND_FAILURE]: failure,
  [Types.USER_REGISTERED]: registered,
  [Types.LOGOUT]: logout,
  [ReduxSauceTypes.DEFAULT]: defaultHandler
});
