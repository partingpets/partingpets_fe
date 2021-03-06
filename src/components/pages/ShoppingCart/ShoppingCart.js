import React from 'react';
import {
  Container, Row, Col, Button,
} from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import cartRequests from '../../../helpers/data/cartRequests';
import orderRequests from '../../../helpers/data/orderRequests';
import CartItem from '../../CartItem/CartItem';
import Payments from '../../Payments/Payments';
import './ShoppingCart.scss';

import pets from '../../AppNavbar/images/pets_small.png';

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
    selectedPaymentId: -1,
    selectPaymentAlert: false,
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
      .catch(error => console.error('Something broke here', error));
  });

  // https://www.robinwieruch.de/react-state-array-add-update-remove/
  // Holy Balls was this much harder than I thought
  updateItemQuantity = (key, quantity) => {
    const itemIndex = this.state.cart.findIndex(item => item.productId === key);
    const { cartId, userId } = this.state.cart[itemIndex];
    const cartToUpdate = {
      cartId,
      quantity,
      userId,
    };
    cartRequests
      .editUserCartItem(cartToUpdate)
      .then(() => {
        this.setState((state) => {
          const cart = state.cart.map((item, j) => {
            if (j === itemIndex) {
              // eslint-disable-next-line no-param-reassign
              item.quantity = quantity;
              return item;
            }
            return item;
          });
          return {
            cart,
          };
        });
      })
      .catch(error => console.error('Error updating cart item'));
  };

  formSubmit = (e) => {
    e.preventDefault();
    const { userObject } = this.props;
    const tempCart = this.state.cart;
    const myNewOrder = { ...this.state.newOrder };
    myNewOrder.orderLines = [];
    myNewOrder.userId = userObject.id;
    myNewOrder.paymentTypeId = this.state.selectedPaymentId;
    tempCart.forEach((cartOrder) => {
      const tempObject = {};
      tempObject.productID = cartOrder.productId;
      tempObject.quantity = cartOrder.quantity;
      myNewOrder.orderLines.push(tempObject);
    });
    if (this.state.selectedPaymentId !== -1) {
      orderRequests.createOrder(myNewOrder).then((result) => {
        if (result.status === 201) {
          alert("We're sorry for your loss, but congratulations on your purchase!");
          this.state.cart.forEach((item) => {
            this.deleteCartItem(item.cartId);
          });
          this.setState({
            newOrder: defaultOrder,
          });
        }
      });
    } else this.setState({ selectPaymentAlert: true });
  };

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

  selectedPaymentId = (data) => {
    this.setState({ selectedPaymentId: data });
  };

  render() {
    const {
      cart, cartSubTotal, cartTotal, cartTax, selectPaymentAlert,
    } = this.state;

    const { userObject } = this.props;

    const cartItemComponent = cartArr => cartArr.map((cartItem, index) => (
        <CartItem
          key={cartItem.productId}
          item={cartItem}
          itemQuantityFn={this.updateItemQuantity}
          deleteCartItemFn={this.deleteCartItem}
        />
    ));
    // animated bounceInLeft
    return (
      <div className="shoppingCart">
        <SweetAlert
          show={selectPaymentAlert}
          warning
          title="Please select a payment method"
          onConfirm={() => {
            this.setState({ selectPaymentAlert: false });
          }}
        />
        <Container className="cart-container">
          <Row className="cart-header-row">
            <img src={pets} className="petsCartLogo" alt="pets_logo" />
            {cart.length === 0 ? (
              <Col>
                <h1>YOUR CART! IT EMPTY!</h1>
              </Col>
            ) : (
              <Col>
                <h1>Here's what's in your Parting Pets Shopping cart</h1>
                <h5>Get free shipping on all Parting Pets orders.</h5>
              </Col>
            )}
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
          <div>
            <Payments userId={userObject.id} paymentIdCallBack={this.selectedPaymentId} />
          </div>
          <hr />
          <div className="checkout cart-checkout-btn2">
            <Button className="cart-checkout-btn" onClick={this.formSubmit} disabled={cart.length === 0}>
              <span className="spot">
                <span className="right-arrow lnr lnr-arrow-right-circle" />
                CHECK OUT
              </span>
            </Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default ShoppingCart;
