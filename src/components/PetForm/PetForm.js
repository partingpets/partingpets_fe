import React from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import petRequests from '../../helpers/data/petRequests';

import pets from '../AppNavbar/images/pets_small.png';

const defaultPet = {
  name: '',
  userId: '',
  breed: '',
  dateOfBirth: '',
  dateOfDeath: '',
  burialStreet: '',
  burialCity: '',
  burialState: '',
  burialZipCode: '',
  burialPlot: '',
};

class PetForm extends React.Component {
  state = {
    newPet: defaultPet,
  };

  toggle() {
    this.props.toggle();
    this.setState({
      newPet: defaultPet,
    });
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, userObject } = this.props;
    const petSubmit = { ...this.state.newPet };
    petSubmit.userId = userObject.id;
    if (petSubmit.name && petSubmit.breed && petSubmit.dateOfBirth && petSubmit.dateOfDeath) {
      onSubmit(petSubmit);
      this.toggle();
    } else {
      alert('You Fucked Up.  Fill out the whole form, d-bag.');
    }
  };

  componentDidUpdate(prevProps) {
    const { isEditingPet, petIdToEdit } = this.props;
    if (prevProps !== this.props && isEditingPet) {
      petRequests
        .getSinglePet(petIdToEdit)
        .then((thatPetYouJustGot) => {
          this.setState({ newPet: thatPetYouJustGot.data });
        })
        .catch(error => console.error('error with geting the pet you wanted to edit', error));
    }
  }

  formFieldStringState = (name, event) => {
    event.preventDefault();
    const tempPet = { ...this.state.newPet };
    tempPet[name] = event.target.value;
    this.setState({
      newPet: tempPet,
    });
  };

  formFieldNumberState = (name, event) => {
    const tempPet = { ...this.state.newPet };
    tempPet[name] = event.target.value * 1;
    this.setState({
      newPet: tempPet,
    });
  };

  nameChange = event => this.formFieldStringState('name', event);

  breedChange = event => this.formFieldStringState('breed', event);

  dateOfBirthChange = event => this.formFieldStringState('dateOfBirth', event);

  dateOfDeathChange = event => this.formFieldStringState('dateOfDeath', event);

  burialStreetChange = event => this.formFieldStringState('burialStreet', event);

  burialCityChange = event => this.formFieldStringState('burialCity', event);

  burialStateChange = event => this.formFieldStringState('burialState', event);

  burialZipCodeChange = event => this.formFieldStringState('burialZipCode', event);

  burialPlotChange = event => this.formFieldStringState('burialPlot', event);

  render() {
    const { newPet } = this.state;
    const { isOpen, isEditingPet } = this.props;
    const formTitle = () => {
      if (isEditingPet) {
        return 'Edit Pet Information';
      }
      return 'Pet Registration';
    };

    return (
      <div className="PetForm">
        <Modal className="petForm-modal" isOpen={isOpen} centered backdrop={this.state.backdrop} size="lg">
          <ModalHeader toggle={e => this.toggle(e)}>
            <img src={pets} className="petsAddEditModalLogo" alt="pets_logo" />
            {formTitle()}
          </ModalHeader>
          <ModalBody>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="petName">Pet's Name</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="petName"
                      id="petName"
                      placeholder="Rover"
                      onChange={this.nameChange}
                      value={newPet.name}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="breed">Breed</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="breed"
                      id="breed"
                      placeholder="Mutt"
                      onChange={this.breedChange}
                      value={newPet.breed}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="dateOfBirth">Date Of Birth</Label>
                    <Input
                      className="form-input"
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      placeholder="yyyy-mm-dd"
                      onChange={this.dateOfBirthChange}
                      value={newPet.dateOfBirth}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="dateOfDeath">Date Of Death</Label>
                    <Input
                      className="form-input"
                      type="date"
                      name="dateOfDeath"
                      id="dateOfDeath"
                      placeholder="yyyy-mm-dd"
                      onChange={this.dateOfDeathChange}
                      value={newPet.dateOfDeath}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="burialStreet">Burial Street</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="burialStreet"
                      id="burialStreet"
                      placeholder="123 Street Rd"
                      onChange={this.burialStreetChange}
                      value={newPet.burialStreet}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="burialCity">Burial City</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="burialCity"
                      id="burialCity"
                      placeholder="Townsville"
                      onChange={this.burialCityChange}
                      value={newPet.burialCity}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="burialState">Burial State</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="burialState"
                      id="burialState"
                      placeholder="North Hampshire"
                      onChange={this.burialStateChange}
                      value={newPet.burialState}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="burialZipCode">Burial Zip Code</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="burialZipCode"
                      id="burialZipCode"
                      placeholder="55555"
                      onChange={this.burialZipCodeChange}
                      value={newPet.burialZipCode}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="burialPlot">Burial Plot</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="burialPlot"
                      id="burialPlot"
                      placeholder="A-1"
                      onChange={this.burialPlotChange}
                      value={newPet.burialPlot}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.formSubmit}>
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={e => this.toggle(e)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PetForm;
