import React from 'react';
import {
  Collapse, Button, CardBody, Card, Row, Col,
} from 'reactstrap';
import './OrderItems.scss';
import utility from '../../helpers/utils/utility';

import pets from '../AppNavbar/images/pets_small.png';

class OrderItems extends React.Component {
  state = {
    collapse: false,
  };

  toggle = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };

  render() {
    const { order } = this.props;

    return (
      <div className="orderCard col-6">
        <div className="order-header">
          <img src={pets} className="petsOrderLogo" alt="pets_logo" />
          <h4 className="order-details-header">Details for Order #{order.id}</h4>
          <h5>Ordered on {utility.dateFormat(order.purchaseDate)}</h5>
        </div>
        <Row className="order-body">
          <Col className="col-sm-8">
            <div className="billing-address">
              <Row>
                <h4>Billing Address</h4>
              </Row>
              <Row>
                <h6>
                  {order.firstName} {order.lastName}
                </h6>
              </Row>
              <Row>
                <h6>{order.street1}</h6>
              </Row>
              <Row>
                <h6>
                  {order.city}, {order.state} {order.zipCode}
                </h6>
              </Row>
              <Row>
                <h5 className="payment-method">Payment Method: {order.payment}</h5>
              </Row>
            </div>
          </Col>
          <Col className="order-sum col-sm-4">
            <div className="order-summary">
              <Row>
                <h4>Order Summary</h4>
              </Row>
              <Row>
                <h6>Item(s) Subtotal: ${order.subtotal}</h6>
              </Row>
              <Row>
                <h6>Shipping & Handling: $0.00</h6>
              </Row>
              <Row>
                <h6>Sales Tax: ${order.tax}</h6>
              </Row>
              <Row>
                <h6 className="grand-total">Grand Total: ${order.total}</h6>
              </Row>
              <Row>
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>
                  {!this.state.collapse ? 'More Details' : 'Close Details'}
                </Button>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Collapse className="collapse-div" isOpen={this.state.collapse}>
            <hr />
            <Card>
              <CardBody>
                <Row>
                  <Col className="col-md-2 quantity-header">
                    <h5 className="column-headers">Qty</h5>
                  </Col>
                  <Col className="col-md-6">
                    <h5 className="column-headers">Name</h5>
                  </Col>
                  <Col className="col-md-2">
                    <h5 className="column-headers">Price</h5>
                  </Col>
                  <Col className="col-md-2">
                    <h5 className="column-headers">Total</h5>
                  </Col>
                </Row>
                {order.orderItems.map((orderitem, i) => (
                  <div key={i}>
                    <Row>
                      <Col className="col-md-2">
                        <h5>{orderitem.quantity}</h5>
                      </Col>
                      <Col className="col-md-6">
                        <h5 key={i}>{orderitem.name}</h5>
                      </Col>
                      <Col className="col-md-2">
                        <h5>${orderitem.unitPrice}</h5>
                      </Col>
                      <Col className="col-md-2 line-total">
                        <h5>${orderitem.lineTotal}</h5>
                      </Col>
                    </Row>
                  </div>
                ))}
              </CardBody>
            </Card>
          </Collapse>
        </Row>
      </div>
    );
  }
}

export default OrderItems;
