import React from 'react';
import {
  Card, CardImg, CardText, CardBody, Button, CardHeader,
} from 'reactstrap';
import './Pets.scss';

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
      if (Pet.burialCity && Pet.burialCity) {
        return (
          <CardText>
            Final Resting Place: <br />
            {Pet.burialStreet} <br />
            Plot {Pet.burialPlot} <br />
            {Pet.burialCity}, {Pet.burialState} {Pet.burialZipCode}
          </CardText>
        );
      }
      return <CardText>Please Edit to add burial location.</CardText>;
    };

    return (
      <Card className="pet-container">
        {/* <CardImg className="profileCardImg" top width="100%" src={fbUserObject.photoURL} alt="Card image cap" /> */}
        <CardHeader className="pet-name">{Pet.name}</CardHeader>
        <div className="col-4">
          <CardImg
            className="petCardImg"
            top
            width="100%"
            src="https://i.pinimg.com/736x/b1/d8/fc/b1d8fc33b1f9776195ad201a863bae0f.jpg"
            alt="Card image cap"
          />
        </div>

        <div className="pet-card col-12">
          <CardBody>
            <CardText className="breed">{Pet.breed}</CardText>
            <CardText className="dates">
              Born: {Pet.dateOfBirth}
              <br />
              Died: {Pet.dateOfDeath}
            </CardText>
            <div className="burial-data">{burialData()}</div>
            <Button onClick={this.editEvent}>Edit</Button>
            <Button onClick={this.deleteEvent}>Delete</Button>
          </CardBody>
        </div>
      </Card>
    );
  }
}

export default Pets;
