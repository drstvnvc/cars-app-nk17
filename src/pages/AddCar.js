import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import carService from '../services/CarService';

const YEARS = Array(2018 - 1990 + 1)
  .fill(1990)
  .map((el, index) => el + index);

const ENGINES = ['diesel', 'petrol', 'electric', 'hybrid'];

function AddCar() {
  const history = useHistory();
  const { id } = useParams();

  const [newCar, setNewCar] = useState({
    brand: '',
    model: '',
    year: YEARS[0],
    max_speed: '',
    number_of_doors: '',
    is_automatic: false,
    engine: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await carService.edit(id, newCar);
    } else {
      await carService.add(newCar);
    }

    history.push('/cars');
  };

  const handleReset = () => {
    setNewCar({
      brand: '',
      model: '',
      year: YEARS[0],
      max_speed: '',
      number_of_doors: '',
      is_automatic: false,
      engine: '',
    });
  };

  const handlePreview = () => {
    alert(`
      Brand: ${newCar.brand} \n
      Model: ${newCar.model} \n
      Year: ${newCar.year} \n
      Max speed: ${newCar.max_speed} \n
      Number of doors: ${newCar.number_of_doors} \n
      Is Automatic: ${newCar.is_automatic ? 'Yes' : 'No'} \n
      Engine: ${newCar.engine} \n
    `);
  };

  useEffect(() => {
    const fetchCar = async () => {
      const { id: _, ...restData } = await carService.get(id);

      setNewCar({ ...restData });
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  return (
    <div>
      <h2>Add new car</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 200,
          marginLeft: 15,
        }}
      >
        <input
          required
          type='text'
          minLength='2'
          value={newCar.brand}
          placeholder='Brand'
          onChange={({ target }) =>
            setNewCar({ ...newCar, brand: target.value })
          }
        />
        <input
          required
          type='text'
          minLength='2'
          value={newCar.model}
          placeholder='Model'
          onChange={({ target }) =>
            setNewCar({ ...newCar, model: target.value })
          }
        />
        <select
          style={{ width: 200 }}
          onChange={({ target }) =>
            setNewCar({ ...newCar, year: Number(target.value) })
          }
          value={newCar.year}
        >
          {YEARS.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
        <input
          type='number'
          min='1'
          value={newCar.max_speed}
          placeholder='Max speed'
          onChange={({ target }) =>
            setNewCar({ ...newCar, max_speed: target.value })
          }
        />
        <input
          required
          type='number'
          min='1'
          value={newCar.number_of_doors}
          placeholder='Number of door'
          onChange={({ target }) =>
            setNewCar({ ...newCar, number_of_doors: target.value })
          }
        />
        <span>
          <label>Is automatic?</label>
          <input
            type='checkbox'
            checked={newCar.is_automatic}
            onChange={({ target }) => {
              setNewCar({ ...newCar, is_automatic: target.checked });
            }}
          />
        </span>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4>Pick engine:</h4>
          {ENGINES.map((engine, index) => (
            <span key={index}>
              <input
                type='radio'
                name='engine'
                required
                checked={engine === newCar.engine}
                value={engine}
                onChange={() => setNewCar({ ...newCar, engine })}
              />
              {engine.toUpperCase()}
            </span>
          ))}
        </div>
        <div>
          <button>{id ? 'Edit' : 'Add new'}</button>
          <button type='button' onClick={handleReset}>
            Reset
          </button>
          <button type='button' onClick={handlePreview}>
            Preview
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCar;
