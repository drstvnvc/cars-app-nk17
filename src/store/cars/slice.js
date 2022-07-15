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
  },
  reducers: {
    setCars(state, { payload }) {
      state.page = payload;
    },
    setCar(state, { payload }) {
      state.car = payload;
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
  setCar,
  deleteCar,
  deleteCarSuccess,
  addCar,
  updateCar,
} = carsSlice.actions;

export default carsSlice.reducer;
