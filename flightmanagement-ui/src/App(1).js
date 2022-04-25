import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from './components/util/APIUtils';
import { ACCESS_TOKEN } from './components/constants';


import Signup from './components/signup/Signup';
import Login  from './components/Login/Login';
import AppHeader from './components/common/AppHeader';
import NotFound from './components/common/NotFound';
import PrivateRoute from './components/common/PrivateRoute';

import Landing from './landingpage';
import Search from './components/search/Search';
import Booking from './components/booking/Booking';
import SearchBooking from './components/booking/SearchBooking';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: true
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  
  }

  loadCurrentUser() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    

  }

  handleLogin() {

    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    
    return (
        <div className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} />
          <div className="app-content">
            <div className="container">
              <Switch>      
                <Route exact path="/" component={Landing}></Route>
                <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/search" component={Search} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/booking/:id" component={Booking} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/bookings" component={SearchBooking} handleLogout={this.handleLogout}></PrivateRoute>
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </div>
        </div>
    );
  }
}

export default withRouter(App);
