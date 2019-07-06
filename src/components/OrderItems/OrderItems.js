import React from 'react';
import './OrderItems.js';

class OrderItems extends React.Component
{
    render() {
        const { order } = this.props;

        return (
            <div className="Please">
                <h1>Hello again</h1>
            </div>
        );
    }
}

export default OrderItems;