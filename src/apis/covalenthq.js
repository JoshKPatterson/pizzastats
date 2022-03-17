import axios from "axios";
// import "dotenv/config";

const covalenthq = axios.create({
  baseURL: "https://api.covalenthq.com",
  // headers: {
  //   key: process.env.COVALENTHQ_KEY,
  // },
});

export default covalenthq;
