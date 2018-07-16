import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
// import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import { BackHandler, Platform } from 'react-native';
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import AppNavigation from '../Navigation/AppNavigation';
import * as NavigationService from '../Navigation/NavigationService';

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }

    NavigationService.setNavigator(this.navigator);
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener("hardwareBackPress",this.onBackPress);
  }


  onBackPress = () => {
    const { dispatch, nav } = this.props;
    console.log("Back pressed", nav);
    const activeRoute = nav.routes[nav.index];
    if (activeRoute.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <AppNavigation ref = { nav => { this.navigator = nav; }} />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
