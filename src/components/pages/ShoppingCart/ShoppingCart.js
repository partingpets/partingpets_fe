import React from 'react';
import {
  Container, Row, Col, Button,
} from 'reactstrap';
import cartRequests from '../../../helpers/data/cartRequests';
import orderRequests from '../../../helpers/data/orderRequests';
import CartItem from '../../CartItem/CartItem';
import './ShoppingCart.scss';

const defaultOrder = {
  userId: 0,
  paymentTypeId: 0, 
  orderLines: [],
};

class ShoppingCart extends React.Component {
  state = {
    cart: [],
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    newOrder: defaultOrder,
  };

  componentDidMount() {
    const { userObject } = this.props;
    const userId = userObject.id;
    if (userId) {
      this.getCart(userId);
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

  getCart = userId => new Promise((resolve, reject) => {
    cartRequests
      .getUserCartById(userId)
      .then((results) => {
        const filteredResults = results.filter(result => result.isDeleted === false);
        this.setState({ cart: filteredResults });
        resolve(filteredResults);
      })
      .then()
      .catch(error => console.log('Something broke here', error));
  });

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

  formSubmit = (e) => {
    e.preventDefault();
    const { userObject } = this.props;
    const tempCart = this.state.cart 
    const myNewOrder = { ...this.state.newOrder };
    myNewOrder.userId = userObject.id;
    myNewOrder.paymentTypeId = 4;
    tempCart.forEach((cartOrder) => {
      let tempObject = {};
      tempObject.quantity = cartOrder.quantity;
      tempObject.productID = cartOrder.id;
      myNewOrder.orderLines.push(tempObject);
    });
    orderRequests.createOrder(myNewOrder)
    .then((result) => {
      if(result.status === 201) {
        this.state.cart.forEach((item) => {
          this.deleteCartItem(item.cartId);
        })
      }
    });
    this.setState({
      newOrder: defaultOrder,
    });
  }

  deleteCartItem = (itemId) => {
    const { userObject, updateCartBadge } = this.props;
    cartRequests
      .deleteUserCartItemByItemId(userObject.id, itemId)
      .then((result) => {
        this.getCart(userObject.id).then((results) => {
          updateCartBadge(results.length);
        });
      })
      .catch(error => console.error('There was an error deleteing the selected cart item', error));
  };

  render() {
    const {
      cart, cartSubTotal, cartTotal, cartTax,
    } = this.state;

    const cartItemComponent = cartArr => cartArr.map((cartItem, index) => (
        <CartItem
          key={cartItem.productId}
          item={cartItem}
          itemQuantityFn={this.updateItemQuantity}
          deleteCartItemFn={this.deleteCartItem}
        />
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
          <div className="cart-totals">
            <hr />
            <Row>
              <Col xs="10">
                <h5>Subtotal:</h5>
              </Col>
              <Col xs="2">
                <h5>${cartSubTotal.toLocaleString()}</h5>
              </Col>
            </Row>
            <Row>
              <Col xs="10">
                <h5>Shipping:</h5>
              </Col>
              <Col xs="2">
                <h5>FREE</h5>
              </Col>
            </Row>
            <Row>
              <Col xs="10">
                <h5>Tax:</h5>
              </Col>
              <Col xs="2">
                <h5>${cartTax}</h5>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs="10">
                <h5>Total:</h5>
              </Col>
              <Col className="cart-totals-total" xs="2">
                <h5>${cartTotal.toLocaleString()}</h5>
              </Col>
            </Row>
          </div>
          <div className="cart-checkout-btn">
            <Button color="primary" onClick={this.formSubmit}>Check Out</Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default ShoppingCart;
