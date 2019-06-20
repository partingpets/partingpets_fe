import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import AppNavbar from '../components/AppNavbar/AppNavbar';
import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Admin from '../components/pages/Admin/Admin';
import PartnersAdmin from '../components/pages/PartnersAdmin/PartnersAdmin';
import Products from '../components/pages/Products/Products';
import Profile from '../components/pages/Profile/Profile';
import Partners from '../components/pages/Partners/Partners';
import authRequests from '../helpers/data/authRequests';
import userRequests from '../helpers/data/userRequests';
import connection from '../helpers/data/connection';
import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  // props contains Location, Match, and History
  const routeChecker = props => (authed === false ? (
      <Component {...props} />
  ) : (
      <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
  ));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  // props contains Location, Match, and History
  const routeChecker = props => (authed === true ? (
      <Component {...props} />
  ) : (
      <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
  ));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    pendingUser: true,
    userObject: {},
  };

  componentDidMount() {
    connection();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
        authRequests.getCurrentUserJwt();
        const user = authRequests.getCurrentUser();
        userRequests.getUserByFbId(user.uid).then((currentUser) => {
          this.setState({
            userObject: currentUser,
          });
        });
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, pendingUser, userObject } = this.state;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({
        authed: false,
      });
    };

    if (pendingUser) {
      return null;
    }

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <AppNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} userObject={userObject} />
            <div className="app-content container-fluid">
              <div className="justify-content-center">
                <Switch>
                  <PublicRoute path="/auth" component={Auth} authed={authed} />
                  <PrivateRoute path="/profile" component={() => <Profile userObject={userObject} />} authed={authed} />
                  <PrivateRoute path="/partners" component={() => <Partners userObject={userObject} />} authed={authed} />
                  <PrivateRoute path="/admin" component={() => <Admin userObject={userObject} />} authed={authed} />
                  <PrivateRoute path="/partnersadmin" component={() => <PartnersAdmin userObject={userObject} />} authed={authed} />
                  <PrivateRoute path="/store" component={() => <Products userObject={userObject} />} authed={authed}  />
                  <PrivateRoute path="/" component={Home} authed={authed} />
                  <PrivateRoute path="/home" component={Home} authed={authed} />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
