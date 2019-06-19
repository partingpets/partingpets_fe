import React from 'react';
import PropTypes from 'prop-types';
import productShape from '../../../helpers/productProps/productShape';

import './PrintProductCard.scss';

class PrintProductCard extends React.Component {
  static propTypes = {
    product: productShape.productShape,
    deleteSingleProduct: PropTypes.func,
    userObject: PropTypes.object,
  };

  productClick = () => {
    const { product, onSelect } = this.props;
    onSelect(product.id);
  };

  render() {
    const { product } = this.props;

    return (
      <div className="productCard card2 col-2">
        <img className="productImage" src={product.imageUrl} alt={product.name} />
        <h4 className="product-card-header">{product.name}</h4>
        <div className="card-body" onClick={this.productClick}>
          <h6 className="card-text">{product.description}</h6>
          <h5 className="card-text">$ {product.unitPrice}</h5>
          <h5 className="card-text">
            <i className="lnr lnr-cart" />
            {product.isOnSale}
          </h5>
        </div>
      </div>
    );
  }
}

export default PrintProductCard;
