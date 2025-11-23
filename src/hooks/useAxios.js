import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: "https://book-heaven-tawny.vercel.app", // change if needed
  withCredentials: true,
});
