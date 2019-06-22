import React from 'react';
import partnerRequests from '../../../helpers/data/partnerRequests';
import PartnerItems from '../PartnerItems/PartnerItems';
import AddPartnerModal from '../../AddPartnerModal/AddPartnerModal';
import './PartnersAdmin.scss';

class PartnersAdmin extends React.Component {
  state = {
    partners: [],
    showModal: false,
    isEditingPartner: false,
    partnerToEdit: '-1',
}

toggle = () => {
    if(this.state.isEditingPartner){
        this.setState({
            showModal: !this.state.showModal,
            isEditingPartner: false,
        })
    }
}

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
    });
};

partnerFormSubmitEvent = (newPartner) => {
    const { isEditingPartner, partnerToEdit } = this.state;
    if (isEditingPartner) {
        partnerRequests.editPartner(partnerToEdit, newPartner)
        .then(() => {
            partnerRequests.getAllPartners()
            .then((partners) => {
                this.setState({
                    partners,
                    showModal: false,
                    isEditingPartner: false,
                    partnerToEdit: '-1'
                })
            })
        }

        )
    } else {
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
};

passPartnerToEdit = partnerId => {
    partnerRequests.getSinglePartner(partnerId)
    .then((result) => {
        this.setState({ 
            isEditingPartner: true, 
            partnerToEdit: result });
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
        toggle={this.toggle}
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
