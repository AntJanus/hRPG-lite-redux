import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getAuth, updateUserAuth, fetchTasks, completeTask } from './actions';
import TaskList from './taskList';

class HabiticaApp extends Component {
  constructor(props) {
    super(props);
  }

  updateAuth(apiKey, uuId) {
    const { dispatch } = this.props;
    dispatch(updateUserAuth(apiKey, uuId));
    this.refreshTasks();
  }

  refreshTasks() {
    const { dispatch, auth } = this.props;

    dispatch(fetchTasks());
  }

  handleCompleteTask(task) {
    const { dispatch, auth } = this.props;
    dispatch(completeTask(task));
  }

  componentDidMount() {
    const { dispatch, auth } = this.props;

    dispatch(getAuth());

    this.refreshTasks();
  }
  render() {
    const { dispatch, habit, daily, todo, auth } = this.props;

    let apiKey, uuId;

    return (
      <div>
        <div className="container">
          <div className="col col-4">
            <a onClick={(e) => this.refreshTasks()}><span className="fa fa-refresh"></span></a>
          </div>
          <div className="col col-4">
            <input type="text" ref={node => apiKey = node }  placeholder="Api Key"/>
            <input type="text" ref={node => uuId = node }  placeholder="UUID"/>
            <a onClick={(e) => this.updateAuth(apiKey.value, uuId.value)}>
              <span className="fa fa-plus"></span>
            </a>
          </div>
        </div>

        { auth && auth.apiKey && auth.uuId ? (
          <div className="container">
            <div className="col col-4"k>
              <h3>Habits</h3>
              <TaskList tasks={habit}
                onCompleteTask={(task) => this.handleCompleteTask(task)}
              />
            </div>
            <div className="col col-4">
              <h3>Dailies</h3>
              <TaskList tasks={daily}
                onCompleteTask={(task) => this.handleCompleteTask(task)}
            />
            </div>
            <div className="col col-4">
              <h3>Todos</h3>
              <TaskList tasks={todo}
                onCompleteTask={(task) => this.handleCompleteTask(task)}
              />
            </div>
          </div>
        ) : 'Please log in' }
      </div>
    );
  }
}

HabiticaApp.propTypes = {
  habit: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  daily: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  todo: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired
};


function select(state) {
  return {
    auth: state.auth,
    habit: state.habit,
    daily: state.daily,
    todo: state.todo.filter(task => !task.completed)
  };
}

export default connect(select)(HabiticaApp);
