import React from 'react';
import orderRequests from '../../../helpers/data/orderRequests';
import OrderItems from '../../OrderItems/OrderItems';
import './Orders.scss';

class Orders extends React.Component {
  orderseMounted = false;

  state = {
    orders: [],
  };

  getOrderById() {
    const userid = this.props.userObject.id;
    orderRequests.getOrderById(userid).then((result) => {
      const sortedArray = [...result].sort((a, b) => b.id - a.id);
      this.setState({ orders: sortedArray });
    });
  }

  componentDidMount() {
    this.orderseMounted = !!this.props.userObject.id;
    if (this.orderseMounted) {
      this.getOrderById();
    }
  }

  componentWillUnmount() {
    this.orderseMounted = false;
  }

  onSelect = (id) => {
    this.props.history.push(`/orders/${id}`);
  };

  render() {
    const { orders } = this.state;

    const printOrders = orders.map(order => <OrderItems key={order.id} order={order} onSelect={this.onSelect} />);

    return (
      <div className="orders-container animated bounceInLeft">
        <h1 className="orders-page-title">Your Parting Pets Orders</h1>
        <h3 className="row justify-content-center">{printOrders}</h3>
      </div>
    );
  }
}

export default Orders;
