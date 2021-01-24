export const apiKey = `${process.env.REACT_APP_API_KEY}`;
export const endPoints = {
  geoposition: `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=`,
  forecast: "https://dataservice.accuweather.com/forecasts/v1/daily/5day/",
  autocompleteSearch: `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=`,
  currentConditions: `https://dataservice.accuweather.com/currentconditions/v1/`
};
