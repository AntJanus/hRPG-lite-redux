import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class UserStats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, user } = this.props;

    const stats = user.stats || {};

    var hpStyle = {
      backgroundColor: 'red',
      width: (stats.hp / 50 * 100)+ '%'
    };

    var mpStyle = {
      backgroundColor: 'blue',
      width: stats.mp + '%'
    };

    var lvlStyle = {
      backgroundColor: 'yellow',
      width: stats.lvl + '%'
    };

    return (
      <div>
        User stats:
            <div>
              <i className="fa fa-heart"></i>
              <div class="bar-container">
                <div class="bar-graph" style={hpStyle}>{stats.hp}</div>
              </div>
            </div>
            <div><i className="fa fa-fire"></i>
              <div class="bar-container">
                <div class="bar-graph" style={mpStyle}>{stats.mp}</div>
              </div>
            </div>
            <div><i className="fa fa-star"></i>
              <div class="bar-container">
                <div class="bar-graph" style={lvlStyle}>{stats.lvl}</div>
              </div>
            </div>
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
