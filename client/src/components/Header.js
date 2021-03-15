import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';

export default class Header extends Component {
    render() {

        const { context } = this.props;
        const authUser = context.authenticatedUser;

        return (
            <div>

            <Navbar variant="dark" expand="sm">
                <Navbar.Brand href="/accounts">Simple Budget App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/tbd">About</Nav.Link>         
                    </Nav>
                    
                    { authUser ?
                        <React.Fragment> 
                            <Nav className="mr-auto">
                                <span>Welcome, {authUser.user[0].firstName}!</span>
                                        {/* display authenticed user */}    
                            </Nav>
                            <Nav className="mr-auto">
                                <Nav.Link href="/signout">Sign Out</Nav.Link>         
                            </Nav>
                        </React.Fragment>
                       :
                       <React.Fragment>
                         <Nav className="mr-auto">
                            <Nav.Link href="/signup">Sign Up</Nav.Link>         
                        </Nav>
                        <Nav className="mr-auto">
                            <Nav.Link href="/signin">Sign In</Nav.Link>         
                        </Nav>
                       </React.Fragment>
                      
                    }
                    
                </Navbar.Collapse>
            </Navbar>
                
                    <div class="warning">
                            This application is in testing and not for storing personal data
                         </div>
        </div>
        )
    }

}