import { createReducer, createActions, Types as ReduxSauceTypes } from 'reduxsauce';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getProfileRequest: ["payload"],
  updateFirstName:["payload"],
  changePassword:["payload"],
  changeMobile:["payload"],
  verifyOtpMobile:["payload"],
  profileSuccess: ['bankinfo'],
  profileFailure: ['error'],
  userRegistered: ['bankinfo'],
  logout: null
});

export const ProfileTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  bankinfo: null,
  user: null,
  fetching: false,
  error: '',
  payload: null
}

/* ------------- Selectors ------------- */

export const ProfileSelectors = {
  getBankInfo: state => state['profile'].bankinfo,
  getUser: state => state['profile'].user,
  getFetching: state => state['profile'].fetching,
  getError: state => state['profile'].error
};

/* ------------- Reducers ------------- */

export const request = (state, { payload }) => {
  return { ...state, fetching: true, payload }
}

export const newrequest = (state, { payload }) => {
    return { ...state, fetching: true, payload }
  }

export const changePassword = (state, {payload}) => {
    return { ...state, fetching: true, payload }
}

export const changeMobile = (state, {payload}) => {
    return { ...state, fetching:true, payload }
}

export const verifyOtpMobile = (state, {payload}) => {
    return { ...state, fetching:true, payload }
}

export const success = (state, {bankinfo}) => {
  return { ...state, bankinfo, fetching: false, }
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
  [Types.UPDATE_FIRST_NAME]: newrequest,
  [Types.CHANGE_PASSWORD]: changePassword,
  [Types.CHANGE_MOBILE]: changeMobile,
  [Types.VERIFY_OTP_MOBILE]: verifyOtpMobile,
  [Types.PROFILE_SUCCESS]: success,
  [Types.PROFILE_FAILURE]: failure,
  [Types.USER_REGISTERED]: registered,
  [Types.LOGOUT]: logout,
  [ReduxSauceTypes.DEFAULT]: defaultHandler
});
