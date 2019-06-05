import PropTypes from 'prop-types';
import React from 'react';
//import { AsyncTypeahead } from 'react-bootstrap-typeahead';
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
import authRequests from '../../helpers/data/authRequests';
//import autoSuggest from '../../helpers/data/autoSuggest';
import productRequests from '../../helpers/data/productRequests';
import stateRequests from '../../helpers/data/stateRequests';
import titleRequests from '../../helpers/data/titleRequests';
import './AddProductModal.scss';

const defaultProduct = {
  name: '',
  price: '',
  productCategory: '',
  imgUrl: '',
  isOnSale: '',
  description: '',
  uid: '',
};

class AddProductModal extends React.Component {
  state = {
    modal: false,
    backdrop: 'static',
    newProduct: defaultProduct,
    descriptionMaxLength: 125,
    descriptionCharCount: 125,
    isLoading: false,
  };

  static propTypes = {
    showModal: PropTypes.bool,
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    productToEdit: PropTypes.object,
    modalCloseEvent: PropTypes.func,
  };

  dropToggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

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
    autoSuggest.getIpLocation().then((res) => {
      this.setState({
        position: {
          lat: res.data.latitude,
          lng: res.data.longitude,
        },
      });
    });
    stateRequests.getAllStates().then((usStates) => {
      this.setState({ usStates });
    });
    titleRequests.getAllTitles().then((titles) => {
      this.setState({ titles });
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
      newCampaign: tempCampaign,
    });
  };

  formFieldNumberState = (name, event) => {
    const tempProduct = { ...this.state.newProduct };
    tempProduct[name] = event.target.value * 1;
    this.setState({
      newProduct: tempProduct,
      newMarker: tempMarker,
    });
  };

//   formfieldTitleState = (name, url, event) => {
//     const tempCampaign = { ...this.state.newCampaign };
//     const tempMarker = { ...this.state.newMarker };
//     tempCampaign.title = event.target.value;
//     tempCampaign.imgUrl = url;
//     tempMarker.title = event.target.value;
//     tempMarker.imgUrl = url;
//     this.setState({
//       newCampaign: tempCampaign,
//       newMarker: tempMarker,
//     });
//   };


  nameChange = (event) => {
    const { titles } = this.state;
    const url = titles[event.target.selectedIndex].imgUrl;
    this.formfieldNameState('name', url, event);
  };

  priceChange = event => this.formFieldNumberState('price', event);

  productCategoryChange = event => this.formFieldStringState('productCategory', event);

  onSaleChange = event => this.formFieldStringState('onSale', event);

  descriptionChange = (event) => {
    this.formFieldStringState('description', event);
    this.setState({
      descriptionCharCount: this.state.descriptionMaxLength - event.target.textLength,
    });
  };


  formSubmit = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const myNewProduct = { ...this.state.newProduct };
    myNewProduct.uid = authRequests.getCurrentUid();
    onSubmit(myNewProduct);
    this.setState({
      newProduct: defaultProduct,
    });
  };

  render() {
    const {
      descriptionCharCount, descriptionMaxLength, newProduct, isLoading, suggestResults, usStates, titles,
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
            {this.props.isEditing ? 'Edit Product' : 'Add New Product'}
          </ModalHeader>
          <ModalBody>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="title">Product Name</Label>
                    <Input
                      className="form-input"
                      type="select"
                      name="name"
                      id="name"
                      placeholder="Enter The Name Of Your Product"
                      onChange={this.nameChange}
                      value={newProduct.name}
                    >
                      {titles.map((title, i) => (
                        <option key={i}>{title.name}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="price">What Is The Price Of Your Product</Label>
                    <Input
                      className="form-input"
                      type="number"
                      name="number"
                      id="price"
                      placeholder="$29.99"
                      onChange={this.priceChange}
                      value={newProduct.price}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="productCategory">Category</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="productCategory"
                      id="productCategory"
                      placeholder="Pick A Category"
                      onChange={this.productCategoryChange}
                      value={newProduct.productCategory}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="onSale">Is This Product On Sale?</Label>
                    <Input
                      className="form-input"
                      type="onSale"
                      name="onSale"
                      id="onSale"
                      placeholder="yes or no?"
                      onChange={this.onSaleChange}
                      value={newProduct.onSale}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  className="form-input"
                  type="textarea"
                  name="text"
                  id="description"
                  maxLength={descriptionMaxLength}
                  onChange={this.descriptionChange}
                  value={newProduct.description}
                />
                <Label className="float-right" for="char-count">
                  Remaining: {notesCharCount}/{notesMaxLength}
                </Label>
              </FormGroup>
              
              </Row>
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