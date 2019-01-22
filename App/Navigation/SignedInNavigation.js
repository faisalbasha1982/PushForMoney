import { StackNavigator } from "react-navigation";
import styles from "./Styles/NavigationStyles";

import PushToEarnWelcomeScreen from '../Containers/PushToEarnWelcomeScreen';
import PushToEarnProfile from '../Containers/PushToEarnProfile';
import PushToEarnUploadFileComponent from '../Components/PushToEarnUploadFileComponent';
import PushToEarnInformation from '../Containers/PushToEarnInformation';
import PushToEarnMoney from '../Containers/PushToEarnMoney';
import PushToEarnLanguageComponent from '../Components/PushToEarnLanguageComponent';
import AccordionListComponent from '../Components/AccordionListComponent';
import PushToEarnMoneyComponent from '../Components/PushToEarnMoneyComponent';
import PushToEarnPrivatePolicy from '../Containers/PushToEarnPrivatePolicy';
import CollapsibleView from '../Components/CollapsibleView';
import NewScreenMoney from  '../Containers/NewScreenMoney';
import TestPage from '../Containers/TestPage';

// Manifest of possible screens
const SignedInNav = StackNavigator({
    PushToEarnWelcomeScreen: { screen: PushToEarnWelcomeScreen },
    PushToEarnProfile: { screen: PushToEarnProfile },
    PushToEarnFriendsOverview: { screen: PushToEarnFriendsOverview },
    PushToEarnInformation: { screen: PushToEarnInformation },
    PushToEarnMoney: { screen: PushToEarnMoney },
    PushToEarnUploadFileComponent: { screen: PushToEarnUploadFileComponent },
    PushToEarnLanguageComponent: { screen: PushToEarnLanguageComponent },
    AccordionListComponent: { screen: AccordionListComponent },
    PushToEarnMoneyComponent: { screen: PushToEarnMoneyComponent },
    PushToEarnPrivatePolicy: { screen: PushToEarnPrivatePolicy },
    CollapsibleView: { screen: CollapsibleView },
    NewScreenMoney: { screen: NewScreenMoney },
    TestPage: { screen: TestPage,
        navigationOptions: {
            gesturesEnabled: false,
          },
     },
}, {
    // Default config for all screens PushToEarnWelcomeScreen 
    initialRouteName: "PushToEarnWelcomeScreen",
    navigationOptions: {
        headerStyle: styles.header
    }
});

export default SignedInNav;