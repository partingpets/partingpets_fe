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
      <div className="pet-box">
        <Card className="pet-container">
          <CardHeader className="pet-name">{Pet.name}</CardHeader>
          <div className="col-4">
            <CardImg
              className="petCardImg"
              top
              width="100%"
              src="https://i.pinimg.com/736x/b1/d8/fc/b1d8fc33b1f9776195ad201a863bae0f.jpg"
              alt="Pet Image"
            />
          </div>
          <div className="col-12">
            <CardBody>
              <CardText className="breed">{Pet.breed}</CardText>
              <CardText className="dates">
                Born: {utility.dateFormat(Pet.dateOfBirth)}
                <br />
                Died: {utility.dateFormat(Pet.dateOfDeath)}
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
