import React from 'react';
import {
  Card, CardText, CardBody, CardHeader,
} from 'reactstrap';
import RegisterForm from '../../RegisterForm/RegisterForm';
import authRequests from '../../../helpers/data/authRequests';
import userRequests from '../../../helpers/data/userRequests';
import petRequests from '../../../helpers/data/petRequests';
import partnerRequests from '../../../helpers/data/partnerRequests';
import Payments from '../../Payments/Payments';
import Pets from '../../Pets/Pets';
import PetForm from '../../PetForm/PetForm';
import './Profile.scss';

class Profile extends React.Component {
  // Using this to fix this error: https://stackoverflow.com/a/56537704
  profileMounted = false;

  state = {
    showModal: false,
    isEditing: false,
    userToEdit: {},
    fbUserImage: '',
    usersPets: [],
    petModal: false,
    isEditingPet: false,
    petIdToEdit: '-1',
    isProfilePage: true,
  };

  componentDidMount() {
    this.profileMounted = !!this.props.userObject.id;

    if (this.profileMounted) {
      const fbUser = authRequests.getCurrentUser();
      this.setState({
        fbUserImage: fbUser.providerData[0].photoURL,
      });
    }
    this.getPartedPets();
  }

  componentWillUnmount() {
    this.profileMounted = false;
  }

  toggle = () => {
    if (this.state.isEditingPet) {
      this.setState({
        petModal: !this.state.petModal,
        isEditingPet: false,
        petIdToEdit: '-1',
      });
    } else {
      this.setState({
        petModal: !this.state.petModal,
      });
    }
  };

  getPartedPets() {
    const userId = this.props.userObject.id;
    petRequests.getPetsByUserId(userId).then((partedPets) => {
      this.setState({
        usersPets: partedPets,
      });
    });
  }

  showModal = (e) => {
    this.setState({
      showModal: true,
    });
  };

  modalCloseEvent = () => {
    this.setState({
      showModal: false,
      userToEdit: {},
    });
  };

  editUserItem = (userId) => {
    const fbUserId = this.props.userObject.fireBaseUid;
    userRequests
      .getUserByFbId(fbUserId)
      .then((currentUser) => {
        const tempUser = currentUser;
        if (currentUser.isPartner) {
          partnerRequests.getPartnerById(currentUser.partnerId).then((result) => {
            tempUser.partnerCode = result.registrationCode;
            this.setState({
              isEditing: true,
              userToEdit: tempUser,
            });
          });
        } else {
          this.setState({
            isEditing: true,
            userToEdit: tempUser,
          });
        }
        this.showModal();
      })
      .catch(error => console.error(error));
  };

  userFormSubmitEvent = (newUser) => {
    const { updateUser } = this.props;
    userRequests
      .updateUser(newUser)
      .then((result) => {
        updateUser();
        this.setState({
          showModal: false,
          isEditing: false,
          userToEdit: {},
        });
      })
      .catch(error => console.error('There was an error updating the user', error));
  };

  deletePet = (petId) => {
    petRequests
      .deletePet(petId)
      .then(() => {
        this.getPartedPets();
      })
      .catch(error => console.error('error with deleting this pet', error));
  };

  deleteUser = () => {
    const userId = this.props.userObject.id;
    userRequests
      .deleteUser(userId)
      .then((results) => {
        authRequests.logoutUser();
      })
      .catch(error => console.error('Stuff blowed up'));
  };

  petFormSubmitEvent = (pet) => {
    const { isEditingPet, petIdToEdit } = this.state;
    if (isEditingPet) {
      petRequests
        .editPet(petIdToEdit, pet)
        .then(this.getPartedPets())
        .then(this.setState({ isEditingPet: false, petIdToEdit: '-1' }));
    } else {
      petRequests.createPet(pet).then(this.getPartedPets());
    }
  };

  passPetToEdit = petId => this.setState({ isEditingPet: true, petIdToEdit: petId });

  render() {
    const { userObject } = this.props;
    const {
      showModal, 
      fbUserImage, 
      usersPets, 
      userToEdit, 
      isEditing, 
      isEditingPet, 
      petIdToEdit,
      isProfilePage,
    } = this.state;
    const singlePetCard = usersPet => (
      <Pets
        key={usersPet.id}
        Pet={usersPet}
        passPetToEdit={this.passPetToEdit}
        toggle={this.toggle}
        deleteThisPet={this.deletePet}
      />
    );

    const pets = usersPets.map(singlePetCard);

    return (
      <div className="Profile animated bounceInLeft">
        <RegisterForm
          showModal={showModal}
          onSubmit={this.userFormSubmitEvent}
          isEditing={isEditing}
          userToEdit={userToEdit}
          modalCloseEvent={this.modalCloseEvent}
          editForm={this.editUserItem}
          fireBaseId={userObject.fireBaseUid}
        />
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <Card data-uid={userObject.id}>
                <CardHeader>
                  {`${userObject.firstName} ${userObject.lastName}`}
                  <img className="profileCardImg" src={fbUserImage} alt="profile" />
                </CardHeader>
                <CardBody>
                  <CardText>{`E-mail: ${userObject.email}`}</CardText>
                  <CardText>{userObject.street1}</CardText>
                  <CardText>{userObject.street2}</CardText>
                  <CardText>
                    {userObject.city} {userObject.state}, {userObject.zipcode}
                  </CardText>
                  {/* <div className="row justify-content-around"> */}
                  <i
                    className="usr-btn lnr lnr-pencil usr-btn-edit-icon"
                    aria-hidden="true"
                    id={userObject.id}
                    onClick={this.editUserItem}
                  />

                  <i
                    className="usr-btn lnr lnr-trash usr-btn-delete-icon"
                    aria-hidden="true"
                    onClick={this.deleteUser}
                  />

                  {/* </div> */}

                  <hr />
                  <Payments isProfilePage={isProfilePage} userId={userObject.id}/>
                  <hr />

                  <button className="btn addPetButton" onClick={this.toggle}>
                    <span className="spot">
                      <span className="add-pet-icon lnr lnr-plus-circle" />
                      ADD PET
                    </span>
                  </button>
                </CardBody>
              </Card>
            </div>
            <div className="col-sm-8">{pets}</div>
          </div>
        </div>
        <PetForm
          isOpen={this.state.petModal}
          toggle={this.toggle}
          onSubmit={this.petFormSubmitEvent}
          userObject={this.props.userObject}
          isEditingPet={isEditingPet}
          petIdToEdit={petIdToEdit}
        />
      </div>
    );
  }
}

export default Profile;
