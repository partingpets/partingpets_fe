import React from 'react';
import RegisterForm from '../../RegisterForm/RegisterForm';
import userRequests from '../../../helpers/data/userRequests';
import './Home.scss';
import authRequests from '../../../helpers/data/authRequests';

class Home extends React.Component {
  state = {
    showModal: false,
  };

  componentWillMount() {
    const currentUid = authRequests.getCurrentUid();
    userRequests
      .getUserByFbId(currentUid)
      .then()
      .catch((error) => {
        // User not found so redirect to Register Modal
        if (error.response.status === 404) {
          this.showModal();
        } else {
          console.error('Problem retrieving user from database', error);
        }
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
    });
  };

  render() {
    return (
      <div>
        <RegisterForm
          showModal={this.state.showModal}
          onSubmit={this.formSubmitEvent}
          modalCloseEvent={this.modalCloseEvent}
        />
      </div>
    );
  }
}

export default Home;
