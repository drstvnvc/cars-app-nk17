import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCars } from "../store/cars";

export default function CarSearch() {
  const dispatch = useDispatch();

  const [searchTerms, setSearchTerms] = useState({
    brand: "",
    model: "",
  });

  useEffect(() => {
    dispatch(getCars(searchTerms));
  }, [searchTerms]);

  return (
    <>
      <input
        type="text"
        value={searchTerms.brand}
        placeholder="Brand"
        onChange={({ target }) =>
          setSearchTerms({ ...searchTerms, brand: target.value })
        }
      />
      <input
        type="text"
        value={searchTerms.model}
        placeholder="Model"
        onChange={({ target }) =>
          setSearchTerms({ ...searchTerms, model: target.value })
        }
      />
    </>
  );
}
