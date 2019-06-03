import React from 'react';
import SearchField from 'react-search-field';
//import cluesData from '../../../helpers/data/cluesData';
//import authRequests from '../../../helpers/data/authRequests';
import PrintProductCard from '../PrintProductCard/PrintProductCard';
import productRequests from '../../../helpers/data/productRequests';

import './Products.scss';

class Products extends React.Component {
  state = {
    products: [],
    filteredProducts: [],
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
    this.getProducts();
  }

  deleteSingleProduct = (productId) => {
    productsData.deleteProduct(productId)
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
    this.setState({ editId: productId });
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
          || product.style.toLowerCase().includes(value.toLowerCase())
          || product.location.toLowerCase().includes(value.toLowerCase())) {
          filteredProducts.push(product);
        }
        this.setState({ filteredProducts });
      });
    }
  }

  render() {
    const {
      filteredProducts,
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

    return (
      <div className='products mx-auto animated bounceInLeft w-100'>
        <h2>SEARCH FOR A PRODUCT</h2>
        <div className='productWrap'>
          <SearchField
            placeholder="Search Products By Name or Category"
            onChange={this.onChange}
            searchText=""
            classNames="productSearch"
          />
          <button className="addProductBtn" id="addProduct" onClick={this.newProductView}><i class="far fa-plus-square"></i>ADD PRODUCT</button>
        </div>
        <div className="row justify-content-center">{printProduct}</div>
      </div>
    );
  }
}

export default Products;

