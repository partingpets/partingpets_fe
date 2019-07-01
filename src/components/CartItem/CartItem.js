import React from 'react';
import {
  Row, Col, Button, Input,
} from 'reactstrap';
import './CartItem.scss';

class CartItem extends React.Component {
  updateItemQuantity = (event) => {
    const newQty = event.target.value;
    const itemId = parseInt(event.target.id, 10);
    const { itemQuantityFn } = this.props;
    itemQuantityFn(itemId, newQty);
  };

  deleteCartItem = (event) => {
    event.preventDefault();
    const itemId = event.target.attributes['data-itemid'].nodeValue;
    const { deleteCartItemFn } = this.props;
    deleteCartItemFn(itemId);
  };

  render() {
    const { item } = this.props;
    return (
      <div className="CartItem">
        <hr />
        <ul className="cart-ul">
          <li>
            <Row>
              <Col xs="2">
                <img className="cart-image" src={item.imageUrl} alt="cart" />
              </Col>
              <Col xs="6">
                <Row>
                  <Col xs="7">
                    <h4>{item.name}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>{item.description}</h6>
                  </Col>
                </Row>
                <Row>
                  <Col className="cart-col-description cart-col" xs="7">
                    <Button
                      className="cart-del-button"
                      color="link"
                      data-itemid={item.cartId}
                      onClick={this.deleteCartItem}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col className="cart-col-quantity cart-col" xs="2">
                <Input
                  className="cart-qty-select"
                  type="select"
                  id={item.id}
                  value={item.quantity}
                  onChange={this.updateItemQuantity}
                >
                  {[...Array(5)].map((value, index) => (
                    <option key={index}>{index + 1}</option>
                  ))}
                </Input>
              </Col>
              <Col className="cart-col-unitPrice cart-col" xs="2">
                <h5>${(item.unitPrice * item.quantity).toLocaleString()}</h5>
              </Col>
            </Row>
          </li>
        </ul>
      </div>
    );
  }
}

export default CartItem;
