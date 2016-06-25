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
            <div><i className="fa fa-heart"></i> {stats.hp}</div>
            <div><i className="fa fa-fire"></i> {stats.mp}</div>
            <div><i className="fa fa-star"></i> {stats.lvl}</div>
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
