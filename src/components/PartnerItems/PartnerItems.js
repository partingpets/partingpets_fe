import React from 'react';
import './PartnerItems.scss';

class PartnerItems extends React.Component {
  deletePartner = (e) => {
    e.preventDefault();
    const { deleteSinglePartner, partner } = this.props;
    deleteSinglePartner(partner.id);
  };

  editPartner = (e) => {
    e.preventDefault();
    const partnerId = e.target.id;
    const { passPartnerToEdit } = this.props;
    passPartnerToEdit(partnerId);
  };

  render() {
    const { partner } = this.props;

    const adminPartnerView = () => {
      if (!partner.isDeleted) {
        return (
          <div>
            <h1>{partner.name}</h1>
            <h3>{partner.street}</h3>
            <h3>{partner.city}</h3>
            <h4>{partner.state}</h4>
            <h6>{partner.zipcode}</h6>
            <button id={partner.id} onClick={this.editPartner}>
              EDIT
            </button>
            <button onClick={this.deletePartner}>DELETE</button>
          </div>
        );
      }
      return (
          <div className="test-div">
            <h1>{partner.name}</h1>
            <h3>{partner.street}</h3>
            <h3>{partner.city}</h3>
            <h4>{partner.state}</h4>
            <h6>{partner.zipcode}</h6>
          </div>
      );
    };

    return <div>{adminPartnerView()}</div>;
  } 
}

export default PartnerItems;
