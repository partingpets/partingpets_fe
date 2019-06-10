import React from 'react';
import {
  Card, CardImg, CardText, CardBody, Button, CardHeader,
} from 'reactstrap';
import './Pets.scss';

class Pets extends React.Component {

  render(){
    const { Pet } = this.props;

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
            Born:  {Pet.dateOfBirth}<br />
            Died:  {Pet.dateOfDeath}
          </CardText>
          <CardText>
            Final Resting Place: <br />
            {Pet.burialStreet}, Plot {Pet.burialPlot} <br />
            {Pet.burialCity}, {Pet.burialState} {Pet.burialZipCode}
          </CardText>
          <Button>Edit</Button>
        </CardBody>
      </div>
    </Card>
    );
  }
}

export default Pets;