import React from 'react';
import './Payments.scss';
import paymentRequests from '../../helpers/data/paymentRequests';
import PaymentOptions from './PaymentOptions';
import PaymentModal from './PaymentModal';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

class Payments extends React.Component {

  state = {
    calledPaymentOptionsInState: [],
    paymentModal: false,
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

  render(){
    const { isProfilePage } = this.props;

    const { calledPaymentOptionsInState } = this.state;

    const paymentOptions = paymentOption => (
      <PaymentOptions 
        key={paymentOption.id}
        paymentOption={paymentOption}
        isProfilePage={isProfilePage}
      />
    )

    const paymentSelector = paymentOption => (
      <option key={paymentOption.id} paymentOption={paymentOption}>{paymentOption.name}</option>
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
            <FormGroup>
              <Label for="paymentSelect">Select Payment Method</Label>
              <Input type="select" name="select" id="select">
                {selectorPaymentOptions}
              </Input>
            </FormGroup>
          </Form>
        )
    }

    return(
      <div>
        {listOrSelector()}
        <PaymentModal 
          isOpen={this.state.paymentModal}
          toggle={this.toggle}
        />
        <Button outline size="sm" onClick={this.toggle}>
          Add a new payment option
        </Button>
      </div>
    );
  }
}

export default Payments;
