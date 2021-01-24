export const showStore = store => next => action => {
  console.log("Dispatching", action);
  next(action);
  console.log("New Store: ", store.getState());
  return;
};
