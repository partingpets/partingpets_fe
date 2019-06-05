import React from 'react';
import {
  Card, CardText, CardBody, Button, CardHeader,
} from 'reactstrap';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';
import Pets from '../Pets/Pets';
import './Profile.scss';

class Profile extends React.Component {
  state = {
    userObject: {},
    fbUserObject: {},
  };

  componentDidMount() {
    const fbUser = authRequests.getCurrentUser();
    userRequests.getUserByFbId(fbUser.uid).then((currentUser) => {
      this.setState({
        userObject: currentUser,
        fbUserObject: fbUser.providerData[0],
      });
    });
  }

  render() {
    const { userObject, fbUserObject } = this.state;

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
                </CardBody>
              </Card>
            </div>
            <div className="col-sm-8">
              <Pets
                userObject={userObject}
                 />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
