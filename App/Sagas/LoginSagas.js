import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage, Alert } from 'react-native';
import { path } from 'ramda';
import Api from '../Services/Api';
import LoginActions from '../Redux/LoginRedux';
import * as NavigationService from '../Navigation/NavigationService';
import localStorage from 'react-native-sync-localstorage';
import * as AuthComponent from '../Components/AuthComponent';
import { NavigationActions } from 'react-navigation';
import API_URL from '../Services/Api_url';

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
  // const url = "https://famobileutilityapiinterfacedev.azurewebsites.net/api/fnMobileUserLogin?code=zybwff3HRf2XC/mYhHJtcZOeG5vkCOJhJOsXKUgHNAYu8tiG9tH2kw==";

  const url = `https://famobileutilityapiinterface${API_URL.slot}.azurewebsites.net/api/fnMobileUserLogin?code=${API_URL.commonCode}`;

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
      .catch((error) => console.error(error));
}


export function * googleRequest(api,payload)
{

  try {
    const response = yield call(api.mediaLogin, payload.payload);
    
    console.tron.log("response from api call =",response);
    console.tron.log("response ok=",response.ok);
    console.tron.log("response StatusCode=",response.data.StatusCode);

    if (response.ok && response.data.StatusCode === 200)
    {

          Alert.alert(
            'Google Login Successfull',
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

      NavigationService.navigate('PushToEarnRegisterProfile',{uname: '',pword:'', payload: payload.payload});

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
catch(error){
console.log("error="+error);
}

}

export function * twitterRequest(api,payload,userName) 
{

  Alert.alert("twitter request api call to server.....");
  console.log("twitter request api call to server..... with userName="+typeof(userName));  

  try {
          const response = yield call(api.mediaLogin, payload.payload);
          
          console.tron.log("response from api call =",response);
          console.tron.log("response ok=",response.ok);
          console.tron.log("response StatusCode=",response.data.StatusCode);
          console.tron.log("response username=",userName);
          console.log("username=",userName);

          if (response.ok && response.data.StatusCode === 200)
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

            console.log("going to pass userName="+userName);

            NavigationService.navigate('PushToEarnRegisterProfile',{uname: userName,pword:'', payload: payload.payload});

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
  catch(error){
      console.log("error="+error);
  }
  
}

export function * facebookRequest(api,payload,payloadNew) {

  Alert.alert("facebook request api call to server.....");

  try{
        const response = yield call(api.mediaLoginStag,payload.payload);
        
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


function fetchJson(url,payload) {

  console.log("inside fetchJson:");
  console.tron.log("inside fetch json");

  return  fetch(url,{
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(response => {

      if (!response.ok) {

        //Alert.alert(response.Message);
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      else
      {
        //Alert.alert(response.Message);
      }

      return response;
    });
}
function fetchNotification(payload) {
    
  console.log("inside fetch notification");
  console.tron.log("inside fetch notification");

  return fetchJson(`https://famobileutilityapiinterface${API_URL.slot}.azurewebsites.net/api/fnGetMobileNotificationWithUpdate?code=${API_URL.commonCode}`,payload);

  // return fetchJson('https://famobileutilityapiinterfacedev.azurewebsites.net/api/fnGetMobileNotificationWithUpdate?code=191modix7w8x/GF4bOY2PMAeOS8KmAr338nwwQqpVCYT4CKUfdP2Ig==',payload);

}

export function * notificationRequest(api,action) {

  try{
      console.log("notification new:");
      const responseJson = yield call(fetchNotification,action.payload);
      //yield put(MoneyActions.moneyEarningsSuccess(responseJson.monthlyEarningDetailsByReferrals,responseJson.ReferredPersonName,responseJson.TotalWorkedHours,responseJson.TotalEarnings));
      yield put(LoginActions.notificationSuccess(responseJson.MobileNotifications,responseJson.LastViewedNotificationID));
  }
  catch(error)
  {
      yield put(LoginActions.notificationFailure(error));
  }

}

function fetchJsonNew(url,payload) {

  console.log("login fetch json:");
  console.tron.log("login fetch json");  

  return  fetch(url,{
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: payload,
  })    
    .then((response) => response.json())
    .then(response => {

      if (response.StatusCode === 200) {

        console.tron.log("response="+response.StatusCode);
        AsyncStorage.setItem('token',response.LoginAccessToken);
  
      }
      else
      {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;

      }

      return response;
    });
}


function fetchLogin(payload,url) {

  console.tron.log("inside fetch Login function");
  console.log("url login="+url);

  return fetchJsonNew(url,payload);
}

export function * LoginRequest(api,action) {

  console.tron.log("inside login request");
  
  try{

    console.log("url="+API_URL.signUpLoginUrlNewStag);

    // make the call to the api
    const response = yield call(fetchLogin, action.payload, API_URL.signUpLoginUrlNewStag);

    if(response.StatusCode === 200)
    {
      // do data conversion here if needed
      yield put(LoginActions.loginSuccess(response.userinfo));
  
      AsyncStorage.getItem('language').then((language) => {
        NavigationService.navigate('TestPage',{language: language});
      });
  
    }
    
  }
  catch(error) 
  {
    console.tron.log("Error@login",error);
    console.log("error="+error);
    yield put(LoginActions.loginFailure());    
  }

}

