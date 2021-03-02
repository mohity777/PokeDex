import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import AppContainer from './routes';
import Store from './store';

const App = (props) => {
  return (
    <Provider store={Store}>
        <AppContainer />
    </Provider>
  );
};

export default App;
