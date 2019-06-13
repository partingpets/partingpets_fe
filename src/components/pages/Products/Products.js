import React from 'react';
import SearchField from 'react-search-field';
import PrintProductCard from '../PrintProductCard/PrintProductCard';
import productRequests from '../../../helpers/data/productRequests';
import userRequests from '../../../helpers/data/userRequests';
import AddProductModal from '../../AddProductModal/AddProductModal';
import authRequests from '../../../helpers/data/authRequests';
import './Products.scss';

class Products extends React.Component {
  state = {
    products: [],
    showModal: false,
    filteredProducts: [],
    currentUserObj: {},
  };

  getProducts = () => {
    productRequests
      .getAllProducts()
      .then((products) => {
        this.setState({ products });
        this.setState({ filteredProducts: products });
      })
      .catch((err) => {
        console.error('error with products GET', err);
      });
  };

  componentDidMount() {
    const currentUid = authRequests.getCurrentUid();
    this.getProducts();
    userRequests.getUserByFbId(currentUid).then((response) => {
      this.setState({
        currentUserObj: response,
      });
    });
  }

  deleteSingleProduct = (productId) => {
    productRequests.deleteProduct(productId).then(() => {
      this.getproducts();
    });
  };

  newProductView = () => {
    this.props.history.push('/products/new');
  };

  onSelect = (productId) => {
    this.props.history.push(`/products/${productId}`);
  };

  passProductToEdit = (productId) => {
    this.setState({ productEditId: productId });
    this.props.history.push(`/products/${productId}/edit`);
  };

  onChange = (value, event) => {
    const { products } = this.state;
    const filteredProducts = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredProducts: products });
    } else {
      products.forEach((product) => {
        if (
          product.name.toLowerCase().includes(value.toLowerCase())
          || product.productCategory.toLowerCase().includes(value.toLowerCase())
          || product.description.toLowerCase().includes(value.toLowerCase())
        ) {
          filteredProducts.push(product);
        }
        this.setState({ filteredProducts });
      });
    }
  };

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
    productRequests.createProduct(newProduct);
    this.getProducts();
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { filteredProducts } = this.state;
    const { userObject } = this.props;

    const printProduct = filteredProducts.map(product => (
      <PrintProductCard key={product.id} product={product} onSelect={this.onSelect} />
    ));

    return (
      <div className="products mx-auto animated bounceInLeft w-100">
        <div className="productWrap">
          <SearchField
            placeholder="Search Products By Name or Category"
            onChange={this.onChange}
            searchText=""
            classNames="productSearch"
          />
          <button className="addProductBtn" id="addProduct" onClick={this.showModal}>
            <i className="far fa-plus-square" />
            ADD PRODUCT
          </button>
        </div>

        <AddProductModal
          showModal={this.state.showModal}
          onSubmit={this.productFormSubmitEvent}
          modalCloseEvent={this.modalCloseEvent}
          userObject={userObject}
        />

        <div className="productWindow">
          <div className="row justify-content-center">{printProduct}</div>
        </div>
      </div>
    );
  }
}

export default Products;
