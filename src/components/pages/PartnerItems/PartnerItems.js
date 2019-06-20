import React from 'react';
import './PartnerItems.scss';

class PartnerItems extends React.Component {
    deletePartner = (e) => {
        e.preventDefault();
        const { deleteSinglePartner, partner } = this.props;
        deleteSinglePartner(partner.id);
    }

    render() {
        const { partner } = this.props;

        const adminPartnerView = () => {
            if (!partner.isDeleted) {
                return (
                <div>
                    <h1>{partner.name}</h1>
                    <h3>{partner.street}</h3>
                    <h3>{partner.city}</h3>
                    <h4>{partner.state}</h4>
                    <h6>{partner.zipcode}</h6>
                    <button onClick={this.deletePartner}>DELETE</button>
                </div>
                );
            } else {
                return (
                <div className="test-div">
                    <h1>{partner.name}</h1>
                    <h3>{partner.street}</h3>
                    <h3>{partner.city}</h3>
                    <h4>{partner.state}</h4>
                    <h6>{partner.zipcode}</h6>
                </div>
                );
            }
        };

        return (
            <div>
                {adminPartnerView()}
            </div>
        );
    }
}

export default PartnerItems;