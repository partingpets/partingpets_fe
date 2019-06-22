import React from 'react';
import {
  Card, CardImg, CardText, CardBody, Button, CardHeader,
} from 'reactstrap';
import './Pets.scss';
import moment from 'moment';

class Pets extends React.Component {

  editEvent = (e) => {
    e.preventDefault();
    const {
      passPetToEdit,
      Pet,
      toggle
    } = this.props;
    passPetToEdit(Pet.id);
    toggle();
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteThisPet, Pet } = this.props;
    deleteThisPet(Pet.id);
  }

  render(){
    const { Pet } = this.props;

    const dateFormat = dateData => moment(dateData).format('MMMM Do, YYYY');

    const burialData = () => {
      if (Pet.burialCity && 
          Pet.burialState &&
          Pet.burialStreet &&
          Pet.burialPlot &&
          Pet.burialZipCode){
        return (
          <CardText>
            Final Resting Place: <br />
            {Pet.burialStreet} <br />
            Plot {Pet.burialPlot} <br />
            {Pet.burialCity}, {Pet.burialState} {Pet.burialZipCode}
          </CardText>
        );
      }
      return <CardText>Please Edit to add burial location.</CardText>
    }

    return(
      <Card>
      {/* <CardImg className="profileCardImg" top width="100%" src={fbUserObject.photoURL} alt="Card image cap" /> */}
      <CardHeader>{Pet.name}</CardHeader>
      <div className="col-sm-2">
        <CardImg
          className="petCardImg"
          top
          width="100%"
          src="https://i.pinimg.com/736x/b1/d8/fc/b1d8fc33b1f9776195ad201a863bae0f.jpg"
          alt="Card image cap"
        />
      </div>
      <div className="col-sm-10">
        <CardBody>
          <CardText>{Pet.breed}</CardText>
          <CardText>
            Born:  {dateFormat(Pet.dateOfBirth)}<br />
            Died:  {dateFormat(Pet.dateOfDeath)}
          </CardText>
          {burialData()}
          <Button onClick={this.editEvent}>Edit</Button>
          <Button onClick={this.deleteEvent}>Delete</Button>
        </CardBody>
      </div>
    </Card>
    );
  }
}

export default Pets;
