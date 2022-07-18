export function selectCars(state) {
  return state.cars.page;
}

export function selectCar(state) {
  return state.cars.car;
}

export function selectFilters(state) {
  return state.cars.filters;
}
export function selectSort(state) {
  return state.cars.sort;
}
