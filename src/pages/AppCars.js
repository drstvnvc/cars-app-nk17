import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import SingleCar from "../components/SingleCar";
import { getCars, selectCars, setSort } from "../store/cars";

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

  function handleSort(criteria, order) {
    dispatch(
      setSort({
        criteria,
        order,
      })
    );
  }

  function handlePageSelected(page) {
    console.log("page selected", page);
    dispatch(getCars({ page }));
  }
  function handleLoadMore() {
    dispatch(
      getCars({
        page: cars.current_page + 1,
      })
    );
  }
  return (
    <div>
      <h2>Cars</h2>
      {cars.data.length > 0 && (
        <>
          <h3>Number of selected cars: {Object.keys(selectedCarIds).length}</h3>

          <div>
            <span>Select</span>
            <button onClick={() => handleSelectAll()}>Select All</button>
            <button onClick={() => handleDeselectAll()}>Delect All</button>
          </div>

          <div>
            <span>Sort</span>
            <button onClick={() => handleSort("brand", "asc")}>
              Sort by Brand asc
            </button>
            <button onClick={() => handleSort("brand", "desc")}>
              Sort by Brand desc
            </button>
            <button onClick={() => handleSort("max_speed", "asc")}>
              Sort by Max speed asc
            </button>
            <button onClick={() => handleSort("max_speed", "desc")}>
              Sort by Max speed desc
            </button>
          </div>

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
          <Pagination
            lastPage={cars.last_page}
            onPageSelect={handlePageSelected}
          />
          <button
            onClick={handleLoadMore}
            disabled={cars.current_page == cars.last_page}
          >
            Load more
          </button>
        </>
      )}
      {cars.data.length == 0 && <p>No cars</p>}
    </div>
  );
}

export default AppCars;
