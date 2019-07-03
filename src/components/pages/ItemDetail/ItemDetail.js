import React from 'react';
import productRequests from '../../../helpers/data/productRequests';
import cartRequests from '../../../helpers/data/cartRequests';
import './ItemDetail.scss';

class ItemDetail extends React.Component {
  state = {
    singleItem: {},
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
      .addUserCartItem(newCartItem)
      .then((result) => {
        cartRequests.getUserCartById(userId).then((cartResult) => {
          const filteredResults = cartResult.filter(item => item.isDeleted === false);
          updateCartBadge(filteredResults.length);
          this.backToItemsView();
        });
      })
      .catch(error => console.error('An error occured adding item to cart', error));
  };

  render() {
    const { singleItem } = this.state;

    return (
      <div className="item-detail mx-auto w-50">
        <div className="col-9 mt-3 mx-auto">
          <img className="detailImage" src={singleItem.imageUrl} alt={singleItem.name} />
          <h4 className="product-card-header">{singleItem.name}</h4>
          <div className="card-body">
            <h6 className="card-text">{singleItem.description}</h6>
            <h5 className="card-text">$ {singleItem.unitPrice}</h5>
            <h5 className="card-text">{/* <i className="lnr lnr-cart" /> */}</h5>
            <div className="backToStore">
              <button className="backToStore" data-productid={singleItem.id} onClick={this.addToCartFn}>
                <span className="lnr lnr-cart" />
                Add to Cart
              </button>
            </div>
            {/* <div className="backToStore">
              <button className="backToStore" onClick={this.backToItemsView}>
                <span className="spot">
                  <span className="lnr lnr-arrow-left-circle" />
                  BACK TO STORE
                </span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetail;
