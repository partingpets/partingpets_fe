import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import cartRequests from '../../../helpers/data/cartRequests';
import CartItem from '../../CartItem/CartItem';
import './ShoppingCart.scss';

class ShoppingCart extends React.Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    const { userObject } = this.props;
    if (userObject.id) {
      cartRequests.getUserCartById(userObject.id).then((results) => {
        this.setState({ cart: results });
      });
    }
  }

  render() {
    const { cart } = this.state;

    const cartItemComponent = cartArr => cartArr.map((cartItem, index) => <CartItem key={index} item={cartItem} />);
    return (
      <div className="shoppingCart">
        <Container className="cart-container">
          <Row className="cart-header-row">
            <Col>
              <h1>Here's what's in your Shopping cart</h1>
              <h5>Get free shipping on all orders.</h5>
            </Col>
          </Row>
          {cartItemComponent(cart)}
        </Container>
      </div>
    );
  }
}

export default ShoppingCart;
