import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SingleCar from "../components/SingleCar";
import carService from "../services/CarService";

function AppCars() {
  const [cars, setCars] = useState({
    current_page: 1,
    data: [],
  });
  const history = useHistory();

  const handleDelete = async (carId) => {
    const response = prompt(
      "Are you sure you want to delete this car ?\n Enter 'Yes' if you are"
    );

    if (response !== "Yes") {
      return;
    }

    const data = await carService.delete(carId);

    if (data.count > 0) {
      setCars(cars.filter(({ id }) => id !== carId));
    }
  };

  const handleEdit = (id) => {
    history.push(`edit/${id}`);
  };

  useEffect(() => {
    const fetchCars = async () => {
      const data = await carService.getAll();

      setCars(data);
    };
    fetchCars();
  }, []);

  return (
    <div>
      <h2>Cars</h2>
      <ul>
        {cars.data.map((car) => (
          <SingleCar
            {...car}
            key={car.id}
            deleteCallback={handleDelete}
            editCallback={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
}

export default AppCars;
