import React from "react";

function SingleCar({
  id,
  brand,
  model,
  year,
  max_speed,
  is_automatic,
  engine,
  number_of_doors,
  deleteCallback,
  editCallback,
}) {
  return (
    <li
      style={{
        border: "1px solid black",
        marginBottom: "5px",
        padding: 5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span>Brand: {brand}</span>
      <span>Model: {model}</span>
      <span>Year: {year}</span>
      <span>Max Speed: {max_speed}</span>
      <span>{is_automatic ? "Is" : "Not"} Automatic </span>
      <span>Engine: {engine}</span>
      <span>Number of doors: {number_of_doors}</span>
      <button onClick={() => deleteCallback(id)}>Delete</button>
      <button onClick={() => editCallback(id)}>Edit</button>
    </li>
  );
}

export default SingleCar;
