import { createStackNavigator,NavigationActions } from 'react-navigation';
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
import PushToEarnSignUp from '../Containers/PushToEarnSignUp';
import PushToEarnForgetPass from '../Containers/PushToEarnForgetPass';
import PushToEarnOTPForgetPass from '../Containers/PushToEarnOTPForgetPass';
import PushToEarnOTP from '../Containers/PushToEarnOTP';
import PushToEarnRegisterProfile from '../Containers/PushToEarnRegisterProfile';
import PushToEarnWelcomeScreen from '../Containers/PushToEarnWelcomeScreen';
import PushToEarnProfileCardDetails from '../Containers/PushToEarnProfileCardDetails';
import PushToEarnChangePassword from '../Containers/PushToEarnChangePassword';
import PushToEarnNoFriends from '../Containers/PushToEarnNoFriends';
import PushToEarnAddFriend from '../Containers/PushToEarnAddFriend';
import PushToEarnAddFriendsButtons from '../Containers/PushToEarnAddFriendsButtons';
import PushToEarnProfile from '../Containers/PushToEarnProfile';
import PushToEarnFriendsOverview from '../Containers/PushToEarnFriendsOverview';
import PushToEarnInformation from '../Containers/PushToEarnInformation';
import PushToEarnMoney from '../Containers/PushToEarnMoney';
import PushToEarnLanguageComponent from '../Components/PushToEarnLanguageComponent';
import AccordionListComponent from '../Components/AccordionListComponent';
import PushToEarnMoneyComponent from '../Components/PushToEarnMoneyComponent';
import pushToEarnMoneyList from '../Containers/PushToEarnMoneyList';
import PushToEarnPrivatePolicy from '../Containers/PushToEarnPrivatePolicy';
import CollapsibleView from '../Components/CollapsibleView';
import NewScreenMoney from  '../Containers/NewScreenMoney';
import TestPage from '../Containers/TestPage';

// Manifest of possible screens

const AppNavigation = createStackNavigator({
  AccordionListComponent: { screen: AccordionListComponent },
  LaunchScreen: { screen: LaunchScreen },
  TestPage: { screen: TestPage },
  LanguageButton: { screen: LanguageButton},
  LanguageScreen: { screen: LanguageScreen },
  PushToEarnSignIn: { screen: PushToEarnSignIn },
  PushToEarnSignUp: { screen: PushToEarnSignUp },
  PushToEarnForgetPass: { screen: PushToEarnForgetPass },
  PushToEarnOTP: { screen: PushToEarnOTP },
  PushToEarnOTPForgetPass: { screen: PushToEarnOTPForgetPass },
  PushToEarnRegisterProfile: { screen: PushToEarnRegisterProfile },
  PushToEarnWelcomeScreen: { screen: PushToEarnWelcomeScreen },
  PushToEarnProfileCardDetails: { screen: PushToEarnProfileCardDetails},
  PushToEarnChangePassword: { screen: PushToEarnChangePassword },
  PushToEarnNoFriends: { screen: PushToEarnNoFriends },
  PushToEarnAddFriend: { screen: PushToEarnAddFriend },
  PushToEarnAddFriendsButtons: { screen: PushToEarnAddFriendsButtons },
  PushToEarnProfile: { screen: PushToEarnProfile },
  PushToEarnMoneyComponent: { screen: PushToEarnMoneyComponent},
  PushToEarnFriendsOverview: { screen: PushToEarnFriendsOverview },
  PushToEarnInformation: { screen: PushToEarnInformation },
  PushToEarnLanguageComponent: { screen: PushToEarnLanguageComponent },
  PushToEarnMoney: { screen: PushToEarnMoney },
  pushToEarnMoneyList: { screen: pushToEarnMoneyList },
  NewScreenMoney: { screen: NewScreenMoney },
  CollapsibleView: { screen: CollapsibleView },
  PushToEarnPrivatePolicy: { screen: PushToEarnPrivatePolicy },
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
  PushForJob: { screen: PushForJob },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'PushForJob',
  mode: "card",
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default AppNavigation;