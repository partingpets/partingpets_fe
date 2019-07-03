import React from 'react';
import './Payments.scss';

class Payments extends React.Component {
  render(){
    const { isProfilePage } = this.props;

    const profilePayments = () => {
      if (isProfilePage) {
        return(
          <h5>Profile payments go here</h5>
        )
      } else return (
        <h5>Payments go here</h5>
      )
    }
    return(
      profilePayments()
    );
  }
}

export default Payments;
