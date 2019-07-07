import React from 'react';
import './OrderItems.scss';

class OrderItems extends React.Component
{
    render() {
        const { order } = this.props;

        return (
            <div className="orderCard card2 col-6">
                <h1>Details for Order #{order.id}</h1>
                <h3>{order.firstName} {order.lastName}</h3>
                {order.orderItems.map((orderitem, i) => (
                    //<div>
                    <h3 key={i}>{orderitem.name}</h3>
                    //<h3>{orderitem.quantity}</h3>
                    // </div>
                ))}
            </div>
        );
    }
}

export default OrderItems;