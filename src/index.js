// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// Externals
import Routes from 'containers/Routes';
import rootSaga from 'store/sagas';
// Relative
import './globalStyles.css';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './store';

// Configure store and start sagas.
const store = configureStore();
store.runSaga(rootSaga);

// Construct the app with our Redux store.
const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

// Render the app.
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
