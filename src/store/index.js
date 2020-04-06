// Dependencies
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
// Externals
import rootReducer from 'containers/Root/reducer';

export const configureStore = () => {
  // Declare our middlewares array.
  const middlewares = [];

  // Add Sagas middleware.
  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);

  // Add Redux logger middleware (easier to read than Redux DevTools, but subjective choice here).
  if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger({
      collapsed: true,
      level: 'info',
      logger: console,
    });
    middlewares.push(loggerMiddleware);
  }

  // Create our store.
  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  // Attach the runSaga method to our store.
  store.runSaga = sagaMiddleware.run;

  // Attach the close method to our store.
  store.close = () => store.dispatch(END);

  // Return the new store.
  return store;
};
