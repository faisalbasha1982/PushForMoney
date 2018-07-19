import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import NEWAPI from '../Services/NewApi'
import API_URL from '../Services/Api_url'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { LoginRequest } from './LoginSagas'
import { RegisterRequest, RegisterRequestNew, OtpRequest,forgotPasswordRequest, forgotPasswordOTPRequest } from './RegisterSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
const apiSignUp2 = DebugConfig.useFixtures ? FixtureAPI : NEWAPI.create();

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    // Login sagas
    takeLatest(LoginTypes.LOGIN_REQUEST, LoginRequest, api),

    // Register sagas
    takeLatest(RegisterTypes.REGISTER_REQUEST, RegisterRequest, api),

    // Register sagas
    takeLatest(RegisterTypes.REGISTER_REQUEST_NEW, RegisterRequestNew,apiSignUp2),

    //Register saga for verfiy OTP
    takeLatest(RegisterTypes.VERIFY_OTP, OtpRequest ,api),

    //Register saga for verfiy OTP
    takeLatest(RegisterTypes.VERIFY_OTP_FP, forgotPasswordOTPRequest ,api),

    //Register Saga for forgotPass
    takeLatest(RegisterTypes.FORGET_PASSWORD,forgotPasswordRequest,apiSignUp2),
        
   ])
}
