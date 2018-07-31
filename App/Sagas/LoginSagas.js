import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage, Alert } from 'react-native';
import { path } from 'ramda';
import Api from '../Services/Api';
import LoginActions from '../Redux/LoginRedux';
import * as NavigationService from '../Navigation/NavigationService';
import localStorage from 'react-native-sync-localstorage';
import * as AuthComponent from '../Components/AuthComponent';

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

    // let signUpToken = localStorage.getItem('token');

    // console.log("signUpToken=",typeof(signUpToken));

    // console.tron.log("signUpToken=",signUpToken);

    // if(signUpToken !== '')
    // {

    //   let newPayload = {
    //       "AuthenticationData": AuthComponent.authenticationData("en")
    //   };

    //   NavigationService.navigate('PushToEarnOTPLogin',newPayload);
    // }
    // else
    // {

          // make the call to the api
    const response = yield call(api.login, payload.payload);

    console.tron.log("response from api call =",response);
    console.tron.log("response ok=",response.ok);
    console.tron.log("response StatusCode=",response.data.StatusCode);

    if (response.ok && response.data.StatusCode === 200 ) {

      Alert.alert(
        'Login Successfull',
        'Push To Earn Money Page',
        [                      
            {
              text: 'OK', 
              onPress: () => console.log('Ask me later Pressed')
            },                      
        ],
        {cancelable: false}
    );

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

  }   
  else 
  {
    yield put(LoginActions.loginFailure());    

    Alert.alert(
      'Login Failed',
      ""+response.data.Message,
      [                      
          {
            text: 'OK', 
            onPress: () => console.log('Ask me later Pressed')
          },                      
      ],
      {cancelable: false}
  );
  }
}


//}
catch(error) {
  console.tron.log("Error@login",error);
  console.log("error="+error);
}
}

