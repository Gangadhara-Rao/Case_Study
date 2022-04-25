import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
    
class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.handleMenuClick = this.handleMenuClick.bind(this);   
    }

    handleMenuClick(event,key) {
      event.preventDefault();
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    render() {
      console.log(this.props.isAuthenticated);

        let menuItems;
        if(this.props.currentUser) {
          menuItems = [
                <Nav.Link key="/search"><Link to={`/search`}>Flights</Link></Nav.Link>,
                <Nav.Link key="/bookings"><Link to={`/bookings`}>Bookings</Link></Nav.Link>,
                <Nav.Link key="/logout" onClick={(event) => this.handleMenuClick(event,"logout")}>Logout</Nav.Link>,
          ]; 
        } else {
          menuItems = [
            <Nav.Link key="/login">
              <Link to="/login">Login</Link>
            </Nav.Link>,
            <Nav.Link key="/signup">
              <Link to="/signup">Signup</Link>
            </Nav.Link>                  
          ];
        }

        return (
            <Navbar className="app-header">
            <Container>
              <Navbar.Brand >
                <Link to="/">Online Flight Management</Link>
              </Navbar.Brand>
              <Nav
                className="me-auto"
                mode="horizontal"
                selectedKeys={[this.props.location.pathname]}
                style={{ lineHeight: '64px' }} >
                {menuItems}
              </Nav>
            </Container>
          </Navbar>
        );
    }
}


export default withRouter(AppHeader);