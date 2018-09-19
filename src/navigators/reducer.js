import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('mainTab');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);


export const reducer = (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
    case NavigationActions.BACK: {
      nextState = AppNavigator.router.getStateForAction(action, state);
      if (nextState.isTransitioning) {
        nextState = null;
      }
      break;
    }
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
