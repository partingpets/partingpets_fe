import React from 'react';
import './PartnerItemTable.scss';

// editEvent = (e) => {
//   e.preventDefault();
//   const { productToEdit, product } = this.props;
//   productToEdit(product.id);
// };

// deleteEvent = (e) => {
//   e.preventDefault();
//   const { deleteSingleProduct, product } = this.props;
//   deleteSingleProduct(product.id);
// };

class PartnerItemTable extends React.Component {
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
          <button className="pencil" onClick={this.editEvent}>
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
