import React from 'react';
import * as ReactNavigation from "react-navigation";
import { BackHandler, Platform } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import { NavigationActions } from "react-navigation";
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import { 
  reduxifyNavigator, 
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
 } from 'react-navigation-redux-helpers'
import AppNavigation from './AppNavigation';

class ReduxNavigation extends React.Component {
  // componentWillMount () {
  //   if (Platform.OS === 'ios') return
  //   BackHandler.addEventListener('hardwareBackPress', () => {
  //     const { dispatch, nav } = this.props
  //     // change to whatever is your first screen, otherwise unpredictable results may occur
  //     if (nav.routes.length === 1 && (nav.routes[0].routeName === 'LaunchScreen')) {
  //       return false
  //     }
  //     // if (shouldCloseApp(nav)) return false
  //     dispatch({ type: 'Navigation/BACK' })
  //     return true
  //   })
  // }
  componentDidMount() {
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
    const { dispatch, nav} = this.props;    
    const addListener = createReduxBoundAddListener("root");
    // const navigation = addNavigationHelpers({
    //   dispatch,
    //   state: nav,
    //   addListener
    // });

    return <AppNavigation navigation={{
            dispatch: this.props.dispatch,
            state: this.props.nav,
            addListener}}/>
  }
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
