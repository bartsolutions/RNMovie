let _store;
export const setStore = (store) => {
  if (!_store) {
    _store = store
 ; }
};

export const getStore = () =>
     _store
;

export const getState = () => {
  let state;

  if (_store) {
    state = _store.getState()
 ; }

  return state;
};
