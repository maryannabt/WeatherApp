import {
  getSuggestionsApi,
  getFiveDaysForecastApi,
  getCurrentConditionsApi
} from "../accuweather-api/acuuweatherApi";

export const CHANGE_NIGHT_MODE = "CHANGE_NIGHT_MODE";
export const CHANGE_TEMP_UNIT = "CHANGE_TEMP_UNIT";
export const TOGGLE_SIDE_DRAWER = "TOGGLE_SIDE_DRAWER";
export const GET_SUGGESTIONS = "GET_SUGGESTIONS";
export const CLEAR_SUGGESTIONS = "CLEAR_SUGGESTIONS";
export const ERROR = "ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const LOADING = "LOADING";
export const UPDATE_CITY = "UPDATE_CITY";
export const GET_FIVE_DAYS_WEATHER = "GET_FIVE_DAYS_WEATHER";
export const GET_CURRENT_CONDITIONS = "GET_CURRENT_CONDITIONS";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

export const changeNightMode = () => ({ type: CHANGE_NIGHT_MODE });

export const changeTempUnit = () => ({ type: CHANGE_TEMP_UNIT });

export const toggleSideDrawer = () => ({ type: TOGGLE_SIDE_DRAWER });

export const getError = error => ({ type: ERROR, payload: error });

export const getSuggestions = query => {
  return async dispatch => {
    try {
      const result = await getSuggestionsApi(query);
      dispatch({ type: GET_SUGGESTIONS, payload: result.data });
    } catch (error) {
      dispatch({ type: ERROR, payload: error });
    }
  };
};

export const clearSuggestions = () => ({ type: CLEAR_SUGGESTIONS });

export const clearError = () => ({ type: CLEAR_ERROR });

export const getWeather = data => {
  return async dispatch => {
    dispatch({ type: LOADING });
    try {
      const weather = await getFiveDaysForecastApi(data.cityKey);
      const current = await getCurrentConditionsApi(data.cityKey);
      dispatch({ type: GET_FIVE_DAYS_WEATHER, payload: weather.data });
      dispatch({ type: GET_CURRENT_CONDITIONS, payload: current.data[0] });
      dispatch({ type: UPDATE_CITY, payload: data });
    } catch (error) {
      dispatch({ type: ERROR, payload: error });
    }
  };
};

export const addToFavorites = city => ({
  type: ADD_TO_FAVORITES,
  payload: city
});

export const removeFromFavorites = cityKey => ({
  type: REMOVE_FROM_FAVORITES,
  payload: cityKey
});
