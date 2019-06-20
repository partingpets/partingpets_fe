import PropTypes from 'prop-types';
import React from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import productRequests from '../../helpers/data/productRequests';
import './AddProductModal.scss';

import pets from '../AppNavbar/images/pets_small.png';

const defaultProduct = {
  name: '',
  unitPrice: '',
  imageUrl: '',
  categoryId: 0,
  isOnSale: 'False',
  description: '',
  partnerId: null,
};

class AddProductModal extends React.Component {
  state = {
    modal: false,
    backdrop: 'static',
    newProduct: defaultProduct,
    productCategories: [],
    descriptionMaxLength: 250,
    descriptionCharCount: 250,
  };

  static propTypes = {
    showModal: PropTypes.bool,
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    productToEdit: PropTypes.object,
    modalCloseEvent: PropTypes.func,
  };

  toggle() {
    this.setState({
      modal: !this.state,
    });
  }

  modalClosed() {
    const { modalCloseEvent } = this.props;
    modalCloseEvent();
    this.setState({
      newProduct: defaultProduct,
      productToEdit: defaultProduct,
    });
  }

  componentDidMount() {
    productRequests
      .getAllProductCategories()
      .then((result) => {
        this.setState({
          productCategories: result,
        });
      })
      .catch((err) => {
        console.error('error with getting Product categories', err);
      });
  }

  componentWillReceiveProps(props) {
    if (props.isEditing) {
      this.setState({
        newProduct: props.productToEdit,
      });
    }
    this.setState({
      modal: props.showModal,
    });
  }

  formFieldStringState = (name, event) => {
    event.preventDefault();
    const tempProduct = { ...this.state.newProduct };
    tempProduct[name] = event.target.value;
    this.setState({
      newProduct: tempProduct,
    });
  };

  formFieldNumberState = (name, event) => {
    const tempProduct = { ...this.state.newProduct };
    tempProduct[name] = event.target.value * 1;
    this.setState({
      newProduct: tempProduct,
    });
  };

  formFieldCategoryChange = (name, name2, event) => {
    const tempProduct = { ...this.state.newProduct };
    name2 = event.target.value;
    tempProduct[name] = event.target.selectedOptions[0].dataset.id;
    this.setState({
      newProduct: tempProduct,
      productCategoryName: name2,
    });
  };

  nameChange = event => this.formFieldStringState('name', event);

  imageUrlChange = event => this.formFieldStringState('imageUrl', event);

  priceChange = event => this.formFieldStringState('unitPrice', event);

  onSaleChange = event => this.formFieldStringState('onSale', event);

  productCategoryChange = (event) => {
    this.formFieldCategoryChange('categoryId', 'categoryName', event);
  };

  descriptionChange = (event) => {
    this.formFieldStringState('description', event);
    this.setState({
      descriptionCharCount: this.state.descriptionMaxLength - event.target.textLength,
    });
  };

  formSubmit = (event) => {
    event.preventDefault();
    const { onSubmit, userObject } = this.props;
    const myNewProduct = { ...this.state.newProduct };
    myNewProduct.partnerId = userObject.partnerId;
    onSubmit(myNewProduct);
    this.setState({
      newProduct: defaultProduct,
    });
  };

  render() {
    const {
      descriptionCharCount, descriptionMaxLength, newProduct, productCategories,
    } = this.state;
    return (
      <div className="AddProductModal">
        <Modal
          className="form-modal"
          isOpen={this.state.modal}
          toggle={e => this.toggle(e)}
          onClosed={e => this.modalClosed(e)}
          centered
          backdrop={this.state.backdrop}
          size="lg"
        >
          <ModalHeader toggle={e => this.toggle(e)}>
            <img src={pets} className="petsModalLogo" alt="pets_logo" />
            {this.props.isEditing ? 'EDIT YOUR PARTING PETS PRODUCT' : 'ADD NEW PARTING PETS PRODUCT'}
          </ModalHeader>
          <ModalBody>
            <Form>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="name">Product Name</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter The Name Of Your Product"
                      onChange={this.nameChange}
                      value={newProduct.name}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="imageUrl">Image URL</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="imageUrl"
                      id="imageUrl"
                      placeholder="Enter The Image URL Of Your Product"
                      onChange={this.imageUrlChange}
                      value={newProduct.imageUrl}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={5}>
                  <FormGroup>
                    <Label for="price">Product Price</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="price"
                      id="price"
                      placeholder="$29.99"
                      onChange={this.priceChange}
                      value={newProduct.price}
                    />
                  </FormGroup>
                </Col>

                <Col md={5}>
                  <FormGroup>
                    <Label for="productCategory">Product Category</Label>
                    <Input
                      className="form-input"
                      type="select"
                      name="productCategory"
                      id="productCategory"
                      placeholder="Pick A Category"
                      onChange={this.productCategoryChange}
                      value={newProduct.productCategoryName}
                    >
                      {productCategories.map((cat, i) => (
                        <option key={i} data-id={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="onSale">On Sale?</Label>
                    <Input
                      className="form-input"
                      type="select"
                      name="onSale"
                      id="onSale"
                      placeholder=""
                      onChange={this.onSaleChange}
                      value={newProduct.onSale}
                    >
                      <option key="1">No</option>
                      <option key="2">Yes</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  className="form-input textArea"
                  type="textarea"
                  name="text"
                  id="description"
                  rows="3"
                  placeholder="Tell Us About Your Product or Service"
                  maxLength={descriptionMaxLength}
                  onChange={this.descriptionChange}
                  value={newProduct.description}
                />
                <Label className="float-right" for="char-count">
                  Remaining: {descriptionCharCount}/{descriptionMaxLength}
                </Label>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.formSubmit}>
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={e => this.toggle(e)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddProductModal;
