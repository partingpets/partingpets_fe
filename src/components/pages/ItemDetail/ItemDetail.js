import React from 'react';
import productRequests from '../../../helpers/data/productRequests';
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
            <h5 className="card-text">
              <i className="lnr lnr-cart" />
            </h5>
            <div className="backToStore">
              <button className="backToStore" onClick={this.backToItemsView}>
                <span className="spot">
                  <span class="lnr lnr-arrow-left-circle" />BACK TO STORE
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetail;