import React from 'react';
import AddProductModal from '../../AddProductModal/AddProductModal';
import productRequests from '../../../helpers/data/productRequests';
import PrintProductCard from '../PrintProductCard/PrintProductCard';
import PartnerItemTable from '../../PartnerItemTable/PartnerItemTable';
import './Partners.scss';

class Partners extends React.Component {
  partnerMounted = false;

  state = {
    products: [],
    showModal: false,
    currentUserObj: {},
    userObject: {},
    PartnerItemTable: [],
  };

  // Get All Products By Partner ID //

  getProducts = () => {
    const { userObject } = this.props;
    productRequests
      .getAllProductsByPartnerId(userObject.partnerId)
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
    });
  };

  productFormSubmitEvent = (newProduct) => {
    productRequests.createProduct(newProduct).then((result) => {
      this.getProducts();
      this.setState({
        showModal: false,
      });
    });
  };

  // deleteSingleProduct = (productId) => {
  //   productRequests.deleteProduct(productId).then(() => {
  //     this.getproducts();
  //   });
  // };

  // newProductView = () => {
  //   this.props.history.push('/products/new');
  // };

  // onSelect = (productId) => {
  //   this.props.history.push(`/products/${productId}`);
  // };

  // passProductToEdit = (productId) => {
  //   this.setState({ productEditId: productId });
  //   this.props.history.push(`/products/${productId}/edit`);
  // };

  render() {
    const { userObject } = this.props;
    const { products } = this.state;

    // const printProduct = products.map((product, index) => (
    //   <PrintProductCard key={product.id} index={index} product={product} onSelect={this.onSelect} />
    // ));

    const printProduct = products.map((product, index) => (
      <PartnerItemTable key={product.id} index={index} product={product} onSelect={this.onSelect} />
    ));

    return (
      <div className="partnerItems mx-auto animated bounceInLeft w-100">
        <div className="productWrap">
          <button className="addProductBtn" onClick={this.showModal}>
            <i className="far fa-plus-square" />
            ADD NEW ITEM
          </button>
        </div>

        <AddProductModal
          showModal={this.state.showModal}
          onSubmit={this.productFormSubmitEvent}
          modalCloseEvent={this.modalCloseEvent}
          userObject={userObject}
        />
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>{printProduct}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Partners;
