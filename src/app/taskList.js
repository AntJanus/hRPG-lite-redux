import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTask } from './actions';

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
    const { onCompleteTask, tasks } = this.props;

    let newTask;

    return (
      <div>
        <input type="text" ref={node => { newTask = node }} />
        <a onClick={(e) => this.addTask(newTask.value)}>
          <span className="fa fa-plus"></span>
        </a>
        <ul className="tasks">
          { tasks.map(task =>
            <li className={ task.completed ? '' : parseInt(task.value) > 0 ? 'task-positive' : parseInt(task.value) < 0 ? 'task-negative' : 'task-neutral' }
                key={task.id}>
                <a className="task-action"
                  onClick={() => onCompleteTask(task)}
                >
                  <span className="fa fa-square-o"></span>
                </a>

                <span className="task-content">
                  {task.text}
                  {task.streak ? (
                      <span>
                        {' ' + task.streak}
                        <span className="fa fa-forward"></span>
                      </span>
                    ): ''}
                </span>

            </li>
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
