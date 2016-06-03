import fetch from 'isomorphic-fetch';

//action types
export const GET_AUTH = 'GET_AUTH';
export const UPDATE_AUTH = 'UPDATE_AUTH';

export const LOGOUT = 'LOGOUT';

export const GET_TASKS = 'GET_TASKS';
export const RECEIVE_TASKS = 'RECEIVE_TASKS';

export const ADD_TASK = 'ADD_TASK';
export const ADDED_TASK = 'ADDED_TASK';
export const COMPLETED_TASK = 'COMPLETED_TASK';
export const FAIL_TASK = 'FAIL_TASK';

export function getAuth() {
  let auth = JSON.parse(localStorage.getItem('auth'));

  return {
    type: GET_AUTH,
    payload: {
      auth
    }
  };
}

export function updateUserAuth(apiKey, uuId) {
  return {
    type: UPDATE_AUTH,
    payload: {
      uuId,
      apiKey
    }
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function receiveTasks(tasks) {
  return {
    type: RECEIVE_TASKS,
    payload: {
      tasks
    }
  };
}

export function fetchTasks() {
  return function(dispatch, getState) {
    let state = getState();

    if(!state.auth || !state.auth.apiKey || !state.auth.uuId) {
      return;
    }

    return fetch(`https://habitica.com/api/v3/tasks/user`, {
        headers: {
          "X-API-User": state.auth.uuId,
          "X-Api-Key": state.auth.apiKey
        }
      })
      .then(response =>  response.json())
      .then((json) => {
        dispatch(receiveTasks(json.data));
      })
    ;

  };
}

export function completeTask(task) {
  return function(dispatch, getState) {
    return fetch(`https://habitica.com/api/v3/tasks/${task.id}/score/up`, {
          method: 'post',
          headers: {
            "X-API-User": getState().auth.uuId,
            "X-Api-Key": getState().auth.apiKey
          }
        }
      )
      .then((response) => {
        dispatch(completedTask(task));
      })
    ;
  };
}

export function completedTask(task) {
  return {
    type: COMPLETED_TASK,
    payload: {
      task
    }
  };
};

export function failedTask(id, type) {
  return {
    type: FAIL_TASK,
    payload: {
      id,
      type
    }
  };
}

export function addTask(name, type) {
  return function(dispatch, getState) {
    return fetch(`https://habitica.com/api/v3/tasks/user`, {
          method: 'post',
          headers: {
            "Content-Type": "application/json",
            "X-API-User": getState().auth.uuId,
            "X-Api-Key": getState().auth.apiKey
          },
          body: JSON.stringify({
            type,
            text: name,
            value: 0,
            tags: [],
            notes: ''
          })
        }
      )
      .then(response =>  response.json())
      .then((json) => {
        dispatch(addedTask(json.data));
      })
    ;
  };
}

export function addedTask(task) {
  return {
    type: ADDED_TASK,
    payload: {
      task
    }
  };
}
