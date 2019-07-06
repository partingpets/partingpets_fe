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
        console.log(result);
          this.setState({ orders: result });
      });
  }

  componentDidMount() {
      this.getOrderById();
  }

  render() {
    const { orders } = this.state;
    
    const printOrder = orders.map(order => {
        <OrderItems
        key={order.id}
        order={order}
        />
    });

      return (
        <div className="Order">
            <h1>Hello</h1>
            <h3>{printOrder}</h3>
        </div>
      );
    }
   
}

export default Orders;