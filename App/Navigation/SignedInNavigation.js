import { StackNavigator } from "react-navigation";
import styles from "./Styles/NavigationStyles";

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
const SignedInNav = StackNavigator({
    PushToEarnWelcomeScreen: { screen: PushToEarnWelcomeScreen },
    PushToEarnProfileCardDetails: { screen: PushToEarnProfileCardDetails },
    PushToEarnNoFriends: { screen: PushToEarnNoFriends },
    PushToEarnChangePassword: { screen: PushToEarnChangePassword },
    PushToEarnAddFriend: { screen: PushToEarnAddFriend },
    PushToEarnAddFriendsButtons : { screen: PushToEarnAddFriendsButtons },
    PushToEarnProfile: { screen: PushToEarnProfile },
    PushToEarnFriendsOverview: { screen: PushToEarnFriendsOverview },
    PushToEarnInformation: { screen: PushToEarnInformation },
    PushToEarnMoney: { screen: PushToEarnMoney },
    PushToEarnLanguageComponent: { screen: PushToEarnLanguageComponent },
    AccordionListComponent: { screen: AccordionListComponent },
    PushToEarnMoneyComponent: { screen: PushToEarnMoneyComponent },
    pushToEarnMoneyList: { screen: pushToEarnMoneyList },
    PushToEarnPrivatePolicy: { screen: PushToEarnPrivatePolicy },
    CollapsibleView: { screen: CollapsibleView },
    NewScreenMoney: { screen: NewScreenMoney },
    TestPage: { screen: TestPage },
}, {
    // Default config for all screens
    initialRouteName: "PushToEarnWelcomeScreen",
    navigationOptions: {
        headerStyle: styles.header
    }
});

export default SignedInNav;