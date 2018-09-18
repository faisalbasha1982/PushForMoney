import SignedInNav from './SignedInNavigation';
import SignedOutNav from './SignedOutNavigation';
import { SwitchNavigator } from 'react-navigation';

export const createRootNavigator = (signedIn = false) => {
    return SwitchNavigator
    ({
        SignedInNav: 
        { 
            screen: SignedInNav,
            navigationOptions: {
                gesturesEnabled: false,
              },
        },
        SignedOutNav: 
          { 
              screen: SignedOutNav,
                navigationOptions: {
                gesturesEnabled: false,
              },
         },
    },

    {
        initialRouteName: signedIn === false? "SignedInNav": "SignedOutNav",
        navigationOptions: {
            headerStyle: styles.header
            },
        mode: "card",
        headerMode:'none'
    })
}