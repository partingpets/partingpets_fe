import React from 'react';
import {
  Card, CardText, CardBody, Button, CardHeader,
} from 'reactstrap';
import authRequests from '../../../helpers/data/authRequests';
import petRequests from '../../../helpers/data/petRequests';
import Pets from '../Pets/Pets';
import './Profile.scss';

class Profile extends React.Component {
  // Using this to fix this error: https://stackoverflow.com/a/56537704
  profileMounted = false;

  state = {
    fbUserImage: '',
    usersPets: [],
  };

  componentDidMount() {
    this.profileMounted = true;

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

  render() {
    const { userObject } = this.props;
    const { fbUserImage, usersPets } = this.state;
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
                  <img className="profileCardImg" src={fbUserImage} alt="profile" />
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
