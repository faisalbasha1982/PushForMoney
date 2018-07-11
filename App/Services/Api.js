// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import API_URL from './Api_url';
import { ObjectToQueryString } from "../Lib/Utilities";

// our "constructor"
const create = (baseURL = API_URL.signUpURLE) => {
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

  const register = body => api.post("/workflows/ca7d95ebc3a14f65abf1e1d740312267/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1eztFWraDyq9Ag46o4NiJNYvc0c9t3DOVpEemWqFkfE",body);

  // const login = (email, password) => 
  //   api.post(,{email, password});

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
    register,
    setHeaders,    
    getRoot,
    getRate,
    getUser
  }
}

// let's return back our create method as the default.
export default {
  create
}
