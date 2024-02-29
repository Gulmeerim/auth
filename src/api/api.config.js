import axios from "axios";
import { BASE_URL } from "../constants";

export const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  config.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  // config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  // config.headers["Access-Control-Allow-Credentials"] = true;
  return config;
});
