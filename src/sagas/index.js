import { takeLatest, put, spawn, call } from "redux-saga/effects";
import {
  fetchServicesFailure,
  fetchServicesSuccess,
  serviceChooseFailure,
  serviceChooseSuccess,
} from "../actions/actionCreators";
import {
  FETCH_SERVICES_REQUEST,
  SERVICE_CHOOSE_REQUEST,
} from "../actions/actionTypes";

export const fetchServices = () => async () => {
  const response = await fetch(
    "https://ra-13-task-2-server.herokuapp.com/api/services"
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

export const chooseService = (id) => async () => {
  const response = await fetch(
    `https://ra-11-task-1-server.herokuapp.com/api/services/${id}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

// worker
function* handleFetchServicesRequestSaga() {
  try {
    const data = yield call(fetchServices());
    yield put(fetchServicesSuccess(data));
  } catch (e) {
    yield put(fetchServicesFailure(e.message));
  }
}

// worker
function* handleChooseServiceRequestSaga(action) {
  try {
    const data = yield call(chooseService(action.payload.id));
    yield put(serviceChooseSuccess(data));
  } catch (e) {
    yield put(serviceChooseFailure(e.message));
  }
}

// watcher
function* watchFetchServicesSaga() {
  yield takeLatest(FETCH_SERVICES_REQUEST, handleFetchServicesRequestSaga);
}

// watcher
function* watchChooseServiceSaga() {
  yield takeLatest(SERVICE_CHOOSE_REQUEST, handleChooseServiceRequestSaga);
}

//Корневая Saga
export default function* saga() {
  yield spawn(watchFetchServicesSaga);
  yield spawn(watchChooseServiceSaga);
}
