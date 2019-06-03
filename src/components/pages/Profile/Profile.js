import React from 'react';
import {
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, CardHeader,
} from 'reactstrap';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';
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
                <CardHeader>{`${userObject.firstName} ${userObject.lastName}`}</CardHeader>
                <CardBody>
                  {/* <CardSubtitle>Address:</CardSubtitle> */}
                  <CardText>
                    <p>{userObject.street}</p>
                    <p>
                      {userObject.city} {userObject.state}, {userObject.zipcode}
                    </p>
                  </CardText>
                  <Button>Edit</Button>
                </CardBody>
              </Card>
            </div>
            <div className="col-sm-8">
              <Card>
                {/* <CardImg className="profileCardImg" top width="100%" src={fbUserObject.photoURL} alt="Card image cap" /> */}
                <CardHeader>{`${userObject.firstName} ${userObject.lastName}`}</CardHeader>
                <div className="col-sm-2">
                  <CardImg
                    className="profileCardImg"
                    top
                    width="100%"
                    src={fbUserObject.photoURL}
                    alt="Card image cap"
                  />
                </div>
                <div className="col-sm-10">
                  <CardBody>
                    {/* <CardSubtitle>Address:</CardSubtitle> */}
                    <CardText>
                      <p>{userObject.street}</p>
                      <p>
                        {userObject.city} {userObject.state}, {userObject.zipcode}
                      </p>
                    </CardText>
                    <Button>Edit</Button>
                  </CardBody>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
