import React from "react";
import axios from "axios";
import { getAuthData, clearLoginData } from "../utils/authHelper";

export const axiosExternal = axios.create({
  baseURL: "https://backoffice.symamlaw.com/api",
  timeout: 8000,
  headers: {
    Accept: 'application/json'
  },
});
axiosExternal.interceptors.request.use(async function (config) {
  let { token } = await getAuthData() as any;
  // config.timeout = 0;
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
}, function (error) {
  // Do something with request error
  console.log("Some error", error)
  return Promise.reject(error);
});
axiosExternal.interceptors.response.use(
  function (response) {
    return response;
  },
  (error) => {
    if (error.config) {
      if (!error.response) return Promise.reject(error);
      if (error.response.status === 401) {
        clearLoginData();
        // window.location.href = "/login"
        //   navigate("/login");
      }
    }
    return Promise.reject(error);
  }
);

