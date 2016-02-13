export function storeAuth({ getState }) {
  return (next) => (action) => {
    let state = getState();

    let returnValue = next(action);

    if(state.auth && state.auth.uuId && state.auth.apiKey) {
      localStorage.setItem('auth', JSON.stringify(state.auth));
    }

    return returnValue;
  };
}
