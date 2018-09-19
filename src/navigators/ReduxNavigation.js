
import React from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BackHandler, ToastAndroid } from 'react-native';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import { AppNavigator } from './AppNavigator';

export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const App = reduxifyNavigator(AppNavigator, 'root');

class ReduxNavigation extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
    clearTimeout(this.timer.ref);
    this.timer = {
      ref: null,
      isTimerRunning: false
    };
  }
  timer = {
    ref: null,
    isTimerRunning: false
  }

  _shouldCloseApp = (state) => {
    if (state.index > 0) return false;
    return true;
  }

  _goBack = () => this.props.dispatch(NavigationActions.back())

  _handleExit = () => {
    if (!this.timer.isTimerRunning) {
      this.timer.isTimerRunning = true;
      clearTimeout(this.timer.ref);
      this.timer.ref = setTimeout(() => {
        this.timer.isTimerRunning = false;
      }, 2000);
      ToastAndroid.show('Press again to exit.', ToastAndroid.SHORT);
      return true; // don't do anything
    }
    return false;
  }

  _handleBackPress = () => {
    const { routes } = this.props.state;
    if (routes && this._shouldCloseApp(routes)) {
      return this._handleExit();
    }
    this._goBack();
    return true;
  }
  render() {
    return (<App {...this.props} />);
  }
}

const mapStateToProps = state => ({
  state: state.nav
});
export default connect(mapStateToProps)(ReduxNavigation);
