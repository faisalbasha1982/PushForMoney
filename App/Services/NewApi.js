// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import API_URL from './Api_url';
import { ObjectToQueryString } from "../Lib/Utilities";

// our "constructor"
const create = (baseURL = 'https://prod-33.westeurope.logic.azure.com:443') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const newapi = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json"
    },
    // 10 second timeout...
    timeout: 10000
  });

  // Apisauce has a feature where you can attach a handler to watch
  // all requests/response flowing through your api.  You can hook this up:
  newapi.addMonitor(console.tron.apisauce);

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setHeaders   =  headers => newapi.setHeaders(headers);

  const registerNew  =  body => newapi.post("/workflows/323809c537374426ba02f3e2c3be43e8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IcTbqosnIfKjBYobByn5CbmrDhrghcZdiPkv58CJNSI",body);

  const registerNewStag = body => 
  {

    newapi.setBaseURL("https://prod-25.westeurope.logic.azure.com:443");
    newapi.post("/workflows/f45f93eda26a4544bd64e5a5921ba3f3/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=m41x8NW3TiDEPe233npvncLYdEpvIDJnQOk4dDK_ScQ");

  };

  const forgotPass =  (body) => newapi.post("/workflows/ba352440699a4f83afdd89ec8d2d98f0/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mn8pocAEO81yHgwe6_R0cQT-LsiG1jMF4oW1gFW753E",body);

  const forgotPassStag = body => 
  {

    newapi.setBaseURL("https://prod-49.westeurope.logic.azure.com:443");
    newapi.post("/workflows/f45f93eda26a4544bd64e5a5921ba3f3/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=m41x8NW3TiDEPe233npvncLYdEpvIDJnQOk4dDK_ScQ");

  }

  const signUp2 = (body) => 
  {

    newapi.setBaseURL("https://prod-33.westeurope.logic.azure.com:443");
    newapi.post("/workflows/323809c537374426ba02f3e2c3be43e8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IcTbqosnIfKjBYobByn5CbmrDhrghcZdiPkv58CJNSI",body);

  }

  const verifyOTP = (body) => 
  {

    newapi.setBaseURL("https://prod-49.westeurope.logic.azure.com:443");
    newapi.post("/workflows/19bdce4bb7d740f586a5f86bf9014efa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LU6WJJr0yUTzSFLdH9TXCBdYPVh6x3SMGegOPX0OTfA", body);

  };

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    newapi,
    registerNew,
    setHeaders,
    forgotPass,
    signUp2,
    verifyOTP,
    registerNewStag,
    forgotPassStag
  }
}

// let's return back our create method as the default.
export default {
  create
}
