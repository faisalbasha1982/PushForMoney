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

function fetchFacebook(payload)
{
  const url = "https://famobileutilityapiinterfacedev.azurewebsites.net/api/fnMobileUserLogin?code=zybwff3HRf2XC/mYhHJtcZOeG5vkCOJhJOsXKUgHNAYu8tiG9tH2kw==";

    console.log("newpayload=",payload);

    fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }).then((response) =>  response.json())
      .then((responseJson) => {
          console.log("response=",responseJson.StatusCode);

          if (responseJson.StatusCode === 200) {

            Alert.alert(
                'Successfull',
                responseJson.Message,
                [
                    { text: 'OK', onPress:() => console.log('user exists ask me later')}
                ],
                {
                    cancelable: false
                }
            );

            console.tron.log("response data=",responseJson.Message);
                
            // output token to tron

            // do data conversion here if needed
            //yield put(RegisterActions.registerSuccess(mobileOTP));

            //Navigate to OTP page
            NavigationService.navigate('PushToEarnWelcomeScreen');
    
        } 
        else {
            //yield put(RegisterActions.registerFailure())
        }
      }
    )
      .catch((error) => console.error(error));}

export function * facebookRequest(api,payload,payloadNew) {

  Alert.alert("facebook request api call to server.....");

  try{
        const response = yield call(api.facebook,payload.payload);
        

    console.tron.log("response from api call =",response);
    console.tron.log("response ok=",response.ok);
    console.tron.log("response StatusCode=",response.data.StatusCode);

    if (response.ok && response.data.StatusCode === 200 ) 
    {

      Alert.alert(
        'Login Successfull',
        'Push To Earn Money Welcome Page',
        [                      
            {
              text: 'OK', 
              onPress: () => console.log('Ask me later Pressed')
            },                      
        ],
        {cancelable: false}
    );

    NavigationService.navigate('PushToEarnWelcomeScreen');
  }
  else 
  {
    yield put(LoginActions.loginFailure());    

    NavigationService.navigate('PushToEarnRegisterProfile',{uname: payloadNew.email,pword:'', payload: payloadNew.payload});

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
  //NavigationService.navigate('PushToEarnRegisterProfile');

  }

  
  }
  catch(error)
  {
    console.log(error);
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
    NavigationService.navigate('PushToEarnWelcomeScreen');

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

