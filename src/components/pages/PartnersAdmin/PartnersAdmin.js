import React from 'react';
import partnerRequests from '../../../helpers/data/partnerRequests';
import PartnerItems from '../../PartnerItems/PartnerItems';
import AddPartnerModal from '../../AddPartnerModal/AddPartnerModal';
import './PartnersAdmin.scss';

class PartnersAdmin extends React.Component {
  state = {
    partners: [],
    showModal: false,
    isEditingPartner: false,
    partnerToEdit: {},
    partnerEditId: '-1',
}

getPartners = () => {
  partnerRequests
    .getAllPartners()
    .then((partners) => {
      this.setState({ partners });
    })
    .catch((err) => {
      console.error('error with partners GET', err);
    });
};

  componentDidMount() {
    this.getPartners();
  }

showModal = (e) => {
    this.setState({
        hidden: !this.state.hidden,
        showModal: true,
    });
};

modalCloseEvent = (e) => {
    this.setState({
        hidden: !this.state.hidden,
        showModal: false,
        partnerToEdit: {},
    });
};

partnerFormSubmitEvent = (newPartner) => {
    const { isEditingPartner, partnerEditId } = this.state;
    if (isEditingPartner) {
        partnerRequests
        .editPartner(partnerEditId, newPartner)
        .then(() => {
                this.getPartners();
                this.setState({
                    showModal: false,
                    isEditingPartner: false,
                    partnerEditId: '-1',
                });
            })
            .catch(error => console.error('There Was An Error Editing Your Partner', error));
        } else {
        partnerRequests
        .createPartner(newPartner)
        .then(() => {
        this.getPartners();
        this.setState({ showModal: false });
        })
        .catch(error => console.error('There was an error creating the partner'));
    }
};

passPartnerToEdit = partnerId => {
    partnerRequests.getSinglePartner(partnerId)
    .then((result) => {
        this.setState({ 
            isEditingPartner: true, 
            partnerEditId: partnerId,
            partnerToEdit: result 
        });
            this.showModal();
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
    const { partners, isEditingPartner, partnerToEdit } = this.state;
    const partnersComponents = partners.map(partner => (
     <PartnerItems
        key={partner.id}
        partner={partner}
        deleteSinglePartner={this.deleteOnePartner}
        passPartnerToEdit={this.passPartnerToEdit}
        />
        ));
    return (
        <div className="partners-admin-container">
            <h1>Manage The Partners</h1>
            <button onClick={this.showModal}>ADD NEW PARTNER</button>
            <AddPartnerModal
                showModal={this.state.showModal}
                onSubmit={this.partnerFormSubmitEvent}
                modalCloseEvent={this.modalCloseEvent}
                isEditingPartner={isEditingPartner}
                partnerToEdit={partnerToEdit}
            />
            <ul>{partnersComponents}</ul>
        </div>
    );
  }
}

export default PartnersAdmin;
