// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import API_URL from './Api_url';
import { ObjectToQueryString } from "../Lib/Utilities";

// our "constructor"
const create = (baseURL = API_URL.signUpLoginUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
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
  api.addMonitor(console.tron.apisauce);

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
  const setHeaders = headers => api.setHeaders(headers);
  const register = body => api.post("/api/fnMobileUserLogin?code=DbWj0tGuU5tWOY8vrtJih/iut9pAUkesWOFTuxnoCL0mDNPbmL3bfA==",body);
 
  const registerNew = body => 
  {

    api.setBaseURL("https://prod-33.westeurope.logic.azure.com:443");
    console.tron.log("setting baseurl as ---> https://prod-33.westeurope.logic.azure.com:443");
    api.post("/workflows/323809c537374426ba02f3e2c3be43e8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IcTbqosnIfKjBYobByn5CbmrDhrghcZdiPkv58CJNSI",body);
  };

  const login = (payload) => api.post("/api/fnMobileUserLogin?code=DbWj0tGuU5tWOY8vrtJih/iut9pAUkesWOFTuxnoCL0mDNPbmL3bfA==", payload);

  const verifyOTP = body => api.post("/api/fnOtpVerification?code=mZ7N5kRn1GS7jcRgB0CPAthEYoFf8jVdg7CtG9YhhNL1qj9FeRbePQ==", body);

  const verifyOTPFP = (body) => {
    api.setBaseURL("https://prod-36.westeurope.logic.azure.com:443");
    api.post("/workflows/64111a66520a4621a4f949f0d3a12413/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EcEqv1IaEYCat3Jx3zeQ8HLQzUiuqK8QAzP0R8cJcPw",body);
  };

  const getProfile = (body) => {
    api.setBaseURL('https://prod-15.westeurope.logic.azure.com:443');
    api.post("/workflows/f59e53901f7a46559be64f3a4605091e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7rKezGQLhIz7v96JpmKZ4zQ0BUUCLZMW0csfSUWM4JM",body);
  };

  const cardDetailsRequest = (body) => {
    api.setBaseURL('https://prod-48.westeurope.logic.azure.com:443');
    api.post("/workflows/603a11a2a15b407a8903f7a75b39f7f8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XzGng6yxY8XYiC5pTdC7rQphhH7Kr2tJgZ2pBZaZlAM",body);
  };

  const addProfile = () => {
    api.setBaseURL('https://prod-10.westeurope.logic.azure.com:443');
    api.post('/workflows/a23a19abad104ab1854363c6536802aa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=eLy-zN-st8ISnuzhGMyvqK7zKNKFqt0myhDf14achPw');
  }

  const apiCall = (url,payload) => api.post(url,payload);

  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})

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
    api,
    cardDetailsRequest,
    register,
    registerNew,
    setHeaders,
    login,
    getRoot,
    getRate,
    getUser,
    getProfile,
    verifyOTP,
    verifyOTPFP,
  }
}

// let's return back our create method as the default.
export default {
  create
}
