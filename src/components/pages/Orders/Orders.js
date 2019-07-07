import React from 'react';
import orderRequests from '../../../helpers/data/orderRequests';
import OrderItems from '../../OrderItems/OrderItems';
import './Orders.scss';

class Orders extends React.Component {
   state = { 
    orders: [],
   };
   
  getOrderById() {
      const userid = this.props.userObject.id;
      orderRequests.getOrderById(userid)
      .then((result) => {
          this.setState({ orders: result });
      });
  }

  componentDidMount() {
      this.getOrderById();
  }

  render() {
    const { orders } = this.state;

     const printOrders = orders.map(order => (
      
         <OrderItems
         key={order.id}
         order={order}
         />
   ));

      return (
        <div className="orders-container">
            <h1 className="orders-page-title">Your Orders</h1>
            <h3 className="row justify-content-center">{printOrders}</h3>
        </div>
      );
    }
   
}

export default Orders;