import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class UserStats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, user } = this.props;

    const stats = user.stats || {};

    return (
      <div>
        User stats:
          <ul>
            <li>HP: {stats.hp}</li>
            <li>MP: {stats.mp}</li>
            <li>Lvl: {stats.lvl}</li>
          </ul>
      </div>
    );
  }
}

function select(state) {
  return {
    user: state.user
  };
}
export default connect(select)(UserStats);
