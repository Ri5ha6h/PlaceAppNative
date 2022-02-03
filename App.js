import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import React from 'react';
import ReduxThunk from 'redux-thunk';
import StackPlaceNavigation from './navigation/StackPlaceNavigation';
import { init } from './helper/db';
import placeReducer from './store/place-reducer';

init()
  .then(() => {
    //console.log('Initializing db');
  })
  .catch((err) => {
    console.log('Initialization failed!');
    console.log(err);
  });

const rootReducer = combineReducers({
  place: placeReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackPlaceNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
