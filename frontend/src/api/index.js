import axios from "axios";
import { BASEURL, BASEAPIURL, VALIDAPIURL } from "../constants";

export const API = axios.create({
  baseURL: `${BASEAPIURL}`,
  withCredentials: true,
});

export const VALIDAPI = axios.create({
  baseURL: `${VALIDAPIURL}`,
});

export const AUTH_API = axios.create({
  baseURL: `https://swc.iitg.ac.in/elections_api/auth`,
  withCredentials: true,
});

export const fetchUserData = () => API.get("/profile");
export const verifyLogin = () => AUTH_API.get("/token/verify/");
export const userRegistration = (data) => API.put("/registration/complete/",data);
export const logout = () => AUTH_API.get("/logout/");

// Important Dates API
export const fetchImportantDates = () => API.get("/imp_dates");
export const addImportantDateAPI = (newDate) =>
  API.post("/imp_dates/", newDate);
export const editImportantDateAPI = (id, updateDate) =>
  API.put(`/imp_dates/${id}/`, updateDate);
export const deleteImportantDate = (id) => API.delete(`/imp_dates/${id}/`);

// FAQs API
export const fetchFAQs = () => API.get("/faqs");
export const addFAQ = (newFAQ) => API.post("/faqs/", newFAQ);
export const editFAQ = (id, updateFAQ) => API.put(`/faqs/${id}/`, updateFAQ);
export const deleteFAQ = (id) => API.delete(`/faqs/${id}/`);

//Debates API
export const fetchDebates = () => API.get("/debates");
export const addDebate = (newDebate) => API.post("/debates/", newDebate);
export const editDebate = (id, updateDebate) =>
  API.put(`/debates/${id}/`, updateDebate);
export const deleteDebate = (id) => API.delete(`/debates/${id}/`);

  