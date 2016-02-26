import React, { Component } from 'react';

class Task extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { onCompleteTask, task } = this.props;

    let taskState = task.completed ? '' : parseInt(task.value) > 0 ? 'task-positive' : parseInt(task.value) < 0 ? 'task-negative' : 'task-neutral';

    return (
      <li className={taskState}>
          <a className="task-action"
            onClick={() => onCompleteTask(task)}>
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
    );
  }
}

export default Task;
