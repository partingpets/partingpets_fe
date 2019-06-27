import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import './CartItem.scss';

class CartItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className="CartItem">
        <hr />
        <ul className="cart-ul">
          <li>
            <Row>
              <Col xs="2">
                <img
                  className="cart-image"
                  src="http://intuitiveconsumer.com/blog/wp-content/uploads/2015/05/new-product.png"
                  alt="cart"
                />
              </Col>
              <Col xs="10">
                <Row>
                  <Col xs="7">
                    <h4>{item.name}</h4>
                  </Col>
                  <Col xs="2">
                    <Button>Qty</Button>
                  </Col>
                  <Col xs="3">{item.unitPrice}</Col>
                </Row>
                <Row>
                  <Col xs="7">
                    <h6>{item.description}</h6>
                  </Col>
                </Row>
              </Col>
            </Row>
          </li>
        </ul>
      </div>
    );
  }
}

export default CartItem;
