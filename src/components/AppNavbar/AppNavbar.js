import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,
} from 'reactstrap';
import './AppNavbar.scss';

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
    const { isAuthed, logoutClickEvent } = this.props;
    const buildNavbar = () => {
      if (isAuthed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/home">
                <i className="fas fa-search-location fa-1x" />
                Portal
                {/* <i className="fas fa-users fa-2x" /> */}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/campaigns">
                <i className="fas fa-dungeon fa-1x" />
                Store
                {/* <i className="fas fa-users fa-2x" /> */}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} onClick={logoutClickEvent} to="/home">
                <i className="fas fa-sign-out-alt fa-1x" />
                Logout
                {/* <i className="fas fa-users fa-2x" /> */}
              </NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar />;
    };

    return (
      <div className="AppNavbar">
        <Navbar color="dark" dark expand="md" fixed={'top'}>
          <NavbarBrand tag={RRNavLink} to="/home">
            Parting Pets Portal
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
