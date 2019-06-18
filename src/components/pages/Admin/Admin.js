import React from 'react';
import { 
UncontrolledDropdown, 
DropdownToggle, 
DropdownMenu, 
DropdownItem, 
} from 'reactstrap';
import './Admin.scss';

class Admin extends React.Component {
    render() {
        return (
            <div className="admin-container">
                <h1>Admin</h1>
                <UncontrolledDropdown>
                    <DropdownToggle>
                        Manage
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            Partners
                        </DropdownItem>
                        <DropdownItem>
                            Users
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        );
    }
}

export default Admin;