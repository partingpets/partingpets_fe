import PropTypes from 'prop-types';
import React from 'react';
import productShape from '../../helpers/productProps/productShape';
import './PartnerItemTable.scss';

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

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteProduct, product } = this.props;
    deleteProduct(product.id);
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
          <i className="lnr lnr-pencil pencil" id={product.id} onClick={this.onEditForm} />
        </td>
        <td>
          <i className="lnr lnr-trash trash" id={product.id} onClick={this.deleteEvent} />
        </td>
      </tr>
    );
  }
}

export default PartnerItemTable;
