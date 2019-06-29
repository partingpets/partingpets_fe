import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

import clueBkg from '../../../images/rocks.png';
import trophy from '../../../images/trophy.png';
import earth from '../../../images/earth.png';

import './Admin.scss';

class Admin extends React.Component {
  // Change View Function //

  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  };

  render() {
    return (
    // <div className="admin-container">
    //   <h1>Admin</h1>
    //   <UncontrolledDropdown>
    //     <DropdownToggle>Manage</DropdownToggle>
    //     <DropdownMenu>
    //       <DropdownItem tag={RRNavLink} to="/partnersadmin">
    //         Partners
    //       </DropdownItem>
    //       <DropdownItem>Users</DropdownItem>
    //     </DropdownMenu>
    //   </UncontrolledDropdown>
    // </div>

      <div className="admin-home mx-auto animated bounceInLeft">
        <h2>Welcome Parting Pets Admin. Manage Your Users, Partners, Items & Invoices</h2>
        <div className="deck card-deck mt-5">
          <div className="card admin-card border-dark" id="partnersadmin" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title">
                <img src={clueBkg} alt="rocks glasses" />
              </h4>
              <h5 className="card-subtitle mb-2 text-muted">PARTNERS</h5>
              <p className="card-text">Manage Partners</p>
            </div>
          </div>
          <div className="card admin-card border-dark" id="usersadmin" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title">
                <img src={trophy} alt="trophy" />
              </h4>
              <h5 className="card-subtitle mb-2 text-muted">USERS</h5>
              <p className="card-text">Manage Users</p>
            </div>
          </div>
          <div className="card admin-card border-dark" id="invoicesadmin" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title">
                <img src={earth} alt="earth" />
              </h4>
              <h5 className="card-subtitle mb-2 text-muted">INVOICES</h5>
              <p className="card-text">Manage Invoices</p>
            </div>
          </div>

          <div className="card admin-card border-dark" id="itemsadmin" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title">
                <img src={earth} alt="earth" />
              </h4>
              <h5 className="card-subtitle mb-2 text-muted">ITEMS</h5>
              <p className="card-text">Manage Partner Items</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
