import PropTypes from 'prop-types';
import React from 'react';
import productShape from '../../helpers/productProps/productShape';
import './PartnerItemTable.scss';

// deleteEvent = (e) => {
//   e.preventDefault();
//   const { deleteSingleProduct, product } = this.props;
//   deleteSingleProduct(product.id);
// };

class PartnerItemTable extends React.Component {
  state = {
    showModal: false,
  };

  static propTypes = {
    product: productShape,
    index: PropTypes.number,
    editForm: PropTypes.func,
  };

  showModal = () => {
    this.setState({
      showModal: true,
    });
  };

  onEditForm = (e) => {
    const productId = e.target.id;
    const { editForm } = this.props;
    editForm(productId);
  };

  render() {
    const { product, index } = this.props;
    const rowNumber = (index + 1).toString();
    return (
      <tr className="partner-item ml-auto">
        <th className="header" scope="row">
          {rowNumber}
        </th>
        <td>
          <img className="partner-item-img" src={product.imageUrl} alt="product" />
        </td>
        <td className="name">{product.name}</td>
        <td className="description">{product.description}</td>
        <td className="unit-price">{product.unitPrice}</td>
        <td>
          <button className="pencil" onClick={this.onEditForm}>
            <i className="lnr lnr-pencil pencil" />
          </button>
        </td>
        <td>
          <button className="trash" onClick={this.deleteEvent}>
            <i className="lnr lnr-trash trash" />
          </button>
        </td>
      </tr>
    );
  }
}

export default PartnerItemTable;
