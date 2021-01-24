import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { saveStateLocally, getLocalState } from "../middleware/localSaver";
import { showStore } from "../middleware/showStore";
import rootReducer from "./root.reducer";

const middleware = [thunk, saveStateLocally, showStore];

const preloadedState = {
  mainReducer: {
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
    favorites: getLocalState()
  }
};

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(...middleware)
);

export default store;
