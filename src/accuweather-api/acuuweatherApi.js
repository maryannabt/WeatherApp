import { endPoints, apiKey } from "./config";
import axios from "axios";

export const getGeopositionApi = position => {
  return axios.get(endPoints.geoposition + position);
};

export const getFiveDaysForecastApi = cityKey => {
  return axios.get(endPoints.forecast + cityKey + `?apikey=${apiKey}`);
};

export const getSuggestionsApi = query => {
  return axios.get(endPoints.autocompleteSearch + query);
};

export const getCurrentConditionsApi = cityKey => {
  return axios.get(endPoints.currentConditions + cityKey + `?apikey=${apiKey}`);
};
