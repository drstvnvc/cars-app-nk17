import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleCar from "../components/SingleCar";
import { getCars, selectCars } from "../store/cars";

function AppCars() {
  const dispatch = useDispatch();

  const cars = useSelector(selectCars);

  const [selectedCarIds, setSelectedCarIds] = useState({});

  useEffect(() => {
    dispatch(getCars());
  }, []);

  function handleSelect(id) {
    setSelectedCarIds({
      ...selectedCarIds,
      [id]: true,
    });
  }

  function handleSelectAll() {
    const selectedIds = {};
    cars.data.forEach((car) => {
      selectedIds[car.id] = true;
    });

    setSelectedCarIds(selectedIds);
  }

  function handleDeselectAll() {
    setSelectedCarIds({});
  }

  return (
    <div>
      <h2>Cars</h2>
      {cars.data.length > 0 && (
        <>
          <h3>Number of selected cars: {Object.keys(selectedCarIds).length}</h3>

          <button onClick={() => handleSelectAll()}>Select All</button>
          <button onClick={() => handleDeselectAll()}>Delect All</button>
          <ul>
            {cars.data.map((car) => (
              <SingleCar
                {...car}
                key={car.id}
                isSelected={selectedCarIds[car.id]}
                onSelect={() => handleSelect(car.id)}
              />
            ))}
          </ul>
        </>
      )}
      {cars.data.length == 0 && <p>No cars</p>}
    </div>
  );
}

export default AppCars;
