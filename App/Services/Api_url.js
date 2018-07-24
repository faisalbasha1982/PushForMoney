const key = '!@M*;-kATy_vcUkLq/U))QD`XL5Sg`5D';
const liClientId = '81td97f0ibm93v';
const liState = 'DCEeFWf45A53sdfKef424';
const liRedirectUri = 'https://www.example.com/auth/linkedin';

const Api_url = {
  LoginUrl: `https://faazureapiinterfacedev.azurewebsites.net/api/fnMoblieLogin?code=${key}`,
  LinkedUrl: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${liClientId}&redirect_uri=${liRedirectUri}&state=${liState}&scope=r_basicprofile`,
  AuthId: 'JS#236734',
  signUpURL:  'https://prod-36.westeurope.logic.azure.com:443/workflows/6c7084b18aa14457a7d1645153ced3e7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TmLOvpwMBYjrnKmhdDzc-EY2gIgPIxSvGsTGbk66rgM',
  signUpURLP: 'https://prod-27.westeurope.logic.azure.com:443/workflows/ca7d95ebc3a14f65abf1e1d740312267/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1eztFWraDyq9Ag46o4NiJNYvc0c9t3DOVpEemWqFkfE',
  signUpURL1: 'https://prod-54.westeurope.logic.azure.com:443/workflows/fad35cb3bf804958806170aab090f5fd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PIqV4C0NMg6yGjaBeaOMl8oLM8DK8v8NilOL-4azW7A',
  signUpURLA: 'http://prod-54.westeurope.logic.azure.com:443/workflows/fad35cb3bf804958806170aab090f5fd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PIqV4C0NMg6yGjaBeaOMl8oLM8DK8v8NilOL-4azW7A',
  signUpURLE: 'https://famobileutilityapiinterfacedev.azurewebsites.net',
  securityKey: 'VyhoMoGxi25xn/Tc',
  rsaKey: '<RSAKeyValue><Modulus>0iFWNUIGY2Td+N3g/oIa1hUjHyZ2X9OcLhUtNlaa33nQuG8JKdfCAR5JGN2fa2RgOz018OU+HQTwPxKH9Lv0I6//B6JcClb6pr8wO6V6LYkWhnjADZc476TdqiD/jIPK3czKxbf2DWt2IXJqD+6aEEjRlH8u18bpXfSwXvtocsiuPKLwwfb0jMGsW2YuycoFKAYovuyXaAB4ra+ID6R2fH2CwGRlYxcGOsWEdhP7zFA0YwVwFLx96f/H43mz+AZisnwK/txXXQM4fcaLXXktZzSDwwanGbaYJe3o9SGACz607Q0v0mFMP8z9kyL3700TKyd35M5j2Qryk8OW3OVpLQ==</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>',
  signUpLoginUrl: 'https://famobileutilityapiinterfacedev.azurewebsites.net',
  signUpLoginUrlNew: 'https://famobileutilityapiinterfacedev.azurewebsites.net/api/fnMobileUserLogin?code=DbWj0tGuU5tWOY8vrtJih/iut9pAUkesWOFTuxnoCL0mDNPbmL3bfA==',
  otpURL: 'https://famobileutilityapiinterfacedev.azurewebsites.net/api/fnOtpVerification?code=mZ7N5kRn1GS7jcRgB0CPAthEYoFf8jVdg7CtG9YhhNL1qj9FeRbePQ==',
  signupURL2: 'https://prod-33.westeurope.logic.azure.com:443',
  profileURL: 'https://prod-15.westeurope.logic.azure.com:443/workflows/f59e53901f7a46559be64f3a4605091e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7rKezGQLhIz7v96JpmKZ4zQ0BUUCLZMW0csfSUWM4JM',
};

export default Api_url;
