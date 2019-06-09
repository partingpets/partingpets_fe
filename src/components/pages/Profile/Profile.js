import React from 'react';
import {
  Card, CardText, CardBody, Button, CardHeader,
} from 'reactstrap';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';
import petRequests from '../../../helpers/data/petRequests';
import Pets from '../Pets/Pets';
import './Profile.scss';

class Profile extends React.Component {
  state = {
    userObject: {},
    fbUserObject: {},
    usersPets: [],
  };

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
    const singlePetCard = usersPet => <Pets key={usersPet.id} Pet={usersPet} />;

    const pets = usersPets.map(singlePetCard);

    return (
      <div className="Profile">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <Card data-uid={userObject.id}>
                <CardHeader>
                  {`${userObject.firstName} ${userObject.lastName}`}
                  <img className="profileCardImg" src={fbUserObject.photoURL} alt="profile" />
                </CardHeader>
                <CardBody>
                  <CardText>{`E-mail: ${userObject.email}`}</CardText>
                  <CardText>{userObject.street1}</CardText>
                  <CardText>{userObject.street2}</CardText>
                  <CardText>
                    {userObject.city} {userObject.state}, {userObject.zipcode}
                  </CardText>
                  <Button>Edit</Button>
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
