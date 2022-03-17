import React from "react";

const Item = ({ payload }) => {
  return (
    <div className="Item">
      <h2>{payload.name}</h2>
      <p>🍕{payload.pizza}</p>
      <p>🥤{payload.soda}</p>
      <p>PPM {payload.ppm}</p>
      <p>
        Requires <span>Pizzaioli</span>? {payload.reqPi ? `Yes` : `No`}
      </p>
      {payload.reqPi ? "Yes" : "No"}
    </div>
  );
};

export default Item;
