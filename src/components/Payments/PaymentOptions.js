import React from 'react';
import './PaymentOptions.scss'

class PaymentOptions extends React.Component {

  render(){
    const { isProfilePage, paymentOption } = this.props;

    const profilePayments = () => {
    // need to set a default state for isProfile page in here
      if (isProfilePage) {
        return(
          <h5>Profile payment options go here</h5>
        )
      } else return (
        <h5>Payment options go here</h5>
      )
    }

    return(
      profilePayments()
    );
  }
}

export default PaymentOptions;
