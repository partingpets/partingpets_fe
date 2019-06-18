import React from 'react';
import { Table } from 'reactstrap';
import productShape from '../../helpers/productProps/productShape';
import './PartnerItemTable.scss';

// editEvent = (e) => {
//   e.preventDefault();
//   const { passProductToEdit, product } = this.props;
//   passProductToEdit(product.id);
// };

// deleteEvent = (e) => {
//   e.preventDefault();
//   const { deleteSingleProduct, product } = this.props;
//   deleteSingleProduct(product.id);
// };

class PartnerItemTable extends React.Component {
  static propTypes = {
    product: productShape,
    // index: this.propTypes.number,
  };

  render() {
    const { product, index } = this.props;
    const rowNumber = (index + 1).toString();
    return (
      <tr className="PartnerItem">
        <th scope="row">{rowNumber}</th>
        <td>
          <img className="partner-item-img" src={product.imageUrl} alt="product" />
        </td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.unitPrice}</td>
        <td>
          <button className="pencil" onClick={this.editEvent}>
            <i className="lnr lnr-pencil pencil" />
          </button>
        </td>
        <td>
          <button className="trash" onClick={this.deleteEvent}>
            <i class="lnr lnr-trash trash" />
          </button>
        </td>
      </tr>
    );
  }
}

export default PartnerItemTable;
