import React from 'react';
import { GoogleLoginButton } from 'react-social-login-buttons';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';
import './Auth.scss';

class Auth extends React.Component {
  googleAuthenticateUser = () => {
    authRequests
      .googleAuth()
      .then(() => {
        // Look for the user in the DB and if not found direct to register form
        const currentUid = authRequests.getCurrentUid();
        userRequests
          .getUserByFbId(currentUid)
          .then(this.props.history.push('/home'))
          .catch((error) => {
            // User not found so redirect to Register Modal
            if (error.response.status === 404) {
              this.props.history.push('/store');
            } else {
              // Something else happened so throw the error
              console.error('Problem retrieving user from database', error);
            }
          });
      })
      .catch((error) => {
        console.error('There was an error loggin in', error);
      });
  };

  render() {
    return (
      <div className="Auth mt-5">
        <div className="login d-flex justify-content-center">
          <GoogleLoginButton onClick={this.googleAuthenticateUser} />
        </div>
      </div>
    );
  }
}

export default Auth;
