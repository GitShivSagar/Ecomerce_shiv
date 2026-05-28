import React, { useState, useEffect, } from 'react'
import {
  Navbar, Nav, Container, NavDropdown, Badge, Form, FormControl, Button
} from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaUserPlus, FaSignOutAlt,FaHome,FaInfoCircle,FaEye } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'




const Header = () => {

  const [header, setheader] = useState()
  const count = useSelector((state) => state.notification.count);


  const headerStyle = {
    zIndex: 999, position: 'fixed', top: 0, left: 0, width: '100%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', padding: '0.5rem 1rem',
  }


  const activeStyle = {
    color: "black",
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: 16,
  }

  const inActiveStyle = {
    color: "gray",
    textDecoration: 'none',
    fontWeight: 'normal',
    fontSize: 16
  }


  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (role === "admin" && token != null) {

      setheader(<div>
        <Navbar expand="lg"
          // className="bg-body-tertiary"
          style={headerStyle}>
          <Container>
            <Navbar.Brand href="#home">
              <img
                src="https://marketplace.canva.com/EAGQ1aYlOWs/1/0/1600w/canva-blue-colorful-illustrative-e-commerce-online-shop-logo-bHiX_0QpJxE.jpg"
                width="35"
                height="35"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {/* <Nav className="me-auto"> */}
              {/* float left in nav react bootstrap */}
              <Nav className="ms-auto">
                <NavLink
                  to="/admin/addproducts"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                  className="me-3"
                >
                  AddProduct
                </NavLink>
                <NavLink
                  to="/admin"
                  className="me-3"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                  Admin
                </NavLink>
                <NavLink
                  className="me-3"
                  to="/admin/viewproduct"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                <FaInfoCircle className='me-1'/>  ViewProduct
                </NavLink>
                {<NavLink
                  to="/admin/managecustomer"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                  className="me-3"
                >
                  ManageCustomer
                </NavLink> }
                <NavLink
                  className="me-3"
                  to="/logout"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                  <FaUser className="me-1" />LogOut
                </NavLink>

                {/* <NavLink
                  className="me-3"
                  to="/cart"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                  <FaShoppingCart className="me-1" />Cart
                </NavLink> */}
                {/* <NavLink
                  to="/register"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                  <FaUserPlus className="me-1" /> Register

                </NavLink> */}
              </Nav>


            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>)
    }
    else if (role === "customer" && token != null) {
      setheader(<div>
        <Navbar expand="lg"
          // className="bg-body-tertiary"
          style={headerStyle}>
          <Container>
            <Navbar.Brand href="#home">
              <img
                src="https://marketplace.canva.com/EAGQ1aYlOWs/1/0/1600w/canva-blue-colorful-illustrative-e-commerce-online-shop-logo-bHiX_0QpJxE.jpg"
                width="35"
                height="35"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {/* <Nav className="me-auto"> */}
              {/* float left in nav react bootstrap */}
              <Nav className="ms-auto">

                {           
                <NavLink
                  className="me-3"
                  to="/customer"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                 <FaHome className='me-1'/> Home
                </NavLink> }
                <NavLink
                  className="me-3"
                  to="/customer/editprofile"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                  <FaUser className="me-1" />EditProfile
                </NavLink>
                <NavLink
                  className="me-4"
                  to="/customer/cart"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                  <FaShoppingCart className="me-1" />
                  Cart
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    {count > 0 && (
                      <Badge
                        bg="dark"
                        pill
                        style={{
                          position: 'absolute',
                          top: '-30px',
                          right: '-20px',
                          fontSize: '0.9rem',
                        }}
                      >
                        {count}
                      </Badge>
                    )}
                  </div>
                </NavLink>
                { <NavLink
                  className="me-3"
                  to="/customer/cprofile"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                  <FaUser className="me-1" />Profile
                </NavLink> }

                { <NavLink
                  className="me-3"
                  to="/customer/orders"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                  <FaShoppingCart className="me-1" />MyOrder
                </NavLink> }

                <NavLink
                  to="/customer/changepassword"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                  <FaUserPlus className="me-1" /> ChangePassword

                </NavLink>

                &nbsp;&nbsp;
                <NavLink
                  to="/logout"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                  <FaSignOutAlt className="me-1" />Logout
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>)
    } 
    
    else {
      setheader(<div>
        <Navbar expand="lg"
          // className="bg-body-tertiary"
          style={headerStyle}>
          <Container>
            <Navbar.Brand href="#home">
              <img
                src="https://marketplace.canva.com/EAGQ1aYlOWs/1/0/1600w/canva-blue-colorful-illustrative-e-commerce-online-shop-logo-bHiX_0QpJxE.jpg"
                width="35"
                height="35"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {/* <Nav className="me-auto"> */}
              {/* float left in nav react bootstrap */}
              <Nav className="ms-auto">
                <NavLink
                  to="/"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                  className="me-3"
                >
                  Home
                </NavLink>
                {/* <NavLink
                  to="/about"
                  className="me-3"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                  About
                </NavLink>
                <NavLink
                  className="me-3"
                  to="/contact"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/result"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                  className="me-3"
                >
                  Result
                </NavLink> */}
                <NavLink
                  className="me-3"
                  to="/login"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                  <FaUser className="me-1" />Login
                </NavLink>

                {/* <NavLink
                  className="me-3"
                  to="/cart"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                  <FaShoppingCart className="me-1" />Cart
                </NavLink> */}
                <NavLink
                  to="/register"
                  style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                  <FaUserPlus className="me-1" /> Register

                </NavLink>
              </Nav>


            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>)
    }
  }, [])

  return header
}

export default Header