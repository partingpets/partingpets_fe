import React from 'react';
import './OrderItems.scss';

class OrderItems extends React.Component
{
    render() {
        const { order } = this.props;

        return (
            <div className="order-item-div">
                <h1>Hello again</h1>
                <h3>{order.firstName}</h3>
                {order.orderItems.map((orderitem, i) => (
                    <div>
                    <h3 key={i}>{orderitem.name}</h3>
                    <h3>{orderitem.quantity}</h3>
                    </div>
                ))}
                {/* <h3>{orderitem.name}</h3> */}
                {/* <h3>{orderItems.name}</h3>
                <h4>{orderItems.quantity}</h4>
                <h5>{orderItems.unitPrice}</h5> */}
            </div>
        );
    }
}

export default OrderItems;