import { createStackNavigator,NavigationActions, createSwitchNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import SignedInNav from './SignedInNavigation';
import SignedOutNav from './SignedOutNavigation';
import AuthLoadingScreen from './AuthLoadingScreen';

// Manifest of possible screens
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

export default createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: SignedInNav,
            Auth: SignedOutNav,
        },
        {
            initialRouteName: 'AuthLoading',
        }
);