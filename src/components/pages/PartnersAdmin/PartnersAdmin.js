import React from 'react';
import partnerRequests from '../../../helpers/data/partnerRequests';
import PartnerItems from '../PartnerItems/PartnerItems';
import AddPartnerModal from '../../AddPartnerModal/AddPartnerModal';
import './PartnersAdmin.scss';

class PartnersAdmin extends React.Component {
state = {
    partners: [],
    showModal: false,
}

componentDidMount() {
   partnerRequests.getAllPartners()
    .then((partners) => {
        this.setState({ partners });
    })
    .catch((err) => {
        console.error('error in getting the partners', err)
    });
}

showModal = (e) => {
    this.setState({
        hidden: !this.state.hidden,
        showModal: true,
    });
};

modalCloseEvent = () => {
    this.setState({
        hidden: !this.state.hidden,
        showModal: false,
    });
};

partnerFormSubmitEvent = (newPartner) => {
    partnerRequests.createPartner(newPartner)
    .then(() => {
        partnerRequests.getAllPartners()
        .then((partners) => {
            this.setState({ 
                partners, 
                showModal: false, 
            });
        });
    }
)};



deleteOnePartner = (partnerId) => {
    partnerRequests.deletePartner(partnerId)
    .then(() => {
        partnerRequests.getAllPartners()
        .then((partners) => {
            this.setState({ partners });
        });
    })
    .catch((err) => {
        console.error('error in deleting the partner', err)
    });
};

render() {
    const { partners } = this.state;
    const partnersComponents = partners.map(partner => (
     <PartnerItems
        key={partner.id}
        partner={partner}
        deleteSinglePartner={this.deleteOnePartner}
        />
        ));
    return (
        <div className="partners-admin-container">
            <h1>Manage The Partners</h1>
            <button onClick={this.showModal}>ADD NEW PARTNER</button>
            <AddPartnerModal
                showModal={this.state.showModal}
                modalCloseEvent={this.state.modalCloseEvent}
            />
            <ul>{partnersComponents}</ul>
        </div>
    );
    }
}

export default PartnersAdmin;