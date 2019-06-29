import PropTypes from 'prop-types';
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
import stateRequests from '../../helpers/data/stateRequests';
import utils from '../../helpers/utils/utility';

import pets from '../AppNavbar/images/pets_small.png';

const defaultPartner = {
  name: '',
  description: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
};

class AddPartnerModal extends React.Component {
  state = {
    modal: false,
    backdrop: 'static',
    newPartner: defaultPartner,
    usStates: [],
    descriptionMaxLength: 250,
    descriptionCharCount: 250,
  };

  static propTypes = {
    showModal: PropTypes.bool,
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    productToEdit: PropTypes.object,
    modalCloseEvent: PropTypes.func,
  };

  toggle() {
    this.setState({
      modal: !this.state,
    });
  }

  modalClosed() {
    const { modalCloseEvent } = this.props;
    modalCloseEvent();
    this.setState({
      newPartner: defaultPartner,
    });
  }

  componentDidMount() {
    stateRequests
      .getAllStates()
      .then((usStates) => {
        this.setState({ usStates });
      })
      .catch((err) => {
        console.error('error with getting states', err);
      });
  }

  componentWillReceiveProps(props) {
    if (props.isEditing) {
      this.setState({
        newPartner: props.partnerToEdit,
      });
    }
    this.setState({
      modal: props.showModal,
    });
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempPartner = { ...this.state.newPartner };
    tempPartner[name] = e.target.value;
    this.setState({
      newPartner: tempPartner,
    });
  };

  formFieldNumberState = (name, event) => {
    const tempPartner = { ...this.state.newPartner };
    tempPartner[name] = event.target.value * 1;
    this.setState({
      newPartner: tempPartner,
    });
  };

  descriptionChange = (event) => {
    this.formFieldStringState('description', event);
    this.setState({
      descriptionCharCount: this.state.descriptionMaxLength - event.target.textLength,
    });
  };

  nameChange = event => this.formFieldStringState('name', event);

  streetChange = event => this.formFieldStringState('street', event);

  cityChange = event => this.formFieldStringState('city', event);

  stateChange = event => this.formFieldStringState('state', event);

  zipcodeChange = event => this.formFieldStringState('zipcode', event);

  formSubmit = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const myNewPartner = { ...this.state.newPartner };
    // TODO: Need to check if partnercode exist in database
    myNewPartner.RegistrationCode = utils.getRandomCode();
    onSubmit(myNewPartner);
    this.setState({
      newPartner: defaultPartner,
    });
  };

  render() {
    const {
      descriptionCharCount, descriptionMaxLength, newPartner, usStates,
    } = this.state;
    return (
      <div className="AddPartnerModal">
        <Modal
          className="form-modal"
          isOpen={this.state.modal}
          toggle={e => this.toggle(e)}
          onClosed={e => this.modalClosed(e)}
          centered
          backdrop={this.state.backdrop}
          size="lg"
        >
          <ModalHeader toggle={e => this.toggle(e)}>
            <img src={pets} className="petsModalLogo" alt="pets_logo" />
            {this.props.isEditing ? 'EDIT THE PARTING PETS PARTNER' : 'ADD NEW PARTING PETS PARTNER'}
          </ModalHeader>
          <ModalBody>
            <Form>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="name">Partner Name</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Partner Name"
                      onChange={this.nameChange}
                      value={newPartner.name}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                      className="form-input textArea"
                      type="textarea"
                      name="description"
                      id="description"
                      placeholder="Description"
                      maxLength={descriptionMaxLength}
                      onChange={this.descriptionChange}
                      value={newPartner.description}
                    />
                    <Label className="float-right" for="char-count">
                      Remaining: {descriptionCharCount}/{descriptionMaxLength}
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={5}>
                  <FormGroup>
                    <Label for="street">Street</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="street"
                      id="street"
                      placeholder="1234 Drive"
                      onChange={this.streetChange}
                      value={newPartner.street}
                    />
                  </FormGroup>
                </Col>

                <Col md={5}>
                  <FormGroup>
                    <Label for="city">City</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="city"
                      id="city"
                      placeholder="city"
                      onChange={this.cityChange}
                      value={newPartner.city}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input
                      className="form-input"
                      type="select"
                      name="state"
                      id="state"
                      placeholder="state"
                      onChange={this.stateChange}
                      value={newPartner.state}
                    >
                      {usStates.map((state, i) => (
                        <option key={i}>{state.name}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="zipcode">Zipcode</Label>
                <Input
                  className="form-input textArea"
                  type="textarea"
                  name="text"
                  id="zipcode"
                  rows="1"
                  placeholder="Zipcode"
                  maxLength={descriptionMaxLength}
                  onChange={this.zipcodeChange}
                  value={newPartner.zipcode}
                />
              </FormGroup>
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

export default AddPartnerModal;
