import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeTask, uncompleteTask } from '<actions>/actions';

const date = new Date();

const day = date.getDay();

const days = [
  'su',
  'm',
  't',
  'w',
  'th',
  'f',
  's'
];

class Task extends Component {

  constructor(props) {
    super(props);
  }

  isAvailable(taskRepeat) {
    var currentDay = days[day];

    return !taskRepeat || taskRepeat[currentDay];
  }

  completeTask(task) {
    const { dispatch } = this.props;

    dispatch(completeTask(task));
  }

  uncompleteTask(task) {
    const { dispatch } = this.props;

    dispatch(uncompleteTask(task));
  }

  render() {
    const { task } = this.props;

    let taskDown = 'fa fa-check-square-o';
    let taskUp = 'fa fa-square-o';

    let taskState = task.completed || !this.isAvailable(task.repeat) ? '' : parseInt(task.value) > 0 ? 'task-positive' : parseInt(task.value) < 0 ? 'task-negative' : 'task-neutral';
    let taskIcon = task.completed ? taskDown : taskUp;

    var taskActionBar = task.type === 'habit' ? (
      <span>
        <a className="task-action"
          onClick={() => this.completeTask(task)}>
          <span className="fa fa-plus-square-o"></span>
        </a>
        <a className="task-action"
          onClick={() => this.uncompleteTask(task)}>
          <span className="fa fa-minus-square-o"></span>
        </a>
      </span>
    ) : (
      <a className="task-action"
        onClick={() => task.completed ? this.uncompleteTask(task) : this.completeTask(task)}>
        <span className={taskIcon}></span>
      </a>
    );

    return (
      <li className={taskState}>
        {taskActionBar}
        <span className="task-content">
          {task.text}
          {task.streak ? (
            <span>
              {' ' + task.streak}
              <span className="fa fa-forward"></span>
            </span>
            ) : ''}
        </span>
      </li>
    );
  }
}

function select(state) {
  return { };
}

export default connect(select)(Task);
