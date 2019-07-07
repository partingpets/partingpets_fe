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
import paymentRequests from '../../helpers/data/paymentRequests';

const emptyPaymentObject = {
  userId: '',
  name: '',
  accountNumber: '',
  type: '',
  cvv: '',
  expDate: '',
  isDeleted: '',
};

class PaymentModal extends React.Component {
  state = {
    newPayment: emptyPaymentObject,
  }

  toggle() {
    this.props.toggle();
    this.setState({
      newPayment: emptyPaymentObject,
    });
  }

  formFieldStringState = (name, event) => {
    event.preventDefault();
    const tempPayment = { ...this.state.newPayment };
    tempPayment[name] = event.target.value;
    this.setState({
      newPayment: tempPayment,
    });
  };

  nameChange = event => this.formFieldStringState('name', event);

  render() {
    const { newPayment } = this.state;

    const { isOpen } = this.props;


    return(
      <div className="PaymentModal">
      <Modal
        className="paymentForm-modal"
        isOpen={isOpen}
        centered
        backdrop={this.state.backdrop} 
      >
        <ModalHeader toggle={e => this.toggle(e)}>Payment Form</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="paymentName">Name of your payment option</Label>
              <Input
                className="form-input"
                type="text"
                name="paymentName"
                id="paymentName"
                placeholder="My Card"
                onChange={this.nameChange}
                value={newPayment.name}
              />
            </FormGroup>
            <Row form>
              <Col md={9}>
                <FormGroup>
                  <Label for="accountNumber">Account Number</Label>
                  <Input
                    className="form-input"
                    type="text"
                    name="accountNumber"
                    id="accountNumber"
                    placeholder="•••• •••• •••• ••••"
                    onChange={this.accountNumberChange}
                    value={newPayment.accountNumber}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="cvv">Security CVV</Label>
                  <Input
                    className="form-input"
                    type="text"
                    name="cvv"
                    id="cvv"
                    placeholder="•••"
                    onChange={this.cvvChange}
                    value={newPayment.cvv}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="type">Type of Card</Label>
                  <Input
                    className="form-input"
                    type="select"
                    name="type"
                    id="type"
                    onChange={this.typeChange}
                    value={newPayment.type}
                  >
                    <option>Visa</option>
                    <option>MasterCard</option>
                    <option>American Express</option>
                    <option>Discover</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="expDate">Experation Date</Label>
                  <Input
                    className="form-input"
                    type="text"
                    name="expDate"
                    id="expDate"
                    placeholder="MM/YYYY"
                    onChange={this.expDateChange}
                    value={newPayment.expDate}                    
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

export default PaymentModal;
