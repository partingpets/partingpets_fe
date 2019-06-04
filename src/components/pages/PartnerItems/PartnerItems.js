import React from 'react';
import Partners from '../Partners/Partners';

class PartnerItems extends React.Component {
    render() {
        const { partners } = this.props;
        return (
            <div>
                <h1>{partners.name}</h1>
            </div>
        );
    }
}

export default PartnerItems;