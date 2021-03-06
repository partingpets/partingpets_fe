import React from 'react';
import './PaymentOptions.scss'
import moment from 'moment';
import {Button} from 'reactstrap';

class PaymentOptions extends React.Component {

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteThisPayment, paymentOption } = this.props;
    deleteThisPayment(paymentOption.id)
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passPaymentToEdit, paymentOption, toggle } = this.props;
    passPaymentToEdit(paymentOption.id);
    toggle();
  }

  render(){
    const { paymentOption } = this.props;

    const hideAccountNumber = (aNumber) => {
      const stringNumber = aNumber.toString();
      const seeNumbers = stringNumber.slice(-4);
      return `•••• •••• •••• ${seeNumbers}`
    }

    return(
      <div className="listedPT">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <h6>{paymentOption.name}</h6>
            </div>
            <div className="col-sm-6">
              <Button outline size="sm" className="pay-btn" id={paymentOption.id} onClick={this.editEvent}>
                <i className="lnr lnr-pencil pay-btn-edit-icon" aria-hidden="true" />
              </Button>
              <Button outline size="sm" className="pay-btn" onClick={this.deleteEvent}>
                <i className="lnr lnr-trash  pay-btn-delete-icon" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
        <div>
          {hideAccountNumber(paymentOption.accountNumber)} <small className="expires">expires</small> {moment(paymentOption.expDate).format("MM/YY")}
        </div>
        <br />
      </div>
    );
  }
}

export default PaymentOptions;
