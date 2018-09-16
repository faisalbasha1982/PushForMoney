import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage,Alert } from 'react-native';
import { path } from 'ramda';
import Api from '../Services/Api';
import MoneyActions from '../Redux/MoneyRedux';
import * as NavigationService from '../Navigation/NavigationService';

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
      .then(response => {

        if (!response.ok) {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
  
        return response.json();
      });
  }

  function fetchMoney(payload) {
      
    console.log("inside fetch money");
    console.tron.log("inside fetch money");

    return fetchJson('https://famobileutilityapiinterfacedev.azurewebsites.net/api/fnGetMonthlyEarningDetailsByReferrals?code=l42IaaJ2JenjE0PMUveBbR26ODcefkEC3Mt7BmfVWR3VHZIvukGPJA==',payload);
  }
  
export function * getMoneyMonth(api,action)
{
    try{
            console.log("profile request new:");
            const responseJson = yield call(fetchMoney,action.payload);
            yield put(MoneyActions.moneyEarningsSuccess(responseJson.monthlyEarningDetailsByReferrals,responseJson.ReferredPersonName,responseJson.TotalWorkedHours,responseJson.TotalEarnings));
        }
    catch(error)
    {
        yield put(MoneyActions.moneyEarningsFailure(error));
    }
}

function fetchPerson(payload) {
    console.log("inside fetch profile");
    console.tron.log("inside fetch profile");

    return fetchJson('https://famobileutilityapiinterfacedev.azurewebsites.net/api/fnGetMobileUserReferralsMonthlyEarning?code=IofAP/n6plRm21PIxHdHbDS6/NygvDjl9I/SbEJjWc7E2WfJQRqfvA==',payload);
}

export function * getPersonMonth(api,action)
{
    try {

        console.log("profile request new:");
        const responseJson = yield call(fetchPerson,action.payload);
        yield put(MoneyActions.moneySuccess(responseJson.monthlyEarningGroupbyReferrals,responseJson.TotalWorkedHours,responseJson.TotalEarnings));

    }
    catch(error)
    {
        yield put(MoneyActions.moneyFailure(error));
    }
}