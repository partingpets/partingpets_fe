import React from 'react';
import {
  Container, Row, Col, Button,
} from 'reactstrap';
import cartRequests from '../../../helpers/data/cartRequests';
import CartItem from '../../CartItem/CartItem';
import './ShoppingCart.scss';

class ShoppingCart extends React.Component {
  state = {
    cart: [],
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };

  componentDidMount() {
    const { userObject } = this.props;
    if (userObject.id) {
      cartRequests.getUserCartById(userObject.id).then((results) => {
        this.setState({ cart: results });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cart !== this.state.cart) {
      let tempSubTotal = 0;
      let tempTax = 0;
      let tempTotal = 0;
      this.state.cart.forEach((item) => {
        tempSubTotal += item.quantity * item.unitPrice;
      });
      tempTax = parseFloat((tempSubTotal * 0.095).toFixed(2));
      tempTotal = tempSubTotal + tempTax;
      this.setState({
        cartSubTotal: tempSubTotal,
        cartTax: tempTax,
        cartTotal: tempTotal,
      });
    }
  }

  // https://www.robinwieruch.de/react-state-array-add-update-remove/
  // Holy Balls was this much harder than I thought
  updateItemQuantity = (key, quantity) => {
    const itemIndex = this.state.cart.findIndex(item => item.id === key);
    this.setState((state) => {
      const cart = state.cart.map((item, j) => {
        if (j === itemIndex) {
          item.quantity = quantity;
          return item;
        }
        return item;
      });
      return {
        cart,
      };
    });
  };

  render() {
    const {
      cart, cartSubTotal, cartTotal, cartTax,
    } = this.state;

    const cartItemComponent = cartArr => cartArr.map((cartItem, index) => (
        <CartItem key={cartItem.id} item={cartItem} itemQuantityFn={this.updateItemQuantity} />
    ));
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
          <div>
            <hr />
            <Row>
              <Col>
                <h5>Subtotal: ${cartSubTotal.toFixed(2)}</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Shipping: FREE</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Tax: ${cartTax}</h5>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <h5>Total: ${cartTotal.toFixed(2)}</h5>
              </Col>
            </Row>
          </div>
          <div>
            <Button color="primary">Check Out</Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default ShoppingCart;
