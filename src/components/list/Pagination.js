import React from "react";

function Pagination({ productPage, totalProduct, paginat }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProduct / productPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="page">
      {pageNumbers.map((number) => (
        <div key={number}>
          <button onClick={() => paginat(number)}>{number}</button>
        </div>
      ))}
    </div>
  );
}

export default Pagination;
