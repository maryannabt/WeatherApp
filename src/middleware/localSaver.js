export const saveStateLocally = store => next => action => {
  next(action);
  localStorage.setItem(
    "weatherAppFavs",
    JSON.stringify(store.getState().mainReducer.favorites)
  );
  return;
};

export const getLocalState = () =>
  JSON.parse(localStorage.getItem("weatherAppFavs")) || [];
