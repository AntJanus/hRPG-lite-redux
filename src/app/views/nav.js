import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getAuth, updateUserAuth, logout, fetchTasks } from '../actions/actions';

class Navigation extends Component {

  constructor(props) {
    super(props);
  }

  updateAuth(apiKey, uuId) {
    const { dispatch } = this.props;
    dispatch(updateUserAuth(apiKey, uuId));
    this.refreshTasks();
  }

  refreshTasks() {
    const { dispatch, auth } = this.props;

    dispatch(fetchTasks());
  }

  logout() {
    const { dispatch } = this.props;

    dispatch(logout());
  }

  render() {
    const { dispatch, habit, daily, todo, auth } = this.props;

    let apiKey, uuId;

    let displayAuthentication = () => {
      return auth.loggedIn ? (<div></div>) : (
        <div>
          <input type="text" ref={node => apiKey = node }  placeholder="Api Key"/>
          <input type="text" ref={node => uuId = node }  placeholder="UUID"/>
          <a onClick={(e) => this.updateAuth(apiKey.value, uuId.value)}>
            <span className="fa fa-plus"></span>
          </a>
       </div>
      );
    }

    return (
      <div>
        <div className="container">
          <div className="col col-4">
            <a onClick={(e) => this.refreshTasks()}><span className="fa fa-refresh"></span></a>
            <a onClick={(e) => this.logout()}>Logout</a>
          </div>
          <div className="col col-4">
            {displayAuthentication()}
         </div>
        </div>
      </div>
    );
  }
}


function select(state) {
  return {
    auth: state.auth
  };
}

export default connect(select)(Navigation);
