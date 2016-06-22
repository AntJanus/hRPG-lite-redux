import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getAuth, updateUserAuth, fetchTasks, getCurrentUser } from '<actions>/actions';

//components
import TaskList from '<views>/taskList';
import Navigation from '<views>/nav';

class HabiticaApp extends Component {
  constructor(props) {
    super(props);
  }

  refreshTasks() {
    const { dispatch, auth } = this.props;

    dispatch(fetchTasks());
  }

  componentDidMount() {
    const { dispatch, auth } = this.props;

    dispatch(getAuth());
    dispatch(getCurrentUser());

    this.refreshTasks();
  }

  render() {
    const { dispatch, habit, daily, todo, auth } = this.props;

    let apiKey, uuId;

    return (
      <div>
        <Navigation />

        { auth && auth.apiKey && auth.uuId ? (
          <div className="container">
            <div className="col col-4"k>
              <h3>Habits</h3>
              <TaskList tasks={habit} />
            </div>
            <div className="col col-4">
              <h3>Dailies</h3>
              <TaskList tasks={daily} />
            </div>
            <div className="col col-4">
              <h3>Todos</h3>
              <TaskList tasks={todo} />
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
