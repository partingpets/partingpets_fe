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
import productRequests from '../../helpers/data/productRequests';
import './AddProductModal.scss';

import pets from '../../components/AppNavbar/images/pets_small.png';

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
    };

    static propTypes = {
        showModal: PropTypes.bool,
        onSubmit: PropTypes.func,
        isEditing: PropTypes.bool,
        passProductToEdit: PropTypes.object,
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
            passProductToEdit: defaultProduct,
        });
    }

    componentDidMount() {
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

    formfieldTitleState = (name, url, event) => {
        const tempProduct = { ...this.state.newProduct };
        tempProduct.title = event.target.value;
        tempProduct.imgUrl = url;
        this.setState({
            newProduct: tempProduct,
        });
    };


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
            descriptionCharCount, descriptionMaxLength, newProduct,
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
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="title">Product Name</Label>
                                        <Input
                                            className="form-input"
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Enter The Name Of Your Product"
                                            onChange={this.nameChange}
                                            value={newProduct.name}
                                        >
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="price">Product Price</Label>
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
                                        <Label for="productCategory">Product Category</Label>
                                        <Input
                                            className="form-input"
                                            type="select"
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
                                        <Label for="onSale">On Sale?</Label>
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