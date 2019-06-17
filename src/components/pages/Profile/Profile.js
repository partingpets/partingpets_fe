import React from 'react';
import {
  Card, CardText, CardBody, Button, CardHeader,
} from 'reactstrap';
import RegisterForm from '../../RegisterForm/RegisterForm';
import authRequests from '../../../helpers/data/authRequests';
import userRequests from '../../../helpers/data/userRequests';
import petRequests from '../../../helpers/data/petRequests';
import Pets from '../Pets/Pets';
import './Profile.scss';

class Profile extends React.Component {
  // Using this to fix this error: https://stackoverflow.com/a/56537704
  profileMounted = false;

  state = {
    showModal: false,
    userToEdit: {},
    fbUserImage: '',
    usersPets: [],
  };

  componentDidMount() {
    this.profileMounted = !!this.props.userObject.id;

    if (this.profileMounted) {
      const fbUser = authRequests.getCurrentUser();
      this.setState({
        fbUserImage: fbUser.providerData[0].photoURL,
      });

      petRequests.getPetsByUserId(this.props.userObject.id).then((partedPets) => {
        this.setState({
          usersPets: partedPets,
        });
      });
    }
  }

  componentWillUnmount() {
    this.profileMounted = false;
  }

  showModal = (e) => {
    this.setState({
      showModal: true,
    });
  };

  modalCloseEvent = () => {
    this.setState({
      showModal: false,
    });
  };

  editUserItem = (userId) => {
    const fbUserId = this.props.userObject.fireBaseUid;
    userRequests
      .getUserByFbId(fbUserId)
      .then((currentUser) => {
        this.setState({
          isEditing: true,
          userToEdit: currentUser,
        });
        this.showModal();
      })
      .catch(error => console.error(error));
  };

  render() {
    const { userObject } = this.props;
    const { fbUserImage, usersPets, userToEdit } = this.state;
    const singlePetCard = usersPet => <Pets key={usersPet.id} Pet={usersPet} />;

    const pets = usersPets.map(singlePetCard);

    return (
      <div className="Profile">
        <RegisterForm
          showModal={this.state.showModal}
          onSubmit={this.userFormSubmitEvent}
          userToEdit ={userToEdit}
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
                  <Button id={userObject.id} onClick={this.editUserItem}>
                    Edit
                  </Button>
                </CardBody>
              </Card>
            </div>
            <div className="col-sm-8">{pets}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
