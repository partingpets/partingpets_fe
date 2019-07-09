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
import UsersAdmin from '../components/pages/UsersAdmin/UsersAdmin';
import ItemsAdmin from '../components/pages/ItemsAdmin/ItemsAdmin';
import OrdersAdmin from '../components/pages/OrdersAdmin/OrdersAdmin';
import Products from '../components/pages/Products/Products';
import ItemDetail from '../components/pages/ItemDetail/ItemDetail';
import Profile from '../components/pages/Profile/Profile';
import Orders from '../components/pages/Orders/Orders';
import Partners from '../components/pages/Partners/Partners';
import ShoppingCart from '../components/pages/ShoppingCart/ShoppingCart';
import cartRequests from '../helpers/data/cartRequests';
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
    cartCount: 0,
  };

  getCurrentUser = () => {
    const userId = authRequests.getCurrentUid();
    userRequests.getUserByFbId(userId).then((currentUser) => {
      this.setState({
        userObject: currentUser,
      });
      cartRequests.getUserCartById(currentUser.id).then((results) => {
        const filteredResults = results.filter(result => result.isDeleted === false);
        this.updateCartBadge(filteredResults.length);
      });
    });
  };

  updateCartBadge = (cartCount) => {
    this.setState({
      cartCount,
    });
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
        this.getCurrentUser();
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
    const {
      authed, pendingUser, userObject, cartCount,
    } = this.state;
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
            <AppNavbar
              isAuthed={authed}
              logoutClickEvent={logoutClickEvent}
              userObject={userObject}
              cartCount={cartCount}
            />
            <div className="app-content container-fluid">
              <div className="justify-content-center">
                <Switch>
                  <PublicRoute path="/auth" component={Auth} authed={authed} />
                  <PrivateRoute
                    path="/profile"
                    component={props => <Profile userObject={userObject} updateUser={this.getCurrentUser} {...props} />}
                    authed={authed}
                  />
                  <PrivateRoute
                    path="/orders"
                    component={props => <Orders userObject={userObject} updateUser={this.getCurrentUser} {...props} />}
                    authed={authed}
                  />
                  <PrivateRoute
                    path="/cart"
                    component={props => (
                      <ShoppingCart userObject={userObject} updateCartBadge={this.updateCartBadge} {...props} />
                    )}
                    authed={authed}
                  />
                  <PrivateRoute
                    path="/partners"
                    component={props => <Partners userObject={userObject} {...props} />}
                    authed={authed}
                  />
                  <PrivateRoute
                    path="/admin"
                    component={props => <Admin userObject={userObject} {...props} />}
                    authed={authed}
                  />
                  <PrivateRoute
                    path="/partnersadmin"
                    component={props => <PartnersAdmin userObject={userObject} {...props} />}
                    authed={authed}
                  />
                  <PrivateRoute
                    path="/usersadmin"
                    component={props => <UsersAdmin userObject={userObject} {...props} />}
                    authed={authed}
                  />
                  <PrivateRoute
                    path="/itemsadmin"
                    component={props => <ItemsAdmin userObject={userObject} {...props} />}
                    authed={authed}
                  />
                  <PrivateRoute
                    path="/ordersadmin"
                    component={props => <OrdersAdmin userObject={userObject} {...props} />}
                    authed={authed}
                  />
                  <PrivateRoute
                    path="/store/:id"
                    component={props => (
                      <ItemDetail userObject={userObject} updateCartBadge={this.updateCartBadge} {...props} />
                    )}
                    authed={authed}
                  />
                  <PrivateRoute
                    path="/store"
                    component={props => <Products userObject={userObject} {...props} />}
                    authed={authed}
                  />
                  <PrivateRoute
                    path="/"
                    component={props => <Home userObject={userObject} updateUser={this.getCurrentUser} {...props} />}
                    authed={authed}
                  />
                  <PrivateRoute
                    path="/home"
                    component={props => <Home userObject={userObject} updateUser={this.getCurrentUser} {...props} />}
                    authed={authed}
                  />
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
