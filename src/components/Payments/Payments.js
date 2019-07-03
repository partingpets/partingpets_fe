import React from 'react';
import './Payments.scss';

class Payments extends React.Component {

  state = {
    usersPaymentOptions: []
  }

  getPaymentOptions() {
    const userId = this.props.userId;
    paymentRequests.getPaymentOptions(userId).then((paymentOptions) => {
      this.setState({
        usersPaymentOptions: paymentOptions,
      });
    });
  }

  render(){
    const { isProfilePage } = this.props;

    const profilePayments = () => {
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

export default Payments;
