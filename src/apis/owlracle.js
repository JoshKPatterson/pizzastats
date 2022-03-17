import axios from "axios";
// import "dotenv/config";

const owlracle = axios.create({
  baseURL: "https://owlracle.info",
});

export default owlracle;
