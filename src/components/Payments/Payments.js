import React from 'react';
import './Payments.scss';
import paymentRequests from '../../helpers/data/paymentRequests';
import PaymentOptions from './PaymentOptions';
import PaymentModal from './PaymentModal';
import {Button, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';


class Payments extends React.Component {

  state = {
    calledPaymentOptionsInState: [],
    paymentModal: false,
    selectedPaymentId: -1,
    isEditingPayment: false,
    paymentIdToEdit: -1,
  }

  componentDidMount(){
    this.getPaymentOptions();
  }

  getPaymentOptions() {
    const userId = this.props.userId;
    paymentRequests.getPaymentOptions(userId).then((paymentOptions) => {
      this.setState({
        calledPaymentOptionsInState: paymentOptions,
      });
    });
  }

  toggle = () => {
    if (this.state.isEditingPayment) {
      this.setState({
        paymentModal: !this.state.paymentModal,
        isEditingPayment: false,
        paymentIdToEdit: '-1',
      });
    } else {
      this.setState({
        paymentModal: !this.state.paymentModal,
      });
    }
  };

  formFieldStringState = (event) => {
    event.preventDefault();
    const {paymentIdCallBack} = this.props;
    let tempPayment = this.state.selectedPaymentId;
    tempPayment = event.target.value === 'Payment Methods' ? -1 : event.target.value;
    paymentIdCallBack(tempPayment)
    this.setState({
      selectedPaymentId: tempPayment,
    });
  };

  selectedPaymentChange = event => this.formFieldStringState(event);

  paymentFormSubmitEvent = (payment) => {
    const { isEditingPayment, paymentIdToEdit } = this.state;
    if (isEditingPayment){
      paymentRequests
        .editPaymentOption(paymentIdToEdit, payment)
        .then(this.getPaymentOptions())
        .then(this.setState({ isEditingPayment: false, paymentIdToEdit: -1 }))
    } else {
      paymentRequests.createPaymentOption(payment).then(this.getPaymentOptions());
    }
  };

  passPaymentToEdit = paymentId => this.setState({ isEditingPayment: true, paymentIdToEdit: paymentId });

  deletePayment = (paymentId) => {
    paymentRequests
      .deletePaymentOption(paymentId)
      .then(() => {
        this.getPaymentOptions();
      })
      .catch(error => console.error('error with deleting this payment option', error));
  }

  render(){
    const { isProfilePage } = this.props;

    const { 
      calledPaymentOptionsInState, 
      selectedPaymentId, 
      isEditingPayment, 
      paymentIdToEdit,
    } = this.state;

    const paymentOptions = paymentOption => (
      <PaymentOptions 
        key={paymentOption.id}
        paymentOption={paymentOption}
        deleteThisPayment={this.deletePayment}
        passPaymentToEdit={this.passPaymentToEdit}
        toggle={this.toggle}
      />
    )

    const paymentSelector = paymentOption => (
      <option key={paymentOption.id} paymentoption={paymentOption} value={paymentOption.id}>{paymentOption.name}</option>
    )

    const listedPaymentOptions = calledPaymentOptionsInState.map(paymentOptions)

    const selectorPaymentOptions = calledPaymentOptionsInState.map(paymentSelector)

    const listOrSelector = () => {
      if (isProfilePage) {
        return( 
          <div>
            {listedPaymentOptions}
          </div>
        )
      } else return(
          <Form>
            <Row>
              <Col md={3}>
                <FormGroup>
                  <Label for="paymentSelect">Select Payment Method</Label>
                  <Input onChange={this.selectedPaymentChange} type="select" name="select" id="select" value={selectedPaymentId}>
                    <option>Payment Methods</option>
                    {selectorPaymentOptions}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        )
    }

    return(
      <div>
        {listOrSelector()}
        <PaymentModal 
          isOpen={this.state.paymentModal}
          toggle={this.toggle}
          onSubmit={this.paymentFormSubmitEvent}
          userId={this.props.userId}
          isEditingPayment={isEditingPayment}
          paymentIdToEdit={paymentIdToEdit}
        />
        <Button outline size="sm" className="addPaymentButton" onClick={this.toggle}>
          <i className="add-payment-icon lnr lnr-plus-circle" />
          Add a new payment method
        </Button>
      </div>
    );
  }
}

export default Payments;
