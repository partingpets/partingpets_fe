import PropTypes from 'prop-types';
import React from 'react';
// import partnerShape from '../../helpers/partnerProps/partnerShape';
import './ManageUsersTable.scss';

class ManageUsersTable extends React.Component {
  state = {
    showModal: false,
  };

  static propTypes = {
    // partner: partnerShape,
    index: PropTypes.number,
    editForm: PropTypes.func,
  };

  showModal = () => {
    this.setState({
      showModal: true,
    });
  };

  onEditForm = (e) => {
    const userId = e.target.id;
    const { editForm } = this.props;
    editForm(userId);
  };

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteUser, userId } = this.props;
    deleteUser(userId);
  };

  render() {
    const { user, index } = this.props;
    const rowNumber = (index + 1).toString();
    return (
      <tr className={`user-item ${user.isDeleted ? 'deleted-user' : ''} ml-auto`}>
        <th className="header" scope="row">
          {rowNumber}
        </th>
        <td className="last-name">{user.lastName}</td>
        <td className="first-name">{user.firstName}</td>
        <td className="street">{user.street1}</td>
        <td className="city">{user.city}</td>
        <td className="state">{user.state}</td>
        <td className="zip-code">{user.zipcode}</td>
        <td className="email">{user.email}</td>
        <td>
          <i className="edit-user lnr lnr-pencil pencil" id={user.id} onClick={this.onEditForm} />
        </td>
        <td>
          <i className="delete-user lnr lnr-trash trash" id={user.id} onClick={this.deleteEvent} />
        </td>
      </tr>
    );
  }
}

export default ManageUsersTable;
