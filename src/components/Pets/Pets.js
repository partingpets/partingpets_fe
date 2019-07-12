import React from 'react';
import {
  Card, CardImg, CardText, CardBody, CardHeader, Button,
} from 'reactstrap';
import './Pets.scss';
import utility from '../../helpers/utils/utility';

class Pets extends React.Component {
  editEvent = (e) => {
    e.preventDefault();
    const { passPetToEdit, Pet, toggle } = this.props;
    passPetToEdit(Pet.id);
    toggle();
  };

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteThisPet, Pet } = this.props;
    deleteThisPet(Pet.id);
  };

  render() {
    const { Pet } = this.props;

    const burialData = () => {
      if (Pet.burialCity && Pet.burialState && Pet.burialStreet && Pet.burialPlot && Pet.burialZipCode) {
        return (
          <CardText>
            <b>Final Resting Place:</b> <br />
            {Pet.burialStreet} <br />
            Plot {Pet.burialPlot} <br />
            {Pet.burialCity}, {Pet.burialState} {Pet.burialZipCode}
          </CardText>
        );
      }
      return <CardText>Please Edit to add burial location.</CardText>;
    };

    return (
      <div className="pet-box">
        <Card className="pet-container">
          {/* <CardImg className="profileCardImg" top width="100%" src={fbUserObject.photoURL} alt="Card image cap" /> */}
          <CardHeader className="pet-name">
            {Pet.name} : {Pet.breed}
          </CardHeader>
          <div className="col-8">
            <CardImg
              className="petCardImg"
              top
              width="100%"
              src="https://i.pinimg.com/736x/b1/d8/fc/b1d8fc33b1f9776195ad201a863bae0f.jpg"
              alt="Pet Image"
            />
          </div>
          <div className="pet-data col-12">
            <CardBody>
              {/* <CardText className="breed">{Pet.breed}</CardText> */}
              <CardText className="dates">
                <b>Born:</b> {utility.dateFormat(Pet.dateOfBirth)}
                <br />
                <b>Died:</b> {utility.dateFormat(Pet.dateOfDeath)}
              </CardText>
              <div className="burial-data">{burialData()}</div>
                <Button outline size="sm" className="edit-pet" onClick={this.editEvent}>
                  <i className="lnr lnr-pencil" />
                </Button>
                <Button outline size="sm" className="delete-pet" onClick={this.deleteEvent}>
                  <i className="lnr lnr-trash" />
                </Button>
            </CardBody>
          </div>
        </Card>
      </div>
    );
  }
}

export default Pets;
