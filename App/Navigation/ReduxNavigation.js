import React from 'react';
import * as ReactNavigation from "react-navigation";
import { BackHandler, Platform, AsyncStorage } from 'react-native';
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
import Route from './Route';

let token = '';

class ReduxNavigation extends React.Component {

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

    return <Route navigation={{
            dispatch: this.props.dispatch,
            state: this.props.nav,
            addListener}} />
  }
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
