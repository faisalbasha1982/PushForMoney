import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage,Alert } from 'react-native';
import { path } from 'ramda';
import Api from '../Services/Api';
import CardDetailsActions from '../Redux/CardDetailsRedux';
import * as NavigationService from '../Navigation/NavigationService';
import  API_URL  from '../Services/Api_url';

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

    //   Alert.alert(response.Message);

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

function fetchCardDetails(payload) {
    
//   console.log("inside fetch profile");
  //console.tron.log("inside fetch profile");

  // return fetchJson('https://prod-48.westeurope.logic.azure.com:443/workflows/603a11a2a15b407a8903f7a75b39f7f8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XzGng6yxY8XYiC5pTdC7rQphhH7Kr2tJgZ2pBZaZlAM',payload);
  // return fetchJson('https://prod-35.westeurope.logic.azure.com:443/workflows/f9fc0fc1506c45259ca27316a30bcad5/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7H-I1UBMFhDfqGO0tCiCa_oV7IlPHGeARkTh6_sk-h8',payload);

  //staging
  return fetchJson(API_URL.staging.laMobileStoreUserBankDetails,payload);
  

}


export function * cardDetailsRequest(api,action)
{
  
  try{
        // console.log("profile request new:");
          const responseJson = yield call(fetchCardDetails,action.payload);          
          yield put(CardDetailsActions.cardDetailsSuccess(responseJson.MobileUserBankDetails));
        //   Alert.alert("SAVED CARD DETAILS!!");
      }
  catch(error)
  {
      yield put(CardDetailsActions.cardDetailsFailure());
      Alert.alert("NOT SAVED CARD DETAILS!!");
  }
}



