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
    tempPayment = event.target.value;
    paymentIdCallBack(tempPayment)
    this.setState({
      selectedPaymentId: tempPayment,
    });
  };

  selectedPaymentChange = event => this.formFieldStringState(event);

  paymentFormSubmitEvent = (payment) => {
    paymentRequests.createPaymentOption(payment).then(this.getPaymentOptions());
  }

  render(){
    const { isProfilePage } = this.props;

    const { calledPaymentOptionsInState, selectedPaymentId } = this.state;

    const paymentOptions = paymentOption => (
      <PaymentOptions 
        key={paymentOption.id}
        paymentOption={paymentOption}
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
                    <option>Your Credit Cards</option>
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
