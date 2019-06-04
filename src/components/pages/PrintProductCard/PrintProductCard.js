import React from 'react';
import PropTypes from 'prop-types';
import productShape from '../../../helpers/productProps/productShape';
import authRequests from '../../../helpers/data/authRequests';

import './PrintProductCard.scss';

class PrintProductCard extends React.Component {
  static propTypes = {
    product: productShape.productShape,
     deleteSingleProduct: PropTypes.func,
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passProductToEdit, product } = this.props;
    passProductToEdit(product.id);
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleProduct, product } = this.props;
    deleteSingleProduct(product.id);
  }

  productClick = () => {
    const { product, onSelect } = this.props;
    onSelect(product.id);
  }

  render() {
    const { product } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (product.uid === uid) {
        return (
          <div>
            <span className="col">
              <button className="pencil" onClick={this.editEvent}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </span>
            <span className="col">
              <button className="trash" onClick={this.deleteEvent}>
                <i class="fas fa-trash"></i>
              </button>
            </span>
          </div>
        );
      }
      return <span className="col-2"></span>;
    };
    return (
      <div className="productCard card2 col-3">
        <img className="productImage" src="http://intuitiveconsumer.com/blog/wp-content/uploads/2015/05/new-product.png" alt={product.name} />
        <h3 className="product-card-header">{product.name}</h3>
        <div className="card-body" onClick={this.productClick}>
          <h4 className="card-text">{product.description}</h4>
          <h5 className="card-text">$ {product.unitPrice}</h5>
          <h6 className="card-text"><i className="fas fa-cart-plus"></i>
            {product.isOnSale}</h6>
        </div>
        {makeButtons()}
      </div>
    );
  }
}

export default PrintProductCard;