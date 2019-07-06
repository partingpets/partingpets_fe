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
            </div>
        );
    }
}

export default OrderItems;