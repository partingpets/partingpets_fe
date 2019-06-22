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
        descriptionMaxLength: 250,
        descriptionCharCount: 250,
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

    componentWillReceiveProps(props) {
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

nameChange = e => this.formFieldStringState('name', e);

descriptionChange = (event) => {
    this.formFieldStringState('description', event);
    this.setState({
      descriptionCharCount: this.state.descriptionMaxLength - event.target.textLength,
    });
  };

streetChange = e => this.formFieldStringState('street', e);

cityChange = e => this.formFieldStringState('city', e);

stateChange = e => this.formFieldStringState('state', e);

zipcodeChange = e => this.formFieldStringState('zipcode', e);

formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myNewPartner = { ...this.state.newPartner };
    // myNewProduct.partnerId = userObject.partnerId;
    onSubmit(myNewPartner);
    this.setState({
      newPartner: defaultPartner,
    });
  };

    render() {
        const {
            descriptionCharCount, descriptionMaxLength, newPartner,
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
            {/*<img src={pets} className="petsModalLogo" alt="pets_logo" />*/}
            {this.props.isEditing ? 'EDIT THE PARTNER' : 'ADD NEW PARTNER'}
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
                      className="form-input"
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Description"
                      onChange={this.descriptionChange}
                      value={newPartner.description}
                      />
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
                      >
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="state"
                      id="state"
                      placeholder="state"
                      onChange={this.stateChange}
                      value={newPartner.state}
                      >
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
                <Label className="float-right" for="char-count">
                  Remaining: {descriptionCharCount}/{descriptionMaxLength}
                </Label>
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