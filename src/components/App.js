// Import Hooks
import { useState, useEffect } from "react";
// Import Libraries
import covalenthq from "../apis/covalenthq";
import owlracle from "../apis/owlracle";
import itemData from "../itemData";
import TokenPrice from "./TokenPrice";
import GasPrice from "./GasPrice";
import Item from "./Item";
import Header from "./Header";
import PizzeriaSim from "./PizzeriaSim";
import "../styles.scss";

// App
function App() {
  const [pricePizza, setPricePizza] = useState(null);
  const [priceSoda, setPriceSoda] = useState(null);
  const [priceAvax, setPriceAvax] = useState(null);
  const [priceGas, setPriceGas] = useState([]);

  useEffect(() => {
    checkPriceV2();
  }, []);

  // Urls to query, to make the api calls more organized
  const urls = {
    pizzaSoda:
      "/v1/43114/address/0x56ada0609a9e24d5231b5561c7ea4f0b8b3a5021/balances_v2/",
    avax: "/v1/43114/address/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/balances_v2/",
    gas: "/avax/gas",
  };

  const checkPriceV2 = () => {
    pizzaSodaPrice();
    avaxPrice();
    gasPrice();
  };

  const pizzaSodaPrice = () => {
    covalenthq
      .get(urls.pizzaSoda, {
        params: {
          key: "ckey_be594c65d8184b449e1ce1d98ff",
        },
      })
      .then((res) => formatPizzaSoda(res.data));
  };

  const avaxPrice = () => {
    covalenthq
      .get(urls.avax, {
        params: {
          key: "ckey_be594c65d8184b449e1ce1d98ff",
        },
      })
      .then((res) => formatAvax(res.data));
  };

  const gasPrice = () => {
    owlracle
      .get(urls.gas, {
        params: {
          apikey: "83de1b9c1785429ba85030b222ea2f2b",
        },
      })
      .then((res) => formatGas(res.data));
  };

  const formatPizzaSoda = (payload) => {
    let pizzaPrice = payload.data.items[1].quote_rate.toFixed(6);
    let sodaNumerator = payload.data.items[1].balance
      .toLocaleString()
      .slice(0, -18);
    let sodaDenominator = payload.data.items[0].balance
      .toLocaleString()
      .slice(0, -18);
    let sodaRatio = sodaNumerator / sodaDenominator;
    let sodaPrice = (sodaRatio * pizzaPrice).toFixed(2);
    setPricePizza(pizzaPrice);
    setPriceSoda(sodaPrice);
  };

  const formatAvax = (payload) => {
    setPriceAvax(payload.data.items[0].quote_rate.toFixed(2));
  };

  const formatGas = (payload) => {
    let speeds = {
      slow: Math.round(payload.speeds[0].gasPrice),
      standard: Math.round(payload.speeds[1].gasPrice),
      fast: Math.round(payload.speeds[2].gasPrice),
      instant: Math.round(payload.speeds[3].gasPrice),
    };
    console.log(
      `${speeds.slow}-${speeds.standard}-${speeds.fast}-${speeds.instant}`
    );
    setPriceGas([speeds.slow, speeds.standard, speeds.fast, speeds.instant]);
  };

  let checkFor = (item) => {
    if (item) {
      return item;
    } else {
      return `Loading...`;
    }
  };

  return (
    <div className="App">
      <Header />

      <div className="priceBar">
        <div className="tokenBar">
          <TokenPrice token={"🍕Pizza"} price={pricePizza} />
          <TokenPrice token={"🥤Soda"} price={priceSoda} />
          <TokenPrice token={"🔺Avax"} price={priceAvax} />
        </div>
        <div className="gasBar">
          <GasPrice prices={priceGas} />
        </div>
      </div>
      <div className="itemBar">
        <Item payload={itemData.chef} prices={[pricePizza, priceSoda, priceAvax]}/>
        <Item payload={itemData.pizzaPeel} prices={[pricePizza, priceSoda, priceAvax]}/>
        <Item payload={itemData.pizzaCutter} prices={[pricePizza, priceSoda, priceAvax]}/>
        <Item payload={itemData.pizzaBox} prices={[pricePizza, priceSoda, priceAvax]}/>
      </div>
      <button onClick={() => console.log(priceGas)}>buton</button>
      <PizzeriaSim />
    </div>
  );
}

export default App;
