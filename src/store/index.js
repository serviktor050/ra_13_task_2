import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import serviceListReducer from "../reducers/serviceList";
import serviceChooseReducer from "../reducers/serviceChoose";
import saga from "../sagas";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceChoose: serviceChooseReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, thunk))
);

sagaMiddleware.run(saga);

export default store;
