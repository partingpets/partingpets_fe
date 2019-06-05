import React from 'react';

class PartnerItems extends React.Component {
    render() {
        const { partner } = this.props;
        return (
            <div>
                <h1>{partner.name}</h1>
            </div>
        );
    }
}

export default PartnerItems;