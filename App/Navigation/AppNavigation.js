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
import pushToEarnMoneyList from '../Containers/PushToEarnMoneyList';
import PushToEarnPrivatePolicy from '../Containers/PushToEarnPrivatePolicy';
import CollapsibleView from '../Components/CollapsibleView';
import NewScreenMoney from  '../Containers/NewScreenMoney';

// const middleware = createReactNavigationReduxMiddleware(
//   'root',
//   state => state.nav
// );

// Manifest of possible screens

const AppNavigation = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  LanguageButton: { screen: LanguageButton},
  LanguageScreen: { screen: LanguageScreen },
  PushToEarnSignIn: { screen: PushToEarnSignIn },
  PushToEarnSignUp: { screen: PushToEarnSignUp },
  PushToEarnForgetPass: { screen: PushToEarnForgetPass },
  PushToEarnOTP: { screen: PushToEarnOTP },
  PushToEarnRegisterProfile: { screen: PushToEarnRegisterProfile },
  PushToEarnWelcomeScreen: { screen: PushToEarnWelcomeScreen },
  PushToEarnProfileCardDetails: { screen: PushToEarnProfileCardDetails},
  PushToEarnChangePassword: { screen: PushToEarnChangePassword },
  PushToEarnNoFriends: { screen: PushToEarnNoFriends },
  PushToEarnAddFriend: { screen: PushToEarnAddFriend },
  PushToEarnAddFriendsButtons: { screen: PushToEarnAddFriendsButtons },
  PushToEarnProfile: { screen: PushToEarnProfile },
  PushToEarnFriendsOverview: { screen: PushToEarnFriendsOverview },
  PushToEarnInformation: { screen: PushToEarnInformation },
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
  PushForJob: { screen: PushForJob},
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'PushToEarnOTP',
  mode: "card",
  navigationOptions: {
    headerStyle: styles.header
  }
})

// const AppWithNavigationState = reduxifyNavigator(PrimaryNav, 'root');
// const mapStateToProps = state => ({
//   state: state.nav,
// })
// const AppNavigation = connect(mapStateToProps)(AppWithNavigationState);

// export default { PrimaryNav, AppNavigation, middleware };

export default AppNavigation;