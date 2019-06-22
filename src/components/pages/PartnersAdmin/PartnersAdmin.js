import React from 'react';
import partnerRequests from '../../../helpers/data/partnerRequests';
import PartnerItems from '../PartnerItems/PartnerItems';
import './PartnersAdmin.scss';

class PartnersAdmin extends React.Component {
  state = {
    partners: [],
  };

  componentDidMount() {
    partnerRequests
      .getAllPartners()
      .then((partners) => {
        this.setState({ partners });
      })
      .catch((err) => {
        console.error('error in getting the partners', err);
      });
  }

  deleteOnePartner = (partnerId) => {
    partnerRequests
      .deletePartner(partnerId)
      .then(() => {
        partnerRequests.getAllPartners().then((partners) => {
          this.setState({ partners });
        });
      })
      .catch((err) => {
        console.error('error in deleting the partner', err);
      });
  };

  render() {
    const { partners } = this.state;
    const partnersComponents = partners.map(partner => (
      <PartnerItems key={partner.id} partner={partner} deleteSinglePartner={this.deleteOnePartner} />
    ));
    return (
      <div className="partners-admin-container">
        <h1>Manage The Partners</h1>
        <ul>{partnersComponents}</ul>
      </div>
    );
  }
}

export default PartnersAdmin;
