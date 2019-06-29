import React from 'react';
// import { NavLink as RRNavLink } from 'react-router-dom';
// import {
//   UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
// } from 'reactstrap';

import partners from '../../../images/handshake.png';
import users from '../../../images/users.png';
import invoices from '../../../images/invoice.png';
import items from '../../../images/paw.png';

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
                <img src={partners} className="admin-icon" alt="partners" />
              </h4>
              <h5 className="card-subtitle mb-2 text-muted">PARTNERS</h5>
              <p className="card-text">Manage Partners</p>
            </div>
          </div>
          <div className="card admin-card border-dark" id="usersadmin" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title">
                <img src={users} className="admin-icon" alt="users" />
              </h4>
              <h5 className="card-subtitle mb-2 text-muted">USERS</h5>
              <p className="card-text">Manage Users</p>
            </div>
          </div>
          <div className="card admin-card border-dark" id="invoicesadmin" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title">
                <img src={invoices} className="admin-icon" alt="invoices" />
              </h4>
              <h5 className="card-subtitle mb-2 text-muted">INVOICES</h5>
              <p className="card-text">Manage Invoices</p>
            </div>
          </div>

          <div className="card admin-card border-dark" id="itemsadmin" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title">
                <img src={items} className="admin-icon" alt="items" />
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
