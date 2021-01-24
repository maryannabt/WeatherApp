import {
  CHANGE_NIGHT_MODE,
  CHANGE_TEMP_UNIT,
  TOGGLE_SIDE_DRAWER,
  GET_SUGGESTIONS,
  CLEAR_SUGGESTIONS,
  ERROR,
  CLEAR_ERROR,
  LOADING,
  UPDATE_CITY,
  GET_FIVE_DAYS_WEATHER,
  GET_CURRENT_CONDITIONS,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES
} from "./action";

const initialState = {
  nightMode: false,
  imperialUnit: false,
  sideDrawerOpen: false,
  suggestions: [],
  error: "",
  loading: true,
  cityName: "",
  cityKey: "",
  fiveDaysWeather: {},
  currentConditions: {},
  favorites: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NIGHT_MODE:
      return {
        ...state,
        nightMode: !state.nightMode
      };
    case CHANGE_TEMP_UNIT:
      return {
        ...state,
        imperialUnit: !state.imperialUnit
      };
    case TOGGLE_SIDE_DRAWER:
      return {
        ...state,
        sideDrawerOpen: !state.sideDrawerOpen
      };
    case GET_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.payload
      };
    case CLEAR_SUGGESTIONS:
      return { ...state, suggestions: [] };
    case LOADING:
      return { ...state, loading: true };
    case UPDATE_CITY:
      return {
        ...state,
        cityName: action.payload.cityName,
        cityKey: action.payload.cityKey,
        loading: false
      };
    case GET_FIVE_DAYS_WEATHER:
      return { ...state, fiveDaysWeather: action.payload };
    case GET_CURRENT_CONDITIONS:
      return { ...state, currentConditions: action.payload };
    case ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: ""
      };
    case ADD_TO_FAVORITES:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          city => city.cityKey !== action.payload
        )
      };
    default:
      return state;
  }
};
