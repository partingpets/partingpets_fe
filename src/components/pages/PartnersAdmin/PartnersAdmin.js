import React from 'react';
import partnerRequests from '../../../helpers/data/partnerRequests';
import PartnerItems from '../PartnerItems/PartnerItems';
import './PartnersAdmin.scss';

class PartnersAdmin extends React.Component {
state = {
    partners: [],
}

getPartners = () => {
    partnerRequests.getAllPartners()
    .then((partners) => {
        this.setState({ partners });
        console.log(partners.data);
    })
    .catch((err) => {
        console.error('error in getting the partners', err)
    });
};

componentDidMount() {
    this.getPartners();
}

render() {
    const { partners } = this.state;
    const partnersComponents = partners.map(partner => (
        <PartnerItems
        key={partner.id}
        partner={partner}
        />
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