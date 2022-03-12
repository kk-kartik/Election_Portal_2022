import axios from "axios";
import { BASEURL, BASEAPIURL } from "../constants";

const API = axios.create({
  baseURL: `${BASEAPIURL}`,
  withCredentials: true,
});
