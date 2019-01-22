import { createStackNavigator,NavigationActions, SwitchNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';
import LaunchScreen from '../Containers/LaunchScreen';
import LanguageScreen from '../Containers/LanguageScreen';
import NewScreen from '../Containers/NewScreen';
import WelcomeScreen from '../Containers/WelcomeScreen';
import FormOne from '../Containers/FormOne';
import FormTwo from '../Containers/FormTwo';
import FormTwoNew from '../Containers/FormTwoNew';
import ThankYouScreen from '../Containers/ThankYouScreen';
import PushForJob from '../Containers/PushForJob';
import styles from './Styles/NavigationStyles';
import LanguageButton from '../Components/LanguageButton';
import PushToEarnSignIn from '../Containers/PushToEarnSignIn';
import PushToEarnSignIn2 from '../Containers/PushToEarnSignIn2';
import PushToEarnSignUp from '../Containers/PushToEarnSignUp';
import PushToEarnSignUp2 from '../Containers/PushToEarnSignUp2';
import PushToEarnOTPRegister from '../Containers/PushToEarnOTPRegister';
import PushToEarnRegisterProfile from '../Containers/PushToEarnRegisterProfile';
import PushToEarnWelcomeScreen from '../Containers/PushToEarnWelcomeScreen';
import PushToEarnOTPLogin from '../Containers/PushToEarnOTPLogin';
import PushToEarnLanguageComponent from '../Components/PushToEarnLanguageComponent';
import AccordionListComponent from '../Components/AccordionListComponent';
import PushToEarnMoneyComponent from '../Components/PushToEarnMoneyComponent';
import PushToEarnPrivatePolicy from '../Containers/PushToEarnPrivatePolicy';
import CollapsibleView from '../Components/CollapsibleView';
import NewScreenMoney from  '../Containers/NewScreenMoney';
import TestPage from '../Containers/TestPage';
import PushForJob_quit from '../Containers/PushForJob_quit';
import PushToEarnNew from '../Components/PushToEarnNew';
// Manifest of possible screens

const AppNavigation = createStackNavigator({
  AccordionListComponent: { screen: AccordionListComponent },
  LaunchScreen: { screen: LaunchScreen },
  TestPage: { screen: TestPage,
    navigationOptions: {
      gesturesEnabled: false,
    },
   },
  LanguageButton: { screen: LanguageButton,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  LanguageScreen: { screen: LanguageScreen,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  PushToEarnSignIn: { screen: PushToEarnSignIn,  
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  PushToEarnSignIn2: { screen: PushToEarnSignIn2,
    navigationOptions: {
      gesturesEnabled: true,
    },
  },
  PushToEarnSignUp: { screen: PushToEarnSignUp,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },

  PushToEarnSignUp2: { screen: PushToEarnSignUp2,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },

  PushToEarnRegisterProfile: { screen: PushToEarnRegisterProfile,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  PushToEarnWelcomeScreen: { screen: PushToEarnWelcomeScreen,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  PushToEarnOTPLogin: { screen: PushToEarnOTPLogin,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  PushToEarnMoneyComponent: { screen: PushToEarnMoneyComponent,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  PushToEarnLanguageComponent: { screen: PushToEarnLanguageComponent,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  PushToEarnOTPRegister: { screen: PushToEarnOTPRegister,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  NewScreenMoney: { screen: NewScreenMoney,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  PushToEarnNew: { screen: PushToEarnNew,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  CollapsibleView: { screen: CollapsibleView },
  PushToEarnPrivatePolicy: { screen: PushToEarnPrivatePolicy,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  NewScreen: { screen: NewScreen,
    navigationOptions: {
      gesturesEnabled: false,
    },
   },
  WelcomeScreen: { screen: WelcomeScreen },
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
  },
}, 
{
  // Default config for all screens PushForJob
  headerMode: 'none',
  initialRouteName: 'PushForJob',
  mode: "card",
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default AppNavigation;