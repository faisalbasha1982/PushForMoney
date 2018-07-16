import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage, Alert } from 'react-native';
import { path } from 'ramda';
import Api from '../Services/Api';
import RegisterActions from '../Redux/RegisterRedux';
import * as NavigationService from '../Navigation/NavigationService';

export function * RegisterRequest(api,payload) {
  try{

  // make the call to the api
  const response = yield call(api.register, payload.payload);

  console.tron.log("response from api call =",response);

  if (response.status === 200) {
    // const resp = path(['data', 'items'], response)[0];
    console.tron.log("response data=",response.data);
    const token = response.data.LoginAccessToken;
    const userinfo = response.data.userinfo;
    const statusCode = response.data.StatusCode;

    try {
          AsyncStorage.setItem('token',token);
    }
    catch(error){
      console.tron.log('error='+error);
    }

    console.tron.log("login access token=",token);
    // do data conversion here if needed
    yield put(RegisterActions.registerSuccess(userinfo));

    if( response.data.StatusCode === 200)
        NavigationService.navigate('PushToEarnRegisterProfile');
    else
        Alert.alert(
            'User already exists',
            'Please Login',
            [
                { text: 'Please Login', onPress:() => console.log('user exists ask me later')}
            ],
            {
                cancelable: false
            }
        )        

  } else {
    yield put(RegisterActions.registerFailure())
  }
}
catch(error) {
  console.tron.log("Error@login",error);
  console.log("error="+error);
}
}

export function* OtpRequest(api,) {

}