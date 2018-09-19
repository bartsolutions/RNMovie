import React from 'react';
import { Provider } from 'react-redux';
import { Root, StyleProvider } from 'native-base';
import store from 'src/store';

import getTheme from 'src/native-base-theme/components';
import material from 'src/native-base-theme/variables/material';

import AppWithNavigationState from './navigators';

console.disableYellowBox = true;

class App extends React.Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <StyleProvider style={getTheme(material)}>
            <AppWithNavigationState />
          </StyleProvider>
        </Provider>
      </Root>
    );
  }
}

export default App;
