import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
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
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isAuthed, logoutClickEvent, userObject } = this.props;
    const profileImgUrl = () => authRequests.getCurrentUser().photoURL;
    const buildNavbar = () => {
      if (isAuthed) {
        return (
          <Nav className="navBar ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/home">
                <i className="navIcon fas fa-globe fa-2x" />
                Portal
                {/* <i className="fas fa-users fa-2x" /> */}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/store">
                <i className="navIcon fas fa-paw fa-2x" />
                Store
              </NavLink>
            </NavItem>
            <NavItem>
              {userObject.isPartner ? (
                <NavLink tag={RRNavLink} to="/partners">
                  <i className="navIcon fas fa-boxes fa-2x" />
                  My Items
                </NavLink>
              ) : (
                ''
              )}
            </NavItem>
            <NavItem>
              {userObject.isAdmin ? (
                <NavLink tag={RRNavLink} to="/admin">
                  <i className="navIcon fas fa-users-cog fa-2x" />
                  Admin
                </NavLink>
              ) : (
                ''
              )}
            </NavItem>
            {/* <NavItem> */}
            {/* <NavLink tag={RRNavLink} onClick={logoutClickEvent} to="/home">
                <i className="navIcon fas fa-sign-out-alt fa-2x" />
                Logout
              </NavLink> */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <img className="navIcon profIcon" src={profileImgUrl()} alt="ProfilePic" />
                {/* <i className="navIcon fas fa-paw fa-2x" /> */}
                {/* Profile */}
              </DropdownToggle>
              <DropdownMenu right className="bg-dark">
                <DropdownItem tag={RRNavLink} className="profBtn nav-link" to="/profile">
                  <i className="navIcon fas fa-user fa-2x" />
                  Profile
                </DropdownItem>
                <DropdownItem className="profBtn nav-link" to="/orders">
                  <i className="navIcon fas fa-file-invoice-dollar fa-2x" />
                  Orders
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem className="profBtn nav-link" onClick={logoutClickEvent} to="/home">
                  <i className="navIcon fas fa-sign-out-alt fa-2x" />
                  Logout
                </DropdownItem>
                {/* <DropdownItem>Logout</DropdownItem> */}
              </DropdownMenu>
            </UncontrolledDropdown>
            {/* </NavItem> */}
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
