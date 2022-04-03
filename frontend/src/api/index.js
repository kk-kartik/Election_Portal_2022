import axios from "axios";
import { BASEURL, BASEAPIURL, VALIDAPIURL } from "../constants";

export const API = axios.create({
  baseURL: `${BASEAPIURL}`,
  withCredentials: true,
});

export const VALIDAPI = axios.create({
  baseURL: `${VALIDAPIURL}`,
});

// Important Dates API
export const fetchImportantDates = () => API.get("/sgc2022/imp_dates");
