import { GET_AUTH, UPDATE_AUTH, LOGOUT, GET_TASKS, RECEIVE_TASKS, UNCOMPLETED_TASK, COMPLETED_TASK, ADDED_TASK } from '<actions>/actions';

export default rootReducer;

export const initialState = {
  habit: [],
  daily: [],
  todo: [],
  auth: {},
  user: {}
};

function rootReducer(state = initialState, action) {
  var s = {};

  switch(action.type) {
    case GET_TASKS:
    case RECEIVE_TASKS:
      return Object.assign({}, state, processTasks(action.payload.tasks));
    case COMPLETED_TASK:
    case UNCOMPLETED_TASK:
      s[action.payload.task.type] = state[action.payload.task.type].map(task => reduceTask(task, action));
      return Object.assign({}, state, s);
    case ADDED_TASK:
      s[action.payload.task.type] = [ ...state[action.payload.task.type], action.payload.task];
      return Object.assign({}, state, s);
    case GET_AUTH:
      return Object.assign({}, state, { auth: action.payload.auth });
    case UPDATE_AUTH:
      return Object.assign({}, state, { auth: Object.assign({}, action.payload, { loggedIn: true }) } );
    case LOGOUT:
      return Object.assign({}, state, { auth: { loggedIn: false}});
    default:
      return state;
  };

  return state;
}

function userReducer(state, action) {

}

function reduceTask(state, action) {
  switch(action.type) {
    case COMPLETED_TASK:
      if(state.id !== action.payload.task.id) {
        return state;
      }

      return Object.assign({}, state, { completed: true });
    case UNCOMPLETED_TASK:
      if(state.id !== action.payload.task.id) {
        return state;
      }

      return Object.assign({}, state, { completed: false });
    default:
      return state;
  }
}


function processTasks(tasks) {
  return {
    habit: tasks.filter(task => task.type === 'habit'),
    daily: tasks.filter(task => task.type === 'daily'),
    todo: tasks.filter(task => task.type === 'todo')
  };
}
