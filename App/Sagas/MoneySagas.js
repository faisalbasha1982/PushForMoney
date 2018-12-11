import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage,Alert } from 'react-native';
import { path } from 'ramda';
import Api from '../Services/Api';
import MoneyActions from '../Redux/MoneyRedux';
import * as NavigationService from '../Navigation/NavigationService';
import  API_URL  from '../Services/Api_url';

function fetchJson(url,payload) {

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
        
        return response;

      });
  }

function fetchMoney(payload) {

    return fetchJson(`https://famobileutilityapiinterface${API_URL.slot}.azurewebsites.net/api/fnGetMonthlyEarningDetailsByReferrals?code=${API_URL.commonCode}`,payload);

}
  
export function * getMoneyMonth(api,action)
{
    try{
            const responseJson = yield call(fetchMoney,action.payload);
            yield put(MoneyActions.moneyEarningsSuccess(responseJson.monthlyEarningDetailsByReferrals,responseJson.ReferredPersonName,responseJson.TotalWorkedHours,responseJson.TotalEarnings));
        }
    catch(error)
    {
        yield put(MoneyActions.moneyEarningsFailure(error));
    }
}

function fetchsomething(url,payload) {
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
        
        return response;

      });
}

function fetchPerson(payload) {

     let url = `https://famobileutilityapiinterface${API_URL.slot}.azurewebsites.net/api/fnGetMobileUserReferralsMonthlyEarning?code=${API_URL.commonCode}`;

    return fetchsomething(url,payload);

}

export function * getPersonMonth(api,action)
{
    try {

         const responseJson = yield call(fetchPerson,action.payload);
         yield put(MoneyActions.moneySuccess(responseJson.monthlyEarningGroupbyReferrals,responseJson.TotalWorkedHours,responseJson.TotalEarnings));

    }
    catch(error)
    {
        yield put(MoneyActions.moneyFailure(error));
    }
}