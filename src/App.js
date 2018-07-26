import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers';
import './App.css';

import RandomQuoteMachine from './components/randomQuoteMachine';

const store = createStore(rootReducer);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RandomQuoteMachine/>
      </Provider>
    );
  }
}

export default App;
