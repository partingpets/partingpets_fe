import React from 'react';
import RegisterForm from '../../RegisterForm/RegisterForm';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';
import './Home.scss';

class Home extends React.Component {
  state = {
    showModal: false,
    firebaseId: -1,
    userToEdit: {},
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

  userFormSubmitEvent = (newUser) => {
    // const { isEditing, userEditId } = this.state;
    userRequests.createUser(newUser);
    this.setState({
      showModal: false,
    });
    // if (isEditing) {
    //   userRequests
    //   .createUser(newUser)
    //     .then(() => {
    //       this.setState({
    //           showModal: false,
    //           isEditing: false,
    //           campaignEditId: '-1',
    //         });
    //       });
    //     })
    //     .catch(error => console.error('There was an error editing the campaign', error));
    // } else {
    //   userRequests
    //     .newCampaign(newCampaign)
    //     .then((res) => {
    //       newMarker.campaignId = res.data.name;
    //       markerRequests.newMarker(newMarker);
    //       this.getMyCampaigns();
    //       this.setState({ showModal: false });
    //     })
    //     .catch(error => console.error('There was an error creating the new Campaign', error));
    // }
  };

  editUserItem = (userId) => {
    const fbUserId = this.props.userObject.firebaseId;
    userRequests
      .getUserByFbId(fbUserId)
      .then((currentUser) => {
        this.setState({
          isEditing: true,
          userToEdit: currentUser,
        });
        this.showModal();
      })
      .catch(error => console.error(error));
  };
  // if(!isEditing) {
  //   editUserProps.dis
  // }

  render() {
    const { firebaseId, isEditing } = this.state;
    return (
      <div>
        <RegisterForm
          showModal={this.state.showModal}
          onSubmit={this.userFormSubmitEvent}
          isEditing={isEditing}
          // {...editUserProps}
          modalCloseEvent={this.modalCloseEvent}
          editForm={this.editUserItem}
          fireBaseId={firebaseId}
        />
      </div>
    );
  }
}

export default Home;
