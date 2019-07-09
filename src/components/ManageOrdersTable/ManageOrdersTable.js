import PropTypes from 'prop-types';
import React from 'react';
import './ManageOrdersTable.scss';

class ManageOrdersTable extends React.Component {
  state = { order };

  static propTypes = {
    order,
    index: PropTypes.number,
  };

  render() {
    const { order, index } = this.props;
    const rowNumber = (index + 1).toString();
    return (
      <tr className="order-list">
        <th className="header" scope="row">
          {rowNumber}
        </th>
        <td className="id">{order.id}</td>
        <td className="lastName">{order.lastName}</td>
        <td className="firstName">{order.firstName}</td>
        <td className="total">{order.total}</td>
        <td className="purchaseDate">{order.purchaseDate}</td>
        <td className="icons">
          <i className="order-click lnr lnr-list trash" id={order.id} onClick={this.changeView} />
        </td>
      </tr>
    );
  }
}

export default ManageOrdersTable;
