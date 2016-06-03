import React, { Component } from 'react';

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

  render() {
    const { onCompleteTask, task } = this.props;

    let taskState = task.completed || !this.isAvailable(task.repeat) ? '' : parseInt(task.value) > 0 ? 'task-positive' : parseInt(task.value) < 0 ? 'task-negative' : 'task-neutral';
    let taskIcon = task.completed ? 'fa fa-check-square-o' : 'fa fa-square-o';

    return (
      <li className={taskState}>
          <a className="task-action"
            onClick={() => onCompleteTask(task)}>
            <span className={taskIcon}></span>
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
    );
  }
}

export default Task;
