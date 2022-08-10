import { call, put, takeEvery } from 'redux-saga/effects';

import getNewsApi from '../../api/newsApi';
import { refreshApi } from '../../api/authApi';
import actionTypes from '../actionTypes';
import { getNewsSuccess, getNewsRejected } from '../actions/newsAction';
import { refreshSuccess } from '../actions/authAction';

function* getNewsFetchWorker() {
  try {
    const payload = yield call(getNewsApi);
    yield put(getNewsSuccess(payload));
  } catch (error) {
    yield put(getNewsRejected());
    const userData = yield call(refreshApi);
    localStorage.setItem('accessToken', userData.accessToken);
    yield put(refreshSuccess(userData));
    const payload = yield call(getNewsApi);
    yield put(getNewsSuccess(payload));
  }
}

function* newsWatcher() {
  yield takeEvery(actionTypes.GET_NEWS_REQUESTED, getNewsFetchWorker);
}

export default newsWatcher;
