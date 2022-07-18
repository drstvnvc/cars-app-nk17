import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getCars() {},
  getCar() {},
  deleteCar() {},
  addCar() {},
  updateCar() {},
};

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    page: {
      data: [],
      curent_page: 1,
      total: 0,
    },
    car: null,
    filters: null,
    sort: null,
  },
  reducers: {
    setCars(state, { payload }) {
      state.page = payload;
    },
    appendCars(state, { payload }) {
      state.page = {
        ...payload,
        data: [...state.page.data, ...payload.data],
      };
    },
    setCar(state, { payload }) {
      state.car = payload;
    },
    setFilters(state, { payload }) {
      state.filters = payload;
    },
    setSort(state, { payload }) {
      state.sort = payload;
    },
    deleteCarSuccess(state, { payload }) {
      state.page.data = state.page.data.filter((car) => car.id !== payload);
    },
    ...middlewareActions,
  },
});

export const {
  getCars,
  getCar,
  setCars,
  appendCars,
  setCar,
  deleteCar,
  deleteCarSuccess,
  addCar,
  updateCar,
  setFilters,
  setSort,
} = carsSlice.actions;

export default carsSlice.reducer;
