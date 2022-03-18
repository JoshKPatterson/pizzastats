import React from "react";

const Item = ({ payload, prices }) => {
  const calcTotalPizza = (pizzaAmt, sodaAmt) => {
    let ratio = prices[1] / prices[0];
    let convertedSoda = sodaAmt * ratio;
    let finalPizza = pizzaAmt + convertedSoda;
    return Math.ceil(finalPizza);
  };
  const calcTotalAvax = (pizzaAmt, sodaAmt) => {
    let pizzaUSD = pizzaAmt * prices[0];
    let sodaUSD = sodaAmt * prices[1];
    console.log(`pizza: ${pizzaUSD}, soda: ${sodaUSD}`);
    let finalAvax = (pizzaUSD + sodaUSD) / prices[2];
    return finalAvax.toFixed(2);
  };
  return (
    <div className="Item">
      <h2>{payload.name}</h2>
      <p>PPM {payload.ppm}</p>
      <p>
        Requires <span>Pizzaioli</span>? {payload.reqPi ? `Yes` : `No`}
      </p>
      <hr />
      <p>🍕{payload.pizza}</p>
      <p>🥤{payload.soda}</p>
      <p>or</p>
      <p>🍕{calcTotalPizza(payload.pizza, payload.soda)}</p>
      <p>or</p>
      <p>🔺{calcTotalAvax(payload.pizza, payload.soda)}</p>
    </div>
  );
};

export default Item;
