import { StackNavigator } from "react-navigation";
import styles from "./Styles/NavigationStyles";
import PushToEarnSignIn from '../Containers/PushToEarnSignIn';
import PushToEarnSignIn2 from '../Containers/PushToEarnSignIn2';
import PushToEarnSignUp from '../Containers/PushToEarnSignUp';
import PushToEarnForgetPass from '../Containers/PushToEarnForgetPass';
import PushToEarnOTPForgetPass from '../Containers/PushToEarnOTPForgetPass';
import PushToEarnOTP from '../Containers/PushToEarnOTP';
import PushToEarnRegisterProfile from '../Containers/PushToEarnRegisterProfile';
import LanguageButton from '../Components/LanguageButton';
import LanguageScreen from '../Containers/LanguageScreen';
import FormOne from '../Containers/FormOne';
import FormTwo from '../Containers/FormTwo';
import FormTwoNew from '../Containers/FormTwoNew';
import PushForJob_quit from '../Containers/PushForJob_quit';

// Manifest of possible screens
const SignedOutNav = StackNavigator(
  {
    PushToEarnSignIn: { screen: PushToEarnSignIn },
    PushToEarnSignIn2: { screen: PushToEarnSignIn2 },
    PushToEarnSignUp: { screen: PushToEarnSignUp },
    PushToEarnOTP: { screen: PushToEarnOTP },
    PushToEarnRegisterProfile:{ screen: PushToEarnRegisterProfile},
    PushToEarnOTPForgetPass: { screen: PushToEarnOTPForgetPass },
    PushToEarnForgetPass: { screen: PushToEarnForgetPass },
    LanguageButton: { screen: LanguageButton},
    LanguageScreen: { screen: LanguageScreen }, 
    NewScreen: { 
        screen: NewScreen,
          navigationOptions: {
        gesturesEnabled: false,
      },
     },

    FormOne: { screen: FormOne,
      navigationOptions: {
        gesturesEnabled: false,
      }, 
    },

    FormTwo: { screen: FormTwo,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },

    FormTwoNew: { screen: FormTwoNew,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },

    ThankYouScreen : { screen: ThankYouScreen,
        navigationOptions: {
          gesturesEnabled: false,
        },
     },

    PushForJob: { screen: PushForJob,
      navigationOptions: {
          gesturesEnabled: false,
        },
    },

   PushForJob_quit: { screen: PushForJob_quit, 
    navigationOptions: {
      gesturesEnabled: false,
    },
  }


  },

  {
    // Default config for all screens
    initialRouteName: "PushForJob",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default SignedOutNav;
