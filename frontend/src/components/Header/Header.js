import {useEffect} from 'react'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import axios from "axios"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import { Outlet } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate()
  let user = JSON.parse(localStorage.getItem("userInfo"));
  let admin=JSON.parse(localStorage.getItem("adminInfo"))
  console.log('user:',user);
 
  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Link style={{ textDecoration: "none" }} to="/">
            <Navbar.Brand style={{ color: "white" }}>Incubation</Navbar.Brand>
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {user?
               
              (
                <Nav>
                 {/*<Nav.Item>
                  <Nav.Link href="/status">Status</Nav.Link>
                  </Nav.Item>*/}
                <NavDropdown
                title={user.companyname}
                id="basic-nav-dropdown"
                style={{ color: "white" }}
              >
                <NavDropdown.Item
                  onClick={() => {
                    if (user ) {
                      localStorage.removeItem("userInfo");
                      navigate("/");
                    } else {
                      localStorage.removeItem("adminInfo");
                      navigate("/admin");
                    }
                  }}
                >
                  Logout
                </NavDropdown.Item>
                  </NavDropdown>
                  </Nav>
            ) : (
              ""
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Header;
