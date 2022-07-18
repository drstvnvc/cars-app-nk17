import { takeLatest, call, put, select } from "redux-saga/effects";
import {
  addCar,
  deleteCar,
  deleteCarSuccess,
  getCars,
  getCar,
  setCars,
  setCar,
  updateCar,
  setFilters,
  setSort,
  appendCars,
} from "./slice";

import carService from "../../services/CarService";
import { selectFilters, selectSort } from "./selectors";

// workers
function* getCarsHandler({ payload }) {
  const filters = yield select(selectFilters);
  const sort = yield select(selectSort);

  try {
    const cars = yield call(carService.getAll, payload?.page, filters, sort);
    if (payload?.page > 1) {
      yield put(appendCars(cars));
    } else {
      yield put(setCars(cars));
    }
  } catch (e) {
    console.log(e);
  }
}
function* getCarHandler({ payload: carId }) {
  try {
    const car = yield call(carService.get, carId);
    yield put(setCar(car));
  } catch (e) {
    console.log(e);
  }
}

function* deleteCarHandler({ payload: carId }) {
  try {
    yield call(carService.delete, carId);
    yield put(deleteCarSuccess(carId));
  } catch (e) {
    console.log(e);
  }
}

function* addCarHandler({ payload }) {
  try {
    yield call(carService.add, payload.car);
    if (typeof payload.meta?.onSuccess === "function") {
      yield call(payload.meta.onSuccess);
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateCarHandler({ payload }) {
  try {
    yield call(carService.edit, payload.id, payload.car);
    if (typeof payload.meta?.onSuccess === "function") {
      yield call(payload.meta.onSuccess);
    }
  } catch (error) {
    console.log(error);
  }
}

// watchers
export function* watchGetCars() {
  yield takeLatest(getCars.type, getCarsHandler);
}
export function* watchGetCar() {
  yield takeLatest(getCar.type, getCarHandler);
}
export function* watchDeleteCar() {
  yield takeLatest(deleteCar.type, deleteCarHandler);
}
export function* watchAddCar() {
  yield takeLatest(addCar.type, addCarHandler);
}
export function* watchUpdateCar() {
  yield takeLatest(updateCar.type, updateCarHandler);
}
export function* watchFilterCars() {
  yield takeLatest(setFilters.type, getCarsHandler);
}
export function* watchSortCars() {
  yield takeLatest(setSort.type, getCarsHandler);
}
