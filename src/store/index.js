import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import carsReducer from "./cars/slice";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

for (const saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

export default store;
