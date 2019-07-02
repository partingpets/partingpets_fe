import React from 'react';
import AddPartnerModal from '../../AddPartnerModal/AddPartnerModal';
import partnerRequests from '../../../helpers/data/partnerRequests';
import ManageUsersTable from '../../ManageUsersTable/ManageUsersTable';
import './UsersAdmin.scss';

class UsersAdmin extends React.Component {
  partnerMounted = false;

  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  };

  state = {
    partners: [],
    showModal: false,
    isEditing: false,
    partnerEditId: '-1',
    partnerToEdit: {},
    currentUserObj: {},
    userObject: {},
    ManagePartnersTable: [],
  };

  // Get All Partners //

  getPartners = () => {
    // const { userObject } = this.props;
    partnerRequests
      .getAllPartners()
      // .getAllPartners(userObject.partnerId)
      .then((partners) => {
        const sortedPartners = partners.sort((a, b) => a.isDeleted - b.isDeleted);
        this.setState({ partners: sortedPartners });
      })
      .catch((err) => {
        console.error('error with products GET', err);
      });
  };

  componentDidMount() {
    this.partnerMounted = !!this.props.userObject.id;
    if (this.partnerMounted) {
      this.getPartners();
    }
  }

  componentWillUnmount() {
    this.partnerMounted = false;
  }

  // Add Product Modal Function //
  showModal = (e) => {
    this.setState({
      hidden: !this.state.hidden,
      showModal: true,
    });
  };

  // Modal Close Event //
  modalCloseEvent = () => {
    this.setState({
      hidden: !this.state.hidden,
      showModal: false,
      partnerToEdit: {},
      isEditing: false,
    });
  };

  // Partner Form Submit Event //
  partnerFormSubmitEvent = (newPartner) => {
    const { isEditing, partnerEditId } = this.state;
    if (isEditing) {
      partnerRequests
        .editPartner(partnerEditId, newPartner)
        .then(() => {
          this.getPartners();
          this.setState({
            showModal: false,
            isEditing: false,
            partnerEditId: '-1',
          });
        })
        .catch(error => console.error('There Was An Error Editing Your Parting Pets Partner', error));
    } else {
      partnerRequests
        .createPartner(newPartner)
        .then((result) => {
          this.getPartners();
          this.setState({ showModal: false });
        })
        .catch(error => console.error('There Was An Error Creating Your New Parting Pets Partner'));
    }
  };

  // Delete Partner Request //
  deletePartner = (partnerId) => {
    partnerRequests
      .deletePartner(partnerId)
      .then(() => {
        this.getPartners();
      })
      .catch(error => console.error('error with deleting this parting pets partner.', error));
  };

  // Edit Partner Request //
  editPartner = (partnerId) => {
    partnerRequests
      .getSinglePartner(partnerId)
      .then((partner) => {
        this.setState({
          isEditing: true,
          partnerEditId: partnerId,
          partnerToEdit: partner,
        });
        this.showModal();
      })
      .catch(error => console.error('There Was An Issue Getting Your Parting Pets Partner To Update', error));
  };

  render() {
    const { userObject } = this.props;
    const { partners, isEditing, partnerToEdit } = this.state;

    const printPartner = partners.map((partner, index) => (
      <ManageUsersTable
        key={partner.id}
        index={index}
        partner={partner}
        onSelect={this.onSelect}
        editForm={this.editPartner}
        deletePartner={this.deletePartner}
      />
    ));

    const editFormProps = { partnerToEdit };

    if (!isEditing) {
      editFormProps.disabled = true;
    }

    return (
      <div className="userItems mx-auto animated bounceInLeft w-100">
        <div className="productWrap">
          <button className="addUserBtn" onClick={this.showModal}>
            <i className="far fa-plus-square" />
            ADD NEW USER
          </button>
        </div>

        <div className="back-button">
          <button className="backBtn" id="admin" onClick={this.changeView}>
            <i className="lnr lnr-arrow-left-circle" />
            BACK TO ADMIN PORTAL
          </button>
        </div>
        <AddPartnerModal
          showModal={this.state.showModal}
          onSubmit={this.partnerFormSubmitEvent}
          isEditing={isEditing}
          {...editFormProps}
          modalCloseEvent={this.modalCloseEvent}
          userObject={userObject}
        />
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">LAST</th>
                <th scope="col">FIRST</th>
                <th scope="col">STREET</th>
                <th scope="col">CITY</th>
                <th scope="col">STATE</th>
                <th scope="col">ZIP</th>
                <th scope="col">EMAIL</th>
                <th scope="col">EDIT</th>
                <th scope="col">DELETE</th>
              </tr>
            </thead>
            <tbody>{printPartner}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UsersAdmin;
