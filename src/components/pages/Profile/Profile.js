import React from 'react';
import {
  Card, CardText, CardBody, Button, CardHeader,
} from 'reactstrap';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';
import petRequests from '../../../helpers/data/petRequests';
import Pets from '../Pets/Pets';
import PetForm from '../../PetForm/PetForm';
import './Profile.scss';

class Profile extends React.Component {
  state = {
    userObject: {},
    fbUserObject: {},
    usersPets: [],
    petModal: false,
  };

  togglePetForm = () => {
    this.setState({
      petModal: !this.state.petModal,
    });
  }

  componentDidMount() {
    const fbUser = authRequests.getCurrentUser();
    userRequests.getUserByFbId(fbUser.uid).then((currentUser) => {
      this.setState({
        userObject: currentUser,
        fbUserObject: fbUser.providerData[0],
      });
    });

    userRequests.getUserByFbId(fbUser.uid).then((currentUser) => {
      petRequests.getPetsByUserId(currentUser.id).then((partedPets) => {
        this.setState({
          usersPets: partedPets,
        });
      });
    });
  }

  render() {
    const { userObject, fbUserObject, usersPets } = this.state;
    const singlePetCard = (usersPet => (
      <Pets
        key={usersPet.id}
        Pet={usersPet}
        />
    ));

    const pets = usersPets.map(singlePetCard);

    return (
      <div className="Profile">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <Card>
                {/* <CardImg className="profileCardImg" top width="100%" src={fbUserObject.photoURL} alt="Card image cap" /> */}
                <CardHeader>
                  {`${userObject.firstName} ${userObject.lastName}`}
                  <img className="profileCardImg" src={fbUserObject.photoURL} alt="profile" />
                </CardHeader>
                <CardBody>
                  {/* <CardSubtitle>Address:</CardSubtitle> */}
                  <CardText>{userObject.street}</CardText>
                  <CardText>
                    {userObject.city} {userObject.state}, {userObject.zipcode}
                  </CardText>
                  <Button>Edit</Button>
                  <Button className="btn addPetButton" onClick={this.togglePetForm}>Add Pet</Button>
                </CardBody>
              </Card>
            </div>
            <div className="col-sm-8">
              {pets}
            </div>
          </div>
        </div>
        <PetForm 
          isOpen={this.state.petModal}
          petModal={this.state.petModal}
          togglePetForm={this.togglePetForm}
          />
      </div>
    );
  }
}

export default Profile;
