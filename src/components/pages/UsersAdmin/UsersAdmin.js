import React from 'react';
import RegisterForm from '../../RegisterForm/RegisterForm';
import userRequests from '../../../helpers/data/userRequests';
import ManageUsersTable from '../../ManageUsersTable/ManageUsersTable';
import './UsersAdmin.scss';

class UsersAdmin extends React.Component {
  userMounted = false;

  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  };

  state = {
    users: [],
    showModal: false,
    isEditing: false,
    userEditId: '-1',
    userToEdit: {},
    currentUserObj: {},
    userObject: {},
    ManageUsersTable: [],
  };

  // Get All Users //

  getUsers = () => {
    // const { userObject } = this.props;
    userRequests
      .getAllUsers()
      // .getAllPartners(userObject.partnerId)
      .then((users) => {
        const sortedUsers = users.sort((a, b) => a.isDeleted - b.isDeleted);
        this.setState({ users: sortedUsers });
      })
      .catch((err) => {
        console.error('error with products GET', err);
      });
  };

  componentDidMount() {
    this.userMounted = !!this.props.userObject.id;
    if (this.userMounted) {
      this.getUsers();
    }
  }

  componentWillUnmount() {
    this.userMounted = false;
  }

  // Add Product Modal Function //
  showModal = (e) => {
    this.setState({
      hidden: !this.state.hidden,
      showModal: true,
    });
  };

  // Modal Close Event //
  modalCloseEvent = () => {
    this.setState({
      hidden: !this.state.hidden,
      showModal: false,
      userToEdit: {},
      isEditing: false,
    });
  };

  // User Form Submit Event //
  userFormSubmitEvent = (newUser) => {
    const { isEditing } = this.state;
    if (isEditing) {
      userRequests
        .updateUser(newUser)
        .then(() => {
          this.getUsers();
          this.setState({
            showModal: false,
            isEditing: false,
            userEditId: '-1',
          });
        })
        .catch(error => console.error('There Was An Error Editing Your Parting Pets Partner', error));
    } else {
      userRequests
        .createUser(newUser)
        .then((result) => {
          this.getUsers();
          this.setState({ showModal: false });
        })
        .catch(error => console.error('There Was An Error Creating Your New Parting Pets Partner'));
    }
  };

  // Delete User Request //
  deleteUser = (userId) => {
    userRequests
      .deleteUser(userId)
      .then(() => {
        this.getUsers();
      })
      .catch(error => console.error('error with deleting this parting pets partner.', error));
  };

  // Edit User Request //
  editUser = (id) => {
    userRequests
      .getSingleUser(id)
      .then((user) => {
        this.setState({
          isEditing: true,
          userEditId: user.id,
          userToEdit: user,
        });
        this.showModal();
      })
      .catch(error => console.error('There Was An Issue Getting Your Parting Pets Partner To Update', error));
  };

  render() {
    const { userObject } = this.props;
    const { users, isEditing, userToEdit } = this.state;

    const printUser = users.map((user, index) => (
      <ManageUsersTable
        key={user.id}
        index={index}
        user={user}
        onSelect={this.onSelect}
        editForm={this.editUser}
        deleteUser={this.deleteUser}
      />
    ));

    const editFormProps = { userToEdit };

    if (!isEditing) {
      editFormProps.disabled = true;
    }

    return (
      <div className="userItems mx-auto animated bounceInLeft w-100">
        <div className="productWrap">
          <button className="addUserBtn" onClick={this.showModal}>
            <i className="far fa-plus-square" />
            ADD NEW USER
          </button>
        </div>

        <div className="back-button">
          <button className="backBtn" id="admin" onClick={this.changeView}>
            <i className="lnr lnr-arrow-left-circle" />
            BACK TO ADMIN PORTAL
          </button>
        </div>
        <RegisterForm
          showModal={this.state.showModal}
          onSubmit={this.userFormSubmitEvent}
          isEditing={isEditing}
          {...editFormProps}
          modalCloseEvent={this.modalCloseEvent}
          userObject={userObject}
        />
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">LAST</th>
                <th scope="col">FIRST</th>
                <th scope="col">STREET</th>
                <th scope="col">CITY</th>
                <th scope="col">STATE</th>
                <th scope="col">ZIP</th>
                <th scope="col">EMAIL</th>
                <th scope="col">EDIT</th>
                <th scope="col">DELETE</th>
              </tr>
            </thead>
            <tbody>{printUser}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UsersAdmin;
