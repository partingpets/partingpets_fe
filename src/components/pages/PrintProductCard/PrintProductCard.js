import React from 'react';
import PropTypes from 'prop-types';
import clueShape from '../../helpers/propz/productShape';
import authRequests from '../../helpers/data/authRequests';

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
      <div className="card2 col-3">
        <h3 className="card-header">{product.name}</h3>
        <div className="card-body" onClick={this.productClick}>
          <img className="productImage" src={product.imageUrl} alt={product.name} />
          <h4 className="card-text">{product.location}</h4>
          <h5 className="card-text">{product.style}</h5>
          <h6 className="card-text"><i className="fas fa-comment-alt"></i>
            {product.notes}</h6>
        </div>
        {makeButtons()}
      </div>
    );
  }
}

export default PrintProductCard;