import React from "react";

const TokenPrice = ({ token, price }) => {
  return (
    <div className="TokenPrice">
      <div className="content">
        <h3>{token}</h3>
        {price ? `$${price}` : `Loading...`}
      </div>
    </div>
  );
};

export default TokenPrice;
