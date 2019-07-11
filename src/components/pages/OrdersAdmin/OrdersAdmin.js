import React from 'react';
import orderRequests from '../../../helpers/data/orderRequests';
import ManageOrdersTable from '../../ManageOrdersTable/ManageOrdersTable';
import './OrdersAdmin.scss';

class OrdersAdmin extends React.Component {
  ordersMounted = false;

  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  };

  state = {
    orders: [],
    currentUserObj: {},
    userObject: {},
    ManageOrdersTable: [],
  };

  // Get All Orders //

  getAllOrders = () => {
    // const { userObject } = this.props;
    orderRequests
      .getAllOrders()
      .then((orders) => {
        this.setState({ orders });
      })
      .catch((err) => {
        console.error('error with products GET', err);
      });
  };

  componentDidMount() {
    this.orderMounted = !!this.props.userObject.id;
    if (this.orderMounted) {
      this.getAllOrders();
    }
  }

  componentWillUnmount() {
    this.orderMounted = false;
  }

  render() {
    // const { userObject } = this.props;
    const { orders } = this.state;

    const printOrder = orders.map((order, index) => (
      <ManageOrdersTable key={order.id} index={index} order={order} onSelect={this.onSelect} />
    ));

    return (
      <div className="partnerItems mx-auto animated fadeIn w-100">
        <div className="back-button">
          <button className="backBtn" id="admin" onClick={this.changeView}>
            <i className="lnr lnr-arrow-left-circle" />
            BACK TO ADMIN PORTAL
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr className="header-table">
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">LAST</th>
                <th scope="col">FIRST</th>
                <th scope="col">TOTAL</th>
                <th scope="col">PURCHASE DATE</th>
                <th scope="col">DETAILS</th>
              </tr>
            </thead>
            <tbody>{printOrder}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default OrdersAdmin;
