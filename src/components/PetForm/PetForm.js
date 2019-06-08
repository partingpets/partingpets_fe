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
  state= {
    modal: false,
    newPet: defaultPet,
  }

  toggle() {
    this.setState({
      modal: !this.state,
    });
  }

  modalClosed() {
    const { modalCloseEvent } = this.props;
    modalCloseEvent();
    this.setState({
      newPet: defaultPet,
    })
  }

  componentWillReceiveProps(props) {
    this.setState({
      modal: props.showModal,
    });
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

  nameChange = event => this.formFieldStringState('',event);

  breedChange = event => this.formFieldStringState('',event);

  dateOfBirthChange = event => this.formFieldStringState('',event);

  dateOfDeathChange = event => this.formFieldStringState('',event);

  burialStreetChange = event => this.formFieldStringState('',event);

  burialCityChange = event => this.formFieldStringState('',event);

  burialStateChange = event => this.formFieldStringState('',event);

  burialZipCodeChange = event => this.formFieldStringState('',event);

  burialPlotChange = event => this.formFieldStringState('',event);


  render(){
    const { newPet } = this.state;
    return ( 
      <div className="PetForm">
      <Modal
        className="form-modal"
        isOpen={this.state.modal}
        toggle={e => this.toggle(e)}
        onClosed={e => this.modalClosed(e)}
        centered
        backdrop={this.state.backdrop}
        size="lg"
      >
        <ModalHeader toggle={e => this.toggle(e)}>Pet Registration</ModalHeader>
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
              <Col md={8}>
                <FormGroup>
                  <Label for="dateOfBirth">Date Of Birth</Label>
                  <Input
                    className="form-input"
                    type="text"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    placeholder="2000-12-31"
                    onChange={this.dateOfBirthChange}
                    value={newPet.dateOfBirth}
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="dateOfDeath">Date Of Death</Label>
                  <Input
                    className="form-input"
                    type="text"
                    name="dateOfDeath"
                    id="dateOfDeath"
                    onChange={this.dateOfDeathChange}
                    value={newPet.dateOfDeath}
                  />
                </FormGroup>
              </Col>
            </Row>
            <h1>This Modal is still under construction</h1>

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