import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import productRequests from '../../../helpers/data/productRequests';
import cartRequests from '../../../helpers/data/cartRequests';
import './ItemDetail.scss';

class ItemDetail extends React.Component {
  state = {
    singleItem: {},
    showAlert: false,
  };

  backToItemsView = (e) => {
    this.props.history.push('/store');
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    productRequests.getSingleProductClick(id).then((singleItem) => {
      this.setState({ singleItem });
    });
  }

  addToCartFn = (e) => {
    e.preventDefault();
    const userId = this.props.userObject.id;
    const newCartItem = {};
    const productId = e.target.attributes['data-productid'].nodeValue;
    const { updateCartBadge } = this.props;
    newCartItem.userId = userId;
    newCartItem.productId = productId;
    newCartItem.quantity = 1;
    cartRequests
      .getUserCartById(userId)
      .then((currentCartItems) => {
        if (currentCartItems.find(element => element.productId === parseInt(productId, 10))) {
          this.setState({
            showAlert: true,
          });
        } else {
          cartRequests.addUserCartItem(newCartItem).then((result) => {
            cartRequests.getUserCartById(userId).then((cartResult) => {
              const filteredResults = cartResult.filter(item => item.isDeleted === false);
              updateCartBadge(filteredResults.length);
              this.backToItemsView();
            });
          });
        }
      })
      .catch(error => console.error('An error occured adding item to cart', error));
  };

  render() {
    const { singleItem, showAlert } = this.state;

    return (
      <div className="item-detail mx-auto w-50">
        <SweetAlert
          show={showAlert}
          warning
          title="Item is already in your cart"
          onConfirm={() => {
            this.setState({ showAlert: false });
          }}
        />
        <div className="col-9 mt-3 mx-auto">
          <img className="detailImage" src={singleItem.imageUrl} alt={singleItem.name} />
          <h2 className="product-card-header">{singleItem.name}</h2>
          <div className="card-body">
            <h5 className="card-text">{singleItem.description}</h5>
            <h3 className="card-text">$ {singleItem.unitPrice}</h3>
            <h5 className="card-text">{/* <i className="lnr lnr-cart" /> */}</h5>
            <div>
              <button className="backToStore" data-productid={singleItem.id} onClick={this.addToCartFn}>
                <span className="lnr lnr-cart cart" />
                ADD TO CART
              </button>
              <button className="backToStore" onClick={this.backToItemsView}>
                <span className="lnr lnr-arrow-left-circle back" />
                BACK TO STORE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetail;
