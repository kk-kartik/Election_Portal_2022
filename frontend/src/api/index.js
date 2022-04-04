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
export const fetchImportantDates = () => API.get("/imp_dates");
export const addImportantDateAPI = (newDate) =>
  API.post("/imp_dates/", newDate);
export const editImportantDateAPI = (id, updateDate) =>
  API.put(`/imp_dates/${id}/`, updateDate);

export const deleteImportantDate = (id) => API.delete(`/imp_dates/${id}`);
