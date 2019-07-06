import React from 'react';
import './Payments.scss';
import paymentRequests from '../../helpers/data/paymentRequests';
import PaymentOptions from './PaymentOptions';
import {Button} from 'reactstrap';

class Payments extends React.Component {

  state = {
    calledPaymentOptionsInState: []
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

    const listedPaymentOptions = calledPaymentOptionsInState.map(paymentOptions)

    return(
      <div>
        {listedPaymentOptions}
        <Button outline size="sm">
          Add a new payment option
        </Button>
      </div>
    );
  }
}

export default Payments;
