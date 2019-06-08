import React from 'react';
import RegisterForm from '../../RegisterForm/RegisterForm';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';
import './Home.scss';

class Home extends React.Component {
  state = {
    showModal: false,
    firebaseId: -1,
  };

  componentWillMount() {
    const currentUid = authRequests.getCurrentUid();
    this.setState({
      firebaseId: currentUid,
    });
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
    const { firebaseId } = this.state;
    return (
      <div>
        <RegisterForm
          showModal={this.state.showModal}
          onSubmit={this.formSubmitEvent}
          modalCloseEvent={this.modalCloseEvent}
          fireBaseId={firebaseId}
        />
      </div>
    );
  }
}

export default Home;
