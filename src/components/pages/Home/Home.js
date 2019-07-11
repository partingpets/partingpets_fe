import React from 'react';
import RegisterForm from '../../RegisterForm/RegisterForm';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';
import './Home.scss';

import petsLogo from '../../../images/pets_new.png';
import marco from '../../../images/marco_pets.png';
import jonathan from '../../../images/jon_pets.png';
import colin from '../../../images/colin_pets.png';
import tim from '../../../images/Tim_pets.png';

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
      .then((result) => {
        if (result.isDeleted) {
          this.showModal();
        }
      })
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
    const currentUid = authRequests.getCurrentUid();
    this.setState({
      showModal: false,
    });
    userRequests.getUserByFbId(currentUid).then((result) => {
      if (result.isDeleted) {
        authRequests.logoutUser();
      }
    });
  };

  userFormSubmitEvent = (newUser) => {
    const { updateUser } = this.props;
    userRequests
      .createUser(newUser)
      .then((result) => {
        updateUser();
        this.setState({
          showModal: false,
        });
      })
      .catch(error => console.error('There was an error creating new user', error));
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

  render() {
    const { firebaseId, isEditing } = this.state;
    return (
      <div className="home-page animated fadeIn">
        <div className="home-info justify-content-center" />
        <div className="card-home home-page">
          <div className="card-body-home">
            <img src={petsLogo} className="pets-home-logo ml-auto" alt="pets_logo" />
            <h4 className="card-title">ABOUT PARTING PETS</h4>
            <h5 className="card-text-home">
              With more than 50 years of service to pet parents, Petco is a leading pet specialty retailer that obsesses
              about delivering health and happy experiences for pets and the people who love them. We do this by
              providing the products, services, advice and experiences that keep pets physically fit, mentally alert,
              socially engaged and emotionally happy. Everything we do is guided by our vision: Healthier Pets. Happier
              People. Better World. We employ more than 26,000 partners and operate more than 1,500 Petco locations
              across the U.S., Mexico and Puerto Rico, including more than 65 Unleashed by Petco locations, a smaller
              format neighborhood shop; complete pet care services and veterinary advice through PetCoach; and
              petco.com. The Petco Foundation, an independent nonprofit organization, has invested more than $250
              million since it was created in 1999 to help promote and improve the welfare of companion animals. In
              conjunction with the Foundation, we work with and support thousands of local animal welfare groups across
              the country and, through in-store adoption events, help find homes for more than 400,000 animals every
              year.{' '}
            </h5>
            <hr />
            <h4 className="card-title">WHO IS PARTING PETS?</h4>
            <div className="who-we-are-wrap">
              <div className="who-we-are-container">
                <div className="card-who-we-are">
                  <div className="card-body-home">
                    <img src={marco} className="pets-home-staff " alt="pets_staff" />
                    <h5 className="card-text-who">Marco Clank </h5>
                    <h5 className="card-text-who">Marco serves as our CEO. </h5>
                    <h6 className="github-link">Visit his Github</h6>
                  </div>
                </div>

                <div className="card-who-we-are">
                  <div className="card-body-home">
                    <img src={colin} className="pets-home-staff ml-auto" alt="pets_staff" />
                    <h5 className="card-text-who">Colin White </h5>
                    <h5 className="card-text-who">Marco serves as our CEO. </h5>
                    <h6 className="github-link">Visit his Github</h6>
                  </div>
                </div>

                <div className="card-who-we-are">
                  <div className="card-body-home">
                    <img src={tim} className="pets-home-staff ml-auto" alt="pets_staff" />
                    <h5 className="card-text-who">Tim Harley </h5>
                    <h5 className="card-text-who">Marco serves as our CEO. </h5>
                    <h6 className="github-link">Visit his Github</h6>
                  </div>
                </div>

                <div className="card-who-we-are">
                  <div className="card-body-home">
                    <img src={jonathan} className="pets-home-staff ml-auto" alt="pets_staff" />
                    <h5 className="card-text-who">Jonathan Mohan </h5>
                    <h5 className="card-text-who">Marco serves as our CEO. </h5>
                    <h6 className="github-link">Visit his Github</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <RegisterForm
            showModal={this.state.showModal}
            onSubmit={this.userFormSubmitEvent}
            isEditing={isEditing}
            modalCloseEvent={this.modalCloseEvent}
            editForm={this.editUserItem}
            fireBaseId={firebaseId}
          />
        </div>
      </div>
    );
  }
}

export default Home;
