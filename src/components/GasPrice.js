import React from "react";

const GasPrice = (props) => {
  return (
    <div className="GasPrice">
      <div className="content">
        <h3>Gas</h3>
        <div className="gasDisplay">
          <p>{props.prices[0]}</p>
          <p>{props.prices[1]}</p>
          <p>{props.prices[2]}</p>
          <p>{props.prices[3]}</p>
        </div>
      </div>
    </div>
  );
};

export default GasPrice;
