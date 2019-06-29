import PropTypes from 'prop-types';
import React from 'react';
import partnerShape from '../../helpers/partnerProps/partnerShape';
import './ManagePartnersTable.scss';

class ManagePartnersTable extends React.Component {
  state = {
    showModal: false,
  };

  static propTypes = {
    partner: partnerShape,
    index: PropTypes.number,
    editForm: PropTypes.func,
  };

  showModal = () => {
    this.setState({
      showModal: true,
    });
  };

  onEditForm = (e) => {
    const partnerId = e.target.id;
    const { editForm } = this.props;
    editForm(partnerId);
  };

  deleteEvent = (e) => {
    e.preventDefault();
    const { deletePartner, partner } = this.props;
    deletePartner(partner.id);
  };

  render() {
    const { partner, index } = this.props;
    const rowNumber = (index + 1).toString();
    return (
      <tr className="partner-item ml-auto">
        <th className="header" scope="row">
          {rowNumber}
        </th>
        <td className="name">{partner.name}</td>
        <td className="description">{partner.description}</td>
        <td className="street">{partner.street}</td>
        <td className="city">{partner.city}</td>
        <td className="state">{partner.state}</td>
        <td className="zip-code">{partner.zipcode}</td>
        <td>
          <i className="lnr lnr-pencil pencil" id={partner.id} onClick={this.onEditForm} />
        </td>
        <td>
          <i className="lnr lnr-trash trash" id={partner.id} onClick={this.deleteEvent} />
        </td>
      </tr>
    );
  }
}

export default ManagePartnersTable;
