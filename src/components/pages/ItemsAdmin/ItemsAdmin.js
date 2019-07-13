import React from 'react';
import AddProductModal from '../../AddProductModal/AddProductModal';
import productRequests from '../../../helpers/data/productRequests';
import PartnerItemTable from '../../PartnerItemTable/PartnerItemTable';
import './ItemsAdmin.scss';

class ItemsAdmin extends React.Component {
  partnerMounted = false;

  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  };

  state = {
    products: [],
    showModal: false,
    isEditing: false,
    productEditId: '-1',
    productToEdit: {},
    currentUserObj: {},
    userObject: {},
    PartnerItemTable: [],
  };

  // Get All Products //

  getProducts = () => {
    // const { userObject } = this.props;
    productRequests
      .getAllProducts()
      .then((products) => {
        this.setState({ products });
      })
      .catch((err) => {
        console.error('error with products GET', err);
      });
  };

  componentDidMount() {
    this.partnerMounted = !!this.props.userObject.id;
    if (this.partnerMounted) {
      this.getProducts();
    }
  }

  componentWillUnmount() {
    this.partnerMounted = false;
  }

  // Add Product Modal Function //
  showModal = (e) => {
    this.setState({
      hidden: !this.state.hidden,
      showModal: true,
    });
  };

  modalCloseEvent = () => {
    this.setState({
      hidden: !this.state.hidden,
      showModal: false,
      productToEdit: {},
      isEditing: false,
    });
  };

  productFormSubmitEvent = (newProduct) => {
    const { isEditing, productEditId } = this.state;
    if (isEditing) {
      productRequests
        .editProduct(productEditId, newProduct)
        .then(() => {
          this.getProducts();
          this.setState({
            showModal: false,
            isEditing: false,
            productEditId: '-1',
          });
        })
        .catch(error => console.error('There Was An Error Editing Your Parting Pets Item', error));
    } else {
      productRequests
        .createProduct(newProduct)
        .then((result) => {
          this.getProducts();
          this.setState({ showModal: false });
        })
        .catch(error => console.error('There Was An Error Creating Your New Parting Pets Item'));
    }
  };

  deleteProduct = (productId) => {
    productRequests
      .deleteProduct(productId)
      .then(() => {
        this.getProducts();
      })
      .catch(error => console.error('error with deleting this parting pets item.', error));
  };

  editProduct = (productId) => {
    productRequests
      .getSingleProduct(productId)
      .then((product) => {
        this.setState({
          isEditing: true,
          productEditId: productId,
          productToEdit: product,
        });
        this.showModal();
      })
      .catch(error => console.error('There Was An Issue Getting Your Parting Pets Item To Update', error));
  };

  render() {
    const { userObject } = this.props;
    const { products, isEditing, productToEdit } = this.state;

    const printProduct = products.map((product, index) => (
      <PartnerItemTable
        key={product.id}
        index={index}
        product={product}
        onSelect={this.onSelect}
        editForm={this.editProduct}
        deleteProduct={this.deleteProduct}
      />
    ));

    const editFormProps = { productToEdit };

    if (!isEditing) {
      editFormProps.disabled = true;
    }

    return (
      <div className="partnerItems mx-auto animated fadeIn w-100">
        <div className="productWrap">
          <button className="addProductBtn" onClick={this.showModal}>
            <i className="far fa-plus-square" />
            ADD NEW ITEM
          </button>
        </div>

        <div className="back-button">
          <button className="backBtn" id="admin" onClick={this.changeView}>
            <i className="lnr lnr-arrow-left-circle" />
            BACK TO ADMIN PORTAL
          </button>
        </div>

        <AddProductModal
          showModal={this.state.showModal}
          onSubmit={this.productFormSubmitEvent}
          isEditing={isEditing}
          {...editFormProps}
          modalCloseEvent={this.modalCloseEvent}
          userObject={userObject}
        />
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr className="header-table">
                <th scope="col">#</th>
                <th scope="col">IMAGE</th>
                <th scope="col">NAME</th>
                <th scope="col">DESCRIPTION</th>
                <th scope="col">PRICE</th>
                <th scope="col">EDIT</th>
                <th scope="col">DELETE</th>
              </tr>
            </thead>
            <tbody>{printProduct}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ItemsAdmin;
