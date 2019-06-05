import React from 'react';
import partnerRequests from '../../../helpers/data/partnerRequests';
import PartnerItems from '../PartnerItems/PartnerItems';

class Partners extends React.Component {
    state = {
        partners: [],
    }

    getPartners = () => {
        partnerRequests.getAllPartners()
            .then((partners) => {
                this.setState({ partners });
                console.log(partners.data);
            })
            .catch((err) => {
                console.error('error with getting the partners', err);
            });
    };

    componentDidMount() {
        this.getPartners();
    }

    render() {
        const { partners }= this.state;
        const partnersComponents = partners.map(partner => (
            <PartnerItems
            key={partner.id}
            partner={partner}
            />
        ));
        return (
            <div>
                <h1>Partners</h1>
                <ul>{partnersComponents}</ul>
            </div>
        );
    }
}

export default Partners;

