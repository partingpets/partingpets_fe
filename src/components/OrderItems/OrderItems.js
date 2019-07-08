import React from 'react';
import { Button } from 'reactstrap';
import './OrderItems.scss';
import utility from '../../helpers/utils/utility';

class OrderItems extends React.Component
{
    render() {
        const { order } = this.props;

        return (
            <div className="orderCard card2 col-6">
                <h2 className="order-details-header">Details for Order #{order.id}</h2>
                <h3>Ordered on {utility.dateFormat(order.purchaseDate)}</h3>

                <div className="billing-ordersummary">
                
                <div className="billing-address">
                <h4>Billing Address</h4>
                <h6>{order.firstName} {order.lastName}</h6>
                <h6>{order.street1}</h6>
                <h6>{order.city}, {order.state} {order.zipCode}</h6>
                <h5 className="payment-method">Payment Method: VISA</h5>
                </div>
            
                <div className="order-summary">
                <h4>Order Summary</h4>
                <h6>Item(s) Subtotal: ${order.subtotal}</h6>
                <h6>Shipping & Handling: $0.00</h6>
                <h6>Sales Tax: ${order.tax}</h6>
                <h6 className="grand-total">Grand Total: ${order.total}</h6>
                <Button color="primary">More Details</Button>
                </div>

                </div>
            </div>
        );
    }
}

export default OrderItems;