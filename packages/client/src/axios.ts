import axios from "axios";

let instance = axios.create({
  baseURL: "http://localhost:4000/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default instance;
