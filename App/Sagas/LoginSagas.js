import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { path } from 'ramda';
import Api from '../Services/Api';
import LoginActions from '../Redux/LoginRedux';
import * as NavigationService from '../Navigation/NavigationService';

export function * rsaRequest(api,payload) {
  try{

    const response = yield call(api.rsa, payload.payload);

    console.tron.log("response from api call =",response);

    if (response.ok ) {
      console.tron.log("response="+response.data.StatusCode);
      console.tron.log("data="+response.data.Message);
    }


  }catch(error)
  {

  }
}

export function * LoginRequest(api,payload) {
  try{

  // make the call to the api
  const response = yield call(api.login, payload.payload);

  console.tron.log("response from api call =",response);

  if (response.status === 200) {
    // const resp = path(['data', 'items'], response)[0];
    console.tron.log("response data=",response.data);
    const token = response.data.LoginAccessToken;
    const userinfo = response.data.userinfo;

    try {
          AsyncStorage.setItem('token',token);
    }
    catch(error){
      console.tron.log('error='+error);
    }

    console.tron.log("login access token=",token);
    // do data conversion here if needed
    yield put(LoginActions.loginSuccess(userinfo));
    NavigationService.navigate('PushToEarnMoney');
  } else {
    yield put(LoginActions.loginFailure())
  }
}
catch(error) {
  console.tron.log("Error@login",error);
  console.log("error="+error);
}
}

