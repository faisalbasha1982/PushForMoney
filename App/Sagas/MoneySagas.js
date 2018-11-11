import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage,Alert } from 'react-native';
import { path } from 'ramda';
import Api from '../Services/Api';
import MoneyActions from '../Redux/MoneyRedux';
import * as NavigationService from '../Navigation/NavigationService';
import  API_URL  from '../Services/Api_url';

function fetchJson(url,payload) {

    // console.log("inside fetchJson:");
    // console.tron.log("inside fetch json");    

    // Alert.alert("fetch Json="+payload +" url="+url);

    return fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(response => {
        
        Alert.alert("respons="+response.StatusCode);
        return response;

      });
  }

function fetchMoney(payload) {
      
    // console.log("inside fetch money");
    // console.tron.log("inside fetch money");

    // return fetchJson('https://famobileutilityapiinterfacedev.azurewebsites.net/api/fnGetMonthlyEarningDetailsByReferrals?code=l42IaaJ2JenjE0PMUveBbR26ODcefkEC3Mt7BmfVWR3VHZIvukGPJA==',payload);

    return fetchJson(`https://famobileutilityapiinterface${API_URL.slot}.azurewebsites.net/api/fnGetMonthlyEarningDetailsByReferrals?code=${API_URL.commonCode}`,payload);

}
  
export function * getMoneyMonth(api,action)
{
    try{
            // console.log("profile request new:");
            const responseJson = yield call(fetchMoney,action.payload);
            yield put(MoneyActions.moneyEarningsSuccess(responseJson.monthlyEarningDetailsByReferrals,responseJson.ReferredPersonName,responseJson.TotalWorkedHours,responseJson.TotalEarnings));
        }
    catch(error)
    {
        yield put(MoneyActions.moneyEarningsFailure(error));
    }
}

function fetchsomething(url,payload) {
    // Alert.alert("url inside fetch something="+typeof(payload));
    return fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(response => {
        
        // Alert.alert("response="+response);
        return response;

      });
}

function fetchPerson(payload) {

    // console.log("inside fetch profile");
    // console.tron.log("inside fetch profile");

    // return fetchJson('https://famobileutilityapiinterfacedev.azurewebsites.net/api/fnGetMobileUserReferralsMonthlyEarning?code=IofAP/n6plRm21PIxHdHbDS6/NygvDjl9I/SbEJjWc7E2WfJQRqfvA==',payload);
     let url = `https://famobileutilityapiinterfacestag.azurewebsites.net/api/fnGetMobileUserReferralsMonthlyEarning?code=${API_URL.commonCode}`;
    // Alert.alert("fetch person="+payload +" url="+url);

    return fetchsomething(url,payload);

    //return fetchJson(`https://famobileutilityapiinterfacestag.azurewebsites.net/api/fnGetMobileUserReferralsMonthlyEarning?code=${API_URL.commonCode}`,payload);
}

export function * getPersonMonth(api,action)
{
    try {

        console.tron.log("Money Request:"+action.payload.Month);
        // Alert.alert("action.payload="+action.payload);
         const responseJson = yield call(fetchPerson,action.payload);
         console.tron.log("responseJson="+responseJson.StatusCode);
         yield put(MoneyActions.moneySuccess(responseJson.monthlyEarningGroupbyReferrals,responseJson.TotalWorkedHours,responseJson.TotalEarnings));

    }
    catch(error)
    {
        yield put(MoneyActions.moneyFailure(error));
    }
}