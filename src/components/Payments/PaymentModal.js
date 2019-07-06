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
import paymentRequests from '../../helpers/data/paymentRequests';

const emptyPaymentObject = {
  userId: '',
  name: '',
  accountNumber: '',
  type: '',
  cvv: '',
  expDate: '',
  isDeleted: '',
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

  render() {
    const { newPayment } = this.state;
    

    return(
      <h3>payment modal</h3>
    );
  }
}