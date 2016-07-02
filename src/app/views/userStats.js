import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class UserStats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, userStats } = this.props;

    const stats = userStats || {};

    if (!stats.hp) {
      return (<div></div>);
    }

    var parentStyle = {
      display: 'inline-block',
      width: '85%',
      marginLeft: '5px'
    };

    var hpStyle = {
      width: (stats.hp / stats.maxHealth * 100)+ '%'
    };

    var mpStyle = {
      width: (stats.mp / stats.maxMP * 100) + '%'
    };

    var xpStyle = {
      width: (stats.exp / stats.toNextLevel * 100) + '%'
    };

    return (
      <div className="container">
        <div className="col col-4">
          <i className="fa fa-heart"></i>
          <div className="bar-container hp-container">
            <div className="bar-graph" style={hpStyle}>{Math.round(stats.hp)}</div>
          </div>
        </div>
        <div className="col col-4"><i className="fa fa-fire"></i>
          <div className="bar-container mp-container">
            <div className="bar-graph" style={mpStyle}>{Math.round(stats.mp)}</div>
          </div>
        </div>
        <div className="col col-4"><i className="fa fa-star"></i>
          <div className="bar-container xp-container">
            <div className="bar-graph" style={xpStyle}>{Math.round(stats.exp)}</div>
          </div>
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    userStats: state.userStats
  };
}
export default connect(select)(UserStats);
