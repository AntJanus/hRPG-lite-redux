import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTask } from '<actions>/actions';

//components
import Task from './task';

class TaskList extends Component {

  constructor(props) {
    super(props);
  }

  addTask(name) {
    const { dispatch, auth, tasks } = this.props;

    var type = tasks[0].type;

    dispatch(addTask(name, type));
  }

  render() {
    const { tasks } = this.props;

    let newTask;

    return (
      <div>
        <input type="text" ref={node => { newTask = node }} />
        <a onClick={(e) => this.addTask(newTask.value)}>
          <span className="fa fa-plus"></span>
        </a>
        <ul className="tasks">
          { tasks.map(task =>
            <Task task={task} key={task.id} />
          )}
        </ul>
      </div>
    );
  }
}

function select(state) {
  return { auth: state.auth };
}

export default connect(select)(TaskList);
