import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleCar from "../components/SingleCar";
import { getCars, selectCars } from "../store/cars";

function AppCars() {
  const dispatch = useDispatch();

  const cars = useSelector(selectCars);

  useEffect(() => {
    dispatch(getCars());
  }, []);

  return (
    <div>
      <h2>Cars</h2>
      {cars.data.length > 0 && (
        <ul>
          {cars.data.map((car) => (
            <SingleCar {...car} key={car.id} />
          ))}
        </ul>
      )}
      {cars.data.length == 0 && <p>No cars</p>}
    </div>
  );
}

export default AppCars;
