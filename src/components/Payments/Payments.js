import React from 'react';
import './Payments.scss';
import paymentRequests from '../../helpers/data/paymentRequests';
import PaymentOptions from './PaymentOptions';

class Payments extends React.Component {

  state = {
    usersPaymentOptions: []
  }

  componentDidMount(){
    this.getPaymentOptions();
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

    const { usersPaymentOptions } = this.state;

    const paymentOptions = paymentOption => (
      <PaymentOptions 
        key={paymentOption.id}
        paymentOption={paymentOption}
        isProfilePage={isProfilePage}
      />
    )

    const listedPaymentOptions = usersPaymentOptions.map(paymentOptions)

    return(
      <div>
        {listedPaymentOptions}
      </div>
    );
  }
}

export default Payments;
