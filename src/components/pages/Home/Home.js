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
import petco from '../../../images/petco_logo.png';
import petsmart from '../../../images/pet_smart.png';

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
        <div className="card-home home-page ml-auto">
          <div className="card-body-home">
            <img src={petsLogo} className="pets-home-logo ml-auto" alt="pets_logo" />
            <hr />
            <h1 className="card-title">WHO IS PARTING PETS?</h1>
            <h5 className="card-text-home">
              With more than 250 years of service to pet owners, Parting Pets is a leading pet specialty retailer that
              obsesses about delivering only the finest products for pets and the people who love them. Oh, we forgot to
              mention. We specialize in pet funerals, urns, caskets, etc. If you're looking for dog toys and crap like
              that, we ain't selling that kinda stuff. Capeech?? Anyway...We do this by providing the products,
              services, advice and experiences that keep us making them benjamins. We aim to remain socially wealthy and
              emotionally rich AF. Everything we do is guided by our razor sharp vision: Dead Pets + Sad Owners =
              $$$Dollar Dollar Bills Yall$$$ Parting Pets employees more than 26,000 partners and operates more than
              1,500 Parting Pets locations across the U.S., Mexico, Puerto Rico and undisclosed parts of Cuba. The
              Parting Pets Foundation, an independent nonprofit organization that we aren't afiliated with at all
              because they are a shell company for a money laundering scheme, has invested more than $250 trillion since
              it was created in 2019 to help promote and improve the quality of pet funerals. In conjunction with the
              Foundation, we work with and support thousands of local animal welfare groups across the country and,
              through in-store adoption events, help find homes for more than 400,000 animals every year, but mostly
              just a lot of really stupid fish.{' '}
            </h5>
            <hr />
            <h2 className="card-title">MEET THE BRAVE, BOLD MEN BEHIND PARTING PETS SUCCESS</h2>
            <hr />
            <div className="who-we-are-wrap">
              <div className="who-we-are-container">
                <div className="card-who-we-are">
                  <div className="card-body-home">
                    <img src={marco} className="pets-home-staff " alt="pets_staff" />
                    <h4 className="card-text-who">Money Marco </h4>
                    <h5 className="card-text-who">PRESIDENT/CEO </h5>
                    <h6 className="card-text-who">
                      Marco serves as our fearless CEO. He also likes to surf the web really late at night in search of
                      the finest "deals" across the land.{' '}
                    </h6>
                  </div>
                </div>

                <div className="card-who-we-are">
                  <div className="card-body-home">
                    <img src={colin} className="pets-home-staff ml-auto" alt="pets_staff" />
                    <h4 className="card-text-who">CW Bucks </h4>
                    <h5 className="card-text-who">CASKETS & URNS </h5>
                    <h6 className="card-text-who">
                      CW Bucks is our casket man. This dude knows caskets and urns like the back of his wallet. He also
                      knows how to stack that cash.{' '}
                    </h6>
                  </div>
                </div>

                <div className="card-who-we-are">
                  <div className="card-body-home">
                    <img src={tim} className="pets-home-staff ml-auto" alt="pets_staff" />
                    <h4 className="card-text-who">Tim Dogg </h4>
                    <h5 className="card-text-who">PET FUNERALS </h5>
                    <h6 className="card-text-who">
                      You want Spuds McKenzie at Rovers funeral, Tim's your man. Looking to land the Taco Bell dog as a
                      palbearer? Call Tim Dogg.{' '}
                    </h6>
                  </div>
                </div>

                <div className="card-who-we-are">
                  <div className="card-body-home">
                    <img src={jonathan} className="pets-home-staff ml-auto" alt="pets_staff" />
                    <h4 className="card-text-who">Jon E. Banks </h4>
                    <h5 className="card-text-who">REVENGE 4 HIRE </h5>
                    <h6 className="card-text-who">
                      Neighbor poison your pet because it keep pooping on his lawn? Call Jon. E. Banks. Revenge for hire
                      has never been cleaner or cheaper.{' '}
                    </h6>
                  </div>
                </div>
                <hr />
                <div className="partners-wrap">
                  <h1 className="partner-title">MEET A FEW OF OUR PARTING PETS PARTNERS</h1>
                  <div className="who-we-are-container">
                    <img src={petco} className="pets-partner-logo " alt="petco_logo" />

                    <img src={petsmart} className="pets-partner-logo " alt="petco_logo" />

                    <img src={petco} className="pets-partner-logo " alt="petco_logo" />
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
