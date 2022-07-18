import React from "react";

export default function Pagination({ lastPage, onPageSelect }) {
  console.log("pagination");

  const pages = Array(lastPage)
    .fill(0)
    .map((el, index) => index + 1);

  return (
    <div>
      {pages.map((page) => (
        <button onClick={() => onPageSelect(page)} key={page}>
          {page}
        </button>
      ))}
    </div>
  );
}
