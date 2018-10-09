import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage, Alert } from 'react-native';
import { path } from 'ramda';
import Api from '../Services/Api';
import ProfileActions from '../Redux/ProfileRedux';
import * as NavigationService from '../Navigation/NavigationService';
import  API_URL  from '../Services/Api_url';

// export function * getProfile(action)
// {
//     const url ="https://prod-15.westeurope.logic.azure.com:443/workflows/f59e53901f7a46559be64f3a4605091e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7rKezGQLhIz7v96JpmKZ4zQ0BUUCLZMW0csfSUWM4JM";
//     console.log("profile payload=",action.payload);

//     let Gresponse = false;
//     let data = null;

//     fetch(url,{
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(action.payload),
//     }).then((response) =>  response.json())
//       .then((responseJson) => {

//           console.log("response=",responseJson.StatusCode);

//           if (responseJson.StatusCode === 200)
//           {

//             Alert.alert(
//                 'Successfull',
//                 responseJson.Message,
//                 [
//                     { text: 'OK', onPress:() => console.log('user exists ask me later')}
//                 ],
//                 {
//                     cancelable: false
//                 }
//             );

//             console.tron.log("response data=",responseJson.Message);
//             console.tron.log("response data MobileUserBankDetailId="+responseJson.MobileUserBankDetails.MobileUserBankDetailId);

//             console.log("response data MobileUserBankDetailId="+JSON.stringify(responseJson.MobileUserBankDetails));

//             Gresponse = true;
//             data = responseJson.MobileUserBankDetails;
//             console.log("1st Gresponse="+Gresponse);

//           }
//         else 
//         {
//             Gresponse = false;
//             data = null;
//         }

//       }
//     )
//     .catch((error) => console.error(error));

//     console.log("Gresponse="+Gresponse);

// }

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
  
        //Alert.alert(response.Message);

        // if (!response.ok) {
  
        //   Alert.alert(response.Message);
        //   const error = new Error(response.statusText);
        //   error.response = response;
        //   throw error;
        // }
        // else
        // {
        //   Alert.alert(response.Message);
        // }
  
        return response;
      });
  }
  
  function fetchProfile(payload) {
      
    console.log("inside fetch profile");
    console.tron.log("inside fetch profile url="+API_URL.staging.laMobileGetUserData);

    // return fetchJson('https://prod-17.westeurope.logic.azure.com:443/workflows/82682ea087a442f0a12c00f1b9c08e7d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MkoqJpsrFiWGnELB49KFyYbnTO5BCa4hntQA_83UJfo',payload);

    return fetchJson(API_URL.staging.laMobileGetUserData,payload);
  }
  

export function * ProfileRequestNew(api,action)
{
    try{
            console.log("profile request new:");
            console.tron.log("profile request new");
            const responseJson = yield call(fetchProfile,action.payload);

             if(responseJson.StatusCode === 200)
                yield put(ProfileActions.profileSuccess(responseJson.MobileUserBankDetails,responseJson.FirstName,responseJson.LastName,responseJson.Email,responseJson.MobileNumber));
        }
    catch(error)
    {
        yield put(ProfileActions.profileFailure());
    }
}

function fetchUpdateFirstName(payload){
    // return fetchJson("https://prod-28.westeurope.logic.azure.com:443/workflows/8758d6d96f2145cbaaa86e5d032392dc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6pUlAjHE5FumdVSxpK_uevwWemeMwM9ODipl2oHvWZE",payload);

    return fetchJson(API_URL.staging.laMobileUserUpdateFirstAndLastName,payload);
    // return fetchJson("https://prod-08.westeurope.logic.azure.com:443/workflows/7c2e8eefb0424459b71d467870a7b76b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vvrQGf09fHfgbYFY0Mk3a27Shh0oXMTWfP9bFhxARbI",payload);
}

export function * firstNameUpdate(api,action) {

    try{
        console.log("profile request new:");
        const responseJson = yield call(fetchUpdateFirstName,action.payload);
        yield put(ProfileActions.profileSuccess());
        Alert.alert("Successfully!  " + responseJson.Message);
    }
    catch(error)
    {
        yield put(ProfileActions.profileFailure());
    }
   
} 

function fetchChangePassword(payload) {
      
    console.log("inside fetch change Password");
    console.tron.log("inside fetch change Password");

    // return fetchJson('https://famobileutilityapiinterfacedev.azurewebsites.net/api/fnChangePassword?code=lyD3B1naoL9SLo01LEz2Gxc8YOCnk66K1JY3XR6aNoP8M8PsrKKVTw==',payload);

    return fetchJson(`https://famobileutilityapiinterface${API_URL.slot}.azurewebsites.net/api/fnChangePassword?code=${API_URL.commonCode}`,payload);
}

export function * changePassword(api,action)
{
    try
    {
        console.log("change password api="+api);
        // make the call to the api
        const response = yield call(fetchChangePassword, action.payload);
        Alert.alert(response.Message);
        //yield put(ProfileActions.profileSuccess());
    }     
    catch(error) {
        //yield put(ProfileActions.profileFailure());
    }
}

function fetchChangeMobile(payload) {
    console.log("fetching json");

    // return fetchJson('https://famobileutilityapiinterfacedev.azurewebsites.net/api/fnMobileUserUpdateMobileNumber?code=7lRB5YONhRDarD0KWZ9Fke/YRDDbG6cJ9fQCiOcsZ4xDi0pX/abgqg==',payload);

    return fetchJson(`https://famobileutilityapiinterface${API_URL.slot}.azurewebsites.net/api/fnMobileUserUpdateMobileNumber?code=${API_URL.commonCode}`,payload);

}

export function * changeMobile(api,action)
{
    try
    {
        console.log("change mobile api="+api);

        // make the call to the api
        const response = yield call(fetchChangeMobile, action.payload);
        Alert.alert(response.Message);
        yield put(ProfileActions.verifyOtpMobileSuccess(response.StatusCode));        
        
    } 
    catch(error) {
        //yield put(ProfileActions.profileFailure());
        Alert.alert("Phone Number Incorrect");
    }
}

function fetchOTPMobile(payload) {

    // return fetchJson('https://prod-49.westeurope.logic.azure.com:443/workflows/19bdce4bb7d740f586a5f86bf9014efa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LU6WJJr0yUTzSFLdH9TXCBdYPVh6x3SMGegOPX0OTfA',payload);

    return fetchJson(API_URL.staging.laMobileOtpVerification,payload);    
    //return fetchJson('https://prod-21.westeurope.logic.azure.com:443/workflows/fc0efd237ccb46268c5353e97d791a7e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Z2LNFPTtuCNVTEq9jcpwaKsLGgOjYaQOuiwoJFZenbY',payload);

}

export function * verifyMobileOtpRequest(api,action)
{
    try
    {
        console.log("change password api="+api);
        // make the call to the api
        const response = yield call(fetchOTPMobile, action.payload);
        Alert.alert(response.Message);
        yield put(ProfileActions.profileSuccess());
    }     
    catch(error) {
        yield put(ProfileActions.profileFailure());
    }
}