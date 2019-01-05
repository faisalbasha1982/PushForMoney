const key = '!@M*;-kATy_vcUkLq/U))QD`XL5Sg`5D';
             //!@M*;-kATy_vcUkLq/U))QD`XL5Sg`5D
const liClientId = '81td97f0ibm93v';
const liState = 'DCEeFWf45A53sdfKef424';
const liRedirectUri = 'https://www.example.com/auth/linkedin';
const slot = 'stag';

const Api_url = {
  slot: 'prod',
  functionURL:`https://faazureapiinterface${slot}.azurewebsites.net/api/fnMoblieLogin?code=${key}`,
  LoginUrl: `https://faazureapiinterface${slot}.azurewebsites.net/api/fnMoblieLogin?code=${key}`,
  LoginUrlStag: `https://faazureapiinterfacestag.azurewebsites.net/api/fnMoblieLogin?code=${key}`,
  LinkedUrl: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${liClientId}&redirect_uri=${liRedirectUri}&state=${liState}&scope=r_basicprofile`,
  AuthId: 'JS#236734',
  signUpURL:  'https://prod-36.westeurope.logic.azure.com:443/workflows/6c7084b18aa14457a7d1645153ced3e7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TmLOvpwMBYjrnKmhdDzc-EY2gIgPIxSvGsTGbk66rgM',
  signUpURLP: 'https://prod-27.westeurope.logic.azure.com:443/workflows/ca7d95ebc3a14f65abf1e1d740312267/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1eztFWraDyq9Ag46o4NiJNYvc0c9t3DOVpEemWqFkfE',
  signUpURL1: 'https://prod-54.westeurope.logic.azure.com:443/workflows/fad35cb3bf804958806170aab090f5fd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PIqV4C0NMg6yGjaBeaOMl8oLM8DK8v8NilOL-4azW7A',
  signUpURLA: 'http://prod-54.westeurope.logic.azure.com:443/workflows/fad35cb3bf804958806170aab090f5fd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PIqV4C0NMg6yGjaBeaOMl8oLM8DK8v8NilOL-4azW7A',
  signUpURLE: 'https://famobileutilityapiinterfacedev.azurewebsites.net',
  commonCode: '!@M*;-kATy_vcUkLq/U))QD`XL5Sg`5D',
  securityKey: 'VyhoMoGxi25xn/Tc',
  rsaKey: '0iFWNUIGY2Td+N3g/oIa1hUjHyZ2X9OcLhUtNlaa33nQuG8JKdfCAR5JGN2fa2RgOz018OU+HQTwPxKH9Lv0I6//B6JcClb6pr8wO6V6LYkWhnjADZc476TdqiD/jIPK3czKxbf2DWt2IXJqD+6aEEjRlH8u18bpXfSwXvtocsiuPKLwwfb0jMGsW2YuycoFKAYovuyXaAB4ra+ID6R2fH2CwGRlYxcGOsWEdhP7zFA0YwVwFLx96f/H43mz+AZisnwK/txXXQM4fcaLXXktZzSDwwanGbaYJe3o9SGACz607Q0v0mFMP8z9kyL3700TKyd35M5j2Qryk8OW3OVpLQ==',
  signUpLoginUrl: 'https://famobileutilityapiinterfacedev.azurewebsites.net',
  signUpLoginUrlNew: `https://famobileutilityapiinterface${slot}.azurewebsites.net/api/fnMobileUserLogin?code=${key}`,
  signUpLoginUrlNewStag: `https://famobileutilityapiinterface${slot}.azurewebsites.net/api/fnMobileUserLogin?code=${key}`,
  mobileSignUpLoginUrlNewStag: `https://famobileutilityapiinterface${slot}.azurewebsites.net/api/fnMobileUserLoginByMobile?code=${key}`,
  mobileUserLoginOTP:`https://famobileutilityapiinterface${slot}.azurewebsites.net/api/fnMobileUserLoginOtp?code=${key}`,
  otpURL: 'https://famobileutilityapiinterfacedev.azurewebsites.net/api/fnOtpVerification?code=mZ7N5kRn1GS7jcRgB0CPAthEYoFf8jVdg7CtG9YhhNL1qj9FeRbePQ==',  
  signupURL2: 'https://prod-33.westeurope.logic.azure.com:443',
  profileURL: 'https://prod-15.westeurope.logic.azure.com:443/workflows/f59e53901f7a46559be64f3a4605091e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7rKezGQLhIz7v96JpmKZ4zQ0BUUCLZMW0csfSUWM4JM',

  development:{
    laMobileGetUserData:'https://prod-15.westeurope.logic.azure.com:443/workflows/f59e53901f7a46559be64f3a4605091e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7rKezGQLhIz7v96JpmKZ4zQ0BUUCLZMW0csfSUWM4JM',
    laMobileGetUserReferralsWithStatus:'https://prod-07.westeurope.logic.azure.com:443/workflows/0604ad5d855444be85a5137166c67d25/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Lh0jJoxB6xqbZCq_j9xMONuPuBOMOl_F_oZrwIEBckY',
    laMobileOtpVerification:'https://prod-49.westeurope.logic.azure.com:443/workflows/19bdce4bb7d740f586a5f86bf9014efa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LU6WJJr0yUTzSFLdH9TXCBdYPVh6x3SMGegOPX0OTfA',
    laMobilePushForJob:'https://prod-27.westeurope.logic.azure.com:443/workflows/ca7d95ebc3a14f65abf1e1d740312267/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1eztFWraDyq9Ag46o4NiJNYvc0c9t3DOVpEemWqFkfE',
    laMobileReferralEmailSummary:'',
    laMobileReferralsAdd:'https://prod-10.westeurope.logic.azure.com:443/workflows/a23a19abad104ab1854363c6536802aa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=eLy-zN-st8ISnuzhGMyvqK7zKNKFqt0myhDf14achPw',
    laMobileReferralsFinishedStatusUpdate:'',
    laMobileReferralsUpdateWaitingStatus:'',
    laMobileSaveNewPassword:'https://prod-36.westeurope.logic.azure.com:443/workflows/64111a66520a4621a4f949f0d3a12413/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EcEqv1IaEYCat3Jx3zeQ8HLQzUiuqK8QAzP0R8cJcPw',
    laMobileSendForgotPasswordOTP:'https://prod-33.westeurope.logic.azure.com:443/workflows/ba352440699a4f83afdd89ec8d2d98f0/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mn8pocAEO81yHgwe6_R0cQT-LsiG1jMF4oW1gFW753E',
    laMobileStoreUserBankDetails:'https://prod-48.westeurope.logic.azure.com:443/workflows/603a11a2a15b407a8903f7a75b39f7f8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XzGng6yxY8XYiC5pTdC7rQphhH7Kr2tJgZ2pBZaZlAM',
    laMobileUserResendSignupOTP:'https://prod-56.westeurope.logic.azure.com:443/workflows/9834ab95eb784c9b87f174acdd1f87b0/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LenubOpJgzckOgeOAbq12BS9_0JFjtGUYogtgKYRlRE',
    laMobileUserSignUp:'https://prod-33.westeurope.logic.azure.com:443/workflows/323809c537374426ba02f3e2c3be43e8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IcTbqosnIfKjBYobByn5CbmrDhrghcZdiPkv58CJNSI',
    laMobileUserUpdateFirstAndLastName:'https://prod-28.westeurope.logic.azure.com:443/workflows/8758d6d96f2145cbaaa86e5d032392dc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6pUlAjHE5FumdVSxpK_uevwWemeMwM9ODipl2oHvWZE',
  },

  staging: {
    laMobileGetUserData:'https://prod-17.westeurope.logic.azure.com:443/workflows/82682ea087a442f0a12c00f1b9c08e7d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MkoqJpsrFiWGnELB49KFyYbnTO5BCa4hntQA_83UJfo',
    laMobileGetUserReferralsWithStatus:'https://prod-31.westeurope.logic.azure.com:443/workflows/40dac089a8e04e9f9593c6a5d2c2f792/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3fzTiTB9UtL85SYxL6nONm81gx5VvmmgDEVNcBMJffo',
    laMobileOtpVerification:'https://prod-21.westeurope.logic.azure.com:443/workflows/fc0efd237ccb46268c5353e97d791a7e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Z2LNFPTtuCNVTEq9jcpwaKsLGgOjYaQOuiwoJFZenbY',
    laMobilePushForJob:'https://prod-44.westeurope.logic.azure.com:443/workflows/5e1a2ff558d84904bfac570d6a3c5550/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tOH9W4lVhyyt71TqrzAc78wZ8SWZmKiKcAzfWJda-i8',
    laMobileReferralEmailSummary:'',
    laMobileReferralsAdd:'https://prod-11.westeurope.logic.azure.com:443/workflows/26cd76a2f9624eb4b0edacd9a8bbeb58/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ujtBhMzB55RiT8g2X3lkG3eTuMDX5dpegXHaq6MXGrs',
    laMobileReferralsFinishedStatusUpdate:'',
    laMobileReferralsUpdateWaitingStatus:'',
    laMobileSaveNewPassword:'https://prod-12.westeurope.logic.azure.com:443/workflows/d2646d57cf7d447f960d7e46684db4cd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ADncEusH2PpqjGoYT_L20L_Wxs9sUuVryh9Z5cJJsS4',
    laMobileSendForgotPasswordOTP:'https://prod-49.westeurope.logic.azure.com:443/workflows/4fe4201d988446d3b2f22256e739734b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Xzu3gkB27h_7wuT-0AmL-MwdclNEl69dZO0ld-9Rsb8',
    laMobileStoreUserBankDetails:'https://prod-35.westeurope.logic.azure.com:443/workflows/f9fc0fc1506c45259ca27316a30bcad5/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7H-I1UBMFhDfqGO0tCiCa_oV7IlPHGeARkTh6_sk-h8',
    laMobileUserResendSignupOTP:'https://prod-27.westeurope.logic.azure.com:443/workflows/75cdda7a4d1e412f8b6fbb00f099cdbc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=FY6KovQIbuksZrM6Eh00bISPC1oUTrSxFKKhCbyRwpY',
    laMobileUserSignUp:'https://prod-25.westeurope.logic.azure.com:443/workflows/f45f93eda26a4544bd64e5a5921ba3f3/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=m41x8NW3TiDEPe233npvncLYdEpvIDJnQOk4dDK_ScQ',
    laMobileUserUpdateFirstAndLastName:'https://prod-08.westeurope.logic.azure.com:443/workflows/7c2e8eefb0424459b71d467870a7b76b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vvrQGf09fHfgbYFY0Mk3a27Shh0oXMTWfP9bFhxARbI',
    laMobileLogin: 'https://prod-86.westeurope.logic.azure.com:443/workflows/8b5d3db1b4594eefab151b1e43ff990d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yk985VysIcBxLyxA3jeqIRpLyWg_MTNfaj2lJXZXk5k',
  },

  production: {
    laMobileGetUserData:'https://prod-56.westeurope.logic.azure.com:443/workflows/407cb218c8aa490ba1ba179d75cc1d79/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-gh6Bhb4mWQ6ZBOwJiklh_AUlsvLHDvWykbjcFUJGAQ',
    laMobileGetUserReferralsWithStatus:'https://prod-53.westeurope.logic.azure.com:443/workflows/b8757c10abe14e53aec26fd17a88414e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=bbdSqV0j04W163qZMb0wItDw7_3R0pakBsTJsAbyEvI',
    laMobileOtpVerification:'https://prod-30.westeurope.logic.azure.com:443/workflows/60a7ca1195674f0a9854aaafb18d53b8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tz8DR3yeAL4mCHxEc7iSeXk0enokVoIXofB9Ccxq2BE',
    laMobilePushForJob:'https://prod-54.westeurope.logic.azure.com:443/workflows/fad35cb3bf804958806170aab090f5fd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PIqV4C0NMg6yGjaBeaOMl8oLM8DK8v8NilOL-4azW7A',
    laMobileReferralEmailSummary:'',
    laMobileReferralsAdd:'https://prod-44.westeurope.logic.azure.com:443/workflows/fe6b7f85abef48e7ae9c1a6107319c24/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=v7QaOeK1VKNvfVX6IM4QdKjMufgq_62a7JIaX2z5vcw',
    laMobileReferralsFinishedStatusUpdate:'',
    laMobileReferralsUpdateWaitingStatus:'',
    laMobileSaveNewPassword:'https://prod-61.westeurope.logic.azure.com:443/workflows/f7ef751ce21946798a64a5e9252f5fc6/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0xdKSZIjo6qLePv__w-cYdc94PKuI9ymIM9uB5129ZU',
    laMobileSendForgotPasswordOTP:'https://prod-20.westeurope.logic.azure.com:443/workflows/3235ccf91d4f49b9afa33c97d5cbb674/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=P_vlU-H4OrP8xlzW8iwCrj-z-D7oU03VPy6ifVKYK1U',
    laMobileStoreUserBankDetails:'https://prod-57.westeurope.logic.azure.com:443/workflows/94d298aa90ce4b219ddbc6f03b89fa7c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=n2ZzrSfNi2RuaLaNHNQAIUVyWt6HyHB1gd_l3sX7YH4',
    laMobileUserResendSignupOTP:'https://prod-07.westeurope.logic.azure.com:443/workflows/5f799b7e5a134e239ce80342581d2086/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cJbkkH398PER9YA4ADbnLSMOWpK_l-W320Ih2_amBB0',
    laMobileUserSignUp:'https://prod-11.westeurope.logic.azure.com:443/workflows/414fe87516954f10bfb113080884a1a1/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MYG8xyuZckNUMcZgKaoEejY8lJM_BuftuFPsN_rlI-o',
    laMobileUserUpdateFirstAndLastName:'https://prod-22.westeurope.logic.azure.com:443/workflows/2754340262cc4e9686ca29ba340c23d7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OLrIKI6ReKkbLsF8ZDdK5072gneNDUM1h8CO4MT7Edg',
    laMobileLogin:'https://prod-44.westeurope.logic.azure.com:443/workflows/b7ede7b5fcd546938d0e4826897331f1/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rGA6j3o6pBuhOE43CtL4QqbvSVL7kAiGEP_Gdy-q5o4',
  }

};

// console.tron.log("loginURL="+Api_url.functionURL);

export default Api_url;