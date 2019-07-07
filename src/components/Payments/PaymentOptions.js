import React from 'react';
import './PaymentOptions.scss'
import moment from 'moment';
import {Button} from 'reactstrap';

class PaymentOptions extends React.Component {

  render(){
    const { isProfilePage, paymentOption } = this.props;

    const hideAccountNumber = (aNumber) => {
      const stringNumber = aNumber.toString();
      const seeNumbers = stringNumber.slice(-4);
      return `•••• •••• •••• ${seeNumbers}`
    }

    const profilePayments = () => {
    // need to set a default state for isProfile page in here
      if (isProfilePage) {
        return(
          <div>
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <h6>{paymentOption.name}</h6>
                </div>
                <div className="col-sm-6">
                  <Button outline size="sm" className="pay-btn" id={paymentOption.id}>
                    <i className="lnr lnr-pencil pay-btn-edit-icon" aria-hidden="true" />
                  </Button>
                  <Button outline size="sm" className="pay-btn">
                    <i className="lnr lnr-trash  pay-btn-delete-icon" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
            <div>
              {hideAccountNumber(paymentOption.accountNumber)} <small> - expires</small> {moment(paymentOption.expDate).format("MM/YY")}
            </div>
            <br />
          </div>
        )
      } else return (
        <div>
          <h5>Payment options go here</h5>
          <p>{paymentOption.name}</p>
        </div>
      )
    }

    return(
      profilePayments()
    );
  }
}

export default PaymentOptions;
