import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class UserStats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, user } = this.props;

    const stats = user.stats || {};

    var parentStyle = {
      display: 'inline-block',
      width: '85%',
      marginLeft: '5px'
    };

    var hpParentStyle = Object.assign({}, parentStyle, {
      border: '1px solid red'
    });

    var hpStyle = {
      backgroundColor: 'red',
      width: (stats.hp / 50 * 100)+ '%'
    };

    var mpParentStyle = Object.assign({}, parentStyle, {
      border: '1px solid blue'
    });

    var mpStyle = {
      backgroundColor: 'blue',
      width: stats.mp + '%'
    };

    var lvlParentStyle = Object.assign({}, parentStyle, {
      border: '1px solid yellow'
    });

    var lvlStyle = {
      backgroundColor: 'yellow',
      width: (stats.lvl) + '%'
    };

    return (
      <div className="container">
        <div className="col col-4">
          <i className="fa fa-heart"></i>
          <div class="bar-container" style={hpParentStyle}>
            <div class="bar-graph" style={hpStyle}>{Math.round(stats.hp)}</div>
          </div>
        </div>
        <div className="col col-4"><i className="fa fa-fire"></i>
          <div class="bar-container" style={mpParentStyle}>
            <div class="bar-graph" style={mpStyle}>{Math.round(stats.mp)}</div>
          </div>
        </div>
        <div className="col col-4"><i className="fa fa-star"></i>
          <div class="bar-container" style={lvlParentStyle}>
            <div class="bar-graph" style={lvlStyle}>{Math.round(stats.lvl)}</div>
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
