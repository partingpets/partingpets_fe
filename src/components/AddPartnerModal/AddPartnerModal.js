import React from 'react';

const defaultPartner = {
    name: '',
    description: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
};

class AddPartnerModal extends React.Component {
    state = {
        modal: false, 
        backdrop: 'static', 
        newPartner: defaultPartner,
        descriptionMaxLength: 250,
        descriptionCharCount: 250,
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
            newPartner: defaultPartner,
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            modal: props.showModal,
        });
    }

    

    render() {
        return (
            <div>
                <h1>AddPartnerModal</h1>
            </div>
        );
    }
}

export default AddPartnerModal;