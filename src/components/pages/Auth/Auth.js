import React from 'react';
import { GoogleLoginButton } from 'react-social-login-buttons';
import authRequests from '../../../helpers/data/authRequests';
import './Auth.scss';

class Auth extends React.Component {
  state = {
    showModal: false,
  };

  googleAuthenticateUser = () => {
    authRequests
      .googleAuth()
      .then()
      .catch((error) => {
        console.error('There was an error loggin in', error);
      });
  };

  render() {
    return (
      <div className="Auth mt-5">
        <div className="login d-flex justify-content-center">
          <GoogleLoginButton id="googleBtn" onClick={this.googleAuthenticateUser} />
        </div>
      </div>
    );
  }
}

export default Auth;
