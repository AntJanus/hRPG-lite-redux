import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getAuth, updateUserAuth, logout, fetchTasks } from '<actions>/actions';

import UserStats from './userStats';

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
      return auth.loggedIn ? (<UserStats />) : (
        <div>
          <input type="text" ref={node => apiKey = node }  placeholder="Api Key"/>
          <input type="text" ref={node => uuId = node }  placeholder="UUID"/>
          <a onClick={(e) => this.updateAuth(apiKey.value, uuId.value)}>
            <span>Login</span>
          </a>
       </div>
      );
    };

    return (
      <div className="navigation">
        <div className="container">
          <div className="col col-2">
            <a className="nav-title">
              hRPG Lite Redux
            </a>
          </div>
          <div className="col col-7">
            {displayAuthentication()}
         </div>
         <div className="col col-3">
           <ul className="list--inline nav">
             <li>
               <a onClick={(e) => this.refreshTasks()}>
                Refresh <span className="fa fa-refresh"></span>
               </a>
             </li>
             <li>
               <a onClick={(e) => this.logout()}>Logout</a>
             </li>
           </ul>
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
