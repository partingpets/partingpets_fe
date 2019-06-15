import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
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
import autoSuggest from '../../helpers/data/autoSuggest';
import './RegisterForm.scss';

const defaultUser = {
  firstName: '',
  lastName: '',
  email: '',
  partner: 'false',
  partnerCode: '',
  street1: '',
  street2: '',
  city: '',
  state: '',
  zipcode: '',
};

class RegisterForm extends React.Component {
  state = {
    modal: false,
    firebaseId: -1,
    newUser: defaultUser,
    partnerCode: '',
    backdrop: 'static',
    isLoading: false,
    suggestResults: [],
    suggestedArray: [],
    usStates: [],
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
      newUser: defaultUser,
    });
  }

  componentDidMount() {
    stateRequests.getAllStates().then((usStates) => {
      this.setState({ usStates });
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      modal: props.showModal,
      firebaseId: props.firebaseId,
    });
  }

  formFieldStringState = (name, event) => {
    event.preventDefault();
    const tempUser = { ...this.state.newUser };
    tempUser[name] = event.target.value;
    this.setState({
      newUser: tempUser,
    });
  };

  formFieldNumberState = (name, event) => {
    const tempUser = { ...this.state.newUser };
    tempUser[name] = event.target.value * 1;
    this.setState({
      newUser: tempUser,
    });
  };

  formFieldBoolState = (name, event) => {
    const tempUser = { ...this.state.newUser };
    tempUser[name] = event.target.selectedOptions[0].dataset.selection;
    this.setState({
      newUser: tempUser,
    });
  };

  firstNameChange = event => this.formFieldStringState('firstName', event);

  lastNameChange = event => this.formFieldStringState('lastName', event);

  emailChange = event => this.formFieldStringState('email', event);

  partnerChange = event => this.formFieldBoolState('partner', event);

  partnerCodeChange = event => this.formFieldStringState('partnerCode', event);

  street1Change = event => this.formFieldStringState('street1', event);

  street2Change = event => this.formFieldStringState('street2', event);

  cityChange = event => this.formFieldStringState('city', event);

  stateChange = event => this.formFieldStringState('state', event);

  zipcodeChange = event => this.formFieldStringState('zipcode', event);

  autoSuggestState = (name, event) => {
    const { suggestedArray } = this.state;
    const tempUser = { ...this.state.newUser };
    const selectedSuggest = suggestedArray.filter(s => s.address.formattedAddress === name[0]);
    const formFill = selectedSuggest[0].address;
    tempUser.street1 = formFill.addressLine;
    tempUser.city = formFill.locality;
    tempUser.state = formFill.adminDistrict;
    tempUser.zipcode = formFill.postalCode;
    this.setState({
      newUser: tempUser,
    });
    this.typeahead.getInstance().clear();
  };

  autoSuggestEvent = (e) => {
    this.setState({ isLoading: true });
    const query = e;
    autoSuggest
      .getAutoSuggestForm(query)
      .then((results) => {
        this.setState({
          isLoading: false,
          suggestResults: results[0],
          suggestedArray: results[1],
        });
      })
      .catch(error => console.error('There was an issue gettign autosuggest results', error));
  };

  formSubmit = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const myNewUser = { ...this.state.newUser };
    onSubmit(myNewUser);
    this.setState({
      newUser: defaultUser,
    });
  };

  render() {
    const {
      newUser, isLoading, suggestResults, usStates,
    } = this.state;
    return (
      <div className="RegisterForm">
        <Modal
          className="form-modal"
          isOpen={this.state.modal}
          toggle={e => this.toggle(e)}
          onClosed={e => this.modalClosed(e)}
          centered
          backdrop={this.state.backdrop}
          size="lg"
        >
          <ModalHeader toggle={e => this.toggle(e)}>User Registration</ModalHeader>
          <ModalBody>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Stu"
                      onChange={this.firstNameChange}
                      value={newUser.firstName}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Padaso"
                      onChange={this.lastNameChange}
                      value={newUser.lastName}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">Email Address</Label>
                    <Input
                      className="form-input"
                      type="email"
                      name="email"
                      id="userEmail"
                      placeholder="pet_ownwer@luvmypet.com"
                      onChange={this.emailChange}
                      value={newUser.Email}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="partner">Partner</Label>
                    <Input
                      className="form-input"
                      type="select"
                      name="partner"
                      id="partner"
                      placeholder="Are you a partner"
                      onChange={this.partnerChange}
                      value={newUser.partner === 'true' ? 'Yes' : 'No'}
                    >
                      <option key="1" data-selection="false">
                        No
                      </option>
                      <option key="2" data-selection="true">
                        Yes
                      </option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="partnerCode">Partner Registration Code</Label>
                    <Input
                      disabled={newUser.partner === 'false' ? 'disabled' : ''}
                      className="form-input"
                      type="text"
                      name="partnerCode"
                      id="partnerCode"
                      // disabled={!newUser.partner}
                      placeholder="Registration Code"
                      onChange={this.partnerCodeChange}
                      value={newUser.partnerCode}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <hr className="mt-5" />
              <FormGroup>
                <Label className="typeahead-label" for="street1">
                  Search for Address
                </Label>
                <AsyncTypeahead
                  className="form-input mb-2"
                  ref={(typeahead) => {
                    this.typeahead = typeahead;
                  }}
                  clearButton={true}
                  id="street1"
                  placeholder="Search for address OR type below"
                  options={suggestResults}
                  isLoading={isLoading}
                  onSearch={this.autoSuggestEvent}
                  onChange={this.autoSuggestState}
                  value={newUser.street1}
                />
                <Label for="street1">Address 1</Label>
                <Input
                  className="form-input"
                  type="text"
                  name="street1"
                  id="street1"
                  placeholder="1234 Main St"
                  onChange={this.street1Change}
                  value={newUser.street1}
                />
              </FormGroup>
              <FormGroup>
                <Label for="street2">Address 2</Label>
                <Input
                  className="form-input"
                  type="text"
                  name="street2"
                  id="street2"
                  placeholder="Apartment, studio, or floor"
                  onChange={this.street2Change}
                  value={newUser.street2}
                />
              </FormGroup>
              <Row form>
                <Col md={5}>
                  <FormGroup>
                    <Label for="city">City</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="city"
                      id="city"
                      onChange={this.cityChange}
                      value={newUser.city}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input
                      className="form-input"
                      type="select"
                      name="state"
                      id="state"
                      placeholder="Select your State"
                      onChange={this.stateChange}
                      value={newUser.state}
                    >
                      {usStates.map((state, i) => (
                        <option key={i}>{state.name}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="zipcode">Zip</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      onChange={this.zipcodeChange}
                      value={newUser.zipcode}
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

export default RegisterForm;
