import axios from "axios";
import { BASEURL, BASEAPIURL } from "../constants";

const API = axios.create({
  baseURL: `${BASEAPIURL}`,
  withCredentials: true,
});

// Important Dates API
export const fetchImportantDates = () => API.get("/importantdates");
