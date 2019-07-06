import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Badge,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import authRequests from '../../helpers/data/authRequests';
import './AppNavbar.scss';

import pets from './images/pets_small.png';

class AppNavbar extends React.Component {
  state = {
    isOpen: false,
    cartCount: 0,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  componentWillReceiveProps(props) {
    // Ask how to better dhandle this.  Seems silly
    if (props.cartCount || props.cartCount === 0) {
      this.setState({
        cartCount: props.cartCount,
      });
    }
  }

  render() {
    const { cartCount } = this.state;
    const { isAuthed, logoutClickEvent, userObject } = this.props;
    const profileImgUrl = () => authRequests.getCurrentUser().photoURL;
    const buildNavbar = () => {
      if (isAuthed) {
        return (
          <Nav className="navBar ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/home">
                <i className="navIcon lnr lnr-earth" />
                Portal
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/store">
                <i className="navIcon lnr lnr-paw" />
                Store
              </NavLink>
            </NavItem>
            <NavItem>
              {userObject.isPartner ? (
                <NavLink tag={RRNavLink} to="/partners">
                  <i className="navIcon lnr lnr-layers" />
                  My Items
                </NavLink>
              ) : (
                ''
              )}
            </NavItem>
            <NavItem>
              {userObject.isAdmin ? (
                <NavLink tag={RRNavLink} to="/admin">
                  <i className="navIcon lnr lnr-cog" />
                  Admin
                </NavLink>
              ) : (
                ''
              )}
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/cart">
                <i className="navIcon lnr lnr-cart" />
                <Badge className="cart-badge" color="warning" hidden={cartCount === 0}>
                  {cartCount}
                </Badge>
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <img className="navIcon profIcon" src={profileImgUrl()} alt="ProfilePic" />
              </DropdownToggle>
              <DropdownMenu right className="bg-dark">
                <DropdownItem tag={RRNavLink} className="profBtn nav-link" to="/profile">
                  <i className="navIcon lnr lnr-user" />
                  Profile
                </DropdownItem>
                <DropdownItem tag={RRNavLink} className="profBtn nav-link" to="/orders">
                  <i className="navIcon lnr lnr-layers" />
                  Orders
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem className="profBtn nav-link" onClick={logoutClickEvent} to="/home">
                  <i className="navIcon lnr lnr-chevron-right-circle" />
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar />;
    };

    return (
      <div className="AppNavbar">
        <Navbar color="dark" dark expand="md" fixed={'top'}>
          <NavbarBrand tag={RRNavLink} to="/home">
            <img src={pets} className="petsNavLogo" alt="pets_logo" />
          </NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} className="navbar-dark" />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
