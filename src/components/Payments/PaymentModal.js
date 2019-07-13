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
import moment from 'moment';
import paymentRequests from '../../helpers/data/paymentRequests';

const emptyPaymentObject = {
  userId: '',
  name: '',
  accountNumber: '',
  type: 'Visa',
  cvv: '',
  expDate: '',
  isDeleted: false,
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

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, userId } = this.props;
    const paymentSubmit = { ...this.state.newPayment };
    paymentSubmit.userId = userId;
    if (paymentSubmit.name && 
      paymentSubmit.accountNumber &&
      paymentSubmit.cvv &&
      paymentSubmit.type &&
      paymentSubmit.expDate) {
        onSubmit(paymentSubmit);
        this.toggle();
      } else {
        alert('You Fucked Up.  Fill out the whole form, d-bag.')
      }
  }

  componentDidUpdate(prevProps) {
    const { isEditingPayment, paymentIdToEdit } = this.props;
    if (prevProps !== this.props && isEditingPayment) {
      paymentRequests
        .getSinglePaymentOption(paymentIdToEdit)
        .then((thatPaymentYouJustGot) => {
          thatPaymentYouJustGot.data.expDate = moment(thatPaymentYouJustGot.data.expDate).format("MM/YYYY")
          this.setState({ newPayment: thatPaymentYouJustGot.data });
        })
        .catch(error => console.error('error with getting the payment you want to edit', error));
    }
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
  accountNumberChange = event => this.formFieldStringState('accountNumber', event);
  cvvChange = event => this.formFieldStringState('cvv', event);
  typeChange = event => this.formFieldStringState('type', event);
  expDateChange = event => this.formFieldStringState('expDate', event);


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
                    maxLength="16"
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
                    maxLength="3"
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
                    maxLength="7"
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
