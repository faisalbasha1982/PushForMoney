import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { path } from 'ramda';
import Api from '../Services/Api';
import ProfileActions from '../Redux/ProfileRedux';
import * as NavigationService from '../Navigation/NavigationService';

function getProfile(payload)
{
    const url = "https://prod-15.westeurope.logic.azure.com:443/workflows/f59e53901f7a46559be64f3a4605091e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7rKezGQLhIz7v96JpmKZ4zQ0BUUCLZMW0csfSUWM4JM";

    console.log("profile payload=",payload);

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

        } 
        else {
            //yield put(RegisterActions.registerFailure())
        }
      }
    )
      .catch((error) => console.error(error));
}

export function * ProfileRequest(api,action) {
  try{

    console.log("api="+api);

    // make the call to the api
    const response = yield call(getProfile, action.payload);    
    console.tron.log("response from api call =",response);

    if (response.ok) {

        console.tron.log("response data=",response.data);
        const mobileUserBankDetailsInfo = response.data.MobileUserBankDetails;

        // do data conversion here if needed
        yield put(ProfileActions.profileSuccess(mobileUserBankDetailsInfo));

    } 
    else {
        yield put(ProfileActions.profileFailure());
    }
}
catch(error) {
  console.tron.log("Error@login",error);
  console.log("error="+error);
}
}

export function * firstNameUpdate(api,action) {

    try
    {
        console.log("api="+api);

        // make the call to the api
        const response = yield call(api.updateName, action.payload);
    
        console.tron.log("response from api call ="+response);
        console.log("repsonse from api call="+response);
    
        if (response.ok) {
            // const resp = path(['data', 'items'], response)[0];
            console.tron.log("response data=",response.data);
            const token = response.data.LoginAccessToken;
            const userinfo = response.data.userinfo;
        
            console.tron.log("login access token=",token);
            // do data conversion here if needed
            yield put(ProfileActions.profileSuccess(userinfo));
            NavigationService.navigate('PushToEarnMoney');
        } else {
            yield put(ProfileActions.profileFailure());
        }
    }
    catch(error) {
        console.tron.log("error="+error);
    }
   
} 

export function * changePassword(api,action)
{
    try
    {
        console.log("api="+api);

        // make the call to the api
        const response = yield call(api.changePassword, action.payload);
    
        console.tron.log("response from api call ="+response);
        console.log("repsonse from api call="+response);
    
        if (response.ok) {
            // const resp = path(['data', 'items'], response)[0];
            console.tron.log("response data=",response.data);
            const token = response.data.LoginAccessToken;
            const userinfo = response.data.userinfo;
    
            console.tron.log("login access token=",token);
            // do data conversion here if needed
            yield put(ProfileActions.profileSuccess(userinfo));
            NavigationService.navigate('PushToEarnMoney');
        } else {
            yield put(ProfileActions.profileFailure());
        }
    }
    catch(error) {
        console.tron.log("error="+error);
    }
}

export function * changeMobile(api,action)
{
    try
    {
        console.log("api="+api);

        // make the call to the api
        const response = yield call(api.changeMobile, action.payload);
    
        console.tron.log("response from api call ="+response);
        console.log("repsonse from api call="+response);
    
        if (response.ok) {
            // const resp = path(['data', 'items'], response)[0];
            console.tron.log("response data=",response.data);
            const token = response.data.LoginAccessToken;
            const userinfo = response.data.userinfo;
    
            console.tron.log("login access token=",token);
            // do data conversion here if needed
            yield put(ProfileActions.profileSuccess(userinfo));
            NavigationService.navigate('PushToEarnMoneyOTP');
        } else {
            yield put(ProfileActions.profileFailure());
        }
    }
    catch(error) {
        console.tron.log("error="+error);
    }
}

export function * verifyMobileOtpRequest(api,action)
{
    try
    {
        console.log("api="+api);

        // make the call to the api
        const response = yield call(api.verifyOTPMobile, action.payload);
    
        console.tron.log("response from api call ="+response);
        console.log("repsonse from api call="+response);
    
        if (response.ok) {
            // const resp = path(['data', 'items'], response)[0];
            console.tron.log("response data=",response.data);
            const token = response.data.LoginAccessToken;
            const userinfo = response.data.userinfo;
        
            console.tron.log("login access token=",token);
            // do data conversion here if needed
            yield put(ProfileActions.profileSuccess(userinfo));
            NavigationService.navigate('PushToEarnMoneyOTP');
        } else {
            yield put(ProfileActions.profileFailure());
        }
    }
    catch(error) {
        console.tron.log("error="+error);
    }
}