import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:3000", // change if needed
  withCredentials: true,
});
