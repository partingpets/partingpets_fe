import React from 'react';
import orderRequests from '../../../helpers/data/orderRequests';
import './OrderDetail.scss';

class OrderDetail extends React.Component {
state = {
    singleOrder: {},
};

backToOrdersView = (e) => {
    this.props.history.push(`/orders`);
};

componentDidMount() {
    const { id } = this.props.match.params;
    orderRequests.getOrderByOrderId(id)
    .then((singleOrder) => {
        this.setState({ singleOrder });
    });
}

render() {
   const { singleOrder } = this.state;

    return (
        <div>
            <h1 className="order-detail-header">Orders Details</h1>
            <h3>{singleOrder.firstName}</h3>
        </div>
    );
}
}
 
export default OrderDetail;