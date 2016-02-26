export function storeAuth({ getState }) {
  return (next) => (action) => {
    let state = getState();

    let returnValue = next(action);

    console.log(state.auth, 'auth');
    if(state.auth.loggedIn) {
      localStorage.setItem('auth', JSON.stringify(state.auth));
    } else {
      localStorage.setItem('auth', JSON.stringify({}));
    }

    return returnValue;
  };
}
