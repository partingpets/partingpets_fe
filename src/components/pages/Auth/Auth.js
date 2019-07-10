import React from 'react';
import { createButton } from 'react-social-login-buttons';
import authRequests from '../../../helpers/data/authRequests';
import './Auth.scss';

import petsLogo from '../../../images/pets.png';

const btnConfig = {
  text: 'Google Login',
  icon: 'paw',
  iconFormat: name => 'fas fa-paw',
  style: { background: '#15153a' },
  activeStyle: { background: '#293e69' },
};
/** My Google login button. */
const MyGoogleLoginButton = createButton(btnConfig);

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
        <div className="homeLogo">
          <img src={petsLogo} className="petsHomeLogo ml-auto" alt="pets_logo" />
        </div>
        <div className="login d-flex justify-content-center">
          {/* <GoogleLoginButton id="googleBtn" onClick={this.googleAuthenticateUser} /> */}
          <MyGoogleLoginButton id="googleBtn" onClick={this.googleAuthenticateUser} />
        </div>
      </div>
    );
  }
}

export default Auth;
