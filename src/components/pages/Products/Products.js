import React from 'react';
import SearchField from 'react-search-field';
//import cluesData from '../../../helpers/data/cluesData';
//import authRequests from '../../../helpers/data/authRequests';
import PrintProductCard from '../PrintProductCard/PrintProductCard';
import productRequests from '../../../helpers/data/productRequests';
import userRequests from '../../../helpers/data/userRequests';

import './Products.scss';
import AddProductModal from '../../AddProductModal/AddProductModal';
import authRequests from '../../../helpers/data/authRequests';

class Products extends React.Component {
  state = {
    products: [],
    showModal: false,
    isEditing: false,
    productEditId: '-1',
    passProductToEdit: {},
    filteredProducts: [],
    currentUserObj: {},
  }

  getProducts = () => {
    //const uid = authRequests.getCurrentUid();
    productRequests.getAllProducts()
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
      })
    })

  }

  deleteSingleProduct = (productId) => {
    productRequests.deleteProduct(productId)
      .then(() => {
        this.getproducts();
      });
  }


  newProductView = () => {
    this.props.history.push('/products/new');
  }

  onSelect = (productId) => {
    this.props.history.push(`/products/${productId}`);
  }

  passProductToEdit = (productId) => {
    this.setState({ productEditId: productId });
    this.props.history.push(`/products/${productId}/edit`);
  }

  onChange = (value, event) => {
    const { products } = this.state;
    const filteredProducts = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredProducts: products });
    } else {
      products.forEach((product) => {
        if (product.name.toLowerCase().includes(value.toLowerCase())
          || product.productCategory.toLowerCase().includes(value.toLowerCase())
          || product.description.toLowerCase().includes(value.toLowerCase())) {
          filteredProducts.push(product);
        }
        this.setState({ filteredProducts });
      });
    }
  }

  formSubmitEvent = (newProduct) => {
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
        .catch(error => console.error('There Was An Error Editing Your Parting Pets Product.', error));
    } else {
      productRequests
        .newProduct(newProduct)
        .then((res) => {
          this.getProducts();
          this.setState({ showModal: false });
        })
        .catch(error => console.error('There Was An Error Creating Your Parting Pets Product.', error));
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
      passProductToEdit: {},
      showModal: false,
    });
  };

  render() {
    const {
      products, isEditing, passProductToEdit, filteredProducts,
    } = this.state;

    const printProduct = filteredProducts.map(product => (
      <PrintProductCard
        key={product.id}
        product={product}
        deleteSingleProduct={this.deleteSingleProduct}
        passProductToEdit={this.passProductToEdit}
        onSelect={this.onSelect}
      />
    ));

    const editFormProps = {
      passProductToEdit,
    };

    if (!isEditing) {
      editFormProps.disabled = true;
    }

    return (
      <div className='products mx-auto animated bounceInLeft w-100'>
        <div className='productWrap'>
          <SearchField
            placeholder="Search Products By Name or Category"
            onChange={this.onChange}
            searchText=""
            classNames="productSearch"
          />
          <button className="addProductBtn" id="addProduct" onClick={this.showModal}><i class="far fa-plus-square"></i>ADD PRODUCT</button>
        </div>

        <AddProductModal
          showModal={this.state.showModal}
          onSubmit={this.formSubmitEvent}
          userObject={this.currentUserObj}
          isEditing={isEditing}
          {...editFormProps}
          modalCloseEvent={this.modalCloseEvent}
        />

        <div className="productWindow">
          <div className="row justify-content-center">{printProduct}</div>
        </div>
      </div>
    );
  }
}

export default Products;

